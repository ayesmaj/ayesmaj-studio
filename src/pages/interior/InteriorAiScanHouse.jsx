/**
 * /interior-design/ai-scan-house — Capture stage, house scale (addendum §8).
 * Larger in scope than the apartment exemplar: floors, garage, yard, pool
 * and footprint read as one property.
 *
 * Structure: dark hero (fan) → property layers (PinSeq) → use cases →
 * limitations → facts/outro → FAQ → next portal → CTA.
 *
 * Honesty rule carried from the audit: no fabricated scan or point-cloud
 * imagery. The Poolside Villa has no raw capture set — every frame here is
 * a real plan or finished visualization frame from that project, labeled as
 * such; the one Canal Apartment study is labeled as a study with
 * unverified boundaries.
 */
import React from 'react';
import { motion } from 'framer-motion';
import {
  InteriorShell, Eyebrow, IdvButton, MediaFigure, MethodRail, NextPortal,
  PinSeq, MethodFacts, MethodOutro, CtaBand,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE } from '@/data/interiorDesign';
import { VILLA, APARTMENT } from '@/data/interiorMedia';
import DarkSectionBackground from '@/components/interior/DarkSectionBackground';

const m = METHODS['ai-scan-house'];

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* One property, read layer by layer — all Poolside Villa. */
const LAYERS = [
  { label: 'GARAGE', src: VILLA.sequence[21].src, alt: 'Poolside Villa garage — the arrival and service layer', line: 'Arrival and service first: where cars, storage and daily logistics anchor the plan.' },
  { label: 'GROUND', src: VILLA.plans[0].src, alt: 'Poolside Villa ground floor plan', line: 'The ground plan holds the public life — entry, living, kitchen, and the route to the pool.' },
  { label: 'UPPER', src: VILLA.plans[1].src, alt: 'Poolside Villa upper floor plan', line: 'The upper plan holds the private life — bedrooms, baths, and how the stair divides them.' },
  { label: 'OUTDOOR', src: VILLA.sequence[23].src, alt: 'Poolside Villa outdoor lounge', line: 'Outdoor rooms count as rooms: the lounge and terrace extend the plan beyond the walls.' },
  { label: 'COMPLETE', src: VILLA.sequence[26].src, alt: 'Poolside Villa pool at water level — the complete property in one frame', line: 'Every layer resolves into one property the whole project can build on.' },
];

const USE_CASES = [
  {
    title: 'Whole-house renovation',
    copy: 'When every floor changes at once, the capture keeps one coherent picture: what stays, what moves, and how the levels keep working together while everything else shifts.',
    src: VILLA.sequence[11].src,
    alt: 'Poolside Villa family lounge — visualization frame from a whole-house project',
    caption: 'POOLSIDE VILLA — FAMILY LOUNGE',
    tag: 'RENOVATION',
  },
  {
    title: 'Additions and extensions',
    copy: 'An addition is argued against what exists. With the footprint and both floors captured, a new wing, balcony or level can be judged in context instead of imagination.',
    src: VILLA.sequence[22].src,
    alt: 'Poolside Villa balcony — visualization frame relevant to additions and extensions',
    caption: 'POOLSIDE VILLA — BALCONY',
    tag: 'ADDITION',
  },
  {
    title: 'Sales presentation',
    copy: 'Buyers purchase the whole property, not a room. A captured house gives a listing its full story — floors, garage, yard and outdoor living in one consistent set.',
    src: VILLA.sequence[24].src,
    alt: 'Poolside Villa outdoor kitchen — visualization frame for property presentation',
    caption: 'POOLSIDE VILLA — OUTDOOR KITCHEN',
    tag: 'SALES',
  },
];

