# Interior Design — Furniture & Decor / Apartments / Homes redesign

Owner brief 2026-08-23. Benchmark: the AYESMAJ system, /interior-design/kitchens, the new
/interior-design/bathrooms experience, /Studio, /services/motion-vfx.
Screenshots of the current pages (desktop + mobile, hero/dark/bright) live in `docs/screenshots/`
(`furniture-decor-*`, `apartments-*`, `homes-*`).

## Audit — current pages (as shipped through commit 340a208)

### /interior-design/furniture-decor (SpacePage config)
- Sections: dark silk hero (canal living editorial) → furniture-plan split → EMPTY→FURNISHED compare
  (villa lounge pair) → collections gallery (6) → decor library gallery (9 studio tiles) → desk+bookcase
  3D stage → film still → next/CTA.
- Media: canal living editorial (hero), villa lounge pair, 10 decor studio tiles, villa cinematic frame.
- Video: none. CTAs: Contact + methods.
- Weak points: hero image is warm/dark walnut (brief: colorful, alive); no single consistent room
  carrying the narrative; furniture plan is static (no circulation overlay); no layout switching;
  no style directions; no reference→design story; no film; collections vs decor-library overlap.

### /interior-design/apartments (SpacePage config)
- Sections: dark grid hero (3D plan) → plan split (3D + clean plan) → full living (dusk) →
  SOURCE→VISUALIZED compare → 4-room gallery (small cards) → film-frame still → next/CTA.
- Media: canal 3D plan, clean plan, dusk living, canal rooms (4 cards), raw/editorial pair, film frame.
- Weak points: rooms are small cards (brief: major media chapters); no scan→plan→3D pinned sequence;
  no room map navigation; no design directions; no compact-space section; no film; hero doesn't
  transition plan→interior.

### /interior-design/homes (SpacePage config)
- Sections: full hero (exterior master) → floor switcher (ground/upper) → house-scan 3D stage →
  full living → outdoor gallery (6) → villa film chapter (35 s) → next/CTA.
- Media: villa master frames + generated plans/cutaway/blue hour; villa film (real, 35 s).
- Weak points: no whole-home exploded view; rooms compressed into one gallery; no arrival sequence;
  no light-of-day switch; no design directions; film is a plain video block (brief: scroll-scrub
  chapter with headline progression); no interactive-web upsell; no complete-system composition.

### Cross-page
- Duplicated: villa family-lounge pair carries furniture compare while villa rooms also carry homes;
  acceptable (different pages) but furniture gets its own consistent concept room in the redesign.
- Links to add: apartments↔bathrooms/kitchens room chapters; homes→interactive web experiences.

## Research applied
- ui-ux-pro-max: applied as the section-level checklist (contrast ≥4.5:1 on scrims, 44px touch targets
  on chips/tiles, reduced-motion fallbacks for every pinned/parallax section, focus-visible on all
  interactive controls, no hover-only interactions — click/tap equivalents everywhere, lazy loading,
  reserved aspect ratios). The AYESMAJ design system (type, palette, buttons) is the source of truth;
  no new design system generated.
- 21st MCP (paid tier, fetched code): "Scroll 01" (sticky media + scrolling text, active-index by
  per-item scroll window) → rewritten as the Reference→Design story (furniture) and Room Journey
  (apartments). "Immersive Scroll Gallery" (pinned multi-rate zoom) → rewritten as the Homes
  complete-system finale. "Interactive Selector" pattern was already adapted earlier as the elastic
  gallery. All rewritten into plain CSS + the site's framer-motion idiom; no Tailwind/Next imports.

## Media plan (generate only what's missing; one consistent world per narrative)

- FURNITURE — new "atelier room" concept chain (labeled STUDIO CONCEPT): colorful hero →
  empty shell → top-down plan → 3 layouts (social/open/sculptural) → 4 style directions →
  reference board → palette board → 4 material crops + 4 material-led room variants → film shots.
  Existing kept: 9 decor tiles, villa lounge pair (moved to a supporting role), collections.
- APARTMENTS — Canal Apartment stays the single project: add unfurnished 3D plan (for the pinned
  scan→plan→3D sequence), 4 design directions on the living room, 4 compact-typology plans
  (studio/1BR/2BR/penthouse, showcase diagrams), Seedance film (plan→living→kitchen→bedroom→
  bath→canal view). Client presentation = CSS-layered composition of real assets (no generation).
- HOMES — Poolside Villa stays the single project: add exploded house, arrival frame, 3 design
  directions on the living room (modern luxury = the existing master), day/evening variants of the
  sunset master (same camera), interactive-web mockup. Rooms/exteriors/film already exist.

Labels stay honest: villa/canal = CLIENT PROJECT; atelier room, typology plans, mockup = STUDIO CONCEPT.
