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
| Hero | left | custom purple/gold gradient | **keep** (brief: hero uses project imagery/energy, not a library background) | — | already the mockup |
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
