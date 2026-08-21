/**
 * /interior-design/client-presentation — addendum §16: how a finished project
 * is handed to the client (accent: present, gold → violet).
 *
 * Structure: dark hero (presentation frame mock) → presentation structure
 * (eight-part journey list) → full-bleed decision moment → what changes for
 * the client + FAQ → CTA. Not a METHODS entry, so no intro/facts/outro/portal.
 *
 * Honesty rule: every image is a real Maison Valmont deliverable, labeled as
 * such; the browser chrome is a styled frame, not a screenshot of a product.
 */
import React from 'react';
import { motion } from 'framer-motion';
import { InteriorShell, Eyebrow, IdvButton, MethodRail, CtaBand } from '@/components/interior/kit';
import { VALMONT } from '@/data/interiorMedia';
import DarkSectionBackground from '@/components/interior/DarkSectionBackground';

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* The eight parts of a client presentation — Maison Valmont assets only,
   each used once on this page, every label truthful to the deliverable. */
const PARTS = [
  { num: '01', title: 'PROJECT STORY', line: 'Where the project started and what it is becoming.', src: VALMONT.pairs[2].before, tag: 'DINING — EXISTING STATE', alt: 'Maison Valmont dining room in its existing state, the start of the project story' },
  { num: '02', title: 'FLOOR PLAN', line: 'The spatial logic, annotated so the client can read it without training.', src: VALMONT.annotated, tag: 'SALON — ANNOTATED VIEW', alt: 'Maison Valmont salon with design annotations explaining the spatial decisions' },
  { num: '03', title: 'ROOMS', line: 'Every room, finished, in one consistent visual sequence.', src: VALMONT.after[0].src, tag: 'BATH — RESTORED', alt: 'Maison Valmont restored bath as one room in the presentation sequence' },
  { num: '04', title: 'MATERIALS', line: 'The palette the rooms are built from, shown as real surfaces.', src: VALMONT.materials[5].src, tag: 'PLASTER DETAIL', alt: 'Maison Valmont plaster material detail from the presentation palette' },
  { num: '05', title: 'VIDEO', line: 'The transformation film, placed where the story peaks.', src: VALMONT.film.poster, tag: 'TRANSFORMATION FILM — POSTER', alt: 'Poster frame of the Maison Valmont transformation film' },
  { num: '06', title: 'ALTERNATIVES', line: 'The options considered, so the choice is informed rather than blind.', src: VALMONT.materials[7].src, tag: 'CHANDELIER DETAIL', alt: 'Maison Valmont chandelier detail, one of the options shown alongside the chosen direction' },
  { num: '07', title: 'APPROVAL', line: 'One clear question, asked only after everything has been seen.', src: VALMONT.gallery[11].src, tag: 'BATH DETAIL', alt: 'Maison Valmont bath detail at the level of finish the client approves' },
  { num: '08', title: 'NEXT STEP', line: 'What happens after yes — stated on the same page, not in a follow-up email.' },
];

const BENEFITS = [
  'One link opens the whole project — not forty attachments across three emails.',
  'The work is seen in the order it was designed to be understood: story, plan, rooms, materials, film.',
  'The approval question arrives after everything has been seen — never before.',
];

const FAQ = [
  ['What exactly do you send the client?', 'A single presentation that walks the project in order — story, plan, rooms, materials, film, alternatives — ending at one approval question and the next step. The organized files are still delivered alongside it; the presentation replaces the folder as the front door, not the archive.'],
  ['How does the approval moment work?', 'The presentation is structured so the decision is asked once, at the end, when the client has seen every room, the materials, and the alternatives that were considered. Nothing is approved from a thumbnail.'],
  ['Do we need every part of the structure?', 'No. The eight parts are the full shape; a project without a film or without alternatives simply skips those chapters. The order stays the same because the order is what does the work.'],
];

