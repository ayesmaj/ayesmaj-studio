/**
 * /interior-design/ai-video-apartment — film-led method page (addendum §12).
 * Accent: experience (amber → violet). Structure: full-bleed film hero →
 * interactive storyboard → camera language → limitation → FAQ → facts →
 * next portal → CTA.
 *
 * Honesty carried from the audit: the hero film is THE PATEL's rendered hero
 * film, labeled as a craft reference from a separate project; the storyboard
 * uses real Canal Apartment frames arranged as a film WOULD walk them — no
 * claim that a rendered Canal Apartment film exists; camera language uses
 * Poolside Villa master frames (film-ready storyboard, not film stills).
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  InteriorShell, Eyebrow, IdvButton, MediaFigure, MethodSwitcher, MethodRail,
  NextPortal, MethodFacts, MethodOutro, CtaBand,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE } from '@/data/interiorDesign';
import { APARTMENT, VILLA, PATEL } from '@/data/interiorMedia';

const m = METHODS['ai-video-apartment'];

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* Storyboard: real Canal Apartment frames in film order. The 'waterfront'
   asset is the view shot — labeled honestly, not renamed to balcony. */
const SHOTS = [
  { key: 'plan', label: 'PLAN STUDY', src: APARTMENT.studies[4].src, alt: 'Canal Apartment overview study — the film opens on the geometry', purpose: 'State the geography first: every later shot is a place on this study.', camera: 'Top-down, slow push-in over the study.' },
  { key: 'living', label: 'LIVING', src: APARTMENT.gallery[3].src, alt: 'Canal Apartment living room — the establishing shot', purpose: 'Establish the main space and its light — the room the film keeps returning to.', camera: 'Forward dolly from the entry line, walking pace.' },
  { key: 'dining', label: 'DINING', src: APARTMENT.gallery[0].src, alt: 'Canal Apartment dining at counter height', purpose: 'Show the working heart of the apartment at counter height.', camera: 'Lateral glide along the counter line.' },
  { key: 'primary', label: 'PRIMARY', src: APARTMENT.gallery[2].src, alt: 'Canal Apartment primary — a held, quiet frame', purpose: 'A quiet beat between the big rooms — material and calm.', camera: 'Static frame; the light moves, the camera does not.' },
  { key: 'lounge', label: 'LOUNGE', src: APARTMENT.gallery[1].src, alt: 'Canal Apartment lounge filled with daylight', purpose: 'Lift the mood — the brightest room carries the film’s turn.', camera: 'Slow pivot toward the glazing.' },
  { key: 'waterfront', label: 'WATERFRONT STUDY', src: APARTMENT.studies[6].src, alt: 'Canal Apartment waterfront view — the closing shot', purpose: 'End on the view the apartment is named for.', camera: 'Ease out toward the water and hold.' },
];

/* Camera language over Poolside Villa master frames — the film-ready
   storyboard set, honestly captioned as frames, not film stills. */
const MOVES = [
  { title: 'Dolly', line: 'The camera walks the room at human pace — scale is felt, not read.', src: VILLA.sequence[5].src, alt: 'Poolside Villa living detail master frame — a dolly move ends here' },
  { title: 'Threshold reveal', line: 'The frame crosses a doorway so the next room answers the last one.', src: VILLA.sequence[6].src, alt: 'Poolside Villa dining master frame — revealed through the threshold' },
  { title: 'Exterior reveal', line: 'The move ends outside — the room widens into the whole property.', src: VILLA.sequence[1].src, alt: 'Poolside Villa pool-side exterior master frame — the widest reveal' },
];

const FAQ = [
  ['What do you need before an apartment film can start?', 'Approved room imagery for the first and last frames, a locked plan as the spatial source of truth, and the mood the film should carry. The film is only as strong as that base — it cannot rescue weak source imagery.'],
  ['Can the film change the design?', 'No. Architecture stays locked: the film moves the camera, not the walls. Design changes go back to the plan or render stage first, then the film is updated.'],
  ['Can we measure or build from the film?', 'No. Video is not measurement documentation — the plan remains the spatial source of truth. The film’s job is sequence, light, and atmosphere.'],
];

