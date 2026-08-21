/**
 * /interior-design/ai-video-house — METHOD 03 / EXPERIENCE.
 * The house-film method page: the Poolside Villa master-frame storyboard a
 * house film is built from, plus a delivered transformation film from a
 * separate project (Maison Valmont). Copy from @/data/interiorDesign,
 * media from @/data/interiorMedia.
 */
import React from 'react';
import {
  InteriorShell, SectionHead, MediaFigure, CtaBand, MethodIntro, MethodFacts, MethodOutro,
} from '@/components/interior/kit';
import { IDV_BASE, IDV_EYEBROW, METHODS } from '@/data/interiorDesign';
import { VILLA_FILM_SEQUENCE, VALMONT } from '@/data/interiorMedia';

const m = METHODS['ai-video-house'];

const step = (i) => String(i + 1).padStart(2, '0');

export default function InteriorAiVideoHouse() {
  return (
    <InteriorShell path={m.route}>
      <MethodIntro method={m} eyebrowPrefix="METHOD 03 / EXPERIENCE" />

      {/* ── The master-frame storyboard — one project, walked in order ────── */}
      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="THE STORYBOARD"
          title={<>One house,<br />one continuous journey.</>}
          lede="This is the master-frame storyboard a house film is built from: the Poolside Villa walked in order, from floor plan to water level, in one consistent architecture. The film moves the camera through this sequence — it never redesigns the house."
        />
        <div className="idv-strip idv-reveal" aria-label="Poolside Villa master-frame storyboard">
          {VILLA_FILM_SEQUENCE.map((f, i) => (
            <MediaFigure
              key={f.src}
              src={f.src}
              alt={`Poolside Villa storyboard frame ${step(i)}: ${f.label}`}
              caption={`${step(i)} — ${f.label}`}
              tag="POOLSIDE VILLA"
              ratio="45"
            />
          ))}
        </div>
      </section>

      {/* ── A delivered film — separate project, honestly labeled ─────────── */}
      <section className="idv-section idv-section--flush">
        <SectionHead
          eyebrow="THE RESULT IN MOTION"
          title="A transformation film, delivered."
          lede="What a finished film feels like: a renovation carried from existing condition to reveal, from a separate project — Maison Valmont."
        />
        <MediaFigure
          video
          src={VALMONT.film.src}
          poster={VALMONT.film.poster}
          alt="Maison Valmont transformation film, from existing condition to restored reveal"
          caption="Maison Valmont — transformation film"
          tag="SEPARATE PROJECT"
          ratio="wide"
        />
      </section>

      <MethodFacts method={m} />
      <MethodOutro method={m} methods={METHODS} />

      <CtaBand
        eyebrow={IDV_EYEBROW}
        headline="Send the plan. We will build the journey."
        copy="A locked plan and approved key frames are enough to start. The film follows the architecture — arrival, flow, and the moment the living room opens to the pool."
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
