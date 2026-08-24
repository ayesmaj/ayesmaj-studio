import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { InteriorShell, Eyebrow, IdvButton, MethodSwitcher, PinSeq } from '@/components/interior/kit';
import DarkSectionBackground from '@/components/interior/DarkSectionBackground';
import BeforeAfterSlider from '@/components/ayesmaj/BeforeAfterSlider';
import { media } from '@/content/interior-design-generated-media';
import { SpacesRail } from './SpacePage.jsx';
import './spaces.css';
import './bathrooms-x.css';

/* Bathrooms as an experience (owner brief 2026-08-23): bright Art Deco concept world
   (studio concept, labeled) against the AYESMAJ dark sections; real villa bathrooms
   carry the types gallery. Rhythm: bright hero → dark transform → dark decisions →
   bright material room → dark types → dark massive compare → bright directions → footer. */

const M = (id) => media('bathrooms', id);

function HeroBath() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '12%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, reduced ? 1.06 : 1.18]);
  const hero = M('20_bh_hero');
  const SAMPLES = [
    ['30_bh_mat_travertine', 'TRAVERTINE'],
    ['31_bh_mat_emerald', 'EMERALD'],
    ['32_bh_mat_brass', 'BRASS'],
    ['35_bh_mat_velvet', 'BLUSH'],
    ['34_bh_mat_fluted_glass', 'GLASS'],
  ].map(([id, label]) => ({ m: M(id), label })).filter((s) => s.m);
  return (
    <section ref={ref} className="bx-hero" aria-label="Bathroom visualization hero">
      {hero ? <motion.img src={hero.file} alt={hero.alt} className="bx-hero-bg" style={{ y, scale }} fetchpriority="high" /> : null}
      <div className="bx-hero-scrim" aria-hidden="true" />
      <div className="idv2-inner bx-hero-copy">
        <Eyebrow>AYESMAJ STUDIOS / BATHROOM VISUALIZATION</Eyebrow>
        <h1 className="idv2-display bx-h1">
          Stone.<br />Water.<br /><span className="idv2-grad">Light.</span>
        </h1>
        <div className="bx-hero-actions">
          <IdvButton to="/Contact">Start a bathroom project</IdvButton>
          <IdvButton to="#directions" ghost>See the design directions</IdvButton>
        </div>
        <div className="idv-mono-label bx-hero-credit">ART DECO BATHROOM — STUDIO CONCEPT · SAME ROOM THROUGH THE WHOLE PAGE</div>
      </div>
      <div className="bx-samples" aria-label="Material samples">
        {SAMPLES.map((s, i) => (
          <figure key={s.label} className="bx-sample" style={{ '--i': i }}>
            <img src={s.m.file} alt={s.m.alt} loading="lazy" decoding="async" />
            <figcaption>{s.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function TransformBath() {
  const stages = [
    { label: 'SKETCH', id: '22_bh_sketch', head: 'DRAW IT.', line: 'The idea starts as a pencil plan in a notebook.' },
    { label: 'FLOOR PLAN', id: '21_bh_plan', head: 'UNDERSTAND IT.', line: 'The sketch becomes a precise architectural plan.' },
    { label: '3D', id: '23_bh_clay', head: 'DESIGN IT.', line: 'The plan stands up as a white working model.' },
    { label: 'MATERIAL', id: '24_bh_material3d', head: 'DESIGN IT.', line: 'Stone, lacquer, brass and velvet move in.' },
    { label: 'FINAL', id: '20_bh_hero', head: 'FEEL IT.', line: 'The same room — now you can feel the light.' },
  ].map((s) => ({ ...s, m: M(s.id) })).filter((s) => s.m).map((s) => ({ label: s.label, src: s.m.file, alt: s.m.alt, head: s.head, line: s.line }));
  if (!stages.length) return null;
  return (
    <section className="bx-transform" aria-label="From sketch to space">
      <PinSeq stages={stages} height="380vh" ariaLabel="The same bathroom from sketch to final" />
    </section>
  );
}

const HOTSPOTS = [
  { key: 'vanity', label: 'Vanity', plan: [27, 52], room: [27, 60] },
  { key: 'shower', label: 'Shower', plan: [55, 22], room: [48, 35] },
  { key: 'tub', label: 'Tub', plan: [72, 55], room: [72, 62] },
  { key: 'storage', label: 'Storage', plan: [33, 66], room: [24, 76] },
  { key: 'lighting', label: 'Lighting', plan: [15, 46], room: [30, 25] },
  { key: 'material', label: 'Material', plan: [60, 72], room: [66, 85] },
  { key: 'circulation', label: 'Circulation', plan: [45, 80], room: [50, 88] },
];

function DecisionsBath() {
  const [active, setActive] = useState(null);
  const plan = M('26_bh_plan3d'); const room = M('27_bh_doorway');
  if (!plan || !room) return null;
  const Spot = ({ h, at }) => (
    <span
      className="bx-spot"
      data-active={active === h.key}
      style={{ left: `${at[0]}%`, top: `${at[1]}%` }}
      aria-hidden="true"
    />
  );
  return (
    <section className="idv2-section idv2-spatial idv2-bgc idv2-bgc-02 bx-decisions">
      <DarkSectionBackground asset="architectural-grid" position="center" overlay={0.72} parallax="none" />
      <div className="idv2-inner" style={{ position: 'relative', display: 'grid', gap: 'clamp(26px, 3.4vw, 44px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>THE PLAN IS THE PRODUCT</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Every bathroom starts<br /><span className="idv2-grad">with decisions.</span></h2>
        </div>
        <div className="bx-dec-grid idv2-reveal">
          <figure className="bx-dec-fig">
            <img src={plan.file} alt={plan.alt} loading="lazy" decoding="async" />
            {HOTSPOTS.map((h) => <Spot key={h.key} h={h} at={h.plan} />)}
            <figcaption className="idsp-cap"><span>THE PLAN</span><span>STUDIO CONCEPT</span></figcaption>
          </figure>
          <figure className="bx-dec-fig">
            <img src={room.file} alt={room.alt} loading="lazy" decoding="async" />
            {HOTSPOTS.map((h) => <Spot key={h.key} h={h} at={h.room} />)}
            <figcaption className="idsp-cap"><span>THE ROOM</span><span>SAME DECISIONS, BUILT</span></figcaption>
          </figure>
        </div>
        <div className="bx-dec-legend" role="group" aria-label="Bathroom decisions">
          {HOTSPOTS.map((h) => (
            <button
              key={h.key}
              type="button"
              className="idv2-chip"
              aria-pressed={active === h.key}
              onMouseEnter={() => setActive(h.key)}
              onFocus={() => setActive(h.key)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === h.key ? null : h.key)}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const MATERIALS = [
  { key: 'travertine', label: 'TRAVERTINE', macro: '30_bh_mat_travertine', room: '50_bh_room_travertine' },
  { key: 'emerald', label: 'EMERALD LACQUER', macro: '31_bh_mat_emerald', room: '51_bh_room_emerald' },
  { key: 'brass', label: 'BRUSHED BRASS', macro: '32_bh_mat_brass', room: '52_bh_room_brass' },
  { key: 'calacatta', label: 'CALACATTA', macro: '33_bh_mat_calacatta', room: '53_bh_room_calacatta' },
  { key: 'fluted', label: 'FLUTED GLASS', macro: '34_bh_mat_fluted_glass', room: '54_bh_room_fluted' },
  { key: 'velvet', label: 'BLUSH VELVET', macro: '35_bh_mat_velvet', room: '55_bh_room_velvet' },
];

function MaterialRoom() {
  const items = MATERIALS.map((mt) => ({ ...mt, macroM: M(mt.macro), roomM: M(mt.room) })).filter((mt) => mt.macroM && mt.roomM);
  const [active, setActive] = useState(items[0]?.key);
  const current = items.find((mt) => mt.key === active) || items[0];
  if (!current) return null;
  return (
    <section className="idv2-section idv2-gradient-soft bx-materials">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(26px, 3.4vw, 44px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>THE MATERIAL ROOM</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Touch a material —<br /><span className="idv2-grad">the room follows.</span></h2>
        </div>
        <div className="bx-mat-grid">
          <figure className="bx-mat-room idv2-reveal">
            {items.map((mt) => (
              <img key={mt.key} src={mt.roomM.file} alt={active === mt.key ? mt.roomM.alt : ''} loading="lazy" decoding="async" data-active={active === mt.key} />
            ))}
            <figcaption className="idsp-cap"><span>{current.label} LEADS THE ROOM</span><span>STUDIO CONCEPT · SAME ARCHITECTURE</span></figcaption>
          </figure>
          <div className="bx-mat-list" role="group" aria-label="Materials">
            {items.map((mt) => (
              <button
                key={mt.key}
                type="button"
                className="bx-mat-tile"
                aria-pressed={active === mt.key}
                onMouseEnter={() => setActive(mt.key)}
                onFocus={() => setActive(mt.key)}
                onClick={() => setActive(mt.key)}
              >
                <img src={mt.macroM.file} alt={mt.macroM.alt} loading="lazy" decoding="async" />
                <span>{mt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TYPES = [
  { id: '03_primary_bathroom', label: 'PRIMARY SUITE', line: 'The large spa bathroom.' },
  { id: '05_powder_room', label: 'POWDER ROOM', line: 'A small jewel box.' },
  { id: '04_compact_bathroom', label: 'GUEST BATH', line: 'Elegant and compact.' },
  { id: '25_bh_wet_room', label: 'WET ROOM', line: 'Tub and shower as one composition.' },
];

function TypesBath() {
  const items = TYPES.map((t) => ({ ...t, m: M(t.id) })).filter((t) => t.m);
  return (
    <section className="bx-types" aria-label="Bathroom types">
      <div className="idv2-inner idsp-head idv2-reveal" style={{ paddingBottom: 'clamp(18px, 2.4vw, 34px)' }}>
        <Eyebrow>FOUR ROOMS, FOUR JOBS</Eyebrow>
        <h2 className="idv2-h2 idsp-h2">Primary, powder,<br /><span className="idv2-grad">guest, wet room.</span></h2>
      </div>
      <div className="bx-types-track" tabIndex={0} role="group" aria-label="Scroll the bathroom types">
        {items.map((t, i) => (
          <figure key={t.id} className="bx-type">
            <img src={t.m.file} alt={t.m.alt} loading="lazy" decoding="async" />
            <figcaption>
              <span className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{`0${i + 1}`}</span>
              <span className="bx-type-title">{t.label}</span>
              <span className="bx-type-line">{t.line}</span>
              <span className="idv-mono-label bx-type-tag">{t.m.project === 'VILLA' ? 'CLIENT PROJECT · POOLSIDE VILLA' : 'STUDIO CONCEPT'}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="idv2-inner"><div className="idv-mono-label" style={{ color: 'rgba(245,245,240,.55)' }}>DRAG OR SCROLL SIDEWAYS</div></div>
    </section>
  );
}

function CompareBath() {
  const before = M('07_bathroom_before'); const after = M('08_bathroom_after');
  if (!before || !after) return null;
  return (
    <section className="idv2-section idv2-spatial idv2-bgc idv2-bgc-06 bx-compare-sec">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(20px, 2.6vw, 32px)' }}>
        <div className="bx-compare idv2-reveal">
          <BeforeAfterSlider beforeImg={before.file} afterImg={after.file} beforeLabel="RAW SPACE" afterLabel="FINISHED DESIGN" accent="#D8B75A" accentRGB="216,183,90" />
        </div>
        <p className="idv-lede" style={{ maxWidth: 640 }}>Same room. Same architecture. <span className="idv2-grad" style={{ fontWeight: 600 }}>Completely different understanding.</span></p>
        <div className="idv-mono-label">POOLSIDE VILLA PRIMARY BATH — BOTH VIEWS VISUALIZED · SAME CAMERA</div>
      </div>
    </section>
  );
}

const DIRECTIONS = [
  { key: 'artdeco', label: 'ART DECO', id: '43_bh_dir_artdeco', line: 'Emerald lacquer, brass, colorful stone — the world this page lives in.' },
  { key: 'organic', label: 'ORGANIC MODERN', id: '40_bh_dir_organic', line: 'Travertine, pale oak, zellige and linen — soft and warm.' },
  { key: 'minimal', label: 'MINIMAL LUXURY', id: '41_bh_dir_minimal', line: 'One stone, flush oak, concealed light — quiet perfection.' },
  { key: 'mediterranean', label: 'MEDITERRANEAN', id: '42_bh_dir_mediterranean', line: 'Lime plaster, terracotta, carved stone and hard sunlight.' },
];

function DirectionsBath() {
  const items = DIRECTIONS.map((d) => ({ ...d, m: M(d.id) })).filter((d) => d.m);
  const [key, setKey] = useState(items[0]?.key);
  const active = items.find((d) => d.key === key) || items[0];
  if (!active) return null;
  return (
    <section className="idv2-section idv2-bright" id="directions">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(24px, 3vw, 40px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>DESIGN DIRECTIONS</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">One bathroom.<br /><span className="idv2-grad">Four worlds.</span></h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          <MethodSwitcher ariaLabel="Design direction" value={key} onChange={setKey} options={items.map((d) => ({ key: d.key, label: d.label }))} />
          <figure className="bx-dir idv2-reveal">
            <img key={active.key} src={active.m.file} alt={active.m.alt} loading="lazy" decoding="async" />
            <figcaption className="idsp-cap"><span>{active.line}</span><span>SAME ROOM, SAME CAMERA · STUDIO CONCEPT</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

export default function InteriorBathrooms() {
  return (
    <InteriorShell path="/interior-design/bathrooms">
      <SpacesRail path="/interior-design/bathrooms" />
      <HeroBath />
      <TransformBath />
      <DecisionsBath />
      <MaterialRoom />
      <TypesBath />
      <CompareBath />
      <DirectionsBath />
    </InteriorShell>
  );
}
