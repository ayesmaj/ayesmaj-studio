/**
 * /interior-design/3d-floor-plan-house — dramatic multi-level subpage
 * (addendum §10, accent: understand gold → ember).
 *
 * Structure: dark hero with GROUND/UPPER floor switcher → pinned multi-level
 * flow → full-bleed indoor/outdoor threshold → honest limitation → interactive
 * house model → facts / outro / FAQ → next portal → CTA.
 *
 * Honesty rule carried from the audit: every frame is the real Poolside Villa
 * master set; the study figure is a labeled Canal Apartment study; the GLB is
 * a labeled showcase model, not a client project.
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  InteriorShell, Eyebrow, IdvButton, MediaFigure, MethodSwitcher, MethodRail,
  NextPortal, PinSeq, MethodFacts, MethodOutro, CtaBand,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE } from '@/data/interiorDesign';
import { VILLA, APARTMENT, MODELS } from '@/data/interiorMedia';
import ModelViewer from '@/components/interior/ModelViewer';
import DarkSectionBackground from '@/components/interior/DarkSectionBackground';

const m = METHODS['3d-floor-plan-house'];

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* One project thread — the Poolside Villa walked level by level. */
const SEQ = [
  { label: 'ENTRY', src: VILLA.sequence[2].src, alt: 'Poolside Villa foyer — where the ground-floor route begins', line: 'The plan starts where the client does: the entry, and everything it must reach.' },
  { label: 'STAIR', src: VILLA.sequence[10].src, alt: 'Poolside Villa staircase connecting ground and upper floor', line: 'Stair alignment is the spine of a multi-level plan — both floors organize around it.' },
  { label: 'PRIVATE LEVEL', src: VILLA.sequence[12].src, alt: 'Poolside Villa primary bedroom on the private upper level', line: 'Upstairs the plan turns private: bedrooms pulled away from the public rooms below.' },
  { label: 'LOOKOUT', src: VILLA.sequence[13].src, alt: 'Poolside Villa primary bedroom view back over the property', line: 'From the primary bedroom the plan looks back over everything it organized.' },
  { label: 'BALCONY', src: VILLA.sequence[22].src, alt: 'Poolside Villa balcony where the upper level steps outside', line: 'The upper level ends outdoors — the balcony closes the loop the entry opened.' },
];

const THRESHOLD_LABELS = [
  { text: 'Living to terrace', style: { left: '6%', top: '16%' } },
  { text: 'Kitchen to outdoor dining', style: { right: '8%', top: '24%' } },
  { text: 'Primary to balcony', style: { left: '10%', bottom: '34%' } },
  { text: 'Pool to landscape', style: { right: '12%', bottom: '26%' } },
];

const FAQ = [
  ['What do you need to build the 3D house plan?', 'Plans or a house scan, the level heights and stair positions, and your outdoor priorities — pool, lounge, kitchen. The stair and level data is what keeps both floors locked to each other.'],
  ['Can I take this plan to a contractor or a permit office?', 'No. The 3D plan communicates the design so people can understand and approve it. Structural, engineering, and permit documentation is a separate, professional deliverable it does not replace.'],
  ['When is the right moment to change the layout?', 'Now, at plan stage — plans change cheapest. Every layout change approved on the plan saves far more expensive changes to renders and film later.'],
];

function Hero() {
  const [floor, setFloor] = useState('ground');
  const plan = floor === 'ground' ? VILLA.plans[0] : VILLA.plans[1];
  return (
    <section className="idv2-section idv2-dark idv2-acc-understand" style={{ background: 'radial-gradient(1000px 560px at 82% 0%, rgba(216,183,90,0.14), transparent 60%), radial-gradient(720px 480px at 8% 100%, rgba(224,102,75,0.12), transparent 55%), linear-gradient(180deg, #070605, #0C0B09)' }}>
      <DarkSectionBackground asset="architectural-grid" position="right bottom" overlay={0.6} textSide="left" glow="gold" />
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1fr) 1.15fr', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'center', minHeight: '88svh' }}>
        <div style={{ display: 'grid', gap: 22 }}>
          <motion.div {...rise(0)}><Eyebrow>AYESMAJ STUDIOS / 3D HOUSE FLOOR PLAN</Eyebrow></motion.div>
          <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero">
            Understand<br />
            <span className="idv2-grad">the whole home</span><br />
            before entering<br />
            a room.
          </motion.h1>
          <motion.p {...rise(0.18)} className="idv-lede">
            Multi-level living is hard to read from flat drawings. A 3D house plan shows both
            floors as one system — zones, stair, and the route from garage to kitchen to pool.
          </motion.p>
          <motion.div {...rise(0.28)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button type="button" className="idv-btn" style={{ background: 'transparent', color: 'var(--idv-champagne)', border: '1px solid rgba(216,183,90,0.75)' }}
              onClick={() => document.getElementById('level-flow')?.scrollIntoView({ behavior: 'smooth' })}>
              Walk the levels
            </button>
            <IdvButton to="/Contact" ghost>Start a house project</IdvButton>
          </motion.div>
          <motion.div {...rise(0.36)} className="idv-mono-label">ANSWERS: {m.question.toUpperCase()}</motion.div>
        </div>
        <motion.div {...rise(0.2)} style={{ display: 'grid', gap: 18 }}>
          <MethodSwitcher
            ariaLabel="Choose a floor"
            value={floor}
            onChange={setFloor}
            options={[{ key: 'ground', label: 'Ground floor' }, { key: 'upper', label: 'Upper floor' }]}
          />
          <MediaFigure
            src={plan.src}
            alt={`Poolside Villa — ${plan.label.toLowerCase()} in 3D`}
            caption={`POOLSIDE VILLA — ${plan.label.toUpperCase()}`}
            tag={floor === 'ground' ? 'PUBLIC LEVEL' : 'PRIVATE LEVEL'}
            eager
          />
        </motion.div>
      </div>
      <MethodRail />
    </section>
  );
}

