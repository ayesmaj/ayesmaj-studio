from __future__ import annotations

import argparse
import hashlib
import json
import math
import re
import shutil
import subprocess
from collections import defaultdict
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


RASTER_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"}
VIDEO_EXTENSIONS = {".mp4", ".mov", ".m4v", ".webm"}
FONT_EXTENSIONS = {".woff", ".woff2", ".ttf", ".otf"}
PREVIEW_SIZE = (420, 270)
SHEET_COLUMNS = 3


def slugify(value: str) -> str:
    value = re.sub(r"[^a-zA-Z0-9]+", "-", value.strip().lower()).strip("-")
    return value or "asset"


def file_sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def average_hash(image: Image.Image, size: int = 8) -> str:
    gray = ImageOps.exif_transpose(image).convert("L").resize((size, size), Image.Resampling.LANCZOS)
    values = list(gray.getdata())
    mean = sum(values) / len(values)
    bits = "".join("1" if value >= mean else "0" for value in values)
    return f"{int(bits, 2):0{size * size // 4}x}"


def classify_aspect(width: int | None, height: int | None) -> str:
    if not width or not height:
        return "unknown"
    ratio = width / height
    if ratio >= 1.65:
        return "wide"
    if ratio >= 1.15:
        return "landscape"
    if ratio > 0.87:
        return "square"
    if ratio > 0.62:
        return "portrait"
    return "tall"


def category_from_name(name: str, aspect: str, media_type: str) -> str:
    lowered = name.lower()
    keyword_map = [
        ("logo", "logo"), ("wordmark", "logo"), ("icon", "icon"),
        ("palette", "color"), ("color", "color"), ("type", "typography"),
        ("font", "typography"), ("web", "website"), ("website", "website"),
        ("landing", "website"), ("poster", "poster"), ("social", "social"),
        ("instagram", "social"), ("pack", "packaging"), ("label", "packaging"),
        ("bottle", "packaging"), ("can", "packaging"), ("product", "product"),
        ("hero", "hero"), ("mockup", "mockup"), ("business card", "collateral"),
        ("menu", "collateral"), ("sign", "collateral"), ("uniform", "collateral"),
        ("story", "storyboard"),
    ]
    for keyword, category in keyword_map:
        if keyword in lowered:
            return category
    if media_type == "video":
        return "motion"
    if aspect == "wide":
        return "campaign"
    if aspect in {"portrait", "tall"}:
        return "poster"
    return "brand visual"


def score_asset(width: int | None, height: int | None, size_bytes: int, filename: str, media_type: str) -> float:
    if media_type == "font":
        return 15.0
    pixels = max((width or 0) * (height or 0), 1)
    resolution = min(42.0, 10.0 * math.log10(pixels))
    dimension = min(28.0, min(width or 0, height or 0) / 50.0)
    weight = min(12.0, math.log10(max(size_bytes, 1)) * 1.5)
    bonus = 8.0 if any(word in filename.lower() for word in ("logo", "hero", "website", "mockup")) else 0.0
    penalty = 8.0 if any(word in filename.lower() for word in ("copy", "final final", "screenshot 202", "thumb")) else 0.0
    if media_type == "video":
        bonus += 4.0
    return round(max(0.0, min(100.0, resolution + dimension + weight + bonus - penalty)), 2)


def probe_video(path: Path) -> dict:
    command = [
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height,duration:format=duration",
        "-of", "json", str(path),
    ]
    try:
        result = subprocess.run(command, capture_output=True, text=True, check=True, timeout=45)
        payload = json.loads(result.stdout)
        stream = (payload.get("streams") or [{}])[0]
        duration = stream.get("duration") or (payload.get("format") or {}).get("duration")
        return {
            "width": int(stream.get("width") or 0) or None,
            "height": int(stream.get("height") or 0) or None,
            "duration_seconds": round(float(duration), 2) if duration else None,
        }
    except Exception as exc:
        return {"width": None, "height": None, "duration_seconds": None, "probe_error": str(exc)}


