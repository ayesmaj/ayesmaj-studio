/**
 * /interior-design/3d-floor-plan-apartment — Understand-stage subpage
 * (accent: gold → ember). Brighter than its siblings (addendum §9): the hero
 * is a light ground with dark type and one enormous plan figure.
 *
 * Structure: bright plan hero → dark plan-to-room pin → bright furniture-fit
 * switcher → plan-vs-film split (the honest limitation) → facts → FAQ →
 * next portal → CTA.
 *
 * Honesty rules carried from the audit: every asset labeled with its real
 * project (The Patel R1802 / Canal Apartment); no invented measurements or
 * plan-position claims; the plan's limits (no materials, no construction
 * documentation) stated in the client's face, not a footnote.
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  InteriorShell, Eyebrow, IdvButton, MediaFigure, MethodSwitcher, MethodRail,
  NextPortal, PinSeq, MethodFacts, MethodOutro, CtaBand,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE } from '@/data/interiorDesign';
import { APARTMENT, PATEL } from '@/data/interiorMedia';

const m = METHODS['3d-floor-plan-apartment'];

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* One project thread — The Patel, Residence 1802: the plan in the hero,
   then the rooms that plan anchors. */
const SEQ = [
  { label: 'LIVING', src: PATEL.unit.rooms[0].src, alt: 'The Patel Residence 1802 — living room, camera anchored on the unit floor plan', line: 'The living room where the plan places it: seating, opening, circulation — nothing moved for the picture.' },
  { label: 'KITCHEN', src: PATEL.unit.rooms[1].src, alt: 'The Patel Residence 1802 — kitchen, camera anchored on the unit floor plan', line: 'The kitchen holds its plan position; counters and clearances stay where the drawing says they are.' },
  { label: 'PRIMARY', src: PATEL.unit.rooms[2].src, alt: 'The Patel Residence 1802 — primary bedroom, camera anchored on the unit floor plan', line: 'The primary bedroom, viewed from inside the same geometry the plan established.' },
  { label: 'TERRACE', src: PATEL.unit.rooms[3].src, alt: 'The Patel Residence 1802 — terrace, camera anchored on the unit floor plan', line: 'The terrace closes the loop: the last room on the plan, seen at eye level.' },
];

/* Furniture-fit views — Canal Apartment, the clearance story per room. */
const FIT_VIEWS = {
  living: {
    img: APARTMENT.rooms[3],
    alt: 'Canal Apartment living room furnished at true scale in the 3D plan base',
    points: ['The seating group at true furniture scale', 'A clear walking route past the sofa', 'Sight lines to the windows stay open'],
  },
  dining: {
    img: APARTMENT.rooms[1],
    alt: 'Canal Apartment dining room furnished at true scale in the 3D plan base',
    points: ['The table scaled to the room, not to wishful thinking', 'Chairs pulled out still leave the route past the table', 'The serving path stays clear'],
  },
  waterfront: {
    img: APARTMENT.rooms[6],
    alt: 'Canal Apartment waterfront room furnished at true scale in the 3D plan base',
    points: ['Furniture kept low and back from the glass', 'The window line stays unblocked end to end', 'Circulation runs behind the seating, not through the view'],
  },
};

const FIT_OPTIONS = [
  { key: 'living', label: 'LIVING' },
  { key: 'dining', label: 'DINING' },
  { key: 'waterfront', label: 'WATERFRONT' },
];

const FAQ = [
  ['What do you need from me to start?', 'A plan, a scan, or both — plus the furniture direction you are leaning toward and your priorities: storage, work, hosting, family. The plan is built around how you intend to live, not around empty rooms.'],
  ['Can I build from the 3D floor plan?', 'No. The 3D plan communicates the design — it does not replace construction documentation. It exists so the layout gets approved while change is still cheap; construction drawings follow the approved layout.'],
  ['Does the plan show my materials and lighting?', 'Deliberately not. Material and lighting decisions belong to renders and film, not the plan. The plan answers one question — how the rooms connect and whether the furniture fits — and answers it without decoration getting in the way.'],
];

function Hero() {
  return (
    <section className="idv2-section idv2-bright idv2-acc-understand" style={{ background: 'radial-gradient(1000px 560px at 85% 0%, rgba(216,183,90,0.18), transparent 60%), radial-gradient(700px 460px at 5% 100%, rgba(224,102,75,0.1), transparent 55%), #F6F0E7' }}>
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 0.8fr) 1.2fr', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'center', minHeight: '88svh' }}>
        <div style={{ display: 'grid', gap: 22 }}>
          <motion.div {...rise(0)}><Eyebrow>AYESMAJ STUDIOS / 3D APARTMENT FLOOR PLAN</Eyebrow></motion.div>
          <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero" style={{ color: 'var(--idv2-ink)' }}>
            See the<br />
            <span className="idv2-grad">entire<br />apartment</span><br />
            in one glance.
          </motion.h1>
          <motion.p {...rise(0.18)} className="idv-lede" style={{ color: 'var(--idv2-ink)' }}>
            A furnished 3D floor plan shows what a flat drawing cannot: how furniture actually
            fits, how rooms flow into each other, and how daily life would move through the space.
          </motion.p>
          <motion.div {...rise(0.28)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <IdvButton onClick={() => document.getElementById('plan-to-room')?.scrollIntoView({ behavior: 'smooth' })}>
              From plan to room
            </IdvButton>
            <IdvButton to="/Contact" ghost>Start an apartment plan</IdvButton>
          </motion.div>
          <motion.div {...rise(0.36)} className="idv-mono-label">ANSWERS: {m.question.toUpperCase()}</motion.div>
        </div>
        <motion.div {...rise(0.14)}>
          <MediaFigure
            src={PATEL.unit.floorplan}
            alt="The Patel, Residence 1802 — furnished 3D floor plan showing every room, the furniture at scale, and the circulation between them"
            caption="THE PATEL — RESIDENCE 1802"
            tag="FURNISHED 3D PLAN"
            ratio="wide"
            eager
          />
        </motion.div>
      </div>
      <MethodRail />
    </section>
  );
}

