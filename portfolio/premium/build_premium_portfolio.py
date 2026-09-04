from __future__ import annotations

import hashlib
import html
import json
import re
import shutil
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from PIL import Image, ImageColor, ImageOps


ROOT = Path(__file__).resolve().parents[2]
PORTFOLIO = ROOT / "portfolio"
PREMIUM = PORTFOLIO / "premium"
PUBLIC = ROOT / "public"
BRANDS_ROOT = PUBLIC / "brands"
SOURCE_ASSETS = ROOT / "source-assets"
DATA_PATH = PORTFOLIO / "src" / "portfolio-data.json"
AUDIT_PATH = PORTFOLIO / "generated" / "brand-audit.json"
PORTRAIT = PORTFOLIO / "generated" / "cv-portrait.png"
BUILD = PREMIUM / "build"
GENERATED = PREMIUM / "generated"


STRONG_IDS = {
    "ayesmaj-studios",
    "electric-fuel-america",
    "podos-ai",
    "happy-jack-whiskey",
    "syntropic",
    "casa-ora",
    "rebound",
    "ashe",
    "kolie",
    "vudu-energy-drink",
    "noam",
    "blenday",
    "baron-herzog",
}

GENERATED_PRIORITY = [
    "brand-world-master",
    "website-responsive",
    "cgi-hero",
    "packaging-lineup",
    "campaign-system",
    "social-system",
    "identity-system",
    "packaging-detail",
    "storyboard",
    "film-keyframes",
]

TYPE_LABELS = {
    "brand-world-master": "Complete brand world",
    "website-responsive": "Responsive digital experience",
    "cgi-hero": "CGI product hero",
    "packaging-lineup": "Packaging family",
    "campaign-system": "Campaign system",
    "social-system": "Social system",
    "identity-system": "Identity system",
    "packaging-detail": "Packaging detail",
    "storyboard": "Storyboard / film direction",
    "film-keyframes": "Film keyframes",
}

BLENDAY_APPROVED = [
    "generated/master/brand-world-master.webp",
    "generated/identity/identity-system.webp",
    "generated/identity/logo-material.webp",
    "generated/packaging/packaging-lineup.webp",
    "generated/packaging/packaging-detail.webp",
    "generated/campaign/billboard.webp",
    "generated/web/website-responsive.webp",
    "generated/social/social-system.webp",
    "generated/environment/product-environment.webp",
    "generated/storyboard/storyboard.webp",
    "generated/film/film-keyframes.webp",
]


def esc(value: object) -> str:
    return html.escape(str(value), quote=True)


def slug(value: str) -> str:
    result = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return result or "asset"


def is_inside(path: Path, parent: Path) -> bool:
    try:
        path.resolve().relative_to(parent.resolve())
        return True
    except ValueError:
        return False


def clean_owned_dir(path: Path) -> None:
    if path.exists():
        if not is_inside(path, PREMIUM):
            raise RuntimeError(f"Refusing to remove directory outside premium workspace: {path}")
        shutil.rmtree(path)
    path.mkdir(parents=True, exist_ok=True)


def existing_path(path: Path | None) -> Path | None:
    return path if path and path.exists() and path.is_file() else None


def unique_paths(paths: Iterable[Path | None]) -> list[Path]:
    output: list[Path] = []
    seen: set[str] = set()
    for path in paths:
        if not path or not path.exists() or not path.is_file():
            continue
        key = str(path.resolve()).lower()
        if key in seen:
            continue
        seen.add(key)
        output.append(path)
    return output


def resolve_relative(root: Path, relative: str | None) -> Path | None:
    if not relative:
        return None
    candidate = root / relative
    if candidate.exists():
        return candidate
    path = Path(relative)
    for suffix in (".webp", ".png", ".jpg", ".jpeg"):
        alternate = root / path.with_suffix(suffix)
        if alternate.exists():
            return alternate
    target = path.name.lower()
    for item in root.rglob("*"):
        if item.is_file() and item.name.lower() == target:
            return item
    return None


@dataclass(frozen=True)
class AssetRef:
    path: Path
    label: str
    kind: str = "application"


class AssetPipeline:
    def __init__(self, mode: str) -> None:
        self.mode = mode
        self.output = GENERATED / mode
        self.cache: dict[str, str] = {}
        self.records: list[dict[str, object]] = []
        if mode == "master":
            self.max_size = (1700, 1700)
            self.quality = 82
        else:
            self.max_size = (620, 620)
            self.quality = 25

    def prepare(self) -> None:
        clean_owned_dir(self.output)

    def register(self, source: Path, label: str = "") -> str:
        source = source.resolve()
        key = str(source).lower()
        if key in self.cache:
            return self.cache[key]
        digest = hashlib.sha1(key.encode("utf-8")).hexdigest()[:12]
        filename = f"{slug(source.stem)[:54]}-{digest}.jpg"
        target = self.output / filename
        try:
            with Image.open(source) as opened:
                image = ImageOps.exif_transpose(opened)
                if getattr(image, "is_animated", False):
                    image.seek(0)
                if image.mode in ("RGBA", "LA") or "transparency" in image.info:
                    rgba = image.convert("RGBA")
                    canvas = Image.new("RGBA", rgba.size, ImageColor.getrgb("#f5f1e8") + (255,))
                    canvas.alpha_composite(rgba)
                    image = canvas.convert("RGB")
                else:
                    image = image.convert("RGB")
                image.thumbnail(self.max_size, Image.Resampling.LANCZOS)
                image.save(
                    target,
                    "JPEG",
                    quality=self.quality,
                    optimize=True,
                    progressive=True,
                    subsampling=2,
                )
        except Exception as exc:
            raise RuntimeError(f"Could not prepare {source}: {exc}") from exc
        relative = f"../generated/{self.mode}/{filename}"
        self.cache[key] = relative
        self.records.append(
            {
                "source": str(source),
                "output": str(target),
                "label": label,
                "bytes": target.stat().st_size,
            }
        )
        return relative


