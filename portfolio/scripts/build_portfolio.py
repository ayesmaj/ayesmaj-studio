from __future__ import annotations

import html
import json
import re
from pathlib import Path

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[2]
PORTFOLIO = ROOT / "portfolio"
DATA_PATH = PORTFOLIO / "src" / "portfolio-data.json"
AUDIT_PATH = PORTFOLIO / "generated" / "brand-audit.json"
BUILD_DIR = PORTFOLIO / "build"
GENERATED_DIR = PORTFOLIO / "generated"
CV_SOURCE = Path(r"C:\Users\smadj\Downloads\Rafael_Smadja_CV_2026 2.pdf")


def esc(value: str) -> str:
    return html.escape(str(value), quote=True)


def label_for(filename: str, media_type: str) -> str:
    lowered = filename.lower()
    if media_type == "video":
        return "Motion still"
    if "logo" in lowered or "wordmark" in lowered:
        return "Identity"
    if "website" in lowered or "hero" in lowered:
        return "Digital experience"
    if any(term in lowered for term in ("poster", "01_39", "01_45", "jul 20")):
        return "Campaign"
    return "Selected application"


def extract_portrait() -> Path:
    target = GENERATED_DIR / "cv-portrait.png"
    if target.exists():
        return target
    reader = PdfReader(str(CV_SOURCE))
    images = list(reader.pages[0].images)
    if not images:
        raise RuntimeError("No portrait image was found in the source CV.")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(images[0].data)
    return target


def resolve_asset(brand_audit: dict, filename: str) -> dict:
    for asset in brand_audit["assets"]:
        if asset["filename"] == filename:
            return asset
    raise KeyError(f"Missing asset {filename!r} in {brand_audit['folder_name']!r}")


def placed_asset_filenames(brand: dict) -> list[str]:
    """Return the five files actually shown, reserving one supporting tile for a logo when available."""
    hero = brand["assets"][0]
    pool = brand["assets"][1:]
    logo = next((name for name in pool if "logo" in name.lower() or "wordmark" in name.lower()), None)
    supporting = [name for name in pool if name != logo]
    if logo:
        supporting = supporting[:3] + [logo]
    else:
        supporting = supporting[:4]
    return [hero] + supporting


def image_tag(asset: dict, brand_name: str, extra_class: str = "") -> str:
    src = "../generated/" + asset["preview"]
    alt = f"{brand_name} - {label_for(asset['filename'], asset['media_type'])}"
    return f'<img src="{esc(src)}" alt="{esc(alt)}" class="{esc(extra_class)}">'


def document_start(title: str) -> str:
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{esc(title)}</title>
  <link rel="stylesheet" href="../src/print.css">
</head>
<body>
"""


def cover_page(data: dict, audit_by_id: dict, page_no: int) -> str:
    gallery_ids = ["electric-fuel-america", "happy-jack-whiskey", "ayesmaj-studios", "podos-ai", "syntropic"]
    images = []
    for brand_id in gallery_ids:
        brand = next(item for item in data["brands"] if item["id"] == brand_id)
        asset = resolve_asset(audit_by_id[brand_id], brand["assets"][0])
        images.append(f"<figure>{image_tag(asset, brand['name'])}</figure>")
    return f"""
<section class="page cover" aria-label="Portfolio cover">
  <div class="cover-band"></div>
  <div class="cover-mark">Creative Direction / Selected Work / 2026</div>
  <div class="cover-title">
    <h1>Rafael <span>Smadja</span></h1>
    <p>{esc(data['portfolioSubtitle'])}. A print-first collection of identities, products, interfaces, campaigns, and cinematic visual systems.</p>
  </div>
  <div class="cover-gallery">{''.join(images)}</div>
  <div class="cover-footer"><span>AYESMAJ Studios / Arizona</span><span class="page-number">{page_no:02d}</span></div>
</section>
"""


def index_page(data: dict, brand_page_start: int, page_no: int) -> str:
    items = []
    for index, brand in enumerate(data["brands"]):
        items.append(f"""
<div class="index-item">
  <div class="index-no">{index + 1:02d}</div>
  <div class="index-name">{esc(brand['name'])}</div>
  <div class="index-sector">{esc(brand['sector'])}</div>
  <div class="index-page-no">{brand_page_start + index:02d}</div>
</div>""")
    midpoint = (len(items) + 1) // 2
    return f"""
<section class="page index-page" aria-label="Portfolio index">
  <div class="eyebrow" style="color:var(--olive)">Portfolio Index / 22 Brand Worlds</div>
  <h1>Selected work,<br>one system at a time.</h1>
  <p class="index-intro">Each project is presented as one dedicated editorial page, with its own creative direction, visual language, typography, palette, and strongest available applications.</p>
  <div class="index-grid">
    <div class="index-column">{''.join(items[:midpoint])}</div>
    <div class="index-column">{''.join(items[midpoint:])}</div>
  </div>
  <div class="index-footer"><span>Rafael Smadja / Brand Portfolio</span><span class="page-number">{page_no:02d}</span></div>