const FAQ = [
  ['What do you need to capture a whole house?', 'Photos or video, inside and out; existing plans if any survive; and lot boundaries or a rough site sketch. Room-by-room coverage plus a walk around the exterior is enough to start.'],
  ['Can you capture the yard and site boundaries too?', 'The yard, pool and outdoor areas are part of the picture. Legal boundaries are not — those come from a survey, and nothing in a capture replaces one.'],
  ['Is a house scan a structural survey?', 'No. It is a design and communication foundation — not engineering, permit, or survey certification. Structural assumptions must be confirmed by professionals before work begins.'],
];

function Hero() {
  return (
    <section className="idv2-section idv2-dark idv2-acc-capture" style={{ background: 'radial-gradient(1000px 580px at 82% 0%, rgba(127,166,200,0.14), transparent 60%), radial-gradient(760px 480px at 8% 100%, rgba(163,91,218,0.12), transparent 55%), linear-gradient(180deg, #060708, #0B0C10)' }}>
      <DarkSectionBackground asset="geometric-facets" position="center right" overlay={0.6} textSide="left" glow="none" />
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1fr) 1.05fr', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'center', minHeight: '92svh' }}>
        <div style={{ display: 'grid', gap: 22 }}>
          <motion.div {...rise(0)}><Eyebrow>AYESMAJ STUDIOS / AI HOUSE SCAN</Eyebrow></motion.div>
          <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero">
            Turn the<br />
            <span className="idv2-acc-text">existing house</span><br />
            into a base<br />
            <span className="idv2-grad">for change.</span>
          </motion.h1>
          <motion.p {...rise(0.18)} className="idv-lede">
            A house is more than rooms. Floors, garage, yard, pool and the building footprint
            become one coherent picture the whole project can build on.
          </motion.p>
          <motion.div {...rise(0.28)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button type="button" className="idv-btn" style={{ background: 'transparent', color: 'var(--idv-champagne)', border: '1px solid rgba(216,183,90,0.75)' }}
              onClick={() => document.getElementById('house-layers')?.scrollIntoView({ behavior: 'smooth' })}>
              See the property layers
            </button>
            <IdvButton to="/Contact" ghost>Start a house project</IdvButton>
          </motion.div>
          <motion.div {...rise(0.36)} className="idv-mono-label">ANSWERS: {m.question.toUpperCase()}</motion.div>
        </div>
        {/* Property at every scale — real Poolside Villa frames, truthful labels */}
        <div className="idv2-fan" aria-label="Poolside Villa — the house at every scale, exterior to design base">
          {[
            { n: '01', t: 'THE PROPERTY', src: VILLA.sequence[0].src, alt: 'Poolside Villa exterior, front — the property as one volume' },
            { n: '02', t: 'ENTRY', src: VILLA.sequence[2].src, alt: 'Poolside Villa foyer — where the ground floor begins' },
            { n: '03', t: 'UPPER LEVEL', src: VILLA.sequence[12].src, alt: 'Poolside Villa primary bedroom on the upper level' },
            { n: '04', t: 'DESIGN BASE', src: VILLA.sequence[1].src, alt: 'Poolside Villa pool-side exterior — the design base for change' },
          ].map((p, i) => (
            <motion.div key={p.n} className="idv2-fan-card"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}>
              <img src={p.src} alt={p.alt} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" />
              <span className="idv-fan-label"><span className="idv-fan-num">{p.n}</span><span className="idv-fan-title">{p.t}</span></span>
            </motion.div>
          ))}
        </div>
      </div>
      <MethodRail />
    </section>
  );
}