@dataclass
class BrandContext:
    data: dict
    folder: Path
    manifest: dict
    generated: list[AssetRef]
    originals: list[AssetRef]
    logo: Path | None
    master: AssetRef
    gallery: list[AssetRef]
    spread: list[AssetRef]


def approved_generated(folder: Path, manifest: dict, brand_id: str) -> list[AssetRef]:
    output: list[AssetRef] = []
    for asset in manifest.get("generatedAssets", []):
        asset_type = asset.get("assetType")
        filename = asset.get("filename")
        status = asset.get("status")
        if asset_type == "homepage-hero" or status == "generated-pending-qc":
            continue
        if status != "approved":
            continue
        path = resolve_relative(folder, filename)
        if path:
            output.append(AssetRef(path, TYPE_LABELS.get(asset_type, "Brand application"), asset_type or "application"))
    if brand_id == "blenday":
        for relative in BLENDAY_APPROVED:
            path = resolve_relative(folder, relative)
            if not path or "_rejected" in path.parts:
                continue
            inferred = next((kind for kind in GENERATED_PRIORITY if kind.replace("-", "") in relative.replace("-", "")), "application")
            if "master" in relative:
                inferred = "brand-world-master"
            elif "website" in relative:
                inferred = "website-responsive"
            elif "packaging-lineup" in relative:
                inferred = "packaging-lineup"
            elif "packaging-detail" in relative:
                inferred = "packaging-detail"
            elif "storyboard" in relative:
                inferred = "storyboard"
            elif "film-keyframes" in relative:
                inferred = "film-keyframes"
            elif "identity-system" in relative:
                inferred = "identity-system"
            elif "social-system" in relative:
                inferred = "social-system"
            output.append(AssetRef(path, TYPE_LABELS.get(inferred, "Brand application"), inferred))
    deduped: list[AssetRef] = []
    seen: set[str] = set()
    for asset in output:
        key = str(asset.path.resolve()).lower()
        if key in seen:
            continue
        seen.add(key)
        deduped.append(asset)
    return deduped


def original_assets(folder: Path, brand: dict) -> list[AssetRef]:
    output: list[AssetRef] = []
    for filename in brand.get("assets", []):
        path = resolve_relative(folder, filename)
        if not path or path.suffix.lower() in {".mp4", ".mov", ".webm"}:
            continue
        lowered = filename.lower()
        if "logo" in lowered or "wordmark" in lowered:
            label = "Original identity"
            kind = "logo"
        elif "website" in lowered or "hero" in lowered:
            label = "Original digital experience"
            kind = "website"
        else:
            label = "Original application"
            kind = "application"
        output.append(AssetRef(path, label, kind))
    return output


def find_logo(folder: Path, brand: dict, manifest: dict) -> Path | None:
    if brand["id"] in {"rebound", "interior-design", "general"}:
        return None
    candidates: list[str] = []
    existing = manifest.get("existingAssets", {})
    candidates.extend(existing.get("logo", []))
    candidates.extend(
        filename
        for filename in brand.get("assets", [])
        if "logo" in filename.lower() or "wordmark" in filename.lower()
    )
    candidates.extend(["logo-generated.webp", "logo-generated.png"])
    for candidate in candidates:
        path = resolve_relative(folder, candidate)
        if path:
            return path
    return None


def select_brand_context(brand: dict, audit_by_id: dict[str, dict]) -> BrandContext:
    folder_name = audit_by_id[brand["id"]]["folder_name"]
    folder = BRANDS_ROOT / folder_name
    manifest_path = folder / "brand-manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8")) if manifest_path.exists() else {}
    generated = approved_generated(folder, manifest, brand["id"])
    originals = original_assets(folder, brand)
    by_kind: dict[str, AssetRef] = {}
    for asset in generated:
        by_kind.setdefault(asset.kind, asset)

    master = by_kind.get("brand-world-master") or by_kind.get("cgi-hero") or (originals[0] if originals else None)
    if master is None:
        raise RuntimeError(f"No usable hero found for {brand['name']}")

    preferred = [
        by_kind.get("website-responsive"),
        by_kind.get("campaign-system") or by_kind.get("packaging-lineup") or by_kind.get("cgi-hero"),
        by_kind.get("storyboard") or by_kind.get("social-system") or by_kind.get("identity-system"),
    ]
    pool = [asset for asset in generated + originals if asset.path != master.path]
    gallery: list[AssetRef] = []
    seen: set[str] = {str(master.path.resolve()).lower()}
    for asset in preferred + pool:
        if not asset:
            continue
        key = str(asset.path.resolve()).lower()
        if key in seen:
            continue
        seen.add(key)
        gallery.append(asset)
        if len(gallery) == 3:
            break
    while len(gallery) < 3:
        gallery.append(master)

    spread: list[AssetRef] = []
    used = {str(item.path.resolve()).lower() for item in [master, *gallery]}
    prioritized = sorted(
        generated,
        key=lambda item: GENERATED_PRIORITY.index(item.kind) if item.kind in GENERATED_PRIORITY else 999,
    )
    for asset in prioritized + originals:
        key = str(asset.path.resolve()).lower()
        if key in used:
            continue
        used.add(key)
        spread.append(asset)
        if len(spread) == 4:
            break
    if not spread:
        spread = gallery[:]

    return BrandContext(
        data=brand,
        folder=folder,
        manifest=manifest,
        generated=generated,
        originals=originals,
        logo=find_logo(folder, brand, manifest),
        master=master,
        gallery=gallery,
        spread=spread,
    )


