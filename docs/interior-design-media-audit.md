# Interior Design — media audit & slot mapping

Scope: `/interior-design` landing + mega-menu previews and the six new pages
(`/kitchens`, `/bathrooms`, `/furniture-decor`, `/apartments`, `/homes`, `/buildings`).
Inventory from file listings + PIL dimensions (2026-08-22). Source of truth for labels:
`src/data/interiorMedia.js`.

Generators:
- **edit** = `scripts/interior-enhance.mjs <src> <out> "<brief>"` (gpt-image-2 edit, architecture lock from the source image)
- **text** = `scripts/generate-backgrounds.mjs <prompts.json> <out-dir>` (text-to-image, 2048x1024 / 1536x1024)
- Post-process everything through the WebP q82 <=2000px pipeline (`scripts/optimize-backgrounds.py` pattern).

Honest labels (from `interiorMedia.js`):

| Project | Label | Notes |
|---|---|---|
| Poolside Villa | CLIENT PROJECT - one house, 29-frame master set + AI 3D scans + 35 s Seedance film | the only project with plan -> render -> model -> film in one architecture |
| Canal Apartment | CLIENT PROJECT - 8 honest raw->editorial pairs (raw = 3D screenshot, editorial = gpt-image-2 under lock) + 7 "studies" (`plans/*` are study views, **not** plans) | no film, no true 2D plan |
| Maison Valmont | STUDIO RENOVATION SET - before/after, 8 process stages, 12 material details, film | strongest before/after + material library |
| The Patel | CLIENT PROJECT - development tower, real GLB, Residence 1802 unit set, film | no lobby/amenity/exploded imagery |
| `/models/*` showcase GLBs | SHOWCASE MODEL (Sketchfab) - never label as project | |

---

## 1. Inventory

### 1.1 `public/interior-design/projects/poolside-villa`
- `renders/00..28_*.webp` - 29 frames, all **1536x1024** (`VILLA.plans` + `VILLA.sequence`). Keys used below: 00 ground plan, 01 upper plan, 02 exterior front, 03 exterior pool, 04 foyer, 05 living master, 06 living pool view, 07 living detail, 08 dining, 09 kitchen master, 10 kitchen island detail, 11 office/guest, 12 stair, 13 family lounge, 14 primary bedroom, 15 primary bedroom view, 16 primary closet, 17 primary bath master, 18 primary bath detail, 19 bedroom 2, 20 bedroom 3, 21 secondary bath, 22 laundry/mudroom, 23 garage, 24 balcony, 25 outdoor lounge, 26 outdoor kitchen, 27 pool hero, 28 pool water level.
- `film/house-film-desktop.mp4` 13.6 MB, `house-film-mobile.mp4` 3.6 MB, `house-film-poster.webp` 1280x720, `contact-sheet.webp` 1920x1500.
- No `pairs/` folder (no raw->editorial pairs for the villa).

### 1.2 `public/interior-design/projects/canal-apartment`
- `pairs/` - 8 raws **2000x1263** (`bath, canal, dining, kitchen, living, lounge, primary, terrace`-raw.webp) + 8 `*-editorial-v2.webp` (~1577x997; bath 1535x1024) + 3 legacy editorials (`dining-editorial` 1897x1140, `lounge-editorial` 1536x1024, `primary-editorial` 1536x1024).
- `plans/` - 7 **studies** 1536x1024 (`bath, dining, kitchen, living, overview, sunroom, waterfront`). Labeled "- study" in code; not dimensionally true plans.
- No film; no optimized GLB of this apartment in the site (external `hero/apartment.glb` 8 MB / `apartment2.glb` 50 MB exist, undieted).

### 1.3 `public/interior-design/projects/maison-valmont`
- `before/` 5 (1536x1024; salon-existing 1280x720), `after/` 8 (1536x1024; salon-restored 1280x720), `process/` 8 stages, `gallery/` 14 (incl. portrait `bath-detail` and `suite-vertical` 1024x1536), `details/` 16 materials 1536x1024, `kitchen/kitchen-hero` + `kitchen-detail` 1536x1024, `cards/` 4, `hero/poster-empty|final` 1280x720, `film/transformation-master.mp4` 5.9 MB + `film-poster.webp`.

