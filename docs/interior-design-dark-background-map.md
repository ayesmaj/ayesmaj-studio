# Interior Design — Dark Section Background Map (2026-08-21)

Eight backgrounds generated with GPT Image 2 from the owner's brief, reviewed one by one
for the §19 rejection list (text, letters, logos, objects, people, UI, neon, seams), then
optimized: `web/` 2:1 WebP + AVIF (+16:9 fallback), `mobile/` 1080×1600 intentional crops,
`backgrounds-manifest.json`. Content stays real HTML above every image.

Two application mechanisms, same assets:
- **Hub** — `<DarkSectionBackground>` (picture/AVIF, text-side readability ramp, grain,
  10px scroll drift, off under reduced motion).
- **Subpages** — `.idv2-bgc-NN` CSS classes (overlay baked into the gradient stack, mobile
  crop swapped under 860px). Injected in order on each page's dark sections.

## Hub /interior-design — dark sections audited

| Section | Text | Old ground | New background | Overlay | Why |
|---|---|---|---|---|---|
| Hero | left | — | **replaced by the PATEL tower breakout hero** (generated Miami bay photo + real-time 3D; see docs/patel-hero-source-audit.md) | — | 05 is free on the hub again |
| Problem (pinned) | left | flat `.idv2-dark` wrapper | **02 Architectural Grid** on the wrapper (visible around the pin + in flat/mobile mode) | .70 | brief: THE PROBLEM → 02 |
| Spatial models | left | CSS grid pattern | **04 Geometric Facets** | .58 | brief: 3D floor plan → 04 |
| Scroll film | left | `#050505` | **01 Cosmic Energy** (visible in flat/mobile mode and at the pin edges) | .62 | brief: AI VIDEO → 01 |
| One Studio | left | flat `.idv2-dark` | **08 Topographic Contours** (was 03 — 03 is now footer-only) | .55 | owner rule 2026-08-21: never the same background twice on a page, footer included |
| Final CTA | — | — | **section removed** (owner 2026-08-21: "too much" — the footer CTA closes the page) | — | 07 is free on the hub again |

No asset repeats on the hub; no two consecutive dark sections share a treatment.

## Subpages — first/second/third dark section in document order

| Route | Hero | Dark sections in order |
|---|---|---|
| ai-scan-apartment | 01 cosmic | 02 grid · 06 concrete · 08 topographic · 04 facets |
| ai-scan-house | 04 facets | 02 grid |
| 3d-floor-plan-apartment | bright hero (kept) | 04 facets |
| 3d-floor-plan-house | 02 grid | 04 facets · 08 topographic |
| 3d-building-visualization | 08 topographic | 02 grid · 04 facets · 01 cosmic |
| ai-video-apartment | film hero (kept) | 01 cosmic |
| ai-video-house | film hero (kept) | 01 cosmic |
| compare | 04 facets | 08 topographic |
| complete-visual-presentation | 07 light leak | 01 cosmic · 06 concrete |
| case-studies | 07 light leak | — |
| client-presentation | 01 cosmic | — |
| case-studies/:slug | 05 silk | 08 · 04 · 02 · 01 · 06 |

Dark subpage heroes carry `<DarkSectionBackground>` (owner request 2026-08-21); the two
film heroes and the one bright hero keep their own art. Pinned sequences are image-covered
and are skipped.

## Rules carried
- **One use of an asset per page, the footer included** (owner rule 2026-08-21). 03 Stone & Bronze
  is the footer's alone — no section anywhere may use it.
- Text-safe side respected: left-text sections use the left-dark ramp; the `--right`
  modifier reverses it.
- Motion: 10px drift max, 1.00→1.025 scale nowhere yet (reserved), static under
  reduced motion.

## Service pages (owner extension 2026-08-21)

The classes are now loaded site-wide (main.jsx), so the same assets serve the six service
pages and the Services hub. Applied add-only by one agent per page: hero untouched,
media-covered and light sections skipped, sequence in page order, never consecutive.

| Route | Sequence |
|---|---|
| /Services | 04 facets → 01 cosmic → 08 topographic |
| /ServiceBranding | 08 topographic → 05 silk → 06 concrete |
| /WebExperiences | 02 grid → 04 facets → 07 light leak |
| /AiMarketing | 01 cosmic → 05 silk → 07 light leak |
| /Worlds3D | 04 facets → 02 grid → 01 cosmic |
| /AiVideos | 01 cosmic → 07 light leak → 05 silk |
| /Storyboards | 08 topographic → 06 concrete → 03 stone & bronze |

### Site-wide footer CTA (owner request 2026-08-21)

`AyesmajFooter` layer 1 ("Let's build something people remember") carries **03 Stone & Bronze** on
every route. Checked against each page's closing dark section: no route ends on 03 directly
before the footer (CompletePresentation's 03 block is followed by a bright section).

### Rest of site (owner request 2026-08-21)

| Route | Sections |
|---|---|
| / (Home) | 02 Capabilities · 05 PerceptionPrice · 08 CreativeSystem · 04 BeforeAfter · 01 StudioAbout |
| /Work | 04 gallery (full-bleed wrapper, fade-top) · 07 CTA |
| /About | 08 Creative Direction · 02 Selected Work · 06 Final CTA |
| /Studio | 06 · 04 manifesto bands · 01 Layers · 08 Process · 07 Reel |
| /Contact | 05 on the page wrapper (hero + form share one silk) |
| /Pricing | 02 cards (full-bleed wrapper) · 07 CTA |
| /Insights | 01 empty state (fade-top) |
| /AiPosts | 04 grid + CTA as one continuous block |
| /Animations | 04 grid (full-bleed wrapper) · 08 CTA |
| /project/:slug | 05 body (full-bleed wrapper) |
| /Faq | 08 accordion (full-bleed wrapper) |

Left alone on purpose: Reel, Clients, System, BrandDetail (single <main> over the CircuitBackground
canvas or photo-led layouts — no flat dark band to replace); legal pages (text documents).
`.idv2-bgc--fade-top` (interior-bg.css) softens the top edge of an image section; `--bgc-fade`
carries the colour of the block above.