def image_tag(pipeline: AssetPipeline, source: Path, label: str, extra_class: str = "") -> str:
    src = pipeline.register(source, label)
    class_attr = f' class="{esc(extra_class)}"' if extra_class else ""
    return f'<img src="{esc(src)}" alt="{esc(label)}"{class_attr}>'


def folio(page_no: int, label: str) -> str:
    return f'<footer class="folio"><span>{esc(label)}</span><span class="page-number">{page_no:02d}</span></footer>'


def resume_page_one(pipeline: AssetPipeline, page_no: int) -> str:
    portrait = image_tag(pipeline, PORTRAIT, "Portrait of Rafael Smadja", "resume-portrait")
    return f"""
<section class="page resume-page" id="resume" aria-label="Rafael Smadja resume page one">
  <header class="resume-hero">
    {portrait}
    <div>
      <h1 class="resume-name">Rafael Smadja</h1>
      <div class="resume-role">Art Director / 3D Artist / Creative Founder</div>
      <div class="resume-contact">
        <span>Phoenix, Arizona</span>
        <a href="tel:+15093197999">+1 509-319-7999</a>
        <a href="mailto:smadja.rafael@gmail.com">smadja.rafael@gmail.com</a>
        <a href="https://www.linkedin.com/in/rafael-smadja-0169831b">LinkedIn</a>
        <a href="https://ayesmajstudios.com">ayesmajstudios.com</a>
      </div>
    </div>
  </header>
  <main class="resume-body">
    <div class="resume-summary-grid">
      <p class="resume-summary">Multidisciplinary Art Director, 3D Artist and founder of AYESMAJ Studios, creating connected brand worlds across identity, packaging, premium web experiences, AI-assisted content, product CGI, motion, VFX and storyboards. Leads projects from positioning and visual direction through production and launch, translating technical, commercial and spatial ideas into clear, cinematic systems.</p>
      <aside class="resume-snapshot">
        <strong>Creative profile</strong>
        <span>Direction + design</span>
        <span>3D + cinematic craft</span>
        <span>Strategy + delivery</span>
      </aside>
    </div>
    <section class="resume-section">
      <h2 class="resume-section-title">Professional experience</h2>
      <article class="job">
        <div class="job-head"><h3 class="job-title">Art Director</h3><div class="job-date">2024 - Present</div></div>
        <div class="job-company">PODOS AI &amp; Syntropic</div>
        <ul>
          <li>Own creative direction across brand identity, investor presentations, websites, product storytelling and cinematic launch campaigns for advanced AI and infrastructure companies.</li>
          <li>Translate technical concepts into clear visual systems, product CGI, storyboards, motion direction and presentation-ready communication.</li>
          <li>Maintain consistency across typography, color, diagrams, interface visuals and AI-assisted production while collaborating with founders and technical teams.</li>
        </ul>
      </article>
      <article class="job">
        <div class="job-head"><h3 class="job-title">Founder &amp; Creative Director</h3><div class="job-date">2022 - Present</div></div>
        <div class="job-company">AYESMAJ Studios / Self-Employed</div>
        <ul>
          <li>Lead complete brand-world projects spanning strategy, identity, packaging, responsive web, AI image and video, 3D/CGI, motion, storyboards and launch campaigns.</li>
          <li>Direct AI-assisted production through a human-led creative point of view, maintaining one coherent visual language across every deliverable.</li>
          <li>Manage discovery, proposals, production planning, art direction, client presentations, feedback and final delivery across technology, consumer, hospitality and service sectors.</li>
        </ul>
      </article>
      <article class="job">
        <div class="job-head"><h3 class="job-title">Sales Consultant</h3><div class="job-date">2024 - 2026</div></div>
        <div class="job-company">Construction &amp; Remodeling</div>
        <ul>
          <li>Managed residential construction and remodeling sales from consultation and site assessment through scope, estimate, negotiation and close.</li>
          <li>Translated technical options into practical client decisions and coordinated expectations between homeowners and field teams.</li>
        </ul>
      </article>
    </section>
  </main>
  {folio(page_no, "Rafael Smadja / Resume")}
</section>
"""


