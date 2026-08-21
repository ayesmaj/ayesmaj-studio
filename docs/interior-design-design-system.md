# Interior Design — Design System (local world inside AYESMAJ)

Persisted master: `design-system/ayesmaj-interior-design/MASTER.md` (ui-ux-pro-max output).
**Spec overrides applied** — the generator's blue/orange palette and Cinzel/Josefin pairing
are rejected; the brief's explicit palette and typography govern.

## Palette (CSS custom props, prefix --idv-)
porcelain #FAF7F1 · warm-bone #EFE7DC · soft-canvas #E3D9CC · ink #191815 ·
graphite #2A2824 · walnut #4B372B · olive #6C735C · champagne #B79661 ·
stone #CFC2B2 · pool #91AEB5

Light, warm, architectural. No full-black sections; ink is for typography and small buttons.
The AYESMAJ gradient may appear ONLY as thin rules, AI-process glows, and hover details —
never over architectural imagery.

## Typography
- Display: **Instrument Serif** (newly loaded, scoped to these pages)
- UI/body: **DM Sans** — deviation from the brief's Manrope: the site already ships DM Sans,
  the two are near-identical grotesques, and a fourth family costs LCP. Documented trade-off.
- Technical values: **IBM Plex Mono** (labels, measurements, method numbers)
- Hero: clamp(64px, 8vw, 128px), line-height 0.9 · Sections: clamp(42px, 5vw, 78px) ·
  Body: 16-19px / 1.6 · Labels: 11-13px uppercase, letter-spacing 0.18em

## Motion
Scroll-linked chapter reveals via CSS animation-timeline: view() behind the same @supports
gate as the Work gallery; before/after sliders; crossfades at 400ms or less; hover = scale
1.035 max + border shift + arrow nudge. Full prefers-reduced-motion fallback. No neon, no
tilt cards, no constant ambient loops.

## Style direction (kept from generator)
Exaggerated minimalism: oversized editorial type, massive whitespace, high contrast,
full-bleed architectural imagery. Anti-patterns: cluttered layouts, gradients over photos,
glassmorphism, dark gaming UI, SaaS dashboard chrome.
