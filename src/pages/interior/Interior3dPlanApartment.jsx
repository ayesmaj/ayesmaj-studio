/**
 * /interior-design/3d-floor-plan-apartment — Method 02 / Understand.
 * A furnished 3D apartment floor plan: the whole unit in one glance, then
 * the plan-to-room connection. Copy from @/data/interiorDesign; media from
 * @/data/interiorMedia. Projects never mix inside a sequence.
 */
import React from 'react';
import {
  InteriorShell, SectionHead, MediaFigure, MethodIntro, MethodFacts, MethodOutro, CtaBand,
} from '@/components/interior/kit';
import { IDV_BASE, IDV_EYEBROW, METHODS } from '@/data/interiorDesign';
import { PATEL, APARTMENT } from '@/data/interiorMedia';

const m = METHODS['3d-floor-plan-apartment'];

/* ── One unit, one glance — The Patel, Residence 1802 ─────────────────────── */
function UnitAtAGlance() {
  return (
    <section className="idv-section idv-section--flush">
      <SectionHead
        eyebrow="THE PATEL — RESIDENCE 1802"
        title="One unit, one glance."
        lede="The furnished plan holds the whole residence at once; each room view is the same plan, entered. Nothing moves between the two — only the level of detail changes."
      />
      <div className="idv-grid-2 idv-reveal">
        <MediaFigure
          src={PATEL.unit.floorplan}
          alt="The Patel, Residence 1802 — furnished 3D unit floor plan showing living, kitchen, primary bedroom and terrace"
          caption="The Patel — Residence 1802"
          tag="UNIT PLAN"
        />
        <div className="idv-grid-2" style={{ gap: 12 }}>
          {PATEL.unit.rooms.map((r) => (
            <MediaFigure
              key={r.src}
              src={r.src}
              alt={`The Patel, Residence 1802 — ${r.label.toLowerCase()} as located on the unit plan`}
              caption={`The Patel — ${r.label}`}
              tag="RESIDENCE 1802"
              ratio="sq"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Room by room — Canal Apartment ───────────────────────────────────────── */
function RoomByRoom() {
  return (
    <section className="idv-section idv-section--flush">
      <SectionHead
        eyebrow="CANAL APARTMENT"
        title="Room by room."
        lede="One apartment, read in sequence. The overview sets the geometry; every room that follows belongs to the same plan."
      />
      <div className="idv-strip idv-reveal" aria-label="Canal Apartment rooms">
        {APARTMENT.rooms.map((r) => (
          <MediaFigure
            key={r.src}
            src={r.src}
            alt={`Canal Apartment — ${r.label.toLowerCase()} view from the furnished apartment set`}
            caption={r.label}
            tag="CANAL APARTMENT"
            ratio="45"
          />
        ))}
      </div>
    </section>
  );
}

export default function Interior3dPlanApartment() {
  return (
    <InteriorShell path={m.route}>
      <MethodIntro method={m} eyebrowPrefix="METHOD 02 / UNDERSTAND" />
      <UnitAtAGlance />
      <RoomByRoom />
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
