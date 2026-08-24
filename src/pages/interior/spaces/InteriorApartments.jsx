import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { InteriorShell, Eyebrow, IdvButton, MethodSwitcher, PinSeq } from '@/components/interior/kit';
import BeforeAfterSlider from '@/components/ayesmaj/BeforeAfterSlider';
import { media } from '@/content/interior-design-generated-media';
import { SpacesRail } from './SpacePage.jsx';
import { SpotFigure, Legend, FilmScrub, ZoomFinale } from './xp.jsx';
import './spaces.css';
import './xp.css';

/* Apartments as an experience (owner brief 2026-08-23): the Canal Apartment (client
   project) carries the whole narrative — scan → plan → 3D → interior → film. */

const M = (id) => media('apartments', id);

function HeroAp() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '9%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, reduced ? 1.04 : 1.14]);
  const plan = M('04_apartment_3d_plan'); const living = M('05_apartment_living');
  return (
    <section ref={ref} className="xp-hero" aria-label="Apartment visualization hero">
      {plan ? <motion.img src={plan.file} alt={plan.alt} className="xp-hero-bg" style={{ y, scale, objectPosition: '75% 40%' }} fetchpriority="high" /> : null}
      {living ? <div className="ap-hero-inside" aria-hidden="true"><img src={living.file} alt="" /></div> : null}
      <div className="xp-hero-scrim" aria-hidden="true" />
      <div className="idv2-inner xp-hero-copy">
        <Eyebrow>AYESMAJ STUDIOS / APARTMENT VISUALIZATION</Eyebrow>
        <h1 className="idv2-display xp-h1">See the<br />entire apartment.<br /><span className="idv2-grad">Then step inside.</span></h1>
        <p className="idv-lede" style={{ color: 'rgba(245,245,240,.85)', maxWidth: 560 }}>
          From existing-condition capture to complete interior visualization — see the whole apartment before entering every room.
        </p>
        <div className="xp-hero-actions">
          <IdvButton to="#map">Explore the apartment</IdvButton>
          <IdvButton to="/Contact" ghost>Start a project</IdvButton>
        </div>
        <div className="idv-mono-label xp-hero-credit">CANAL APARTMENT — CLIENT PROJECT · ONE APARTMENT THROUGH THE WHOLE PAGE</div>
      </div>
    </section>
  );
}

function TransformAp() {
  const stages = [
    { label: 'EXISTING CONDITION', id: '02_apartment_source', head: 'CAPTURE IT.', line: 'The apartment as it stands — the honest starting point.' },
    { label: 'CLEAN PLAN', id: '03_apartment_clean_plan', head: 'ORGANIZE IT.', line: 'The capture becomes a precise, readable plan.' },
    { label: '3D FLOOR PLAN', id: '60_ap_plan_unfurnished', head: 'UNDERSTAND IT.', line: 'The architecture stands up — every wall, opening and window.' },
    { label: 'FURNISHED PLAN', id: '04_apartment_3d_plan', head: 'DESIGN IT.', line: 'Furniture at true scale, room by room.' },
    { label: 'INTERIOR', id: '05_apartment_living', head: 'ENTER IT.', line: 'The same apartment — now a place, not a drawing.' },
  ].map((s) => ({ ...s, m: M(s.id) })).filter((s) => s.m).map((s) => ({ label: s.label, src: s.m.file, alt: s.m.alt, head: s.head, line: s.line }));
  if (stages.length < 4) return null;
  return (
    <section className="bx-transform" aria-label="Scan to interior">
      <PinSeq stages={stages} height="400vh" ariaLabel="The same apartment progressively understood" />
    </section>
  );
}

const ROOMS = [
  { key: 'living', label: 'Living', at: [56, 20], id: '05_apartment_living', line: 'The walnut media wall and the water beyond.' },
  { key: 'kitchen', label: 'Kitchen', at: [70, 32], id: '06_apartment_kitchen', line: 'Stone, steel and the canal at the window.' },
  { key: 'bedroom', label: 'Bedroom', at: [31, 56], id: '07_apartment_bedroom', line: 'Quiet, layered, softly lit.' },
  { key: 'bathroom', label: 'Bathroom', at: [24, 32], id: '08_apartment_bathroom', line: 'Designed into the real shell.' },
  { key: 'balcony', label: 'Balcony', at: [62, 78], id: '09_apartment_balcony', line: 'The terrace over the water.' },
];

