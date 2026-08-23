import React from 'react';
import SpacePage from './SpacePage.jsx';

const cfg = {
  path: '/interior-design/bathrooms',
  page: 'bathrooms',
  hero: {
    variant: 'dark',
    bgAsset: 'cinematic-light',
    glow: 'gold',
    eyebrow: 'AYESMAJ STUDIOS / INTERIOR DESIGN / BATHROOMS',
    lines: ['Stone.', 'Water.', 'Light.'],
    gradient: [2],
    lede: 'Limestone, travertine and warm oak; bronze fixtures and low-iron glass; light that behaves like real light. Primary, compact and powder rooms resolved before the first tile is cut.',
    primary: { label: 'Start a bathroom project', to: '/Contact' },
    secondary: { label: 'See the methods', to: '/interior-design' },
    strip: 'LAYOUT · STONE · FIXTURES · LIGHT',
    media: ['01_bathroom_hero'],
    layers: ['02_bathroom_layout', '09_bathroom_detail', '06_bathroom_materials'],
  },
  chapters: [
    { kind: 'split', bright: 'lilac', eyebrow: 'MATERIALS', title: ['Limestone,', 'travertine,', 'oak and bronze.'], gradient: [2], lede: 'A bathroom is mostly surface. We choose the stone, the timber and the metal together, in the room, under the light they will live in.', media: ['06_bathroom_materials', '09_bathroom_detail'], items: [['LIMESTONE · TRAVERTINE', 'Floors, walls, vanity tops'], ['OAK', 'Vanity and storage fronts'], ['BRONZE', 'Taps, showers, hardware'], ['LOW-IRON GLASS', 'Screens without a green cast']] },
    { kind: 'full', media: '03_primary_bathroom', eyebrow: 'THE PRIMARY BATHROOM', title: ['Spa-like calm,', 'at home.'], gradient: [] },
    { kind: 'compare', bgc: '06', eyebrow: 'BEFORE → AFTER', title: ['Same room.', 'New bathroom.'], gradient: [1], lede: 'Walls, window and drainage positions stay where they are. The design is worked into the real shell, not a fantasy one.', before: '07_bathroom_before', after: '08_bathroom_after', beforeLabel: 'SOURCE', afterLabel: 'DESIGNED' },
    { kind: 'gallery', columns: 3, eyebrow: 'THREE SIZES', title: ['Primary, compact,', 'powder.'], gradient: [1], lede: 'The same language at three scales — a generous primary suite, a compact apartment or guest bathroom, and a powder room that earns a second look.', media: ['03_primary_bathroom', '04_compact_bathroom', '05_powder_room', '02_bathroom_layout'] },
    { kind: 'film', bgc: '01', eyebrow: 'CINEMATIC DETAIL', title: ['Water, stone,', 'and the light between.'], gradient: [1], lede: 'The still below is a cinematic frame — how the room reads when the camera moves past the vanity and into the light.', poster: '10_bathroom_cinematic_frame' },
  ],
  next: { to: '/interior-design/furniture-decor', label: 'Furniture & Decor', line: 'The space is built. Now give it a life.', media: '09_bathroom_detail' },
  cta: { eyebrow: 'BATHROOMS', headline: 'Stone, water and light — resolved before the first tile.', copy: 'Send the plan or a photo of the existing room. We return the layout, the materials in context and the finished bathroom as imagery.', primary: { label: 'Start a bathroom project', to: '/Contact' }, secondary: { label: 'All interior design', to: '/interior-design' } },
};

export default function InteriorBathrooms() { return <SpacePage cfg={cfg} />; }
