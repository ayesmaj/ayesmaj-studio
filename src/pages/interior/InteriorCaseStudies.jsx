/**
 * /interior-design/case-studies — cinematic index of the three case studies
 * (addendum §17): dark hero → full-width editorial chapter per case on
 * alternating grounds → FAQ → CTA. Copy from CASE_STUDIES, covers from
 * CASE_COVERS; the kind filter derives from c.kind, never invents cases.
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  InteriorShell, Eyebrow, IdvButton, MediaFigure, MethodRail, CtaBand,
} from '@/components/interior/kit';
import { IDV_BASE, IDV_EYEBROW, CASE_STUDIES, FINAL_CTA, METHODS } from '@/data/interiorDesign';
import { CASE_COVERS } from '@/data/interiorMedia';

/** What each cover image actually shows — honest, per-project alt text. */
const COVER_ALTS = {
  'poolside-villa': 'Poolside Villa — cinematic render of the pool at dusk, from the 29-frame master sequence',
  'maison-valmont': 'Maison Valmont — the restored interior, final state of the transformation',
  'the-patel': 'The Patel — the tower at dusk in its Miami environment',
};

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/** Kind tag derived from c.kind — the filter never invents a category. */
const tagOf = (c) => {
  const k = c.kind.toLowerCase();
  if (k.includes('development') || k.includes('building')) return 'BUILDING';
  if (k.includes('apartment')) return 'APARTMENT';
  return 'HOUSE';
};

const FILTERS = ['ALL', 'APARTMENT', 'HOUSE', 'BUILDING'];
const GROUNDS = ['idv2-bright', 'idv2-gradient-soft', 'idv2-dark'];

const FAQ = [
  ['Are the case-study images photographs of built spaces?', 'No. Every visual is a visualization produced from the project’s source material. Where existing-condition photography appears — as in Maison Valmont’s before states — it is labeled as existing.'],
  ['Does every case study include a finished film?', 'No. Maison Valmont and The Patel include rendered films, shown on their pages. Poolside Villa was delivered as plans, twenty-nine master frames and a film-ready storyboard — its film is directed, not rendered.'],
  ['What did each project start from?', 'Poolside Villa started from two flat floor plans. Maison Valmont started from the rooms as they exist today, ruined. The Patel started from a development that had to be sold at two scales — the building, then one residence.'],
];

function FilterChip({ label, active, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      style={{
        cursor: 'pointer', fontWeight: 700, fontSize: 10.5, letterSpacing: '0.16em', textTransform: 'uppercase',
        padding: '7px 14px', borderRadius: 999,
        border: `1px solid ${active ? 'var(--idv-champagne)' : 'rgba(255,255,255,0.25)'}`,
        background: active ? 'var(--idv-champagne)' : 'transparent',
        color: active ? '#07100A' : 'rgba(245,245,240,0.7)',
        transition: 'all 0.25s ease',
      }}
    >
      {label}
    </button>
  );
}

function Hero({ filter, setFilter }) {
  return (
    <section className="idv2-section idv2-dark idv2-acc-present" style={{ background: 'radial-gradient(900px 540px at 82% 0%, rgba(122,72,255,0.16), transparent 60%), radial-gradient(700px 460px at 8% 100%, rgba(216,183,90,0.13), transparent 55%), linear-gradient(180deg, #060708, #0B0C10)' }}>
      <div className="idv2-inner" style={{ display: 'grid', gap: 24, minHeight: '74svh', alignContent: 'center' }}>
        <motion.div {...rise(0)}><Eyebrow>{IDV_EYEBROW} / CASE STUDIES</Eyebrow></motion.div>
        <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero" style={{ maxWidth: 980 }}>
          From source material<br />
          to a complete<br />
          <span className="idv2-grad">visual world.</span>
        </motion.h1>
        <motion.p {...rise(0.18)} className="idv-lede" style={{ maxWidth: 760 }}>
          Three projects, three communication problems: a new-build house approved from flat plans,
          a restoration whose value was invisible in the ruined rooms, and a development that had to
          sell at two scales. Each case follows the same road.
        </motion.p>
        <motion.div {...rise(0.28)} role="group" aria-label="Filter case studies by project kind" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {FILTERS.map((f) => <FilterChip key={f} label={f} active={filter === f} onClick={() => setFilter(f)} />)}
        </motion.div>
      </div>
      <MethodRail />
    </section>
  );
}

