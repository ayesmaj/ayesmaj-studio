import React from 'react';
import SpacePage from './SpacePage.jsx';
import { VILLA, MODELS } from '@/data/interiorMedia';

const cfg = {
  path: '/interior-design/homes',
  page: 'homes',
  hero: {
    variant: 'full',
    eyebrow: 'AYESMAJ STUDIOS / INTERIOR DESIGN / HOMES',
    lines: ['Understand', 'the whole home.', 'Experience', 'every part of it.'],
    gradient: [3],
    lede: 'One consistent modern house — ground and upper 3D plans, a cutaway, every room, the pool, the garage, the arrival — and the continuous house film.',
    primary: { label: 'Start a house project', to: '/Contact' },
    secondary: { label: 'See the house film', to: '/interior-design/ai-video-house' },
    strip: 'PLANS · CUTAWAY · ROOMS · POOL · FILM',
    media: ['01_home_hero'],
    layers: ['02_home_ground_floor', '03_home_upper_floor', '05_home_living', '12_home_cinematic_frame'],
  },
  chapters: [
    { kind: 'switcher', ariaLabel: 'Choose a floor', eyebrow: 'THE 3D FLOOR PLANS', title: ['Both floors,', 'as one system.'], gradient: [1], lede: 'Zones, the stair, the route from garage to kitchen to pool — readable at a glance on each level.', options: [{ key: 'ground', label: 'Ground floor', media: '02_home_ground_floor', tag: 'PUBLIC LEVEL', line: 'Living, dining, kitchen, office and the pool terrace.' }, { key: 'upper', label: 'Upper floor', media: '03_home_upper_floor', tag: 'PRIVATE LEVEL', line: 'Primary suite, bedrooms, the family lounge and the balcony.' }] },
    { kind: 'model', bgc: '04', model: MODELS.project[1], eyebrow: 'THE WHOLE HOUSE', title: ['Turn the house', 'in your hands.'], gradient: [1], lede: 'The house as an AI 3D scan — massing, terraces and the pool deck — loaded as you arrive.' },
    { kind: 'full', media: '05_home_living', eyebrow: 'INSIDE', title: ['The living room', 'opens to the pool.'], gradient: [] },
    { kind: 'gallery', bright: 'lilac', columns: 3, eyebrow: 'OUTDOOR LIVING & ARRIVAL', title: ['Pool, garage,', 'landscape.'], gradient: [0], lede: 'The same house outside — the pool deck, the arrival, the garage and the landscape at golden hour and blue hour.', media: ['09_home_pool', '11_home_landscape', '10_home_garage', '13_home_blue_hour', '06_home_kitchen', '07_home_primary_bedroom'] },
    { kind: 'film', bgc: '01', eyebrow: 'THE HOUSE FILM', title: ['One continuous take,', 'plan to pool.'], gradient: [1], lede: 'Thirty-five seconds, no cuts: the sketched plan becomes the plan, the plan becomes the house, and the camera walks living room, kitchen, bath and bedroom out to the pool.', poster: '12_home_cinematic_frame', video: { src: VILLA.film.desktop, poster: VILLA.film.poster, alt: 'Poolside Villa house film — one continuous take from the sketched plan through the rooms to the pool', caption: 'Poolside Villa — house film, 35 s, AI-generated from the master frames', tag: 'CLIENT PROJECT' } },
  ],
  next: { to: '/interior-design/buildings', label: 'Buildings & Developments', line: 'From building model to a world buyers can enter.', media: '13_home_blue_hour' },
  cta: { eyebrow: 'HOMES', headline: 'Understand the whole home. Experience every part of it.', copy: 'Send the plans or a scan of the house. We return both floors in 3D, the rooms, the outdoor living and — when you want it — the film.', primary: { label: 'Start a house project', to: '/Contact' }, secondary: { label: 'All interior design', to: '/interior-design' } },
};

export default function InteriorHomes() { return <SpacePage cfg={cfg} />; }
