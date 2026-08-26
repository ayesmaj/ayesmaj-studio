#!/usr/bin/env python3
"""Reference-first brand audit for the AYESMAJ brand-world pipeline.

The script never modifies original media. It inventories every brand folder,
extracts media metadata and visual palettes, finds exact/near duplicates,
creates internal contact sheets, prepares deterministic generated folders, and
writes a brand-manifest.json when one does not already exist.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import math
import subprocess
from collections import Counter, defaultdict
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps, ImageFile

ImageFile.LOAD_TRUNCATED_IMAGES = True

IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
VIDEO_EXTENSIONS = {".mp4", ".webm", ".mov", ".m4v"}
GENERATED_FOLDERS = (
    "hero", "identity", "packaging", "web", "social", "campaign",
    "storyboard", "film", "cgi", "environment", "master", "_rejected",
)


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Audit AYESMAJ brand reference folders")
    parser.add_argument("--root", default="public/brands", help="Brand root directory")
    parser.add_argument("--contact-sheets", default="tmp/brand-world-audit", help="Internal contact-sheet directory")
    parser.add_argument("--write", action="store_true", help="Write new manifests and generated folder trees")
    parser.add_argument("--overwrite", action="store_true", help="Replace existing manifests (off by default)")
    return parser.parse_args()


def load_brand_metadata(repo: Path) -> dict[str, dict]:
    js = (
        "import('./src/data/brands.js').then(({BRANDS}) => "
        "console.log(JSON.stringify(BRANDS.map(({id,assetDir,name,subtitle,category,accent,description,tags,year,sections,logo,featured})"
        "=>({id,assetDir,name,subtitle,category,accent,description,tags,year,sections,logo,featured})))));"
    )
    try:
        output = subprocess.run(
            ["node", "--input-type=module", "-e", js],
            cwd=repo,
            check=True,
            capture_output=True,
            text=True,
            encoding="utf-8",
        ).stdout.strip()
        records = json.loads(output)
    except (subprocess.SubprocessError, json.JSONDecodeError):
        return {}
    return {(item.get("assetDir") or item["id"]).casefold(): item for item in records}


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def average_hash(image: Image.Image) -> str:
    gray = ImageOps.grayscale(image).resize((8, 8), Image.Resampling.LANCZOS)
    pixels = list(gray.getdata())
    mean = sum(pixels) / len(pixels)
    bits = "".join("1" if pixel >= mean else "0" for pixel in pixels)
    return f"{int(bits, 2):016x}"


def hamming(left: str, right: str) -> int:
    return (int(left, 16) ^ int(right, 16)).bit_count()


def extract_palette(image: Image.Image, count: int = 5) -> list[str]:
    rgba = image.convert("RGBA")
    rgba.thumbnail((96, 96), Image.Resampling.LANCZOS)
    background = Image.new("RGB", rgba.size, "white")
    background.paste(rgba, mask=rgba.getchannel("A"))
    quantized = background.quantize(colors=count, method=Image.Quantize.MEDIANCUT).convert("RGB")
    colors = Counter(quantized.getdata()).most_common(count)
    return [f"#{r:02X}{g:02X}{b:02X}" for (r, g, b), _ in colors]


def ffprobe(path: Path) -> dict:
    command = [
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height,codec_name,duration:format=duration",
        "-of", "json", str(path),
    ]
    try:
        data = json.loads(subprocess.run(command, check=True, capture_output=True, text=True).stdout)
        stream = (data.get("streams") or [{}])[0]
        duration = stream.get("duration") or (data.get("format") or {}).get("duration")
        return {
            "width": int(stream.get("width") or 0),
            "height": int(stream.get("height") or 0),
            "codec": stream.get("codec_name"),
            "duration": round(float(duration), 3) if duration else None,
        }
    except (subprocess.SubprocessError, json.JSONDecodeError, ValueError):
        return {"width": 0, "height": 0, "codec": None, "duration": None}


def section_types(metadata: dict) -> dict[str, str]:
    result: dict[str, str] = {}
    for section in metadata.get("sections") or []:
        title = (section.get("title") or "").casefold()
        if any(word in title for word in ("identity", "logo", "mark")):
            kind = "identity"
        elif any(word in title for word in ("packaging", "product", "label")):
            kind = "packaging"
        elif any(word in title for word in ("web", "digital", "app", "ui")):
            kind = "website"
        elif any(word in title for word in ("social", "campaign", "launch")):
            kind = "campaign"
        elif any(word in title for word in ("3d", "cgi", "render")):
            kind = "cgi"
        elif any(word in title for word in ("film", "motion", "animation")):
            kind = "film"
        else:
            kind = "other"
        for filename in section.get("images") or []:
            result[filename.casefold()] = kind
    return result


def classify(path: Path, width: int, height: int, mapped: dict[str, str]) -> str:
    name = path.name.casefold()
    if path.suffix.casefold() in VIDEO_EXTENSIONS:
        return "film"
    for keyword, kind in (
        ("logo", "logo"), ("mark", "brand-mark"), ("story", "storyboard"),
        ("mobile", "mobile"), ("phone", "mobile"), ("website", "website"),
        ("web", "website"), ("pack", "packaging"), ("label", "label"),
        ("poster", "poster"), ("social", "social-post"), ("cgi", "cgi"),
        ("render", "3d"), ("3d", "3d"), ("palette", "palette"),
        ("type", "typography"), ("mood", "moodboard"),
    ):
        if keyword in name:
            return kind
    if name in mapped:
        return mapped[name]
    if width and height:
        ratio = width / height
        if ratio < 0.82:
            return "poster"
        if ratio > 1.6:
            return "campaign"
        if 0.9 <= ratio <= 1.1:
            return "social-post"
    return "photography"


def inspect_media(path: Path, brand_dir: Path, mapped: dict[str, str]) -> tuple[dict, Image.Image | None]:
    rel = path.relative_to(brand_dir).as_posix()
    item = {
        "filename": rel,
        "extension": path.suffix.casefold(),
        "bytes": path.stat().st_size,
        "sha256": sha256(path),
        "source": "existing",
    }
    preview = None
    if path.suffix.casefold() in IMAGE_EXTENSIONS:
        try:
            with Image.open(path) as opened:
                opened.load()
                preview = opened.convert("RGB")
                item.update({
                    "width": opened.width,
                    "height": opened.height,
                    "mode": opened.mode,
                    "averageHash": average_hash(opened),
                    "palette": extract_palette(opened),
                })
        except OSError:
            item.update({"width": 0, "height": 0, "mode": None, "averageHash": None, "palette": []})
    else:
        video = ffprobe(path)
        item.update(video)
        frame_path = brand_dir / ".audit-frame.jpg"
        try:
            subprocess.run(
                ["ffmpeg", "-hide_banner", "-loglevel", "error", "-y", "-ss", "00:00:01", "-i", str(path), "-frames:v", "1", "-vf", "scale=720:-2", str(frame_path)],
                check=True,
            )
            with Image.open(frame_path) as opened:
                preview = opened.convert("RGB")
                item["palette"] = extract_palette(opened)
        except (subprocess.SubprocessError, OSError):
            item["palette"] = []
        finally:
            if frame_path.exists():
                frame_path.unlink()
    item["type"] = classify(path, item.get("width", 0), item.get("height", 0), mapped)
    return item, preview


def make_contact_sheet(brand: str, records: list[tuple[dict, Image.Image | None]], output: Path) -> None:
    tile_w, tile_h, columns = 292, 236, 4
    rows = max(1, math.ceil(len(records) / columns))
    sheet = Image.new("RGB", (columns * tile_w, 66 + rows * tile_h), "#F4F0E8")
    draw = ImageDraw.Draw(sheet)
    font = ImageFont.load_default()
    draw.text((22, 20), f"{brand.upper()} / SOURCE AUDIT / {len(records)} MEDIA", fill="#17140F", font=font)
    for index, (item, preview) in enumerate(records):
        x = (index % columns) * tile_w
        y = 66 + (index // columns) * tile_h
        card = Image.new("RGB", (tile_w - 12, tile_h - 12), "white")
        if preview:
            thumb = ImageOps.contain(preview, (tile_w - 28, tile_h - 70), Image.Resampling.LANCZOS)
            px = (card.width - thumb.width) // 2
            py = 8 + ((tile_h - 70 - thumb.height) // 2)
            card.paste(thumb, (px, py))
        card_draw = ImageDraw.Draw(card)
        label = item["filename"]
        if len(label) > 34:
            label = f"{label[:31]}..."
        card_draw.text((10, card.height - 48), label, fill="#17140F", font=font)
        card_draw.text((10, card.height - 30), f"{item['type']} | {item.get('width', 0)}x{item.get('height', 0)}", fill="#6C655C", font=font)
        sheet.paste(card, (x + 6, y + 6))
    output.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(output, "JPEG", quality=88, optimize=True)


def find_duplicates(assets: list[dict]) -> tuple[list[list[str]], list[dict]]:
    exact_groups = defaultdict(list)
    for item in assets:
        exact_groups[item["sha256"]].append(item["filename"])
    exact = [files for files in exact_groups.values() if len(files) > 1]

    near = []
    image_assets = [item for item in assets if item.get("averageHash")]
    for index, left in enumerate(image_assets):
        for right in image_assets[index + 1:]:
            if (left.get("width"), left.get("height")) != (right.get("width"), right.get("height")):
                continue
            distance = hamming(left["averageHash"], right["averageHash"])
            if distance <= 5 and left["sha256"] != right["sha256"]:
                near.append({"files": [left["filename"], right["filename"]], "hashDistance": distance})
    return exact, near


def aggregate_palette(assets: list[dict]) -> list[str]:
    colors = Counter(color for item in assets for color in item.get("palette", [])[:3])
    return [color for color, _ in colors.most_common(7)]


def derive_missing(metadata: dict, types: set[str]) -> list[str]:
    text = " ".join(str(metadata.get(key) or "") for key in ("name", "category", "description"))
    text += " " + " ".join(metadata.get("tags") or [])
    text = text.casefold()
    missing = []
    for required, existing_types in (
        ("identity-system", {"identity", "logo", "brand-mark"}),
        ("website-responsive", {"website", "mobile"}),
        ("social-system", {"social-post"}),
        ("campaign-system", {"campaign", "poster"}),
        ("storyboard", {"storyboard"}),
        ("brand-world-master", {"brand-world-master"}),
    ):
        if not (types & existing_types):
            missing.append(required)
    if any(word in text for word in ("packaging", "product", "food", "snack", "coffee", "wine", "whiskey", "drink", "beauty")) and "packaging" not in types:
        missing.extend(["packaging-lineup", "packaging-detail"])
    if any(word in text for word in ("cgi", "3d", "product visualization")) and not (types & {"cgi", "3d"}):
        missing.append("cgi-hero")
    if any(word in text for word in ("film", "motion", "animation")) and "film" not in types:
        missing.append("film-keyframes")
    return list(dict.fromkeys(missing))


def build_manifest(brand_dir: Path, metadata: dict, assets: list[dict], exact: list, near: list) -> dict:
    palette = aggregate_palette(assets)
    by_type = defaultdict(list)
    for item in assets:
        by_type[item["type"]].append(item["filename"])
    types = set(by_type)
    return {
        "schemaVersion": 1,
        "slug": metadata.get("id") or brand_dir.name.replace(" ", "-"),
        "assetDirectory": brand_dir.name,
        "name": metadata.get("name") or brand_dir.name.upper(),
        "status": "pending-manual-visual-dna",
        "sourceOfTruth": "Existing files in this folder are immutable references.",
        "audit": {
            "mediaCount": len(assets),
            "exactDuplicates": exact,
            "nearDuplicates": near,
            "highestResolutionReferences": [
                item["filename"] for item in sorted(assets, key=lambda value: value.get("width", 0) * value.get("height", 0), reverse=True)[:8]
            ],
            "assets": assets,
        },
        "brandDNA": {
            "productCategory": metadata.get("category") or "Pending manual visual audit",
            "primaryColors": palette[:3],
            "secondaryColors": palette[3:7],
            "visualMood": metadata.get("description") or "Pending manual visual audit",
            "lightingStyle": "Pending manual visual audit from contact sheet",
            "compositionStyle": "Pending manual visual audit from contact sheet",
            "materials": [],
            "keywords": metadata.get("tags") or [],
            "lockedInvariants": [
                "Preserve the real logo and existing product or packaging structure.",
                "Use original media as generation references.",
                "Never publish model-generated spelling for exact brand text.",
            ],
        },
        "existingAssets": dict(sorted(by_type.items())),
        "missingAssets": derive_missing(metadata, types),
        "generationPlan": [],
        "generatedAssets": [],
        "qcThresholds": {"brandConsistency": 8, "productAccuracy": 8, "composition": 8, "portfolioValue": 8},
    }


def main() -> int:
    args = parse_args()
    repo = Path(__file__).resolve().parents[1]
    brand_root = (repo / args.root).resolve()
    contact_root = (repo / args.contact_sheets).resolve()
    metadata_by_dir = load_brand_metadata(repo)
    index = []

    for brand_dir in sorted(path for path in brand_root.iterdir() if path.is_dir()):
        metadata = metadata_by_dir.get(brand_dir.name.casefold(), {})
        mapped = section_types(metadata)
        media_paths = [
            path for path in brand_dir.rglob("*")
            if path.is_file()
            and path.suffix.casefold() in IMAGE_EXTENSIONS | VIDEO_EXTENSIONS
            and "generated" not in {part.casefold() for part in path.relative_to(brand_dir).parts}
        ]
        records = [inspect_media(path, brand_dir, mapped) for path in sorted(media_paths)]
        assets = [item for item, _ in records]
        exact, near = find_duplicates(assets)
        make_contact_sheet(brand_dir.name, records, contact_root / f"{brand_dir.name}.jpg")
        manifest = build_manifest(brand_dir, metadata, assets, exact, near)
        manifest_path = brand_dir / "brand-manifest.json"

        if args.write:
            generated = brand_dir / "generated"
            for folder in GENERATED_FOLDERS:
                (generated / folder).mkdir(parents=True, exist_ok=True)
            if args.overwrite or not manifest_path.exists():
                manifest_path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

        index.append({
            "slug": manifest["slug"],
            "assetDirectory": brand_dir.name,
            "mediaCount": len(assets),
            "exactDuplicateGroups": len(exact),
            "nearDuplicatePairs": len(near),
            "manifest": manifest_path.relative_to(repo).as_posix(),
            "contactSheet": (contact_root / f"{brand_dir.name}.jpg").relative_to(repo).as_posix(),
            "manifestExists": manifest_path.exists(),
        })

    contact_root.mkdir(parents=True, exist_ok=True)
    (contact_root / "brand-world-index.json").write_text(json.dumps(index, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(json.dumps({"brands": len(index), "index": str(contact_root / 'brand-world-index.json')}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
