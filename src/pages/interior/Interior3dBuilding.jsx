/**
 * /interior-design/3d-building-visualization — METHOD 02 / UNDERSTAND.
 * Scale first, then the unit: The Patel carries the whole page.
 * All copy from @/data/interiorDesign; all media from @/data/interiorMedia.
 */
import React from 'react';
import {
  InteriorShell, SectionHead, MediaFigure, CtaBand, MethodIntro, MethodFacts, MethodOutro,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE, IDV_EYEBROW } from '@/data/interiorDesign';
import { PATEL } from '@/data/interiorMedia';

const m = METHODS['3d-building-visualization'];

export default function Interior3dBuilding() {
  return (
    <InteriorShell path={m.route}>
      <MethodIntro method={m} eyebrowPrefix="METHOD 02 / UNDERSTAND" />

      {/* ── 1. The building in its world ─────────────────────────────────── */}
      <section className="idv-section idv-section--flush" style={{ display: 'grid', gap: 'clamp(24px, 3vw, 40px)' }}>
        <SectionHead
          eyebrow="THE PATEL · MIAMI"
          title="The building in its world."
          lede="Before any floor plan, the project has to hold its ground at skyline scale — the volume, the light, and the environment it answers to."
        />
        <MediaFigure
          src={PATEL.tower[0].src}
          alt="The Patel tower at dusk, seen at skyline scale in its Miami environment"
          caption={`The Patel — ${PATEL.tower[0].label}`}
          tag="FULL BUILDING"
          ratio="wide"
          eager
        />
        <div className="idv-grid-3 idv-reveal">
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

      {/* ── 2. From skyline to residence ─────────────────────────────────── */}
      <section className="idv-section idv-section--flush" style={{ display: 'grid', gap: 'clamp(24px, 3vw, 40px)' }}>
        <SectionHead
          eyebrow="THE PATEL · RESIDENCE 1802"
          title="From skyline to residence."
          lede="Scale first, then the unit. Once the buyer understands the building, the story drills down to one residence — its own plan, then its rooms — without ever leaving the same project."
        />
        <div className="idv-grid-3 idv-reveal">
          <MediaFigure
            src={PATEL.unit.floorplan}
            alt="The Patel — Residence 1802 unit floor plan"
            caption="The Patel — Residence 1802, unit plan"
            tag="PLAN"
            ratio="45"
          />
          {PATEL.unit.rooms.slice(0, 2).map((r) => (
            <MediaFigure
              key={r.src}
              src={r.src}
              alt={`The Patel — Residence 1802, ${r.label.toLowerCase()}`}
              caption={`The Patel — Residence 1802, ${r.label.toLowerCase()}`}
              ratio="45"
            />
          ))}
        </div>
      </section>

      {/* ── 3. One identity carries it ───────────────────────────────────── */}
      <section className="idv-section idv-section--flush" style={{ display: 'grid', gap: 'clamp(24px, 3vw, 40px)' }}>
        <SectionHead
          eyebrow="THE PATEL · IDENTITY"
          title="One identity carries it."
          lede="Tower, residence, and interiors read as one project because one identity holds them together — the exterior a buyer remembers and the interior they imagine living in."
        />
        <div className="idv-grid-2 idv-reveal">
          <figure className="idv-figure">
            <div style={{ background: 'var(--idv-dark-panel)', borderRadius: 14, border: '1px solid var(--idv-stone)', padding: 'clamp(28px, 5vw, 64px)', display: 'grid', placeItems: 'center' }}>
              <img
                src={PATEL.brand}
                alt="The Patel brand lockup"
                loading="lazy"
                decoding="async"
                style={{ display: 'block', width: '100%', height: 'auto', border: 0, borderRadius: 0, background: 'transparent' }}
              />
            </div>
            <figcaption>
              <span>The Patel — project identity</span>
              <span>BRAND</span>
            </figcaption>
          </figure>
          <MediaFigure
            src={PATEL.interiors[0].src}
            alt={`The Patel — ${PATEL.interiors[0].label}`}
            caption={`The Patel — ${PATEL.interiors[0].label}`}
            tag="INTERIOR"
          />
        </div>
      </section>

      <MethodFacts method={m} />
      <MethodOutro method={m} methods={METHODS} />
      <CtaBand
        eyebrow={IDV_EYEBROW}
        headline="Start at the skyline. Close at the residence."
        copy={m.intro}
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
