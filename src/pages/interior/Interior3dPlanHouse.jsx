/**
 * /interior-design/3d-floor-plan-house — METHOD 02 / UNDERSTAND.
 * Copy from @/data/interiorDesign (METHODS['3d-floor-plan-house']);
 * media from @/data/interiorMedia (Poolside Villa only — never mixed).
 */
import React from 'react';
import {
  InteriorShell, SectionHead, MediaFigure, MethodIntro, MethodFacts, MethodOutro, CtaBand,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE, IDV_EYEBROW } from '@/data/interiorDesign';
import { VILLA } from '@/data/interiorMedia';

const m = METHODS['3d-floor-plan-house'];

/** Plan zones paired with the built views that honor them — one project throughout. */
const PROMISES = [VILLA.sequence[7], VILLA.sequence[12], VILLA.sequence[21], VILLA.sequence[23], VILLA.sequence[25]];

export default function Interior3dPlanHouse() {
  return (
    <InteriorShell path={m.route}>
      <MethodIntro method={m} eyebrowPrefix="METHOD 02 / UNDERSTAND" />

      {/* ── Both levels, one system ─────────────────────────────────────── */}
      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="THE LEVELS"
          title="Both levels, one system."
          lede="Ground floor and upper floor read as one home: public rooms, pool terrace and garage below; the private zone above; the stair holding the two together."
        />
        <div style={{ display: 'grid', gap: 'clamp(24px, 4vw, 72px)' }}>
          <MediaFigure
            src={VILLA.plans[0].src}
            alt="Poolside Villa furnished 3D ground floor plan — living, kitchen, garage, pool and outdoor terrace in one view"
            caption="Poolside Villa — ground floor plan"
            tag="POOLSIDE VILLA"
            ratio="wide"
            eager
            className="idv-reveal"
          />
          <div className="idv-grid-2 idv-reveal">
            <MediaFigure
              src={VILLA.plans[1].src}
              alt="Poolside Villa furnished 3D upper floor plan — primary suite, bedrooms and family lounge"
              caption="Poolside Villa — upper floor plan"
              tag="POOLSIDE VILLA"
            />
            <MediaFigure
              src={VILLA.sequence[10].src}
              alt="Poolside Villa staircase render — the vertical connection between ground and upper floor"
              caption="The stair that links the plans"
              tag="POOLSIDE VILLA"
            />
          </div>
        </div>
      </section>

      {/* ── The plan keeps its promises ─────────────────────────────────── */}
      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="PLAN TO REALITY"
          title="The plan keeps its promises."
          lede="Every zone on the plan resolves into a real view of the same house — kitchen, primary bedroom, garage, outdoor lounge, pool. The geometry never changes; only the level of understanding does."
        />
        <div className="idv-strip idv-reveal" aria-label="Poolside Villa plan zones as built views">
          {PROMISES.map((f) => (
            <MediaFigure
              key={f.src}
              src={f.src}
              alt={`Poolside Villa ${f.label.toLowerCase()} — the built view of its zone on the 3D floor plan`}
              caption={`${f.label} — plan zone → built view`}
              tag="POOLSIDE VILLA"
              ratio="45"
            />
          ))}
        </div>
      </section>

      <MethodFacts method={m} />
      <MethodOutro method={m} methods={METHODS} />
      <CtaBand
        eyebrow={IDV_EYEBROW}
        headline="Understand the entire home before a wall goes up."
        copy="Send the plans or a house scan. We return both levels as one furnished, readable system."
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
