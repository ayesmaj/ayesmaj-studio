# Interior Design — Route Map

All routes are lazy pages registered in `pages.config.js`, mapped to kebab paths in `App.jsx`,
and present in BOTH `seoMeta.js` and `public/sitemap.xml` (the prerender fails the build
otherwise).

| Route | Component | Notes |
|---|---|---|
| /interior-design | InteriorDesign | Hub: education + showcase + conversion |
| /interior-design/ai-scan-apartment | InteriorAiScanApartment | Method 01 / capture |
| /interior-design/ai-scan-house | InteriorAiScanHouse | Method 01 / capture |
| /interior-design/3d-floor-plan-apartment | Interior3dPlanApartment | Method 02 / understand |
| /interior-design/3d-floor-plan-house | Interior3dPlanHouse | Method 02 / understand |
| /interior-design/3d-building-visualization | Interior3dBuilding | Method 02 / understand |
| /interior-design/ai-video-apartment | InteriorAiVideoApartment | Method 03 / experience |
| /interior-design/ai-video-house | InteriorAiVideoHouse | Method 03 / experience |
| /interior-design/compare-visualization-methods | InteriorCompare | Goal-driven method picker |
| /interior-design/complete-visual-presentation | InteriorCompletePresentation | Method 04 / present |
| /interior-design/case-studies | InteriorCaseStudies | Index of the 3 projects |
| /interior-design/case-studies/:slug | InteriorCaseStudy | poolside-villa, maison-valmont, the-patel |

Navigation: "Interior Design" becomes a top-level NAV item (between Services and Studio) and
gains SERVICES_MENU + footer entries.

## Deliberately not published (spec rules: no thin or duplicate pages)
- `/interior-design/client-presentation` — folded into the hub journey section and the
  complete-visual-presentation page; a standalone page would duplicate both.
- `/interior-design/for-*` audience routes — deferred until original per-audience content
  exists (spec section 5 allows this explicitly).
- No VELLORA route ever existed in this repo, so no redirect is required (verified by sweep).
