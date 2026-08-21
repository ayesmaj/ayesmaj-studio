/**
 * /interior-design/ai-scan-house — METHOD 01 / CAPTURE (house).
 * All copy from @/data/interiorDesign; all media from @/data/interiorMedia.
 */
import React from 'react';
import {
  InteriorShell, SectionHead, MediaFigure, MethodIntro, MethodFacts, MethodOutro, CtaBand,
} from '@/components/interior/kit';
import { IDV_BASE, IDV_EYEBROW, METHODS } from '@/data/interiorDesign';
import { VILLA } from '@/data/interiorMedia';

const m = METHODS['ai-scan-house'];

export default function InteriorAiScanHouse() {
  return (
    <InteriorShell path={m.route}>
      <MethodIntro method={m} eyebrowPrefix="METHOD 01 / CAPTURE" />

      {/* 1 — The foundation a house capture produces */}
      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="THE FOUNDATION"
          title="The foundation a house capture produces."
          lede="Both levels of the same house, resolved into clean plans the whole project can build on."
        />
        <div className="idv-grid-2 idv-reveal">
          <MediaFigure
            src={VILLA.plans[0].src}
            alt="Poolside Villa ground floor plan produced from a house capture — rooms, garage, pool and openings"
            caption="Ground floor"
            tag="POOLSIDE VILLA"
            ratio="wide"
          />
          <MediaFigure
            src={VILLA.plans[1].src}
            alt="Poolside Villa upper floor plan produced from a house capture — bedrooms, baths and stair alignment"
            caption="Upper floor"
            tag="POOLSIDE VILLA"
            ratio="wide"
          />
        </div>
      </section>

      {/* 2 — From footprint to context */}
      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="THE CONTEXT"
          title="From footprint to context."
          lede="A house capture does not stop at the walls: the approach, the pool side, and the lot become part of one coherent picture."
        />
        <div className="idv-grid-2 idv-reveal">
          <MediaFigure
            src={VILLA.sequence[0].src}
            alt="Poolside Villa exterior from the front — the building footprint seen in its setting"
            caption="Exterior, front"
            tag="POOLSIDE VILLA"
            ratio="wide"
          />
          <MediaFigure
            src={VILLA.sequence[1].src}
            alt="Poolside Villa exterior from the pool side — outdoor living connected to the house"
            caption="Exterior, pool side"
            tag="POOLSIDE VILLA"
            ratio="wide"
          />
        </div>
      </section>

      {/* 3 — Certification honesty callout */}
      <section className="idv-section idv-section--flush">
        <div
          className="idv-reveal"
          style={{
            borderTop: '1px solid var(--idv-stone)',
            borderBottom: '1px solid var(--idv-stone)',
            padding: 'clamp(28px, 4vw, 52px) 0',
            display: 'grid',
            gap: 14,
          }}
        >
          <div className="idv-mono-label">What a capture is not</div>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--idv-serif)',
              fontSize: 'clamp(22px, 2.6vw, 38px)',
              lineHeight: 1.15,
              maxWidth: 940,
            }}
          >
            {m.limits[0]}
          </p>
        </div>
      </section>

      <MethodFacts method={m} />
      <MethodOutro method={m} methods={METHODS} />

      <CtaBand
        eyebrow={IDV_EYEBROW}
        headline="Start with what exists."
        copy="Send photos, video, or whatever plans survive. We return the visual foundation the rest of the project builds on."
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
