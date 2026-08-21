/**
 * /interior-design/3d-building-visualization — premium development marketing
 * (addendum §11). One project carries the whole page: The Patel, the studio's
 * Miami tower — real renders, the real GLB model, the real hero film.
 *
 * Structure: dark hero (holographic navy) → the building in the round
 * (ModelViewer) → pinned SCALE STORY → who needs this → a building needs a
 * world (brand + film) → facts → FAQ → next portal → CTA.
 *
 * Honesty: every asset is labeled The Patel; the model card carries its real
 * weight; METHODS limits render visibly in MethodFacts; no invented numbers.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  InteriorShell, Eyebrow, IdvButton, MediaFigure, MethodRail, NextPortal,
  PinSeq, MethodFacts, MethodOutro, CtaBand,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE } from '@/data/interiorDesign';
import { PATEL, MODELS } from '@/data/interiorMedia';
import ModelViewer from '@/components/interior/ModelViewer';

const m = METHODS['3d-building-visualization'];

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* Floating chips over the tower — the layers a development has to sell. */
const HERO_CHIPS = [
  { text: 'ROOF', style: { right: '8%', top: '10%' } },
  { text: 'RESIDENCES', style: { left: '6%', top: '34%' } },
  { text: 'AMENITIES', style: { right: '10%', bottom: '30%' } },
  { text: 'ARRIVAL', style: { left: '10%', bottom: '10%' } },
];

/* One tower, skyline to residence — every frame is The Patel. */
const SCALE_STORY = [
  { label: 'MASSING', src: PATEL.tower[1].src, alt: 'The Patel — architecture study of the tower massing', line: 'The volume first: levels, rhythm, and the shape buyers will remember.' },
  { label: 'CONTEXT', src: PATEL.environment, alt: 'The Patel — Miami sunset skyline panorama', line: 'The Miami skyline the tower has to answer to.' },
  { label: 'THE UNIT', src: PATEL.unit.floorplan, alt: 'The Patel — Residence 1802 floor plan', line: 'Residence 1802: where one home lives inside the volume.' },
  { label: 'INSIDE', src: PATEL.interiors[0].src, alt: 'The Patel — interior render, Atlantic calm direction', line: 'Inside the residence: the Atlantic-calm interior direction.' },
  { label: 'THE STORY', src: PATEL.film.poster, alt: 'The Patel — hero still from the cinematic film', line: 'The hero frame of the film that carries the whole development.' },
];

const WHO_ROWS = [
  { who: 'DEVELOPERS', line: 'Sell the vision while the site is still a fence and a promise.', src: PATEL.tower[2].src, alt: 'The Patel tower in its Miami environment', caption: 'THE PATEL — MIAMI ENVIRONMENT' },
  { who: 'ARCHITECTS', line: 'Show the intent the drawings cannot carry into a boardroom.', src: PATEL.tower[3].src, alt: 'The Patel — rooftop amenity render', caption: 'THE PATEL — ROOFTOP' },
  { who: 'SALES TEAMS', line: 'Walk buyers from the skyline down to their own front door.', src: PATEL.interiors[1].src, alt: 'The Patel — interior render, sunset travertine direction', caption: 'THE PATEL — SUNSET TRAVERTINE INTERIOR' },
];

const FAQ = [
  ['What do you need to start a building visualization?', 'A massing or architectural model, the unit mix and level plans, and the identity the project should carry. If the model only exists as drawings, that is where we begin.'],
  ['Can buyers rely on the visuals for specifications?', 'No. Building visualization presents the project — sales and permit documentation remain the authority on specifications, dimensions, and finishes.'],
  ['We have the tower but no interiors yet. Too early?', 'No — scale is the first sale. The building story can lead while unit plans and interiors join later through the 3D floor plan method.'],
];

function Hero() {
  return (
    <section className="idv2-section idv2-dark idv2-acc-understand" style={{ background: 'radial-gradient(1000px 620px at 78% 8%, rgba(122,72,255,0.22), transparent 60%), radial-gradient(720px 480px at 10% 96%, rgba(216,183,90,0.1), transparent 55%), linear-gradient(180deg, #04060C, #0A0C16)' }}>
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1fr) 1.05fr', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'center', minHeight: '88svh' }}>
        <div style={{ display: 'grid', gap: 22 }}>
          <motion.div {...rise(0)}><Eyebrow>AYESMAJ STUDIOS / 3D BUILDING VISUALIZATION</Eyebrow></motion.div>
          <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero">
            Show<br />
            <span className="idv2-grad">the scale</span><br />
            before showing<br />
            the unit.
          </motion.h1>
          <motion.p {...rise(0.18)} className="idv-lede">{m.intro}</motion.p>
          <motion.div {...rise(0.28)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button type="button" className="idv-btn" style={{ background: 'transparent', color: 'var(--idv-champagne)', border: '1px solid rgba(216,183,90,0.75)' }}
              onClick={() => document.getElementById('scale-story')?.scrollIntoView({ behavior: 'smooth' })}>
              See the scale story
            </button>
            <IdvButton to="/Contact" ghost>{m.cta}</IdvButton>
          </motion.div>
          <motion.div {...rise(0.36)} className="idv-mono-label">ANSWERS: {m.question.toUpperCase()}</motion.div>
        </div>
        <motion.div {...rise(0.2)} style={{ position: 'relative' }}>
          <MediaFigure eager src={PATEL.tower[0].src} alt="The Patel — full tower at dusk, the development at skyline scale" ratio="wide" caption="THE PATEL — TOWER AT DUSK" tag="MIAMI DEVELOPMENT" />
          {HERO_CHIPS.map((c) => (
            <span key={c.text} className="idv2-float-label" style={c.style}>{c.text}</span>
          ))}
        </motion.div>
      </div>
      <MethodRail />
    </section>
  );
}

