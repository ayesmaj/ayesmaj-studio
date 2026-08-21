/**
 * /interior-design/complete-visual-presentation — the complete AYESMAJ
 * universe (addendum §15). Accent: present (gold → purple).
 *
 * Structure: dark collage hero → complete workflow PinSeq (Maison Valmont,
 * discover-to-market condensed to five honest chapters) → deliverable
 * builder (interactive, no pricing) → presentation craft grid → facts /
 * outro → FAQ → next portal → CTA.
 *
 * Honesty: every frame is Maison Valmont, labeled with its real stage; the
 * workflow chapters say where DISCOVER/BRAND/MARKET were condensed; the film
 * poster is shown as a poster frame of the real transformation film.
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import {
  InteriorShell, Eyebrow, IdvButton, MethodRail, NextPortal, PinSeq,
  MethodFacts, MethodOutro, CtaBand,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE } from '@/data/interiorDesign';
import { VALMONT } from '@/data/interiorMedia';

const m = METHODS['complete-visual-presentation'];

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* Hero collage — four visual languages, one project, truthful labels. */
const COLLAGE = [
  { n: '01', t: 'FILM — OPENING POSTER', src: VALMONT.film.posterEmpty, alt: 'Maison Valmont transformation film opening poster, the house in its existing state', style: { left: '0%', top: '4%', width: '46%', aspectRatio: '3/4', zIndex: 2 } },
  { n: '02', t: 'PROCESS — EXISTING', src: VALMONT.process[0].src, alt: 'Maison Valmont existing state, first frame of the process sequence', style: { right: '2%', top: '0%', width: '42%', aspectRatio: '16/10' } },
  { n: '03', t: 'DETAIL SEQUENCE', src: VALMONT.gallery[5].src, alt: 'Maison Valmont detail sequence frame from the gallery', style: { right: '0%', bottom: '5%', width: '44%', aspectRatio: '16/10', zIndex: 3 } },
  { n: '04', t: 'MATERIAL — FRENCH OAK', src: VALMONT.materials[1].src, alt: 'Maison Valmont french oak material study', style: { left: '8%', bottom: '0%', width: '30%', aspectRatio: '1/1' } },
];

/* The seven-stage method workflow, condensed to five honest chapters —
   every frame is the same Maison Valmont restoration. */
const SEQ = [
  { label: 'CAPTURE', src: VALMONT.process[1].src, alt: 'Maison Valmont demolition stage of the restoration process', line: 'DISCOVER + CAPTURE, condensed: the project begins in the real building — Maison Valmont documented down to its bones.' },
  { label: 'VISUALIZE', src: VALMONT.process[3].src, alt: 'Maison Valmont architecture stage of the restoration process', line: 'The captured shell becomes proposed architecture: volumes, openings and light, before any material is chosen.' },
  { label: 'EXPERIENCE', src: VALMONT.process[5].src, alt: 'Maison Valmont interiors stage of the restoration process', line: 'Interiors, materials and atmosphere — the stage where the client stops reading the design and starts feeling it.' },
  { label: 'PRESENT', src: VALMONT.gallery[7].src, alt: 'Maison Valmont restored entrance, wide gallery frame', line: 'BRAND + PRESENT, condensed: one identity carries the restored entrance into the deck, the website, the meeting.' },
  { label: 'REVEAL', src: VALMONT.process[7].src, alt: 'Maison Valmont reveal stage, final frame of the restoration process', line: 'REVEAL + MARKET: the finished world ships as a campaign — film, launch imagery and social cuts from the same frames.' },
];

/* Deliverable builder — the modular system, no pricing. */
const DELIVERABLES = [
  { key: 'scan', label: 'AI Scan', note: 'Existing-condition capture' },
  { key: 'plan3d', label: '3D Floor Plan', note: 'Furnished spatial logic' },
  { key: 'render', label: 'Interior Renders', note: 'Photoreal rooms and materials' },
  { key: 'film', label: 'Cinematic Film', note: 'Movement, light, atmosphere' },
  { key: 'brand', label: 'Brand Identity', note: 'Name, logo, typography, color' },
  { key: 'website', label: 'Website', note: 'The project as a destination' },
  { key: 'deck', label: 'Sales Deck', note: 'Built for the decision moment' },
  { key: 'social', label: 'Social Campaign', note: 'Launch-ready cuts and posts' },
];

/* Presentation craft — the working assets the presentation layer composes. */
const CRAFT = [
  { src: VALMONT.materials[2].src, alt: 'Maison Valmont boiserie material study', cap: 'BOISERIE — MATERIAL STUDY', ratio: '1/1' },
  { src: VALMONT.materials[4].src, alt: 'Maison Valmont limestone material study', cap: 'LIMESTONE — MATERIAL STUDY', ratio: '1/1' },
  { src: VALMONT.gallery[9].src, alt: 'Maison Valmont restored ceiling detail', cap: 'CEILING DETAIL', ratio: '1/1' },
];

