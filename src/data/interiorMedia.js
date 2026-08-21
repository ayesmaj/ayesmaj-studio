/**
 * interiorMedia — manifest for /public/interior-design assets.
 *
 * Every path here exists on disk (imported 2026-08-17, 141 assets, 54.4 MB,
 * WebP q82 ≤2000px; films are pre-encoded web versions). Components import
 * from here — never hardcode /interior-design paths in pages.
 *
 * Honesty rules encoded:
 *  - one sequence never mixes projects
 *  - "raw" imagery is labeled as source, never passed off as final
 *  - plans are the spatial source of truth
 */

const P = '/interior-design/projects';

// ── POOLSIDE VILLA — one house through every method (29-frame master set) ──
const V = `${P}/poolside-villa`;
const villaFrame = (file, label, room) => ({ src: `${V}/renders/${file}`, label, room });

export const VILLA = {
  slug: 'poolside-villa',
  name: 'Poolside Villa',
  base: V,
  contactSheet: `${V}/film/contact-sheet.webp`,
  plans: [
    villaFrame('00_ground_floor_plan.webp', 'Ground floor plan', 'plan'),
    villaFrame('01_upper_floor_plan.webp', 'Upper floor plan', 'plan'),
  ],
  sequence: [
    villaFrame('02_exterior_front_day.webp', 'Exterior, front', 'exterior'),
    villaFrame('03_exterior_pool_master.webp', 'Exterior, pool side', 'exterior'),
    villaFrame('04_foyer.webp', 'Foyer', 'entry'),
    villaFrame('05_living_master.webp', 'Living room', 'living'),
    villaFrame('06_living_pool_view.webp', 'Living, pool view', 'living'),
    villaFrame('07_living_detail.webp', 'Living detail', 'living'),
    villaFrame('08_dining.webp', 'Dining', 'dining'),
    villaFrame('09_kitchen_master.webp', 'Kitchen', 'kitchen'),
    villaFrame('10_kitchen_island_detail.webp', 'Kitchen island', 'kitchen'),
    villaFrame('11_office_guest.webp', 'Office + guest', 'office'),
    villaFrame('12_staircase.webp', 'Staircase', 'stair'),
    villaFrame('13_family_lounge.webp', 'Family lounge', 'lounge'),
    villaFrame('14_primary_bedroom_master.webp', 'Primary bedroom', 'primary'),
    villaFrame('15_primary_bedroom_view.webp', 'Primary bedroom view', 'primary'),
    villaFrame('16_primary_closet.webp', 'Primary closet', 'primary'),
    villaFrame('17_primary_bath_master.webp', 'Primary bath', 'bath'),
    villaFrame('18_primary_bath_detail.webp', 'Primary bath detail', 'bath'),
    villaFrame('19_bedroom_2.webp', 'Bedroom 2', 'bedroom'),
    villaFrame('20_bedroom_3.webp', 'Bedroom 3', 'bedroom'),
    villaFrame('21_secondary_bath.webp', 'Secondary bath', 'bath'),
    villaFrame('22_laundry_mudroom.webp', 'Laundry + mudroom', 'utility'),
    villaFrame('23_garage.webp', 'Garage', 'garage'),
    villaFrame('24_balcony.webp', 'Balcony', 'outdoor'),
    villaFrame('25_outdoor_lounge.webp', 'Outdoor lounge', 'outdoor'),
    villaFrame('26_outdoor_kitchen.webp', 'Outdoor kitchen', 'outdoor'),
    villaFrame('27_pool_hero.webp', 'Pool', 'pool'),
    villaFrame('28_pool_water_level.webp', 'Pool, water level', 'pool'),
  ],
};

/** The spec's house-film order (§26), drawn from one consistent project. */
export const VILLA_FILM_SEQUENCE = [
  VILLA.plans[0],
  VILLA.sequence[0], // exterior
  VILLA.sequence[2], // foyer / entry
  VILLA.sequence[3], // living
  VILLA.sequence[7], // kitchen
  VILLA.sequence[10], // stair
  VILLA.sequence[12], // primary suite
  VILLA.sequence[22], // balcony
  VILLA.sequence[23], // outdoor lounge
  VILLA.sequence[25], // pool
  VILLA.sequence[26], // final: water level
];

/** Hub hero: the same project as SCAN-stage plan → 3D-stage → render → film frame. */
export const HERO_STAGES = [
  { key: 'plan', label: '01 · Floor plan', ...VILLA.plans[0] },
  { key: 'upper', label: '02 · Level logic', ...VILLA.plans[1] },
  { key: 'render', label: '03 · Photoreal room', ...VILLA.sequence[3] },
  { key: 'film', label: '04 · Cinematic frame', ...VILLA.sequence[25] },
];

