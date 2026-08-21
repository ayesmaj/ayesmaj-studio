/**
 * /interior-design/case-studies — index of the three case studies.
 * One editorial block per project, alternating image side. All copy from
 * @/data/interiorDesign (CASE_STUDIES); covers from @/data/interiorMedia.
 */
import React from 'react';
import {
  InteriorShell, Eyebrow, MediaFigure, IdvButton, CtaBand,
} from '@/components/interior/kit';
import { IDV_BASE, IDV_EYEBROW, CASE_STUDIES, FINAL_CTA } from '@/data/interiorDesign';
import { CASE_COVERS } from '@/data/interiorMedia';

/** What each cover image actually shows — honest, per-project alt text. */
const COVER_ALTS = {
  'poolside-villa': 'Poolside Villa — cinematic render of the pool at dusk, from the 29-frame master sequence',
  'maison-valmont': 'Maison Valmont — the restored interior, final state of the transformation',
  'the-patel': 'The Patel — the tower at dusk in its Miami environment',
};

/* ── 1. Intro ─────────────────────────────────────────────────────────────── */
function Intro() {
  return (
    <section className="idv-section" style={{ paddingTop: 'clamp(140px, 16vw, 220px)', display: 'grid', gap: 22 }}>
      <Eyebrow>CASE STUDIES</Eyebrow>
      <h1 className="idv-display" style={{ maxWidth: 1050 }}>
        From source material to complete visual world.
      </h1>
      <p className="idv-lede">
        Three projects, three communication problems: a new-build house approved from flat plans,
        a restoration whose value was invisible in the ruined rooms, and a development that had to
        sell at two scales. Each case follows the same road — from source material to a complete
        visual world.
      </p>
    </section>
  );
}

/* ── 2. One editorial block per case study ────────────────────────────────── */
function CaseBlock({ c, index }) {
  const cover = (
    <MediaFigure
      src={CASE_COVERS[c.slug]}
      alt={COVER_ALTS[c.slug]}
      caption={c.name}
      tag={c.kind.toUpperCase()}
      ratio="45"
      eager={index === 0}
    />
  );
  const text = (
    <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
      <div className="idv-mono-label">CASE 0{index + 1} / {c.kind.toUpperCase()}</div>
      <h2 className="idv-h2" style={{ fontSize: 'clamp(36px, 4vw, 62px)' }}>{c.name}</h2>
      <div style={{ display: 'grid', gap: 6 }}>
        <div className="idv-mono-label">Audience</div>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--idv-graphite)' }}>{c.audience}</p>
      </div>
      <p className="idv-lede" style={{ margin: 0 }}>{c.challenge}</p>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }} aria-label={`${c.name} — methods used`}>
        {c.methods.map((m) => (
          <span
            key={m}
            className="idv-mono-label"
            style={{ border: '1px solid var(--idv-stone)', borderRadius: 999, padding: '8px 14px', background: '#fff' }}
          >
            {m}
          </span>
        ))}
      </div>
      <div style={{ marginTop: 6 }}>
        <IdvButton to={`${IDV_BASE}/case-studies/${c.slug}`} ghost>Read the case study</IdvButton>
      </div>
    </div>
  );
  return (
    <div className="idv-grid-2 idv-reveal">
      {index % 2 === 0 ? <>{cover}{text}</> : <>{text}{cover}</>}
    </div>
  );
}

function CaseIndex() {
  return (
    <section className="idv-section idv-section--flush" style={{ display: 'grid', gap: 'clamp(72px, 8vw, 130px)' }}>
      {CASE_STUDIES.map((c, i) => <CaseBlock key={c.slug} c={c} index={i} />)}
    </section>
  );
}

export default function InteriorCaseStudies() {
  return (
    <InteriorShell path={`${IDV_BASE}/case-studies`}>
      <Intro />
      <CaseIndex />
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