const FAQ = [
  ['Do we have to take every deliverable?', 'No. The system is modular — no project is forced to take every deliverable. Pick the visual languages the decision moment actually needs; a renovation approval and a development launch need different stacks.'],
  ['What do you need to start?', 'The visual assets from the earlier stages if they exist, the audience and the decision at stake, and your launch or presentation deadline. That defines the stack.'],
  ['Can you build the presentation if the visuals do not exist yet?', 'Yes — that is what the earlier stages are for. Capture, plans, renders and film produce the assets; the presentation layer composes them into identity, deck, website and campaign.'],
];

function Hero() {
  return (
    <section className="idv2-section idv2-dark idv2-acc-present" style={{ background: 'radial-gradient(950px 560px at 82% 0%, rgba(122,72,255,0.16), transparent 60%), radial-gradient(760px 480px at 8% 100%, rgba(216,183,90,0.15), transparent 55%), linear-gradient(180deg, #060607, #0C0A10)' }}>
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1fr) 1.05fr', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'center', minHeight: '88svh' }}>
        <div style={{ display: 'grid', gap: 22 }}>
          <motion.div {...rise(0)}><Eyebrow>AYESMAJ STUDIOS / COMPLETE VISUAL PRESENTATION</Eyebrow></motion.div>
          <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero">
            One project.<br />
            One studio.<br />
            <span className="idv2-grad">Every visual</span><br />
            <span className="idv2-grad">language</span> it needs.
          </motion.h1>
          <motion.p {...rise(0.18)} className="idv-lede">
            Visualization wins understanding; presentation wins decisions. Identity, website, deck
            and social content turn the visuals into a system built for approval, sales and launch.
          </motion.p>
          <motion.div {...rise(0.28)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button type="button" className="idv-btn" style={{ background: 'transparent', color: 'var(--idv-champagne)', border: '1px solid rgba(216,183,90,0.75)' }}
              onClick={() => document.getElementById('complete-workflow')?.scrollIntoView({ behavior: 'smooth' })}>
              See the complete workflow
            </button>
            <IdvButton to="/Contact" ghost>{m.cta}</IdvButton>
          </motion.div>
          <motion.div {...rise(0.36)} className="idv-mono-label">ANSWERS: {m.question.toUpperCase()}</motion.div>
        </div>
        {/* Floating frames — four languages of the same Maison Valmont project */}
        <div className="idv2-collage" style={{ minHeight: '62vh' }} aria-label="Maison Valmont across four visual languages">
          <div className="idv2-glow-gold" style={{ left: '-10%', top: '-8%' }} />
          <div className="idv2-glow-purple" style={{ right: '-8%', bottom: '-10%' }} />
          {COLLAGE.map((f, i) => (
            <motion.div key={f.n} className="idv2-collage-frame" style={f.style}
              initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}>
              <img src={f.src} alt={f.alt} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
              <span className="idv-fan-label"><span className="idv-fan-num">{f.n}</span><span className="idv-fan-title">{f.t}</span></span>
            </motion.div>
          ))}
        </div>
      </div>
      <MethodRail />
    </section>
  );
}

function CompleteWorkflow() {
  return (
    <section id="complete-workflow" className="idv2-section idv2-spatial idv2-acc-present">
      <div className="idv2-inner idv2-section--flush" style={{ paddingBottom: 24 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 960 }}>
          <Eyebrow>THE COMPLETE WORKFLOW</Eyebrow>
          <h2 className="idv2-h2">Seven stages, <span className="idv2-acc-text">one thread.</span></h2>
          <p className="idv-lede">
            {m.workflow.join(' → ')} — condensed here into five chapters. Scroll: every frame is the
            same Maison Valmont restoration, labeled at its real stage.
          </p>
        </div>
      </div>
      <PinSeq stages={SEQ} height="420vh" accentClass="idv2-acc-present" ariaLabel="Maison Valmont — the complete workflow from capture to reveal" />
    </section>
  );
}