function PropertyLayers() {
  return (
    <section id="house-layers" className="idv2-section idv2-gradient-soft idv2-acc-capture">
      <div className="idv2-inner idv2-section--flush" style={{ paddingBottom: 24 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>PROPERTY LAYERS</Eyebrow>
          <h2 className="idv2-h2">Read the property <span className="idv2-acc-text">in layers.</span></h2>
          <p className="idv-lede">
            Scroll: garage, ground floor, upper floor, outdoor living, complete property.
            Every frame below is from one project — the Poolside Villa — its real plans and
            finished visualization frames, honestly labeled.
          </p>
        </div>
      </div>
      <PinSeq stages={LAYERS} height="380vh" accentClass="idv2-acc-capture" ariaLabel="Poolside Villa property layers, garage to complete house" />
    </section>
  );
}

function UseCases() {
  return (
    <section className="idv2-section idv2-bright idv2-acc-capture">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(48px, 6vw, 90px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>USE CASES</Eyebrow>
          <h2 className="idv2-h2">One capture, <span className="idv2-grad">three jobs.</span></h2>
        </div>
        {USE_CASES.map((u, i) => (
          <div key={u.title} className="idv2-reveal" style={{ display: 'grid', gridTemplateColumns: i % 2 ? '1.4fr 1fr' : '1fr 1.4fr', gap: 'clamp(24px, 3.5vw, 56px)', alignItems: 'center' }}>
            <div style={{ display: 'grid', gap: 14, order: i % 2 ? 2 : 1 }}>
              <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{'0' + (i + 1)}</div>
              <h3 className="idv2-h2" style={{ fontSize: 'clamp(30px, 3.4vw, 52px)' }}>{u.title}</h3>
              <p className="idv-lede" style={{ margin: 0 }}>{u.copy}</p>
            </div>
            <MediaFigure src={u.src} alt={u.alt} caption={u.caption} tag={u.tag} className="" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Limitations() {
  return (
    <section className="idv2-section idv2-spatial idv2-acc-capture idv2-bgc idv2-bgc-02">
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(24px, 3.5vw, 56px)', alignItems: 'center' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 18 }}>
          <Eyebrow>HONEST LIMITS</Eyebrow>
          <h2 className="idv2-h2">Site truth requires <span className="idv2-grad">professionals.</span></h2>
          <div style={{ display: 'grid', gap: 0 }}>
            {m.limits.map((l) => (
              <p key={l} className="idv-lede" style={{ borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: 12, margin: '0 0 12px' }}>{l}</p>
            ))}
            <p className="idv-lede" style={{ borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: 12, margin: 0 }}>
              Lot lines in generated imagery are illustrative. Legal boundaries, easements and
              site conditions come from a survey — never from a picture.
            </p>
          </div>
        </div>
        <figure className="idv-figure idv-figure--frame idv2-reveal" style={{ margin: 0 }}>
          <img src={APARTMENT.studies[6].src} alt="Canal Apartment waterfront study — a generated study of how a property meets its site, boundaries unverified" loading="lazy" decoding="async" style={{ borderRadius: 18 }} />
          <figcaption style={{ color: 'rgba(245,245,240,0.6)' }}><span>STUDY — BOUNDARIES UNVERIFIED</span><span>CANAL APARTMENT</span></figcaption>
        </figure>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="idv2-section idv2-gradient-soft">
      <div className="idv2-inner" style={{ display: 'grid', gap: 24, maxWidth: 980 }}>
        <Eyebrow>QUESTIONS OWNERS ASK</Eyebrow>
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

export default function InteriorAiScanHouse() {
  return (
    <InteriorShell path={m.route}>
      <Hero />
      <PropertyLayers />
      <UseCases />
      <Limitations />
      <div className="idv2-section idv2-bright idv2-acc-capture">
        <div className="idv2-inner idv2-section--flush" style={{ paddingTop: 'clamp(60px, 7vw, 110px)', paddingBottom: 'clamp(40px, 5vw, 80px)' }}>
          <MethodFacts method={m} />
          <MethodOutro method={m} methods={METHODS} />
        </div>
      </div>
      <Faq />
      <NextPortal methodKey="ai-scan-house" image={VILLA.sequence[10].src} />
      <CtaBand
        eyebrow="AYESMAJ STUDIOS / AI HOUSE SCAN"
        headline="The whole property, captured. Now show how it connects."
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