function Hero() {
  return (
    <section className="idv2-section idv2-dark idv2-acc-present" style={{ background: 'radial-gradient(900px 540px at 82% 0%, rgba(216,183,90,0.13), transparent 60%), radial-gradient(700px 460px at 8% 100%, rgba(122,72,255,0.14), transparent 55%), linear-gradient(180deg, #060708, #0B0A10)' }}>
      <DarkSectionBackground asset="cosmic-energy" position="center right" overlay={0.6} textSide="left" glow="gold" />
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 1.15fr) 1fr', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'center', minHeight: '88svh' }}>
        <div style={{ display: 'grid', gap: 22 }}>
          <motion.div {...rise(0)}><Eyebrow>AYESMAJ STUDIOS / CLIENT PRESENTATION</Eyebrow></motion.div>
          <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero" style={{ fontSize: 'clamp(38px, 4vw, 76px)' }}>
            Do not send<br />
            the client<br />
            a folder of files.<br />
            Give them<br />
            <span className="idv2-grad">an experience.</span>
          </motion.h1>
          <motion.p {...rise(0.18)} className="idv-lede">
            A finished project deserves better than attachments. A client presentation walks the
            project in the order it should be understood — and ends at one clear decision.
          </motion.p>
          <motion.div {...rise(0.28)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <button type="button" className="idv-btn" style={{ background: 'transparent', color: 'var(--idv-champagne)', border: '1px solid rgba(216,183,90,0.75)' }}
              onClick={() => document.getElementById('presentation-structure')?.scrollIntoView({ behavior: 'smooth' })}>
              See the structure
            </button>
            <IdvButton to="/Contact" ghost>Start a presentation</IdvButton>
          </motion.div>
          <motion.div {...rise(0.36)} className="idv-mono-label">ANSWERS: HOW SHOULD THE FINISHED PROJECT BE HANDED OVER?</motion.div>
        </div>
        {/* Presentation frame mock: real Maison Valmont deliverable inside a styled browser chrome */}
        <motion.figure {...rise(0.2)} style={{ margin: 0, display: 'grid', gap: 10 }}>
          <div style={{ borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.22)', background: '#111014', boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(216,183,90,0.12)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '11px 14px', background: '#17161B', borderBottom: '1px solid rgba(255,255,255,0.08)' }} aria-hidden="true">
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#E0664B' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#D8B75A' }} />
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#7A48FF' }} />
              <span className="idv-mono-label" style={{ marginLeft: 10, fontSize: 10, color: 'rgba(245,245,240,0.5)' }}>maison-valmont / presentation</span>
            </div>
            <img src={VALMONT.gallery[10].src} alt="Maison Valmont restored suite shown as a full-screen frame of the client presentation" loading="eager" decoding="async" style={{ display: 'block', width: '100%', aspectRatio: '4 / 5', objectFit: 'cover' }} />
          </div>
          <figcaption className="idv-mono-label" style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <span>MAISON VALMONT — PRESENTATION FRAME</span><span>SUITE, RESTORED</span>
          </figcaption>
        </motion.figure>
      </div>
      <MethodRail />
    </section>
  );
}

function Structure() {
  return (
    <section id="presentation-structure" className="idv2-section idv2-gradient-soft idv2-acc-present">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(32px, 4vw, 56px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>PRESENTATION STRUCTURE</Eyebrow>
          <h2 className="idv2-h2">Eight parts, <span className="idv2-grad">one order.</span></h2>
          <p className="idv-lede">
            The same shape carried every Maison Valmont deliverable below. The order is the point:
            understanding first, decision last.
          </p>
        </div>
        <div className="idv-journey">
          {PARTS.map((p) => (
            <div key={p.num} className="idv-journey-step idv2-reveal">
              <span className="idv-mono-label" style={{ color: 'var(--acc2)' }}>{p.num}</span>
              <div style={{ display: 'grid', gap: 8, alignContent: 'start' }}>
                <div style={{ fontFamily: 'var(--idv-serif)', fontWeight: 600, fontSize: 'clamp(19px, 1.8vw, 26px)' }}>{p.title}</div>
                <p className="idv-lede" style={{ margin: 0 }}>{p.line}</p>
              </div>
              {p.src ? (
                <figure style={{ margin: 0, display: 'grid', gap: 6, justifySelf: 'end', width: 'clamp(130px, 15vw, 210px)' }}>
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '16 / 10', objectFit: 'cover', borderRadius: 10, boxShadow: '0 12px 30px rgba(62,48,24,0.18)' }} />
                  <figcaption className="idv-mono-label" style={{ fontSize: 10 }}>MAISON VALMONT — {p.tag}</figcaption>
                </figure>
              ) : <span />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DecisionMoment() {
  return (
    <section className="idv2-full idv2-acc-present">
      <img src={VALMONT.after[6].src} alt="Maison Valmont restored suite — the finished room the client says yes to" loading="lazy" decoding="async" />
      <div className="idv2-full-scrim" style={{ background: 'linear-gradient(180deg, rgba(5,6,8,0.5), rgba(5,6,8,0.2) 40%, rgba(5,6,8,0.65))' }} />
      <div className="idv2-inner" style={{ position: 'relative', display: 'grid', gap: 14, alignSelf: 'end', width: '100%' }}>
        <Eyebrow>MAISON VALMONT — SUITE, RESTORED</Eyebrow>
        <h2 className="idv2-h2" style={{ maxWidth: 820 }}>
          The decision <span className="idv2-grad">moment.</span>
        </h2>
        <p className="idv-lede" style={{ maxWidth: 640, color: 'rgba(245,245,240,0.82)', paddingBottom: 'clamp(30px, 4vw, 60px)', margin: 0 }}>
          By the time the approval question appears, the client has walked the story, read the plan,
          seen every room and touched the materials. Approval stops being a leap of faith.
        </p>
      </div>
    </section>
  );
}

function WhatChanges() {
  return (
    <section className="idv2-section idv2-bright idv2-acc-present">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(36px, 4.5vw, 64px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 940 }}>
          <Eyebrow>WHAT CHANGES FOR YOUR CLIENT</Eyebrow>
          <h2 className="idv2-h2">From attachments to <span className="idv2-acc-text">a front door.</span></h2>
        </div>
        <div style={{ display: 'grid', gap: 0, maxWidth: 1040 }}>
          {BENEFITS.map((b) => (
            <p key={b} className="idv-lede" style={{ borderTop: '1px solid var(--idv-stone)', padding: '16px 2px', margin: 0, fontFamily: 'var(--idv-serif)', fontWeight: 600, fontSize: 'clamp(17px, 1.6vw, 23px)' }}>{b}</p>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 20, maxWidth: 980 }}>
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
      </div>
    </section>
  );
}

export default function InteriorClientPresentation() {
  return (
    <InteriorShell path="/interior-design/client-presentation">
      <Hero />
      <Structure />
      <DecisionMoment />
      <WhatChanges />
      <CtaBand
        eyebrow="AYESMAJ STUDIOS / CLIENT PRESENTATION"
        headline="The project is finished. Now hand it over properly."
        primary={{ label: 'Build my client presentation', to: '/Contact' }}
        secondary={{ label: 'Complete visual presentation', to: '/interior-design/complete-visual-presentation' }}
      />
    </InteriorShell>
  );
}
