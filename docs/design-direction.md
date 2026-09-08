# /Work — design direction (2026-09-08)

## Visual thesis

**A lit archive.** The studio's work is shown the way a gallery hangs a
collection: a dark, warm, well-lit room where the pieces are the only bright
things. Not a black void with thumbnails in it.

The page moves through light rather than staying one temperature: a bronze-lit
opening, a cool violet spotlight band, an ivory daylight strip for proof, and a
warm close. That rhythm is the difference between "curated" and "listed".

## Why this, given what exists

The archive already holds 828 verified pieces across 11 disciplines, 53 of them
film. The problem was never content — it was that a strong body of work was
presented as a file listing. So the redesign spends its effort on hierarchy,
scale and rhythm, not on new decoration:

| Problem | Move |
|---|---|
| Static hero on a flat ground | Layered generated background + oversized type + a live cluster of six real pieces |
| Everything the same size | One lead card at 2x, then descending sizes |
| No sense of scale | A proof strip stating the real numbers, generated from the manifest |
| One temperature throughout | Four background modes across the page |
| Chips read as form controls | Segmented control with a sliding indicator and quiet counts |

## Section arc

1. **Hero** — promise + scale + entry points. Bronze/violet cinematic ground.
2. **Featured spotlight** — six pieces, asymmetric, the lead at double size.
3. **The archive** — all 828, grouped, autoplaying film tiles.
4. **Scale proof** — ivory daylight strip; the numbers, stated plainly.
5. **Discipline spotlight** — the close. Warm `transition.webp` ground, four
   disciplines on an interlocking offset grid, each tile a link into its part of
   the archive.

Built as five sections, not the six first drafted. The sixth was a separate
"start a project" close, and seeing it on screen next to the site footer showed
the problem: the footer already ends every page with *"Let's build something
people remember"* and the same primary action. Two near-identical closes in one
scroll made the page feel padded rather than finished, so the discipline
spotlight took that slot and the footer keeps the ask. The page therefore ends
by sending people deeper into the work instead of asking twice.

## Colour roles

Base grounds are already established in the site system; this page adds three
generated atmospheres rather than new hexes.

- ink: `#0D0F0E` → warmed to `#1B1712` at the top of the page, cooled to
  `#101426` at the bottom (established in the previous /Work pass)
- gold `#D8B75A` — primary accent, eyebrows, active states
- brand gradient `#D8B75A → #C58B57 → #A35BDA → #7A48FF` — used for one
  headline word and for the per-group washes, never as a fill
- ivory `#F4EFE6` — the proof strip only

## Typography

No new families. Anton for display (already the site's), DM Sans for UI and
body. The upgrade is scale and hierarchy, not new type:

- hero display: `clamp(46px, 8.2vw, 132px)`, line-height 0.86, tight tracking
- section headline: `clamp(28px, 4vw, 60px)`
- eyebrow: 11px, 0.28em tracking, uppercase, gold
- card title: 19–23px Anton
- metadata: 11.5–12.5px DM Sans

Gradient text appears exactly once inside the page — one hero word — with the
site footer's own gradient heading closing the scroll. Two was the original
rule; removing the duplicate CTA band removed the page's second instance, and
the footer already supplies that closing note, so one is the correct count
rather than an omission. Anywhere else it becomes noise.

## Motion

One signature idea: **the hero cluster settles.** Six real pieces drift into
place on load with staggered spring, then hold. Everything else is supporting —
card image scale on hover, chip indicator slide, section reveal. All of it
gated behind `prefers-reduced-motion`.

No cursor-following objects. No glow spam. No scroll hijacking.

## Generated assets

Three backgrounds, GPT Image 2, one visual bible (cinematic studio atmosphere,
text-free, object-free):

| File | Role |
|---|---|
| `work-bg/hero.webp` | hero ground — bronze lower-left, violet upper-right, calm left for type |
| `work-bg/bright.webp` | proof strip — ivory, gold wash, lavender undertone |
| `work-bg/transition.webp` | discipline bands + close — espresso into indigo |

Prompts and metadata are saved beside each file as `*.generation.json`.

## What this page must not become

- a second homepage
- a wall of equal-weight cards
- a dark page with a glow behind it
- decoration that hides the fact the archive is the point