function Hero() {
  return (
    <section className="idv2-full idv2-acc-experience">
      <video
        src={PATEL.film.mobile}
        poster={APARTMENT.studies[4].src}
        autoPlay muted loop playsInline preload="metadata"
        aria-label="The Patel — rendered hero film, shown as a craft reference from a separate project"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div className="idv2-full-scrim" style={{ background: 'linear-gradient(180deg, rgba(6,5,4,0.6), rgba(6,5,4,0.3) 42%, rgba(6,5,4,0.78))' }} />
      <span className="idv2-float-label" style={{ right: 'var(--idv-pad)', top: 'clamp(90px, 10vw, 140px)' }}>
        THE PATEL — craft reference (separate project)
        <span style={{ fontWeight: 500, fontSize: 11, color: 'rgba(245,245,240,0.7)' }}>Poster frame: Canal Apartment — overview</span>
      </span>
      <div className="idv2-inner" style={{ display: 'grid', gap: 22, paddingBottom: 'clamp(70px, 8vw, 120px)' }}>
        <motion.div {...rise(0)}><Eyebrow>AYESMAJ STUDIOS / AI APARTMENT VIDEO</Eyebrow></motion.div>
        <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero">
          Turn the<br />
          apartment plan<br />
          <span className="idv2-grad">into a journey.</span>
        </motion.h1>
        <motion.p {...rise(0.18)} className="idv-lede" style={{ color: 'rgba(245,245,240,0.8)' }}>
          {m.intro}
        </motion.p>
        <motion.div {...rise(0.28)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button type="button" className="idv-btn" style={{ background: 'transparent', color: 'var(--idv-champagne)', border: '1px solid rgba(216,183,90,0.75)' }}
            onClick={() => document.getElementById('storyboard')?.scrollIntoView({ behavior: 'smooth' })}>
            Walk the storyboard
          </button>
          <IdvButton to="/Contact" ghost>{m.cta}</IdvButton>
        </motion.div>
        <motion.div {...rise(0.36)} className="idv-mono-label" style={{ color: 'rgba(245,245,240,0.6)' }}>
          ANSWERS: {m.question.toUpperCase()}
        </motion.div>
      </div>
    </section>
  );
}

function Storyboard() {
  const [key, setKey] = useState('plan');
  const shot = SHOTS.find((s) => s.key === key);
  const num = SHOTS.indexOf(shot) + 1;
  return (
    <section id="storyboard" className="idv2-section idv2-bright idv2-acc-experience">
      <div className="idv2-inner" style={{ display: 'grid', gap: 26 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 960 }}>
          <Eyebrow>THE STORYBOARD</Eyebrow>
          <h2 className="idv2-h2">Six frames. <span className="idv2-grad">One journey.</span></h2>
          <p className="idv-lede">
            Real Canal Apartment frames, arranged the way an apartment film would walk them —
            plan first, view last. Pick a shot to see what it does and how the camera moves.
          </p>
        </div>
        <MethodSwitcher
          ariaLabel="Storyboard shots"
          options={SHOTS.map((s) => ({ key: s.key, label: s.label }))}
          value={key}
          onChange={setKey}
        />
        <MediaFigure
          src={shot.src}
          alt={shot.alt}
          caption={`CANAL APARTMENT — ${shot.label}`}
          tag={`SHOT 0${num} / 06`}
        />
        <div className="idv-grid-2" style={{ maxWidth: 980 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>SHOT PURPOSE</div>
            <p className="idv-lede" style={{ margin: 0 }}>{shot.purpose}</p>
          </div>
          <div style={{ display: 'grid', gap: 8 }}>
            <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>CAMERA DIRECTION</div>
            <p className="idv-lede" style={{ margin: 0 }}>{shot.camera}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CameraLanguage() {
  return (
    <section className="idv2-section idv2-dark idv2-acc-experience">
      <div className="idv2-inner" style={{ display: 'grid', gap: 32 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>CAMERA LANGUAGE</Eyebrow>
          <h2 className="idv2-h2">Three moves that <span className="idv2-grad">sell a space.</span></h2>
          <p className="idv-lede">
            Master frames from the Poolside Villa storyboard set — the frames that direct
            where each camera move begins and ends.
          </p>
        </div>
        <div className="idv-grid-3">
          {MOVES.map((mv) => (
            <figure key={mv.title} className="idv-figure idv-figure--frame idv2-reveal" style={{ margin: 0, display: 'grid', gap: 10, alignContent: 'start' }}>
              <img src={mv.src} alt={mv.alt} loading="lazy" decoding="async" style={{ borderRadius: 14 }} />
              <figcaption style={{ color: 'rgba(245,245,240,0.6)' }}><span>POOLSIDE VILLA</span><span>MASTER FRAMES</span></figcaption>
              <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{mv.title.toUpperCase()}</div>
              <p className="idv-lede" style={{ margin: 0 }}>{mv.line}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Limitation() {
  return (
    <section className="idv2-section idv2-gradient-soft idv2-acc-experience">
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 'clamp(24px, 3.5vw, 56px)', alignItems: 'center' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 18 }}>
          <Eyebrow>HONEST LIMITS</Eyebrow>
          <h2 className="idv2-h2">
            Video creates <span className="idv2-acc-text">emotion.</span><br />
            <span className="idv2-grad">Plans preserve the truth.</span>
          </h2>
          <div style={{ display: 'grid', gap: 0 }}>
            {m.limits.map((l) => (
              <p key={l} className="idv-lede" style={{ borderTop: '1px solid var(--idv-stone)', paddingTop: 12, margin: '0 0 12px' }}>{l}</p>
            ))}
          </div>
        </div>
        <MediaFigure
          src={APARTMENT.studies[3].src}
          alt="Canal Apartment living study — the plan stays the spatial source of truth behind the film"
          caption="CANAL APARTMENT — LIVING STUDY"
          tag="SOURCE OF TRUTH"
        />
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="idv2-section idv2-spatial idv2-acc-experience">
      <div className="idv2-inner" style={{ display: 'grid', gap: 24, maxWidth: 980 }}>
        <Eyebrow>QUESTIONS DESIGNERS ASK</Eyebrow>
        <div>
          {FAQ.map(([q, a]) => (
            <details key={q} className="idv-row">
              <summary>{q}</summary>
              <div className="idv-row-body"><p className="idv-lede" style={{ margin: 0 }}>{a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function InteriorAiVideoApartment() {
  return (
    <InteriorShell path={m.route}>
      <Hero />
      <MethodRail />
      <Storyboard />
      <CameraLanguage />
      <Limitation />
      <Faq />
      <div className="idv2-section idv2-bright idv2-acc-experience">
        <div className="idv2-inner idv2-section--flush" style={{ paddingTop: 'clamp(60px, 7vw, 110px)', paddingBottom: 'clamp(40px, 5vw, 80px)' }}>
          <MethodFacts method={m} />
          <MethodOutro method={m} methods={METHODS} />
        </div>
      </div>
      <NextPortal methodKey="ai-video-apartment" image={APARTMENT.pair.editorial} />
      <CtaBand
        eyebrow="AYESMAJ STUDIOS / AI APARTMENT VIDEO"
        headline="The plan explains the space. The film explains the feeling."
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
