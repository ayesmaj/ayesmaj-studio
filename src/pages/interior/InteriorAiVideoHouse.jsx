/**
 * /interior-design/ai-video-house — the most cinematic page of the world
 * (addendum §13, accent: experience orange → violet).
 *
 * Structure: full-bleed film hero (Maison Valmont — the one transformation
 * film that actually exists) → pinned six-chapter journey built from the
 * Poolside Villa master-frame sequence → what film adds → storyboard-first
 * honesty → facts → FAQ → next portal → CTA.
 *
 * Honesty rule: the Poolside Villa frames are master frames / storyboard,
 * never presented as an already-rendered film; every asset carries its
 * real project name.
 */
import React from 'react';
import { motion } from 'framer-motion';
import {
  InteriorShell, Eyebrow, IdvButton, MediaFigure, MethodRail, NextPortal,
  PinSeq, MethodFacts, MethodOutro, CtaBand,
} from '@/components/interior/kit';
import { METHODS, IDV_BASE } from '@/data/interiorDesign';
import { VALMONT, VILLA, VILLA_FILM_SEQUENCE } from '@/data/interiorMedia';

const m = METHODS['ai-video-house'];

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* Six chapters of one house — Poolside Villa master frames, in film order. */
const CHAPTERS = [
  { label: 'ARRIVE', src: VILLA_FILM_SEQUENCE[1].src, alt: 'Poolside Villa exterior — the arrival chapter of the house film', line: 'The house makes its first impression before a single door opens.' },
  { label: 'ENTER', src: VILLA_FILM_SEQUENCE[2].src, alt: 'Poolside Villa foyer — the entry chapter', line: 'The door gives way and the foyer sets the tone for everything behind it.' },
  { label: 'GATHER', src: VILLA_FILM_SEQUENCE[3].src, alt: 'Poolside Villa living room — the gathering chapter', line: 'The living room is where the film slows down: this is where life happens.' },
  { label: 'RETREAT', src: VILLA_FILM_SEQUENCE[6].src, alt: 'Poolside Villa primary bedroom — the retreat chapter', line: 'Up the stair and away from the noise — the primary suite is the private end of the route.' },
  { label: 'OPEN OUTSIDE', src: VILLA_FILM_SEQUENCE[8].src, alt: 'Poolside Villa outdoor lounge — the indoor-outdoor chapter', line: 'The wall opens and inside becomes outside: the lounge, the air, the evening.' },
  { label: 'REMEMBER', src: VILLA_FILM_SEQUENCE[10].src, alt: 'Poolside Villa pool at water level — the closing chapter', line: 'The film ends at water level — the frame the client remembers.' },
];

/* What film adds — each figure labeled with its real project. */
const ADDS = [
  { head: 'ARRIVAL', src: VALMONT.gallery[1].src, alt: 'Maison Valmont restored salon film frame — the camera arriving into the room', caption: 'MAISON VALMONT — SALON FILM FRAME' },
  { head: 'SCALE', src: VILLA_FILM_SEQUENCE[5].src, alt: 'Poolside Villa staircase master frame — movement reading vertical scale', caption: 'POOLSIDE VILLA — STAIRCASE MASTER FRAME' },
  { head: 'LIGHT', src: VILLA_FILM_SEQUENCE[4].src, alt: 'Poolside Villa kitchen master frame — light across material', caption: 'POOLSIDE VILLA — KITCHEN MASTER FRAME' },
  { head: 'EMOTION', src: VALMONT.gallery[3].src, alt: 'Maison Valmont kitchen film frame — atmosphere the still cannot carry alone', caption: 'MAISON VALMONT — KITCHEN FILM FRAME' },
];

const FAQ = [
  ['What do you need to start a house film?', 'The house plan, approved key-frame imagery for the rooms the film visits, and the audience it is for — owner, buyer, or investor. The plan stays the spatial source of truth; the film is built on top of it.'],
  ['Does the film redesign the house?', 'No. The architecture stays locked: the film moves the camera, never the walls. Design changes happen in the plan and the master frames first, then the film follows.'],
  ['Can I take measurements from the film?', 'No — video is not measurement documentation. Dimensions, clearances, and construction decisions always come from the plans, not from a frame of the film.'],
];