function LevelFlow() {
  return (
    <section id="level-flow" className="idv2-section idv2-spatial idv2-acc-understand idv2-bgc idv2-bgc-04">
      <div className="idv2-inner idv2-section--flush" style={{ paddingBottom: 24 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>MULTI-LEVEL FLOW</Eyebrow>
          <h2 className="idv2-h2">Two floors, <span className="idv2-grad">one route.</span></h2>
          <p className="idv-lede">
            Scroll: the same Poolside Villa, walked the way a plan is read — entry to stair to
            the private level and back out. Stair alignment is the spine; everything else hangs on it.
          </p>
        </div>
      </div>
      <PinSeq stages={SEQ} height="380vh" accentClass="idv2-acc-understand" ariaLabel="Poolside Villa multi-level route from entry to balcony" />
    </section>
  );
}

function IndoorOutdoor() {
  return (
    <section className="idv2-full idv2-acc-understand">
      <img src={VILLA.sequence[25].src} alt="Poolside Villa pool terrace — where the indoor plan continues outdoors" loading="lazy" decoding="async" />
      <div className="idv2-full-scrim" style={{ background: 'linear-gradient(180deg, rgba(6,5,4,0.55), rgba(6,5,4,0.2) 42%, rgba(6,5,4,0.62))' }} />
      {THRESHOLD_LABELS.map((l) => (
        <span key={l.text} className="idv2-float-label" style={l.style}>{l.text}</span>
      ))}
      <div className="idv2-inner" style={{ position: 'relative', display: 'grid', gap: 14, alignSelf: 'end', width: '100%' }}>
        <Eyebrow>INDOOR / OUTDOOR</Eyebrow>
        <h2 className="idv2-h2" style={{ maxWidth: 860 }}>
          The house does not stop <span className="idv2-grad">at the wall.</span>
        </h2>
        <p className="idv-lede" style={{ maxWidth: 640, color: 'rgba(245,245,240,0.82)', paddingBottom: 'clamp(30px, 4vw, 60px)' }}>
          A house plan earns its keep at the thresholds: every room that opens outdoors is a
          decision the flat drawing hides and the 3D plan makes obvious.
        </p>
      </div>
    </section>
  );
}

function Limitation() {
  return (
    <section className="idv2-section idv2-bright idv2-acc-understand">
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 'clamp(24px, 3.5vw, 56px)', alignItems: 'center' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 18 }}>
          <Eyebrow>HONEST LIMITS</Eyebrow>
          <h2 className="idv2-h2">A visual plan is not <span className="idv2-acc-text">a permit set.</span></h2>
          <div style={{ display: 'grid', gap: 0 }}>
            {m.limits.map((l) => (
              <p key={l} className="idv-lede" style={{ borderTop: '1px solid var(--idv-stone)', paddingTop: 12, margin: '0 0 12px' }}>{l}</p>
            ))}
            <p className="idv-lede" style={{ borderTop: '1px solid var(--idv-stone)', paddingTop: 12, margin: 0 }}>
              Use it to decide and to agree — then hand the agreed layout to the professionals
              who produce the structural, engineering, and permit drawings.
            </p>
          </div>
        </div>
        <div className="idv2-reveal">
          <MediaFigure
            src={APARTMENT.studies[5].src}
            alt="Canal Apartment sunroom study — a visual plan study, not a permit drawing"
            caption="CANAL APARTMENT — SUNROOM STUDY"
            tag="VISUAL STUDY, NOT A PERMIT DRAWING"
          />
        </div>
      </div>
    </section>
  );
}

function TurnTheHouse() {
  return (
    <section className="idv2-section idv2-spatial idv2-acc-understand idv2-bgc idv2-bgc-08 idv2-stage-section">
      <div className="idv2-stage" aria-label="Interactive 3D model stage">
        <ModelViewer model={MODELS.spaces[2]} auto stage shift={0.17} />
      </div>
      <div className="idv2-inner idv2-stage-copy">
        <div className="idv2-reveal idv2-stage-col">
          <Eyebrow>INTERACTIVE</Eyebrow>
          <h2 className="idv2-h2">Turn the whole idea <span className="idv2-grad">in your hands.</span></h2>
          <p className="idv-lede">
            A page can only show one angle at a time. A model can show them all — drag the
            coastal hillside house and read its levels, terraces, and site drop yourself.
            It is a showcase model, labeled as such, and it loads as you arrive.
          </p>
        </div>
      </div>
    </section>
  );
}

function FactsAndFaq() {
  return (
    <section className="idv2-section idv2-bright idv2-acc-understand">
      <div className="idv2-inner idv2-section--flush" style={{ paddingTop: 'clamp(60px, 7vw, 110px)', paddingBottom: 'clamp(60px, 7vw, 110px)', display: 'grid', gap: 40 }}>
        <MethodFacts method={m} />
        <MethodOutro method={m} methods={METHODS} />
        <div style={{ display: 'grid', gap: 24, maxWidth: 980 }}>
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
      </div>
    </section>
  );
}

export default function Interior3dPlanHouse() {
  return (
    <InteriorShell path={m.route}>
      <Hero />
      <LevelFlow />
      <IndoorOutdoor />
      <Limitation />
      <TurnTheHouse />
      <FactsAndFaq />
      <NextPortal methodKey="3d-floor-plan-house" image={VILLA.sequence[4].src} />
      <CtaBand
        eyebrow="AYESMAJ STUDIOS / 3D HOUSE FLOOR PLAN"
        headline="Understood the whole home? Now let the client feel it."
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
