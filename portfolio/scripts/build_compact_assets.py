from __future__ import annotations

import json
import shutil
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[2]
PORTFOLIO = ROOT / "portfolio"
AUDIT = PORTFOLIO / "generated" / "brand-audit.json"
SOURCE_PREVIEWS = PORTFOLIO / "generated"
COMPACT_ROOT = PORTFOLIO / "generated" / "previews-compact"
BUILD = PORTFOLIO / "build"
MAX_SIZE = (680, 520)
JPEG_QUALITY = 48


def main() -> None:
    audit = json.loads(AUDIT.read_text(encoding="utf-8"))
    if COMPACT_ROOT.exists():
        shutil.rmtree(COMPACT_ROOT)
    selected = [
        asset
        for brand in audit["brands"]
        for asset in brand["assets"]
        if asset.get("selected") and asset.get("preview")
    ]
    for asset in selected:
        relative = Path(asset["preview"])
        source = SOURCE_PREVIEWS / relative
        compact_relative = Path(*relative.parts[1:]) if relative.parts and relative.parts[0] == "previews" else relative
        target = COMPACT_ROOT / compact_relative
        target.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            image.thumbnail(MAX_SIZE, Image.Resampling.LANCZOS)
            image.save(target, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)

    source_html = BUILD / "combined.html"
    compact_html = BUILD / "combined-compact.html"
    markup = source_html.read_text(encoding="utf-8").replace(
        "../generated/previews/", "../generated/previews-compact/"
    )
    compact_html.write_text(markup, encoding="utf-8")
    total_bytes = sum(path.stat().st_size for path in COMPACT_ROOT.rglob("*.jpg"))
    print(f"Built {len(selected)} compact assets ({total_bytes / 1024 / 1024:.2f} MB) at {MAX_SIZE[0]}px / JPEG quality {JPEG_QUALITY}.")


if __name__ == "__main__":
    main()
