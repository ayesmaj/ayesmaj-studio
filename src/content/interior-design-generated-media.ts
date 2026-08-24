/**
 * Interior Design generated-media manifest (owner brief §28, 2026-08-22).
 *
 * Single source of truth for every generated or prepared asset used by the
 * Interior Design pages. Components resolve media by (page, slot) — never by
 * hardcoded paths. `originals/` keep the untouched generation masters; `web`
 * paths are the optimised WebP derivatives written by
 * scripts/optimize-interior-pages.py, which also fills width/height.
 *
 * status: 'approved' | 'review' | 'existing' (real project asset reused as-is)
 */
export type MediaPage = 'landing' | 'kitchens' | 'bathrooms' | 'furniture-decor' | 'apartments' | 'homes' | 'buildings' | 'navigation' | 'shared' | 'og';

export interface GeneratedMedia {
  id: string;
  page: MediaPage;
  section: string;
  file: string;            // web path, e.g. /interior-design/generated/kitchens/hero/01_kitchen_hero.webp
  mobileFile?: string;     // dedicated portrait crop (1080x1350 / 1080x1600), not a stretched desktop image
  alt: string;
  width: number;
  height: number;
  aspectRatio: string;     // e.g. '16:9'
  prompt: string;          // '' for existing project assets
  sourceReferences: string[]; // images the generation was chained from (or the real asset's project path)
  generatedAt: string;     // ISO date
  status: 'approved' | 'review' | 'existing';
  architectureLocked: boolean; // true when the generation had to preserve a real plan/model/screenshot
  project?: string;        // honest provenance label shown in captions
}

