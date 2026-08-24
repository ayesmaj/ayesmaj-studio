import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { InteriorShell, Eyebrow, IdvButton, MethodSwitcher } from '@/components/interior/kit';
import BeforeAfterSlider from '@/components/ayesmaj/BeforeAfterSlider';
import ModelViewer from '@/components/interior/ModelViewer';
import { media, imgProps, smallFile } from '@/content/interior-design-generated-media';
import { MODELS } from '@/data/interiorMedia';
import { SpacesRail } from './SpacePage.jsx';
import { StickyStory, SpotFigure, Legend, FilmScrub } from './xp.jsx';
import './spaces.css';
import './xp.css';

/* Furniture & Decor as an experience (owner brief 2026-08-23): one consistent colorful
   "atelier room" (studio concept, labeled) carries the whole narrative; villa/canal stay
   in supporting, labeled roles. Rhythm: image hero → dark compare → bright plan → bright
   layouts → dark reference story → bright materials → dark decor strip → bright styles →
   dark film → footer. */

const M = (id) => media('furniture-decor', id);
const SW_FIG = '(max-width: 1023px) 100vw, 1280px';
const DECOR_MODELS = ['office-desk', 'bookcase'].map((key) => MODELS.objects.find((m) => m.key === key)).filter(Boolean);

function HeroFd() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '10%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, reduced ? 1.05 : 1.16]);
  const ty = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '-6%']);
  const hero = M('30_fd_hero');
  return (
    <section ref={ref} className="xp-hero" aria-label="Furniture and decor hero">
      {hero ? <motion.img {...imgProps(hero, '100vw')} alt={hero.alt} className="xp-hero-bg" style={{ y, scale }} fetchpriority="high" /> : null}
      <div className="xp-hero-scrim" aria-hidden="true" />
      <motion.div className="idv2-inner xp-hero-copy" style={{ y: ty }}>
        <Eyebrow>AYESMAJ STUDIOS / FURNITURE &amp; DECOR</Eyebrow>
        <h1 className="idv2-display xp-h1">The space is built.<br />Now give it<br /><span className="idv2-grad">a life.</span></h1>
        <p className="idv-lede" style={{ color: 'rgba(245,245,240,.85)', maxWidth: 560 }}>
          Furniture is more than filling a room. We shape scale, movement, comfort, color and personality so architecture begins to feel lived in.
        </p>
        <div className="xp-hero-actions">
          <IdvButton to="#process">Explore the process</IdvButton>
          <IdvButton to="/Contact" ghost>Start a project</IdvButton>
        </div>
        <div className="idv-mono-label xp-hero-credit">THE ATELIER ROOM — STUDIO CONCEPT · ONE ROOM THROUGH THE WHOLE PAGE</div>
      </motion.div>
    </section>
  );
}

function EmptyAlive() {
  const before = M('31_fd_empty'); const after = M('30_fd_hero');
  if (!before || !after) return null;
  return (
    <section className="idv2-section idv2-spatial idv2-bgc idv2-bgc-06" id="process">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(20px, 2.6vw, 32px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>EMPTY → ALIVE</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">The room didn&rsquo;t change.<br /><span className="idv2-grad">The experience did.</span></h2>
        </div>
        <div className="xp-compare idv2-reveal">
          <BeforeAfterSlider beforeImg={before.file} afterImg={after.file} beforeLabel="EMPTY SHELL" afterLabel="FULLY STYLED" accent="#D8B75A" accentRGB="216,183,90" />
        </div>
        <div className="idv-mono-label">THE ATELIER ROOM — SAME ARCHITECTURE, BOTH VIEWS VISUALIZED · STUDIO CONCEPT</div>
      </div>
    </section>
  );
}

const PLAN_SPOTS = [
  { key: 'sofa', label: 'Sofa zone', at: [68, 36] },
  { key: 'conversation', label: 'Conversation', at: [63, 52] },
  { key: 'tv', label: 'Media wall', at: [70, 17] },
  { key: 'dining', label: 'Dining relationship', at: [39, 62] },
  { key: 'path', label: 'Walking path', at: [52, 55] },
  { key: 'window', label: 'Window clearance', at: [88, 42] },
  { key: 'focal', label: 'Focal point', at: [73, 11] },
];

function PlanFd() {
  const [active, setActive] = useState(null);
  const plan = M('32_fd_plan');
  if (!plan) return null;
  return (
    <section className="idv2-section idv2-gradient-soft">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(24px, 3vw, 40px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>PLACEMENT FIRST</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Good furniture<br />starts with<br /><span className="idv2-grad">good placement.</span></h2>
        </div>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16 }}>
          <SpotFigure src={plan.file} alt={plan.alt} spots={PLAN_SPOTS} active={active} caption={['THE ATELIER ROOM — TOP-DOWN PLAN', 'STUDIO CONCEPT']} />
          <Legend items={PLAN_SPOTS} active={active} setActive={setActive} ariaLabel="Spatial relationships" />
        </div>
      </div>
    </section>
  );
}

