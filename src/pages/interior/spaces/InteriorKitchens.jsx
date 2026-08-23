import React from 'react';
import SpacePage from './SpacePage.jsx';

const cfg = {
  path: '/interior-design/kitchens',
  page: 'kitchens',
  hero: {
    variant: 'bright',
    eyebrow: 'AYESMAJ STUDIOS / INTERIOR DESIGN / KITCHENS',
    lines: ['Design the room', 'everything', 'revolves around.'],
    gradient: [1, 2],
    lede: 'Layouts compared, cabinetry resolved, materials chosen in context — and the finished kitchen shown as photoreal imagery and film frames before a single cabinet is ordered.',
    primary: { label: 'Start a kitchen project', to: '/Contact' },
    secondary: { label: 'See the methods', to: '/interior-design' },
    strip: 'LAYOUT · CABINETRY · MATERIALS · LIGHT',
    media: ['01_kitchen_hero'],
    layers: ['07_kitchen_3d_floor_plan', '03_kitchen_cabinetry', '04_kitchen_materials'],
  },
  chapters: [
    { kind: 'split', dark: true, bgc: '06', eyebrow: 'CABINETRY & MATERIALS', title: ['Every drawer,', 'every surface,', 'decided.'], gradient: [2], lede: 'Base cabinets, tall storage, the appliance wall, the pantry and integrated lighting — resolved as one system, then shown in the materials the client will actually touch.', media: ['03_kitchen_cabinetry', '04_kitchen_materials', '09_kitchen_detail'], items: [['WALNUT · OAK', 'Cabinet fronts and open shelving'], ['STONE', 'Island, splashback, worktops'], ['BRONZE · BLACK METAL', 'Handles, taps, frames'], ['PLASTER · GLASS', 'Walls, doors, light']] },
    { kind: 'full', media: '08_kitchen_cinematic_frame', eyebrow: 'THE FINISHED KITCHEN', title: ['Daylight across', 'stone and walnut.'], gradient: [] },
    { kind: 'gallery', bright: 'lilac', columns: 2, featureFirst: true, eyebrow: 'LAYOUTS', title: ['Six ways', 'to plan a kitchen.'], gradient: [1], lede: 'One-wall, galley, L-shaped, U-shaped, island and double island — compared on the same footprint so the decision is about how you cook, not about a drawing.', media: ['02_kitchen_layouts', '07_kitchen_3d_floor_plan'] },
    { kind: 'compare', bgc: '08', eyebrow: 'BEFORE → AFTER', title: ['Same walls.', 'New kitchen.'], gradient: [1], lede: 'The architecture stays locked — windows, openings, the run of the room — while the kitchen is designed into it.', before: '05_kitchen_before', after: '06_kitchen_after', beforeLabel: 'SOURCE', afterLabel: 'DESIGNED' },
    { kind: 'film', bgc: '01', eyebrow: 'CINEMATIC', title: ['Seen as film,', 'before it is built.'], gradient: [0], lede: 'A kitchen reads differently in motion — the light, the circulation, the way the island anchors the room. The frame below is a still from that language.', poster: '08_kitchen_cinematic_frame' },
  ],
  next: { to: '/interior-design/bathrooms', label: 'Bathrooms', line: 'Stone. Water. Light.', media: '09_kitchen_detail' },
  cta: { eyebrow: 'KITCHENS', headline: 'Design the room everything revolves around.', copy: 'Send a plan, a scan or a photo of the existing kitchen. We come back with layouts compared, materials in context and the finished room shown as imagery.', primary: { label: 'Start a kitchen project', to: '/Contact' }, secondary: { label: 'All interior design', to: '/interior-design' } },
};

export default function InteriorKitchens() { return <SpacePage cfg={cfg} />; }