/* ── One full-width editorial chapter per case ────────────────────────────── */
function CaseChapter({ c, index, ground }) {
  const dark = ground === 'idv2-dark';
  const words = c.name.split(' ');
  const last = words.pop();
  const chip = {
    fontFamily: 'var(--idv-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
    color: dark ? 'rgba(245,245,240,0.8)' : 'var(--idv-graphite)',
    border: `1px solid ${dark ? 'rgba(255,255,255,0.25)' : 'var(--idv-stone)'}`,
    borderRadius: 999, padding: '9px 16px',
    background: dark ? 'rgba(255,255,255,0.05)' : 'var(--idv-panel)',
  };
  return (
    <section className={`idv2-section ${ground} idv2-acc-present`}>
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(24px, 3vw, 44px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 14 }}>
          <div className="idv-mono-label">CASE 0{index + 1} / {c.kind.toUpperCase()}</div>
          <h2 className="idv2-h2">
            {words.join(' ')}{words.length ? ' ' : ''}<span className="idv2-acc-text">{last}.</span>
          </h2>
        </div>
        <MediaFigure
          src={CASE_COVERS[c.slug]}
          alt={COVER_ALTS[c.slug]}
          caption={c.name}
          tag={c.kind.toUpperCase()}
          eager={index === 0}
          className="idv2-reveal"
        />
        <div className="idv2-reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'clamp(20px, 3vw, 44px)', alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 10 }}>
            <div className="idv-mono-label">Audience</div>
            <p className="idv-lede" style={{ margin: 0 }}>{c.audience}</p>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <div className="idv-mono-label">The challenge</div>
            <p className="idv-lede" style={{ margin: 0 }}>{c.challenge}</p>
          </div>
          <div style={{ display: 'grid', gap: 16, alignContent: 'start' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }} aria-label={`${c.name} — methods used`}>
              {c.methods.map((m) => <span key={m} style={chip}>{m}</span>)}
            </div>
            <div>
              <IdvButton to={`${IDV_BASE}/case-studies/${c.slug}`} ghost>Read the case study</IdvButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Honest empty state — no apartment case is published; apartment work lives
    on the Canal Apartment method pages. */
function EmptyState() {
  return (
    <section className="idv2-section idv2-bright idv2-acc-present">
      <div className="idv2-inner" style={{ display: 'grid', gap: 18, maxWidth: 980 }}>
        <Eyebrow>NO PUBLISHED CASE YET</Eyebrow>
        <h2 className="idv2-h2">No apartment case study <span className="idv2-acc-text">— yet.</span></h2>
        <p className="idv-lede" style={{ margin: 0 }}>
          Apartment work currently lives on the method pages: the Canal Apartment runs through the
          AI scan and 3D floor-plan methods end to end.
        </p>
        <div>
          <IdvButton to={METHODS['ai-scan-apartment'].route} ghost>See the Canal Apartment scan</IdvButton>
        </div>
      </div>
    </section>
  );
}

function Faq({ ground }) {
  return (
    <section className={`idv2-section ${ground}`}>
      <div className="idv2-inner" style={{ display: 'grid', gap: 24, maxWidth: 980 }}>
        <Eyebrow>QUESTIONS ABOUT THE CASES</Eyebrow>
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

export default function InteriorCaseStudies() {
  const [filter, setFilter] = useState('ALL');
  const visible = CASE_STUDIES.filter((c) => filter === 'ALL' || tagOf(c) === filter);
  const lastGround = visible.length ? GROUNDS[(visible.length - 1) % GROUNDS.length] : 'idv2-bright';
  const faqGround = lastGround === 'idv2-bright' ? 'idv2-gradient-soft' : 'idv2-bright';
  return (
    <InteriorShell path={`${IDV_BASE}/case-studies`}>
      <Hero filter={filter} setFilter={setFilter} />
      {visible.length === 0
        ? <EmptyState />
        : visible.map((c, i) => (
            <CaseChapter key={c.slug} c={c} index={CASE_STUDIES.indexOf(c)} ground={GROUNDS[i % GROUNDS.length]} />
          ))}
      <Faq ground={faqGround} />
      <CtaBand
        eyebrow={IDV_EYEBROW}
        headline={FINAL_CTA.headline}
        copy={FINAL_CTA.copy}
        primary={FINAL_CTA.primary}
        secondary={{ label: 'Explore the methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
