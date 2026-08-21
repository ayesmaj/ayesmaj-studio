/**
 * /interior-design/compare-visualization-methods — the full comparison page.
 * Not a method page: intro → goal recommender → every COMPARISON dimension
 * with the winner's honest trade-off → closing statement → CTA.
 * All copy from @/data/interiorDesign; no media sections by design.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { InteriorShell, Eyebrow, SectionHead, IdvButton, CtaBand } from '@/components/interior/kit';
import { IDV_BASE, METHODS, COMPARISON, COMPARISON_VERDICT, GOALS, FINAL_CTA, IDV_EYEBROW } from '@/data/interiorDesign';

/* ── 1. Intro — smaller hub-style hero ────────────────────────────────────── */
function Intro() {
  return (
    <section className="idv-section" style={{ paddingTop: 'clamp(140px, 15vw, 200px)', display: 'grid', gap: 28 }}>
      <Eyebrow>COMPARE</Eyebrow>
      <h1 className="idv-display" style={{ maxWidth: 1000, fontSize: 'clamp(48px, 6vw, 96px)' }}>
        The best method depends on the <span className="idv-accent">next decision.</span>
      </h1>
      <p className="idv-lede">{COMPARISON_VERDICT.copy}</p>
    </section>
  );
}

/* ── 2. Choose your goal — recommender ────────────────────────────────────── */
function GoalPicker() {
  const [goal, setGoal] = useState(null);
  const picked = GOALS.find((g) => g.key === goal);
  return (
    <section className="idv-section idv-section--flush">
      <SectionHead
        eyebrow="START WITH THE GOAL"
        title="Choose your goal"
        lede="Pick the decision your client faces next. We answer with the visual stack that gets it approved."
      />
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} role="group" aria-label="Project goal">
        {GOALS.map((g) => (
          <button
            key={g.key}
            type="button"
            aria-pressed={goal === g.key}
            onClick={() => setGoal(g.key)}
            className="idv-btn"
            style={goal === g.key
              ? { background: 'var(--idv-ink)', color: 'var(--idv-porcelain)', border: '1px solid var(--idv-ink)' }
              : { background: '#fff', color: 'var(--idv-ink)', border: '1px solid var(--idv-stone)' }}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div aria-live="polite">
        {picked ? (
          <div style={{ marginTop: 36, border: '1px solid var(--idv-stone)', borderRadius: 18, background: '#fff', padding: 'clamp(24px, 3vw, 44px)', display: 'grid', gap: 18 }}>
            <div className="idv-mono-label">RECOMMENDED VISUAL SYSTEM</div>
            <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 12 }}>
              {picked.stack.map((key, i) => (
                <li key={key} style={{ display: 'flex', alignItems: 'baseline', gap: 16, borderTop: '1px solid var(--idv-stone)', paddingTop: 12 }}>
                  <span className="idv-stage-num">0{i + 1}</span>
                  <Link to={METHODS[key].route} style={{ fontFamily: 'var(--idv-serif)', fontSize: 'clamp(20px, 2vw, 30px)', color: 'inherit', textDecoration: 'none' }}>
                    {METHODS[key].label}
                  </Link>
                </li>
              ))}
            </ol>
            <div><IdvButton to="/Contact">Send this brief to AYESMAJ</IdvButton></div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

/* ── 3. Every dimension, honestly ─────────────────────────────────────────── */
function Dimensions() {
  return (
    <section className="idv-section">
      <SectionHead
        eyebrow="THE FULL COMPARISON"
        title="Every dimension, honestly."
        lede="Each dimension has one strongest method — and every winner carries an honest limit. Both are listed."
      />
      <div>
        {COMPARISON.map((row) => (
          <details key={row.dim} className="idv-row">
            <summary>
              <span>{row.dim}</span>
              <span className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{METHODS[row.best].label}</span>
            </summary>
            <div className="idv-row-body">
              <p className="idv-lede" style={{ margin: 0 }}>{row.note}</p>
              <p style={{ margin: '12px 0 0', fontSize: 14, lineHeight: 1.6, color: 'var(--idv-walnut)' }}>
                <span className="idv-mono-label" style={{ color: 'var(--idv-walnut)' }}>Trade-off</span>{' — '}
                {METHODS[row.best].limits[0]}
              </p>
              <Link to={METHODS[row.best].route} className="idv-mono-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 14, textDecoration: 'none' }}>
                {METHODS[row.best].label} <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ── 4. Closing statement ─────────────────────────────────────────────────── */
function Closing() {
  return (
    <section className="idv-section--bone">
      <div className="idv-inner idv-section">
        <h2 className="idv-h2 idv-reveal" style={{ maxWidth: 980 }}>
          Do not choose between clarity and emotion. Build a system that delivers both.
        </h2>
      </div>
    </section>
  );
}

export default function InteriorCompare() {
  return (
    <InteriorShell path={`${IDV_BASE}/compare-visualization-methods`}>
      <Intro />
      <GoalPicker />
      <Dimensions />
      <Closing />
      <CtaBand
        eyebrow={IDV_EYEBROW}
        headline="Build my visual stack"
        primary={FINAL_CTA.primary}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
