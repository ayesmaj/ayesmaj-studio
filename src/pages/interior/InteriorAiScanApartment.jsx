/**
 * /interior-design/ai-scan-apartment — METHOD 01 / CAPTURE.
 * AI Apartment Scan: what exists now. All copy from @/data/interiorDesign;
 * all media from @/data/interiorMedia (Canal Apartment only).
 */
import React from 'react';
import {
  InteriorShell, SectionHead, MediaFigure, CtaBand, MethodIntro, MethodFacts, MethodOutro,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE, IDV_EYEBROW } from '@/data/interiorDesign';
import { APARTMENT } from '@/data/interiorMedia';
import BeforeAfterSlider from '@/components/ayesmaj/BeforeAfterSlider';

const m = METHODS['ai-scan-apartment'];

const PAIRS = ['kitchen', 'bath'].map((r) => APARTMENT.pairs.find((p) => p.room === r));
const STRIP = ['overview', 'living', 'kitchen', 'bath', 'sunroom'].map(
  (r) => APARTMENT.rooms.find((x) => x.room === r),
);

/* ── Source vs result — the honest capture demo ───────────────────────────── */
function SourceToResult() {
  return (
    <section className="idv-section idv-section--flush">
      <SectionHead
        eyebrow="ONE APARTMENT, SOURCE TO RESULT"
        title="The same frame, before and after the scan."
        lede="Raw capture on one side, the finished editorial visual on the other. Drag to compare — the geometry never changes, only the clarity."
      />
      <div className="idv-grid-2 idv-reveal">
        {PAIRS.map((pair) => (
          <div key={pair.room} style={{ display: 'grid', gap: 12 }}>
            <BeforeAfterSlider
              beforeImg={pair.raw}
              afterImg={pair.editorial}
              beforeLabel="RAW SOURCE"
              afterLabel="EDITORIAL RESULT"
              accent="#B79661"
              accentRGB="183,150,97"
            />
            <div className="idv-mono-label">Canal Apartment — {pair.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Room set the scan produces ───────────────────────────────────────────── */
function ScanBuilds() {
  return (
    <section className="idv-section idv-section--flush">
      <SectionHead
        eyebrow="WHAT THE SCAN BUILDS"
        title="Every room, one coherent base."
        lede="From phone photos and an existing plan, the scan assembles the apartment room by room — a foundation the plan and film stages build on."
      />
      <div className="idv-strip idv-reveal" aria-label="Canal Apartment room set">
        {STRIP.map((room) => (
          <MediaFigure
            key={room.room}
            src={room.src}
            alt={`Canal Apartment — ${room.label} from the apartment scan`}
            caption={room.label}
            tag="CANAL APARTMENT"
            ratio="45"
          />
        ))}
      </div>
    </section>
  );
}

export default function InteriorAiScanApartment() {
  return (
    <InteriorShell path={m.route}>
      <MethodIntro method={m} eyebrowPrefix="METHOD 01 / CAPTURE" />
      <SourceToResult />
      <ScanBuilds />
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