</section>
"""


def brand_page(brand: dict, brand_audit: dict, brand_index: int, page_no: int, total: int) -> str:
    assets = [resolve_asset(brand_audit, filename) for filename in placed_asset_filenames(brand)]
    hero = assets[0]
    supporting = assets[1:5]
    dark = brand["layout"] in {"dark-hero", "tech-grid"}
    accent = brand["palette"][2]
    tiles = []
    for asset in supporting:
        contain = " contain" if "logo" in asset["filename"].lower() or "wordmark" in asset["filename"].lower() else ""
        tiles.append(f"""
<figure class="brand-tile{contain}">
  {image_tag(asset, brand['name'])}
  <figcaption class="asset-label">{esc(label_for(asset['filename'], asset['media_type']))}</figcaption>
</figure>""")
    while len(tiles) < 4:
        asset = hero
        tiles.append(f'<figure class="brand-tile">{image_tag(asset, brand["name"])}</figure>')
    palette = ''.join(f'<div class="swatch" style="background:{esc(color)}"><span>{esc(color)}</span></div>' for color in brand["palette"])
    return f"""
<section class="page brand-page layout-{esc(brand['layout'])}{' dark' if dark else ''}{' hero-contain' if brand.get('heroFit') == 'contain' else ''}" style="--brand-accent:{esc(accent)}" aria-label="{esc(brand['name'])} case study">
  <header class="brand-header">
    <div>
      <div class="eyebrow" style="color:var(--brand-accent)">Brand World {brand_index:02d} / {total:02d}</div>
      <h1>{esc(brand['name'])}</h1>
    </div>
    <div class="brand-header-meta">{esc(brand['sector'])}<br>{esc(brand['scope'])}</div>
  </header>
  <div class="brand-body">
    <figure class="brand-hero">{image_tag(hero, brand['name'])}</figure>
    <aside class="brand-system">
      <h2>Creative direction</h2>
      <p class="brand-summary">{esc(brand['summary'])}</p>
      <div class="system-label">Core scope</div>
      <p class="system-value">{esc(brand['scope'])}</p>
      <div class="system-label">Type direction</div>
      <p class="system-value">{esc(brand['type'])}</p>
      <div class="system-label">Color system</div>
      <div class="palette">{palette}</div>
    </aside>
    <div class="asset-grid">{''.join(tiles)}</div>
  </div>
  <footer class="brand-footer"><span>Rafael Smadja / Art Direction & Design</span><span class="page-number">{page_no:02d}</span></footer>
</section>
"""


def cv_page_one(page_no: int) -> str:
    portrait = "../generated/cv-portrait.png"
    return f"""
<section class="page cv-page" aria-label="Rafael Smadja resume page one">
  <div class="cv-side"></div>
  <header class="cv-header">
    <img src="{portrait}" alt="Portrait of Rafael Smadja" class="portrait">
    <div>
      <h1 class="cv-name">RAFAEL SMADJA</h1>
      <div class="cv-role">Art Director / 3D Artist / Creative Founder</div>
      <div class="cv-contact">
        <span>Arizona, USA</span><a href="tel:+15093197999">+1 509-319-7999</a>
        <a href="mailto:smadja.rafael@gmail.com">smadja.rafael@gmail.com</a>
        <a href="https://www.linkedin.com/in/rafael-smadja-0169831b">LinkedIn</a>
        <a href="https://ayesmajstudios.com">ayesmajstudios.com</a>
      </div>
    </div>
  </header>
  <main class="cv-content">
    <p class="cv-summary">Multidisciplinary Art Director and 3D Artist combining cinematic visual craft, brand systems, AI-driven content, and commercial experience. Leads creative direction from early concept through final delivery, translating complex technology and business ideas into clear, premium visual stories. Founder of AYESMAJ Studios, with hands-on experience across 3D, animation, VFX, design, client strategy, and sales.</p>
    <section class="cv-section">
      <h2 class="cv-section-title">Professional Experience</h2>
      <article class="job">
        <div class="job-header"><h3>Art Director</h3><div class="job-meta">2024 - Present</div></div>
        <div class="job-company">PODOS AI &amp; Syntropic</div>
        <ul>
          <li>Own creative direction across brand identity, investor presentations, websites, product storytelling, and cinematic campaigns for advanced AI and infrastructure companies.</li>
          <li>Translate highly technical concepts into clear visual systems, premium 3D imagery, storyboards, motion direction, and launch-ready marketing assets.</li>
          <li>Establish consistent art direction across typography, color, diagrams, product visualization, and AI-generated content while coordinating with founders and technical teams.</li>
          <li>Guide projects from concept and visual research through production, feedback, and final delivery across digital and presentation formats.</li>
        </ul>
      </article>
      <article class="job">
        <div class="job-header"><h3>Founder &amp; Creative Director</h3><div class="job-meta">2022 - Present</div></div>
        <div class="job-company">AYESMAJ Studios / Self-Employed</div>
        <ul>
          <li>Founded and operate an independent creative studio specializing in cinematic 3D animation, visual identity, branded content, websites, motion graphics, and AI-assisted production.</li>
          <li>Lead client discovery, creative strategy, proposals, pricing, production planning, art direction, and delivery for projects across technology, consumer products, and local service brands.</li>
          <li>Build complete visual campaigns connecting brand strategy with high-end 3D, VFX, advertising assets, social content, and interactive digital experiences.</li>
        </ul>
      </article>
      <article class="job">
        <div class="job-header"><h3>Sales Consultant</h3><div class="job-meta">2024 - 2026</div></div>
        <div class="job-company">Construction &amp; Remodeling</div>
        <ul>
          <li>Managed residential construction and remodeling sales from initial consultation and site assessment through scope definition, estimate presentation, negotiation, and close.</li>
          <li>Explained technical options in practical language, built client trust, and coordinated expectations between homeowners and field teams.</li>
          <li>Developed strong experience in consultative selling, objection handling, relationship management, and value-based proposals.</li>
        </ul>
      </article>
    </section>
  </main>
  <footer class="cv-footer"><span>Rafael Smadja / CV</span><span class="page-number">{page_no:02d}</span></footer>
