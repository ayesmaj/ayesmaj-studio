"""
Builds scripts/interior-pages-media.json — the single slot list for the six
Interior Design pages + mega-menu previews (owner brief §27–38, 2026-08-22).
Derived from docs/interior-design-media-audit.md. Edit THIS file, then run it.

Entry fields: id, page, slot (as used by the page config), section
(hero|sections|details|mobile), type (existing|import|edit|text), sources,
prompt, size, cls (hero|wide|editorial|card|thumb → max web width), alt,
project (honest provenance label), lock (architecture locked), mobile
('crop' = dedicated portrait crop), focus (x fraction for the crop).
"""
import json

P = 'public/interior-design/projects'
V = f'{P}/poolside-villa/renders'
VF = 'C:/Users/smadj/Documents/inetrior design/public/generated/vellora-house-film/frames'
C = f'{P}/canal-apartment'
M = f'{P}/maison-valmont'
T = f'{P}/the-patel'
PATEL_EXT = 'C:/Users/smadj/Documents/the patel - appartments/website/public/media/patel'

VILLA = 'Poolside Villa — client project'
CANAL = 'Canal Apartment — client project'
VALM = 'Maison Valmont — studio renovation set'
PATEL = 'The Patel — client project'
DIAG = 'Showcase diagram'
CONCEPT = 'Studio concept'

WORLD_3D_PLAN = 'clean white-model axonometric cutaway at 45 degrees, walls cut at door-head height, every room furnished as in the source, soft studio daylight, pale oak floors, neutral materials, no text, no labels, no people'
E = []
def add(page, slot, **k):
    e = {'id': k.pop('id', slot), 'page': page, 'slot': slot, 'section': k.pop('section', 'sections'), 'type': k.pop('type', 'existing'),
         'sources': k.pop('sources', []), 'prompt': k.pop('prompt', ''), 'size': k.pop('size', None), 'cls': k.pop('cls', 'editorial'),
         'alt': k.pop('alt'), 'project': k.pop('project'), 'lock': k.pop('lock', False), 'mobile': k.pop('mobile', None), 'focus': k.pop('focus', 0.5)}
    assert not k, k
    E.append(e)

# ───────────────────────────── KITCHENS (mixed real projects, labelled)
add('kitchens', '01_kitchen_hero', section='hero', sources=[f'{V}/09_kitchen_master.webp'], cls='hero', mobile='crop', focus=0.55, alt='Poolside Villa kitchen — stone island, oak cabinetry and the dining room beyond', project=VILLA)
for i, (key, line) in enumerate([('one-wall', 'a one-wall kitchen: a single run of cabinets and appliances along one wall'), ('galley', 'a galley kitchen: two parallel runs of cabinets with a walkway between'), ('l-shaped', 'an L-shaped kitchen: cabinets along two adjacent walls meeting in a corner'), ('u-shaped', 'a U-shaped kitchen: cabinets along three walls'), ('island', 'a kitchen with a single central island and one run of wall cabinets'), ('double-island', 'a kitchen with two parallel islands and a run of wall cabinets')]):
    add('kitchens', f'02_kitchen_layout_{key}', id=f'02_kitchen_layout_{key}', type='text', size='1536x1024', cls='card', prompt=f'Top-down 3D cutaway diagram of {line}, seen from directly above at a slight angle, white-model walls cut at counter height, pale oak cabinetry, stone worktops, appliances in place, clear circulation space, warm studio light, plain pale background, no text, no labels, no dimensions, no people.', alt=f'Kitchen layout diagram — {key.replace("-", " ")}', project=DIAG)
