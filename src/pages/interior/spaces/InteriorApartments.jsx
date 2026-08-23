import React from 'react';
import SpacePage from './SpacePage.jsx';
import { PATEL } from '@/data/interiorMedia';

const cfg = {
  path: '/interior-design/apartments',
  page: 'apartments',
  hero: {
    variant: 'dark',
    bgAsset: 'architectural-grid',
    glow: 'purple',
    eyebrow: 'AYESMAJ STUDIOS / INTERIOR DESIGN / APARTMENTS',
    lines: ['See the', 'entire apartment.', 'Then step inside.'],
    gradient: [2],
    lede: 'One apartment, one sequence: the existing-condition scan becomes a clean plan, a furnished 3D floor plan, and photoreal rooms you can walk through — without mixing projects.',
    primary: { label: 'Start an apartment project', to: '/Contact' },
    secondary: { label: 'See the methods', to: '/interior-design' },
    strip: 'SCAN · PLAN · 3D PLAN · INTERIOR · FILM',
    media: ['01_apartment_hero'],
    layers: ['02_apartment_source', '03_apartment_clean_plan', '10_apartment_film_frame'],
  },
  chapters: [
    { kind: 'split', bright: 'lilac', eyebrow: 'THE 3D FLOOR PLAN', title: ['The whole flat', 'in one view.'], gradient: [1], lede: 'Furniture at true scale, every room in relation to the next, the balcony and the water beyond — read in seconds by people who cannot read drawings.', media: ['04_apartment_3d_plan', '03_apartment_clean_plan', '02_apartment_source'] },
    { kind: 'full', media: '05_apartment_living', eyebrow: 'THE LIVING ROOM', title: ['Then step inside.'], gradient: [0] },
    { kind: 'compare', bgc: '02', eyebrow: 'SCAN → VISUALIZATION', title: ['Same apartment.', 'Design-ready.'], gradient: [1], lede: 'The source frame and the visualization generated from it, with walls, openings and furniture positions locked.', before: '11_apartment_before', after: '11_apartment_after', beforeLabel: 'SOURCE', afterLabel: 'VISUALIZED' },
    { kind: 'gallery', columns: 4, eyebrow: 'ROOM BY ROOM', title: ['Kitchen, bedroom,', 'bathroom, balcony.'], gradient: [1], lede: 'The same apartment, every room — one palette, one light, one project.', media: ['06_apartment_kitchen', '07_apartment_bedroom', '08_apartment_bathroom', '09_apartment_balcony'] },
    { kind: 'film', bgc: '01', eyebrow: 'THE APARTMENT WALKTHROUGH', title: ['From plan', 'to motion.'], gradient: [1], lede: 'A still from the apartment walkthrough language — the camera moving from the plan into the rooms.', poster: '10_apartment_film_frame' },
  ],
  next: { to: '/interior-design/homes', label: 'Homes', line: 'Understand the whole home. Experience every part of it.', media: '09_apartment_balcony' },
  cta: { eyebrow: 'APARTMENTS', headline: 'See the entire apartment. Then step inside.', copy: 'Send photos, a scan or the plan of the apartment. We return the clean plan, the furnished 3D plan and the rooms as imagery — one consistent project.', primary: { label: 'Start an apartment project', to: '/Contact' }, secondary: { label: 'All interior design', to: '/interior-design' } },
};

export default function InteriorApartments() { return <SpacePage cfg={cfg} />; }