def extract_video_preview(path: Path, target: Path, duration: float | None) -> bool:
    seek = max(0.1, min(2.0, (duration or 1.0) * 0.2))
    command = [
        "ffmpeg", "-y", "-ss", f"{seek:.2f}", "-i", str(path),
        "-frames:v", "1", "-vf", "scale=900:-2", "-q:v", "3", str(target),
    ]
    try:
        subprocess.run(command, capture_output=True, check=True, timeout=90)
        return target.exists()
    except Exception:
        return False


def open_preview_image(path: Path) -> Image.Image:
    with Image.open(path) as opened:
        return ImageOps.exif_transpose(opened).convert("RGB")


def create_preview(source: Path, target: Path, media_type: str, duration: float | None = None) -> tuple[Path | None, str | None]:
    target.parent.mkdir(parents=True, exist_ok=True)
    try:
        if media_type == "image":
            with Image.open(source) as opened:
                image = ImageOps.exif_transpose(opened).convert("RGB")
                image.thumbnail((1200, 900), Image.Resampling.LANCZOS)
                image.save(target, quality=84, optimize=True)
            return target, None
        if media_type == "video" and extract_video_preview(source, target, duration):
            return target, None
    except Exception as exc:
        return None, str(exc)
    return None, "Preview unavailable"


def fit_into(image: Image.Image, box: tuple[int, int], background=(236, 233, 224)) -> Image.Image:
    canvas = Image.new("RGB", box, background)
    fitted = ImageOps.contain(image, (box[0] - 12, box[1] - 12), Image.Resampling.LANCZOS)
    x = (box[0] - fitted.width) // 2
    y = (box[1] - fitted.height) // 2
    canvas.paste(fitted, (x, y))
    return canvas


def make_brand_sheet(brand: str, assets: list[dict], preview_root: Path, output: Path) -> None:
    rows = max(1, math.ceil(len(assets) / SHEET_COLUMNS))
    cell_w, cell_h = 460, 340
    header_h = 100
    sheet = Image.new("RGB", (cell_w * SHEET_COLUMNS, header_h + rows * cell_h), (246, 244, 238))
    draw = ImageDraw.Draw(sheet)
    title_font = ImageFont.truetype("arialbd.ttf", 34)
    label_font = ImageFont.truetype("arial.ttf", 16)
    small_font = ImageFont.truetype("arial.ttf", 13)
    draw.text((30, 24), brand.upper(), font=title_font, fill=(34, 34, 31))
    draw.text((30, 68), f"{len(assets)} assets - visual audit contact sheet", font=small_font, fill=(103, 103, 90))
    for index, asset in enumerate(assets):
        col = index % SHEET_COLUMNS
        row = index // SHEET_COLUMNS
        x = col * cell_w
        y = header_h + row * cell_h
        draw.rectangle((x + 10, y + 8, x + cell_w - 10, y + cell_h - 10), outline=(205, 199, 181), width=1)
        if asset.get("preview"):
            preview_path = preview_root / asset["preview"]
            if preview_path.exists():
                preview = open_preview_image(preview_path)
                fitted = fit_into(preview, PREVIEW_SIZE)
                sheet.paste(fitted, (x + 20, y + 18))
        name = asset["filename"]
        if len(name) > 46:
            name = name[:43] + "..."
        draw.text((x + 22, y + 296), name, font=label_font, fill=(32, 32, 29))
        dims = f"{asset.get('width') or '?'}x{asset.get('height') or '?'}  {asset['media_type']}  score {asset['quality_score']:.0f}"
        draw.text((x + 22, y + 318), dims, font=small_font, fill=(106, 106, 94))
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, quality=86, optimize=True)