function PlanToRoom() {
  return (
    <section id="plan-to-room" className="idv2-section idv2-dark idv2-acc-understand">
      <div className="idv2-inner" style={{ paddingBottom: 24 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>PLAN TO ROOM — THE PATEL, RESIDENCE 1802</Eyebrow>
          <h2 className="idv2-h2">The plan anchors <span className="idv2-grad">every camera.</span></h2>
          <p className="idv-lede">
            The Residence 1802 plan you just saw is the spatial source of truth. Scroll: each of
            these four rooms is a point on that plan, seen at eye level — same geometry, same
            furniture positions, one project.
          </p>
        </div>
      </div>
      <PinSeq stages={SEQ} height="350vh" accentClass="idv2-acc-understand" ariaLabel="The Patel Residence 1802 — from plan position to room view" />
    </section>
  );
}

function FurnitureFit() {
  const [view, setView] = useState('living');
  const v = FIT_VIEWS[view];
  return (
    <section className="idv2-section idv2-bright idv2-acc-understand">
      <div className="idv2-inner" style={{ display: 'grid', gap: 28 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>FURNITURE FIT</Eyebrow>
          <h2 className="idv2-h2">Furniture at <span className="idv2-acc-text">true scale.</span></h2>
          <p className="idv-lede">
            The most expensive layout mistakes are clearance mistakes. Switch rooms: each Canal
            Apartment view shows the fit the plan proves before anything is bought or built.
          </p>
        </div>
        <MethodSwitcher options={FIT_OPTIONS} value={view} onChange={setView} ariaLabel="Canal Apartment room" />
        <div className="idv2-truths-media">
          <img src={v.img.src} alt={v.alt} loading="lazy" decoding="async" />
          <div className="idv2-truths-panel">
            <span className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>THE CLEARANCE STORY</span>
            {v.points.map((p) => (
              <p key={p} style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: 'rgba(245,245,240,0.86)' }}>{p}</p>
            ))}
          </div>
        </div>
        <div className="idv-mono-label">CANAL APARTMENT — {view.toUpperCase()}</div>
      </div>
    </section>
  );
}

function PlanVsFilm() {
  return (
    <section className="idv2-section idv2-gradient-soft idv2-acc-understand">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 52px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 1050 }}>
          <Eyebrow>WHERE THE PLAN STOPS</Eyebrow>
          <h2 className="idv2-h2">
            The plan explains the space.<br />
            The film explains <span className="idv2-grad">the feeling.</span>
          </h2>
          <p className="idv-lede">
            An honest limit: material and lighting decisions belong to renders and film, not the
            plan. The plan wins the layout approval — then hands off.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(20px, 3vw, 44px)', alignItems: 'start' }}>
          <MediaFigure
            src={APARTMENT.studies[3].src}
            alt="Canal Apartment living room plan study — layout, openings and furniture positions without material decisions"
            caption="CANAL APARTMENT — LIVING STUDY"
            tag="THE PLAN"
            ratio="45"
          />
          <MediaFigure
            video
            src={PATEL.film.mobile}
            poster={PATEL.film.poster}
            alt="The Patel hero film — movement, light and atmosphere the plan deliberately leaves out"
            caption="THE PATEL — HERO FILM"
            tag="THE FILM"
            ratio="45"
          />
        </div>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <IdvButton to={METHODS['ai-video-apartment'].route} ghost>How the apartment film works</IdvButton>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="idv2-section idv2-gradient-soft">
      <div className="idv2-inner" style={{ display: 'grid', gap: 24, maxWidth: 980 }}>
        <Eyebrow>QUESTIONS DESIGNERS ASK</Eyebrow>
        <div>
          {FAQ.map(([q, a]) => (
            <details key={q} className="idv-row">
              <summary>{q}</summary>
              <div className="idv-row-body"><p className="idv-lede" style={{ margin: 0 }}>{a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Interior3dPlanApartment() {
  return (
    <InteriorShell path={m.route}>
      <Hero />
      <PlanToRoom />
      <FurnitureFit />
      <PlanVsFilm />
      <div className="idv2-section idv2-bright idv2-acc-understand">
        <div className="idv2-inner idv2-section--flush" style={{ paddingTop: 'clamp(60px, 7vw, 110px)', paddingBottom: 'clamp(40px, 5vw, 80px)' }}>
          <MethodFacts method={m} />
          <MethodOutro method={m} methods={METHODS} />
        </div>
      </div>
      <Faq />
      <NextPortal methodKey="3d-floor-plan-apartment" image={PATEL.interiors[2].src} />
      <CtaBand
        eyebrow="AYESMAJ STUDIOS / 3D APARTMENT FLOOR PLAN"
        headline="The layout is the cheapest thing to change. Approve it first."
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