def resume_page_two(pipeline: AssetPipeline, page_no: int, contexts: dict[str, BrandContext]) -> str:
    strip_ids = ["electric-fuel-america", "happy-jack-whiskey", "podos-ai"]
    strip = "".join(image_tag(pipeline, contexts[item].master.path, contexts[item].master.label) for item in strip_ids)
    return f"""
<section class="page resume-page" aria-label="Rafael Smadja resume page two">
  <header class="resume-topline">
    <div class="eyebrow" style="color:#cfaf65">Selected experience &amp; capabilities</div>
    <h1 class="resume-name">Rafael Smadja</h1>
  </header>
  <main class="resume-columns">
    <div>
      <section class="resume-section">
        <h2 class="resume-section-title">Earlier experience</h2>
        <article class="job">
          <div class="job-head"><h3 class="job-title">3D Artist</h3><div class="job-date">2022 - 2024</div></div>
          <div class="job-company">Fuzion</div>
          <ul>
            <li>Created 3D animation, modeling, visual effects, motion graphics and branded video for advertising, social media, logos and product communication.</li>
            <li>Presented mockups and simulations, gathered feedback and refined visual materials around brand and production goals.</li>
            <li>Collaborated with artists and animators while troubleshooting rendering, optimization and scene-performance constraints.</li>
          </ul>
        </article>
        <article class="job">
          <div class="job-head"><h3 class="job-title">3D Character Artist</h3><div class="job-date">2021 - 2022</div></div>
          <div class="job-company">Meta Madagascar Island</div>
          <ul>
            <li>Designed and produced assets for a generative collection of 10,000 distinct 3D characters in collaboration with software engineers.</li>
            <li>Created models, materials, textures, lighting and presentation renders with consistent quality across a large asset system.</li>
          </ul>
        </article>
      </section>
      <section class="resume-section">
        <h2 class="resume-section-title">Education &amp; service</h2>
        <p class="resume-line"><strong>VFX - Visual Effects</strong><br>IAC - Israel Animation College / 2022 - 2023</p>
        <p class="resume-line" style="margin-top:3mm"><strong>Combat Signaller</strong><br>Israeli Navy / 2019 - 2022</p>
      </section>
      <section class="resume-section">
        <h2 class="resume-section-title">Selected work</h2>
        <div class="resume-strip">{strip}</div>
      </section>
    </div>
    <div>
      <section class="resume-section">
        <h2 class="resume-section-title">Core capabilities</h2>
        <div class="capability"><h3>Creative leadership</h3><p>Art direction / Brand systems / Visual storytelling / Campaign concepts / Storyboarding / Presentation design / Client strategy / Creative production</p></div>
        <div class="capability"><h3>3D, motion &amp; design</h3><p>3D modeling / Animation / Character art / Product visualization / Lighting / Rendering / VFX / Motion graphics / Compositing / Image-making</p></div>
        <div class="capability"><h3>Web &amp; spatial</h3><p>Responsive experience design / Interactive art direction / Architectural visualization / Plans and presentation systems / Cinematic spatial storytelling</p></div>
        <div class="capability"><h3>Business &amp; commercial</h3><p>Consultative sales / Proposals and estimates / Negotiation / Client presentations / Project scoping / Relationship management / Cross-functional collaboration</p></div>
      </section>
      <section class="resume-section">
        <h2 class="resume-section-title">Tools</h2>
        <p class="resume-line">Blender 3D / ZBrush / Adobe Substance 3D Painter / Photoshop / Adobe After Effects / 3ds Max / Marvelous Designer / AI-assisted image and video production</p>
      </section>
      <section class="resume-section">
        <h2 class="resume-section-title">Studio disciplines</h2>
        <p class="resume-line">Brand strategy &amp; identity / Premium websites / AI content production / 3D &amp; CGI / Motion, film &amp; VFX / Storyboards &amp; visual direction</p>
      </section>
    </div>
  </main>
  {folio(page_no, "Rafael Smadja / Resume")}
</section>
"""


def portfolio_cover(pipeline: AssetPipeline, page_no: int, contexts: dict[str, BrandContext]) -> str:
    art = contexts["ayesmaj-studios"].master.path
    wordmark_markup = '<span class="cover-wordmark-text">AYESMAJ</span>'
    return f"""
<section class="page portfolio-cover" id="portfolio" aria-label="Portfolio cover">
  <figure class="cover-art">{image_tag(pipeline, art, "AYESMAJ Studios complete creative world")}</figure>
  <div class="cover-brand">{wordmark_markup}<span>Creative direction / Selected work / 2026</span></div>
  <div class="cover-copy">
    <div class="eyebrow">Rafael Smadja / AYESMAJ Studios</div>
    <h1>We build brands.<br><span>We create worlds.</span></h1>
    <p>Brand systems, premium digital experiences, product CGI, motion, storyboards and spatial worlds—presented as one connected body of work.</p>
  </div>
  {folio(page_no, "Portfolio / 2026")}
</section>
"""


def contents_page(page_no: int, brands: list[dict], brand_pages: dict[str, int], chapters: list[tuple[str, int]]) -> str:
    midpoint = (len(brands) + 1) // 2
    columns = []
    for subset in (brands[:midpoint], brands[midpoint:]):
        items = []
        for brand in subset:
            items.append(
                f"""<a class="contents-item" href="#brand-{esc(brand['id'])}">
  <span class="contents-no">{brands.index(brand)+1:02d}</span>
  <span class="contents-name">{esc(brand['name'])}</span>
  <span class="contents-sector">{esc(brand['sector'])}</span>
  <span class="contents-page-no">{brand_pages[brand['id']]:02d}</span>
</a>"""
            )
        columns.append(f'<div class="contents-column">{"".join(items)}</div>')
    chapter_markup = "".join(
        f'<div class="chapter-chip"><strong>{page:02d}</strong><span>{esc(name)}</span></div>' for name, page in chapters
    )
    return f"""
<section class="page contents-page" id="contents" aria-label="Portfolio contents">
  <div class="eyebrow" style="color:#72794c">Portfolio map / 22 brand worlds + extended practice</div>
  <h1>A complete creative practice,<br>organized to be explored.</h1>
  <p class="contents-intro">Every brand receives a dedicated system page with identity, palette, digital experience, hero imagery and applications. Selected projects expand into a second editorial spread; the final chapters reveal the wider studio practice.</p>
  <div class="contents-grid">{''.join(columns)}</div>
  <div class="contents-chapters">{chapter_markup}</div>
  {folio(page_no, "Rafael Smadja / Contents")}
</section>
"""