add('kitchens', '03_kitchen_cabinetry', sources=[f'{M}/gallery/kitchen-island.webp'], alt='Maison Valmont kitchen — cabinetry, appliance wall and island', project=VALM)
add('kitchens', '04_kitchen_materials', sources=[f'{M}/details/calacatta.webp'], cls='card', alt='Calacatta stone, oak and brass — kitchen material detail', project=VALM)
add('kitchens', '05_kitchen_before', sources=[f'{C}/pairs/kitchen-raw.webp'], alt='Canal Apartment kitchen — 3D source frame before visualization', project=CANAL)
add('kitchens', '06_kitchen_after', sources=[f'{C}/pairs/kitchen-editorial-v2.webp'], alt='Canal Apartment kitchen — visualized with the architecture locked', project=CANAL)
add('kitchens', '07_kitchen_3d_floor_plan', type='edit', sources=[f'{C}/plans/kitchen.webp', f'{C}/pairs/kitchen-raw.webp'], size='1536x1024', cls='card', lock=True, prompt=f'Redraw this kitchen as an isometric 3D floor-plan cutaway of the kitchen only: counters, island and appliances exactly where they are, {WORLD_3D_PLAN}.', alt='Canal Apartment kitchen — 3D floor-plan study with clearances and zones', project=CANAL + ' (plan study)')
add('kitchens', '08_kitchen_cinematic_frame', type='edit', sources=[f'{VF}/09_kitchen_master.png'], size='2048x1024', cls='wide', lock=True, prompt='The same kitchen at dusk: pendants and under-cabinet lighting on, a low warm sun outside, slight atmospheric haze, cinematic 2.39 framing and grade, everything in the room exactly as it is.', alt='Poolside Villa kitchen at dusk — cinematic frame', project=VILLA)
add('kitchens', '09_kitchen_detail', sources=[f'{M}/kitchen/kitchen-detail.webp'], cls='card', alt='Kitchen detail — stone, cabinetry, tap and lighting', project=VALM)

# ───────────────────────────── BATHROOMS
add('bathrooms', '01_bathroom_hero', section='hero', sources=[f'{M}/after/bath-restored.webp'], cls='hero', mobile='crop', focus=0.5, alt='Maison Valmont bathroom — limestone, oak vanity, bronze fixtures and low-iron glass', project=VALM)
add('bathrooms', '02_bathroom_layout', type='edit', sources=[f'{C}/plans/bath.webp'], size='1536x1024', cls='card', lock=True, prompt=f'Redraw this bathroom as a true top-down 3D cutaway: vanity, toilet, shower, tub and storage exactly where they are, circulation clear, {WORLD_3D_PLAN}.', alt='Canal Apartment bathroom — top-down layout study', project=CANAL + ' (plan study)')
add('bathrooms', '03_primary_bathroom', sources=[f'{V}/17_primary_bath_master.webp'], cls='wide', alt='Poolside Villa primary bathroom — freestanding tub, stone vanity and walk-in shower', project=VILLA)
add('bathrooms', '04_compact_bathroom', sources=[f'{V}/21_secondary_bath.webp'], cls='card', alt='Poolside Villa secondary bathroom — compact plan', project=VILLA)
add('bathrooms', '05_powder_room', type='text', size='1024x1536', cls='card', prompt='A premium compact powder room: wall-hung basin on a limestone slab, a brass wall tap, dark warm plaster walls, a single bronze pendant, a tall mirror with soft edge lighting, oak door, photographed from the doorway, calm and realistic, no text, no people.', alt='Powder room — studio concept in limestone, plaster and bronze', project=CONCEPT)
add('bathrooms', '06_bathroom_materials', sources=[f'{M}/details/limestone.webp'], cls='card', alt='Limestone, oak and bronze — bathroom material detail', project=VALM)
add('bathrooms', '07_bathroom_before', sources=[f'{C}/pairs/bath-raw.webp'], alt='Canal Apartment bathroom — 3D source frame before visualization', project=CANAL)
add('bathrooms', '08_bathroom_after', sources=[f'{C}/pairs/bath-editorial-v2.webp'], alt='Canal Apartment bathroom — visualized with the architecture locked', project=CANAL)
add('bathrooms', '09_bathroom_detail', sources=[f'{M}/gallery/bath-detail.webp'], cls='card', alt='Bathroom detail — vanity, stone, mirror lighting and fixture', project=VALM)
add('bathrooms', '10_bathroom_cinematic_frame', type='edit', sources=[f'{VF}/17_primary_bath_master.png'], size='2048x1024', cls='wide', lock=True, prompt='The same primary bathroom at blue hour: the tub lit by the window, a trace of steam, warm vanity light against a deep blue exterior, cinematic 2.39 framing and grade, nothing moved.', alt='Poolside Villa primary bathroom at blue hour — cinematic frame', project=VILLA)

