/**
 * /interior-design/compare-visualization-methods — interactive comparison
 * WORLD (addendum §14). Not a method page: no MethodIntro/Facts/Outro and no
 * NextPortal. Accent: present (gold → violet).
 *
 * Structure: dark hero (verdict + Poolside Villa fan) → goal selector
 * (GOALS chips → recommended stack) → one-method-at-a-time switcher
 * (METHOD_ORDER + COMPARISON rows, never all methods' text at once) →
 * closing stack statement → FAQ → CTA.
 *
 * Honesty: every image labeled with its real project; the villa "upper plan"
 * card stays labeled as a plan (it is not a 3D view); no invented stats.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  InteriorShell, Eyebrow, IdvButton, MediaFigure, MethodSwitcher, MethodRail, CtaBand,
} from '@/components/interior/kit';
import {
  METHODS, METHOD_ORDER, GOALS, COMPARISON, COMPARISON_VERDICT, STAGES, IDV_BASE,
} from '@/data/interiorDesign';
import { VILLA, APARTMENT, VALMONT } from '@/data/interiorMedia';

const ROUTE = `${IDV_BASE}/compare-visualization-methods`;

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* One method-family image per stage — real projects, truthful labels. */
const STAGE_MEDIA = {
  capture: { src: APARTMENT.pair.raw, alt: 'Canal Apartment canal-side room as raw captured source', caption: 'CANAL APARTMENT — RAW SOURCE', tag: 'CAPTURE' },
  understand: { src: APARTMENT.studies[0].src, alt: 'Canal Apartment bath plan study', caption: 'CANAL APARTMENT — PLAN STUDY', tag: 'UNDERSTAND' },
  experience: { src: VALMONT.gallery[2].src, alt: 'Maison Valmont restored dining room visualization', caption: 'MAISON VALMONT — RESTORED DINING', tag: 'EXPERIENCE' },
  present: { src: VALMONT.gallery[4].src, alt: 'Maison Valmont restored suite visualization', caption: 'MAISON VALMONT — RESTORED SUITE', tag: 'PRESENT' },
};

const FAQ = [
  ['Which method should we start with?', 'Scan first. Capture reality before proposing anything — the fastest pass in the system exists so the first client conversation starts from what actually exists.'],
  ['Why not go straight to renders or film?', 'Because plans change cheapest. Every approved plan change saves ten expensive render changes, and a film cannot rescue a weak base — the plan stays the spatial source of truth.'],
  ['Do we need every method?', 'No. The system is modular — no project is forced to take every deliverable. The right stack depends on what the client needs to understand next and on the decision at stake.'],
];