def brand_primary_page(pipeline: AssetPipeline, context: BrandContext, brand_index: int, total: int, page_no: int) -> str:
    brand = context.data
    dark = brand.get("layout") in {"dark-hero", "tech-grid"}
    accent = brand["palette"][1] if brand["id"] == "pita-basta" else brand["palette"][2 if len(brand["palette"]) > 2 else 0]
    logo_markup = (
        image_tag(pipeline, context.logo, f"{brand['name']} logo")
        if context.logo
        else f'<span class="serif" style="font-size:4mm;color:#24231f">{esc(brand["name"])}</span>'
    )
    palette = "".join(
        f'<div class="swatch" style="background:{esc(color)}"><span>{esc(color)}</span></div>' for color in brand["palette"]
    )
    gallery = "".join(
        f'<figure class="gallery-card">{image_tag(pipeline, asset.path, f"{brand["name"]} - {asset.label}")}<figcaption class="asset-label">{esc(asset.label)}</figcaption></figure>'
        for asset in context.gallery
    )
    return f"""
<section class="page brand-page{' dark-page' if dark else ''}" id="brand-{esc(brand['id'])}" style="--accent:{esc(accent)}" aria-label="{esc(brand['name'])} brand system">
  <header class="brand-header">
    <div><div class="eyebrow" style="color:var(--accent)">Brand world {brand_index:02d} / {total:02d}</div><h1>{esc(brand['name'])}</h1></div>
    <div class="brand-header-meta">{esc(brand['sector'])}<br>{esc(brand['scope'])}</div>
  </header>
  <div class="brand-main">
    <figure class="art-frame">{image_tag(pipeline, context.master.path, f"{brand['name']} - {context.master.label}")}<figcaption class="asset-label">{esc(context.master.label)}</figcaption></figure>
    <aside class="brand-story">
      <h2>Creative direction</h2>
      <p>{esc(brand['summary'])}</p>
      <div class="brand-scope">{esc(brand['scope'])}</div>
      <div class="logo-box">{logo_markup}</div>
      <div class="type-line">{esc(brand['type'])}</div>
      <div class="palette">{palette}</div>
    </aside>
  </div>
  <div class="brand-gallery">{gallery}</div>
  {folio(page_no, f"Rafael Smadja / {brand['name']}")}
</section>
"""


def brand_spread_page(pipeline: AssetPipeline, context: BrandContext, page_no: int) -> str:
    brand = context.data
    accent = brand["palette"][1] if brand["id"] == "pita-basta" else brand["palette"][2 if len(brand["palette"]) > 2 else 0]
    cards = "".join(
        f'<figure class="spread-card">{image_tag(pipeline, asset.path, f"{brand["name"]} - {asset.label}")}<figcaption class="asset-label">{esc(asset.label)}</figcaption></figure>'
        for asset in context.spread[:4]
    )
    return f"""
<section class="page brand-spread" style="--accent:{esc(accent)}" aria-label="{esc(brand['name'])} expanded applications">
  <header class="spread-header">
    <div><div class="eyebrow" style="color:var(--accent)">Expanded system</div><h1>{esc(brand['name'])}</h1></div>
    <p>Identity, digital, campaign and cinematic touchpoints are shown as complete frames—preserving the composition and the design decisions inside each piece.</p>
  </header>
  <div class="spread-grid">{cards}</div>
  {folio(page_no, f"Rafael Smadja / {brand['name']} / Applications")}
</section>
"""


def card_grid_page(
    pipeline: AssetPipeline,
    page_no: int,
    page_id: str,
    eyebrow: str,
    title: str,
    description: str,
    assets: list[AssetRef],
    grid_class: str,
    dark: bool = False,
) -> str:
    cards = "".join(
        f'<figure class="collection-card">{image_tag(pipeline, asset.path, asset.label)}<figcaption class="asset-label">{esc(asset.label)}</figcaption></figure>'
        for asset in assets
    )
    return f"""
<section class="page chapter-page{' dark-page' if dark else ''}" id="{esc(page_id)}" aria-label="{esc(title)}">
  <header class="chapter-header">
    <div><div class="eyebrow" style="color:#c5a35f">{esc(eyebrow)}</div><h1>{esc(title)}</h1></div>
    <p>{esc(description)}</p>
  </header>
  <div class="chapter-grid {esc(grid_class)}">{cards}</div>
  {folio(page_no, f"Rafael Smadja / {title}")}
</section>
"""


def spatial_page(
    pipeline: AssetPipeline,
    page_no: int,
    page_id: str,
    eyebrow: str,
    title: str,
    description: str,
    hero: AssetRef,
    supporting: list[AssetRef],
) -> str:
    cards = "".join(
        f'<figure class="spatial-card">{image_tag(pipeline, asset.path, asset.label)}<figcaption class="asset-label">{esc(asset.label)}</figcaption></figure>'
        for asset in supporting[:3]
    )
    return f"""
<section class="page spatial-page" id="{esc(page_id)}" aria-label="{esc(title)}">
  <header class="chapter-header">
    <div><div class="eyebrow" style="color:#9b704f">{esc(eyebrow)}</div><h1>{esc(title)}</h1></div>
    <p>{esc(description)}</p>
  </header>
  <figure class="spatial-hero">{image_tag(pipeline, hero.path, hero.label)}<figcaption class="asset-label">{esc(hero.label)}</figcaption></figure>
  <div class="spatial-grid">{cards}</div>
  {folio(page_no, f"Rafael Smadja / Spatial / {title}")}
</section>
"""


def pair_page(pipeline: AssetPipeline, page_no: int, pairs: list[tuple[str, Path, Path]]) -> str:
    blocks = []
    for title, before, after in pairs:
        blocks.append(
            f"""<div class="pair-card">
  <figure>{image_tag(pipeline, before, f"{title} before")}<span class="pair-tag">Before</span></figure>
  <figure>{image_tag(pipeline, after, f"{title} after")}<span class="pair-tag">After</span></figure>
  <div class="pair-title">{esc(title)}</div>
</div>"""
        )
    return f"""
<section class="page chapter-page dark-page" id="before-after" aria-label="Before and after transformation studies">
  <header class="chapter-header">
    <div><div class="eyebrow" style="color:#d0ae64">Process / Transformation</div><h1>Before / After</h1></div>
    <p>Four visual studies show the jump from a starting point to a clearer brand, product, spatial or digital presentation.</p>
  </header>
  <div class="before-after-grid">{''.join(blocks)}</div>
  {folio(page_no, "Rafael Smadja / Transformation studies")}
</section>
"""


