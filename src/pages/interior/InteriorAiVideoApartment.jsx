/**
 * /interior-design/ai-video-apartment — METHOD 03 / EXPERIENCE.
 * Cinematic AI apartment video: the journey the film walks (Canal Apartment),
 * what a finished film feels like (The Patel, labeled as a separate project),
 * and the honest limits of the medium. Copy from @/data/interiorDesign,
 * media from @/data/interiorMedia.
 */
import React from 'react';
import {
  InteriorShell, SectionHead, MediaFigure, CtaBand, MethodIntro, MethodFacts, MethodOutro,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE, IDV_EYEBROW, FINAL_CTA } from '@/data/interiorDesign';
import { APARTMENT, PATEL } from '@/data/interiorMedia';

const m = METHODS['ai-video-apartment'];

/**
 * The film journey, told through one project only: the Canal Apartment.
 * The method's spine is PLAN → LIVING → KITCHEN → BEDROOM → BATHROOM → BALCONY;
 * this apartment closes at its sunroom and the waterfront instead of a bedroom
 * and balcony, so the last two steps carry the rooms it actually has.
 */
const JOURNEY_STEPS = [
  ['living', 'LIVING'],
  ['kitchen', 'KITCHEN'],
  ['bath', 'BATHROOM'],
  ['sunroom', 'SUNROOM'],
  ['waterfront', 'WATERFRONT'],
].map(([room, step], i) => ({
  step: `0${i + 1} — ${step}`,
  frame: APARTMENT.rooms.find((f) => f.room === room),
}));

function FilmJourney() {
  return (
    <section className="idv-section idv-section--flush">
      <SectionHead
        eyebrow="THE SEQUENCE"
        title="The journey the film takes."
        lede="One apartment, one continuous walk. The camera moves room to room in the order a visit would — every frame below is the Canal Apartment, and the sequence closes where this apartment actually ends: the sunroom and the water."
      />
      <div className="idv-strip idv-reveal" aria-label="Canal Apartment film journey">
        {JOURNEY_STEPS.map((s) => (
          <MediaFigure
            key={s.frame.src}
            src={s.frame.src}
            alt={`Canal Apartment — ${s.frame.label}, a frame from the apartment film journey`}
            caption={s.step}
            tag="CANAL APARTMENT"
            ratio="45"
          />
        ))}
      </div>
    </section>
  );
}

function FinishedFilm() {
  return (
    <section className="idv-section idv-section--flush">
      <SectionHead
        eyebrow="THE RESULT"
        title="What a finished film feels like."
        lede="Movement, light, and sequence doing what stills cannot. This reference comes from a different project and is labeled as such."
      />
      <div className="idv-grid-2 idv-reveal">
        <MediaFigure
          video
          src={PATEL.film.mobile}
          poster={PATEL.film.poster}
          alt="The Patel development film, shown as a craft reference from a separate project"
          caption="The Patel — development film (separate project, shown as craft reference)"
          tag="THE PATEL"
          ratio="45"
        />
        <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
          <div className="idv-mono-label">What the film reveals</div>
          {m.reveals.map((r) => (
            <div key={r} style={{ borderTop: '1px solid var(--idv-stone)', paddingTop: 10, fontFamily: 'var(--idv-serif)', fontSize: 'clamp(18px, 1.7vw, 24px)' }}>{r}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HonestLimits() {
  return (
    <section className="idv-section--bone">
      <div className="idv-inner idv-section">
        <SectionHead
          eyebrow="HONEST LIMITS"
          title="What the film does not do."
          lede="A film is an experience, not a document. Three things stay true on every apartment video we make."
        />
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', maxWidth: 860 }} className="idv-reveal">
          {m.limits.map((limit, i) => (
            <li key={limit} style={{ display: 'flex', gap: 20, alignItems: 'baseline', borderTop: '1px solid var(--idv-stone)', padding: '18px 0' }}>
              <span className="idv-stage-num">0{i + 1}</span>
              <span style={{ fontFamily: 'var(--idv-serif)', fontSize: 'clamp(20px, 2vw, 30px)', lineHeight: 1.2 }}>{limit}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default function InteriorAiVideoApartment() {
  return (
    <InteriorShell path={m.route}>
      <MethodIntro method={m} eyebrowPrefix="METHOD 03 / EXPERIENCE" />
      <FilmJourney />
      <FinishedFilm />
      <HonestLimits />
      <MethodFacts method={m} />
      <MethodOutro method={m} methods={METHODS} />
      <CtaBand
        eyebrow={IDV_EYEBROW}
        headline={FINAL_CTA.headline}
        copy={FINAL_CTA.copy}
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