const LAYOUTS = [
  { key: 'social', label: 'SOCIAL', id: '33_fd_layout_social', line: 'One close circle — the room hosts the conversation.' },
  { key: 'open', label: 'OPEN', id: '34_fd_layout_open', line: 'Furniture at the edges — the floor becomes the luxury.' },
  { key: 'sculptural', label: 'SCULPTURAL', id: '35_fd_layout_sculptural', line: 'Pieces as objects — the room becomes a gallery.' },
];

function LayoutsFd() {
  const items = LAYOUTS.map((l) => ({ ...l, m: M(l.id) })).filter((l) => l.m);
  const [key, setKey] = useState(items[0]?.key);
  const active = items.find((l) => l.key === key) || items[0];
  if (!active) return null;
  return (
    <section className="idv2-section idv2-bright">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(22px, 2.8vw, 38px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>ONE ROOM, THREE LAYOUTS</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Same room.<br /><span className="idv2-grad">Different life.</span></h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          <MethodSwitcher ariaLabel="Furniture layout" value={key} onChange={setKey} options={items.map((l) => ({ key: l.key, label: l.label }))} />
          <figure className="bx-dir idv2-reveal" style={{ margin: 0 }}>
            <img key={active.key} {...imgProps(active.m, SW_FIG)} alt={active.m.alt} loading="lazy" decoding="async" style={{ width: '100%', height: 'min(62vh, 700px)', objectFit: 'cover', borderRadius: 22, display: 'block' }} />
            <figcaption className="idsp-cap"><span>{active.line}</span><span>SAME ROOM, SAME PIECES · STUDIO CONCEPT</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function ReferenceFd() {
  const steps = [
    { tag: 'REFERENCE', id: '40_fd_reference', title: 'It starts with a feeling.', line: 'A travel photo, a fabric, a painting — the reference sets the emotional target.' },
    { tag: 'PALETTE', id: '41_fd_palette', title: 'The palette is extracted.', line: 'Cream, emerald, blush, mustard, walnut, brass — pulled from the reference into a working palette.' },
    { tag: 'COMPOSITION', id: '42_fd_composition', title: 'The room is composed.', line: 'Scale, circulation and balance are solved as massing before a single piece is chosen.' },
    { tag: 'THE ROOM', id: '30_fd_hero', title: 'The world is built.', line: 'The reference became a room you can walk into.' },
  ].map((s) => ({ ...s, m: M(s.id) })).filter((s) => s.m).map((s) => ({ tag: s.tag, title: s.title, line: s.line, src: s.m.file }));
  if (steps.length < 3) return null;
  return (
    <section className="idv2-section idv2-spatial idv2-bgc idv2-bgc-08">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(22px, 2.8vw, 38px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>REFERENCE → DESIGN</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Bring a reference.<br />We build<br /><span className="idv2-grad">the world around it.</span></h2>
        </div>
        <StickyStory steps={steps} ariaLabel="From reference to room" />
      </div>
    </section>
  );
}

const FD_MATERIALS = [
  { key: 'velvet', label: 'EMERALD VELVET', macro: '43_fd_mat_velvet', room: '47_fd_room_velvet' },
  { key: 'boucle', label: 'BLUSH BOUCLE', macro: '44_fd_mat_boucle', room: '48_fd_room_boucle' },
  { key: 'walnut', label: 'WALNUT · BRASS', macro: '45_fd_mat_walnut_brass', room: '49_fd_room_walnut' },
  { key: 'rug', label: 'PATTERNED RUG', macro: '46_fd_mat_rug', room: '50_fd_room_rug' },
];

function MaterialsFd() {
  const items = FD_MATERIALS.map((mt) => ({ ...mt, macroM: M(mt.macro), roomM: M(mt.room) })).filter((mt) => mt.macroM && mt.roomM);
  const [active, setActive] = useState(items[0]?.key);
  const current = items.find((mt) => mt.key === active) || items[0];
  if (!current) return null;
  return (
    <section className="idv2-section idv2-gradient-soft bx-materials">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(24px, 3vw, 40px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>MATERIAL + COLOR STORY</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Color is not the last step.<br /><span className="idv2-grad">It changes the entire room.</span></h2>
        </div>
        <div className="bx-mat-grid">
          <figure className="bx-mat-room idv2-reveal">
            {items.map((mt) => (
              <img key={mt.key} {...imgProps(mt.roomM, '(max-width: 1023px) 100vw, 62vw')} alt={active === mt.key ? mt.roomM.alt : ''} loading="lazy" decoding="async" data-active={active === mt.key} />
            ))}
            <figcaption className="idsp-cap"><span>{current.label} LEADS THE ROOM</span><span>STUDIO CONCEPT · SAME ARCHITECTURE</span></figcaption>
          </figure>
          <div className="bx-mat-list" role="group" aria-label="Materials" style={{ gridTemplateColumns: '1fr 1fr' }}>
            {items.map((mt) => (
              <button key={mt.key} type="button" className="bx-mat-tile" aria-pressed={active === mt.key}
                onMouseEnter={() => setActive(mt.key)} onFocus={() => setActive(mt.key)} onClick={() => setActive(mt.key)}>
                <img src={smallFile(mt.macroM)} alt={mt.macroM.alt} loading="lazy" decoding="async" />
                <span>{mt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const DECOR_STRIP = ['12_decor_sofa', '13_decor_armchair', '14_decor_floor_lamp', '15_decor_pendant', '16_decor_rug', '17_decor_side_table', '18_decor_ceramics', '19_decor_art', '20_decor_textiles'];

function DecorFd() {
  const items = DECOR_STRIP.map(M).filter(Boolean);
  return (
    <section className="bx-types" aria-label="Decor details">
      <div className="idv2-inner idsp-head idv2-reveal" style={{ paddingBottom: 'clamp(16px, 2vw, 30px)' }}>
        <Eyebrow>DECOR DETAILS</Eyebrow>
        <h2 className="idv2-h2 idsp-h2">The details<br />make it<br /><span className="idv2-grad">personal.</span></h2>
      </div>
      <div className="xp-strip" tabIndex={0} role="group" aria-label="Decor pieces">
        {items.map((m) => (
          <figure key={m.id}>
            <img src={smallFile(m)} alt={m.alt} loading="lazy" decoding="async" />
            <figcaption>{m.alt.split(' - ')[0].split(' — ')[0]}</figcaption>
          </figure>
        ))}
      </div>
      <div className="idv2-inner" style={{ display: 'grid', gap: 20, paddingTop: 24 }}>
        <div className="idv-mono-label" style={{ color: 'rgba(245,245,240,.55)' }}>STUDIO STUDIES · ONE PALETTE — DRAG OR SCROLL SIDEWAYS</div>
        <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>AND IN THE ROUND — TURN THE PIECES:</div>
      </div>
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {DECOR_MODELS.map((m) => (
          <div key={m.key} style={{ display: 'grid', gap: 8 }}>
            <ModelViewer model={m} auto ratio="16 / 10" />
          </div>
        ))}
      </div>
    </section>
  );
}

const FD_STYLES = [
  { key: 'artdeco', label: 'ART DECO', id: '36_fd_style_artdeco', line: 'Lacquer, brass and geometry — glamour with discipline.' },
  { key: 'organic', label: 'ORGANIC MODERN', id: '37_fd_style_organic', line: 'Curves, boucle, travertine — soft and grounded.' },
  { key: 'midcentury', label: 'MID-CENTURY', id: '38_fd_style_midcentury', line: 'Teak, tan leather, mustard — warm and precise.' },
  { key: 'colorful', label: 'COLORFUL CONTEMPORARY', id: '39_fd_style_colorful', line: 'Cobalt, coral and bold art — gallery energy, not noise.' },
];

function StylesFd() {
  const items = FD_STYLES.map((d) => ({ ...d, m: M(d.id) })).filter((d) => d.m);
  const [key, setKey] = useState(items[0]?.key);
  const active = items.find((d) => d.key === key) || items[0];
  if (!active) return null;
  return (
    <section className="idv2-section idv2-bright" id="styles">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(22px, 2.8vw, 38px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>STYLE DIRECTIONS</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">One room.<br /><span className="idv2-grad">Four personalities.</span></h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          <MethodSwitcher ariaLabel="Style direction" value={key} onChange={setKey} options={items.map((d) => ({ key: d.key, label: d.label }))} />
          <figure style={{ margin: 0 }} className="idv2-reveal">
            <img key={active.key} {...imgProps(active.m, SW_FIG)} alt={active.m.alt} loading="lazy" decoding="async" style={{ width: '100%', height: 'min(62vh, 700px)', objectFit: 'cover', borderRadius: 22, display: 'block' }} />
            <figcaption className="idsp-cap"><span>{active.line}</span><span>SAME ARCHITECTURE, SAME CAMERA · STUDIO CONCEPT</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const FILM = {
  desktop: '/interior-design/generated/furniture-decor/film/furniture-film.mp4',
  mobile: '/interior-design/generated/furniture-decor/film/furniture-film-mobile.mp4',
  poster: '/interior-design/generated/furniture-decor/film/furniture-film-poster.webp',
};

function FilmFd() {
  return (
    <FilmScrub
      film={FILM}
      credit="THE ATELIER ROOM — EMPTY TO LIVED-IN · STUDIO CONCEPT, AI-GENERATED"
      stages={[
        { at: 0, node: 'Plan it.' },
        { at: 0.34, node: 'Style it.' },
        { at: 0.68, node: <>Live <span className="idv2-grad">in it.</span></> },
      ]}
    />
  );
}

export default function InteriorFurnitureDecor() {
  return (
    <InteriorShell path="/interior-design/furniture-decor">
      <SpacesRail path="/interior-design/furniture-decor" />
      <HeroFd />
      <EmptyAlive />
      <PlanFd />
      <LayoutsFd />
      <ReferenceFd />
      <MaterialsFd />
      <DecorFd />
      <StylesFd />
      <FilmFd />
    </InteriorShell>
  );
}
