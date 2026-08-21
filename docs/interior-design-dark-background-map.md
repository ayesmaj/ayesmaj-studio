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
| Hero | left | custom purple/gold gradient | **05 Silk Wave** via `<DarkSectionBackground>` (owner request 2026-08-21; gold-to-purple silk matches the headline gradient) | .58 + purple glow | first use of 05 on the hub |
| Problem (pinned) | left | flat `.idv2-dark` wrapper | **02 Architectural Grid** on the wrapper (visible around the pin + in flat/mobile mode) | .70 | brief: THE PROBLEM → 02 |
| Spatial models | left | CSS grid pattern | **04 Geometric Facets** | .58 | brief: 3D floor plan → 04 |
| Scroll film | left | `#050505` | **01 Cosmic Energy** (visible in flat/mobile mode and at the pin edges) | .62 | brief: AI VIDEO → 01 |
| One Studio | left | flat `.idv2-dark` | **03 Stone & Bronze** | .55 | brief: ONE STUDIO → 03 |
| Final CTA | left | full-bleed villa pool photo | **07 Cinematic Light Leak** | .42 | brief names 07 the strongest option for this headline; villa photo retired here |

No asset repeats on the hub; no two consecutive dark sections share a treatment.

## Subpages — first/second/third dark section in document order

| Route | 1st dark | 2nd dark | 3rd dark |
|---|---|---|---|
| ai-scan-apartment | 02 grid | 06 concrete | 08 topographic |
| ai-scan-house | 02 grid | 08 topographic | 04 facets |
| 3d-floor-plan-apartment | 04 facets | 02 grid | 05 silk |
| 3d-floor-plan-house | 04 facets | 08 topographic | 07 light leak |
| 3d-building-visualization | 02 grid | 04 facets | 01 cosmic |
| ai-video-apartment | 01 cosmic | 05 silk | 07 light leak |
| ai-video-house | 01 cosmic | 07 light leak | 03 stone |
| complete-visual-presentation | 01 cosmic | 03 stone | 07 light leak (08 if a 4th) |
| compare / client-presentation / case studies | 08 topographic | 04 facets | 03 stone |

Hero sections on subpages keep their custom accent gradients; backgrounds apply to
subsequent `idv2-dark` / `idv2-spatial` sections. Pinned sequences are image-covered and
are skipped.

## Rules carried
- ≤ 2 uses of one asset per page; never consecutive.
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
| /ServiceBranding | 03 stone & bronze → 05 silk → 06 concrete |
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
| /Studio | 06 · 04 manifesto bands · 01 Layers · 06 Process · 04 Reel |
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
