#!/usr/bin/env python3
"""Create visual QC sheets and validate generated AYESMAJ brand-world assets."""

from __future__ import annotations

import json
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFile, ImageFont, ImageOps

ImageFile.LOAD_TRUNCATED_IMAGES = True


def main() -> int:
    repo = Path(__file__).resolve().parents[1]
    root = repo / "public" / "brands"
    output_root = repo / "tmp" / "brand-world-qc"
    output_root.mkdir(parents=True, exist_ok=True)
    font = ImageFont.load_default()
    index = []
    failures = 0

    for brand_dir in sorted(path for path in root.iterdir() if path.is_dir()):
        files = sorted(
            path for path in (brand_dir / "generated").rglob("*")
            if path.is_file() and "_rejected" not in path.parts and path.suffix.casefold() in {".png", ".jpg", ".jpeg", ".webp"}
        )
        if not files:
            continue
        records = []
        for path in files:
            try:
                with Image.open(path) as opened:
                    opened.load()
                    preview = opened.convert("RGB")
                    issue = None
                    if opened.width < 1000 or opened.height < 650:
                        issue = f"unexpected dimensions {opened.width}x{opened.height}"
                        failures += 1
                    records.append((path, preview, opened.width, opened.height, issue))
            except OSError as exc:
                records.append((path, None, 0, 0, str(exc)))
                failures += 1

        columns, tile_w, tile_h = 3, 420, 330
        rows = math.ceil(len(records) / columns)
        sheet = Image.new("RGB", (columns * tile_w, 68 + rows * tile_h), "#EFE9DF")
        draw = ImageDraw.Draw(sheet)
        draw.text((20, 18), f"{brand_dir.name.upper()} / GENERATED QC / {len(records)} ASSETS", fill="#17130F", font=font)
        for index_number, (path, preview, width, height, issue) in enumerate(records):
            x = (index_number % columns) * tile_w + 8
            y = 68 + (index_number // columns) * tile_h + 8
            card = Image.new("RGB", (tile_w - 16, tile_h - 16), "#FFFCF7")
            if preview:
                image = ImageOps.fit(preview, (tile_w - 36, tile_h - 74), Image.Resampling.LANCZOS)
                card.paste(image, (10, 10))
            card_draw = ImageDraw.Draw(card)
            rel = path.relative_to(brand_dir / "generated").as_posix()
            if len(rel) > 54:
                rel = rel[:51] + "..."
            card_draw.text((12, tile_h - 54), rel, fill="#17130F", font=font)
            card_draw.text((12, tile_h - 36), f"{width}x{height}" + (f" / ISSUE: {issue}" if issue else " / READY FOR VISUAL REVIEW"), fill="#A23C2B" if issue else "#6D655C", font=font)
            sheet.paste(card, (x, y))
        sheet_path = output_root / f"{brand_dir.name}.jpg"
        sheet.save(sheet_path, "JPEG", quality=90, optimize=True)
        index.append({
            "brand": brand_dir.name,
            "assetCount": len(records),
            "issues": [record[4] for record in records if record[4]],
            "contactSheet": sheet_path.relative_to(repo).as_posix(),
        })

    (output_root / "index.json").write_text(json.dumps(index, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({"brands": len(index), "assets": sum(item["assetCount"] for item in index), "integrityIssues": failures}, indent=2))
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
