import React from 'react';
import SpacePage from './SpacePage.jsx';
import { PATEL, MODELS } from '@/data/interiorMedia';

const cfg = {
  path: '/interior-design/buildings',
  page: 'buildings',
  hero: {
    variant: 'breakout',
    copy: {
      eyebrow: 'AYESMAJ STUDIOS / INTERIOR DESIGN / BUILDINGS & DEVELOPMENTS',
      headline: ['From building model', 'to a world'],
      headlineGradient: 'buyers can enter.',
      body: 'The real PATEL tower, as a real-time model: exploded levels, unit selection, residence plans, lobby and amenities, the rooftop and the launch film.',
      primary: { label: 'Start a development project', to: '/Contact' },
      secondary: { label: 'The PATEL case study', to: '/interior-design/case-studies/the-patel' },
      methods: 'MODEL · LEVELS · UNITS · AMENITIES · FILM',
      credit: 'FEATURED DEVELOPMENT / PATEL',
    },
  },
  chapters: [
    { kind: 'split', bright: 'lilac', eyebrow: 'BUILDING SCALE', title: ['The whole tower,', 'then one level.'], gradient: [1], lede: 'From the full exterior to a single selected residence level — buyers understand where a unit sits before they understand the unit.', media: ['02_building_full_exterior', '04_building_unit_selection', '05_building_residence_plan'], items: [['EXTERIOR', 'Massing, facade, crown'], ['LEVELS', 'Every floor, separable'], ['UNITS', 'One residence, highlighted'], ['PLANS', 'Residence floor plans']] },
    { kind: 'model', bgc: '04', model: MODELS.featured, flip: true, eyebrow: 'THE MODEL', title: ['Levels,', 'in the round.'], gradient: [0], lede: 'The actual PATEL tower model — drag it, read the podium, the balconies and the rooftop pool.' },
    { kind: 'full', media: '09_building_residence_interior', eyebrow: 'INSIDE A RESIDENCE', title: ['Miami,', 'from the living room.'], gradient: [] },
    { kind: 'gallery', columns: 3, eyebrow: 'LOBBY, AMENITIES, ROOFTOP', title: ['Everything', 'a buyer asks about.'], gradient: [0], lede: 'The arrival, the shared spaces and the rooftop — visualized before the sales gallery opens.', media: ['06_building_lobby', '07_building_amenity', '08_building_rooftop', '03_building_exploded_floors', '11_building_website_mockup', '05_building_residence_plan'] },
    { kind: 'film', bgc: '01', eyebrow: 'THE LAUNCH FILM', title: ['The tower,', 'as cinema.'], gradient: [1], lede: 'The PATEL development film — the hero sequence the sales presentation opens with.', poster: '10_building_cinematic_frame', video: { src: PATEL.film.desktop, poster: PATEL.film.poster, alt: 'The PATEL cinematic development film', caption: 'The PATEL — development film', tag: 'CLIENT PROJECT' } },
  ],
  next: { to: '/interior-design', label: 'Interior Design overview', line: 'From scan and plan to a world the client can enter.', media: '08_building_rooftop' },
  cta: { eyebrow: 'BUILDINGS & DEVELOPMENTS', headline: 'From building model to a world buyers can enter.', copy: 'Send the building model or the architect’s drawings. We return the interactive tower, the levels and units, the amenities and the film your sales team opens with.', primary: { label: 'Start a development project', to: '/Contact' }, secondary: { label: 'All interior design', to: '/interior-design' } },
};

export default function InteriorBuildings() { return <SpacePage cfg={cfg} />; }