// Filled by scripts/optimize-interior-pages.py from the generation job list + measured files.
export const GENERATED_MEDIA: GeneratedMedia[] = [
  {
    "id": "01_kitchen_hero",
    "page": "kitchens",
    "section": "hero",
    "file": "/interior-design/generated/kitchens/hero/01_kitchen_hero.webp",
    "mobileFile": "/interior-design/generated/kitchens/mobile/01_kitchen_hero.webp",
    "alt": "Poolside Villa kitchen — stone island, oak cabinetry and the dining room beyond",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/09_kitchen_master.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "02_kitchen_layout_one-wall",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/02_kitchen_layout_one-wall.webp",
    "mobileFile": null,
    "alt": "Kitchen layout diagram — one wall",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Top-down 3D cutaway diagram of a one-wall kitchen: a single run of cabinets and appliances along one wall, seen from directly above at a slight angle, white-model walls cut at counter height, pale oak cabinetry, stone worktops, appliances in place, clear circulation space, warm studio light, plain pale background, no text, no labels, no dimensions, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "Showcase diagram"
  },
  {
    "id": "02_kitchen_layout_galley",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/02_kitchen_layout_galley.webp",
    "mobileFile": null,
    "alt": "Kitchen layout diagram — galley",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Top-down 3D cutaway diagram of a galley kitchen: two parallel runs of cabinets with a walkway between, seen from directly above at a slight angle, white-model walls cut at counter height, pale oak cabinetry, stone worktops, appliances in place, clear circulation space, warm studio light, plain pale background, no text, no labels, no dimensions, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "Showcase diagram"
  },
  {
    "id": "02_kitchen_layout_l-shaped",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/02_kitchen_layout_l-shaped.webp",
    "mobileFile": null,
    "alt": "Kitchen layout diagram — l shaped",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Top-down 3D cutaway diagram of an L-shaped kitchen: cabinets along two adjacent walls meeting in a corner, seen from directly above at a slight angle, white-model walls cut at counter height, pale oak cabinetry, stone worktops, appliances in place, clear circulation space, warm studio light, plain pale background, no text, no labels, no dimensions, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "Showcase diagram"
  },
  {
    "id": "02_kitchen_layout_u-shaped",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/02_kitchen_layout_u-shaped.webp",
    "mobileFile": null,
    "alt": "Kitchen layout diagram — u shaped",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Top-down 3D cutaway diagram of a U-shaped kitchen: cabinets along three walls, seen from directly above at a slight angle, white-model walls cut at counter height, pale oak cabinetry, stone worktops, appliances in place, clear circulation space, warm studio light, plain pale background, no text, no labels, no dimensions, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "Showcase diagram"
  },
  {
    "id": "02_kitchen_layout_island",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/02_kitchen_layout_island.webp",
    "mobileFile": null,
    "alt": "Kitchen layout diagram — island",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Top-down 3D cutaway diagram of a kitchen with a single central island and one run of wall cabinets, seen from directly above at a slight angle, white-model walls cut at counter height, pale oak cabinetry, stone worktops, appliances in place, clear circulation space, warm studio light, plain pale background, no text, no labels, no dimensions, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "Showcase diagram"
  },
  {
    "id": "02_kitchen_layout_double-island",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/02_kitchen_layout_double-island.webp",
    "mobileFile": null,
    "alt": "Kitchen layout diagram — double island",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Top-down 3D cutaway diagram of a kitchen with two parallel islands and a run of wall cabinets, seen from directly above at a slight angle, white-model walls cut at counter height, pale oak cabinetry, stone worktops, appliances in place, clear circulation space, warm studio light, plain pale background, no text, no labels, no dimensions, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "Showcase diagram"
  },
  {
    "id": "03_kitchen_cabinetry",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/03_kitchen_cabinetry.webp",
    "mobileFile": null,
    "alt": "Maison Valmont kitchen — cabinetry, appliance wall and island",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/maison-valmont/gallery/kitchen-island.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
  },
  {
    "id": "04_kitchen_materials",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/04_kitchen_materials.webp",
    "mobileFile": null,
    "alt": "Calacatta stone, oak and brass — kitchen material detail",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/maison-valmont/details/calacatta.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
  },
  {
    "id": "05_kitchen_before",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/05_kitchen_before.webp",
    "mobileFile": null,
    "alt": "Poolside Villa kitchen as the empty construction shell — bare walls, screed floor, the same windows and openings",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "Show this exact room as an EMPTY CONSTRUCTION SHELL before the kitchen is installed: identical camera, walls, ceiling height, windows, door openings and floor outline. Remove ALL cabinetry, the island, appliances, lighting fixtures, stools and styling. Bare skim-coated plaster walls with patch marks, unfinished grey concrete screed floor, capped plumbing and electrical points visible on the wall, a single bare work light, dusty daylight through the same windows, no furniture, no people, no text. Realistic construction-site photograph of the shell.",
    "sourceReferences": [
      "source-assets/interior-generated/kitchens/06_kitchen_after.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "06_kitchen_after",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/06_kitchen_after.webp",
    "mobileFile": null,
    "alt": "Poolside Villa kitchen — the designed kitchen: oak cabinetry, stone island, warm evening light",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "Render this exact kitchen as the finished, fully designed room at early evening: the same camera, walls, windows, ceiling and openings; the same island and cabinetry positions. Upgrade every material to the premium finish — natural oak cabinetry, honed limestone island with a waterfall edge, integrated appliances, warm under-cabinet and pendant light, bar stools, a styled counter with a bowl of fruit and a ceramic vase, a glimpse of the garden and pool through the glass. Ultra-realistic, premium editorial photography, no people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/10_kitchen_island_detail.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "07_kitchen_3d_floor_plan",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/07_kitchen_3d_floor_plan.webp",
    "mobileFile": null,
    "alt": "Canal Apartment kitchen — 3D floor-plan study with clearances and zones",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Redraw this kitchen as an isometric 3D floor-plan cutaway of the kitchen only: counters, island and appliances exactly where they are, clean white-model axonometric cutaway at 45 degrees, walls cut at door-head height, every room furnished as in the source, soft studio daylight, pale oak floors, neutral materials, no text, no labels, no people.",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/plans/kitchen.webp",
      "public/interior-design/projects/canal-apartment/pairs/kitchen-raw.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Canal Apartment — client project (plan study)"
  },
  {
    "id": "08_kitchen_cinematic_frame",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/08_kitchen_cinematic_frame.webp",
    "mobileFile": null,
    "alt": "Poolside Villa kitchen at dusk — cinematic frame",
    "width": 2048,
    "height": 1024,
    "aspectRatio": "2:1",
    "prompt": "The same kitchen at dusk: pendants and under-cabinet lighting on, a low warm sun outside, slight atmospheric haze, cinematic 2.39 framing and grade, everything in the room exactly as it is.",
    "sourceReferences": [
      "C:/Users/smadj/Documents/inetrior design/public/generated/vellora-house-film/frames/09_kitchen_master.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "09_kitchen_detail",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/09_kitchen_detail.webp",
    "mobileFile": null,
    "alt": "Kitchen detail — stone, cabinetry, tap and lighting",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/maison-valmont/kitchen/kitchen-detail.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
  },
  {
    "id": "10_kitchen_style_vintage",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/10_kitchen_style_vintage.webp",
    "mobileFile": null,
    "alt": "The same Canal Apartment kitchen plan in Vintage style",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "Keep this EXACT kitchen 3D floor-plan cutaway: identical camera angle, walls, window and door openings, the island position, the run of the cabinetry and appliances, the table and chairs - the layout must not change at all. Restyle ONLY cabinetry fronts, worktop and splashback materials, fixtures, lighting, flooring, chairs and decor to the named period style. Photoreal axonometric cutaway, clean off-white background, no text, no labels, no people. Style: Vintage 1950s-60s kitchen: painted sage-green and cream shaker cabinetry with chrome pulls, checkerboard tile floor, a retro cream fridge, enamel range, butcher-block and white tile worktops, warm pendant glass lights, wooden bistro chairs.",
    "sourceReferences": [
      "source-assets/interior-generated/kitchens/07_kitchen_3d_floor_plan.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CANAL"
  },
  {
    "id": "11_kitchen_style_artdeco",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/11_kitchen_style_artdeco.webp",
    "mobileFile": null,
    "alt": "The same Canal Apartment kitchen plan in Art Deco style",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "Keep this EXACT kitchen 3D floor-plan cutaway: identical camera angle, walls, window and door openings, the island position, the run of the cabinetry and appliances, the table and chairs - the layout must not change at all. Restyle ONLY cabinetry fronts, worktop and splashback materials, fixtures, lighting, flooring, chairs and decor to the named period style. Photoreal axonometric cutaway, clean off-white background, no text, no labels, no people. Style: Art Deco kitchen: high-gloss black and walnut cabinetry with brass inlays and fluted fronts, black-and-gold marble worktops and splashback, geometric chevron parquet floor, stepped brass pendant lights, velvet chairs, mirrored details.",
    "sourceReferences": [
      "source-assets/interior-generated/kitchens/07_kitchen_3d_floor_plan.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CANAL"
  },
  {
    "id": "12_kitchen_style_renaissance",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/12_kitchen_style_renaissance.webp",
    "mobileFile": null,
    "alt": "The same Canal Apartment kitchen plan in Renaissance style",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "Keep this EXACT kitchen 3D floor-plan cutaway: identical camera angle, walls, window and door openings, the island position, the run of the cabinetry and appliances, the table and chairs - the layout must not change at all. Restyle ONLY cabinetry fronts, worktop and splashback materials, fixtures, lighting, flooring, chairs and decor to the named period style. Photoreal axonometric cutaway, clean off-white background, no text, no labels, no people. Style: Italian Renaissance kitchen: carved walnut cabinetry with classical mouldings and corbels, Carrara marble worktops, a terracotta tile floor, copper pots and a stone hood over the range, wrought-iron pendant lanterns, carved wooden chairs, a painted frieze under the ceiling.",
    "sourceReferences": [
      "source-assets/interior-generated/kitchens/07_kitchen_3d_floor_plan.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CANAL"
  },
  {
    "id": "01_bathroom_hero",
    "page": "bathrooms",
    "section": "hero",
    "file": "/interior-design/generated/bathrooms/hero/01_bathroom_hero.webp",
    "mobileFile": "/interior-design/generated/bathrooms/mobile/01_bathroom_hero.webp",
    "alt": "Maison Valmont bathroom — limestone, oak vanity, bronze fixtures and low-iron glass",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/maison-valmont/after/bath-restored.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
  },
  {
    "id": "02_bathroom_layout",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/02_bathroom_layout.webp",
    "mobileFile": null,
    "alt": "Canal Apartment bathroom — top-down layout study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Redraw this bathroom as a true top-down 3D cutaway: vanity, toilet, shower, tub and storage exactly where they are, circulation clear, clean white-model axonometric cutaway at 45 degrees, walls cut at door-head height, every room furnished as in the source, soft studio daylight, pale oak floors, neutral materials, no text, no labels, no people.",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/plans/bath.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Canal Apartment — client project (plan study)"
  },
  {
    "id": "03_primary_bathroom",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/03_primary_bathroom.webp",
    "mobileFile": null,
    "alt": "Poolside Villa primary bathroom — freestanding tub, stone vanity and walk-in shower",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/17_primary_bath_master.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "04_compact_bathroom",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/04_compact_bathroom.webp",
    "mobileFile": null,
    "alt": "Poolside Villa secondary bathroom — compact plan",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/21_secondary_bath.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "05_powder_room",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/05_powder_room.webp",
    "mobileFile": null,
    "alt": "Powder room — studio concept in limestone, plaster and bronze",
    "width": 1024,
    "height": 1536,
    "aspectRatio": "2:3",
    "prompt": "A premium compact powder room: wall-hung basin on a limestone slab, a brass wall tap, dark warm plaster walls, a single bronze pendant, a tall mirror with soft edge lighting, oak door, photographed from the doorway, calm and realistic, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "Studio concept"
  },
  {
    "id": "06_bathroom_materials",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/06_bathroom_materials.webp",
    "mobileFile": null,
    "alt": "Limestone, oak and bronze — bathroom material detail",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/maison-valmont/details/limestone.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
  },
  {
    "id": "07_bathroom_before",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/07_bathroom_before.webp",
    "mobileFile": null,
    "alt": "Poolside Villa primary bathroom as the empty construction shell - bare walls, screed floor, capped plumbing, same window",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "Show this exact room as an EMPTY CONSTRUCTION SHELL before the bathroom is fitted: identical camera, walls, ceiling, window and door openings. Remove the vanity, bath, shower screen, taps, mirrors, lighting and all styling. Bare skim-coated plaster walls with patch marks, unfinished grey concrete screed floor, capped water and waste pipes sticking out of the wall and floor where the fittings will go, a single bare work light, dusty daylight from the same window, no furniture, no people, no text. Realistic construction-site photograph of the shell.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/08_bathroom_after.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "08_bathroom_after",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/08_bathroom_after.webp",
    "mobileFile": null,
    "alt": "Poolside Villa primary bathroom - the designed room: limestone, oak vanity, bronze fittings, evening light",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "Render this exact bathroom as the finished, fully designed room at early evening: same camera, walls, window, ceiling and openings, same vanity and bath positions. Premium finishes - honed limestone floor and walls, an oak vanity with a stone top, bronze wall-mounted taps, a freestanding stone bath, warm concealed lighting, low-iron glass shower screen, linen towels and a single olive branch in a vase. Ultra-realistic, premium editorial photography, no people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/18_primary_bath_detail.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "09_bathroom_detail",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/09_bathroom_detail.webp",
    "mobileFile": null,
    "alt": "Bathroom detail — vanity, stone, mirror lighting and fixture",
    "width": 1024,
    "height": 1536,
    "aspectRatio": "2:3",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/maison-valmont/gallery/bath-detail.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
  },
  {
    "id": "10_bathroom_cinematic_frame",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/10_bathroom_cinematic_frame.webp",
    "mobileFile": null,
    "alt": "Poolside Villa primary bathroom at blue hour — cinematic frame",
    "width": 2048,
    "height": 1024,
    "aspectRatio": "2:1",
    "prompt": "The same primary bathroom at blue hour: the tub lit by the window, a trace of steam, warm vanity light against a deep blue exterior, cinematic 2.39 framing and grade, nothing moved.",
    "sourceReferences": [
      "C:/Users/smadj/Documents/inetrior design/public/generated/vellora-house-film/frames/17_primary_bath_master.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "20_bh_hero",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/20_bh_hero.webp",
    "mobileFile": "/interior-design/generated/bathrooms/mobile/20_bh_hero.webp",
    "alt": "Art Deco bathroom - emerald lacquer, colorful stone, brass, blush and ivory; studio concept",
    "width": 2048,
    "height": 1024,
    "aspectRatio": "2:1",
    "prompt": "A breathtaking bright Art Deco bathroom interior, wide hero shot from a three-quarter view: a freestanding sculptural bathtub in ivory stone on a podium of green-and-rust veined marble, a fluted emerald-green lacquered vanity wall with champagne-brass details and a large round brass-framed mirror, blush velvet stool, geometric Art Deco floor in ivory and burgundy stone, fluted glass shower screen with brass frame, tall window with sheer curtain letting in warm daylight, fresh flowers. Palette: warm ivory plaster, emerald-green lacquer, blush-pink textile, deep burgundy accents, warm walnut, champagne brass, colorful veined stone (green and rust marble with ivory), soft daylight. Bright, colorful, luxurious - NOT a beige minimal bathroom. Hyper-realistic, cinematic, premium editorial photography for a luxury design studio, correct perspective, high material realism, no people, no text, no logos.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "25_bh_wet_room",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/25_bh_wet_room.webp",
    "mobileFile": null,
    "alt": "Wet room - tub and rain shower behind fluted glass in one stone composition; studio concept",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "A luxurious wet room: freestanding stone bathtub and a large rain shower together in one open zone behind a floor-to-ceiling fluted-glass and champagne-brass partition, walls and floor in warm travertine with an emerald marble feature band, recessed warm lighting, wooden stool with towels. Palette: warm ivory plaster, emerald-green lacquer, blush-pink textile, deep burgundy accents, warm walnut, champagne brass, colorful veined stone (green and rust marble with ivory), soft daylight. Bright, colorful, luxurious - NOT a beige minimal bathroom. Hyper-realistic, cinematic, premium editorial photography for a luxury design studio, correct perspective, high material realism, no people, no text, no logos.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "30_bh_mat_travertine",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/30_bh_mat_travertine.webp",
    "mobileFile": null,
    "alt": "Travertine - macro material study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Extreme macro photograph of warm ivory travertine stone, natural pores and layered veining, raking warm daylight across the surface, shallow depth of field. Premium material study, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "31_bh_mat_emerald",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/31_bh_mat_emerald.webp",
    "mobileFile": null,
    "alt": "Emerald lacquer - macro material study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Extreme macro photograph of a high-gloss emerald-green lacquered fluted panel, light reflecting along the flutes, deep rich color. Premium material study, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "32_bh_mat_brass",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/32_bh_mat_brass.webp",
    "mobileFile": null,
    "alt": "Brushed brass - macro material study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Extreme macro photograph of brushed champagne brass metal, fine linear grain, soft warm reflections. Premium material study, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "33_bh_mat_calacatta",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/33_bh_mat_calacatta.webp",
    "mobileFile": null,
    "alt": "Calacatta - macro material study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Extreme macro photograph of Calacatta marble with bold gold and grey veining on white, polished surface with soft window reflection. Premium material study, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "34_bh_mat_fluted_glass",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/34_bh_mat_fluted_glass.webp",
    "mobileFile": null,
    "alt": "Fluted glass - macro material study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Extreme macro photograph of fluted reeded glass with warm light refracting through the ridges, hints of brass at the edge. Premium material study, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "35_bh_mat_velvet",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/35_bh_mat_velvet.webp",
    "mobileFile": null,
    "alt": "Blush velvet - macro material study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Extreme macro photograph of blush-pink velvet textile, soft pile catching directional light, gentle folds. Premium material study, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "21_bh_plan",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/21_bh_plan.webp",
    "mobileFile": null,
    "alt": "The same bathroom as a clean architectural floor plan",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Draw this EXACT bathroom as a clean top-down 2D architectural floor plan: correct positions of the bathtub on its podium, vanity wall, shower behind the fluted screen, window, door and circulation, thin precise black linework on warm white paper, furniture symbols, subtle wall poche, no dimensions, no text labels, no people.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "22_bh_sketch",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/22_bh_sketch.webp",
    "mobileFile": null,
    "alt": "The same plan as a rough notebook sketch",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Redraw this EXACT floor plan as a rough hand-drawn pencil sketch in a designer's notebook: loose confident pencil lines on warm sketchbook paper, slightly wobbly walls, quick hatching, a couple of scribbled arrows, the same layout unmistakably recognizable, no readable text, no people.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/21_bh_plan.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "23_bh_clay",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/23_bh_clay.webp",
    "mobileFile": null,
    "alt": "The same bathroom as a white clay 3D model",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Render this EXACT bathroom as a matte white clay 3D model: identical camera, walls, window, podium, bathtub, vanity and shower positions, all geometry kept but every surface plain matte white with soft ambient occlusion, thin dark edge lines like a CAD viewport, plain warm grey background outside the window, no materials, no colors, no people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "24_bh_material3d",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/24_bh_material3d.webp",
    "mobileFile": null,
    "alt": "The same bathroom as a materialized 3D visualization",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Render this EXACT white clay bathroom model as a furnished, materialized 3D visualization: identical camera and geometry; apply the materials of the second reference image (emerald lacquer vanity, veined marble podium, brass, blush velvet, Art Deco stone floor) with slightly flat CGI-viewport lighting - clearly a 3D visualization, one step before photorealism. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/23_bh_clay.png",
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "26_bh_plan3d",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/26_bh_plan3d.webp",
    "mobileFile": null,
    "alt": "The same bathroom as a furnished top-down 3D plan",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Render this EXACT bathroom as a photoreal top-down furnished 3D floor-plan cutaway: walls cut at door height, the bathtub on its marble podium, emerald vanity wall, shower behind fluted glass, window and door exactly where they are in the source, soft studio daylight, no text, no people.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "27_bh_doorway",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/27_bh_doorway.webp",
    "mobileFile": null,
    "alt": "The same bathroom seen from the doorway",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Show this EXACT bathroom from a different camera: standing in the doorway looking in - the emerald fluted vanity on one side, the sculptural tub on its veined-marble podium beyond it, the window with sheer curtain ahead, same materials, same architecture, warm daylight. Hyper-realistic, cinematic, premium editorial photography for a luxury design studio, correct perspective, high material realism, no people, no text, no logos.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "40_bh_dir_organic",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/40_bh_dir_organic.webp",
    "mobileFile": null,
    "alt": "The same bathroom in an Organic Modern direction",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Restyle this EXACT bathroom to ORGANIC MODERN: identical camera, walls, window, tub, vanity and shower positions. Materials become warm ivory microcement, travertine, pale oak slatted vanity, cream boucle stool, handmade zellige in sand tones, linen, greenery in a stone pot, soft organic curves, matte black-bronze taps. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "41_bh_dir_minimal",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/41_bh_dir_minimal.webp",
    "mobileFile": null,
    "alt": "The same bathroom in a Minimal Luxury direction",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Restyle this EXACT bathroom to MINIMAL LUXURY: identical camera and architecture. One stone only - large-format honed Calacatta on walls and podium, a monolithic stone tub, flush minimal white-oak vanity with integrated pulls, frameless clear glass shower, concealed warm lighting coves, almost empty styling, quiet perfection. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "42_bh_dir_mediterranean",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/42_bh_dir_mediterranean.webp",
    "mobileFile": null,
    "alt": "The same bathroom in a Mediterranean direction",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Completely restyle this bathroom to a true MEDITERRANEAN bathroom, keeping ONLY the camera angle, room dimensions, window position and the positions of tub, vanity and shower. REMOVE every Art Deco element: no emerald lacquer, no fluted green panels, no round brass mirror, no velvet pouf, no geometric marble floor. Instead: sun-washed white lime-plaster walls with soft rounded corners, a carved natural stone trough basin on a whitewashed rustic wood or masonry vanity, a simple rectangular mirror in aged wood, an arched niche painted sea-blue with clay pots, a rough-hewn natural stone tub on low whitewashed masonry steps, terracotta tile floor, an arched opening to the shower with a linen curtain instead of glass, olive branches in a clay vase, woven baskets, aged bronze taps, strong warm Greek-island sunlight with sharp shadows through the window. Rustic, sun-baked, honest materials - unmistakably Mediterranean. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "50_bh_room_travertine",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/50_bh_room_travertine.webp",
    "mobileFile": null,
    "alt": "The bathroom with travertine leading",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Adjust this EXACT bathroom, same camera and architecture: let warm ivory TRAVERTINE take the lead - the podium, floor and walls become travertine, other materials stay but recede. Subtle, believable change. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "51_bh_room_emerald",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/51_bh_room_emerald.webp",
    "mobileFile": null,
    "alt": "The bathroom with emerald lacquer leading",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Adjust this EXACT bathroom, same camera and architecture: let the EMERALD LACQUER take the lead - the vanity wall extends, an emerald lacquered ceiling band appears, emerald towels; other materials recede. Subtle, believable change. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "52_bh_room_brass",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/52_bh_room_brass.webp",
    "mobileFile": null,
    "alt": "The bathroom with brass leading",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Adjust this EXACT bathroom, same camera and architecture: let BRUSHED BRASS take the lead - brass mirror wall panels, brass tub filler and fittings, brass-edged shelves catching the light; other materials recede. Subtle, believable change. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "53_bh_room_calacatta",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/53_bh_room_calacatta.webp",
    "mobileFile": null,
    "alt": "The bathroom with Calacatta leading",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Adjust this EXACT bathroom, same camera and architecture: let CALACATTA MARBLE take the lead - the podium and back wall become bold-veined Calacatta, a Calacatta vanity top; other materials recede. Subtle, believable change. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "54_bh_room_fluted",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/54_bh_room_fluted.webp",
    "mobileFile": null,
    "alt": "The bathroom with fluted glass leading",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Adjust this EXACT bathroom, same camera and architecture: let FLUTED GLASS take the lead - the shower partition grows to a full fluted-glass wall with brass frame, a fluted glass pendant; other materials recede. Subtle, believable change. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "55_bh_room_velvet",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/55_bh_room_velvet.webp",
    "mobileFile": null,
    "alt": "The bathroom with blush velvet leading",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Adjust this EXACT bathroom, same camera and architecture: let BLUSH VELVET take the lead - a larger blush velvet bench, a blush velvet curtain beside the window, blush towels; other materials recede. Subtle, believable change. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "43_bh_dir_artdeco",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/43_bh_dir_artdeco.webp",
    "mobileFile": null,
    "alt": "The same bathroom in the Art Deco direction - dusk, candles and lamps lit",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Show this EXACT Art Deco bathroom at DUSK: identical camera, architecture and materials; the brass wall lights and a candle by the tub now lit, warm pools of light on the emerald lacquer and veined marble, deep blue evening light in the window. Hyper-realistic, cinematic, no people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "60_bh_shot_vanity",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/60_bh_shot_vanity.webp",
    "mobileFile": null,
    "alt": "Film frame - close on the emerald vanity and brass mirror",
    "width": 1672,
    "height": 941,
    "aspectRatio": "1.78:1",
    "prompt": "Same Art Deco bathroom as the source image - same materials (emerald fluted lacquer, champagne brass, ivory stone tub, green-and-rust veined marble podium, blush velvet, Art Deco floor), same architecture and light. New camera: close three-quarter view of the emerald fluted vanity with the round brass mirror, marble top with flowers and brass taps, wall light glowing softly. Cinematic 16:9 film frame, shallow depth of field, no people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "61_bh_shot_tub",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/61_bh_shot_tub.webp",
    "mobileFile": null,
    "alt": "Film frame - close on the stone tub and veined marble podium",
    "width": 1672,
    "height": 941,
    "aspectRatio": "1.78:1",
    "prompt": "Same Art Deco bathroom as the source image - same materials (emerald fluted lacquer, champagne brass, ivory stone tub, green-and-rust veined marble podium, blush velvet, Art Deco floor), same architecture and light. New camera: low close view across the rim of the ivory stone bathtub, the green-and-rust veined marble podium steps in the foreground, brass floor filler beside it, window light raking across the stone. Cinematic 16:9 film frame, shallow depth of field, no people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "62_bh_shot_shower",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/62_bh_shot_shower.webp",
    "mobileFile": null,
    "alt": "Film frame - facing the fluted glass shower",
    "width": 1672,
    "height": 941,
    "aspectRatio": "1.78:1",
    "prompt": "Same Art Deco bathroom as the source image - same materials (emerald fluted lacquer, champagne brass, ivory stone tub, green-and-rust veined marble podium, blush velvet, Art Deco floor), same architecture and light. New camera: facing the fluted glass and brass shower partition, warm light and a hint of steam behind the reeded glass, a blush towel on the brass rail. Cinematic 16:9 film frame, no people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/bathrooms/20_bh_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "01_furniture_decor_hero",
    "page": "furniture-decor",
    "section": "hero",
    "file": "/interior-design/generated/furniture-decor/hero/01_furniture_decor_hero.webp",
    "mobileFile": "/interior-design/generated/furniture-decor/mobile/01_furniture_decor_hero.webp",
    "alt": "Canal Apartment living room — furniture, textiles, art and light in one language",
    "width": 1577,
    "height": 997,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/living-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "02_empty_room",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/02_empty_room.webp",
    "mobileFile": null,
    "alt": "The same Poolside Villa lounge completely empty - finished floor and walls, no furniture, no decor",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "Show this exact room COMPLETELY EMPTY: identical camera, walls, windows, ceiling, floor finish and built-in joinery, same daylight. Remove every piece of loose furniture, the rug, lamps, curtains, artwork, plants, cushions and all decor - nothing on the floor, nothing on the walls. A clean, finished but unfurnished room, realistic photograph, no people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/03_furnished_room.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "03_furnished_room",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/03_furnished_room.webp",
    "mobileFile": null,
    "alt": "Poolside Villa family lounge - fully furnished and styled: sofa, rug, art, lamps, textiles",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "Render this exact lounge as the fully furnished, styled room at late afternoon: same camera, walls, windows, ceiling, floor and built-ins. A deep olive boucle sofa and two leather armchairs on a hand-knotted wool rug, a travertine coffee table with books and a ceramic bowl, floor and table lamps glowing, linen curtains, a large abstract artwork, plants, cushions and throws - one consistent material language. Ultra-realistic, premium editorial photography, no people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/13_family_lounge.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "04_furniture_plan",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/04_furniture_plan.webp",
    "mobileFile": null,
    "alt": "Canal Apartment living room — furniture placement and circulation plan study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Redraw this living room as a top-down furnished plan: sofa, rug, coffee table, lounge chairs and media wall exactly where they are, circulation routes clear, clean white-model axonometric cutaway at 45 degrees, walls cut at door-head height, every room furnished as in the source, soft studio daylight, pale oak floors, neutral materials, no text, no labels, no people.",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/plans/living.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Canal Apartment — client project (plan study)"
  },
  {
    "id": "05_reference_direction",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/05_reference_direction.webp",
    "mobileFile": null,
    "alt": "Reference direction — fabric, stone, wood and metal moodboard",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "An editorial flat-lay moodboard photographed from above on a pale plaster ground: swatches of natural linen and olive boucle, a slab of travertine, a block of oiled walnut and one of white oak, a brushed bronze sample, a ceramic vessel, a folded wool throw; soft north daylight; no text, no labels, no logos.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "Studio concept"
  },
  {
    "id": "06_living_collection",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/06_living_collection.webp",
    "mobileFile": null,
    "alt": "Living collection — sofa, lounge chairs, coffee table and rug",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/07_living_detail.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "07_bedroom_collection",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/07_bedroom_collection.webp",
    "mobileFile": null,
    "alt": "Bedroom collection — bed, nightstands, bench, rug, lighting and art",
    "width": 1200,
    "height": 758,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/primary-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "08_dining_collection",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/08_dining_collection.webp",
    "mobileFile": null,
    "alt": "Dining collection — table, chairs, pendant and sideboard",
    "width": 1200,
    "height": 758,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/dining-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "09_decor_detail",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/09_decor_detail.webp",
    "mobileFile": null,
    "alt": "Decor detail — light, ceramics and material",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/maison-valmont/details/chandelier.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
  },
  {
    "id": "10_material_palette",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/10_material_palette.webp",
    "mobileFile": null,
    "alt": "Material palette — wool, linen, oak and stone",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/maison-valmont/details/wool-linen.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
  },
  {
    "id": "11_furniture_cinematic_frame",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/11_furniture_cinematic_frame.webp",
    "mobileFile": null,
    "alt": "Poolside Villa living room as a cinematic film frame - dusk, lamps on, the camera moving through the styled room",
    "width": 1672,
    "height": 941,
    "aspectRatio": "1.78:1",
    "prompt": "Render this exact living room as a single CINEMATIC FILM FRAME: same camera position, walls, windows and furniture layout, at dusk with the lamps and concealed lighting on and the pool glowing outside. Anamorphic widescreen feel, shallow depth of field on the foreground sofa arm, warm highlights and deep shadows, subtle haze in the light, film-like colour grading. Ultra-realistic, no people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/05_living_master.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "12_decor_sofa",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/12_decor_sofa.webp",
    "mobileFile": null,
    "alt": "Olive boucle three-seat sofa - decor option, studio study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Single decor piece as a premium studio product photograph for a luxury interior design studio: the object alone on a seamless warm off-white plaster backdrop with a soft limestone floor plane, soft directional daylight from the left, gentle shadow, 4:3 framing with air around the object, photoreal materials, no text, no people, no props other than the named piece. The piece: a deep olive-green boucle three-seat sofa with a low oak plinth base and loose back cushions.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "13_decor_armchair",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/13_decor_armchair.webp",
    "mobileFile": null,
    "alt": "Leather and oak lounge chair - decor option, studio study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Single decor piece as a premium studio product photograph for a luxury interior design studio: the object alone on a seamless warm off-white plaster backdrop with a soft limestone floor plane, soft directional daylight from the left, gentle shadow, 4:3 framing with air around the object, photoreal materials, no text, no people, no props other than the named piece. The piece: a tan saddle-leather lounge chair with a sculpted solid oak frame.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "14_decor_floor_lamp",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/14_decor_floor_lamp.webp",
    "mobileFile": null,
    "alt": "Bronze floor lamp - decor option, studio study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Single decor piece as a premium studio product photograph for a luxury interior design studio: the object alone on a seamless warm off-white plaster backdrop with a soft limestone floor plane, soft directional daylight from the left, gentle shadow, 4:3 framing with air around the object, photoreal materials, no text, no people, no props other than the named piece. The piece: a tall patinated-bronze floor lamp with a pleated ivory linen shade, switched on with a warm glow.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "15_decor_pendant",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/15_decor_pendant.webp",
    "mobileFile": null,
    "alt": "Plaster and brass pendant - decor option, studio study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Single decor piece as a premium studio product photograph for a luxury interior design studio: the object alone on a seamless warm off-white plaster backdrop with a soft limestone floor plane, soft directional daylight from the left, gentle shadow, 4:3 framing with air around the object, photoreal materials, no text, no people, no props other than the named piece. The piece: a large hand-finished ivory plaster dome pendant light with a brushed brass stem, hanging from the top of frame.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "16_decor_rug",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/16_decor_rug.webp",
    "mobileFile": null,
    "alt": "Hand-knotted wool rug - decor option, studio study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Single decor piece as a premium studio product photograph for a luxury interior design studio: the object alone on a seamless warm off-white plaster backdrop with a soft limestone floor plane, soft directional daylight from the left, gentle shadow, 4:3 framing with air around the object, photoreal materials, no text, no people, no props other than the named piece. The piece: a hand-knotted wool rug in sand and charcoal with a subtle abstract pattern, shown half-rolled on the floor.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "17_decor_side_table",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/17_decor_side_table.webp",
    "mobileFile": null,
    "alt": "Travertine side table - decor option, studio study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Single decor piece as a premium studio product photograph for a luxury interior design studio: the object alone on a seamless warm off-white plaster backdrop with a soft limestone floor plane, soft directional daylight from the left, gentle shadow, 4:3 framing with air around the object, photoreal materials, no text, no people, no props other than the named piece. The piece: a cylindrical honed travertine side table with a single ceramic cup on top.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "18_decor_ceramics",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/18_decor_ceramics.webp",
    "mobileFile": null,
    "alt": "Stoneware ceramics set - decor option, studio study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Single decor piece as a premium studio product photograph for a luxury interior design studio: the object alone on a seamless warm off-white plaster backdrop with a soft limestone floor plane, soft directional daylight from the left, gentle shadow, 4:3 framing with air around the object, photoreal materials, no text, no people, no props other than the named piece. The piece: a set of five hand-thrown stoneware vases and bowls in cream, sand and charcoal glazes arranged on an oak shelf.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "19_decor_art",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/19_decor_art.webp",
    "mobileFile": null,
    "alt": "Large abstract artwork - decor option, studio study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Single decor piece as a premium studio product photograph for a luxury interior design studio: the object alone on a seamless warm off-white plaster backdrop with a soft limestone floor plane, soft directional daylight from the left, gentle shadow, 4:3 framing with air around the object, photoreal materials, no text, no people, no props other than the named piece. The piece: a large abstract painting in warm ochre, ivory and charcoal in a thin oak frame, leaning against the wall.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "20_decor_textiles",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/20_decor_textiles.webp",
    "mobileFile": null,
    "alt": "Linen and wool textiles - decor option, studio study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Single decor piece as a premium studio product photograph for a luxury interior design studio: the object alone on a seamless warm off-white plaster backdrop with a soft limestone floor plane, soft directional daylight from the left, gentle shadow, 4:3 framing with air around the object, photoreal materials, no text, no people, no props other than the named piece. The piece: a stack of linen cushions and a folded wool throw in olive, oatmeal and rust, on a low oak bench.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "21_office_collection",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/21_office_collection.webp",
    "mobileFile": null,
    "alt": "Office and study collection - oak desk, leather chair, organic bookcase, brass lamp; studio study",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "A styled home office corner as a premium editorial interior photograph: a solid oak writing desk with a tan leather task chair, an organic sculpted walnut bookcase with ceramics and books, a brass desk lamp glowing, warm ivory plaster walls, oak floor, soft daylight from a tall window at the left. Photoreal, sophisticated, no people, no text.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "30_fd_hero",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/30_fd_hero.webp",
    "mobileFile": null,
    "alt": "The atelier room - colorful ultra-luxury living room: emerald seating, blush chairs, mustard accent, walnut, brass, colorful art; studio concept",
    "width": 2048,
    "height": 1024,
    "aspectRatio": "2:1",
    "prompt": "A breathtaking bright colorful ultra-luxury living room, wide hero composition: cream architectural shell with tall windows and strong daylight, a deep emerald-teal velvet sofa, two blush-pink lounge chairs, a mustard accent armchair, warm walnut joinery and side tables, champagne-brass floor lamp and details, one large colorful abstract artwork, a layered patterned rug in rust/teal/cream, books, fresh flowers, plants, sculptural ceramics. Colorful luxury palette used with discipline: cream architectural shell, emerald and teal seating, blush chairs, mustard accent, warm walnut and natural oak, champagne brass, colorful large-scale artwork, layered patterned rug, books, flowers, plants, sculptural objects. Bright, alive, sophisticated - never dark, never moody, never beige-only, never childish. Hyper-realistic, premium editorial interior photography for a luxury design studio, natural daylight, correct perspective, high material realism, no people, no text, no logos.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "31_fd_empty",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/31_fd_empty.webp",
    "mobileFile": null,
    "alt": "The same room as an empty architectural shell - finished floors and walls, no furniture",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Remove ALL furniture, the rug, lamps, artwork, plants, objects and curtains - a completely empty but finished room: bare oak floor, clean cream walls, daylight through the same windows. Realistic photograph, no people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "32_fd_plan",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/32_fd_plan.webp",
    "mobileFile": null,
    "alt": "The same room as a furnished top-down 3D plan",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Render this EXACT living room as a photoreal top-down furnished 3D floor-plan cutaway: walls cut at door height, the emerald sofa, blush chairs, mustard armchair, rug, walnut tables and plants exactly where they stand in the source, same windows and openings, soft studio daylight, warm off-white background, no text, no labels, no people.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "33_fd_layout_social",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/33_fd_layout_social.webp",
    "mobileFile": null,
    "alt": "Layout A - social: seating turned into one conversation circle",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Rearrange ONLY the furniture into a SOCIAL layout: sofa and all chairs pulled into one close conversation circle around a central coffee table, rug centered under the group. Same pieces, same materials. Hyper-realistic, premium editorial interior photography for a luxury design studio, natural daylight, correct perspective, high material realism, no people, no text, no logos.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "34_fd_layout_open",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/34_fd_layout_open.webp",
    "mobileFile": null,
    "alt": "Layout B - open: furniture pulled to the edges, open centre",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Rearrange ONLY the furniture into an OPEN layout: sofa against the wall, chairs at the window, generous open floor in the centre of the room, rug along the sofa. Same pieces, same materials. Hyper-realistic, premium editorial interior photography for a luxury design studio, natural daylight, correct perspective, high material realism, no people, no text, no logos.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "35_fd_layout_sculptural",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/35_fd_layout_sculptural.webp",
    "mobileFile": null,
    "alt": "Layout C - sculptural: pieces placed as freestanding objects",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Rearrange ONLY the furniture into a SCULPTURAL layout: the sofa floating diagonally in the room, single chair isolated as an object near the window, artwork leaning on the floor, asymmetric composition with intentional negative space. Same pieces, same materials. Hyper-realistic, premium editorial interior photography for a luxury design studio, natural daylight, correct perspective, high material realism, no people, no text, no logos.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "36_fd_style_artdeco",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/36_fd_style_artdeco.webp",
    "mobileFile": null,
    "alt": "The same room styled Art Deco",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Restyle ALL furniture, rug, artwork and lighting to ART DECO: emerald and black lacquer, fluted walnut, brass inlays, geometric rug, stepped brass lighting, velvet seating, bold geometric art. Bright daylight, colorful, luxurious. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "37_fd_style_organic",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/37_fd_style_organic.webp",
    "mobileFile": null,
    "alt": "The same room styled Organic Modern",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Restyle ALL furniture, rug, artwork and lighting to ORGANIC MODERN: curved cream boucle sofa, travertine and pale oak, handwoven wool rug, ceramics, linen, sculptural paper lantern, olive greens and sand tones, one terracotta accent. Bright daylight. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "38_fd_style_midcentury",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/38_fd_style_midcentury.webp",
    "mobileFile": null,
    "alt": "The same room styled Mid-Century",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Restyle ALL furniture, rug, artwork and lighting to MID-CENTURY MODERN: teak lounge chairs with tan leather, low walnut sideboard, mustard sofa, geometric wool rug, sputnik brass lamp, abstract mid-century art, warm colorful palette. Bright daylight. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "39_fd_style_colorful",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/39_fd_style_colorful.webp",
    "mobileFile": null,
    "alt": "The same room styled Colorful Contemporary",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Restyle ALL furniture, rug, artwork and lighting to COLORFUL CONTEMPORARY: cobalt-blue sofa, coral chair, striped bold rug, colorful glass side tables, oversized vivid artwork, playful sculptural lighting - disciplined, gallery-like, not childish. Bright daylight. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "40_fd_reference",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/40_fd_reference.webp",
    "mobileFile": null,
    "alt": "Reference board - travel photograph, palette, fabric and material references pinned together; studio concept",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "A designer reference board photographed straight-on: a large pinned travel photograph of a sunlit Mediterranean interior, torn magazine pages, fabric swatches in emerald velvet and blush boucle, a brass sample, a walnut veneer piece, a hand-painted color palette card - arranged loosely on a warm cream board with natural shadows. Photoreal, no readable text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "41_fd_palette",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/41_fd_palette.webp",
    "mobileFile": null,
    "alt": "The palette extracted from the reference - large painted swatches with material chips",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Turn this reference board into a clean PALETTE BOARD: six large painted color fields (cream, emerald, blush, mustard, walnut brown, brass gold) with the matching fabric and material chips resting on them, photographed straight-on in daylight on the same cream board. Photoreal, no readable text, no people.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/40_fd_reference.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "42_fd_composition",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/42_fd_composition.webp",
    "mobileFile": null,
    "alt": "The atelier room as a working 3D composition - clay model with the furniture blocked in",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Render this EXACT living room as a white clay 3D working model with the furniture blocked in as simple massing volumes in their exact positions: matte white, soft ambient occlusion, thin dark edge lines like a CAD viewport, plain warm grey backdrop. Same camera. No materials, no colors, no people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "43_fd_mat_velvet",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/43_fd_mat_velvet.webp",
    "mobileFile": null,
    "alt": "Emerald velvet - large tactile crop",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Extreme macro photograph of deep emerald-green velvet upholstery, directional daylight raking across the pile, luxurious and tactile. No text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "44_fd_mat_boucle",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/44_fd_mat_boucle.webp",
    "mobileFile": null,
    "alt": "Blush boucle - large tactile crop",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Extreme macro photograph of blush-pink boucle fabric, looped wool texture catching soft daylight. No text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "45_fd_mat_walnut_brass",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/45_fd_mat_walnut_brass.webp",
    "mobileFile": null,
    "alt": "Walnut and brass - large tactile crop",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Extreme macro photograph of oiled walnut wood grain meeting a brushed champagne-brass edge detail, warm daylight. No text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "46_fd_mat_rug",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/46_fd_mat_rug.webp",
    "mobileFile": null,
    "alt": "Patterned rug - large tactile crop",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Extreme macro photograph of a hand-knotted rug with a bold rust, teal and cream abstract pattern, wool texture visible, daylight. No text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "47_fd_room_velvet",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/47_fd_room_velvet.webp",
    "mobileFile": null,
    "alt": "The room with emerald velvet leading",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Let EMERALD VELVET lead: the sofa grows bolder in emerald velvet, an emerald velvet armchair joins, emerald cushions; everything else recedes slightly. Subtle believable change, same camera. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "48_fd_room_boucle",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/48_fd_room_boucle.webp",
    "mobileFile": null,
    "alt": "The room with blush boucle leading",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Let BLUSH BOUCLE lead: the lounge chairs become blush boucle, a boucle ottoman appears, blush textiles; everything else recedes slightly. Subtle believable change, same camera. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "49_fd_room_walnut",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/49_fd_room_walnut.webp",
    "mobileFile": null,
    "alt": "The room with walnut and brass leading",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Let WALNUT AND BRASS lead: a full walnut shelving wall appears behind the sofa, brass lamp and brass-edged tables catch the light; everything else recedes slightly. Subtle believable change, same camera. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "50_fd_room_rug",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/50_fd_room_rug.webp",
    "mobileFile": null,
    "alt": "The room with the patterned rug leading",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Keep this EXACT living room: identical camera, walls, tall windows, ceiling, floor and architectural shell. Let the PATTERNED RUG lead: a larger bolder rust-teal-cream rug anchors the whole seating group, colors of the room echo it; everything else recedes slightly. Subtle believable change, same camera. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "51_fd_shot_detail",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/51_fd_shot_detail.webp",
    "mobileFile": null,
    "alt": "Film frame - close across the emerald sofa to the artwork",
    "width": 1672,
    "height": 941,
    "aspectRatio": "1.78:1",
    "prompt": "Same room, new camera: a low close cinematic 16:9 frame across the emerald sofa arm and a brass lamp toward the colorful artwork, shallow depth of field, daylight. No people, no text.",
    "sourceReferences": [
      "source-assets/interior-generated/furniture-decor/30_fd_hero.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CONCEPT"
  },
  {
    "id": "04_apartment_3d_plan",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/04_apartment_3d_plan.webp",
    "mobileFile": null,
    "alt": "Canal Apartment — furnished 3D floor-plan study",
    "width": 2048,
    "height": 1024,
    "aspectRatio": "2:1",
    "prompt": "Redraw this whole apartment as a furnished 3D floor-plan axonometric cutaway seen from 45 degrees above: every room, wall and window exactly as in the source, the waterfront side toward the bottom, clean white-model axonometric cutaway at 45 degrees, walls cut at door-head height, every room furnished as in the source, soft studio daylight, pale oak floors, neutral materials, no text, no labels, no people.",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/plans/overview.webp",
      "public/interior-design/projects/canal-apartment/pairs/canal-raw.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Canal Apartment — client project (plan study)"
  },
  {
    "id": "01_apartment_hero",
    "page": "apartments",
    "section": "hero",
    "file": "/interior-design/generated/apartments/hero/01_apartment_hero.webp",
    "mobileFile": "/interior-design/generated/apartments/mobile/01_apartment_hero.webp",
    "alt": "Canal Apartment — the furnished 3D plan at evening, about to step inside",
    "width": 2048,
    "height": 1024,
    "aspectRatio": "2:1",
    "prompt": "The same furnished 3D floor-plan axonometric, camera 30 degrees lower and closer so the living room and the waterfront edge dominate, evening light, warm lamps inside the rooms, the canal reflecting beyond; nothing in the plan changes.",
    "sourceReferences": [
      "source-assets/interior-generated/apartments/04_apartment_3d_plan.png",
      "public/interior-design/projects/canal-apartment/pairs/canal-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Canal Apartment — client project (plan study)"
  },
  {
    "id": "02_apartment_source",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/02_apartment_source.webp",
    "mobileFile": null,
    "alt": "Canal Apartment — 3D source frame of the existing condition",
    "width": 1200,
    "height": 758,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/canal-raw.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "03_apartment_clean_plan",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/03_apartment_clean_plan.webp",
    "mobileFile": null,
    "alt": "Canal Apartment — clean 2D plan study (not a survey)",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Redraw this apartment as a clean professional 2D architectural floor plan: black line work on white, correct wall thickness, door swings, window openings and fixed furniture footprints exactly as in the source, no text, no dimensions, no labels.",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/plans/overview.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Canal Apartment — client project (plan study)"
  },
  {
    "id": "05_apartment_living",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/05_apartment_living.webp",
    "mobileFile": null,
    "alt": "Canal Apartment living room at dusk - the designed room, lamps on, the water outside",
    "width": 1578,
    "height": 997,
    "aspectRatio": "1.58:1",
    "prompt": "Render this exact living room as the finished, fully designed room at dusk: identical camera, walls, window wall, ceiling, floor and the built-in media wall; same sofa and table positions. Match the materials and furniture identity of the second reference image (walnut media wall with lit niches, olive velvet sofa, travertine and walnut tables, wool rug). Lamps and concealed niche lighting on, the last light over the water outside, books and ceramics styled on the tables, linen curtains half drawn. Ultra-realistic, cinematic, premium editorial photography, no people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/living-raw.webp",
      "public/interior-design/projects/canal-apartment/pairs/living-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CANAL"
  },
  {
    "id": "06_apartment_kitchen",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/06_apartment_kitchen.webp",
    "mobileFile": null,
    "alt": "Canal Apartment kitchen",
    "width": 1200,
    "height": 760,
    "aspectRatio": "30:19",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/kitchen-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "07_apartment_bedroom",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/07_apartment_bedroom.webp",
    "mobileFile": null,
    "alt": "Canal Apartment primary bedroom",
    "width": 1200,
    "height": 758,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/primary-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "08_apartment_bathroom",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/08_apartment_bathroom.webp",
    "mobileFile": null,
    "alt": "Canal Apartment bathroom",
    "width": 1200,
    "height": 801,
    "aspectRatio": "1.50:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/bath-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "09_apartment_balcony",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/09_apartment_balcony.webp",
    "mobileFile": null,
    "alt": "Canal Apartment terrace and waterfront view",
    "width": 1200,
    "height": 759,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/terrace-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "10_apartment_film_frame",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/10_apartment_film_frame.webp",
    "mobileFile": null,
    "alt": "Canal Apartment at dusk — cinematic frame (no film exists for this project)",
    "width": 2048,
    "height": 1024,
    "aspectRatio": "2:1",
    "prompt": "The same room at dusk: interior lamps on, the canal outside turning blue, cinematic 2.39 framing and grade, slight haze in the light; nothing moved.",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/canal-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Canal Apartment — client project (cinematic frame)"
  },
  {
    "id": "11_apartment_before",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/11_apartment_before.webp",
    "mobileFile": null,
    "alt": "Canal Apartment lounge — 3D source frame",
    "width": 1800,
    "height": 1137,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/lounge-raw.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "11_apartment_after",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/11_apartment_after.webp",
    "mobileFile": null,
    "alt": "Canal Apartment lounge — visualized with the architecture locked",
    "width": 1577,
    "height": 997,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/lounge-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "60_ap_plan_unfurnished",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/60_ap_plan_unfurnished.webp",
    "mobileFile": null,
    "alt": "Canal Apartment - unfurnished 3D floor plan, the architecture alone",
    "width": 1200,
    "height": 600,
    "aspectRatio": "2:1",
    "prompt": "Render this EXACT furnished apartment 3D floor plan as the UNFURNISHED version: identical walls, openings, windows, balcony and camera, but remove all furniture - clean empty floors, white-model surfaces with the same warm daylight. No text, no people.",
    "sourceReferences": [
      "source-assets/interior-generated/apartments/04_apartment_3d_plan.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CANAL"
  },
  {
    "id": "61_ap_dir_artdeco",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/61_ap_dir_artdeco.webp",
    "mobileFile": null,
    "alt": "The Canal living room in an Art Deco direction",
    "width": 1200,
    "height": 759,
    "aspectRatio": "1.58:1",
    "prompt": "Keep this EXACT living room architecture: same camera, window wall, walnut media wall position, floor. Restyle furniture and decor to ART DECO: emerald velvet sofa, fluted walnut, brass inlays, geometric rug, stepped lighting. Bright daylight, colorful. No people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/living-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CANAL"
  },
  {
    "id": "62_ap_dir_organic",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/62_ap_dir_organic.webp",
    "mobileFile": null,
    "alt": "The Canal living room in an Organic Modern direction",
    "width": 1200,
    "height": 763,
    "aspectRatio": "1.57:1",
    "prompt": "Keep this EXACT living room architecture: same camera, window wall, media wall position, floor. Restyle furniture and decor to ORGANIC MODERN: curved cream boucle sofa, travertine, pale oak, wool rug, ceramics, linen, olive tones. Bright daylight. No people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/living-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CANAL"
  },
  {
    "id": "63_ap_dir_colorful",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/63_ap_dir_colorful.webp",
    "mobileFile": null,
    "alt": "The Canal living room in a Colorful Contemporary direction",
    "width": 1200,
    "height": 760,
    "aspectRatio": "30:19",
    "prompt": "Keep this EXACT living room architecture: same camera, window wall, media wall position, floor. Restyle furniture and decor to COLORFUL CONTEMPORARY: cobalt sofa, coral chair, bold striped rug, colorful glass, vivid oversized art - disciplined, not childish. Bright daylight. No people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/living-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CANAL"
  },
  {
    "id": "64_ap_dir_miami",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/64_ap_dir_miami.webp",
    "mobileFile": null,
    "alt": "The Canal living room in a Miami Modern direction",
    "width": 1200,
    "height": 759,
    "aspectRatio": "1.58:1",
    "prompt": "Keep this EXACT living room architecture: same camera, window wall, media wall position, floor. Restyle furniture and decor to MIAMI MODERN: white and blush curved seating, seafoam and flamingo accents, terrazzo coffee table, palm in a planter, light woods, breezy linen. Bright daylight. No people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/living-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "CANAL"
  },
  {
    "id": "65_ap_plan_studio",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/65_ap_plan_studio.webp",
    "mobileFile": null,
    "alt": "Studio apartment - furnished 3D plan, showcase diagram",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Photoreal top-down furnished 3D floor-plan cutaway of a compact STUDIO apartment: one room holding sleeping alcove, sofa zone, compact kitchen run, dining for two, work desk and bathroom; smart storage walls, warm oak and cream with emerald and blush accents, clear circulation. Warm off-white background, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "66_ap_plan_1br",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/66_ap_plan_1br.webp",
    "mobileFile": null,
    "alt": "One-bedroom apartment - furnished 3D plan, showcase diagram",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Photoreal top-down furnished 3D floor-plan cutaway of a ONE-BEDROOM apartment: living-dining with kitchen run, separate bedroom, bathroom, entry storage and a work corner; warm oak and cream with emerald and blush accents, same rendering style as a matching set. Warm off-white background, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "67_ap_plan_2br",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/67_ap_plan_2br.webp",
    "mobileFile": null,
    "alt": "Two-bedroom apartment - furnished 3D plan, showcase diagram",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Photoreal top-down furnished 3D floor-plan cutaway of a TWO-BEDROOM family apartment: living-dining, kitchen, two bedrooms, bathroom and en-suite, hallway storage; warm oak and cream with emerald and blush accents, same rendering style as a matching set. Warm off-white background, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "68_ap_plan_penthouse",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/68_ap_plan_penthouse.webp",
    "mobileFile": null,
    "alt": "Penthouse - furnished 3D plan, showcase diagram",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Photoreal top-down furnished 3D floor-plan cutaway of a PENTHOUSE: generous living with double seating groups, open kitchen with island, dining for eight, primary suite with dressing, guest room, two bathrooms, wraparound terrace; warm oak and cream with emerald and blush accents, same rendering style as a matching set. Warm off-white background, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "CONCEPT"
  },
  {
    "id": "01_home_hero",
    "page": "homes",
    "section": "hero",
    "file": "/interior-design/generated/homes/hero/01_home_hero.webp",
    "mobileFile": "/interior-design/generated/homes/mobile/01_home_hero.webp",
    "alt": "Poolside Villa — the complete two-storey house, pool, garage and landscape",
    "width": 1920,
    "height": 1080,
    "aspectRatio": "16:9",
    "prompt": "",
    "sourceReferences": [
      "C:/Users/smadj/Documents/inetrior design/public/generated/vellora-house-film/frames/03_exterior_pool_master.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "02_home_ground_floor",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/02_home_ground_floor.webp",
    "mobileFile": null,
    "alt": "Poolside Villa — ground floor 3D plan",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "Render this ground floor as a photorealistic 3D floor-plan axonometric: every wall, opening and piece of furniture exactly as in the source, pool terrace and garage included, clean white-model axonometric cutaway at 45 degrees, walls cut at door-head height, every room furnished as in the source, soft studio daylight, pale oak floors, neutral materials, no text, no labels, no people.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/00_ground_floor_plan.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "03_home_upper_floor",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/03_home_upper_floor.webp",
    "mobileFile": null,
    "alt": "Poolside Villa — upper floor 3D plan",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "Render this upper floor as a photorealistic 3D floor-plan axonometric: every wall, opening and piece of furniture exactly as in the source, balcony included, clean white-model axonometric cutaway at 45 degrees, walls cut at door-head height, every room furnished as in the source, soft studio daylight, pale oak floors, neutral materials, no text, no labels, no people. This is the UPPER level: NO swimming pool on this floor (the pool is on the ground floor below) — show balconies and a terrace overlooking the garden instead; bedrooms, bathrooms, stair landing.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/01_upper_floor_plan.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "04_home_whole_house",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/04_home_whole_house.webp",
    "mobileFile": null,
    "alt": "Poolside Villa — whole-house cutaway",
    "width": 2048,
    "height": 1024,
    "aspectRatio": "2:1",
    "prompt": "A section cutaway of this exact two-storey house: the pool-side wall removed so both furnished floors read at once, pool in the foreground, the architecture, pool, garage and landscape exactly as in the first image, room layouts as in the plans, late afternoon light.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/03_exterior_pool_master.webp",
      "public/interior-design/projects/poolside-villa/renders/00_ground_floor_plan.webp",
      "public/interior-design/projects/poolside-villa/renders/01_upper_floor_plan.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "05_home_living",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/05_home_living.webp",
    "mobileFile": null,
    "alt": "Poolside Villa living room opening to the pool",
    "width": 1536,
    "height": 1024,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/06_living_pool_view.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "06_home_kitchen",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/06_home_kitchen.webp",
    "mobileFile": null,
    "alt": "Poolside Villa kitchen island",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/10_kitchen_island_detail.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "07_home_primary_bedroom",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/07_home_primary_bedroom.webp",
    "mobileFile": null,
    "alt": "Poolside Villa primary bedroom",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/14_primary_bedroom_master.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "08_home_primary_bath",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/08_home_primary_bath.webp",
    "mobileFile": null,
    "alt": "Poolside Villa primary bathroom detail",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/18_primary_bath_detail.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "09_home_pool",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/09_home_pool.webp",
    "mobileFile": null,
    "alt": "Poolside Villa pool and outdoor living",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/27_pool_hero.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "10_home_garage",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/10_home_garage.webp",
    "mobileFile": null,
    "alt": "Poolside Villa garage",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/23_garage.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "11_home_landscape",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/11_home_landscape.webp",
    "mobileFile": null,
    "alt": "Poolside Villa — arrival and landscape",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/02_exterior_front_day.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "12_home_cinematic_frame",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/12_home_cinematic_frame.webp",
    "mobileFile": null,
    "alt": "Poolside Villa outdoor kitchen at golden hour — house-film frame",
    "width": 1920,
    "height": 1080,
    "aspectRatio": "16:9",
    "prompt": "",
    "sourceReferences": [
      "C:/Users/smadj/Documents/inetrior design/public/generated/vellora-house-film/frames/26_outdoor_kitchen.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "13_home_blue_hour",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/13_home_blue_hour.webp",
    "mobileFile": null,
    "alt": "Poolside Villa at blue hour",
    "width": 2048,
    "height": 1024,
    "aspectRatio": "2:1",
    "prompt": "The same pool terrace and house at blue hour: deep blue sky, underwater pool lights on, warm light glowing from every window, nothing moved or added.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/27_pool_hero.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "Poolside Villa — client project"
  },
  {
    "id": "70_hm_exploded",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/70_hm_exploded.webp",
    "mobileFile": null,
    "alt": "The villa as an exploded axonometric - roof, upper floor, ground floor, site",
    "width": 864,
    "height": 1821,
    "aspectRatio": "0.47:1",
    "prompt": "Turn this EXACT house cutaway into an EXPLODED AXONOMETRIC: the roof lifted highest, upper floor with its rooms below it, ground floor with pool terrace below that, and the site slab at the bottom - four layers vertically separated with clean air between them, same architecture and furniture, photoreal model style on a deep charcoal background with faint gold technical lines. No text, no people.",
    "sourceReferences": [
      "source-assets/interior-generated/homes/04_home_whole_house.png"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "71_hm_arrival",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/71_hm_arrival.webp",
    "mobileFile": null,
    "alt": "Arrival - the villa from the street at golden hour, driveway leading in",
    "width": 1672,
    "height": 941,
    "aspectRatio": "1.78:1",
    "prompt": "Same house, new camera: standing across the street at golden hour - the driveway leads past landscaping to the open garage and the entrance, warm interior light glowing through the glass, long shadows. Cinematic 16:9, ultra-realistic. No people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/02_exterior_front_day.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "73_hm_dir_artdeco",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/73_hm_dir_artdeco.webp",
    "mobileFile": null,
    "alt": "The villa living room in an Art Deco direction",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Keep this EXACT living room architecture: same camera, walls, windows, fireplace wall, floor. Restyle furniture and decor to ART DECO: emerald and burgundy velvet, fluted walnut, brass, geometric rug and lighting. Bright daylight, colorful. No people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/05_living_master.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "74_hm_dir_organic",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/74_hm_dir_organic.webp",
    "mobileFile": null,
    "alt": "The villa living room in an Organic Modern direction",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Keep this EXACT living room architecture: same camera, walls, windows, fireplace wall, floor. Restyle furniture and decor to ORGANIC MODERN: curved boucle, travertine, pale oak, wool, ceramics, olive and sand with one terracotta accent. Bright daylight. No people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/05_living_master.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "75_hm_dir_colorful",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/75_hm_dir_colorful.webp",
    "mobileFile": null,
    "alt": "The villa living room in a Colorful Contemporary direction",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Keep this EXACT living room architecture: same camera, walls, windows, fireplace wall, floor. Restyle furniture and decor to COLORFUL CONTEMPORARY: cobalt and coral seating, bold rug, colorful glass and vivid art - disciplined, not childish. Bright daylight. No people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/05_living_master.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "76_hm_web_mockup",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/76_hm_web_mockup.webp",
    "mobileFile": null,
    "alt": "The villa as a premium interactive property website - floor selector, rooms, model, film",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "A premium interactive property-website interface displayed on a large screen mockup, dark elegant UI: a large hero of THIS exact house, a floor selector (ground/upper), room thumbnails, a small 3D model viewport and a play button for the film, refined typography blocks (no readable words - suggest text with soft grey bars). The house imagery matches the source exactly. No people, no readable text.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/03_exterior_pool_master.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "77_hm_light_day",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/77_hm_light_day.webp",
    "mobileFile": null,
    "alt": "The villa at midday - same view as the sunset master",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Relight this EXACT view to bright MIDDAY: same camera, architecture, pool and landscaping; clear blue sky, crisp daylight, interiors visible and colorful. Ultra-realistic. No people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/03_exterior_pool_master.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "78_hm_light_evening",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/78_hm_light_evening.webp",
    "mobileFile": null,
    "alt": "The villa in the evening - same view, interiors glowing richly",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "Relight this EXACT view to EVENING: same camera, architecture, pool and landscaping; deep blue night sky, but every interior glowing warm and colorful through the glass, pool lit turquoise, path lights on. Interiors stay bright and rich - not a dark moody shot. Ultra-realistic. No people, no text.",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/03_exterior_pool_master.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "VILLA"
  },
  {
    "id": "80_hm_office",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/80_hm_office.webp",
    "mobileFile": null,
    "alt": "Office and guest room - warm oak desk wall and daybed - Poolside Villa",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/11_office_guest.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "VILLA"
  },
  {
    "id": "81_hm_family_lounge",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/81_hm_family_lounge.webp",
    "mobileFile": null,
    "alt": "Family lounge - built-ins, window seat and soft seating - Poolside Villa",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/13_family_lounge.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "VILLA"
  },
  {
    "id": "82_hm_foyer",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/82_hm_foyer.webp",
    "mobileFile": null,
    "alt": "Entry foyer - double-height arrival with stair - Poolside Villa",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/04_foyer.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "VILLA"
  },
  {
    "id": "83_hm_outdoor_lounge",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/83_hm_outdoor_lounge.webp",
    "mobileFile": null,
    "alt": "Outdoor lounge by the pool - Poolside Villa",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/25_outdoor_lounge.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "VILLA"
  },
  {
    "id": "84_hm_outdoor_kitchen",
    "page": "homes",
    "section": "sections",
    "file": "/interior-design/generated/homes/sections/84_hm_outdoor_kitchen.webp",
    "mobileFile": null,
    "alt": "Outdoor kitchen and dining terrace - Poolside Villa",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/26_outdoor_kitchen.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "VILLA"
  },
  {
    "id": "02_building_full_exterior",
    "page": "buildings",
    "section": "sections",
    "file": "/interior-design/generated/buildings/sections/02_building_full_exterior.webp",
    "mobileFile": null,
    "alt": "The Patel — full tower exterior at golden hour",
    "width": 1672,
    "height": 941,
    "aspectRatio": "1.78:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/the-patel/renders/patel-hero-realistic-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "The Patel — client project"
  },
  {
    "id": "03_building_exploded_floors",
    "page": "buildings",
    "section": "sections",
    "file": "/interior-design/generated/buildings/sections/03_building_exploded_floors.webp",
    "mobileFile": null,
    "alt": "The Patel — exploded levels study",
    "width": 1024,
    "height": 1536,
    "aspectRatio": "2:3",
    "prompt": "The same tower drawn as an exploded axonometric: the floor plates separated vertically with equal gaps, the facade geometry, fins and crown unchanged, white architectural model with subtle shadows, plain pale background, no text.",
    "sourceReferences": [
      "public/interior-design/projects/the-patel/renders/patel-architecture-single.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": true,
    "project": "The Patel — client project (study)"
  },
  {
    "id": "04_building_unit_selection",
    "page": "buildings",
    "section": "sections",
    "file": "/interior-design/generated/buildings/sections/04_building_unit_selection.webp",
    "mobileFile": null,
    "alt": "The Patel — the tower with one residence level in focus",
    "width": 1672,
    "height": 941,
    "aspectRatio": "1.78:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/the-patel/renders/patel-hero-single.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "The Patel — client project"
  },
  {
    "id": "05_building_residence_plan",
    "page": "buildings",
    "section": "sections",
    "file": "/interior-design/generated/buildings/sections/05_building_residence_plan.webp",
    "mobileFile": null,
    "alt": "The Patel — Residence 1802 floor plan",
    "width": 1200,
    "height": 675,
    "aspectRatio": "16:9",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/the-patel/residence-1802/floorplan.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "The Patel — client project"
  },
  {
    "id": "06_building_lobby",
    "page": "buildings",
    "section": "sections",
    "file": "/interior-design/generated/buildings/sections/06_building_lobby.webp",
    "mobileFile": null,
    "alt": "Residential lobby — studio concept for the PATEL presentation",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "A double-height residential tower lobby in Miami: travertine floor, a fluted oak feature wall, a brass reception desk, full-height glass with palms and warm sunset light outside, a single sculptural pendant, restrained luxury, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "Studio concept"
  },
  {
    "id": "07_building_amenity",
    "page": "buildings",
    "section": "sections",
    "file": "/interior-design/generated/buildings/sections/07_building_amenity.webp",
    "mobileFile": null,
    "alt": "Resident amenity — studio concept for the PATEL presentation",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "A resident lounge beside an indoor pool deck with an ocean view through full-height glass: travertine and oak, bronze details, low lounge seating, warm evening light, Miami skyline faint outside, no text, no people.",
    "sourceReferences": [],
    "generatedAt": "2026-08-23",
    "status": "approved",
    "architectureLocked": false,
    "project": "Studio concept"
  },
  {
    "id": "08_building_rooftop",
    "page": "buildings",
    "section": "sections",
    "file": "/interior-design/generated/buildings/sections/08_building_rooftop.webp",
    "mobileFile": null,
    "alt": "The Patel — rooftop pool and landscape",
    "width": 1200,
    "height": 800,
    "aspectRatio": "3:2",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/the-patel/renders/patel-rooftop-single-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "The Patel — client project"
  },
  {
    "id": "09_building_residence_interior",
    "page": "buildings",
    "section": "sections",
    "file": "/interior-design/generated/buildings/sections/09_building_residence_interior.webp",
    "mobileFile": null,
    "alt": "The Patel — Residence 1802 living room with the Miami view",
    "width": 1600,
    "height": 900,
    "aspectRatio": "16:9",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/the-patel/residence-1802/living.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "The Patel — client project"
  },
  {
    "id": "10_building_cinematic_frame",
    "page": "buildings",
    "section": "sections",
    "file": "/interior-design/generated/buildings/sections/10_building_cinematic_frame.webp",
    "mobileFile": null,
    "alt": "The Patel — launch-film frame",
    "width": 2400,
    "height": 1350,
    "aspectRatio": "16:9",
    "prompt": "",
    "sourceReferences": [
      "C:/Users/smadj/Documents/the patel - appartments/website/public/media/patel/patel-hero-poster-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "The Patel — client project"
  },
  {
    "id": "11_building_website_mockup",
    "page": "buildings",
    "section": "sections",
    "file": "/interior-design/generated/buildings/sections/11_building_website_mockup.webp",
    "mobileFile": null,
    "alt": "The Patel — interactive development website presentation",
    "width": 1200,
    "height": 675,
    "aspectRatio": "16:9",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/the-patel/brand/patel-breakout-hero.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "The Patel — client project"
  },
  {
    "id": "overview",
    "page": "navigation",
    "section": "navigation",
    "file": "/interior-design/generated/navigation/overview.webp",
    "mobileFile": null,
    "alt": "Interior Design overview — preview",
    "width": 800,
    "height": 500,
    "aspectRatio": "8:5",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/the-patel/brand/patel-breakout-hero.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "navigation preview"
  },
  {
    "id": "kitchens",
    "page": "navigation",
    "section": "navigation",
    "file": "/interior-design/generated/navigation/kitchens.webp",
    "mobileFile": null,
    "alt": "Kitchens — preview",
    "width": 800,
    "height": 500,
    "aspectRatio": "8:5",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/10_kitchen_island_detail.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "navigation preview"
  },
  {
    "id": "bathrooms",
    "page": "navigation",
    "section": "navigation",
    "file": "/interior-design/generated/navigation/bathrooms.webp",
    "mobileFile": null,
    "alt": "Bathrooms — preview",
    "width": 800,
    "height": 500,
    "aspectRatio": "8:5",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/18_primary_bath_detail.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "navigation preview"
  },
  {
    "id": "furniture-decor",
    "page": "navigation",
    "section": "navigation",
    "file": "/interior-design/generated/navigation/furniture-decor.webp",
    "mobileFile": null,
    "alt": "Furniture & Decor — preview",
    "width": 800,
    "height": 500,
    "aspectRatio": "8:5",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/dining-editorial.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "navigation preview"
  },
  {
    "id": "apartments",
    "page": "navigation",
    "section": "navigation",
    "file": "/interior-design/generated/navigation/apartments.webp",
    "mobileFile": null,
    "alt": "Apartments — preview",
    "width": 800,
    "height": 500,
    "aspectRatio": "8:5",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/terrace-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "navigation preview"
  },
  {
    "id": "homes",
    "page": "navigation",
    "section": "navigation",
    "file": "/interior-design/generated/navigation/homes.webp",
    "mobileFile": null,
    "alt": "Homes — preview",
    "width": 800,
    "height": 500,
    "aspectRatio": "8:5",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/poolside-villa/renders/28_pool_water_level.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "navigation preview"
  },
  {
    "id": "buildings",
    "page": "navigation",
    "section": "navigation",
    "file": "/interior-design/generated/navigation/buildings.webp",
    "mobileFile": null,
    "alt": "Buildings & Developments — preview",
    "width": 800,
    "height": 500,
    "aspectRatio": "8:5",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/the-patel/renders/patel-rooftop-single-v2.webp"
    ],
    "generatedAt": "2026-08-23",
    "status": "existing",
    "architectureLocked": false,
    "project": "navigation preview"
  }
];

export const media = (page: MediaPage, id: string): GeneratedMedia | undefined =>
  GENERATED_MEDIA.find((m) => m.page === page && m.id === id);

export const pageMedia = (page: MediaPage): GeneratedMedia[] => GENERATED_MEDIA.filter((m) => m.page === page);