### 1.4 `public/interior-design/projects/the-patel`
- `renders/` 11: `patel-hero-still` 2200x1466 (film poster), `patel-hero-realistic-v2` / `patel-hero-single` / `patel-miami-environment-v2|v3` 1672x941, `patel-architecture-single` **1024x1536 portrait**, `patel-rooftop-single(-v2)` 1536x1024, 3 `patel-interior-*` 1536x1024.
- `residence-1802/` floorplan, kitchen, living, primary, terrace - 1600x900.
- `brand/patel-breakout-hero.webp` 1672x941 (no-WebGL poster), `patel-hero-lockup.webp` 620x725.
- `environment/miami-sunset-pano.webp` 3548x1774; `film/patel-hero-film-desktop.mp4` 25 MB, `-mobile.mp4` 8.7 MB.

### 1.5 `public/interior-design/models` (GLB, draco; all have `-lite` phone builds)
the-patel 12.1/5.7 MB - villa-house 8.5/5.6 - villa-floor-plan 7.5/3.7 - house 5.2/4.7 - plan-study 4.6/3.5 - sinks 1.7/0.9 - skyline 1.6/1.0 - apartment 1.5/1.3 - bookcase 1.1/0.7 - building 1.0/0.5 - kitchen-island 0.9/0.4 - office-desk 19k/13k. Only `the-patel` and `villa-*` are CLIENT PROJECT; the rest SHOWCASE.

### 1.6 `public/interior-design/hero/**` (PATEL breakout hero, real-time)
`models/patel-tower-high|medium|low.glb` 2.4/1.1/0.9 MB, `patel-bird.glb` 0.5 MB, `environment/miami-sunset-pano.webp`, `backgrounds/miami-bay-hero-master.png` 2048x1024 + avif/webp + `-mobile.webp` 1080x1440. Wired in `src/features/interior-design/hero/hero.config.js`.

### 1.7 `public/interior-design/backgrounds/**`
8 dark section backgrounds (`01-cosmic-energy-flow ... 08-topographic-contours`): masters 2048x1024 png, web avif/webp 2048x1024 + `-1080` 1820x1024, mobile 1080x1600 webp. Rule: one background per page, 03 Stone & Bronze is footer-only.