# ───────────────────────────── FURNITURE & DECOR
add('furniture-decor', '01_furniture_decor_hero', section='hero', sources=[f'{C}/pairs/living-editorial-v2.webp'], cls='hero', mobile='crop', focus=0.45, alt='Canal Apartment living room — furniture, textiles, art and light in one language', project=CANAL)
add('furniture-decor', '02_empty_room', type='edit', sources=[f'{C}/pairs/living-editorial-v2.webp'], size='1536x1024', cls='wide', lock=True, prompt='Remove every piece of furniture, rug, artwork, plant and decor object from this room so it is an empty architectural shell. Keep the floor, walls, windows, ceiling, doors and the lighting fixtures exactly as they are, same camera, same light.', alt='The same living room as an empty architectural shell', project=CANAL)
add('furniture-decor', '03_furnished_room', sources=[f'{C}/pairs/living-editorial-v2.webp'], cls='wide', alt='The same living room fully furnished and styled', project=CANAL)
add('furniture-decor', '04_furniture_plan', type='edit', sources=[f'{C}/plans/living.webp'], size='1536x1024', cls='card', lock=True, prompt=f'Redraw this living room as a top-down furnished plan: sofa, rug, coffee table, lounge chairs and media wall exactly where they are, circulation routes clear, {WORLD_3D_PLAN}.', alt='Canal Apartment living room — furniture placement and circulation plan study', project=CANAL + ' (plan study)')
add('furniture-decor', '05_reference_direction', type='text', size='1536x1024', cls='card', prompt='An editorial flat-lay moodboard photographed from above on a pale plaster ground: swatches of natural linen and olive boucle, a slab of travertine, a block of oiled walnut and one of white oak, a brushed bronze sample, a ceramic vessel, a folded wool throw; soft north daylight; no text, no labels, no logos.', alt='Reference direction — fabric, stone, wood and metal moodboard', project=CONCEPT)
add('furniture-decor', '06_living_collection', sources=[f'{V}/07_living_detail.webp'], cls='card', alt='Living collection — sofa, lounge chairs, coffee table and rug', project=VILLA)
add('furniture-decor', '07_bedroom_collection', sources=[f'{C}/pairs/primary-editorial-v2.webp'], cls='card', alt='Bedroom collection — bed, nightstands, bench, rug, lighting and art', project=CANAL)
add('furniture-decor', '08_dining_collection', sources=[f'{C}/pairs/dining-editorial-v2.webp'], cls='card', alt='Dining collection — table, chairs, pendant and sideboard', project=CANAL)
add('furniture-decor', '09_decor_detail', sources=[f'{M}/details/chandelier.webp'], cls='card', alt='Decor detail — light, ceramics and material', project=VALM)
add('furniture-decor', '10_material_palette', sources=[f'{M}/details/wool-linen.webp'], cls='card', alt='Material palette — wool, linen, oak and stone', project=VALM)

# ───────────────────────────── APARTMENTS (Canal Apartment only)
add('apartments', '04_apartment_3d_plan', type='edit', sources=[f'{C}/plans/overview.webp', f'{C}/pairs/canal-raw.webp'], size='2048x1024', cls='wide', lock=True, prompt=f'Redraw this whole apartment as a furnished 3D floor-plan axonometric cutaway seen from 45 degrees above: every room, wall and window exactly as in the source, the waterfront side toward the bottom, {WORLD_3D_PLAN}.', alt='Canal Apartment — furnished 3D floor-plan study', project=CANAL + ' (plan study)')
add('apartments', '01_apartment_hero', id='01_apartment_hero', section='hero', type='edit', sources=['public/interior-design/generated/apartments/originals/04_apartment_3d_plan.png', f'{C}/pairs/canal-editorial-v2.webp'], size='2048x1024', cls='hero', lock=True, mobile='crop', focus=0.5, prompt='The same furnished 3D floor-plan axonometric, camera 30 degrees lower and closer so the living room and the waterfront edge dominate, evening light, warm lamps inside the rooms, the canal reflecting beyond; nothing in the plan changes.', alt='Canal Apartment — the furnished 3D plan at evening, about to step inside', project=CANAL + ' (plan study)')
add('apartments', '02_apartment_source', sources=[f'{C}/pairs/canal-raw.webp'], cls='card', alt='Canal Apartment — 3D source frame of the existing condition', project=CANAL)
add('apartments', '03_apartment_clean_plan', type='edit', sources=[f'{C}/plans/overview.webp'], size='1536x1024', cls='card', lock=True, prompt='Redraw this apartment as a clean professional 2D architectural floor plan: black line work on white, correct wall thickness, door swings, window openings and fixed furniture footprints exactly as in the source, no text, no dimensions, no labels.', alt='Canal Apartment — clean 2D plan study (not a survey)', project=CANAL + ' (plan study)')
add('apartments', '05_apartment_living', sources=[f'{C}/pairs/living-editorial-v2.webp'], cls='wide', alt='Canal Apartment living room', project=CANAL)
add('apartments', '06_apartment_kitchen', sources=[f'{C}/pairs/kitchen-editorial-v2.webp'], cls='card', alt='Canal Apartment kitchen', project=CANAL)
add('apartments', '07_apartment_bedroom', sources=[f'{C}/pairs/primary-editorial-v2.webp'], cls='card', alt='Canal Apartment primary bedroom', project=CANAL)
add('apartments', '08_apartment_bathroom', sources=[f'{C}/pairs/bath-editorial-v2.webp'], cls='card', alt='Canal Apartment bathroom', project=CANAL)
add('apartments', '09_apartment_balcony', sources=[f'{C}/pairs/terrace-editorial-v2.webp'], cls='card', alt='Canal Apartment terrace and waterfront view', project=CANAL)
add('apartments', '10_apartment_film_frame', type='edit', sources=[f'{C}/pairs/canal-editorial-v2.webp'], size='2048x1024', cls='wide', lock=True, prompt='The same room at dusk: interior lamps on, the canal outside turning blue, cinematic 2.39 framing and grade, slight haze in the light; nothing moved.', alt='Canal Apartment at dusk — cinematic frame (no film exists for this project)', project=CANAL + ' (cinematic frame)')
add('apartments', '11_apartment_before', sources=[f'{C}/pairs/lounge-raw.webp'], alt='Canal Apartment lounge — 3D source frame', project=CANAL)
add('apartments', '11_apartment_after', sources=[f'{C}/pairs/lounge-editorial-v2.webp'], alt='Canal Apartment lounge — visualized with the architecture locked', project=CANAL)

