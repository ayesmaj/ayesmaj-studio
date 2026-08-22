/**
 * Interior Design hero — PATEL tower breakout.
 * Single source of truth for assets, copy, camera, lighting and limits.
 * (Owner brief 2026-08-21; source audit in docs/patel-hero-source-audit.md.)
 */
const BASE = '/interior-design/hero';

export const HERO_ASSETS = {
  tower: {
    high: `${BASE}/models/patel-tower-high.glb`,     // 2.4 MB, 518k verts, Draco — the deployed PATEL tower as-is
    medium: `${BASE}/models/patel-tower-medium.glb`,
    low: `${BASE}/models/patel-tower-low.glb`,
  },
  towerBytes: { high: 2430632, medium: 1142784, low: 909312 }, // progress fallback when Content-Encoding hides e.total
  bird: `${BASE}/models/patel-bird.glb`,             // the PATEL gull: 4k verts, one 17 s flight clip
  environment: `${BASE}/environment/miami-sunset-pano.webp`, // LDR IBL (PATEL medium tier); .exr tooling unavailable here
  background: {
    avif: `${BASE}/backgrounds/miami-bay-hero.avif`,
    webp: `${BASE}/backgrounds/miami-bay-hero.webp`,
    mobile: `${BASE}/backgrounds/miami-bay-hero-mobile.webp`,
  },
  poster: '/interior-design/projects/the-patel/brand/patel-breakout-hero.webp', // no-WebGL fallback (generated earlier from the real render)
  draco: '/draco/',
};

export const HERO_COPY = {
  eyebrow: 'AYESMAJ STUDIOS / INTERIOR DESIGN VISUALIZATION',
  headline: ['From model', 'to a world', 'your client'],
  headlineGradient: 'can enter.',
  body: 'We transform scans, plans and architectural models into immersive visual experiences clients can understand, explore and remember.',
  primary: { label: 'Explore interior design', to: '#stages' },
  secondary: { label: 'View building visualization', to: '/interior-design/3d-building-visualization' },
  methods: 'SCAN · PLAN · VISUALIZE · EXPERIENCE',
  hint: 'MOVE THE CURSOR · DRAG THE TOWER',
  hintTouch: 'DRAG THE TOWER',
  credit: 'FEATURED SPATIAL STUDY / PATEL',
  screen: { eyebrow: 'Featured spatial study', title: 'PATEL', sub: 'Miami residences', kind: 'Building visualization', cta: 'Explore project', to: '/interior-design/case-studies/the-patel' },
  loader: ['AYESMAJ STUDIOS', 'PREPARING THE SPATIAL EXPERIENCE'],
  canvasLabel: 'Interactive 3D visualization of a Miami residential tower emerging from a digital presentation screen.',
};

export const METHOD_STRIP = [
  { key: 'scan', title: 'AI Scan', line: 'Capture what exists', to: '/interior-design/ai-scan-apartment', icon: 'scan' },
  { key: 'plan', title: '3D Floor Plan', line: 'Understand the space', to: '/interior-design/3d-floor-plan-apartment', icon: 'box' },
  { key: 'building', title: 'Building Visualization', line: 'See the complete structure', to: '/interior-design/3d-building-visualization', icon: 'building' },
  { key: 'film', title: 'Cinematic Film', line: 'Experience the project', to: '/interior-design/ai-video-apartment', icon: 'film' },
];

/** PATEL dusk grade (config/patel-environment-config.ts) — kept so the model reads as it does on the PATEL site. */
export const DUSK = {
  sun: '#f8cd96', skyFill: '#b3c0e2', ground: '#8a6f5e', rim: '#f0d3a4', fill: '#c3cfec', ambient: '#d8dcef',
};

export const SCENE = {
  fov: 33,
  near: 0.1,
  far: 220,
  toneMappingExposure: 1.12,
  environmentIntensity: 0.9,
  environmentRotation: 2.9,
  towerRootY: 0.15,
  /** fraction of the canvas height the tower should fill, desktop / mobile */
  fill: { desktop: 0.78, mobile: 0.7 },
  azimuthDeg: { desktop: 17, mobile: 9 },
  elevation: -1.4,
  /** pointer parallax limits (brief §13) */
  parallax: { yawDeg: 4, pitchDeg: 1.5 },
  /** drag limits: ±8° → 16° total, springs back */
  drag: { maxDeg: 8, degPerPx: 0.06, springLambda: 4 },
  /** pixel-ratio caps by tier */
  dpr: { high: 1.5, medium: 1.25, low: 1 },
  birds: { high: 16, medium: 11, low: 10, mobile: 5, reduced: 4 },
  /** pointer influence on the flock (brief §12: 35–55 %) */
  birdInfluence: 0.45,
};

/** Device tiering. `null` = no real-time 3D, show the poster. */
export function pickTier() {
  if (typeof window === 'undefined') return 'medium';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mem = navigator.deviceMemory;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 768;
  let gl = false;
  try { const c = document.createElement('canvas'); gl = !!(c.getContext('webgl2') || c.getContext('webgl')); } catch { gl = false; }
  if (!gl) return null;
  if (typeof mem === 'number' && mem <= 2) return null;
  if (reduced) return 'reduced';
  if (narrow || coarse || (typeof mem === 'number' && mem <= 4)) return 'low';
  if (window.innerWidth < 1440) return 'medium';
  // Firefox/Safari never report deviceMemory: only call it high with plenty of cores.
  if (typeof mem !== 'number') return (navigator.hardwareConcurrency || 4) >= 8 ? 'high' : 'medium';
  return 'high';
}
