# Interior Design Visualization — Project Audit
2026-08-17

## Stack reality (governs every implementation choice)
- Vite 6 + React 18 SPA in **JSX** (not Next.js, not TypeScript, not shadcn structure).
- Routing: react-router via `src/App.jsx` — auto PascalCase routes from `src/pages.config.js`
  (all lazy-loaded) plus an explicit kebab-path array for service routes.
- SEO: build-time prerender (`scripts/prerender.mjs`) writes per-route HTML with unique
  title/description/canonical/OG + one crawlable paragraph + JSON-LD. **Guardrail: the build
  FAILS if a sitemap route is missing from `src/data/seoMeta.js`.** All new routes must be
  registered in both.
- Media discipline: rasters ship as WebP (q82, max 2000px, Pillow pipeline); video as
  web-encoded mp4/webm under 25 MB; masters stay out of git.

## VELLORA
- `grep -riE "vellora|spatial design intelligence"` across src/, public/, index.html,
  vercel.json, scripts/: **0 hits. Nothing to remove in this repo.**
- The VELLORA identity exists only in the external source projects. Section-3 compliance here
  means *stripping the name on import*, which the media importer does (verified 0 leakage in
  the imported tree and manifest).

## Existing systems to reuse (do not rebuild)
- `Seo.jsx` head manager, `AyesmajNav`/`AyesmajFooter`, `siteConfig.js` NAV/menus,
  `BeforeAfterSlider.jsx`, WebP/ffmpeg pipelines, prerender + schema emission, lazy routes.

## Media sources (external project repos, NOT this repo)
| Source folder | Usable media | Role |
|---|---|---|
| `inetrior design/public/generated/vellora-house-film` | 29-frame house master sequence (plans, rooms, pool) + contact sheet | Single-house spine: "one project, every method" |
| `inetrior design/public/{residence, hero/rooms}` | 7 apartment rooms + 7 plan views + 8 raw/editorial pairs | Apartment project + enhancement before/afters |
| `MAISON VALMONT/public/maison-valmont` | before/after sets, 8-stage process, gallery, details, transformation film | Renovation case study |
| `the patel - appartments/website/public` | tower renders, brand lockup, unit set with floorplan, desktop+mobile films | Building/development case study |
| `vellora-pascal`, texture libs, frame dumps | — | NOT imported (editor assets / PBR textures / scroll frames) |

## Security note
An OpenAI API key was pasted into chat during briefing and must be treated as compromised;
the user was told to rotate it. The GPT Image 2 pipeline reads `OPENAI_API_KEY` from env
only. No key appears anywhere in the repo.
