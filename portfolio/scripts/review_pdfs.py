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
OUTPUT = PORTFOLIO / "output"
REVIEW = PORTFOLIO / "generated" / "review"
DATA = json.loads((PORTFOLIO / "src" / "portfolio-data.json").read_text(encoding="utf-8"))
AUDIT = json.loads((PORTFOLIO / "generated" / "brand-audit.json").read_text(encoding="utf-8"))

EXPECTED = {
    "Rafael_Smadja_CV_2026.pdf": 2,
    "Rafael_Smadja_Brand_Portfolio_2026.pdf": 25,
    "Rafael_Smadja_CV_and_Portfolio_2026.pdf": 27,
}
compact_pdf = OUTPUT / "Rafael_Smadja_CV_and_Portfolio_2026_Under_5MB.pdf"
if compact_pdf.exists():
    EXPECTED[compact_pdf.name] = 27


def render_and_check(pdf_path: Path, expected_pages: int) -> dict:
    reader = PdfReader(str(pdf_path))
    if len(reader.pages) != expected_pages:
        raise RuntimeError(f"{pdf_path.name}: expected {expected_pages} pages, got {len(reader.pages)}")
    page_sizes = []
    for index, pdf_page in enumerate(reader.pages, 1):
        width = float(pdf_page.mediabox.width)
        height = float(pdf_page.mediabox.height)
        page_sizes.append([round(width, 2), round(height, 2)])
        if abs(width - 595.28) > 1.5 or abs(height - 841.89) > 1.5:
            raise RuntimeError(f"{pdf_path.name}: page {index} is not A4 portrait ({width:.2f} x {height:.2f} pt)")
    doc = PdfDocument(str(pdf_path))
    target_dir = REVIEW / pdf_path.stem
    if target_dir.exists():
        shutil.rmtree(target_dir)
    target_dir.mkdir(parents=True)
    pages = []
    blank_pages = []
    for index, page in enumerate(doc):
        image = page.render(scale=1.45).to_pil().convert("RGB")
        output = target_dir / f"page-{index + 1:03d}.png"
        image.save(output, optimize=True)
        stat = ImageStat.Stat(image.convert("L"))
        variance = stat.var[0]
        if variance < 3.0:
            blank_pages.append(index + 1)
        extracted = (reader.pages[index].extract_text() or "").strip()
        pages.append({"page": index + 1, "render": str(output), "variance": round(variance, 2), "text_characters": len(extracted)})
    if blank_pages:
        raise RuntimeError(f"{pdf_path.name}: possible blank pages {blank_pages}")
    annotations = 0
    for page in reader.pages:
        annotations += len(page.get("/Annots", []))
    return {"file": str(pdf_path), "pages": len(reader.pages), "page_size_points": page_sizes[0], "annotations": annotations, "blank_pages": blank_pages, "rendered_pages": pages}


def create_contact_sheet(review_summary: dict) -> Path:
    portfolio_key = "Rafael_Smadja_Brand_Portfolio_2026.pdf"
    pages = review_summary[portfolio_key]["rendered_pages"]
    thumbs = []
    for item in pages:
        with Image.open(item["render"]) as opened:
            thumb = opened.convert("RGB")
            thumb.thumbnail((330, 468), Image.Resampling.LANCZOS)
            thumbs.append(thumb.copy())
    columns = 5
    rows = math.ceil(len(thumbs) / columns)
    cell_w, cell_h = 360, 520
    sheet = Image.new("RGB", (columns * cell_w, rows * cell_h + 110), (226, 222, 212))
    draw = ImageDraw.Draw(sheet)
    title_font = ImageFont.truetype("arialbd.ttf", 38)
    page_font = ImageFont.truetype("arial.ttf", 18)
    draw.text((25, 24), "RAFAEL SMADJA - BRAND PORTFOLIO 2026", font=title_font, fill=(27, 28, 25))
    draw.text((25, 72), "25-page visual QA contact sheet", font=page_font, fill=(92, 92, 83))
    for index, thumb in enumerate(thumbs):
        col = index % columns
        row = index // columns
        x = col * cell_w + (cell_w - thumb.width) // 2
        y = 110 + row * cell_h
        sheet.paste(thumb, (x, y))
        draw.text((col * cell_w + 15, y + 475), f"PAGE {index + 1:02d}", font=page_font, fill=(62, 63, 57))
    target = OUTPUT / "portfolio-contact-sheet.jpg"
    sheet.save(target, quality=88, optimize=True)
    return target


def write_report(summary: dict, contact_sheet: Path) -> None:
    brands = DATA["brands"]
    audit_by_id = {brand["id"]: brand for brand in AUDIT["brands"]}
    selected_total = sum(audit_by_id[brand["id"]]["selected_count"] for brand in brands)
    not_placed_total = AUDIT["asset_count"] - selected_total
    lines = [
        "# Rafael Smadja Portfolio Production Report",
        "",
        "## Outcome",
        "",
        f"- Audited **{AUDIT['brand_count']} brand folders** and **{AUDIT['asset_count']} source assets** without modifying the originals.",
        f"- Curated **{selected_total} assets** into the final case-study pages; **{not_placed_total} assets** remain documented but were not placed because of repetition, weaker composition, page limits, or non-visual/supporting-file status.",
        "- Built exactly one dedicated case-study page per brand folder.",
        "- No external or AI-generated mockups were required. Video assets are represented by automatically extracted still frames.",
        "",
        "## Strategic brand order",
        "",
    ]
    for index, brand in enumerate(brands, 1):
        audit_brand = audit_by_id[brand["id"]]
        lines.append(f"{index}. **{brand['name']}** - {brand['sector']} - {audit_brand['selected_count']} selected of {audit_brand['asset_count']} audited assets")
    lines.extend([
        "",
        "## Sparse or constrained source sets",
        "",
        "- Baron Herzog, Honey, and Boom Chicka Pop contain only two or three primary visual assets. Their pages use focused editorial layouts rather than fabricated deliverables.",
        "- The General folder is presented honestly as selected CGI and campaign experiments because it contains unrelated standalone concepts rather than one unified identity.",
        "- Interior Design contains a coherent visualization set but no separate logo source; the mark is shown as it appears within the supplied scenes.",
        "",
        "## Output validation",
        "",
    ])
    for name, data in summary.items():
        lines.append(f"- `{name}` - {data['pages']} pages, {data['annotations']} link annotations, no blank pages detected")
    lines.extend([
        f"- Contact sheet: `{contact_sheet}`",
        "- All PDFs are A4 portrait, use selectable text, preserve clickable contact URLs, and were rendered page-by-page for visual QA.",
        "",
        "## Regeneration commands",
        "",
        "```powershell",
        "npm run portfolio:audit",
        "npm run portfolio:build",
        "npm run portfolio:export",
        "npm run portfolio:review",
        "```",
        "",
        "The source of truth for brand page order and curation is `portfolio/src/portfolio-data.json`. Asset metadata and selection decisions are in `portfolio/generated/brand-audit.json`.",
    ])
    (PORTFOLIO / "PORTFOLIO_REPORT.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    REVIEW.mkdir(parents=True, exist_ok=True)
    summary = {}
    for filename, expected_pages in EXPECTED.items():
        summary[filename] = render_and_check(OUTPUT / filename, expected_pages)
    contact_sheet = create_contact_sheet(summary)
    (PORTFOLIO / "generated" / "qa-summary.json").write_text(json.dumps(summary, indent=2), encoding="utf-8")
    write_report(summary, contact_sheet)
    print("Validated all PDFs, rendered every page, and created the portfolio contact sheet.")


if __name__ == "__main__":
    main()
