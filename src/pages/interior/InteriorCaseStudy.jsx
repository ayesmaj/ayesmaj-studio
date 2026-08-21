/**
 * /interior-design/case-studies/:slug — one case study, told with its own
 * project's media only. Copy comes from CASE_STUDIES; media from interiorMedia.
 * Unknown slugs redirect to the case-study index.
 */
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  InteriorShell, Eyebrow, SectionHead, MediaFigure, CtaBand,
} from '@/components/interior/kit';
import { IDV_BASE, CASE_STUDIES } from '@/data/interiorDesign';
import { VILLA, VALMONT, PATEL, PROJECTS } from '@/data/interiorMedia';
import BeforeAfterSlider from '@/components/ayesmaj/BeforeAfterSlider';

const ACCENT = '#B79661';
const ACCENT_RGB = '183,150,97';

/* ── Shared header ────────────────────────────────────────────────────────── */
function CaseHeader({ study }) {
  return (
    <section className="idv-section" style={{ paddingTop: 'clamp(140px, 16vw, 220px)', display: 'grid', gap: 22 }}>
      <Eyebrow>CASE STUDY</Eyebrow>
      <div className="idv-mono-label">{study.kind}</div>
      <h1 className="idv-display" style={{ maxWidth: 1050 }}>{study.name}</h1>
      <div className="idv-grid-2" style={{ marginTop: 18 }}>
        <div style={{ display: 'grid', gap: 22, alignContent: 'start' }}>
          <div style={{ display: 'grid', gap: 10 }}>
            <div className="idv-mono-label">Audience</div>
            <p className="idv-lede" style={{ margin: 0 }}>{study.audience}</p>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <div className="idv-mono-label">The challenge</div>
            <p className="idv-lede" style={{ margin: 0 }}>{study.challenge}</p>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
          <div className="idv-mono-label">Why this system</div>
          <p className="idv-lede" style={{ margin: 0 }}>{study.why}</p>
        </div>
      </div>
    </section>
  );
}

/* ── Poolside Villa — plans → 29-frame sequence → contact sheet ───────────── */
function PoolsideVilla() {
  const captions = ['Ground floor', 'Upper floor'];
  return (
    <>
      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="POOLSIDE VILLA — SOURCE"
          title="Two plans anchor the geometry."
          lede="Every frame that follows defers to these drawings. The plans are the spatial source of truth."
        />
        <div className="idv-grid-2">
          {VILLA.plans.map((p, i) => (
            <MediaFigure
              key={p.src}
              src={p.src}
              alt={`Poolside Villa ${captions[i].toLowerCase()} plan — the spatial source of truth for the sequence`}
              caption={`Poolside Villa — ${captions[i]}`}
              tag="SOURCE — spatial truth"
              ratio="wide"
            />
          ))}
        </div>
      </section>

      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="POOLSIDE VILLA — SEQUENCE"
          title="The 29-frame sequence."
          lede="From the front door to the pool at water level: one consistent architecture, walked room by room."
        />
        <div className="idv-strip idv-reveal" aria-label="Poolside Villa 29-frame sequence">
          {VILLA.sequence.map((f, i) => (
            <MediaFigure
              key={f.src}
              src={f.src}
              alt={`Poolside Villa — ${f.label}`}
              caption={`${String(i + 3).padStart(2, '0')} — ${f.label}`}
              ratio="45"
            />
          ))}
        </div>
      </section>

      <section className="idv-section idv-section--flush">
        <SectionHead eyebrow="POOLSIDE VILLA — FILM PREP" title="The sequence, laid out for film." />
        <MediaFigure
          src={VILLA.contactSheet}
          alt="Poolside Villa film contact sheet: the master frames arranged in shooting order"
          caption="Film contact sheet"
          tag="POOLSIDE VILLA"
        />
      </section>
    </>
  );
}

/* ── Maison Valmont — before/after → process → film → materials ───────────── */
function MaisonValmont() {
  const rooms = ['Salon', 'Dining', 'Entrance'];
  const pairs = rooms.map((r) => VALMONT.pairs.find((p) => p.room === r)).filter(Boolean);
  return (
    <>
      <section className="idv-section idv-section--flush" style={{ display: 'grid', gap: 'clamp(36px, 5vw, 64px)' }}>
        <SectionHead
          eyebrow="MAISON VALMONT — BEFORE AND AFTER"
          title="The same rooms, two states."
          lede="The value of the restoration is invisible in the ruined rooms. These pairs make it tangible."
        />
        {pairs.map((p) => (
          <div key={p.room} style={{ display: 'grid', gap: 12 }}>
            <BeforeAfterSlider
              beforeImg={p.before}
              afterImg={p.after}
              beforeLabel="EXISTING"
              afterLabel="RESTORED"
              accent={ACCENT}
              accentRGB={ACCENT_RGB}
            />
            <div className="idv-mono-label">Maison Valmont — {p.room}</div>
          </div>
        ))}
      </section>

      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="MAISON VALMONT — PROCESS"
          title="The road between the two states."
          lede="Eight stages, in build order, so the owners could see the path — not just the destination."
        />
        <div className="idv-strip idv-reveal" aria-label="Maison Valmont renovation stages">
          {VALMONT.process.map((p, i) => (
            <MediaFigure
              key={p.src}
              src={p.src}
              alt={`Maison Valmont renovation stage: ${p.label}`}
              caption={`0${i + 1} — ${p.label}`}
              ratio="45"
            />
          ))}
        </div>
      </section>

      <section className="idv-section idv-section--flush">
        <SectionHead eyebrow="MAISON VALMONT — FILM" title="The reveal, delivered as film." />
        <MediaFigure
          video
          src={VALMONT.film.src}
          poster={VALMONT.film.poster}
          alt="Maison Valmont transformation film, from existing condition to restored rooms"
          caption="Maison Valmont — transformation film"
          tag="FILM"
          ratio="wide"
        />
      </section>

      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="MAISON VALMONT — MATERIALS"
          title="The material library."
          lede="Deliverable imagery from the project itself — the finishes the restored rooms are built from."
        />
        <div className="idv-grid-4">
          {VALMONT.materials.slice(0, 8).map((m) => (
            <MediaFigure
              key={m.src}
              src={m.src}
              alt={`Maison Valmont material: ${m.label}`}
              caption={m.label}
              ratio="sq"
            />
          ))}
        </div>
      </section>
    </>
  );
}

