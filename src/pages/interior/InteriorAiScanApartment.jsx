/**
 * /interior-design/ai-scan-apartment — EXEMPLAR subpage for the addendum
 * redesign: dark technical capture world (accent: technical blue → violet).
 *
 * Structure (addendum §3/§7): hero → what exists → pinned transformation →
 * before/after → what the client understands (floating labels) → honest
 * limitations → facts → FAQ → next portal → CTA.
 *
 * Honesty rule carried from the audit: no fabricated point-cloud imagery —
 * every stage uses real Canal Apartment assets (source frames, plan studies,
 * finished rooms) with truthful labels.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import {
  InteriorShell, Eyebrow, IdvButton, MethodRail, NextPortal, PinSeq,
  MethodFacts, MethodOutro, CtaBand,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE } from '@/data/interiorDesign';
import { APARTMENT, VILLA } from '@/data/interiorMedia';
import BeforeAfterSlider from '@/components/ayesmaj/BeforeAfterSlider';

const m = METHODS['ai-scan-apartment'];

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* One project thread — Canal Apartment studies resolving into a finished room. */
const SEQ = [
  { label: 'PLAN STUDY', src: APARTMENT.studies[4].src, alt: 'Canal Apartment overview plan study', line: 'Rooms, openings and fixed elements organized into a readable study.' },
  { label: 'ROOM STUDY', src: APARTMENT.studies[2].src, alt: 'Canal Apartment kitchen plan study', line: 'Each room resolves into its own working study.' },
  { label: 'EDITORIAL RESULT', src: APARTMENT.gallery[3].src, alt: 'Canal Apartment living room as finished editorial visual', line: 'The study becomes a design-ready room: material, light, atmosphere.' },
];

const CLIENT_LABELS = [
  { text: 'Existing room structure', style: { left: '6%', top: '14%' } },
  { text: 'Where furniture can change', style: { left: '10%', bottom: '20%' } },
  { text: 'How rooms connect', style: { right: '8%', top: '20%' } },
  { text: 'Which walls may be reconsidered', style: { right: '12%', bottom: '30%' } },
  { text: 'Still requires on-site verification', style: { left: '42%', bottom: '8%' } },
];

const FAQ = [
  ['What do you need from me to start?', 'Phone photos or video of each room, any plan you have — even hand-drawn — and rough overall dimensions if you know them. That is enough for the first pass.'],
  ['Is the scan accurate enough to build from?', 'No, and it is not meant to be. It is a design and communication foundation. Key measurements are verified on site before any construction decision.'],
  ['How fast is it?', 'The capture pass is the fastest method in the system — built to be ready for your first client conversation, not your permit application.'],
];

function Hero() {
  return (
    <section className="idv2-section idv2-dark idv2-acc-capture" style={{ background: 'radial-gradient(900px 540px at 80% 0%, rgba(127,166,200,0.14), transparent 60%), radial-gradient(700px 460px at 10% 100%, rgba(163,91,218,0.12), transparent 55%), linear-gradient(180deg, #060708, #0B0C10)' }}>
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1fr) 1.05fr', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'center', minHeight: '88svh' }}>
        <div style={{ display: 'grid', gap: 22 }}>
          <motion.div {...rise(0)}><Eyebrow>AYESMAJ STUDIOS / AI APARTMENT SCAN</Eyebrow></motion.div>
          <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero">
            Capture the<br />
            <span className="idv2-acc-text">apartment</span><br />
            before you<br />
            <span className="idv2-grad">change it.</span>
          </motion.h1>
          <motion.p {...rise(0.18)} className="idv-lede">
            Turn photos, plans and existing-condition information into a visual foundation for
            renovation, furniture planning and early design conversations.
          </motion.p>
          <motion.div {...rise(0.28)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button type="button" className="idv-btn" style={{ background: 'transparent', color: 'var(--idv-champagne)', border: '1px solid rgba(216,183,90,0.75)' }}
              onClick={() => document.getElementById('scan-seq')?.scrollIntoView({ behavior: 'smooth' })}>
              See the scan workflow
            </button>
            <IdvButton to="/Contact" ghost>Start an apartment project</IdvButton>
          </motion.div>
          <motion.div {...rise(0.36)} className="idv-mono-label">ANSWERS: {m.question.toUpperCase()}</motion.div>
        </div>
        {/* Layered capture system — real assets, truthful labels */}
        <div className="idv2-fan" aria-label="Canal Apartment — from plan studies to design-ready rooms">
          {[
            { n: '01', t: 'PLAN STUDY', src: APARTMENT.studies[0].src },
            { n: '02', t: 'STUDY', src: APARTMENT.studies[5].src },
            { n: '03', t: 'EDITORIAL', src: APARTMENT.gallery[2].src },
            { n: '04', t: 'DESIGN-READY', src: APARTMENT.gallery[0].src },
          ].map((p, i) => (
            <motion.div key={p.n} className="idv2-fan-card"
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}>
              <img src={p.src} alt={`Canal Apartment — ${p.t.toLowerCase()}`} loading={i < 2 ? 'eager' : 'lazy'} decoding="async" />
              <span className="idv-fan-label"><span className="idv-fan-num">{p.n}</span><span className="idv-fan-title">{p.t}</span></span>
            </motion.div>
          ))}
        </div>
      </div>
      <MethodRail />
    </section>
  );
}