function BuildingInTheRound() {
  const trio = ['3d-floor-plan-apartment', '3d-floor-plan-house'];
  return (
    <section className="idv2-section idv2-spatial idv2-acc-understand">
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 'clamp(24px, 3.5vw, 56px)', alignItems: 'center' }}>
        <div className="idv2-reveal">
          <ModelViewer model={MODELS.featured} ratio="16 / 10" />
        </div>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 18 }}>
          <Eyebrow>THE REAL MODEL</Eyebrow>
          <h2 className="idv2-h2">The building <span className="idv2-acc-text">in the round.</span></h2>
          <p className="idv-lede">{MODELS.featured.line}</p>
          <div style={{ display: 'grid', marginTop: 8 }} aria-label="The understanding stage">
            {trio.map((k) => (
              <Link key={k} to={METHODS[k].route} className="idv2-line-link">
                {METHODS[k].label}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            ))}
            <Link to={IDV_BASE} className="idv2-line-link">
              All visualization methods
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ScaleStory() {
  return (
    <section id="scale-story" className="idv2-section idv2-dark idv2-acc-understand">
      <div className="idv2-inner idv2-section--flush" style={{ paddingBottom: 24 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>THE SCALE STORY</Eyebrow>
          <h2 className="idv2-h2">Skyline first, <span className="idv2-grad">front door last.</span></h2>
          <p className="idv-lede">Scroll: every frame below is The Patel — one development told from massing down to a single residence.</p>
        </div>
      </div>
      <PinSeq stages={SCALE_STORY} height="350vh" accentClass="idv2-acc-understand" ariaLabel="The Patel scale story, from massing to the film" />
    </section>
  );
}

function WhoNeedsThis() {
  return (
    <section className="idv2-section idv2-bright idv2-acc-understand">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(40px, 5vw, 72px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 14, maxWidth: 900 }}>
          <Eyebrow>WHO NEEDS THIS</Eyebrow>
          <h2 className="idv2-h2">Three audiences, <span className="idv2-acc-text">one tower.</span></h2>
        </div>
        {WHO_ROWS.map((r, i) => (
          <div key={r.who} className="idv2-reveal" style={{ display: 'grid', gridTemplateColumns: i % 2 ? '1.4fr 1fr' : '1fr 1.4fr', gap: 'clamp(20px, 3vw, 48px)', alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: 10, order: i % 2 ? 2 : 1 }}>
              <div className="idv-mono-label" style={{ color: 'var(--acc, #D8B75A)' }}>{r.who}</div>
              <p className="idv-lede" style={{ margin: 0, fontSize: 'clamp(19px, 1.8vw, 26px)' }}>{r.line}</p>
            </div>
            <div style={{ order: i % 2 ? 1 : 2 }}>
              <MediaFigure src={r.src} alt={r.alt} ratio="wide" caption={r.caption} tag="THE PATEL" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BuildingNeedsAWorld() {
  return (
    <section className="idv2-section idv2-dark idv2-acc-understand" style={{ background: '#0A0B0D' }}>
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 48px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 14, maxWidth: 940 }}>
          <Eyebrow>BEYOND THE RENDER</Eyebrow>
          <h2 className="idv2-h2">A building needs <span className="idv2-grad">a world.</span></h2>
          <p className="idv-lede" style={{ maxWidth: 760 }}>
            The Patel does not stop at the tower: the identity and the hero film carry the same project
            into decks, listings, and launch campaigns.
          </p>
        </div>
        <div className="idv2-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'clamp(20px, 3vw, 40px)', alignItems: 'stretch' }}>
          <figure style={{ margin: 0, display: 'grid', alignContent: 'center', gap: 14, borderRadius: 18, border: '1px solid rgba(216,183,90,0.35)', background: 'rgba(255,255,255,0.03)', padding: 'clamp(20px, 2.5vw, 36px)' }}>
            <img src={PATEL.brand} alt="The Patel — brand identity lockup" loading="lazy" decoding="async" style={{ width: '100%', borderRadius: 12 }} />
            <figcaption className="idv-mono-label" style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
              <span>PROJECT IDENTITY</span><span>THE PATEL</span>
            </figcaption>
          </figure>
          <MediaFigure video src={PATEL.film.desktop} poster={PATEL.unit.rooms[0].src} alt="The Patel — cinematic hero film" caption="THE PATEL — HERO FILM" tag="CINEMATIC" />
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="idv2-section idv2-bright">
      <div className="idv2-inner" style={{ display: 'grid', gap: 24, maxWidth: 980 }}>
        <Eyebrow>QUESTIONS DEVELOPERS ASK</Eyebrow>
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

export default function Interior3dBuilding() {
  return (
    <InteriorShell path={m.route}>
      <Hero />
      <BuildingInTheRound />
      <ScaleStory />
      <WhoNeedsThis />
      <BuildingNeedsAWorld />
      <div className="idv2-section idv2-gradient-soft idv2-acc-understand">
        <div className="idv2-inner idv2-section--flush" style={{ paddingTop: 'clamp(60px, 7vw, 110px)', paddingBottom: 'clamp(40px, 5vw, 80px)' }}>
          <MethodFacts method={m} />
          <MethodOutro method={m} methods={METHODS} />
        </div>
      </div>
      <Faq />
      {/* Portal image: film.poster already appears in the scale story above;
          the terrace render keeps the once-per-page rule honest. */}
      <NextPortal methodKey="3d-building-visualization" image={PATEL.unit.rooms[3].src} />
      <CtaBand
        eyebrow="AYESMAJ STUDIOS / 3D BUILDING VISUALIZATION"
        headline="The tower is the first sale. Make it undeniable."
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