### 1.8 External - `C:/Users/smadj/Documents/inetrior design/public`
- `generated/vellora-house-film/frames/` - the 29 villa masters at **1920x1080 png** (4-5 MB each) + `sketch-opening.png` 1920x1080 (the film's hand-sketch opening frame) + one stray `ChatGPT Image Aug 22 ... .png` 1513x1039 (unclassified). `debug/originals/` = the same 29 at 1536x1024 png. `contact-sheet.jpg`, `manifest.json`, Meshy GLBs (`FLOOR PLAN model velora house.glb` 160 MB, `house model.glb` 171 MB - already dieted into `/models/villa-*`). `references/` (mood only, per README), `seedance/` segments + `villa-film-35s.mp4`.
- `assets/materials/` 14 PBR sets (diff/nor/rough 1024^2): beige_wall, brushed_concrete, granite_tile, herringbone_brick, herringbone_parquet, laminate_floor_02, leather_white, marble_01, marble_tiles, plank_flooring, plastered_wall(_02), rough_linen, white_stucco. `assets/models/` 74 furniture GLBs (showcase) + `assets/thumbs/` 87 thumbnails <=256px.
- `hero/` sky.webp 4500x2250, env.hdr, apartment.glb 8 MB, apartment2.glb 50 MB; `hero/rooms/` 3 editorials + `terrace.png` 2137x1350.
- `residence/gen/` - the 7 canal studies as png 1536x1024 (source of `plans/*`).
- `brand/` Vellora SVG lockups.

### 1.9 External - `.../the patel - appartments/website/public`
- `images/` = png originals of the 11 renders already in the repo + `residence-1802/` (same) + `residences/<unit>/hero.webp` **22 units** 1600x1066 (10C...2401) - per-unit heroes not yet in the site.
- `media/patel/patel-hero-poster-v2.webp` **2560x1440** (not in repo) + the two films.

---

## 2. Slot mapping

Legend: **E** = EXISTING, **G** = GENERATE. Sizes: `wide` = 2048x1024 / 1920x1080 hero, `std` = 1536x1024, `portrait` = 1024x1536, `thumb` = 640x400 crop (nav). "chain" = reference image(s) fed to the edit.

### 2.1 LANDING `/interior-design`

| Slot | E/G | Asset / plan | Size | Project |
|---|---|---|---|---|
| Hero 1 - raw/scan | E (import) | external `frames/sketch-opening.png` 1920x1080 -> `poolside-villa/film/sketch-opening.webp`. Label "Concept sketch" (it is the film's opening frame, not a scan). Alt: still of `villa-floor-plan.glb` (AI 3D SCAN) | wide | Villa - CLIENT |
| Hero 2 - clean plan | E | `renders/00_ground_floor_plan.webp` | std | Villa |
| Hero 3 - 3D plan | G edit `villa-3d-plan-ground-hero` | chained from master `villa-3d-plan-ground` (below) + `03_exterior_pool_master`; "same axon at dusk, lower camera, pool deck visible, walls locked" | wide | Villa |
| Hero 4 - finished interior | E | `renders/05_living_master.webp` | std | Villa |
| Hero 5 - film frame | E | `renders/25_outdoor_lounge.webp` (= `HERO_STAGES[3]`); motion: `film/house-film-desktop.mp4` | std | Villa |
| Space hero - kitchen | E | `maison-valmont/kitchen/kitchen-hero.webp` | std | Valmont |
| Space hero - bathroom | G edit `villa-bath-landing` | chain `17_primary_bath_master`; "same primary bath, camera from the doorway, morning light, towels/objects styled" | std | Villa |
| Space hero - furniture | E | `canal-apartment/pairs/lounge-editorial.webp` 1536x1024 | std | Canal |
| Property hero - apartment 3D plan | G edit `canal-3d-plan-hero` | chained from master `canal-3d-plan` (section 2.5-04); "same axon, 30 deg lower camera, evening, canal reflection" | wide | Canal |
| Property hero - house pool+garage | G edit `villa-front-garage-pool` | chain `02_exterior_front_day` + `23_garage`; "front elevation with the open garage bay and the pool edge glimpsed past the side passage, late afternoon" | wide | Villa |
| Property hero - PATEL tower | E | `the-patel/renders/patel-hero-still.webp` 2200x1466 | wide | Patel - CLIENT |
| 5 forms - plan | E | `00_ground_floor_plan.webp` | std | Villa |
| 5 forms - 3D plan | G edit (master) `villa-3d-plan-ground` | chain `00_ground_floor_plan`; "clean white-model axonometric of the ground floor, 45 deg, soft studio light, no text" | std | Villa |
| 5 forms - render | E | `06_living_pool_view.webp` | std | Villa |
| 5 forms - model | E | `/models/villa-house.glb` (+lite) | - | Villa - AI 3D SCAN |
| 5 forms - film | E | `film/house-film-desktop.mp4` + `house-film-poster.webp` | - | Villa |
| Case-study composition | E | `film/contact-sheet.webp` 1920x1500 + `CASE_COVERS` (03 pool exterior / valmont poster-final / patel-hero-realistic-v2) | - | mixed, labeled per card |
| Nav 1 - hub | E | `the-patel/brand/patel-breakout-hero.webp` crop | thumb | Patel |
| Nav 2 - kitchens | E | `10_kitchen_island_detail.webp` crop | thumb | Villa |
| Nav 3 - bathrooms | E | `18_primary_bath_detail.webp` crop | thumb | Villa |
| Nav 4 - furniture | E | `canal/pairs/dining-editorial.webp` crop | thumb | Canal |
| Nav 5 - apartments | E | `canal/pairs/terrace-editorial-v2.webp` crop | thumb | Canal |
| Nav 6 - homes | E | `28_pool_water_level.webp` crop | thumb | Villa |
| Nav 7 - buildings | E | `patel-rooftop-single-v2.webp` crop | thumb | Patel |

### 2.2 KITCHENS `/interior-design/kitchens`

| # | Slot | E/G | Asset / plan | Size | Project |
|---|---|---|---|---|---|
| 01 | hero | E | `poolside-villa/renders/09_kitchen_master.webp` | std | Villa |
| 02 | layouts x6 | G text `kitchen-layout-{one-wall,galley,l,u,island,double-island}` | one `prompts.json`; shared style: "top-down 3D cutaway of a kitchen, white-model walls, pale oak cabinetry, warm studio light, no text, no people"; per-id layout line | 1536x1024 each | diagram set - label SHOWCASE DIAGRAM |
| 03 | cabinetry | E | `maison-valmont/gallery/kitchen-island.webp` | std | Valmont |
| 04 | materials editorial | E x3 | `valmont/details/calacatta`, `french-oak`, `brass-hardware` | std | Valmont |
| 05 | before | E | `canal-apartment/pairs/kitchen-raw.webp` 2000x1263 - label "source frame" | std | Canal |
| 06 | after | E | `canal-apartment/pairs/kitchen-editorial-v2.webp` 1576x998 (same architecture, locked) | std | Canal |
| 07 | 3D plan | G edit `canal-kitchen-3d-plan` | chain `canal/plans/kitchen.webp` + `kitchen-raw`; "isometric cutaway of this kitchen only, counters/island in place, white model, no text" | std | Canal |
| 08 | cinematic frame | G edit `villa-kitchen-cine` | chain external `frames/09_kitchen_master.png` 1920x1080; "same kitchen at dusk, pendants on, 2.39 letterbox grade, slight haze" | 1920x1080 | Villa |
| 09 | detail | E | `maison-valmont/kitchen/kitchen-detail.webp` | std | Valmont |
| 10 | mobile hero | G edit `villa-kitchen-mobile` | chain `09_kitchen_master`; "portrait reframe on the island end, extend ceiling/floor, nothing else changes" | portrait | Villa |

### 2.3 BATHROOMS `/interior-design/bathrooms`

| # | Slot | E/G | Asset / plan | Size | Project |
|---|---|---|---|---|---|
| 01 | hero | E | `maison-valmont/after/bath-restored.webp` | std | Valmont |
| 02 | layout top-down | G edit `canal-bath-topdown` | chain `canal/plans/bath.webp`; "true top-down 3D cutaway of this bathroom, fixtures in place, white model, no text" | std | Canal |
| 03 | primary | E | `17_primary_bath_master.webp` | std | Villa |
| 04 | compact | E | `21_secondary_bath.webp` | std | Villa |
| 05 | powder room | G text `powder-room` | mood refs `valmont/details/limestone`, `brass-hardware`; "small powder room, wall-hung basin on a limestone slab, brass tap, dark plaster walls, single pendant, no text, no people" | std | label "studio concept" |
| 06 | materials | E x3 | `valmont/details/limestone`, `stone-slab`, `brass-hardware` | std | Valmont |
| 07 | before | E | `canal/pairs/bath-raw.webp` - "source frame" | std | Canal |
| 08 | after | E | `canal/pairs/bath-editorial-v2.webp` 1535x1024 | std | Canal |
| 09 | detail | E | `valmont/gallery/bath-detail.webp` 1024x1536 | portrait | Valmont |
| 10 | cinematic | G edit `villa-bath-cine` | chain external `frames/17_primary_bath_master.png`; "blue hour, tub lit from the window, steam, 2.39 grade" | 1920x1080 | Villa |
| 11 | mobile | G edit `valmont-bath-mobile` | chain `after/bath-restored`; "portrait reframe on the vanity wall, extend vertically" | portrait | Valmont |

### 2.4 FURNITURE & DECOR `/interior-design/furniture-decor`

| # | Slot | E/G | Asset / plan | Size | Project |
|---|---|---|---|---|---|
| 01 | hero living room | E | `canal/pairs/living-editorial-v2.webp` 1577x997 | std | Canal |
| 02 | empty room | G edit `canal-living-empty` | chain `living-editorial-v2`; "remove every piece of furniture, rug, art and decor; keep floor, walls, windows, lighting identical" | std | Canal |
| 03 | furnished same room | E | `living-editorial-v2` (same file as 01 in a second role on the same page - fine; the no-reuse rule is about heroes across pages) | std | Canal |
| 04 | furniture plan | G edit `canal-living-furniture-plan` | chain `canal/plans/living.webp`; "top-down furnished plan of this living room, sofa/rug/table footprints as a white model, no text" | std | Canal |
| 05 | moodboard (no text) | G text `furniture-moodboard` | mood refs `valmont/details/textiles`, `wool-linen`, `french-oak`; "flat-lay moodboard: linen, boucle, oak, travertine, brushed brass swatches on a pale ground, no text, no labels" | std | label "studio concept" |
| 06 | living collection | E | `07_living_detail.webp` | std | Villa |
| 07 | bedroom collection | E | `canal/pairs/primary-editorial-v2.webp` | std | Canal |
| 08 | dining collection | E | `canal/pairs/dining-editorial-v2.webp` | std | Canal |
| 09 | decor detail | E | `valmont/details/chandelier.webp` (alt `textiles`) | std | Valmont |
| 10 | material palette | E x4 | `valmont/details/wool-linen`, `textiles`, `french-oak`, `stone-slab` (grid) | std | Valmont |
| 11 | mobile | G edit `canal-living-mobile` | chain `living-editorial-v2`; "portrait reframe on the sofa + window" | portrait | Canal |

### 2.5 APARTMENTS `/interior-design/apartments` - Canal Apartment only

| # | Slot | E/G | Asset / plan | Size | Project |
|---|---|---|---|---|---|
| 01 | hero (3D plan -> interior) | G master `canal-3d-plan` (stage 1) + E `pairs/canal-editorial-v2.webp` 1578x997 (stage 2). Landing uses the chained `canal-3d-plan-hero` variant, so no hero file is shared | wide | Canal |
| 02 | source | E | `pairs/canal-raw.webp` 2000x1263 - label "3D source frame" | std | Canal |
| 03 | clean plan | G edit `canal-plan-2d` | chain `plans/overview.webp`; "redraw as a clean 2D architectural line plan, black lines on white, wall thickness, door swings, no text/dimensions" - label "plan study" (not surveyed) | std | Canal |
| 04 | 3D plan | G edit (master) `canal-3d-plan` | chain `plans/overview.webp` + `canal-raw`; "whole-apartment axonometric cutaway, 45 deg, furnished, white walls, daylight, no text" | std | Canal |
| 05 | living | E | `pairs/living-editorial-v2.webp` | std | Canal |
| 06 | kitchen | E | `pairs/kitchen-editorial-v2.webp` | std | Canal |
| 07 | bedroom | E | `pairs/primary-editorial-v2.webp` | std | Canal |
| 08 | bathroom | E | `pairs/bath-editorial-v2.webp` | std | Canal |
| 09 | balcony / waterfront | E | `pairs/terrace-editorial-v2.webp` | std | Canal |
| 10 | film frame | G edit `canal-cine` | chain `canal-editorial-v2`; "same view at dusk, interior lamps on, 2.39 letterbox grade" - label "cinematic frame" (there is **no** Canal film) | 1920x1080 | Canal |
| 11 | before/after | E | `pairs/lounge-raw.webp` <-> `pairs/lounge-editorial-v2.webp` | std | Canal |
| 12 | mobile | G edit `canal-hero-mobile` | chain `canal-editorial-v2`; "portrait reframe toward the water" | portrait | Canal |

### 2.6 HOMES `/interior-design/homes` - Poolside Villa only

| # | Slot | E/G | Asset / plan | Size | Project |
|---|---|---|---|---|---|
| 01 | hero | E | `03_exterior_pool_master.webp` (prefer external `frames/03_exterior_pool_master.png` 1920x1080 re-encoded) | wide | Villa |
| 02 | ground 3D plan | G edit (master) `villa-3d-plan-ground` (shared with landing "5 forms" - not a hero there) | see 2.1 | std | Villa |
| 03 | upper 3D plan | G edit (master) `villa-3d-plan-upper` | chain `01_upper_floor_plan`; same brief as ground | std | Villa |
| 04 | cutaway whole house | G edit `villa-cutaway` | chain `03_exterior_pool_master` + `00` + `01`; "section cutaway of the whole two-storey house, front wall removed, both floors furnished, pool in foreground" | wide | Villa |
| 05 | living | E | `06_living_pool_view.webp` | std | Villa |
| 06 | kitchen | E | `10_kitchen_island_detail.webp` | std | Villa |
| 07 | primary bedroom | E | `14_primary_bedroom_master.webp` | std | Villa |
| 08 | primary bath | E | `18_primary_bath_detail.webp` | std | Villa |
| 09 | pool | E | `27_pool_hero.webp` | std | Villa |
| 10 | garage | E | `23_garage.webp` | std | Villa |
| 11 | landscape / arrival | E | `02_exterior_front_day.webp` | std | Villa |
| 12 | cinematic frame | E (import) | external `frames/26_outdoor_kitchen.png` 1920x1080 -> webp | 1920x1080 | Villa |
| 13 | blue hour | G edit `villa-blue-hour` | chain `27_pool_hero`; "same pool terrace at blue hour, underwater lights, warm interior glow, deep blue sky" | wide | Villa |
| 14 | mobile | G edit `villa-hero-mobile` | chain `28_pool_water_level`; "portrait reframe, extend sky" | portrait | Villa |

### 2.7 BUILDINGS `/interior-design/buildings` - The Patel only

| # | Slot | E/G | Asset / plan | Size | Project |
|---|---|---|---|---|---|
| 01 | hero | E (code) | **real-time WebGL breakout already exists** - `src/features/interior-design/hero/` (`InteriorDesignHero.jsx`, `towerScene.js`, `hero.config.js`): tower GLB high/med/low + bird + miami-bay background + pano IBL; poster fallback `brand/patel-breakout-hero.webp`. Reuse the component; do not ship a second static hero | - | Patel |
| 02 | full exterior | E | `renders/patel-hero-realistic-v2.webp` 1672x941 | wide | Patel |
| 03 | exploded floors | G edit `patel-exploded` | chain `patel-architecture-single.webp` (portrait); "the tower as an exploded axonometric, floor plates separated vertically, white model, no text" | portrait | Patel |
| 04 | unit selection | E + code | `renders/patel-hero-single.webp` 1672x941 as base; floor highlight as SVG overlay in code. 22 per-unit heroes importable from external `images/residences/*/hero.webp` 1600x1066 if a picker is built | wide | Patel |
| 05 | residence plan | E | `residence-1802/floorplan.webp` 1600x900 | std | Patel |
| 06 | lobby | G text `patel-lobby` | mood ref `patel-interior-sunset-travertine-v1`; "double-height residential lobby, travertine floor, fluted oak wall, brass reception desk, Miami light through full-height glass, no text, no people" | std | label "concept" |
| 07 | amenity | G text `patel-amenity` | mood ref `patel-rooftop-single-v2`; "indoor pool-deck lounge with ocean view, same travertine + oak language, no text, no people" | std | label "concept" |
| 08 | rooftop | E | `renders/patel-rooftop-single-v2.webp` | std | Patel |
| 09 | residence interior | E | `residence-1802/living.webp` 1600x900 (secondary: kitchen/primary/terrace) | std | Patel |
| 10 | cinematic frame | E (import) | external `media/patel/patel-hero-poster-v2.webp` 2560x1440 -> repo `the-patel/film/` | wide | Patel |
| 11 | website mockup | E (code) | browser-frame composition of `brand/patel-hero-lockup.webp` + `patel-hero-still` + `residence-1802/*` in CSS - no generation | - | Patel |
| 12 | mobile | E | `renders/patel-architecture-single.webp` 1024x1536 | portrait | Patel |

---

## 3. GENERATION LIST

### Counts

| Generator | Count | Items |
|---|---|---|
| **edit** (`interior-enhance.mjs`) | 22 | villa-3d-plan-ground, villa-3d-plan-upper, villa-3d-plan-ground-hero, villa-front-garage-pool, villa-bath-landing, villa-cutaway, villa-blue-hour, villa-kitchen-cine, villa-bath-cine, villa-kitchen-mobile, villa-hero-mobile, canal-3d-plan, canal-3d-plan-hero, canal-plan-2d, canal-kitchen-3d-plan, canal-bath-topdown, canal-living-empty, canal-living-furniture-plan, canal-cine, canal-hero-mobile, canal-living-mobile, valmont-bath-mobile, patel-exploded |
| **text** (`generate-backgrounds.mjs`, one prompts.json) | 10 | kitchen-layout x6, powder-room, furniture-moodboard, patel-lobby, patel-amenity |
| **import only** (external -> webp, no AI) | 3 (+22 optional) | sketch-opening 1920x1080, frames/26_outdoor_kitchen 1920x1080, patel-hero-poster-v2 2560x1440; optional PATEL per-unit heroes |
| **code only** | 3 | buildings 01 (existing breakout hero), 04 unit overlay, 11 website mockup |

Total AI generations: 32 (22 edit + 10 text).

### Dependency order
1. **Imports** (no API): sketch-opening, 26_outdoor_kitchen, patel-hero-poster-v2 -> `public/interior-design/projects/*/film/`.
2. **Edit masters** (chain from repo/external sources only):
   villa-3d-plan-ground <- 00 | villa-3d-plan-upper <- 01 | canal-3d-plan <- plans/overview + canal-raw | canal-plan-2d <- plans/overview | canal-living-empty <- living-editorial-v2 | canal-living-furniture-plan <- plans/living | canal-kitchen-3d-plan <- plans/kitchen + kitchen-raw | canal-bath-topdown <- plans/bath | patel-exploded <- patel-architecture-single | villa-cutaway <- 03 + 00 + 01 | villa-front-garage-pool <- 02 + 23 | villa-bath-landing <- 17 | villa-blue-hour <- 27 | villa-kitchen-cine <- frames/09 (1920x1080) | villa-bath-cine <- frames/17 | canal-cine <- canal-editorial-v2.
3. **Chained variants** (need step-2 output): villa-3d-plan-ground-hero <- villa-3d-plan-ground (+03) | canal-3d-plan-hero <- canal-3d-plan.
4. **Mobile portraits** (last, from finals): villa-kitchen-mobile <- 09 | villa-hero-mobile <- 28 | canal-hero-mobile <- canal-editorial-v2 | canal-living-mobile <- living-editorial-v2 | valmont-bath-mobile <- bath-restored.
5. **Text set** (independent; parallel with 2): one `prompts.json` with kitchen-layout x6, powder-room, furniture-moodboard, patel-lobby, patel-amenity. Label the four non-layout outputs "studio concept" in `interiorMedia.js`; never as CLIENT PROJECT.
6. Optimize all outputs to WebP q82 <=2000px (+ avif for heroes), add entries to `src/data/interiorMedia.js` with honest labels, then wire pages.

### Hero-uniqueness check (one image = one hero)
landing progression (sketch / 00 / villa-3d-plan-ground-hero / 05 / 25) - landing space heroes (valmont kitchen-hero / villa-bath-landing / canal lounge-editorial) - landing property heroes (canal-3d-plan-hero / villa-front-garage-pool / patel-hero-still) - kitchens 09 - bathrooms valmont bath-restored - furniture canal living-editorial-v2 - apartments canal-3d-plan + canal-editorial-v2 - homes 03 - buildings WebGL breakout. No duplicates. Nav thumbs (10, 18, dining-editorial, terrace-editorial-v2, 28, rooftop-v2, breakout poster) are not heroes anywhere except the breakout poster, which is the fallback for the buildings hero only.

### Gaps worth knowing
- Canal Apartment has no film and no true plan: slots 03/04/10 are generated and must carry "study / cinematic frame" labels.
- PATEL has no lobby/amenity/exploded imagery: all three are concepts, not deliverables.
- Villa has no before/after pair: kitchen/bath before/after come from Canal (the only honest raw->editorial set).
- Stray external `frames/ChatGPT Image Aug 22 ... .png` 1513x1039 is unclassified - not mapped.
