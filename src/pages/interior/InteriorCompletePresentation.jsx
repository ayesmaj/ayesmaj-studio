/**
 * /interior-design/complete-visual-presentation — Method 04 / PRESENT.
 * Visualization wins understanding; presentation wins decisions. The page
 * walks the seven-step workflow, lays out the modular deliverable system,
 * and shows presentation craft from The Patel and Maison Valmont.
 * Copy from @/data/interiorDesign; media from @/data/interiorMedia.
 */
import React from 'react';
import {
  InteriorShell, SectionHead, MediaFigure, CtaBand, MethodIntro, MethodFacts, MethodOutro,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE, IDV_EYEBROW } from '@/data/interiorDesign';
import { VALMONT, PATEL } from '@/data/interiorMedia';

const m = METHODS['complete-visual-presentation'];

/* One connective line per workflow step, in step order (m.workflow). */
const WORKFLOW_NOTES = [
  'Agree on the audience, the decision at stake, and the deadline.',
  'Gather the plans, scans, and source material the project already holds.',
  'Plans and room imagery establish what the project looks like.',
  'Film and movement establish what it will feel like.',
  'Name, identity, and typography give the project one voice.',
  'Deck, website, and presentation are built for the decision moment.',
  'Launch assets carry the same identity into social and sales.',
];

const DELIVERABLES = [
  { name: 'AI scan', role: 'Captures the existing property as a working spatial base.' },
  { name: 'Clean plan', role: 'The spatial source of truth every other asset defers to.' },
  { name: '3D floor plan', role: 'Makes the whole layout readable at one glance.' },
  { name: 'Interior imagery', role: 'Photorealistic rooms that carry material and light.' },
  { name: 'Cinematic video', role: 'Movement and sequence — the emotional core of the presentation.' },
  { name: 'Project identity', role: 'Name, mark, and typography that hold every touchpoint together.' },
  { name: 'Website', role: 'A home for the project that buyers and investors can visit.' },
  { name: 'Presentation deck', role: 'The visuals ordered for the room where the decision happens.' },
  { name: 'Social content', role: 'Vertical cuts and campaign imagery ready for launch.' },
];

/* ── 1. The workflow ──────────────────────────────────────────────────────── */
function Workflow() {
  return (
    <section className="idv-section idv-section--flush">
      <SectionHead
        eyebrow="THE WORKFLOW"
        title="The workflow"
        lede="Seven steps from source material to launch — each one building on the assets the last one produced."
      />
      <div className="idv-journey">
        {m.workflow.map((step, i) => (
          <div key={step} className="idv-journey-step idv-reveal">
            <div className="idv-stage-num">{String(i + 1).padStart(2, '0')}</div>
            <h3 className="idv-h3">{step.charAt(0) + step.slice(1).toLowerCase()}</h3>
            <p className="idv-lede" style={{ margin: 0 }}>{WORKFLOW_NOTES[i]}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── 2. Deliverables, modular by design ───────────────────────────────────── */
function Deliverables() {
  return (
    <section className="idv-section--bone">
      <div className="idv-inner idv-section">
        <SectionHead
          eyebrow="THE DELIVERABLES"
          title="Deliverables, modular by design"
          lede={m.limits[0]}
        />
        <div className="idv-grid-3">
          {DELIVERABLES.map((d, i) => (
            <article key={d.name} className="idv-stage idv-reveal">
              <div className="idv-stage-num">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="idv-h3">{d.name}</h3>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: 'var(--idv-graphite)' }}>{d.role}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 3. What presentation craft looks like ────────────────────────────────── */
function Craft() {
  return (
    <section className="idv-section">
      <SectionHead
        eyebrow="THE CRAFT"
        title="What presentation craft looks like"
        lede="Identity work and material direction from two projects — the level of finish the decision moment deserves."
      />
      <div className="idv-grid-2">
        <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
          <div style={{ background: 'var(--idv-dark-panel)', borderRadius: 18, padding: 'clamp(24px, 3vw, 48px)' }}>
            <MediaFigure
              src={PATEL.brand}
              alt="The Patel — brand lockup: project wordmark over the Miami tower"
            />
          </div>
          <div className="idv-mono-label" style={{ display: 'flex', justifyContent: 'space-between', gap: 12, color: 'var(--idv-walnut)' }}>
            <span>The Patel — project identity</span>
            <span>IDENTITY</span>
          </div>
        </div>
        <div className="idv-strip" aria-label="Maison Valmont material direction">
          {VALMONT.materials.slice(0, 4).map((mat) => (
            <MediaFigure
              key={mat.src}
              src={mat.src}
              alt={`Maison Valmont material direction — ${mat.label}`}
              caption={mat.label}
              tag="MAISON VALMONT — material direction"
              ratio="45"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function InteriorCompletePresentation() {
  return (
    <InteriorShell path={m.route}>
      <MethodIntro method={m} eyebrowPrefix="METHOD 04 / PRESENT" />
      <Workflow />
      <Deliverables />
      <Craft />
      <MethodFacts method={m} />
      <MethodOutro method={m} methods={METHODS} />
      <CtaBand
        eyebrow={IDV_EYEBROW}
        headline={m.headline}
        copy={m.intro}
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