// ── CANAL APARTMENT — apartment set + honest raw→editorial pairs ───────────
const A = `${P}/canal-apartment`;
export const APARTMENT = {
  slug: 'canal-apartment',
  name: 'Canal Apartment',
  base: A,
  /** Alternate generated study views — labeled as studies, not plans. */
  studies: ['bath', 'dining', 'kitchen', 'living', 'overview', 'sunroom', 'waterfront'].map(
    (r) => ({ src: `${A}/plans/${r}.webp`, label: `${r[0].toUpperCase() + r.slice(1)} — study`, room: r }),
  ),
  /** Owner curation 2026-08-21: the CGI rooms set and most raw/editorial
      pairs were deleted at source; the site mirrors that. What survives:
      three source editorials plus our gpt-image-2 living regeneration. */
  gallery: [
    { src: `${A}/pairs/dining-editorial.webp`, label: 'Dining', room: 'dining' },
    { src: `${A}/pairs/lounge-editorial.webp`, label: 'Lounge', room: 'lounge' },
    { src: `${A}/pairs/primary-editorial.webp`, label: 'Primary', room: 'primary' },
    { src: `${A}/pairs/living-editorial-v2.webp`, label: 'Living', room: 'living' },
  ],
  /** The one complete honest pair: the surviving raw + a fresh gpt-image-2
      editorial generated from it under the architectural lock. */
  pair: { room: 'Terrace', raw: `${A}/pairs/terrace-raw.webp`, editorial: `${A}/pairs/terrace-editorial-v2.webp` },
};

// ── MAISON VALMONT — renovation: before → process → after → film ───────────
const M = `${P}/maison-valmont`;
export const VALMONT = {
  slug: 'maison-valmont',
  name: 'Maison Valmont',
  base: M,
  film: {
    src: `${M}/film/transformation-master.mp4`,
    poster: `${M}/film/film-poster.webp`,
    posterEmpty: `${M}/hero/poster-empty.webp`,
    posterFinal: `${M}/hero/poster-final.webp`,
  },
  /** Rooms with both existing + restored states → before/after sliders. */
  pairs: [
    { room: 'Salon', before: `${M}/before/salon-existing.webp`, after: `${M}/after/salon-restored.webp` },
    { room: 'Salon, alternate', before: `${M}/before/salon-existing-alt.webp`, after: `${M}/after/salon-restored-alt.webp` },
    { room: 'Dining', before: `${M}/before/dining-existing.webp`, after: `${M}/after/dining-restored.webp` },
    { room: 'Entrance', before: `${M}/before/entrance-existing.webp`, after: `${M}/after/entrance-restored.webp` },
    { room: 'Suite', before: `${M}/before/suite-existing.webp`, after: `${M}/after/suite-restored.webp` },
  ],
  after: ['bath-restored', 'dining-restored', 'entrance-restored', 'kitchen-restored', 'salon-evening', 'salon-restored', 'suite-restored'].map(
    (f) => ({ src: `${M}/after/${f}.webp`, label: f.replace(/-/g, ' ') }),
  ),
  /** The renovation journey, in build order. */
  process: [
    { src: `${M}/process/stage-existing.webp`, label: 'Existing' },
    { src: `${M}/process/stage-demolition.webp`, label: 'Demolition' },
    { src: `${M}/process/stage-structure.webp`, label: 'Structure' },
    { src: `${M}/process/stage-architecture.webp`, label: 'Architecture' },
    { src: `${M}/process/stage-materials.webp`, label: 'Materials' },
    { src: `${M}/process/stage-interiors.webp`, label: 'Interiors' },
    { src: `${M}/process/stage-detailing.webp`, label: 'Detailing' },
    { src: `${M}/process/stage-reveal.webp`, label: 'Reveal' },
  ],
  gallery: ['seq-arrival', 'seq-salon', 'seq-dining', 'seq-kitchen', 'seq-suite', 'seq-details', 'salon-wide', 'entrance-wide', 'kitchen-island', 'ceiling-detail', 'suite-vertical', 'bath-detail'].map(
    (f) => ({ src: `${M}/gallery/${f}.webp`, label: f.replace(/^seq-/, '').replace(/-/g, ' ') }),
  ),
  /** Material library — real deliverable imagery, not stock. */
  materials: ['calacatta', 'french-oak', 'boiserie', 'brass-hardware', 'limestone', 'plaster', 'marquetry', 'chandelier', 'textiles', 'wool-linen', 'joinery', 'metalwork'].map(
    (f) => ({ src: `${M}/details/${f}.webp`, label: f.replace(/-/g, ' ') }),
  ),
  annotated: `${M}/details/salon-annotated.webp`,
};

