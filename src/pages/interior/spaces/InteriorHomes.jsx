import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { InteriorShell, Eyebrow, IdvButton, MethodSwitcher } from '@/components/interior/kit';
import ModelViewer from '@/components/interior/ModelViewer';
import { media } from '@/content/interior-design-generated-media';
import { VILLA, MODELS } from '@/data/interiorMedia';
import { SpacesRail } from './SpacePage.jsx';
import { StickyStory, FilmScrub, ZoomFinale } from './xp.jsx';
import './spaces.css';
import './xp.css';

/* Homes as an experience (owner brief 2026-08-23): the Poolside Villa (client project)
   carries everything — floors, exploded house, rooms, indoor/outdoor, arrival, light,
   directions, the real 35 s film, the complete system, the interactive-web upsell. */

const M = (id) => media('homes', id);

function HeroHm() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '10%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, reduced ? 1.04 : 1.15]);
  const hero = M('01_home_hero');
  const LAYERS = [['02_home_ground_floor', 'GROUND FLOOR'], ['03_home_upper_floor', 'UPPER FLOOR'], ['05_home_living', 'INTERIOR'], ['12_home_cinematic_frame', 'FILM']]
    .map(([id, label]) => ({ m: M(id), label })).filter((l) => l.m);
  return (
    <section ref={ref} className="xp-hero" aria-label="Home visualization hero">
      {hero ? <motion.img src={hero.file} alt={hero.alt} className="xp-hero-bg" style={{ y, scale }} fetchpriority="high" /> : null}
      <div className="xp-hero-scrim" aria-hidden="true" />
      <div className="idv2-inner xp-hero-copy">
        <Eyebrow>AYESMAJ STUDIOS / HOME VISUALIZATION</Eyebrow>
        <h1 className="idv2-display xp-h1">Understand<br />the whole home.<br />Experience<br /><span className="idv2-grad">every part of it.</span></h1>
        <div className="xp-hero-actions">
          <IdvButton to="#floors">Explore the home</IdvButton>
          <IdvButton to="/Contact" ghost>Start a house project</IdvButton>
        </div>
        <div className="idv-mono-label xp-hero-credit">POOLSIDE VILLA — CLIENT PROJECT · ONE HOUSE THROUGH THE WHOLE PAGE</div>
      </div>
      <div className="xp-hero-layers" aria-label="The visual system">
        {LAYERS.map((l) => (
          <figure key={l.label} className="xp-hero-layer">
            <img src={l.m.file} alt={l.m.alt} loading="lazy" decoding="async" />
            <figcaption>{l.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const FLOORS = [
  { key: 'ground', label: 'GROUND FLOOR', id: '02_home_ground_floor', line: 'Entry, office, living, dining, kitchen, powder, garage, pool and terrace.' },
  { key: 'upper', label: 'UPPER FLOOR', id: '03_home_upper_floor', line: 'Primary suite, bedrooms, bathrooms, family lounge and the balcony.' },
  { key: 'whole', label: 'WHOLE HOME', id: '04_home_whole_house', line: 'Both floors as one cutaway — the complete story at a glance.' },
];

function FloorsHm() {
  const items = FLOORS.map((f) => ({ ...f, m: M(f.id) })).filter((f) => f.m);
  const [key, setKey] = useState(items[0]?.key);
  const active = items.find((f) => f.key === key) || items[0];
  if (!active) return null;
  return (
    <section className="idv2-section idv2-gradient-soft" id="floors">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(22px, 2.8vw, 38px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>FLOOR BY FLOOR</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Every floor.<br /><span className="idv2-grad">One complete story.</span></h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          <MethodSwitcher ariaLabel="Choose a floor" value={key} onChange={setKey} options={items.map((f) => ({ key: f.key, label: f.label }))} />
          <figure style={{ margin: 0 }} className="idv2-reveal">
            <img key={active.key} src={active.m.file} alt={active.m.alt} loading="lazy" decoding="async" style={{ width: '100%', maxHeight: 'min(66vh, 740px)', objectFit: 'contain', borderRadius: 22, display: 'block' }} />
            <figcaption className="idsp-cap"><span>{active.line}</span><span>POOLSIDE VILLA — CLIENT PROJECT</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function ExplodedHm() {
  const exploded = M('70_hm_exploded');
  return (
    <section className="idv2-section idv2-spatial idv2-bgc idv2-bgc-04">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(24px, 3vw, 44px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>THE EXPLODED HOME</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Roof, floors, site —<br /><span className="idv2-grad">pulled apart to be understood.</span></h2>
        </div>
        {exploded ? (
          <figure className="idv2-reveal" style={{ margin: 0 }}>
            <img src={exploded.file} alt={exploded.alt} loading="lazy" decoding="async" style={{ width: '100%', maxHeight: 'min(64vh, 720px)', objectFit: 'contain', borderRadius: 20, display: 'block' }} />
            <figcaption className="idsp-cap"><span>EXPLODED AXONOMETRIC — GENERATED FROM THE HOUSE CUTAWAY</span><span>POOLSIDE VILLA — CLIENT PROJECT</span></figcaption>
          </figure>
        ) : null}
        <div className="idv2-reveal" style={{ display: 'grid', gap: 10 }}>
          <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>AND THE REAL MODEL — DRAG TO TURN</div>
          <ModelViewer model={MODELS.project[1]} auto ratio="21 / 9" />
        </div>
      </div>
    </section>
  );
}

const ROOMS = [
  ['05_home_living', 'LIVING'], ['06_home_kitchen', 'KITCHEN'], ['07_home_primary_bedroom', 'PRIMARY BEDROOM'],
  ['08_home_primary_bath', 'PRIMARY BATH'], ['80_hm_office', 'OFFICE'], ['81_hm_family_lounge', 'FAMILY LOUNGE'],
];

function InsideHm() {
  const items = ROOMS.map(([id, label]) => ({ m: M(id), label })).filter((r) => r.m);
  return (
    <section className="bx-types" aria-label="Inside the home">
      <div className="idv2-inner idsp-head idv2-reveal" style={{ paddingBottom: 'clamp(16px, 2vw, 30px)' }}>
        <Eyebrow>INSIDE THE HOME</Eyebrow>
        <h2 className="idv2-h2 idsp-h2">Every room has a role<br /><span className="idv2-grad">in the story.</span></h2>
      </div>
      <div className="bx-types-track" tabIndex={0} role="group" aria-label="Rooms">
        {items.map((r, i) => (
          <figure key={r.label} className="bx-type">
            <img src={r.m.file} alt={r.m.alt} loading="lazy" decoding="async" />
            <figcaption>
              <span className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{`0${i + 1}`}</span>
              <span className="bx-type-title">{r.label}</span>
              <span className="idv-mono-label bx-type-tag">POOLSIDE VILLA — CLIENT PROJECT</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="idv2-inner"><div className="idv-mono-label" style={{ color: 'rgba(245,245,240,.55)' }}>DRAG OR SCROLL SIDEWAYS</div></div>
    </section>
  );
}

function OutdoorHm() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', reduced ? '-6%' : '6%']);
  const pool = M('09_home_pool');
  if (!pool) return null;
  return (
    <section ref={ref} className="idv2-full idsp-full" aria-label="Indoor outdoor">
      <motion.div className="idsp-full-bg" style={{ y, scale: 1.14 }}>
        <img src={pool.file} alt={pool.alt} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </motion.div>
      <div className="idv2-full-scrim idsp-full-scrim" />
      <div className="idv2-inner idsp-full-copy">
        <Eyebrow>INDOOR / OUTDOOR</Eyebrow>
        <h2 className="idv2-display idsp-full-h idsp-full-h--wide">The house doesn&rsquo;t stop<br /><span className="idv2-grad">at the wall.</span></h2>
        <div className="idv-mono-label" style={{ color: 'rgba(245,245,240,.7)' }}>{pool.alt} · POOLSIDE VILLA — CLIENT PROJECT</div>
      </div>
    </section>
  );
}

function ArrivalHm() {
  const steps = [
    { tag: 'THE STREET', id: '71_hm_arrival', title: 'The experience starts before the front door.', line: 'Golden hour on the street — the driveway draws you in.' },
    { tag: 'THE GARAGE', id: '10_home_garage', title: 'Arrive, park, exhale.', line: 'The garage is part of the architecture, not an afterthought.' },
    { tag: 'THE FOYER', id: '82_hm_foyer', title: 'The house opens up.', line: 'Double height, the stair, the first view through the home.' },
    { tag: 'THE POOL', id: '83_hm_outdoor_lounge', title: 'And lands outside.', line: 'The journey ends where the evening begins.' },
  ].map((s) => ({ ...s, m: M(s.id) })).filter((s) => s.m).map((s) => ({ tag: s.tag, title: s.title, line: s.line, src: s.m.file }));
  if (steps.length < 3) return null;
  return (
    <section className="idv2-section idv2-spatial idv2-bgc idv2-bgc-07">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(22px, 2.8vw, 38px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>ARRIVAL</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Street, driveway, door,<br /><span className="idv2-grad">home.</span></h2>
        </div>
        <StickyStory steps={steps} ariaLabel="The arrival sequence" />
      </div>
    </section>
  );
}

const LIGHTS = [
  { key: 'day', label: 'DAY', id: '77_hm_light_day', line: 'Bright, colorful, crisp — the house at noon.' },
  { key: 'sunset', label: 'SUNSET', id: '01_home_hero', line: 'Golden hour — the master light of the project.' },
  { key: 'evening', label: 'EVENING', id: '78_hm_light_evening', line: 'The sky goes deep blue; the rooms stay rich and warm.' },
];

function LightHm() {
  const items = LIGHTS.map((l) => ({ ...l, m: M(l.id) })).filter((l) => l.m);
  const [key, setKey] = useState('sunset');
  const active = items.find((l) => l.key === key) || items[0];
  if (!active) return null;
  return (
    <section className="idv2-section idv2-bright">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(22px, 2.8vw, 38px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>SAME HOME, DIFFERENT LIGHT</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Light changes<br /><span className="idv2-grad">the way the home feels.</span></h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          <MethodSwitcher ariaLabel="Time of day" value={key} onChange={setKey} options={items.map((l) => ({ key: l.key, label: l.label }))} />
          <figure style={{ margin: 0 }} className="idv2-reveal">
            <img key={active.key} src={active.m.file} alt={active.m.alt} loading="lazy" decoding="async" style={{ width: '100%', height: 'min(62vh, 700px)', objectFit: 'cover', borderRadius: 22, display: 'block' }} />
            <figcaption className="idsp-cap"><span>{active.line}</span><span>SAME CAMERA · DAY AND EVENING RELIT FROM THE MASTER</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const HM_DIRECTIONS = [
  { key: 'modern', label: 'MODERN LUXURY', id: '05_home_living', line: 'The project as designed — stone, oak, olive and light.' },
  { key: 'artdeco', label: 'ART DECO', id: '73_hm_dir_artdeco', line: 'Emerald, burgundy, fluted walnut and brass.' },
  { key: 'organic', label: 'ORGANIC MODERN', id: '74_hm_dir_organic', line: 'Boucle, travertine, pale oak — soft and grounded.' },
  { key: 'colorful', label: 'COLORFUL CONTEMPORARY', id: '75_hm_dir_colorful', line: 'Cobalt, coral and bold art — disciplined color.' },
];

function DirectionsHm() {
  const items = HM_DIRECTIONS.map((d) => ({ ...d, m: M(d.id) })).filter((d) => d.m);
  const [key, setKey] = useState(items[0]?.key);
  const active = items.find((d) => d.key === key) || items[0];
  if (!active) return null;
  return (
    <section className="idv2-section idv2-gradient-soft">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(22px, 2.8vw, 38px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>WHOLE-HOME DESIGN DIRECTIONS</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">One house.<br /><span className="idv2-grad">Four ways to live in it.</span></h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          <MethodSwitcher ariaLabel="Design direction" value={key} onChange={setKey} options={items.map((d) => ({ key: d.key, label: d.label }))} />
          <figure style={{ margin: 0 }} className="idv2-reveal">
            <img key={active.key} src={active.m.file} alt={active.m.alt} loading="lazy" decoding="async" style={{ width: '100%', height: 'min(62vh, 700px)', objectFit: 'cover', borderRadius: 22, display: 'block' }} />
            <figcaption className="idsp-cap"><span>{active.line}</span><span>{active.key === 'modern' ? 'CLIENT PROJECT — AS DESIGNED' : 'SAME ARCHITECTURE, RESTYLED AS A STUDY'}</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

function FilmHm() {
  return (
    <FilmScrub
      film={{ desktop: VILLA.film.desktop, mobile: VILLA.film.mobile, poster: VILLA.film.poster }}
      credit="POOLSIDE VILLA — 35 S, ONE CONTINUOUS TAKE, PLAN TO POOL · AI-GENERATED FROM THE MASTER FRAMES"
      height="360vh"
      stages={[
        { at: 0, node: 'See the house.' },
        { at: 0.25, node: 'Enter the home.' },
        { at: 0.55, node: 'Follow the experience.' },
        { at: 0.8, node: <>Remember <span className="idv2-grad">the project.</span></> },
      ]}
    />
  );
}

function SystemHm() {
  const items = ['02_home_ground_floor', '03_home_upper_floor', '04_home_whole_house', '06_home_kitchen', '07_home_primary_bedroom', '13_home_blue_hour', '12_home_cinematic_frame', '84_hm_outdoor_kitchen']
    .map(M).filter(Boolean)
    .map((m, i) => ({
      src: m.file, alt: m.alt,
      w: ['24vw', '18vw', '26vw', '16vw', '18vw', '20vw', '16vw', '14vw'][i],
      h: ['16vw', '12vw', '17vw', '11vw', '12vw', '13vw', '11vw', '9vw'][i],
      top: ['0vh', '-27vh', '24vh', '-10vh', '27vh', '-26vh', '2vh', '30vh'][i],
      left: ['0vw', '-24vw', '-23vw', '26vw', '21vw', '9vw', '-35vw', '35vw'][i],
    }));
  return (
    <section className="idv2-section idv2-bright" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <ZoomFinale items={items}>
        <Eyebrow>THE COMPLETE VISUAL SYSTEM</Eyebrow>
        <h2 className="idv2-h2 idsp-h2" style={{ maxWidth: 960 }}>One house.<br /><span className="idv2-grad">Every visual language</span> it needs.</h2>
        <IdvButton to="/Contact">Start a house project</IdvButton>
      </ZoomFinale>
    </section>
  );
}

function WebUpsellHm() {
  const mock = M('76_hm_web_mockup');
  if (!mock) return null;
  return (
    <section className="idv2-section idv2-spatial idv2-bgc idv2-bgc-01">
      <div className="idv2-inner xp-chapter">
        <div className="xp-chapter-copy idv2-reveal">
          <Eyebrow>BEYOND IMAGES</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">When images aren&rsquo;t enough,<br /><span className="idv2-grad">make the home interactive.</span></h2>
          <p className="idv-lede" style={{ color: 'rgba(245,245,240,.8)' }}>Floor selector, room selector, the live 3D model, imagery, the film and inquiry — one address for the whole project.</p>
          <div className="xp-hero-actions">
            <IdvButton to="/interior-design/complete-visual-presentation">Explore interactive web</IdvButton>
          </div>
        </div>
        <figure className="xp-chapter-media idv2-reveal"><img src={mock.file} alt={mock.alt} loading="lazy" decoding="async" /></figure>
      </div>
    </section>
  );
}

export default function InteriorHomes() {
  return (
    <InteriorShell path="/interior-design/homes">
      <SpacesRail path="/interior-design/homes" />
      <HeroHm />
      <FloorsHm />
      <ExplodedHm />
      <InsideHm />
      <OutdoorHm />
      <ArrivalHm />
      <LightHm />
      <DirectionsHm />
      <FilmHm />
      <SystemHm />
      <WebUpsellHm />
    </InteriorShell>
  );
}