# ───────────────────────────── HOMES (Poolside Villa only)
add('homes', '01_home_hero', section='hero', type='import', sources=[f'{VF}/03_exterior_pool_master.png'], cls='hero', mobile='crop', focus=0.55, alt='Poolside Villa — the complete two-storey house, pool, garage and landscape', project=VILLA)
add('homes', '02_home_ground_floor', type='edit', sources=[f'{V}/00_ground_floor_plan.webp'], size='1536x1024', cls='wide', lock=True, prompt=f'Render this ground floor as a photorealistic 3D floor-plan axonometric: every wall, opening and piece of furniture exactly as in the source, pool terrace and garage included, {WORLD_3D_PLAN}.', alt='Poolside Villa — ground floor 3D plan', project=VILLA)
add('homes', '03_home_upper_floor', type='edit', sources=[f'{V}/01_upper_floor_plan.webp'], size='1536x1024', cls='wide', lock=True, prompt=f'Render this upper floor as a photorealistic 3D floor-plan axonometric: every wall, opening and piece of furniture exactly as in the source, balcony included, {WORLD_3D_PLAN}.', alt='Poolside Villa — upper floor 3D plan', project=VILLA)
add('homes', '04_home_whole_house', type='edit', sources=[f'{V}/03_exterior_pool_master.webp', f'{V}/00_ground_floor_plan.webp', f'{V}/01_upper_floor_plan.webp'], size='2048x1024', cls='wide', lock=True, prompt='A section cutaway of this exact two-storey house: the pool-side wall removed so both furnished floors read at once, pool in the foreground, the architecture, pool, garage and landscape exactly as in the first image, room layouts as in the plans, late afternoon light.', alt='Poolside Villa — whole-house cutaway', project=VILLA)
add('homes', '05_home_living', sources=[f'{V}/06_living_pool_view.webp'], cls='wide', alt='Poolside Villa living room opening to the pool', project=VILLA)
add('homes', '06_home_kitchen', sources=[f'{V}/10_kitchen_island_detail.webp'], cls='card', alt='Poolside Villa kitchen island', project=VILLA)
add('homes', '07_home_primary_bedroom', sources=[f'{V}/14_primary_bedroom_master.webp'], cls='card', alt='Poolside Villa primary bedroom', project=VILLA)
add('homes', '08_home_primary_bath', sources=[f'{V}/18_primary_bath_detail.webp'], cls='card', alt='Poolside Villa primary bathroom detail', project=VILLA)
add('homes', '09_home_pool', sources=[f'{V}/27_pool_hero.webp'], cls='card', alt='Poolside Villa pool and outdoor living', project=VILLA)
add('homes', '10_home_garage', sources=[f'{V}/23_garage.webp'], cls='card', alt='Poolside Villa garage', project=VILLA)
add('homes', '11_home_landscape', sources=[f'{V}/02_exterior_front_day.webp'], cls='card', alt='Poolside Villa — arrival and landscape', project=VILLA)
add('homes', '12_home_cinematic_frame', type='import', sources=[f'{VF}/26_outdoor_kitchen.png'], cls='wide', alt='Poolside Villa outdoor kitchen at golden hour — house-film frame', project=VILLA)
add('homes', '13_home_blue_hour', type='edit', sources=[f'{V}/27_pool_hero.webp'], size='2048x1024', cls='wide', lock=True, prompt='The same pool terrace and house at blue hour: deep blue sky, underwater pool lights on, warm light glowing from every window, nothing moved or added.', alt='Poolside Villa at blue hour', project=VILLA)