</section>
"""


def cv_page_two(page_no: int) -> str:
    return f"""
<section class="page cv-page" aria-label="Rafael Smadja resume page two">
  <div class="cv-side"></div>
  <header class="cv-header compact">
    <div class="eyebrow" style="color:#c0a258">Selected Experience &amp; Capabilities</div>
    <h1 class="cv-name">RAFAEL SMADJA</h1>
  </header>
  <main class="cv-content">
    <section class="cv-section" style="margin-top:0">
      <h2 class="cv-section-title">Earlier Experience</h2>
      <article class="job">
        <div class="job-header"><h3>3D Artist</h3><div class="job-meta">2022 - 2024</div></div>
        <div class="job-company">Fuzion</div>
        <ul>
          <li>Created 3D animation, modeling, visual effects, motion graphics, and branded video content for advertising, social media, logos, and product communication.</li>
          <li>Presented mockups and simulations, gathered feedback, and refined visual materials to support marketing, packaging, and brand goals.</li>
          <li>Collaborated with artists and animators to deliver work on schedule and within production constraints.</li>
          <li>Troubleshot rendering, scene optimization, streaming, and memory-management issues across demanding projects.</li>
        </ul>
      </article>
      <article class="job">
        <div class="job-header"><h3>3D Character Artist</h3><div class="job-meta">2021 - 2022</div></div>
        <div class="job-company">Meta Madagascar Island</div>
        <ul>
          <li>Designed and produced assets for a generative collection of 10,000 distinct 3D characters in collaboration with software engineers.</li>
          <li>Created character models, materials, textures, lighting, and presentation renders with consistent visual quality across a large asset system.</li>
        </ul>
      </article>
    </section>
    <div class="cv-columns">
      <div>
        <section class="cv-section">
          <h2 class="cv-section-title">Education &amp; Service</h2>
          <p class="education-line"><strong>VFX - Visual Effects</strong><br>IAC - Israel Animation College / 2022 - 2023</p>
          <p class="education-line" style="margin-top:3mm"><strong>Combat Signaller</strong><br>Israeli Navy / 2019 - 2022</p>
        </section>
        <section class="cv-section">
          <h2 class="cv-section-title">Tools</h2>
          <p class="tools-line">Blender 3D / ZBrush / Adobe Substance 3D Painter / Adobe Photoshop / Adobe After Effects / 3ds Max / Marvelous Designer / AI-assisted image and video production</p>
        </section>
      </div>
      <section class="cv-section">
        <h2 class="cv-section-title">Core Capabilities</h2>
        <div class="capability"><h3>Creative Leadership</h3><p>Art direction / Brand systems / Visual storytelling / Campaign concepts / Storyboarding / Presentation design / Client strategy / Creative production</p></div>
        <div class="capability"><h3>3D, Motion &amp; Design</h3><p>3D modeling / Animation / Character art / Product visualization / Lighting / Rendering / VFX / Motion graphics / Compositing / Image-making</p></div>
        <div class="capability"><h3>Business &amp; Commercial</h3><p>Consultative sales / Proposals and estimates / Negotiation / Client presentations / Project scoping / Relationship management / Cross-functional collaboration</p></div>
      </section>
    </div>
  </main>
  <footer class="cv-footer"><span>Rafael Smadja / CV</span><span class="page-number">{page_no:02d}</span></footer>