function Hero() {
  return (
    <section className="idv2-full idv2-acc-experience" style={{ gridTemplateRows: '1fr auto', background: '#060505' }}>
      <video
        src={VALMONT.film.src}
        poster={VALMONT.film.posterFinal}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        aria-label="Maison Valmont transformation film — ruined rooms becoming restored rooms"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
      <div className="idv2-full-scrim" style={{ background: 'linear-gradient(90deg, rgba(5,4,4,0.82) 0%, rgba(5,4,4,0.42) 52%, rgba(5,4,4,0.12) 100%)' }} />
      <div className="idv2-inner" style={{ display: 'grid', gap: 22, alignSelf: 'end', width: '100%', paddingBottom: 'clamp(50px, 6vw, 90px)' }}>
        <motion.div {...rise(0)}><Eyebrow>AYESMAJ STUDIOS / AI HOUSE VIDEO</Eyebrow></motion.div>
        <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero" style={{ maxWidth: 720 }}>
          Show <span className="idv2-grad">the life</span><br />
          between<br />
          the rooms.
        </motion.h1>
        <motion.p {...rise(0.18)} className="idv-lede" style={{ maxWidth: 640, color: 'rgba(245,245,240,0.8)' }}>
          {m.intro}
        </motion.p>
        <motion.div {...rise(0.28)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
          <button type="button" className="idv-btn" style={{ background: 'transparent', color: 'var(--idv-champagne)', border: '1px solid rgba(216,183,90,0.75)' }}
            onClick={() => document.getElementById('film-journey')?.scrollIntoView({ behavior: 'smooth' })}>
            Walk the journey
          </button>
          <IdvButton to="/Contact" ghost>{m.cta}</IdvButton>
        </motion.div>
        <motion.div {...rise(0.36)} className="idv-mono-label" style={{ color: 'rgba(245,245,240,0.6)' }}>
          NOW PLAYING: MAISON VALMONT — TRANSFORMATION FILM
        </motion.div>
      </div>
      <MethodRail />
    </section>
  );
}

function Journey() {
  return (
    <section id="film-journey" className="idv2-section idv2-spatial idv2-acc-experience">
      <div className="idv2-inner" style={{ paddingBottom: 24 }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>THE JOURNEY</Eyebrow>
          <h2 className="idv2-h2">One house, <span className="idv2-grad">six chapters.</span></h2>
          <p className="idv-lede">
            Scroll: every frame below is a Poolside Villa master frame, shown in the order a
            house film moves — arrival to the last look back. This is the storyboard the film
            is directed from.
          </p>
        </div>
      </div>
      <PinSeq stages={CHAPTERS} height="500vh" accentClass="idv2-acc-experience" ariaLabel="Poolside Villa — six chapters of the house film journey" />
    </section>
  );
}

function WhatFilmAdds() {
  return (
    <section className="idv2-section idv2-dark idv2-acc-experience idv2-bgc idv2-bgc-01">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 52px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 900 }}>
          <Eyebrow>WHAT FILM ADDS</Eyebrow>
          <h2 className="idv2-h2">What a still <span className="idv2-acc-text">cannot carry.</span></h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(18px, 2.2vw, 32px)' }}>
          {ADDS.map((a, i) => (
            <div key={a.head} className="idv2-reveal" style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
              <div className="idv2-h2" style={{ fontSize: 'clamp(28px, 2.6vw, 42px)' }}>
                <span className="idv-mono-label" style={{ display: 'block', marginBottom: 4 }}>{'0' + (i + 1)}</span>
                {a.head}
              </div>
              <MediaFigure src={a.src} alt={a.alt} caption={a.caption} ratio="45" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MasterFrames() {
  return (
    <section className="idv2-section idv2-bright idv2-acc-experience">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 48px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 1000 }}>
          <Eyebrow>HOW IT IS ACTUALLY MADE</Eyebrow>
          <h2 className="idv2-h2">The film is built from <span className="idv2-grad">master frames.</span></h2>
          <p className="idv-lede">
            Storyboard first, film second. Every room the camera visits is approved as a still
            before a single second of motion exists — the plan locks the geometry, the master
            frames lock the design, and the film connects them.
          </p>
        </div>
        <MediaFigure
          src={VILLA.contactSheet}
          alt="Poolside Villa 29-frame contact sheet — the complete master-frame set behind the house film"
          caption="POOLSIDE VILLA — 29-FRAME CONTACT SHEET"
          tag="THE STORYBOARD"
        />
        <div className="idv-grid-2" style={{ alignItems: 'start' }}>
          <div className="idv2-reveal" style={{ display: 'grid', gap: 10 }}>
            <div className="idv-mono-label">WHY FRAMES COME FIRST</div>
            <p className="idv-lede" style={{ margin: 0 }}>
              A frame is cheap to change; a film is not. Approving the storyboard means every
              expensive second of motion is spent on a design that is already agreed.
            </p>
          </div>
          <div className="idv2-reveal" style={{ display: 'grid', gap: 0 }}>
            <div className="idv-mono-label" style={{ marginBottom: 10 }}>WHAT THE FILM WILL NEVER DO</div>
            {m.limits.map((l) => (
              <p key={l} className="idv-lede" style={{ borderTop: '1px solid var(--idv-stone)', paddingTop: 12, margin: '0 0 12px' }}>{l}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="idv2-section idv2-bright">
      <div className="idv2-inner" style={{ display: 'grid', gap: 24, maxWidth: 980 }}>
        <Eyebrow>QUESTIONS OWNERS ASK</Eyebrow>
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

export default function InteriorAiVideoHouse() {
  return (
    <InteriorShell path={m.route}>
      <Hero />
      <Journey />
      <WhatFilmAdds />
      <MasterFrames />
      <div className="idv2-section idv2-gradient-soft idv2-acc-experience">
        <div className="idv2-inner idv2-section--flush" style={{ paddingTop: 'clamp(60px, 7vw, 110px)', paddingBottom: 'clamp(40px, 5vw, 80px)' }}>
          <MethodFacts method={m} />
          <MethodOutro method={m} methods={METHODS} />
        </div>
      </div>
      <Faq />
      <NextPortal methodKey="ai-video-house" image={VALMONT.film.poster} />
      <CtaBand
        eyebrow="AYESMAJ STUDIOS / AI HOUSE VIDEO"
        headline="The plan explains the house. The film sells the life."
        primary={{ label: m.cta, to: '/Contact' }}
        secondary={{ label: 'All visualization methods', to: IDV_BASE }}
      />
    </InteriorShell>
  );
}