/* ── The Patel — tower → residence → film → identity ──────────────────────── */
function ThePatel() {
  return (
    <>
      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="THE PATEL — SCALE"
          title="The building at skyline scale."
          lede="A development sells twice. The first sale is the tower itself, in its Miami light."
        />
        <MediaFigure
          src={PATEL.tower[0].src}
          alt={`The Patel — ${PATEL.tower[0].label}: the Miami tower at skyline scale`}
          caption={`The Patel — ${PATEL.tower[0].label}`}
          tag="BUILDING VISUALIZATION"
          ratio="wide"
          eager
        />
        <div className="idv-grid-3" style={{ marginTop: 'clamp(18px, 2.5vw, 36px)' }}>
          {PATEL.tower.slice(1).map((t) => (
            <MediaFigure
              key={t.src}
              src={t.src}
              alt={`The Patel — ${t.label}`}
              caption={`The Patel — ${t.label}`}
              ratio="45"
            />
          ))}
        </div>
      </section>

      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="THE PATEL — RESIDENCE 1802"
          title="The drill-down into one residence."
          lede="The second sale is the unit: its own plan, its own rooms, carried by the same identity."
        />
        <MediaFigure
          src={PATEL.unit.floorplan}
          alt="The Patel, Residence 1802 — unit floor plan"
          caption="The Patel — Residence 1802, floor plan"
          tag="SOURCE — spatial truth"
          ratio="wide"
        />
        <div className="idv-grid-4" style={{ marginTop: 'clamp(18px, 2.5vw, 36px)' }}>
          {PATEL.unit.rooms.map((r) => (
            <MediaFigure
              key={r.src}
              src={r.src}
              alt={`The Patel, Residence 1802 — ${r.label}`}
              caption={r.label}
              ratio="45"
            />
          ))}
        </div>
      </section>

      <section className="idv-section idv-section--flush">
        <SectionHead eyebrow="THE PATEL — FILM" title="The hero film." />
        <MediaFigure
          video
          src={PATEL.film.desktop}
          poster={PATEL.film.poster}
          alt="The Patel hero film — the tower and its Miami environment in motion"
          caption="The Patel — hero film"
          tag="FILM"
          ratio="wide"
        />
      </section>

      <section className="idv-section idv-section--flush">
        <div style={{ background: 'var(--idv-dark-panel)', borderRadius: 18, padding: 'clamp(40px, 6vw, 96px) clamp(24px, 5vw, 72px)', display: 'grid', justifyItems: 'center', gap: 20 }}>
          <img
            src={PATEL.brand}
            alt="The Patel brand lockup"
            loading="lazy"
            decoding="async"
            style={{ display: 'block', width: '100%', maxWidth: 560 }}
          />
          <div className="idv-mono-label" style={{ color: 'var(--idv-stone)' }}>THE PATEL — PROJECT IDENTITY</div>
        </div>
      </section>
    </>
  );
}

/* ── Methods used ─────────────────────────────────────────────────────────── */
function MethodsUsed({ study }) {
  const chip = {
    fontFamily: 'var(--idv-mono)',
    fontSize: 11,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'var(--idv-graphite)',
    border: '1px solid var(--idv-stone)',
    borderRadius: 999,
    padding: '9px 18px',
    background: 'var(--idv-panel)',
  };
  return (
    <section className="idv-section idv-section--flush" style={{ display: 'grid', gap: 28 }}>
      <div className="idv-grid-2">
        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <div className="idv-mono-label">Methods used</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {study.methods.map((m) => <span key={m} style={chip}>{m}</span>)}
          </div>
        </div>
        <div style={{ display: 'grid', gap: 14, alignContent: 'start' }}>
          <div className="idv-mono-label">The delivered system</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {study.system.map((s) => <span key={s} style={chip}>{s}</span>)}
          </div>
        </div>
      </div>
      <hr className="idv-rule idv-rule--ai" />
    </section>
  );
}

const SECTIONS = {
  'poolside-villa': PoolsideVilla,
  'maison-valmont': MaisonValmont,
  'the-patel': ThePatel,
};

export default function InteriorCaseStudy() {
  const { slug } = useParams();
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (!study || !PROJECTS[slug] || !SECTIONS[slug]) {
    return <Navigate to={`${IDV_BASE}/case-studies`} replace />;
  }
  const Body = SECTIONS[slug];
  return (
    <InteriorShell path={`${IDV_BASE}/case-studies/${slug}`}>
      <CaseHeader study={study} />
      <Body />
      <MethodsUsed study={study} />
      <CtaBand
        eyebrow="CASE STUDY"
        headline={`${study.name} started as source material. Your project can too.`}
        copy="Send a plan, a scan, or the property as it exists today — we build the visual system from there."
        primary={{ label: 'Start a similar project', to: '/Contact' }}
        secondary={{ label: 'All case studies', to: `${IDV_BASE}/case-studies` }}
      />
    </InteriorShell>
  );
}