</section>
"""


def contact_page(data: dict, audit_by_id: dict, page_no: int) -> str:
    strip_ids = ["electric-fuel-america", "happy-jack-whiskey", "rebound"]
    images = []
    for brand_id in strip_ids:
        brand = next(item for item in data["brands"] if item["id"] == brand_id)
        asset = resolve_asset(audit_by_id[brand_id], brand["assets"][0])
        images.append(image_tag(asset, brand["name"]))
    return f"""
<section class="page contact-page" aria-label="Contact Rafael Smadja">
  <div class="eyebrow" style="color:#b9a267">Available for art direction, branding, 3D and digital projects</div>
  <h1>Let us build the next <span>visual world.</span></h1>
  <p class="contact-lede">For full-time creative leadership, selected freelance engagements, or studio collaborations across technology, consumer products, and premium services.</p>
  <div class="contact-links">
    <div class="contact-link"><strong>Email</strong><a href="mailto:smadja.rafael@gmail.com">smadja.rafael@gmail.com</a></div>
    <div class="contact-link"><strong>Phone</strong><a href="tel:+15093197999">+1 509-319-7999</a></div>
    <div class="contact-link"><strong>Portfolio</strong><a href="https://ayesmajstudios.com">ayesmajstudios.com</a></div>
    <div class="contact-link"><strong>LinkedIn</strong><a href="https://www.linkedin.com/in/rafael-smadja-0169831b">rafael-smadja-0169831b</a></div>
  </div>
  <div class="contact-strip">{''.join(images)}</div>
  <div class="cover-footer"><span>Arizona / Working Worldwide</span><span class="page-number">{page_no:02d}</span></div>
</section>
"""


def curate_audit(data: dict, audit: dict) -> None:
    selected_by_id = {brand["id"]: set(placed_asset_filenames(brand)) for brand in data["brands"]}
    for brand in audit["brands"]:
        selected = selected_by_id[brand["id"]]
        for asset in brand["assets"]:
            is_selected = asset["filename"] in selected
            asset["selected"] = is_selected
            asset["selection_reason"] = (
                "Selected for the one-page case study after visual review: strong, relevant, and compositionally distinct."
                if is_selected else
                "Not placed due to page limits, repetition, weaker composition, or supporting-file status; retained in the source archive."
            )
        brand["selected_count"] = sum(1 for asset in brand["assets"] if asset["selected"])
        brand["curated_assets"] = [asset["path"] for asset in brand["assets"] if asset["selected"]]
        brand["not_placed_assets"] = [asset["path"] for asset in brand["assets"] if not asset["selected"]]
    AUDIT_PATH.write_text(json.dumps(audit, indent=2, ensure_ascii=False), encoding="utf-8")


def build() -> None:
    data = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    audit = json.loads(AUDIT_PATH.read_text(encoding="utf-8"))
    audit_by_id = {brand["id"]: brand for brand in audit["brands"]}
    if len(data["brands"]) != 22 or len(audit_by_id) != 22:
        raise RuntimeError("Portfolio requires exactly one page for each of the 22 brand folders.")
    extract_portrait()
    curate_audit(data, audit)
    BUILD_DIR.mkdir(parents=True, exist_ok=True)

    cv_html = document_start("Rafael Smadja CV 2026") + cv_page_one(1) + cv_page_two(2) + "</body></html>"
    (BUILD_DIR / "cv.html").write_text(cv_html, encoding="utf-8")

    portfolio_parts = [document_start("Rafael Smadja Brand Portfolio 2026"), cover_page(data, audit_by_id, 1), index_page(data, 3, 2)]
    for index, brand in enumerate(data["brands"], 1):
        portfolio_parts.append(brand_page(brand, audit_by_id[brand["id"]], index, index + 2, len(data["brands"])))
    portfolio_parts.append(contact_page(data, audit_by_id, 25))
    portfolio_parts.append("</body></html>")
    (BUILD_DIR / "portfolio.html").write_text("".join(portfolio_parts), encoding="utf-8")

    combined_parts = [document_start("Rafael Smadja CV and Portfolio 2026"), cover_page(data, audit_by_id, 1), cv_page_one(2), cv_page_two(3), index_page(data, 5, 4)]
    for index, brand in enumerate(data["brands"], 1):
        combined_parts.append(brand_page(brand, audit_by_id[brand["id"]], index, index + 4, len(data["brands"])))
    combined_parts.append(contact_page(data, audit_by_id, 27))
    combined_parts.append("</body></html>")
    (BUILD_DIR / "combined.html").write_text("".join(combined_parts), encoding="utf-8")
    print("Built CV (2 pages), portfolio (25 pages), and combined document (27 pages).")


if __name__ == "__main__":
    build()
