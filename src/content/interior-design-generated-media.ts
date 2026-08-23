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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "alt": "Canal Apartment kitchen — 3D source frame before visualization",
    "width": 1800,
    "height": 1137,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/kitchen-raw.webp"
    ],
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "06_kitchen_after",
    "page": "kitchens",
    "section": "sections",
    "file": "/interior-design/generated/kitchens/sections/06_kitchen_after.webp",
    "mobileFile": null,
    "alt": "Canal Apartment kitchen — visualized with the architecture locked",
    "width": 1576,
    "height": 998,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/kitchen-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
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
    "generatedAt": "2026-08-22",
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
    "alt": "Canal Apartment bathroom — 3D source frame before visualization",
    "width": 1800,
    "height": 1137,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/bath-raw.webp"
    ],
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "08_bathroom_after",
    "page": "bathrooms",
    "section": "sections",
    "file": "/interior-design/generated/bathrooms/sections/08_bathroom_after.webp",
    "mobileFile": null,
    "alt": "Canal Apartment bathroom — visualized with the architecture locked",
    "width": 1535,
    "height": 1024,
    "aspectRatio": "1.50:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/bath-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "03_furnished_room",
    "page": "furniture-decor",
    "section": "sections",
    "file": "/interior-design/generated/furniture-decor/sections/03_furnished_room.webp",
    "mobileFile": null,
    "alt": "The same living room fully furnished and styled",
    "width": 1577,
    "height": 997,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/living-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Maison Valmont — studio renovation set"
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
  },
  {
    "id": "05_apartment_living",
    "page": "apartments",
    "section": "sections",
    "file": "/interior-design/generated/apartments/sections/05_apartment_living.webp",
    "mobileFile": null,
    "alt": "Canal Apartment living room",
    "width": 1577,
    "height": 997,
    "aspectRatio": "1.58:1",
    "prompt": "",
    "sourceReferences": [
      "public/interior-design/projects/canal-apartment/pairs/living-editorial-v2.webp"
    ],
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Canal Apartment — client project"
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "Poolside Villa — client project"
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "The Patel — client project"
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "The Patel — client project"
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
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
    "generatedAt": "2026-08-22",
    "status": "existing",
    "architectureLocked": false,
    "project": "navigation preview"
  }
];

export const media = (page: MediaPage, id: string): GeneratedMedia | undefined =>
  GENERATED_MEDIA.find((m) => m.page === page && m.id === id);

export const pageMedia = (page: MediaPage): GeneratedMedia[] => GENERATED_MEDIA.filter((m) => m.page === page);
