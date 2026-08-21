/**
 * /interior-design — hub of the Interior Design Visualization world.
 * Education (what each method answers) + showcase (one real project through
 * every stage) + conversion (recommender → brief). All copy comes from
 * @/data/interiorDesign; all media from @/data/interiorMedia.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  InteriorShell, Eyebrow, SectionHead, MediaFigure, MethodSwitcher, IdvButton, CtaBand,
} from '@/components/interior/kit';
import {
  IDV_BASE, IDV_EYEBROW, STAGES, METHODS, COMMUNICATION_GAP, COMPARISON,
  COMPARISON_VERDICT, JOURNEY, CAPABILITIES, GOALS, CASE_STUDIES, FINAL_CTA,
} from '@/data/interiorDesign';
import { VILLA, HERO_STAGES, APARTMENT, VALMONT, PATEL, CASE_COVERS } from '@/data/interiorMedia';
import BeforeAfterSlider from '@/components/ayesmaj/BeforeAfterSlider';

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

/* ── 1. HERO — one project, four visual stages ────────────────────────────── */
function Hero() {
  const [stage, setStage] = useState(HERO_STAGES[3].key);
  const active = HERO_STAGES.find((s) => s.key === stage) || HERO_STAGES[3];
  return (
    <section className="idv-section" style={{ paddingTop: 'clamp(140px, 15vw, 210px)', display: 'grid', gap: 34 }}>
      <Eyebrow>{IDV_EYEBROW}</Eyebrow>
      <h1 className="idv-display" style={{ maxWidth: 1100 }}>
        From floor plan<br />to a home your client can <span className="idv-accent">already feel.</span>
      </h1>
      <p className="idv-lede">
        We transform scans, architectural plans and 3D models into clear spatial visuals,
        photorealistic interiors, cinematic films and complete branded presentations.
      </p>
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
        <IdvButton onClick={() => scrollToId('method-worlds')}>Explore the methods</IdvButton>
        <IdvButton to="/Contact" ghost>Build my presentation</IdvButton>
      </div>
      <div className="idv-mono-label">APARTMENTS · HOUSES · BUILDINGS</div>

      <div style={{ display: 'grid', gap: 16, marginTop: 18 }}>
        <MethodSwitcher
          ariaLabel="Visual stage"
          options={HERO_STAGES.map((s) => ({ key: s.key, label: s.label }))}
          value={stage}
          onChange={setStage}
        />
        <MediaFigure
          src={active.src}
          alt={`Poolside Villa — ${active.label}: the same project shown as ${active.room === 'plan' ? 'a floor plan' : 'a ' + active.room + ' view'}`}
          caption={`Poolside Villa — ${active.label}`}
          tag="SAME PROJECT · FOUR VISUAL LANGUAGES"
          ratio="wide"
          eager
        />
        <div className="idv-grid-4">
          {HERO_STAGES.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setStage(s.key)}
              style={{ padding: 0, border: s.key === stage ? '2px solid var(--idv-champagne)' : '1px solid var(--idv-stone)', borderRadius: 12, overflow: 'hidden', cursor: 'pointer', background: 'none' }}
              aria-pressed={s.key === stage}
              aria-label={s.label}
            >
              <img src={s.src} alt="" loading="lazy" decoding="async" style={{ display: 'block', width: '100%', aspectRatio: '16/10', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </div>
      <div className="idv-mono-label" style={{ letterSpacing: '0.24em' }}>SCAN · VISUALIZE · EXPERIENCE · PRESENT</div>
    </section>
  );
}

/* ── 2. The communication problem ─────────────────────────────────────────── */
function CommunicationGap() {
  return (
    <section className="idv-section--bone">
      <div className="idv-inner idv-section">
        <SectionHead
          eyebrow="THE PROBLEM"
          title={<>The design may be clear to you.<br />That does not mean the client can see it.</>}
          lede={COMMUNICATION_GAP.copy}
        />
        <div className="idv-grid-2 idv-reveal">
          {[['DESIGNER UNDERSTANDS', COMMUNICATION_GAP.designer], ['CLIENT NEEDS TO SEE', COMMUNICATION_GAP.client]].map(([title, items]) => (
            <div key={title} style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
              <div className="idv-mono-label">{title}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {items.map((it) => (
                  <li key={it} style={{ borderTop: '1px solid var(--idv-stone)', padding: '12px 0', fontFamily: 'var(--idv-serif)', fontSize: 'clamp(19px, 1.8vw, 26px)' }}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3. The four-stage system ─────────────────────────────────────────────── */
function StageSystem() {
  return (
    <section className="idv-section">
      <SectionHead
        eyebrow="THE AYESMAJ VISUALIZATION SYSTEM"
        title={<>One project.<br />Multiple levels of understanding.</>}
        lede="Every visualization method answers a different question. Together they create a complete client experience."
      />
      <div className="idv-grid-4">
        {STAGES.map((s, i) => (
          <article key={s.key} className="idv-stage idv-reveal">
            <div className="idv-stage-num">{s.num}</div>
            <h3 className="idv-h3">{s.title}</h3>
            <p className="idv-mono-label" style={{ color: 'var(--idv-walnut)' }}>{s.question}</p>
            <img src={HERO_STAGES[i].src} alt="" loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '16/10', objectFit: 'cover', borderRadius: 10 }} />
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 6, fontSize: 14, color: 'var(--idv-graphite)' }}>
              {s.methods.map((m) => <li key={m}>{m}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ── 4. Method worlds — three editorial chapters ──────────────────────────── */
function MethodWorlds() {
  const pair = APARTMENT.pairs[4]; // living
  return (
    <section className="idv-section" id="method-worlds" style={{ display: 'grid', gap: 'clamp(72px, 8vw, 130px)' }}>
      <SectionHead eyebrow="THE METHODS" title="Three ways a project learns to speak." />

      {/* AI SCANS */}
      <div className="idv-grid-2 idv-reveal">
        <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
          <div className="idv-mono-label">01 / CAPTURE</div>
          <h3 className="idv-h2" style={{ fontSize: 'clamp(34px, 3.6vw, 56px)' }}>Capture what exists.</h3>
          <p className="idv-lede">Build a fast visual foundation for renovations, redesigns, furniture planning and early client conversations.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="idv-btn idv-btn--ghost" to={METHODS['ai-scan-apartment'].route}>Apartment Scan <ArrowRight size={14} aria-hidden="true" /></Link>
            <Link className="idv-btn idv-btn--ghost" to={METHODS['ai-scan-house'].route}>House Scan <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </div>
        <div style={{ display: 'grid', gap: 12 }}>
          <BeforeAfterSlider
            beforeImg={pair.raw}
            afterImg={pair.editorial}
            beforeLabel="RAW SOURCE"
            afterLabel="EDITORIAL RESULT"
            accent="#B79661"
            accentRGB="183,150,97"
          />
          <div className="idv-mono-label">Canal Apartment — the same frame, source capture vs finished visual</div>
        </div>
      </div>

      {/* 3D FLOOR PLANS */}
      <div className="idv-grid-2 idv-reveal">
        <div style={{ display: 'grid', gap: 12 }}>
          <MediaFigure src={VILLA.plans[0].src} alt="Poolside Villa ground floor plan with furniture, pool and garage" caption="Poolside Villa — ground floor" tag="PLAN" ratio="wide" />
          <div className="idv-grid-2" style={{ gap: 12 }}>
            <MediaFigure src={VILLA.plans[1].src} alt="Poolside Villa upper floor plan" caption="Upper floor" />
            <MediaFigure src={PATEL.unit.floorplan} alt="The Patel Residence 1802 unit floor plan" caption="The Patel — Residence 1802" />
          </div>
        </div>
        <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
          <div className="idv-mono-label">02 / UNDERSTAND</div>
          <h3 className="idv-h2" style={{ fontSize: 'clamp(34px, 3.6vw, 56px)' }}>Make the entire layout understandable.</h3>
          <p className="idv-lede">Show room relationships, furniture, scale, circulation, levels, garages, pools and outdoor connections at one glance.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="idv-btn idv-btn--ghost" to={METHODS['3d-floor-plan-apartment'].route}>Apartment 3D Plan <ArrowRight size={14} aria-hidden="true" /></Link>
            <Link className="idv-btn idv-btn--ghost" to={METHODS['3d-floor-plan-house'].route}>House 3D Plan <ArrowRight size={14} aria-hidden="true" /></Link>
            <Link className="idv-btn idv-btn--ghost" to={METHODS['3d-building-visualization'].route}>Building <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>

      {/* CINEMATIC AI VIDEO */}
      <div className="idv-grid-2 idv-reveal">
        <div style={{ display: 'grid', gap: 18, alignContent: 'start' }}>
          <div className="idv-mono-label">03 / EXPERIENCE</div>
          <h3 className="idv-h2" style={{ fontSize: 'clamp(34px, 3.6vw, 56px)' }}>Turn the design into a journey.</h3>
          <p className="idv-lede">Use movement, light and atmosphere to help the client emotionally experience the property.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link className="idv-btn idv-btn--ghost" to={METHODS['ai-video-apartment'].route}>Apartment Video <ArrowRight size={14} aria-hidden="true" /></Link>
            <Link className="idv-btn idv-btn--ghost" to={METHODS['ai-video-house'].route}>House Video <ArrowRight size={14} aria-hidden="true" /></Link>
          </div>
        </div>
        <MediaFigure
          video
          src={VALMONT.film.src}
          poster={VALMONT.film.poster}
          alt="Maison Valmont transformation film"
          caption="Maison Valmont — transformation film"
          tag="FILM"
          ratio="wide"
        />
      </div>
    </section>
  );
}

/* ── 5. Same project, different methods ───────────────────────────────────── */
const TRUTHS = [
  { key: 'plan', label: 'PLAN', src: VILLA.plans[0].src, caption: 'Where is everything?', reveals: ['Existing rooms', 'General geometry', 'The spatial source of truth'] },
  { key: 'levels', label: 'LEVELS', src: VILLA.plans[1].src, caption: 'How do the floors relate?', reveals: ['Level logic', 'Stair alignment', 'Private-zone organization'] },
  { key: 'render', label: 'RENDER', src: VILLA.sequence[4].src, caption: 'What will it look like?', reveals: ['Material', 'Furniture language', 'Lighting and atmosphere'] },
  { key: 'film', label: 'FILM FRAME', src: VILLA.sequence[25].src, caption: 'What will it feel like?', reveals: ['Arrival and movement', 'Sequence', 'Emotional value'] },
];
function SameProject() {
  const [view, setView] = useState('plan');
  const active = TRUTHS.find((t) => t.key === view) || TRUTHS[0];
  return (
    <section className="idv-section--bone">
      <div className="idv-inner idv-section">
        <SectionHead
          eyebrow="COMPARISON"
          title="Each method reveals a different truth."
          lede="One property. Four ways to see it. The orientation and the architecture never change — only the level of understanding does."
        />
        <div style={{ display: 'grid', gap: 16 }}>
          <MethodSwitcher
            ariaLabel="Method view"
            options={TRUTHS.map((t) => ({ key: t.key, label: t.label }))}
            value={view}
            onChange={setView}
          />
          <div className="idv-grid-2" style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
            <MediaFigure src={active.src} alt={`Poolside Villa shown as ${active.label.toLowerCase()}`} caption={`Poolside Villa — ${active.caption}`} tag={active.label} ratio="wide" />
            <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
              <div className="idv-mono-label">This view reveals</div>
              {active.reveals.map((r) => (
                <div key={r} style={{ borderTop: '1px solid var(--idv-stone)', paddingTop: 10, fontFamily: 'var(--idv-serif)', fontSize: 'clamp(18px, 1.7vw, 24px)' }}>{r}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 6. Which method is best? ─────────────────────────────────────────────── */
function WhichIsBest() {
  return (
    <section className="idv-section">
      <SectionHead eyebrow="THE HONEST ANSWER" title={COMPARISON_VERDICT.question}>
        <p className="idv-h3" style={{ color: 'var(--idv-champagne)', fontStyle: 'italic' }}>{COMPARISON_VERDICT.answer}</p>
        <p className="idv-lede">{COMPARISON_VERDICT.copy}</p>
      </SectionHead>
      <div>
        {COMPARISON.map((row) => (
          <details key={row.dim} className="idv-row">
            <summary>
              <span>{row.dim}</span>
              <span className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{METHODS[row.best].label}</span>
            </summary>
            <div className="idv-row-body">
              <p className="idv-lede" style={{ margin: 0 }}>{row.note}</p>
              <Link to={METHODS[row.best].route} className="idv-mono-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 12, textDecoration: 'none' }}>
                {METHODS[row.best].label} <ArrowRight size={12} aria-hidden="true" />
              </Link>
            </div>
          </details>
        ))}
      </div>
      <div style={{ marginTop: 36 }}>
        <IdvButton to={`${IDV_BASE}/compare-visualization-methods`}>Compare all methods</IdvButton>
      </div>
    </section>
  );
}

/* ── 7. Client journey ────────────────────────────────────────────────────── */
function ClientJourney() {
  return (
    <section className="idv-section">
      <SectionHead
        eyebrow="THE JOURNEY"
        title="Use the right visual at the right moment."
        lede="A renovation told in eight stages — Maison Valmont from existing condition to reveal."
      />
      <div className="idv-strip idv-reveal" aria-label="Maison Valmont renovation stages">
        {VALMONT.process.map((p, i) => (
          <MediaFigure key={p.src} src={p.src} alt={`Maison Valmont renovation stage: ${p.label}`} caption={`0${i + 1} — ${p.label}`} ratio="45" />
        ))}
      </div>
      <div className="idv-journey" style={{ marginTop: 48 }}>
        {JOURNEY.map((j, i) => (
          <div key={j.stage} className="idv-journey-step idv-reveal">
            <div className="idv-stage-num">0{i + 1}</div>
            <div>
              <h3 className="idv-h3">{j.stage}</h3>
              <p className="idv-mono-label" style={{ marginTop: 8 }}>{j.use.join(' · ')}</p>
            </div>
            <p className="idv-lede" style={{ margin: 0 }}>{j.point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 8. Why AYESMAJ ───────────────────────────────────────────────────────── */
function WhyAyesmaj() {
  return (
    <section className="idv-section--bone">
      <div className="idv-inner idv-section">
        <SectionHead
          eyebrow="WHY AYESMAJ STUDIOS"
          title="One studio for the entire visual world."
          lede="A one-studio visual system for spatial projects — visualization, film, branding, web and marketing built as one connected system."
        />
        <div className="idv-grid-3 idv-reveal" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          {CAPABILITIES.map((c) => (
            <div key={c.title} style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
              <div className="idv-mono-label">{c.title}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 7, fontSize: 15, color: 'var(--idv-graphite)' }}>
                {c.items.map((it) => <li key={it} style={{ borderTop: '1px solid var(--idv-stone)', paddingTop: 7 }}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 9. Case studies rail ─────────────────────────────────────────────────── */
function CaseRail() {
  return (
    <section className="idv-section">
      <SectionHead eyebrow="CASE STUDIES" title="From source material to complete visual world." />
      <div className="idv-grid-3">
        {CASE_STUDIES.map((c) => (
          <Link key={c.slug} to={`${IDV_BASE}/case-studies/${c.slug}`} className="idv-case idv-reveal">
            <img src={CASE_COVERS[c.slug]} alt={`${c.name} — ${c.kind}`} loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
            <div className="idv-case-meta">
              <span className="idv-mono-label">{c.kind}</span>
              <span style={{ fontFamily: 'var(--idv-serif)', fontSize: 26 }}>{c.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── 10. Recommender ──────────────────────────────────────────────────────── */
function Recommender() {
  const [goal, setGoal] = useState(null);
  const picked = GOALS.find((g) => g.key === goal);
  return (
    <section className="idv-section" id="recommender">
      <SectionHead
        eyebrow="START HERE"
        title="What does your client need to understand?"
        lede="Choose the next decision. We answer with the visual stack that gets it approved."
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
      {picked ? (
        <div style={{ marginTop: 36, border: '1px solid var(--idv-stone)', borderRadius: 18, background: '#fff', padding: 'clamp(24px, 3vw, 44px)', display: 'grid', gap: 18 }} aria-live="polite">
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
    </section>
  );
}

export default function InteriorDesign() {
  return (
    <InteriorShell path={IDV_BASE}>
      <Hero />
      <CommunicationGap />
      <StageSystem />
      <MethodWorlds />
      <SameProject />
      <WhichIsBest />
      <ClientJourney />
      <WhyAyesmaj />
      <CaseRail />
      <Recommender />
      <CtaBand
        eyebrow={IDV_EYEBROW}
        headline={FINAL_CTA.headline}
        copy={FINAL_CTA.copy}
        primary={FINAL_CTA.primary}
        secondary={FINAL_CTA.secondary}
      />
    </InteriorShell>
  );
}