def audit_brand(brand_dir: Path, root: Path, generated: Path) -> dict:
    brand_slug = slugify(brand_dir.name)
    preview_dir = generated / "previews" / brand_slug
    assets: list[dict] = []
    for source in sorted((path for path in brand_dir.rglob("*") if path.is_file()), key=lambda item: str(item).lower()):
        extension = source.suffix.lower()
        media_type = "image" if extension in RASTER_EXTENSIONS else "video" if extension in VIDEO_EXTENSIONS else "font" if extension in FONT_EXTENSIONS else "other"
        width = height = None
        mode = None
        has_alpha = False
        duration = None
        perceptual_hash = None
        error = None
        if media_type == "image":
            try:
                with Image.open(source) as opened:
                    width, height = opened.size
                    mode = opened.mode
                    has_alpha = "A" in opened.getbands() or "transparency" in opened.info
                    perceptual_hash = average_hash(opened)
            except Exception as exc:
                error = str(exc)
        elif media_type == "video":
            video = probe_video(source)
            width, height = video.get("width"), video.get("height")
            duration = video.get("duration_seconds")
            error = video.get("probe_error")
        aspect = classify_aspect(width, height)
        relative = source.relative_to(root).as_posix()
        preview_name = f"{len(assets)+1:03d}-{slugify(source.stem)[:60]}.jpg"
        preview_path, preview_error = create_preview(source, preview_dir / preview_name, media_type, duration)
        if preview_error and not error:
            error = preview_error
        score = score_asset(width, height, source.stat().st_size, source.name, media_type)
        assets.append({
            "path": relative,
            "filename": source.name,
            "extension": extension,
            "media_type": media_type,
            "size_bytes": source.stat().st_size,
            "width": width,
            "height": height,
            "aspect_ratio": round(width / height, 4) if width and height else None,
            "aspect_class": aspect,
            "mode": mode,
            "has_transparency": has_alpha,
            "duration_seconds": duration,
            "sha256": file_sha256(source),
            "perceptual_hash": perceptual_hash,
            "inferred_category": category_from_name(source.name, aspect, media_type),
            "quality_score": score,
            "preview": str(preview_path.relative_to(generated).as_posix()) if preview_path else None,
            "error": error,
            "selected": media_type in {"image", "video"} and score >= 42,
            "selection_reason": "Initial automated selection; final curation follows visual review." if media_type in {"image", "video"} else "Supporting file, not placed as a visual.",
        })
    exact_groups: dict[str, list[str]] = defaultdict(list)
    perceptual_groups: dict[str, list[str]] = defaultdict(list)
    for asset in assets:
        exact_groups[asset["sha256"]].append(asset["path"])
        if asset.get("perceptual_hash"):
            perceptual_groups[asset["perceptual_hash"]].append(asset["path"])
    exact_duplicates = [paths for paths in exact_groups.values() if len(paths) > 1]
    visually_similar = [paths for paths in perceptual_groups.values() if len(paths) > 1]
    ranked = sorted(
        (asset for asset in assets if asset["media_type"] in {"image", "video"}),
        key=lambda item: item["quality_score"], reverse=True,
    )
    sheet_name = f"{brand_slug}.jpg"
    make_brand_sheet(brand_dir.name, assets, generated, generated / "contact-sheets" / sheet_name)
    return {
        "id": brand_slug,
        "folder_name": brand_dir.name,
        "asset_count": len(assets),
        "assets": assets,
        "ranked_assets": [item["path"] for item in ranked],
        "exact_duplicate_groups": exact_duplicates,
        "visually_similar_groups": visually_similar,
        "contact_sheet": f"contact-sheets/{sheet_name}",
        "selected_count": sum(1 for item in assets if item["selected"]),
        "issues": [item["path"] + ": " + item["error"] for item in assets if item.get("error")],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description="Audit AYESMAJ brand assets without modifying source files.")
    parser.add_argument("--root", default="public/brands")
    parser.add_argument("--generated", default="portfolio/generated")
    args = parser.parse_args()
    root = Path(args.root).resolve()
    generated = Path(args.generated).resolve()
    generated.mkdir(parents=True, exist_ok=True)
    brands = [audit_brand(directory, root, generated) for directory in sorted(root.iterdir(), key=lambda item: item.name.lower()) if directory.is_dir()]
    payload = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "source_root": str(root),
        "brand_count": len(brands),
        "asset_count": sum(brand["asset_count"] for brand in brands),
        "brands": brands,
        "notes": [
            "Original source assets were read only and not modified.",
            "Quality scores and inferred categories are starting points for manual visual curation.",
            "Video previews are still frames extracted with ffmpeg; original video remains untouched.",
        ],
    }
    output = generated / "brand-audit.json"
    output.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Audited {payload['brand_count']} brands and {payload['asset_count']} assets")
    print(output)


if __name__ == "__main__":
    main()
