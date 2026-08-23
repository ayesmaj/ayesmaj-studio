import React from 'react';
import SpacePage from './SpacePage.jsx';

const cfg = {
  path: '/interior-design/furniture-decor',
  page: 'furniture-decor',
  hero: {
    variant: 'dark',
    bgAsset: 'silk-wave',
    glow: 'purple',
    eyebrow: 'AYESMAJ STUDIOS / INTERIOR DESIGN / FURNITURE & DECOR',
    lines: ['The space is built.', 'Now give it', 'a life.'],
    gradient: [2],
    lede: 'The architectural shell, the furniture plan, the reference direction and the styled finished room — one consistent language from the first sofa to the last ceramic.',
    primary: { label: 'Start a furnishing project', to: '/Contact' },
    secondary: { label: 'See the methods', to: '/interior-design' },
    strip: 'SHELL · PLAN · REFERENCE · STYLED ROOM',
    media: ['01_furniture_decor_hero'],
    layers: ['02_empty_room', '04_furniture_plan', '10_material_palette'],
  },
  chapters: [
    { kind: 'split', bright: 'lilac', flip: true, eyebrow: 'THE FURNITURE PLAN', title: ['Placement', 'before pieces.'], gradient: [1], lede: 'Circulation, sightlines and scale are decided on the plan first — then every piece is chosen to fit the room it will live in.', media: ['04_furniture_plan', '05_reference_direction'], items: [['CIRCULATION', 'Clear routes through every room'], ['SCALE', 'Pieces sized to the shell'], ['LAYERS', 'Rug, seating, table, light'], ['IDENTITY', 'One language across rooms']] },
    { kind: 'full', media: '03_furnished_room', eyebrow: 'THE STYLED ROOM', title: ['Textiles, art,', 'books and light.'], gradient: [] },
    { kind: 'compare', bgc: '08', eyebrow: 'SHELL → ROOM', title: ['Empty shell.', 'Finished room.'], gradient: [1], lede: 'The exact same room — walls, windows and floor untouched — before and after furniture and decor design.', before: '02_empty_room', after: '03_furnished_room', beforeLabel: 'SHELL', afterLabel: 'FURNISHED' },
    { kind: 'gallery', columns: 3, eyebrow: 'COLLECTIONS', title: ['Living, bedroom,', 'dining.'], gradient: [1], lede: 'Three rooms, one palette: olive and neutral fabrics, walnut and oak, stone, bronze — and the objects that make it lived in.', media: ['06_living_collection', '07_bedroom_collection', '08_dining_collection', '09_decor_detail', '10_material_palette', '05_reference_direction'] },
    { kind: 'film', bgc: '01', eyebrow: 'THE STYLED ROOM, IN MOTION', title: ['Seen as film.'], gradient: [0], lede: 'A styled room reads differently as the camera moves — the frame below is a still from that language.', poster: '01_furniture_decor_hero' },
  ],
  next: { to: '/interior-design/apartments', label: 'Apartments', line: 'See the entire apartment. Then step inside.', media: '09_decor_detail' },
  cta: { eyebrow: 'FURNITURE & DECOR', headline: 'The space is built. Now give it a life.', copy: 'Send the plan or photos of the finished shell. We return the furniture plan, the reference direction and the styled rooms as imagery.', primary: { label: 'Start a furnishing project', to: '/Contact' }, secondary: { label: 'All interior design', to: '/interior-design' } },
};

export default function InteriorFurnitureDecor() { return <SpacePage cfg={cfg} />; }