# ───────────────────────────── BUILDINGS (The Patel only; hero is the real-time breakout in code)
add('buildings', '02_building_full_exterior', sources=[f'{T}/renders/patel-hero-realistic-v2.webp'], cls='wide', alt='The Patel — full tower exterior at golden hour', project=PATEL)
add('buildings', '03_building_exploded_floors', type='edit', sources=[f'{T}/renders/patel-architecture-single.webp'], size='1024x1536', cls='card', lock=True, prompt='The same tower drawn as an exploded axonometric: the floor plates separated vertically with equal gaps, the facade geometry, fins and crown unchanged, white architectural model with subtle shadows, plain pale background, no text.', alt='The Patel — exploded levels study', project=PATEL + ' (study)')
add('buildings', '04_building_unit_selection', sources=[f'{T}/renders/patel-hero-single.webp'], cls='wide', alt='The Patel — the tower with one residence level in focus', project=PATEL)
add('buildings', '05_building_residence_plan', sources=[f'{T}/residence-1802/floorplan.webp'], cls='card', alt='The Patel — Residence 1802 floor plan', project=PATEL)
add('buildings', '06_building_lobby', type='text', size='1536x1024', cls='card', prompt='A double-height residential tower lobby in Miami: travertine floor, a fluted oak feature wall, a brass reception desk, full-height glass with palms and warm sunset light outside, a single sculptural pendant, restrained luxury, no text, no people.', alt='Residential lobby — studio concept for the PATEL presentation', project=CONCEPT)
add('buildings', '07_building_amenity', type='text', size='1536x1024', cls='card', prompt='A resident lounge beside an indoor pool deck with an ocean view through full-height glass: travertine and oak, bronze details, low lounge seating, warm evening light, Miami skyline faint outside, no text, no people.', alt='Resident amenity — studio concept for the PATEL presentation', project=CONCEPT)
add('buildings', '08_building_rooftop', sources=[f'{T}/renders/patel-rooftop-single-v2.webp'], cls='card', alt='The Patel — rooftop pool and landscape', project=PATEL)
add('buildings', '09_building_residence_interior', sources=[f'{T}/residence-1802/living.webp'], cls='wide', alt='The Patel — Residence 1802 living room with the Miami view', project=PATEL)
add('buildings', '10_building_cinematic_frame', type='import', sources=[f'{PATEL_EXT}/patel-hero-poster-v2.webp'], cls='wide', alt='The Patel — launch-film frame', project=PATEL)
add('buildings', '11_building_website_mockup', sources=[f'{T}/brand/patel-breakout-hero.webp'], cls='card', alt='The Patel — interactive development website presentation', project=PATEL)

# ───────────────────────────── NAVIGATION previews (16:10 crops, no generation)
for key, src, focus, alt in [('overview', f'{T}/brand/patel-breakout-hero.webp', 0.6, 'Interior Design overview'), ('kitchens', f'{V}/10_kitchen_island_detail.webp', 0.5, 'Kitchens'), ('bathrooms', f'{V}/18_primary_bath_detail.webp', 0.5, 'Bathrooms'), ('furniture-decor', f'{C}/pairs/dining-editorial.webp', 0.5, 'Furniture & Decor'), ('apartments', f'{C}/pairs/terrace-editorial-v2.webp', 0.5, 'Apartments'), ('homes', f'{V}/28_pool_water_level.webp', 0.5, 'Homes'), ('buildings', f'{T}/renders/patel-rooftop-single-v2.webp', 0.5, 'Buildings & Developments')]:
    add('navigation', key, section='', sources=[src], cls='thumb', focus=focus, alt=f'{alt} — preview', project='navigation preview')

json.dump(E, open('scripts/interior-pages-media.json', 'w', encoding='utf-8'), indent=1)
gen = [e for e in E if e['type'] in ('edit', 'text')]
print(f'{len(E)} entries: {sum(e["type"]=="existing" for e in E)} existing, {sum(e["type"]=="import" for e in E)} import, {sum(e["type"]=="edit" for e in E)} edit, {sum(e["type"]=="text" for e in E)} text')