def contact_page(pipeline: AssetPipeline, page_no: int, contexts: dict[str, BrandContext]) -> str:
    art = contexts["ayesmaj-studios"].master.path
    logo = '<span class="contact-wordmark-text">AYESMAJ</span>'
    return f"""
<section class="page contact-page" id="contact" aria-label="Contact Rafael Smadja">
  <figure class="contact-visual">{image_tag(pipeline, art, "AYESMAJ Studios creative world")}</figure>
  <div class="contact-content">
    {logo}
    <h1>Let us build the<br><span>next visual world.</span></h1>
    <p class="contact-lede">Available for creative direction, brand systems, premium web experiences, product CGI, motion, storyboards and spatial visualization.</p>
    <div class="contact-links">
      <div class="contact-link"><strong>Portfolio</strong><a href="https://ayesmajstudios.com">ayesmajstudios.com</a></div>
      <div class="contact-link"><strong>Studio</strong><a href="mailto:ayesmajstudios@gmail.com">ayesmajstudios@gmail.com</a></div>
      <div class="contact-link"><strong>Direct</strong><a href="mailto:smadja.rafael@gmail.com">smadja.rafael@gmail.com</a></div>
      <div class="contact-link"><strong>Phone</strong><a href="tel:+15093197999">+1 509-319-7999</a></div>
      <div class="contact-link"><strong>Based</strong><span>Phoenix, Arizona / Working worldwide</span></div>
    </div>
  </div>
  {folio(page_no, "AYESMAJ Studios / Contact")}
</section>
"""


def first_existing(*paths: Path) -> Path:
    for path in paths:
        if path.exists() and path.is_file():
            return path
    raise FileNotFoundError(f"None of the candidate assets exist: {paths}")


