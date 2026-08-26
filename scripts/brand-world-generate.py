#!/usr/bin/env python3
"""Reference-first GPT Image 2 expansion for AYESMAJ brand worlds.

The script reads each brand-manifest.json, prepares non-destructive lightweight
reference copies, invokes the bundled image_gen CLI (never a client-side key),
and records generation provenance back into the manifest. Brands are processed
sequentially; assets within one brand may run concurrently.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from PIL import Image, ImageDraw, ImageFile, ImageFont, ImageOps

ImageFile.LOAD_TRUNCATED_IMAGES = True

ASSET_SPECS = {
    "identity-system": {
        "folder": "identity", "filename": "identity-system.webp", "quality": "high",
        "request": "Create a premium landscape identity-system presentation: the existing mark as the anchor, tactile color and material swatches, typographic rhythm represented without fake readable paragraphs, graphic motifs, and one restrained real-world application.",
        "composition": "16:9 editorial identity board with generous spacing, exact visual hierarchy, and a bright or atmospheric brand-appropriate surface",
    },
    "website-responsive": {
        "folder": "web", "filename": "website-responsive.webp", "quality": "high",
        "request": "Create a bespoke responsive website presentation for this exact brand across laptop, tablet, and phone. Screens must inherit the reference imagery, palette, product, and composition language and feel like one real premium website system.",
        "composition": "16:9 device-family studio scene with a clearly visible desktop hero, supporting mobile screens, and elegant depth",
    },
    "homepage-hero": {
        "folder": "web", "filename": "homepage-hero.webp", "quality": "high",
        "request": "Create a polished desktop homepage hero screenshot for this exact brand. It must look like a real premium website opening screen built from the supplied brand identity, logo, product or service imagery, colors, and visual language.",
        "composition": "wide 16:9 full-bleed homepage canvas with no browser chrome and no device mockup; show a refined top navigation, a decisive hero layout, one clear primary call-to-action shape, and a dominant brand-specific visual focal point; keep all important content inside safe margins so the complete hero is visible",
    },
    "social-system": {
        "folder": "social", "filename": "social-system.webp", "quality": "high",
        "request": "Create one cohesive social campaign system with six distinct tiles: hero, product or service proof, detail, atmosphere, announcement-style composition, and closing brand moment. Every tile must share one art direction.",
        "composition": "16:9 premium social-grid presentation with six clean frames, controlled variety, and a strong central rhythm",
    },
    "campaign-system": {
        "folder": "campaign", "filename": "campaign-system.webp", "quality": "high",
        "request": "Create a unified campaign family showing a hero advertising visual, a vertical poster, a digital display, and a secondary detail composition. Keep one clear campaign idea across every application.",
        "composition": "16:9 campaign presentation board with four deliberately different but related applications",
    },
    "storyboard": {
        "folder": "storyboard", "filename": "storyboard.webp", "quality": "high",
        "request": "Create an obvious six-frame cinematic storyboard for this brand: establish, introduce the subject, reveal the key product or service, transformation, hero moment, and clean end frame. The frames should feel like one film, not six unrelated posters.",
        "composition": "16:9 board with six equal cinematic frames, clear camera progression, simple frame dividers, and no written paragraphs",
    },
    "brand-world-master": {
        "folder": "master", "filename": "brand-world-master.webp", "quality": "high",
        "request": "Create the definitive premium brand-world master image, combining the most relevant touchpoints from the references into one spectacular but controlled visual universe: identity, core product or service, campaign, digital experience, and environmental atmosphere.",
        "composition": "16:9 hero collage with one dominant focal point, layered depth, deliberate negative space, and a complete coherent world",
    },
    "packaging-lineup": {
        "folder": "packaging", "filename": "packaging-lineup.webp", "quality": "high",
        "request": "Create a premium product-family lineup using only packaging architecture and variants supported by the references. Preserve the real product category, silhouettes, proportions, palette logic, and label placement.",
        "composition": "16:9 studio lineup with clean spacing, a strong hero item, secondary items, and refined material reflections",
    },
    "packaging-detail": {
        "folder": "packaging", "filename": "packaging-detail.webp", "quality": "high",
        "request": "Create an art-directed macro packaging detail that celebrates the reference materials, print finish, label structure, surface texture, and product craftsmanship without inventing regulatory or nutritional copy.",
        "composition": "16:9 macro editorial crop with shallow depth, tactile lighting, and one unmistakable material focal point",
    },
    "cgi-hero": {
        "folder": "cgi", "filename": "cgi-hero.webp", "quality": "high",
        "request": "Create a high-end CGI hero scene for the exact subject in the references, preserving its proportions and design while using premium materials, controlled energy, and a believable environment that explains the product or world.",
        "composition": "16:9 cinematic CGI frame with accurate geometry, strong scale cues, polished lighting, and one hero focal point",
    },
    "film-keyframes": {
        "folder": "film", "filename": "film-keyframes.webp", "quality": "high",
        "request": "Create six connected commercial-film keyframes for this brand, moving from atmosphere to system reveal to transformation to a memorable final brand moment. Keep character, subject, lighting, and world continuity across every frame.",
        "composition": "16:9 contact sheet of six widescreen film frames with consistent cinematography and no captions",
    },
}

BRAND_ART_DIRECTION = {
    "arizona chimney pros": ("warm Arizona daylight balanced with ember firelight", "credible field photography and direct-response editorial clarity", ["stone", "brick", "copper", "soot", "matte black"]),
    "ashe": ("low-key amber firelight with ember rim lighting", "ritual still life, centered coffee packaging, dramatic earth-and-smoke depth", ["black paper", "gold foil", "roasted coffee", "smoke", "charred earth"]),
    "ayesmaj studios": ("luminous white and prismatic light balanced with cinematic black", "panoramic multi-world compositions with disciplined premium hierarchy", ["glass", "polished metal", "light trails", "pearlescent surfaces"]),
    "baron-herzog": ("warm cellar light with restrained crimson and gold highlights", "centered luxury wine still life and refined heritage editorial", ["wine glass", "burgundy liquid", "cream paper", "gold foil", "oak"]),
    "boom-chica": ("bright high-key studio light with saturated flavor color", "bold vertical FMCG compositions with clean playful energy", ["frosted snack bar", "fruit", "cream", "foil wrapper"]),
    "butterfly": ("clean fashion-studio gradients with cool ethereal rim light", "minimal apparel catalog geometry mixed with controlled mythic CGI", ["cotton knit", "embroidery", "translucent wings", "matte fabric"]),
    "casa ora": ("airy residential daylight with soft golden-hour warmth", "calm luxury-home editorial and precise product-dashboard clarity", ["limestone", "linen", "brass", "glass", "sun-washed plaster"]),
    "electric fuel america": ("blue-hour tactical light with electric blue and restrained red accents", "mission-focused cinematic systems, technical scale, and real defense contexts", ["carbon fiber", "anodized metal", "energy arcs", "technical glass"]),
    "general": ("polished studio light adapted to each featured artwork", "curated AYESMAJ experimental-gallery rhythm with intentional contrast", ["glass", "gloss packaging", "cinematic print", "CGI surfaces"]),
    "happy jack - whiskey": ("high-country golden hour, cabin firelight, and amber bottle glow", "rugged premium bottle storytelling with landscape scale", ["amber glass", "copper", "leather", "timber", "stone"]),
    "honey": ("sunlit amber macro light with soft natural highlights", "slow tactile liquid and product closeups inspired by nature", ["amber glass", "honey", "beeswax", "wood", "wildflowers"]),
    "interior-design": ("warm architectural daylight with refined ambient pools", "wide staged interiors, clean geometry, and tactile close details", ["timber", "stone", "brass", "linen", "woven textiles"]),
    "kolie": ("bright white studio light with cobalt and violet UI glow", "friendly SaaS-product clarity, approachable bot character, and clean dashboards", ["glass UI", "white polymer", "cobalt screen glow", "soft gradients"]),
    "lacroix": ("bright saturated backlight with sparkling water and fresh citrus color", "energetic product closeups and fluid social compositions", ["aluminum", "condensation", "citrus", "water splash"]),
    "noam": ("dark technical studio light with blue, green, and red LED accents", "product turntables, exploded engineering views, and rugged motion frames", ["anodized metal", "speaker mesh", "LED light", "molded polymer"]),
    "paranormal": ("midnight blue museum light with jewel and gold highlights", "ornate symmetrical luxury, surreal fine-art detail, and restrained mystery", ["etched glass", "filigree metal", "feathers", "gemstones", "velvet"]),
    "pita-basta": ("clean commercial studio light with emerald and white contrast", "bold geometric takeaway-packaging compositions and lively food culture", ["coated card", "foil print", "kraft paper", "fresh food texture"]),
    "podos ai": ("clinical white and steel-blue light balanced with deep technical navy", "engineered product cutaways, industrial scale, and investor-grade clarity", ["anodized black metal", "technical glass", "blue LEDs", "structural steel"]),
    "rebound": ("soft natural daylight with warm metallic highlights", "airy skincare editorial, restorative calm, and intimate human detail", ["amber glass", "frosted glass", "limestone", "linen", "brass"]),
    "syntropic": ("luminous white, electric blue, and violet light with precise neon glow", "clean AI-product storytelling with flowing data and glass UI", ["glass", "light trails", "chrome", "digital gradients"]),
    "vudu - energy drink": ("saturated flavor backlight with sharp condensation highlights", "dynamic vertical can heroes, liquid motion, and explosive fruit energy", ["aluminum", "condensation", "liquid splash", "fruit"]),
}

TYPE_PRIORITY = {
    "identity-system": ["logo", "brand-mark", "identity", "packaging", "campaign"],
    "website-responsive": ["website", "campaign", "packaging", "identity", "logo"],
    "homepage-hero": ["website", "identity", "logo", "campaign", "packaging", "cgi", "3d", "photography"],
    "social-system": ["campaign", "poster", "packaging", "website", "identity", "logo"],
    "campaign-system": ["campaign", "poster", "packaging", "website", "identity", "logo"],
    "storyboard": ["campaign", "film", "packaging", "website", "cgi", "3d", "identity", "logo"],
    "brand-world-master": ["campaign", "website", "packaging", "cgi", "3d", "identity", "logo", "photography"],
    "packaging-lineup": ["packaging", "label", "campaign", "identity", "logo"],
    "packaging-detail": ["packaging", "label", "identity", "logo", "campaign"],
    "cgi-hero": ["cgi", "3d", "packaging", "photography", "campaign", "identity", "logo"],
    "film-keyframes": ["campaign", "cgi", "3d", "website", "packaging", "identity", "logo"],
}

IMAGE_SUFFIXES = {".png", ".jpg", ".jpeg", ".webp", ".gif"}
REFERENCE_EXCLUSIONS = {
    # These archive pieces contain prominent third-party trademarks. They may
    # remain in the original portfolio, but are not suitable generation inputs.
    "general": {"1.jpg", "4.jpeg"},
}


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Generate missing AYESMAJ brand-world assets with GPT Image 2")
    parser.add_argument("--root", default="public/brands")
    parser.add_argument("--brand", action="append", help="Process only this folder name; repeatable")
    parser.add_argument("--include-blenday", action="store_true")
    parser.add_argument("--concurrency", type=int, default=3)
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--force", action="store_true")
    parser.add_argument("--max-assets", type=int, default=0)
    parser.add_argument("--asset", action="append", choices=sorted(ASSET_SPECS), help="Generate this asset type for every selected brand, even when it is not listed as missing; repeatable")
    return parser.parse_args()


def safe_slug(value: str) -> str:
    return "-".join(value.casefold().replace("&", "and").split())


def prepare_reference(source: Path, destination: Path) -> Path:
    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists() and destination.stat().st_mtime >= source.stat().st_mtime:
        return destination
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened).convert("RGB")
        image.thumbnail((1536, 1536), Image.Resampling.LANCZOS)
        image.save(destination, "JPEG", quality=88, optimize=True)
    return destination


def choose_references(manifest: dict, brand_dir: Path, asset_type: str, temp_root: Path) -> list[tuple[Path, str]]:
    existing = manifest.get("existingAssets") or {}
    excluded = REFERENCE_EXCLUSIONS.get(brand_dir.name.casefold(), set())
    chosen: list[str] = []
    for kind in TYPE_PRIORITY[asset_type]:
        for filename in existing.get(kind, []):
            source = brand_dir / filename
            if filename not in excluded and source.suffix.casefold() in IMAGE_SUFFIXES and source.exists() and filename not in chosen:
                chosen.append(filename)
                break
        if len(chosen) >= 4:
            break
    if len(chosen) < 3:
        for filename in manifest.get("audit", {}).get("highestResolutionReferences", []):
            source = brand_dir / filename
            if filename not in excluded and source.suffix.casefold() in IMAGE_SUFFIXES and source.exists() and filename not in chosen:
                chosen.append(filename)
            if len(chosen) >= 4:
                break
    refs: list[tuple[Path, str]] = []
    for index, filename in enumerate(chosen[:4], start=1):
        source = brand_dir / filename
        refs.append((prepare_reference(source, temp_root / safe_slug(brand_dir.name) / f"ref-{index}.jpg"), filename))
    return refs


def build_prompt(manifest: dict, folder_name: str, asset_type: str, refs: list[tuple[Path, str]]) -> str:
    dna = manifest.get("brandDNA") or {}
    lighting, composition_style, materials = BRAND_ART_DIRECTION.get(
        folder_name.casefold(),
        (dna.get("lightingStyle") or "premium brand-appropriate studio light", dna.get("compositionStyle") or "disciplined premium editorial composition", dna.get("materials") or []),
    )
    spec = ASSET_SPECS[asset_type]
    reference_roles = "; ".join(f"Image {index}: source-of-truth brand reference ({original})" for index, (_, original) in enumerate(refs, start=1))
    colors = ", ".join((dna.get("primaryColors") or []) + (dna.get("secondaryColors") or []))
    return "\n".join([
        "Use case: product-mockup" if "packaging" in asset_type else "Use case: ads-marketing",
        f"Asset type: {asset_type} for an AYESMAJ portfolio case study",
        f"Primary request: {spec['request']}",
        f"Brand: {manifest.get('name')}",
        f"Category: {dna.get('productCategory')}",
        f"Brand character: {dna.get('visualMood')}",
        f"Input images: {reference_roles}",
        f"Scene/backdrop: extend only the world established by the reference images; do not import unrelated motifs",
        f"Style/medium: premium cinematic advertising, polished editorial design, photoreal materials, credible production value",
        f"Composition/framing: {spec['composition']}; underlying brand composition language: {composition_style}",
        f"Lighting/mood: {lighting}",
        f"Color palette: {colors}",
        f"Materials/textures: {', '.join(materials)}",
        "Constraints: Treat every input as immutable source-of-truth. Preserve the real product category, recognizable product geometry, packaging architecture, palette, logo placement logic, and personality. Create a meaningful new portfolio touchpoint, not a duplicate of a reference. No unsupported SKU, feature, metric, certification, client result, or commercial claim.",
        "Text constraints: Do not generate readable paragraphs, slogans, prices, specifications, legal copy, or invented brand spelling. Use abstract typographic blocks where interface text is needed. If a real logo is visible on a referenced physical product, preserve its placement and appearance; never create an alternate logo.",
        "Avoid: generic AI filler, unrelated sci-fi objects, excessive particles, visual clutter, warped products, duplicate objects, malformed hands or faces, fake labels, watermarks, third-party logos, and brand drift.",
    ])


def compose_general_archive(brand_dir: Path, asset_type: str, output: Path) -> dict:
    """Curate the mixed-media archive without asking a model to remix trademarks."""
    references = ["2.png", "3.png", "5.png", "6.jpeg"]
    sources = [brand_dir / filename for filename in references]
    canvas = Image.new("RGB", (1536, 1024), "#F4EFE7")
    draw = ImageDraw.Draw(canvas)
    bold_path = Path("C:/Windows/Fonts/arialbd.ttf")
    regular_path = Path("C:/Windows/Fonts/arial.ttf")
    bold = ImageFont.truetype(str(bold_path), 34) if bold_path.exists() else ImageFont.load_default()
    small = ImageFont.truetype(str(regular_path), 17) if regular_path.exists() else ImageFont.load_default()

    if asset_type == "identity-system":
        draw.rectangle((0, 0, 1536, 104), fill="#17130F")
        draw.text((54, 30), "AYESMAJ / EXPERIMENTAL ARCHIVE", fill="#F2C45B", font=bold)
        draw.text((1128, 42), "GENERAL WORK", fill="#F8F4ED", font=small)
        boxes = [(48, 142, 606, 940), (636, 142, 1010, 526), (1038, 142, 1488, 526), (636, 554, 1488, 940)]
        for source, box in zip(sources, boxes):
            with Image.open(source) as opened:
                tile = ImageOps.fit(ImageOps.exif_transpose(opened).convert("RGB"), (box[2] - box[0], box[3] - box[1]), Image.Resampling.LANCZOS)
                canvas.paste(tile, box[:2])
        palette = ["#17130F", "#913D2D", "#6DA7CB", "#C9A46C", "#EEE7DB"]
        for index, color in enumerate(palette):
            x = 636 + index * 168
            draw.rounded_rectangle((x, 958, x + 140, 993), radius=14, fill=color)
    else:
        canvas = Image.new("RGB", (1536, 1024), "#100D0B")
        boxes = [(0, 0, 520, 1024), (530, 0, 1032, 506), (1042, 0, 1536, 506), (530, 516, 1536, 1024)]
        for source, box in zip(sources, boxes):
            with Image.open(source) as opened:
                tile = ImageOps.fit(ImageOps.exif_transpose(opened).convert("RGB"), (box[2] - box[0], box[3] - box[1]), Image.Resampling.LANCZOS)
                canvas.paste(tile, box[:2])
        veil = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        veil_draw = ImageDraw.Draw(veil)
        veil_draw.rectangle((0, 760, 1536, 1024), fill=(12, 9, 7, 210))
        canvas = Image.alpha_composite(canvas.convert("RGBA"), veil).convert("RGB")
        draw = ImageDraw.Draw(canvas)
        hero_font = ImageFont.truetype(str(bold_path), 66) if bold_path.exists() else bold
        draw.text((580, 810), "EXPERIMENTS IN IMAGE & FORM", fill="#FFF8EC", font=hero_font)
        draw.text((586, 904), "PRODUCT • CHARACTER • CAMPAIGN • CGI", fill="#F2C45B", font=small)

    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output, "WEBP", quality=90, method=6)
    return {
        "assetType": asset_type,
        "filename": output.relative_to(brand_dir).as_posix(),
        "source": "composited-from-originals",
        "references": references,
        "model": None,
        "quality": "deterministic-original-media",
        "size": "1536x1024",
        "purpose": "portfolio extension",
        "prompt": None,
        "status": "generated-pending-qc",
        "operation": "safe-archive-composition",
    }


def run_generation(cli: Path, manifest: dict, brand_dir: Path, asset_type: str, temp_root: Path, force: bool, dry_run: bool) -> dict:
    spec = ASSET_SPECS[asset_type]
    output = brand_dir / "generated" / spec["folder"] / spec["filename"]
    output.parent.mkdir(parents=True, exist_ok=True)
    if brand_dir.name.casefold() == "general" and asset_type in {"identity-system", "brand-world-master"} and not dry_run:
        if output.exists() and not force:
            record = compose_general_archive(brand_dir, asset_type, output)
            record["operation"] = "adopted-existing-output"
            return record
        return compose_general_archive(brand_dir, asset_type, output)
    refs = choose_references(manifest, brand_dir, asset_type, temp_root)
    if not refs:
        return {"assetType": asset_type, "status": "failed", "error": "No usable image references"}
    prompt = build_prompt(manifest, brand_dir.name, asset_type, refs)
    base_record = {
        "assetType": asset_type,
        "filename": output.relative_to(brand_dir).as_posix(),
        "source": "generated",
        "references": [original for _, original in refs],
        "preparedReferences": [path.relative_to(temp_root).as_posix() for path, _ in refs],
        "model": "gpt-image-2",
        "quality": spec["quality"],
        "size": "1536x1024",
        "purpose": "portfolio extension",
        "prompt": prompt,
    }
    command = [
        sys.executable, str(cli), "edit", "--model", "gpt-image-2",
        "--prompt", prompt, "--size", "1536x1024", "--quality", spec["quality"],
        "--output-format", "webp", "--output-compression", "88", "--out", str(output),
    ]
    for ref, _ in refs:
        command.extend(["--image", str(ref)])
    if force:
        command.append("--force")
    if dry_run:
        command.append("--dry-run")
    if output.exists() and not force and not dry_run:
        return {**base_record, "status": "generated-pending-qc", "operation": "adopted-existing-output"}
    result = subprocess.run(command, cwd=brand_dir.parents[2], capture_output=True, text=True, encoding="utf-8", errors="replace")
    record = {**base_record,
        "status": ("dry-run" if dry_run else "generated-pending-qc") if result.returncode == 0 else "failed",
    }
    if result.returncode != 0:
        record["error"] = (result.stderr or result.stdout)[-1200:]
    return record


def update_art_direction(manifest: dict, folder_name: str) -> None:
    override = BRAND_ART_DIRECTION.get(folder_name.casefold())
    if not override:
        return
    lighting, composition, materials = override
    manifest["brandDNA"]["lightingStyle"] = lighting
    manifest["brandDNA"]["compositionStyle"] = composition
    manifest["brandDNA"]["materials"] = materials
    manifest["status"] = "brand-dna-approved"


def write_manifest(path: Path, manifest: dict) -> None:
    path.write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def main() -> int:
    args = parse_args()
    repo = Path(__file__).resolve().parents[1]
    brand_root = (repo / args.root).resolve()
    cli = Path(os.environ.get("CODEX_HOME", str(Path.home() / ".codex"))) / "skills" / ".system" / "imagegen" / "scripts" / "image_gen.py"
    if not cli.exists():
        raise SystemExit(f"Bundled image generator not found: {cli}")
    if not args.dry_run and not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("OPENAI_API_KEY is not available in the process environment")
    requested = {name.casefold() for name in (args.brand or [])}
    temp_root = repo / "tmp" / "brand-world-generation" / "references"
    total_generated = total_failed = total_skipped = 0

    for brand_dir in sorted(path for path in brand_root.iterdir() if path.is_dir()):
        if brand_dir.name.casefold() == "blenday" and not args.include_blenday:
            continue
        if requested and brand_dir.name.casefold() not in requested:
            continue
        manifest_path = brand_dir / "brand-manifest.json"
        if not manifest_path.exists():
            print(f"SKIP {brand_dir.name}: no manifest")
            continue
        manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        update_art_direction(manifest, brand_dir.name)
        missing = list(dict.fromkeys(args.asset or [asset for asset in manifest.get("missingAssets", []) if asset in ASSET_SPECS]))
        if args.max_assets:
            missing = missing[:args.max_assets]
        if not missing:
            write_manifest(manifest_path, manifest)
            continue
        print(f"\n[{brand_dir.name}] {len(missing)} assets", flush=True)
        plans = []
        for asset_type in missing:
            refs = choose_references(manifest, brand_dir, asset_type, temp_root)
            plans.append({
                "assetType": asset_type,
                "output": f"generated/{ASSET_SPECS[asset_type]['folder']}/{ASSET_SPECS[asset_type]['filename']}",
                "references": [original for _, original in refs],
                "model": "gpt-image-2",
                "quality": ASSET_SPECS[asset_type]["quality"],
            })
        manifest["generationPlan"] = plans
        write_manifest(manifest_path, manifest)

        records = []
        with ThreadPoolExecutor(max_workers=max(1, min(args.concurrency, len(missing)))) as pool:
            futures = {
                pool.submit(run_generation, cli, manifest, brand_dir, asset_type, temp_root, args.force, args.dry_run): asset_type
                for asset_type in missing
            }
            for future in as_completed(futures):
                record = future.result()
                records.append(record)
                status = record.get("status")
                print(f"  {status.upper():>20}  {record['assetType']}", flush=True)
                if status == "generated-pending-qc":
                    total_generated += 1
                elif status == "skipped":
                    total_skipped += 1
                elif status == "failed":
                    total_failed += 1

        existing_records = {item.get("assetType"): item for item in manifest.get("generatedAssets", [])}
        for record in records:
            if record.get("status") != "skipped":
                existing_records[record["assetType"]] = record
        manifest["generatedAssets"] = list(existing_records.values())
        manifest["status"] = "generated-pending-qc" if not any(item.get("status") == "failed" for item in records) else "generation-incomplete"
        write_manifest(manifest_path, manifest)

    print(json.dumps({"generated": total_generated, "skipped": total_skipped, "failed": total_failed}, indent=2))
    return 1 if total_failed else 0


if __name__ == "__main__":
    raise SystemExit(main())