function WhatExists() {
  return (
    <section className="idv2-section idv2-bright idv2-acc-capture">
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 'clamp(24px, 3.5vw, 56px)', alignItems: 'center' }} >
        <figure className="idv-figure idv-figure--frame idv2-reveal" style={{ margin: 0 }}>
          <img src={APARTMENT.studies[3].src} alt="Canal Apartment living plan study with detected structure" loading="lazy" decoding="async" style={{ borderRadius: 18 }} />
          <figcaption><span>CANAL APARTMENT — PLAN STUDY</span><span>WHAT EXISTS</span></figcaption>
        </figure>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16 }}>
          <h2 className="idv2-h2">Start with the space <span className="idv2-acc-text">that is real.</span></h2>
          <p className="idv-lede">The capture pass reads what a redesign has to respect:</p>
          <div style={{ display: 'grid', gap: 0 }}>
            {['Walls and openings', 'Rooms and circulation', 'Fixed elements', 'Existing furniture', 'Areas requiring verification'].map((it) => (
              <div key={it} style={{ borderTop: '1px solid var(--idv-stone)', padding: '12px 2px', fontFamily: 'var(--idv-serif)', fontWeight: 600, fontSize: 'clamp(17px, 1.6vw, 23px)' }}>{it}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Transformation() {
  return (
    <section id="scan-seq" className="idv2-section idv2-dark idv2-acc-capture idv2-bgc idv2-bgc-02">
      <div className="idv2-inner idv2-section--flush" style={{ paddingBottom: 24 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>THE SCAN WORKFLOW</Eyebrow>
          <h2 className="idv2-h2">From study to <span className="idv2-acc-text">design-ready.</span></h2>
          <p className="idv-lede">Scroll: real Canal Apartment studies resolving into a finished, design-ready room — honestly labeled at each stage.</p>
        </div>
      </div>
      <PinSeq stages={SEQ} height="380vh" accentClass="idv2-acc-capture" ariaLabel="Canal Apartment study-to-room transformation" />
    </section>
  );
}

function RawVsReady() {
  const pair = APARTMENT.pair; // terrace: surviving raw + fresh generation
  return (
    <section className="idv2-section idv2-dark idv2-acc-capture idv2-bgc idv2-bgc-06" style={{ background: '#0A0B0D' }}>
      <div className="idv2-inner" style={{ display: 'grid', gap: 24 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 14, maxWidth: 900 }}>
          <Eyebrow>RAW SOURCE ↔ DESIGN-READY BASE</Eyebrow>
          <h2 className="idv2-h2">Drag the terrace.</h2>
        </div>
        <BeforeAfterSlider beforeImg={pair.raw} afterImg={pair.editorial} beforeLabel="RAW SOURCE" afterLabel="DESIGN-READY" accent="#7FA6C8" accentRGB="127,166,200" />
        <div className="idv-grid-2" style={{ maxWidth: 980 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>WHAT CHANGED</div>
            <p className="idv-lede" style={{ margin: 0 }}>Material realism, light and atmosphere — the geometry, openings and furniture positions stayed locked.</p>
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>WHAT STILL NEEDS MEASURING</div>
            <p className="idv-lede" style={{ margin: 0 }}>Critical dimensions, hidden systems and structural conditions — verified professionally before construction.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MorePairs() {
  // kitchen, bath, canal, primary: none of these images appear elsewhere on this page
  const rooms = ['kitchen', 'bath', 'canal', 'primary'];
  const picks = APARTMENT.pairs.filter((p) => rooms.includes(p.room));
  return (
    <section className="idv2-section idv2-dark idv2-acc-capture idv2-bgc idv2-bgc-08">
      <div className="idv2-inner" style={{ display: 'grid', gap: 24 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 14, maxWidth: 900 }}>
          <Eyebrow>EVERY ROOM, THE SAME HONESTY</Eyebrow>
          <h2 className="idv2-h2">Source on the left. <span className="idv2-acc-text">Design-ready on the right.</span></h2>
          <p className="idv-lede">Each editorial was generated from its own raw frame with the architecture locked — geometry, openings and furniture positions unchanged.</p>
        </div>
        <div className="idv-grid-2">
          {picks.map((p) => (
            <div key={p.room} style={{ display: 'grid', gap: 10 }}>
              <BeforeAfterSlider beforeImg={p.raw} afterImg={p.editorial} beforeLabel="RAW SOURCE" afterLabel="DESIGN-READY" accent="#7FA6C8" accentRGB="127,166,200" />
              <div className="idv-mono-label">CANAL APARTMENT — {p.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientUnderstands() {
  return (
    <section className="idv2-full idv2-acc-capture">
      <img src={APARTMENT.gallery[1].src} alt="Canal Apartment lounge — what the client now understands about the space" loading="lazy" decoding="async" />
      <div className="idv2-full-scrim" style={{ background: 'linear-gradient(180deg, rgba(5,6,8,0.55), rgba(5,6,8,0.25) 40%, rgba(5,6,8,0.6))' }} />
      {CLIENT_LABELS.map((l) => (
        <span key={l.text} className="idv2-float-label" style={l.style}>{l.text}</span>
      ))}
      <div className="idv2-inner" style={{ position: 'relative', display: 'grid', gap: 14, alignSelf: 'end', width: '100%' }}>
        <Eyebrow>WHAT THE CLIENT NOW UNDERSTANDS</Eyebrow>
        <h2 className="idv2-h2" style={{ maxWidth: 760, paddingBottom: 'clamp(30px, 4vw, 60px)' }}>
          The apartment stops being <span className="idv2-grad">an abstraction.</span>
        </h2>
      </div>
    </section>
  );
}

function Limitations() {
  return (
    <section className="idv2-section idv2-spatial idv2-acc-capture idv2-bgc idv2-bgc-08">
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 'clamp(24px, 3.5vw, 56px)', alignItems: 'center' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 18 }}>
          <Eyebrow>HONEST LIMITS</Eyebrow>
          <h2 className="idv2-h2">Fast does not <span className="idv2-acc-text">mean final.</span></h2>
          <div style={{ display: 'grid', gap: 0 }}>
            {m.limits.map((l) => (
              <p key={l} className="idv-lede" style={{ borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: 12, margin: '0 0 12px' }}>{l}</p>
            ))}
            <p className="idv-lede" style={{ borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: 12, margin: 0 }}>
              Hidden systems cannot be known from images alone; structural conditions require professionals.
            </p>
          </div>
        </div>
        <figure className="idv-figure idv-figure--frame idv2-reveal" style={{ margin: 0 }}>
          <img src={APARTMENT.studies[1].src} alt="Canal Apartment dining plan study with areas marked for on-site verification" loading="lazy" decoding="async" style={{ borderRadius: 18 }} />
          <figcaption style={{ color: 'rgba(245,245,240,0.6)' }}><span>PLAN STUDY — VERIFICATION AREAS</span><span>CANAL APARTMENT</span></figcaption>
        </figure>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="idv2-section idv2-bright">
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

export default function InteriorAiScanApartment() {
  return (
    <InteriorShell path={m.route}>
      <Hero />
      <WhatExists />
      <Transformation />
      <RawVsReady />
      <MorePairs />
      <ClientUnderstands />
      <div className="idv2-section idv2-bright idv2-acc-capture">
        <div className="idv2-inner idv2-section--flush" style={{ paddingTop: 'clamp(60px, 7vw, 110px)', paddingBottom: 'clamp(40px, 5vw, 80px)' }}>
          <MethodFacts method={m} />
          <MethodOutro method={m} methods={METHODS} />
        </div>
      </div>
      <Limitations />
      <Faq />
      <NextPortal methodKey="ai-scan-apartment" image={VILLA.plans[0].src} />
      <CtaBand
        eyebrow="AYESMAJ STUDIOS / AI APARTMENT SCAN"
        headline="Captured the space? Now make it understandable."
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