// ── THE PATEL — building/development + unit drill-down ─────────────────────
const T = `${P}/the-patel`;
export const PATEL = {
  slug: 'the-patel',
  name: 'The Patel',
  base: T,
  brand: `${T}/brand/patel-hero-lockup.webp`,
  environment: `${T}/environment/miami-sunset-pano.webp`,
  film: {
    desktop: `${T}/film/patel-hero-film-desktop.mp4`,
    mobile: `${T}/film/patel-hero-film-mobile.mp4`,
    poster: `${T}/renders/patel-hero-still.webp`,
  },
  tower: [
    { src: `${T}/renders/patel-hero-realistic-v2.webp`, label: 'Tower at dusk' },
    { src: `${T}/renders/patel-architecture-single.webp`, label: 'Architecture study' },
    { src: `${T}/renders/patel-miami-environment-v3.webp`, label: 'Miami environment' },
    { src: `${T}/renders/patel-rooftop-single-v2.webp`, label: 'Rooftop' },
  ],
  interiors: [
    { src: `${T}/renders/patel-interior-atlantic-calm-v1.webp`, label: 'Interior, Atlantic calm' },
    { src: `${T}/renders/patel-interior-sunset-travertine-v1.webp`, label: 'Interior, sunset travertine' },
    { src: `${T}/renders/patel-interior-tropical-modern-v1.webp`, label: 'Interior, tropical modern' },
  ],
  /** One unit, fully told: its own plan + rooms. */
  unit: {
    name: 'Residence 1802',
    floorplan: `${T}/residence-1802/floorplan.webp`,
    rooms: [
      { src: `${T}/residence-1802/living.webp`, label: 'Living' },
      { src: `${T}/residence-1802/kitchen.webp`, label: 'Kitchen' },
      { src: `${T}/residence-1802/primary.webp`, label: 'Primary' },
      { src: `${T}/residence-1802/terrace.webp`, label: 'Terrace' },
    ],
  },
};

/** Interactive showcase models (draco GLB, loaded only on tap).
    Sketchfab showcase assets, not client projects — labeled as such.
    Weights are the served file sizes, shown on the tap-to-load card. */
export const MODELS = {
  /** The real thing: the studio's own development project, full tower model. */
  featured: { key: 'the-patel', name: 'The Patel — Miami', file: '/interior-design/models/the-patel.glb', weight: '37.7 MB', credit: 'CLIENT PROJECT', line: 'Not a stock asset: the actual tower model behind The Patel development presentation. Walk the massing, the balconies, and the crown.' },
  /** The scale ladder, top down: skyline to a single faucet. */
  spaces: [
    { key: 'skyline', scale: '01', name: 'Skyline tower', file: '/interior-design/models/skyline.glb', weight: '7.2 MB', credit: 'SHOWCASE MODEL', line: 'Where a project starts: the tower against its city.' },
    { key: 'building', scale: '02', name: 'Residential building', file: '/interior-design/models/building.glb', weight: '22.5 MB', credit: 'SHOWCASE MODEL', line: 'The scale story: volume, levels, and where each residence sits.' },
    { key: 'house', scale: '03', name: 'Coastal hillside house', file: '/interior-design/models/house.glb', weight: '15.7 MB', credit: 'SHOWCASE MODEL', line: 'The whole home at one glance - levels, terraces, and the drop of the site.' },
    { key: 'apartment', scale: '04', name: 'Apartment floor plan', file: '/interior-design/models/apartment.glb', weight: '4.5 MB', credit: 'SHOWCASE MODEL', line: 'A furnished plan you can turn in your hands.' },
    { key: 'plan-study', scale: '05', name: 'Floor-plan study', file: '/interior-design/models/plan-study.glb', weight: '20 MB', credit: 'SHOWCASE MODEL', line: 'The layout as an object: rooms, walls, and circulation in the round.' },
  ],
  objects: [
    { key: 'kitchen-island', scale: '06', name: 'Kitchen island', file: '/interior-design/models/kitchen-island.glb', weight: '16.7 MB', credit: 'SHOWCASE MODEL', line: 'Where the plan meets daily life.' },
    { key: 'office-desk', scale: '07', name: 'Office desk', file: '/interior-design/models/office-desk.glb', weight: '8.8 MB', credit: 'SHOWCASE MODEL', line: 'Furniture at true scale.' },
    { key: 'bookcase', scale: '08', name: 'Organic bookcase', file: '/interior-design/models/bookcase.glb', weight: '1.7 MB', credit: 'SHOWCASE MODEL', line: 'A statement piece, inspectable from every side.' },
    { key: 'sinks', scale: '09', name: 'Sinks and faucets', file: '/interior-design/models/sinks.glb', weight: '5.6 MB', credit: 'SHOWCASE MODEL', line: 'Down to the fixture the client will touch every day.' },
  ],
};

export const PROJECTS = { 'poolside-villa': VILLA, 'canal-apartment': APARTMENT, 'maison-valmont': VALMONT, 'the-patel': PATEL };

/** Case-study cover images (index page + hub rail). */
export const CASE_COVERS = {
  'poolside-villa': VILLA.sequence[1].src,
  'maison-valmont': VALMONT.film.posterFinal,
  'the-patel': PATEL.tower[0].src,
};