/* ── HERO — dark, the verdict up front ────────────────────────────────────── */
function Hero() {
  return (
    <section className="idv2-section idv2-dark idv2-acc-present" style={{ background: 'radial-gradient(1000px 560px at 80% 0%, rgba(122,72,255,0.16), transparent 60%), radial-gradient(720px 460px at 10% 100%, rgba(216,183,90,0.12), transparent 55%), linear-gradient(180deg, #060708, #0B0C10)' }}>
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1fr) 1.05fr', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'center', minHeight: '88svh' }}>
        <div style={{ display: 'grid', gap: 22 }}>
          <motion.div {...rise(0)}><Eyebrow>AYESMAJ STUDIOS / COMPARE VISUALIZATION METHODS</Eyebrow></motion.div>
          <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero">
            Which method<br />
            is best?<br />
            <span className="idv2-grad">None of them<br />
            alone.</span>
          </motion.h1>
          <motion.p {...rise(0.18)} className="idv-lede">{COMPARISON_VERDICT.copy}</motion.p>
          <motion.div {...rise(0.28)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button type="button" className="idv-btn" style={{ background: 'transparent', color: 'var(--idv-champagne)', border: '1px solid rgba(216,183,90,0.75)' }}
              onClick={() => document.getElementById('goal-selector')?.scrollIntoView({ behavior: 'smooth' })}>
              Find my visual stack
            </button>
            <IdvButton to={IDV_BASE} ghost>All visualization methods</IdvButton>
          </motion.div>
        </div>
        {/* One project through the stack — Poolside Villa, truthful labels */}
        <div className="idv2-fan" aria-label="Poolside Villa — the same house from plan to render detail">
          {[
            { n: '01', t: 'PLAN', src: VILLA.plans[0].src, alt: 'Poolside Villa ground floor plan' },
            { n: '02', t: 'UPPER PLAN', src: VILLA.plans[1].src, alt: 'Poolside Villa upper floor plan' },
            { n: '03', t: 'RENDER', src: VILLA.sequence[6].src, alt: 'Poolside Villa dining room render' },
            { n: '04', t: 'DETAIL', src: VILLA.sequence[16].src, alt: 'Poolside Villa primary bath detail render' },
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

/* ── 01 · GOAL SELECTOR — the hub recommender, promoted to a full section ── */
function GoalSelector() {
  const [goal, setGoal] = useState(null);
  const picked = GOALS.find((g) => g.key === goal);
  return (
    <section id="goal-selector" className="idv2-section idv2-bright idv2-acc-present">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(26px, 3.5vw, 44px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 980 }}>
          <Eyebrow>GOAL SELECTOR</Eyebrow>
          <h2 className="idv2-h2">Start from what the client <span className="idv2-grad">needs to understand.</span></h2>
          <p className="idv-lede">Pick the goal. The stack — the methods in the right order — follows from it.</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} role="group" aria-label="Project goal">
          {GOALS.map((g) => (
            <button key={g.key} type="button" aria-pressed={goal === g.key} onClick={() => setGoal(g.key)} className="idv-btn"
              style={goal === g.key
                ? { background: 'var(--idv-ink)', color: '#FAF7F1', border: '1px solid var(--idv-ink)', padding: '11px 20px', fontSize: 12 }
                : { background: '#FFFDF9', color: 'var(--idv-ink)', border: '1px solid var(--idv-stone)', padding: '11px 20px', fontSize: 12 }}>
              {g.label}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          {picked ? (
            <div style={{ display: 'grid', gap: 12, borderTop: '1px solid var(--idv-stone)', paddingTop: 'clamp(20px, 2.5vw, 32px)' }}>
              <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>RECOMMENDED VISUAL STACK — {picked.label.toUpperCase()}</div>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                {picked.stack.map((key, i) => (
                  <li key={key} style={{ display: 'flex', alignItems: 'baseline', gap: 14, borderTop: '1px solid var(--idv-stone)', paddingTop: 10 }}>
                    <span className="idv-mono-label">0{i + 1}</span>
                    <Link to={METHODS[key].route} style={{ fontFamily: 'var(--idv-serif)', fontWeight: 600, fontSize: 'clamp(17px, 1.6vw, 24px)', color: 'inherit', textDecoration: 'none' }}>{METHODS[key].label}</Link>
                    <span className="idv-mono-label" style={{ marginLeft: 'auto' }}>{METHODS[key].question.toUpperCase()}</span>
                  </li>
                ))}
              </ol>
              <div><IdvButton to="/Contact">Send this brief to AYESMAJ</IdvButton></div>
            </div>
          ) : (
            <p className="idv-mono-label" style={{ margin: 0 }}>SELECT A GOAL TO SEE ITS RECOMMENDED STACK.</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── 02 · ONE METHOD AT A TIME — switcher, never all eight at once ────────── */
function MethodExplorer() {
  const [active, setActive] = useState(METHOD_ORDER[0]);
  const m = METHODS[active];
  const media = STAGE_MEDIA[m.stage];
  const wins = COMPARISON.filter((row) => row.best === active);
  return (
    <section className="idv2-section idv2-gradient-soft idv2-acc-present">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(26px, 3.5vw, 44px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 980 }}>
          <Eyebrow>ONE METHOD AT A TIME</Eyebrow>
          <h2 className="idv2-h2">Each method answers <span className="idv2-grad">one question.</span></h2>
          <p className="idv-lede">Switch through the eight methods. Each card shows what it answers, where it wins, and where it honestly stops.</p>
        </div>
        <div style={{ maxWidth: '100%', overflowX: 'auto', paddingBottom: 6 }}>
          <MethodSwitcher
            ariaLabel="Visualization method"
            options={METHOD_ORDER.map((k) => ({ key: k, label: METHODS[k].label.replace('AI ', '').replace('3D ', '') }))}
            value={active}
            onChange={setActive}
          />
        </div>
        <div aria-live="polite" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.15fr', gap: 'clamp(24px, 3.5vw, 56px)', alignItems: 'start' }}>
          <MediaFigure src={media.src} alt={media.alt} caption={media.caption} tag={media.tag} ratio="45" />
          <div style={{ display: 'grid', gap: 18 }}>
            <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>ANSWERS: {m.question.toUpperCase()}</div>
            <h3 className="idv2-h2" style={{ fontSize: 'clamp(32px, 3.4vw, 54px)' }}>{m.label}</h3>
            <div style={{ display: 'grid', gap: 8 }}>
              <div className="idv-mono-label">BEST FOR</div>
              <p className="idv-lede" style={{ margin: 0 }}>{m.bestFor.join(' · ')}</p>
            </div>
            {wins.length > 0 ? (
              <div style={{ display: 'grid', gap: 0 }}>
                <div className="idv-mono-label" style={{ paddingBottom: 8 }}>WHERE IT WINS THE COMPARISON</div>
                {wins.map((row) => (
                  <div key={row.dim} style={{ borderTop: '1px solid var(--idv-stone)', padding: '10px 2px', display: 'grid', gap: 2 }}>
                    <span style={{ fontFamily: 'var(--idv-serif)', fontWeight: 600, fontSize: 'clamp(16px, 1.5vw, 21px)' }}>{row.dim}</span>
                    <span style={{ fontSize: 14.5, lineHeight: 1.5, color: 'var(--idv-graphite)' }}>{row.note}</span>
                  </div>
                ))}
              </div>
            ) : null}
            <div style={{ display: 'grid', gap: 0 }}>
              <div className="idv-mono-label" style={{ paddingBottom: 8 }}>HONEST LIMITS</div>
              {m.limits.map((l) => (
                <p key={l} style={{ borderTop: '1px solid var(--idv-stone)', padding: '10px 2px', margin: 0, fontSize: 14.5, lineHeight: 1.5, color: 'var(--idv-graphite)' }}>{l}</p>
              ))}
            </div>
            <div>
              <Link to={m.route} className="idv-btn idv-btn--ghost" style={{ padding: '11px 20px', fontSize: 13 }}>
                Explore {m.label} <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 03 · CLOSING — the stack, not the method ─────────────────────────────── */
function StackStatement() {
  return (
    <section className="idv2-section idv2-spatial idv2-acc-present">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(24px, 3vw, 40px)', maxWidth: 1200 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16 }}>
          <Eyebrow>THE VERDICT</Eyebrow>
          <h2 className="idv2-h2" style={{ maxWidth: 980 }}>
            The method is not the product. <span className="idv2-grad">The stack is.</span>
          </h2>
          <p className="idv-lede" style={{ maxWidth: 760 }}>
            {COMPARISON_VERDICT.question} {COMPARISON_VERDICT.answer} Each stage hands its answer to the next —
            capture what exists, understand the layout, experience the feeling, then present the decision.
          </p>
        </div>
        <div className="idv2-reveal" style={{ display: 'flex', gap: 'clamp(10px, 1.5vw, 20px)', flexWrap: 'wrap', alignItems: 'center' }} aria-label="The four stages in order">
          {STAGES.map((s, i) => (
            <React.Fragment key={s.key}>
              {i > 0 ? <ArrowRight size={16} aria-hidden="true" style={{ color: 'var(--idv-champagne)', flexShrink: 0 }} /> : null}
              <span style={{ display: 'grid', gap: 4, padding: '14px 20px', borderRadius: 14, border: '1px solid rgba(255,255,255,0.18)', background: 'rgba(255,255,255,0.04)' }}>
                <span className="idv-mono-label">{s.num} · {s.title.toUpperCase()}</span>
                <span style={{ fontFamily: 'var(--idv-serif)', fontWeight: 600, fontSize: 'clamp(15px, 1.4vw, 19px)' }}>{s.question}</span>
              </span>
            </React.Fragment>
          ))}
        </div>
        <hr className="idv2-acc-rule" />
      </div>
    </section>
  );
}

/* ── 04 · FAQ ─────────────────────────────────────────────────────────────── */
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

export default function InteriorCompare() {
  return (
    <InteriorShell path={ROUTE}>
      <Hero />
      <GoalSelector />
      <MethodExplorer />
      <StackStatement />
      <Faq />
      <CtaBand
        eyebrow="AYESMAJ STUDIOS / COMPARE VISUALIZATION METHODS"
        headline="Stop choosing a method. Build the stack."
        primary={{ label: 'Build my visual stack', to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