function DeliverableBuilder() {
  const [picked, setPicked] = useState(() => new Set());
  const toggle = (key) => setPicked((prev) => {
    const next = new Set(prev);
    if (next.has(key)) next.delete(key); else next.add(key);
    return next;
  });
  const chosen = DELIVERABLES.filter((d) => picked.has(d.key));
  return (
    <section className="idv2-section idv2-bright idv2-acc-present">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 3.5vw, 48px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 960 }}>
          <Eyebrow>DELIVERABLE BUILDER</Eyebrow>
          <h2 className="idv2-h2">Assemble <span className="idv2-grad">your stack.</span></h2>
          <p className="idv-lede">{m.limits[0]} Tap the languages your decision moment needs.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'clamp(20px, 2.5vw, 36px)', alignItems: 'start' }}>
          <div role="group" aria-label="Choose deliverables" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
            {DELIVERABLES.map((d) => {
              const on = picked.has(d.key);
              return (
                <button key={d.key} type="button" aria-pressed={on} onClick={() => toggle(d.key)}
                  style={{
                    display: 'grid', gap: 4, textAlign: 'left', cursor: 'pointer',
                    padding: '14px 16px', borderRadius: 14,
                    border: on ? '1px solid var(--idv-champagne)' : '1px solid var(--idv-stone)',
                    background: on ? 'var(--idv-ink)' : '#FFFDF9',
                    color: on ? '#FAF7F1' : 'var(--idv-ink)',
                    transition: 'background 0.25s ease, color 0.25s ease, border-color 0.25s ease',
                  }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--idv-serif)', fontWeight: 600, fontSize: 'clamp(16px, 1.4vw, 20px)' }}>
                    {on ? <Check size={15} aria-hidden="true" style={{ color: 'var(--idv-champagne)' }} /> : null}{d.label}
                  </span>
                  <span style={{ fontSize: 12, letterSpacing: '0.04em', opacity: 0.72 }}>{d.note}</span>
                </button>
              );
            })}
          </div>
          <div style={{ display: 'grid', gap: 16, alignContent: 'start', background: '#0B0A09', border: '1px solid rgba(216,183,90,0.45)', borderRadius: 18, padding: 'clamp(22px, 2.5vw, 34px)', color: '#F5F5F0' }}>
            <div className="idv-mono-label" style={{ color: 'rgba(245,245,240,0.6)' }}>
              YOUR VISUAL BRIEF — {chosen.length} OF {DELIVERABLES.length} LANGUAGES
            </div>
            {chosen.length === 0 ? (
              <p className="idv-lede" style={{ margin: 0, color: 'rgba(245,245,240,0.74)' }}>
                Nothing selected yet. Start with what the client must understand — the summary builds here.
              </p>
            ) : (
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid' }}>
                {chosen.map((d, i) => (
                  <li key={d.key} style={{ display: 'flex', gap: 12, alignItems: 'baseline', borderTop: '1px solid rgba(255,255,255,0.14)', padding: '10px 2px' }}>
                    <span className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontFamily: 'var(--idv-serif)', fontWeight: 600, fontSize: 'clamp(16px, 1.5vw, 21px)' }}>{d.label}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(245,245,240,0.6)', textAlign: 'right' }}>{d.note}</span>
                  </li>
                ))}
              </ul>
            )}
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, color: 'rgba(245,245,240,0.6)' }}>
              Bring this list to the first conversation — we scope only what the decision needs, in the order the stages demand.
            </p>
            <div><IdvButton to="/Contact">Send my visual brief</IdvButton></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PresentationCraft() {
  return (
    <section className="idv2-section idv2-dark idv2-acc-present" style={{ background: '#0A0908' }}>
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(26px, 3vw, 44px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>PRESENTATION CRAFT</Eyebrow>
          <h2 className="idv2-h2">The details carry <span className="idv2-grad">the argument.</span></h2>
          <p className="idv-lede">
            A deck is only as strong as its frames. These are working assets the presentation layer
            composes — material studies, a restored detail, and the transformation film's poster
            frame. All Maison Valmont.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(16px, 2vw, 28px)' }}>
          {CRAFT.map((c) => (
            <figure key={c.src} className="idv-figure idv-figure--frame idv2-reveal" style={{ margin: 0 }}>
              <img src={c.src} alt={c.alt} loading="lazy" decoding="async" style={{ aspectRatio: c.ratio, objectFit: 'cover', borderRadius: 16, width: '100%' }} />
              <figcaption style={{ color: 'rgba(245,245,240,0.6)' }}><span>{c.cap}</span><span>MAISON VALMONT</span></figcaption>
            </figure>
          ))}
        </div>
        <figure className="idv-figure idv-figure--frame idv2-reveal" style={{ margin: 0 }}>
          <img src={VALMONT.film.poster} alt="Maison Valmont transformation film poster frame" loading="lazy" decoding="async" style={{ aspectRatio: '21/9', objectFit: 'cover', borderRadius: 18, width: '100%' }} />
          <figcaption style={{ color: 'rgba(245,245,240,0.6)' }}><span>TRANSFORMATION FILM — POSTER FRAME</span><span>MAISON VALMONT</span></figcaption>
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

export default function InteriorCompletePresentation() {
  return (
    <InteriorShell path={m.route}>
      <Hero />
      <CompleteWorkflow />
      <DeliverableBuilder />
      <PresentationCraft />
      <div className="idv2-section idv2-gradient-soft idv2-acc-present">
        <div className="idv2-inner idv2-section--flush" style={{ paddingTop: 'clamp(60px, 7vw, 110px)', paddingBottom: 'clamp(40px, 5vw, 80px)' }}>
          <MethodFacts method={m} />
          <MethodOutro method={m} methods={METHODS} />
        </div>
      </div>
      <Faq />
      <NextPortal methodKey="complete-visual-presentation" image={VALMONT.after[5].src} />
      <CtaBand
        eyebrow="AYESMAJ STUDIOS / COMPLETE VISUAL PRESENTATION"
        headline="Every language, one decision moment."
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