function MapAp() {
  const [active, setActive] = useState(null);
  const plan = M('04_apartment_3d_plan');
  const current = ROOMS.find((r) => r.key === active);
  const preview = current ? M(current.id) : null;
  if (!plan) return null;
  return (
    <section className="idv2-section idv2-gradient-soft" id="map">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(24px, 3vw, 40px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>THE APARTMENT MAP</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">One plan.<br /><span className="idv2-grad">Every room, one tap away.</span></h2>
        </div>
        <div className="ap-map idv2-reveal">
          <div className="ap-map-fig" data-dim={!!active}>
            <SpotFigure src={plan.file} alt={plan.alt} spots={ROOMS} active={active} caption={['FURNISHED 3D PLAN', 'CANAL APARTMENT — CLIENT PROJECT']} />
          </div>
          <div className="ap-map-side">
            <Legend items={ROOMS} active={active} setActive={setActive} ariaLabel="Rooms" />
            {preview ? (
              <a className="ap-map-preview" href={`#room-${current.key}`}>
                <img key={current.key} src={preview.file} alt={preview.alt} loading="lazy" decoding="async" />
                <span className="idv-mono-label">{current.label.toUpperCase()} — {current.line} · GO TO ROOM ↓</span>
              </a>
            ) : (
              <div className="idv-mono-label" style={{ opacity: 0.6 }}>HOVER OR TAP A ROOM</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function JourneyAp() {
  const chapters = ROOMS.map((r, i) => ({ ...r, m: M(r.id), flip: i % 2 === 1 })).filter((r) => r.m);
  return (
    <section className="bx-types" aria-label="Room by room" style={{ display: 'grid', gap: 'clamp(40px, 6vw, 90px)' }}>
      <div className="idv2-inner idsp-head idv2-reveal">
        <Eyebrow>THE ROOM JOURNEY</Eyebrow>
        <h2 className="idv2-h2 idsp-h2">Every room,<br /><span className="idv2-grad">at full size.</span></h2>
      </div>
      {chapters.map((r, i) => (
        <div key={r.key} className="idv2-inner" id={`room-${r.key}`}>
          <div className={`xp-chapter${r.flip ? ' xp-chapter--flip' : ''} idv2-reveal`}>
            <div className="xp-chapter-copy">
              <span className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{`0${i + 1}`}</span>
              <h3 className="idv2-h2" style={{ fontSize: 'clamp(30px, 3.4vw, 54px)' }}>{r.label}</h3>
              <p className="idv-lede" style={{ color: 'rgba(245,245,240,.8)' }}>{r.line}</p>
              <span className="idv-mono-label" style={{ color: 'rgba(245,245,240,.5)' }}>CANAL APARTMENT — CLIENT PROJECT</span>
            </div>
            <figure className="xp-chapter-media"><img src={r.m.file} alt={r.m.alt} loading="lazy" decoding="async" /></figure>
          </div>
        </div>
      ))}
    </section>
  );
}

const AP_DIRECTIONS = [
  { key: 'artdeco', label: 'ART DECO', id: '61_ap_dir_artdeco', line: 'Emerald velvet, fluted walnut, brass and geometry.' },
  { key: 'organic', label: 'ORGANIC MODERN', id: '62_ap_dir_organic', line: 'Boucle curves, travertine, pale oak and linen.' },
  { key: 'colorful', label: 'COLORFUL CONTEMPORARY', id: '63_ap_dir_colorful', line: 'Cobalt, coral and bold art — disciplined color.' },
  { key: 'miami', label: 'MIAMI MODERN', id: '64_ap_dir_miami', line: 'Terrazzo, blush, seafoam and breeze.' },
];

function DirectionsAp() {
  const items = AP_DIRECTIONS.map((d) => ({ ...d, m: M(d.id) })).filter((d) => d.m);
  const [key, setKey] = useState(items[0]?.key);
  const active = items.find((d) => d.key === key) || items[0];
  if (!active) return null;
  return (
    <section className="idv2-section idv2-bright">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(22px, 2.8vw, 38px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>DESIGN DIRECTIONS</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">One apartment.<br /><span className="idv2-grad">More than one future.</span></h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          <MethodSwitcher ariaLabel="Design direction" value={key} onChange={setKey} options={items.map((d) => ({ key: d.key, label: d.label }))} />
          <figure style={{ margin: 0 }} className="idv2-reveal">
            <img key={active.key} src={active.m.file} alt={active.m.alt} loading="lazy" decoding="async" style={{ width: '100%', height: 'min(62vh, 700px)', objectFit: 'cover', borderRadius: 22, display: 'block' }} />
            <figcaption className="idsp-cap"><span>{active.line}</span><span>SAME ARCHITECTURE, SAME CAMERA · CLIENT PROJECT, RESTYLED AS A STUDY</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

const TYPOLOGIES = [
  { key: 'studio', label: 'STUDIO', id: '65_ap_plan_studio', facts: [['SLEEP', 'Alcove, curtained'], ['WORK', 'Desk at the window'], ['STORAGE', 'One full wall'], ['DINE', 'Two, extendable']] },
  { key: '1br', label: '1 BEDROOM', id: '66_ap_plan_1br', facts: [['SLEEP', 'Separate bedroom'], ['WORK', 'Corner office'], ['STORAGE', 'Entry + hallway'], ['DINE', 'Four comfortably']] },
  { key: '2br', label: '2 BEDROOM', id: '67_ap_plan_2br', facts: [['SLEEP', 'Two rooms, en-suite'], ['WORK', 'Flexible second room'], ['STORAGE', 'Hallway spine'], ['DINE', 'Six, everyday']] },
  { key: 'penthouse', label: 'PENTHOUSE', id: '68_ap_plan_penthouse', facts: [['SLEEP', 'Suite with dressing'], ['WORK', 'Dedicated study'], ['STORAGE', 'Everywhere it should be'], ['DINE', 'Eight, with terrace']] },
];

function CompactAp() {
  const items = TYPOLOGIES.map((t) => ({ ...t, m: M(t.id) })).filter((t) => t.m);
  const [key, setKey] = useState(items[0]?.key);
  const active = items.find((t) => t.key === key) || items[0];
  if (!active) return null;
  return (
    <section className="idv2-section idv2-spatial idv2-bgc idv2-bgc-02">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(22px, 2.8vw, 38px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>COMPACT SPACE INTELLIGENCE</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Small plans,<br /><span className="idv2-grad">smart lives.</span></h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          <MethodSwitcher ariaLabel="Apartment typology" value={key} onChange={setKey} options={items.map((t) => ({ key: t.key, label: t.label }))} />
          <div className="ap-typo idv2-reveal">
            <figure style={{ margin: 0 }}>
              <img key={active.key} src={active.m.file} alt={active.m.alt} loading="lazy" decoding="async" style={{ width: '100%', maxHeight: 'min(58vh, 660px)', objectFit: 'contain', borderRadius: 20, display: 'block' }} />
              <figcaption className="idsp-cap"><span>{active.label} — FURNISHED PLAN</span><span>SHOWCASE DIAGRAM</span></figcaption>
            </figure>
            <ul className="idsp-list">
              {active.facts.map(([a, b]) => <li key={a}><span className="idv-mono-label">{a}</span><span>{b}</span></li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompareAp() {
  const before = M('11_apartment_before'); const after = M('11_apartment_after');
  if (!before || !after) return null;
  return (
    <section className="idv2-section idv2-spatial idv2-bgc idv2-bgc-06">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(20px, 2.6vw, 32px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>BEFORE / AFTER</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">Same address.<br /><span className="idv2-grad">Completely different experience.</span></h2>
        </div>
        <div className="xp-compare idv2-reveal">
          <BeforeAfterSlider beforeImg={before.file} afterImg={after.file} beforeLabel="EXISTING CONDITION" afterLabel="FINISHED INTERIOR" accent="#D8B75A" accentRGB="216,183,90" />
        </div>
        <div className="idv-mono-label">CANAL APARTMENT — CLIENT PROJECT · SAME ARCHITECTURE, LOCKED</div>
      </div>
    </section>
  );
}

const AP_FILM = {
  desktop: '/interior-design/generated/apartments/film/apartment-film.mp4',
  mobile: '/interior-design/generated/apartments/film/apartment-film-mobile.mp4',
  poster: '/interior-design/generated/apartments/film/apartment-film-poster.png',
};

function FilmAp() {
  return (
    <FilmScrub
      film={AP_FILM}
      credit="CANAL APARTMENT — PLAN TO BALCONY · ONE CONTINUOUS TAKE, AI-GENERATED"
      stages={[
        { at: 0, node: 'See the plan.' },
        { at: 0.25, node: 'Enter the room.' },
        { at: 0.5, node: 'Follow the light.' },
        { at: 0.75, node: <>Experience <span className="idv2-grad">the home.</span></> },
      ]}
    />
  );
}

function PresentationAp() {
  const items = ['03_apartment_clean_plan', '04_apartment_3d_plan', '05_apartment_living', '06_apartment_kitchen', '07_apartment_bedroom', '08_apartment_bathroom', '09_apartment_balcony', '10_apartment_film_frame']
    .map(M).filter(Boolean)
    .map((m, i) => ({
      src: m.file, alt: m.alt,
      w: ['26vw', '18vw', '22vw', '16vw', '18vw', '14vw', '16vw', '12vw'][i],
      h: ['17vw', '12vw', '14vw', '11vw', '12vw', '9vw', '11vw', '8vw'][i],
      top: ['0vh', '-26vh', '22vh', '-8vh', '26vh', '-28vh', '4vh', '30vh'][i],
      left: ['0vw', '-24vw', '-22vw', '26vw', '20vw', '8vw', '-34vw', '34vw'][i],
    }));
  return (
    <section className="idv2-section idv2-gradient-soft" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <ZoomFinale items={items}>
        <Eyebrow>THE CLIENT PRESENTATION</Eyebrow>
        <h2 className="idv2-h2 idsp-h2" style={{ maxWidth: 900 }}>Don&rsquo;t send a folder of files.<br />Show the <span className="idv2-grad">entire project.</span></h2>
        <IdvButton to="/Contact">Start an apartment project</IdvButton>
      </ZoomFinale>
    </section>
  );
}

export default function InteriorApartments() {
  return (
    <InteriorShell path="/interior-design/apartments">
      <SpacesRail path="/interior-design/apartments" />
      <HeroAp />
      <TransformAp />
      <MapAp />
      <JourneyAp />
      <DirectionsAp />
      <CompactAp />
      <CompareAp />
      <FilmAp />
      <PresentationAp />
    </InteriorShell>
  );
}
