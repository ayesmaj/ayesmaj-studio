# Interior Design — Subpage Audit (2026-08-21)

Method: DOM-measured at 1440px against the built output (section counts, media counts,
text-only sections). The embedded browser's screenshot pipeline is unreliable mid-scroll
(pre-existing artifact, affects /Work too), so metrics replace pixel captures; visual
verification happens per-page after rebuild. Numbers below are the *pre-redesign* state.

| Route | Secs | Text-only | Imgs | Vids | Core problems | Redesign direction (addendum §) | Accent | Next method |
|---|---|---|---|---|---|---|---|---|
| ai-scan-apartment | 6 | 4 | 9 | 0 | text-led, no transformation sequence, cream template | §7 dark technical, pinned SOURCE→REBUILD from real canal assets | capture (blue→violet) | 3d-floor-plan-apartment |
| ai-scan-house | 7 | 5 | 4 | 0 | nearly imageless, no level story | §8 levels/layers story from villa plans + exteriors | capture | 3d-floor-plan-house |
| 3d-floor-plan-apartment | 6 | 4 | 12 | 0 | small imagery (4 under 300px), flat | §9 bright oversized plan, plan→room sequence (Patel unit) | understand (gold→olive) | ai-video-apartment |
| 3d-floor-plan-house | 6 | 4 | 8 | 0 | no multi-level drama | §10 dark level sequence from villa plans + stair/pool frames | understand | ai-video-house |
| 3d-building-visualization | 7 | 4 | 9 | 0 | static; model viewer under-used | §11 dark development world, Patel end-to-end + building model | understand | complete-visual-presentation |
| ai-video-apartment | 7 | 5 | 5 | 1 | video page barely uses video | §12 film-led, storyboard selector, camera language | experience (coral→purple) | complete-visual-presentation |
| ai-video-house | 6 | 4 | 11 | 1 | film not scroll-driven | §13 most cinematic: scroll film (valmont master), villa journey | experience | complete-visual-presentation |
| compare-visualization-methods | 5 | 5 | 0 | 0 | ZERO media | §14 interactive comparison world, one active method at a time | full-gradient | (goal-driven) |
| complete-visual-presentation | 7 | 6 | 5 | 0 | most text-heavy page | §15 workflow chapters + deliverable builder | present (gold+purple) | client-presentation |
| client-presentation | — | — | — | — | DID NOT EXIST (previously folded away; addendum §16 mandates it) | presentation-experience mockup page | present | contact |
| case-studies | 3 | 2 | 3 | 0 | thin index | §17 editorial chapters + method filters | — | — |
| case-studies/:slug | 7 | 3 | 22 | 1 | 8 small imgs; strongest page already | §18 narrative order pass, keep media | — | next case |

Shared gaps across all routes: no method rail, no next-method portal, generic CTA wording,
no per-method accent, hero identical in composition, limitations shown as plain lists.

Honesty constraint carried into every brief: no fabricated point-cloud/scan imagery — the
capture sequences use real source/study/plan/editorial assets with truthful stage labels.