def glob_assets(root: Path, pattern: str, labels: list[str] | None = None, limit: int | None = None) -> list[AssetRef]:
    files = sorted(path for path in root.glob(pattern) if path.is_file() and path.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp"})
    if limit:
        files = files[:limit]
    return [AssetRef(path, labels[index] if labels and index < len(labels) else path.stem.replace("_", " ").title()) for index, path in enumerate(files)]


def build_document(pipeline: AssetPipeline, data: dict, contexts: dict[str, BrandContext]) -> tuple[str, dict[str, object]]:
    brands = data["brands"]
    page_no = 5
    brand_pages: dict[str, int] = {}
    for brand in brands:
        brand_pages[brand["id"]] = page_no
        page_no += 1 + (1 if brand["id"] in STRONG_IDS else 0)

    chapter_specs = [
        "Web experiences",
        "Motion & film",
        "Storyboards",
        "Character design I",
        "Character design II",
        "Identity collection I",
        "Identity collection II",
        "Poolside Villa",
        "Maison Valmont",
        "The Patel",
        "Canal Apartment",
        "Before / after",
        "Concept Lab",
        "Contact",
    ]
    chapter_pages: dict[str, int] = {}
    for name in chapter_specs:
        chapter_pages[name] = page_no
        page_no += 1

    pages: list[str] = []
    pages.append(resume_page_one(pipeline, 1))
    pages.append(resume_page_two(pipeline, 2, contexts))
    pages.append(portfolio_cover(pipeline, 3, contexts))
    pages.append(contents_page(4, brands, brand_pages, list(chapter_pages.items())))

    current = 5
    for index, brand in enumerate(brands, 1):
        context = contexts[brand["id"]]
        pages.append(brand_primary_page(pipeline, context, index, len(brands), current))
        current += 1
        if brand["id"] in STRONG_IDS:
            pages.append(brand_spread_page(pipeline, context, current))
            current += 1

    def gen(brand_id: str, kind: str, fallback: AssetRef | None = None) -> AssetRef:
        match = next((asset for asset in contexts[brand_id].generated if asset.kind == kind), None)
        return match or fallback or contexts[brand_id].master

    web_assets = [
        AssetRef(gen("ayesmaj-studios", "website-responsive").path, "AYESMAJ Studios / Responsive experience"),
        AssetRef(gen("podos-ai", "website-responsive").path, "PODOS AI / Product platform"),
        AssetRef(gen("kolie", "website-responsive").path, "Kolie / AI voice agent"),
        AssetRef(gen("arizona-chimney-pros", "website-responsive").path, "Arizona Chimney Pros / Service experience"),
        AssetRef(gen("syntropic", "website-responsive").path, "Syntropic / AI product story"),
        AssetRef(gen("vudu-energy-drink", "website-responsive").path, "VuDu / Product campaign"),
    ]
    pages.append(card_grid_page(pipeline, current, "web-experiences", "Digital / Responsive", "Web Experiences", "Nine real project systems live across the portfolio. This chapter isolates six complete responsive presentations so the interface work can be read at a useful scale.", web_assets, "web-grid", True)); current += 1

    motion_root = PUBLIC / "assets" / "ayesmaj" / "motion-posters"
    motion_names = [
        ("factory.webp", "Factory / Film frame"),
        ("kolie-ad.webp", "Kolie / Launch advertisement"),
        ("optimus.webp", "Optimus / Identity animation"),
        ("syntropic-3d.webp", "Syntropic / 3D product film"),
        ("syntropic-53.webp", "Syntropic / Product story"),
        ("yafora.webp", "Yafora / Product CGI"),
    ]
    motion_assets = [AssetRef(first_existing(motion_root / filename), label) for filename, label in motion_names]
    pages.append(card_grid_page(pipeline, current, "motion-film", "Motion / Film / VFX", "Six moving worlds", "A still-frame edit from branded film, launch content, product CGI and motion studies. Each frame belongs to a larger time-based sequence.", motion_assets, "film-grid", True)); current += 1

    storyboard_ids = ["ayesmaj-studios", "electric-fuel-america", "podos-ai", "happy-jack-whiskey", "syntropic", "kolie", "rebound", "vudu-energy-drink"]
    storyboard_assets = [AssetRef(gen(item, "storyboard").path, f"{contexts[item].data['name']} / Storyboard") for item in storyboard_ids]
    pages.append(card_grid_page(pipeline, current, "storyboards", "Direction / Sequence", "Storyboards", "Production boards, narrative beats and visual treatments show the idea before motion begins. Every board is presented as a complete frame, never as a decorative crop.", storyboard_assets, "story-grid", False)); current += 1

    character_indices = [1, 4, 5, 6, 7, 8, 11, 13, 18, 19, 20, 22, 24, 25, 28, 29, 31, 32]
    character_assets = [AssetRef(first_existing(PUBLIC / "characters" / f"{index}.webp", PUBLIC / "characters" / f"{index}.png", PUBLIC / "characters" / f"{index}.jpeg"), f"Character study {index:02d}") for index in character_indices]
    pages.append(card_grid_page(pipeline, current, "characters", "3D / Character / Concept", "Character Design I", "Original mascots, stylized figures and cinematic portraits developed through character art, modeling, material and lighting studies.", character_assets[:9], "character-grid", True)); current += 1
    pages.append(card_grid_page(pipeline, current, "characters-ii", "3D / Character / Concept", "Character Design II", "A second edit of the character archive, including clearly framed visual-development and spec studies across multiple styles.", character_assets[9:], "character-grid", True)); current += 1

    logo_indices = list(range(1, 19))
    logo_assets = [AssetRef(first_existing(PUBLIC / "logos" / f"{index}.webp", PUBLIC / "logos" / f"{index}.png", PUBLIC / "logos" / f"{index}.jpeg"), f"Identity study {index:02d}") for index in logo_indices]
    pages.append(card_grid_page(pipeline, current, "identity-collection", "Marks / Wordmarks / Systems", "Identity Collection I", "A curated set of marks and wordmarks across technology, hospitality and lifestyle—shown on calm fields so silhouette and proportion stay legible.", logo_assets[:9], "logo-grid", False)); current += 1
    pages.append(card_grid_page(pipeline, current, "identity-collection-ii", "Marks / Wordmarks / Systems", "Identity Collection II", "Secondary identity applications, presentation boards and studio marks extend the collection beyond a single logo treatment.", logo_assets[9:], "logo-grid", False)); current += 1

    pool = PUBLIC / "interior-design" / "projects" / "poolside-villa"
    pool_hero = AssetRef(first_existing(pool / "renders" / "27_pool_hero.webp", SOURCE_ASSETS / "interior-generated" / "apartments" / "01_apartment_hero.png"), "Poolside Villa / Complete spatial world")
    pool_support = [
        AssetRef(first_existing(pool / "renders" / "03_exterior_pool_master.webp", SOURCE_ASSETS / "interior-generated" / "homes" / "71_hm_arrival.png"), "Exterior / Arrival"),
        AssetRef(first_existing(pool / "renders" / "05_living_master.webp", SOURCE_ASSETS / "interior-generated" / "furniture-decor" / "30_fd_hero.png"), "Living space / Material direction"),
        AssetRef(first_existing(pool / "renders" / "00_ground_floor_plan.webp", SOURCE_ASSETS / "interior-generated" / "apartments" / "04_apartment_3d_plan.png"), "Ground floor / Spatial plan"),
    ]
    pages.append(spatial_page(pipeline, current, "poolside-villa", "Spatial case study 01", "Poolside Villa", "From plan and exterior massing to warm material, pool and living-space visualization—the residence is presented as one legible spatial story.", pool_hero, pool_support)); current += 1

    maison = PUBLIC / "interior-design" / "projects" / "maison-valmont"
    maison_after = sorted((maison / "after").glob("*-restored.webp"))
    maison_before = sorted((maison / "before").glob("*-existing.webp"))
    maison_process = sorted((maison / "process").glob("*.webp"))
    maison_hero_path = maison_after[0] if maison_after else SOURCE_ASSETS / "interior-generated" / "bathrooms" / "20_bh_hero.png"
    maison_support_paths = unique_paths([
        maison_before[0] if maison_before else None,
        maison_after[1] if len(maison_after) > 1 else None,
        maison_process[-1] if maison_process else None,
        SOURCE_ASSETS / "interior-generated" / "bathrooms" / "51_bh_room_emerald.png",
    ])[:3]
    pages.append(spatial_page(pipeline, current, "maison-valmont", "Spatial case study 02", "Maison Valmont", "A restoration-led presentation combining existing-condition reference, refined material direction, restored interiors and a clear transformation sequence.", AssetRef(maison_hero_path, "Maison Valmont / Restored salon"), [AssetRef(path, label) for path, label in zip(maison_support_paths, ["Existing condition", "Restored interior", "Process / Reveal"]) ])); current += 1

    patel = PUBLIC / "interior-design" / "projects" / "the-patel"
    patel_hero = AssetRef(first_existing(patel / "brand" / "patel-breakout-hero.webp", patel / "renders" / "patel-hero-realistic-v2.webp", SOURCE_ASSETS / "interior-generated" / "homes" / "76_hm_web_mockup.png"), "The Patel / Branded property world")
    patel_support = [
        AssetRef(first_existing(patel / "renders" / "patel-hero-realistic-v2.webp", SOURCE_ASSETS / "interior-generated" / "homes" / "71_hm_arrival.png"), "Tower / Exterior visualization"),
        AssetRef(first_existing(patel / "renders" / "patel-rooftop-single-v2.webp", SOURCE_ASSETS / "interior-generated" / "buildings" / "07_building_amenity.png"), "Rooftop / Amenity experience"),
        AssetRef(first_existing(patel / "residence-1802" / "floorplan.webp", SOURCE_ASSETS / "interior-generated" / "apartments" / "03_apartment_clean_plan.png"), "Residence 1802 / Floor plan"),
    ]
    pages.append(spatial_page(pipeline, current, "the-patel", "Spatial case study 03", "The Patel", "Architecture, residence planning, identity and client-facing presentation are connected into one premium real-estate experience across desktop, mobile and film.", patel_hero, patel_support)); current += 1

    canal = PUBLIC / "interior-design" / "projects" / "canal-apartment" / "pairs"
    canal_files = sorted(canal.glob("*.webp"))
    if not canal_files:
        canal_files = [
            SOURCE_ASSETS / "interior-generated" / "apartments" / "61_ap_dir_artdeco.png",
            SOURCE_ASSETS / "interior-generated" / "apartments" / "62_ap_dir_organic.png",
            SOURCE_ASSETS / "interior-generated" / "apartments" / "63_ap_dir_colorful.png",
            SOURCE_ASSETS / "interior-generated" / "apartments" / "64_ap_dir_miami.png",
        ]
    canal_refs = [AssetRef(path, f"Canal Apartment / Direction {index+1:02d}") for index, path in enumerate(canal_files[:4])]
    while len(canal_refs) < 4:
        canal_refs.append(canal_refs[-1])
    pages.append(spatial_page(pipeline, current, "canal-apartment", "Spatial case study 04", "Canal Apartment", "Raw reference and editorial visualization pairs preserve the design logic while showing how material, light and atmosphere change the reading of the space.", canal_refs[0], canal_refs[1:])); current += 1

    before_root = PUBLIC / "generated" / "before-after"
    pairs = [
        ("Digital experience", first_existing(before_root / "web-before.webp", before_root / "web-before.png"), first_existing(before_root / "web-after.webp", before_root / "web-after.png")),
        ("Product presentation", first_existing(before_root / "product-before.webp", before_root / "product-before.png"), first_existing(before_root / "product-after.webp", before_root / "product-after.png")),
        ("Spatial presentation", first_existing(before_root / "space-before.webp", before_root / "space-before.png"), first_existing(before_root / "space-after.webp", before_root / "space-after.png")),
        ("Brand system", first_existing(before_root / "brand-before.webp", before_root / "brand-before.png"), first_existing(before_root / "brand-after.webp", before_root / "brand-after.png")),
    ]
    pages.append(pair_page(pipeline, current, pairs)); current += 1

    ai_posts = PUBLIC / "assets" / "ayesmaj" / "ai-posts"
    concept_assets = [
        AssetRef(first_existing(ai_posts / "post-1.webp", ai_posts / "post-1.png"), "Kama Kama / Self-initiated brand world"),
        AssetRef(first_existing(ai_posts / "post-2.webp", ai_posts / "post-2.png"), "Self-initiated concept 02"),
        AssetRef(first_existing(ai_posts / "post-3.webp", ai_posts / "post-3.png"), "Kolie / Campaign exploration"),
        AssetRef(first_existing(ai_posts / "post-4.webp", ai_posts / "post-4.png"), "Self-initiated concept 04"),
        AssetRef(first_existing(ai_posts / "post-5.webp", ai_posts / "post-5.png"), "Self-initiated concept 05"),
        AssetRef(first_existing(PUBLIC / "generated" / "projects" / "general" / "cover.webp", PUBLIC / "generated" / "projects" / "general" / "cover.png"), "Experimental CGI / Selected study"),
    ]
    pages.append(card_grid_page(pipeline, current, "concept-lab", "Clearly labeled / Self-initiated", "Concept Lab", "Fictional and self-initiated studies are separated from client work. They are included to show range in visual identity, campaign thinking and world-building—not as commercial claims.", concept_assets, "film-grid", False)); current += 1

    pages.append(contact_page(pipeline, current, contexts)); current += 1

    expected = current - 1
    if len(pages) != expected:
        raise RuntimeError(f"Page accounting mismatch: expected {expected}, built {len(pages)}")
    markup = "\n".join(
        [
            "<!doctype html>",
            '<html lang="en">',
            "<head>",
            '<meta charset="utf-8">',
            '<meta name="viewport" content="width=device-width, initial-scale=1">',
            f"<title>Rafael Smadja CV and Premium Portfolio 2026 - {pipeline.mode}</title>",
            '<link rel="stylesheet" href="../premium.css">',
            "</head>",
            "<body>",
            *pages,
            "</body>",
            "</html>",
        ]
    )
    metadata = {
        "mode": pipeline.mode,
        "page_count": len(pages),
        "brand_count": len(brands),
        "expanded_brand_count": len(STRONG_IDS),
        "asset_count": len(pipeline.records),
        "asset_bytes": sum(int(item["bytes"]) for item in pipeline.records),
        "brand_pages": brand_pages,
        "chapter_pages": chapter_pages,
        "excluded": ["All generated web/homepage-hero assets marked generated-pending-qc", "Blenday generated/_rejected"],
    }
    return markup, metadata


def main() -> None:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    audit = json.loads(AUDIT_PATH.read_text(encoding="utf-8"))
    audit_by_id = {item["id"]: item for item in audit["brands"]}
    contexts = {brand["id"]: select_brand_context(brand, audit_by_id) for brand in data["brands"]}
    BUILD.mkdir(parents=True, exist_ok=True)
    all_meta: dict[str, object] = {}
    for mode in ("master", "compact"):
        pipeline = AssetPipeline(mode)
        pipeline.prepare()
        markup, metadata = build_document(pipeline, data, contexts)
        (BUILD / f"premium-{mode}.html").write_text(markup, encoding="utf-8")
        (GENERATED / f"asset-manifest-{mode}.json").write_text(json.dumps(pipeline.records, indent=2), encoding="utf-8")
        all_meta[mode] = metadata
        print(
            f"Built {mode}: {metadata['page_count']} pages, {metadata['asset_count']} prepared assets, "
            f"{metadata['asset_bytes'] / 1024 / 1024:.2f} MB source payload"
        )
    (BUILD / "build-meta.json").write_text(json.dumps(all_meta, indent=2), encoding="utf-8")


if __name__ == "__main__":
    main()
