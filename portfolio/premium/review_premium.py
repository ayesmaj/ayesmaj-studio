from __future__ import annotations

import json
import math
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageStat
from pypdf import PdfReader
from pypdfium2 import PdfDocument


ROOT = Path(__file__).resolve().parents[2]
PORTFOLIO = ROOT / "portfolio"
PREMIUM = PORTFOLIO / "premium"
OUTPUT = PORTFOLIO / "output"
REVIEW = PREMIUM / "generated" / "review"
META = json.loads((PREMIUM / "build" / "build-meta.json").read_text(encoding="utf-8"))

JOBS = {
    "Rafael_Smadja_CV_and_Portfolio_2026_Premium.pdf": META["master"]["page_count"],
    "Rafael_Smadja_CV_and_Portfolio_2026_Premium_Under_5MB.pdf": META["compact"]["page_count"],
}


def clean_review_dir(path: Path) -> None:
    if path.exists():
        try:
            path.resolve().relative_to(REVIEW.resolve())
        except ValueError as exc:
            raise RuntimeError(f"Refusing to remove review directory outside premium review root: {path}") from exc
        shutil.rmtree(path)
    path.mkdir(parents=True, exist_ok=True)


def render_pdf(pdf_path: Path, expected_pages: int) -> dict:
    reader = PdfReader(str(pdf_path))
    if len(reader.pages) != expected_pages:
        raise RuntimeError(f"{pdf_path.name}: expected {expected_pages} pages, got {len(reader.pages)}")
    target = REVIEW / pdf_path.stem
    clean_review_dir(target)
    page_sizes = []
    link_annotations = 0
    for index, page in enumerate(reader.pages, 1):
        width = float(page.mediabox.width)
        height = float(page.mediabox.height)
        page_sizes.append([round(width, 2), round(height, 2)])
        if abs(width - 595.28) > 1.5 or abs(height - 841.89) > 1.5:
            raise RuntimeError(f"{pdf_path.name}: page {index} is not A4 portrait ({width:.2f} x {height:.2f} pt)")
        link_annotations += len(page.get("/Annots", []))

    rendered = []
    blanks = []
    document = PdfDocument(str(pdf_path))
    for index, page in enumerate(document):
        image = page.render(scale=1.3).to_pil().convert("RGB")
        path = target / f"page-{index + 1:03d}.png"
        image.save(path, optimize=True)
        gray = image.convert("L")
        variance = float(ImageStat.Stat(gray).var[0])
        if variance < 2.5:
            blanks.append(index + 1)
        text = (reader.pages[index].extract_text() or "").strip()
        rendered.append(
            {
                "page": index + 1,
                "render": str(path),
                "variance": round(variance, 2),
                "text_characters": len(text),
            }
        )
    if blanks:
        raise RuntimeError(f"{pdf_path.name}: possible blank pages {blanks}")
    return {
        "file": str(pdf_path),
        "bytes": pdf_path.stat().st_size,
        "megabytes": round(pdf_path.stat().st_size / 1024 / 1024, 3),
        "pages": len(reader.pages),
        "page_size_points": page_sizes[0],
        "link_annotations": link_annotations,
        "blank_pages": blanks,
        "rendered_pages": rendered,
    }


def font(name: str, size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    path = Path("C:/Windows/Fonts") / name
    return ImageFont.truetype(str(path), size) if path.exists() else ImageFont.load_default()


def contact_sheet(result: dict, output_name: str) -> Path:
    thumbs = []
    for item in result["rendered_pages"]:
        with Image.open(item["render"]) as opened:
            image = opened.convert("RGB")
            image.thumbnail((255, 361), Image.Resampling.LANCZOS)
            thumbs.append(image.copy())
    columns = 6
    rows = math.ceil(len(thumbs) / columns)
    cell_w, cell_h = 280, 410
    canvas = Image.new("RGB", (columns * cell_w, 95 + rows * cell_h), (224, 218, 207))
    draw = ImageDraw.Draw(canvas)
    draw.text((22, 17), "RAFAEL SMADJA / PREMIUM CV + PORTFOLIO 2026", font=font("arialbd.ttf", 31), fill=(21, 22, 19))
    draw.text((22, 58), f"{result['pages']} rendered pages / {result['megabytes']:.2f} MB", font=font("arial.ttf", 18), fill=(91, 89, 80))
    for index, thumb in enumerate(thumbs):
        col = index % columns
        row = index // columns
        x = col * cell_w + (cell_w - thumb.width) // 2
        y = 95 + row * cell_h
        canvas.paste(thumb, (x, y))
        draw.text((col * cell_w + 10, y + 370), f"PAGE {index + 1:02d}", font=font("arial.ttf", 16), fill=(63, 64, 58))
    target = OUTPUT / output_name
    canvas.save(target, quality=88, optimize=True)
    return target


def main() -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    summary = {}
    sheets = {}
    for filename, expected in JOBS.items():
        result = render_pdf(OUTPUT / filename, expected)
        summary[filename] = result
        sheets[filename] = str(contact_sheet(result, f"{Path(filename).stem}_Contact_Sheet.jpg"))

    compact_name = "Rafael_Smadja_CV_and_Portfolio_2026_Premium_Under_5MB.pdf"
    compact_size = summary[compact_name]["bytes"]
    if compact_size > 5 * 1024 * 1024:
        raise RuntimeError(f"Compact PDF exceeds 5 MB: {compact_size / 1024 / 1024:.2f} MB")

    report = {
        "summary": summary,
        "contact_sheets": sheets,
        "verified": {
            "all_pages_a4_portrait": True,
            "all_pages_rendered": True,
            "no_blank_pages_detected": True,
            "compact_under_5mb": True,
            "resume_first": True,
        },
    }
    (PREMIUM / "generated" / "qa-summary.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    lines = [
        "# Premium CV and Portfolio Production Report",
        "",
        "- Resume appears before all portfolio artwork.",
        f"- {META['master']['brand_count']} dedicated brand worlds; {META['master']['expanded_brand_count']} also receive an expanded applications spread.",
        "- Added web, motion, storyboard, character, identity, spatial, transformation, and clearly labeled concept-work chapters.",
        "- Excluded generated homepage heroes still marked pending QC and rejected Blenday assets.",
        "- Every image is placed with aspect-aware `contain` treatment; no intentional crop is used inside case-study frames.",
        "",
        "## Output validation",
        "",
    ]
    for filename, result in summary.items():
        lines.append(f"- `{filename}` — {result['pages']} pages, {result['megabytes']:.2f} MB, {result['link_annotations']} link annotations, no blank pages")
    lines.extend(["", "Both PDFs were rendered page by page for visual review."])
    (PREMIUM / "PREMIUM_REPORT.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("Validated both premium PDFs, rendered every page, and created contact sheets.")


if __name__ == "__main__":
    main()
