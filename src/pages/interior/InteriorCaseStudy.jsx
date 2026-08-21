/**
 * /interior-design/case-studies/:slug — one case study, told with its own
 * project's media only, restyled to the idv2 cinematic system (addendum §18).
 * Narrative order: project → problem (hero) → source → methods → visuals →
 * film → deliverables → FAQ → next-case portal → CTA.
 * Copy comes from CASE_STUDIES; media from interiorMedia. Unknown slugs
 * redirect to the case-study index.
 */
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import {
  InteriorShell, Eyebrow, MediaFigure, MethodRail, CtaBand,
} from '@/components/interior/kit';
import { IDV_BASE, CASE_STUDIES } from '@/data/interiorDesign';
import { VILLA, VALMONT, PATEL, PROJECTS, CASE_COVERS } from '@/data/interiorMedia';
import BeforeAfterSlider from '@/components/ayesmaj/BeforeAfterSlider';

const ACCENT = '#B79661';
const ACCENT_RGB = '183,150,97';

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* ── Small idv2 helpers ───────────────────────────────────────────────────── */
function Head({ eyebrow, title, lede }) {
  return (
    <div className="idv2-reveal" style={{ display: 'grid', gap: 16, maxWidth: 980, marginBottom: 'clamp(28px, 4vw, 56px)' }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="idv2-h2">{title}</h2>
      {lede ? <p className="idv-lede" style={{ margin: 0 }}>{lede}</p> : null}
    </div>
  );
}

function ChipRow({ label, items, dark = false }) {
  const chip = {
    fontFamily: 'var(--idv-mono)', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase',
    color: dark ? 'rgba(245,245,240,0.8)' : 'var(--idv-graphite)',
    border: `1px solid ${dark ? 'rgba(255,255,255,0.25)' : 'var(--idv-stone)'}`,
    borderRadius: 999, padding: '9px 18px',
    background: dark ? 'rgba(255,255,255,0.05)' : 'var(--idv-panel)',
  };
  return (
    <div style={{ display: 'grid', gap: 14 }}>
      <div className="idv-mono-label">{label}</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {items.map((m) => <span key={m} style={chip}>{m}</span>)}
      </div>
    </div>
  );
}

/* ── Hero: project + problem ──────────────────────────────────────────────── */
function CaseHero({ study }) {
  const words = study.name.toUpperCase().split(' ');
  const last = words.pop();
  return (
    <section className="idv2-section idv2-dark idv2-acc-present" style={{ background: 'radial-gradient(900px 540px at 80% 0%, rgba(122,72,255,0.15), transparent 60%), radial-gradient(700px 460px at 10% 100%, rgba(216,183,90,0.13), transparent 55%), linear-gradient(180deg, #060708, #0B0C10)' }}>
      <div className="idv2-inner" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'clamp(28px, 4vw, 60px)', alignItems: 'end', minHeight: '76svh' }}>
        <div style={{ display: 'grid', gap: 22, alignContent: 'center' }}>
          <motion.div {...rise(0)}><Eyebrow>CASE STUDY / {study.kind.toUpperCase()}</Eyebrow></motion.div>
          <motion.h1 {...rise(0.08)} className="idv2-display idv2-display--hero">
            {words.join(' ')}{words.length ? <br /> : null}
            <span className="idv2-grad">{last}.</span>
          </motion.h1>
          <motion.p {...rise(0.18)} className="idv-lede">{study.challenge}</motion.p>
        </div>
        <motion.div {...rise(0.26)} style={{ display: 'grid', gap: 22, alignContent: 'end', paddingBottom: 'clamp(8px, 1.5vw, 24px)' }}>
          <div style={{ display: 'grid', gap: 10 }}>
            <div className="idv-mono-label">Audience</div>
            <p className="idv-lede" style={{ margin: 0 }}>{study.audience}</p>
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <div className="idv-mono-label">Why this system</div>
            <p className="idv-lede" style={{ margin: 0 }}>{study.why}</p>
          </div>
        </motion.div>
      </div>
      <MethodRail />
    </section>
  );
}

/* ── Poolside Villa: source+methods → 29-frame sequence → film prep ───────── */
function PoolsideVilla({ study }) {
  const captions = ['Ground floor', 'Upper floor'];
  return (
    <>
      <section className="idv2-section idv2-bright idv2-acc-present">
        <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 52px)' }}>
          <Head
            eyebrow="SOURCE — POOLSIDE VILLA"
            title={<>Two plans anchor <span className="idv2-acc-text">the geometry.</span></>}
            lede="Every frame that follows defers to these drawings. The plans are the spatial source of truth."
          />
          <div className="idv-grid-2">
            {VILLA.plans.map((p, i) => (
              <MediaFigure
                key={p.src}
                src={p.src}
                alt={`Poolside Villa ${captions[i].toLowerCase()} plan — the spatial source of truth for the sequence`}
                caption={`Poolside Villa — ${captions[i]}`}
                tag="SOURCE — spatial truth"
                ratio="wide"
                eager={i === 0}
              />
            ))}
          </div>
          <ChipRow label="Methods used" items={study.methods} />
        </div>
      </section>

      <section className="idv2-section idv2-dark idv2-acc-present">
        <div className="idv2-inner">
          <Head
            eyebrow="THE SEQUENCE"
            title={<>Twenty-nine frames, <span className="idv2-grad">one house.</span></>}
            lede="From the front door to the pool at water level: one consistent architecture, walked room by room."
          />
          <div className="idv-strip idv2-reveal" aria-label="Poolside Villa 29-frame sequence">
            {VILLA.sequence.map((f, i) => (
              <MediaFigure
                key={f.src}
                src={f.src}
                alt={`Poolside Villa — ${f.label}`}
                caption={`${String(i + 3).padStart(2, '0')} — ${f.label}`}
                ratio="45"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="idv2-section idv2-gradient-soft idv2-acc-present">
        <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 52px)' }}>
          <Head
            eyebrow="FILM PREP — POOLSIDE VILLA"
            title={<>Directed for film — <span className="idv2-acc-text">not yet rendered.</span></>}
            lede="The master frames arranged in shooting order: the film-ready storyboard the future film would be directed from. No rendered film exists for this project."
          />
          <MediaFigure
            src={VILLA.contactSheet}
            alt="Poolside Villa film contact sheet: the master frames arranged in shooting order"
            caption="Film contact sheet"
            tag="POOLSIDE VILLA"
          />
          <ChipRow label="The delivered system" items={study.system} />
        </div>
      </section>
    </>
  );
}

/* ── Maison Valmont: before/after+methods → process → film → materials ────── */
function MaisonValmont({ study }) {
  const rooms = ['Salon', 'Dining', 'Entrance'];
  const pairs = rooms.map((r) => VALMONT.pairs.find((p) => p.room === r)).filter(Boolean);
  return (
    <>
      <section className="idv2-section idv2-bright idv2-acc-present">
        <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(36px, 5vw, 64px)' }}>
          <Head
            eyebrow="SOURCE — MAISON VALMONT"
            title={<>The same rooms, <span className="idv2-acc-text">two states.</span></>}
            lede="The value of the restoration is invisible in the ruined rooms. The existing state is the source; the restored state is the proposal. These pairs make the decision tangible."
          />
          {pairs.map((p) => (
            <div key={p.room} style={{ display: 'grid', gap: 12 }}>
              <BeforeAfterSlider
                beforeImg={p.before}
                afterImg={p.after}
                beforeLabel="EXISTING"
                afterLabel="RESTORED"
                accent={ACCENT}
                accentRGB={ACCENT_RGB}
              />
              <div className="idv-mono-label">Maison Valmont — {p.room}</div>
            </div>
          ))}
          <ChipRow label="Methods used" items={study.methods} />
        </div>
      </section>

      <section className="idv2-section idv2-dark idv2-acc-present">
        <div className="idv2-inner">
          <Head
            eyebrow="PROCESS"
            title={<>The road between <span className="idv2-grad">the two states.</span></>}
            lede="Eight stages, in build order, so the owners could see the path — not just the destination."
          />
          <div className="idv-strip idv2-reveal" aria-label="Maison Valmont renovation stages">
            {VALMONT.process.map((p, i) => (
              <MediaFigure
                key={p.src}
                src={p.src}
                alt={`Maison Valmont renovation stage: ${p.label}`}
                caption={`0${i + 1} — ${p.label}`}
                ratio="45"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="idv2-section idv2-gradient-soft idv2-acc-present">
        <div className="idv2-inner">
          <Head eyebrow="FILM — MAISON VALMONT" title={<>The reveal, delivered <span className="idv2-acc-text">as film.</span></>} />
          <MediaFigure
            video
            src={VALMONT.film.src}
            poster={VALMONT.film.poster}
            alt="Maison Valmont transformation film, from existing condition to restored rooms"
            caption="Maison Valmont — transformation film"
            tag="FILM"
            ratio="wide"
          />
        </div>
      </section>

      <section className="idv2-section idv2-spatial idv2-acc-present">
        <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 52px)' }}>
          <Head
            eyebrow="MATERIALS"
            title={<>The material <span className="idv2-acc-text">library.</span></>}
            lede="Deliverable imagery from the project itself — the finishes the restored rooms are built from."
          />
          <div className="idv-grid-4">
            {VALMONT.materials.slice(0, 8).map((m) => (
              <MediaFigure
                key={m.src}
                src={m.src}
                alt={`Maison Valmont material: ${m.label}`}
                caption={m.label}
                ratio="sq"
              />
            ))}
          </div>
          <ChipRow label="The delivered system" items={study.system} dark />
        </div>
      </section>
    </>
  );
}

/* ── The Patel: scale+methods → residence → film → identity ───────────────── */
function ThePatel({ study }) {
  return (
    <>
      <section className="idv2-section idv2-bright idv2-acc-present">
        <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 52px)' }}>
          <Head
            eyebrow="SOURCE — THE PATEL"
            title={<>The building at <span className="idv2-acc-text">skyline scale.</span></>}
            lede="A development sells twice. The first sale is the tower itself, in its Miami light."
          />
          <div>
            {/* Generated breakout hero (gpt-image-2, owner brief 2026-08-21):
                the tower breaking out of its own presentation frame — the
                project identity as one image. */}
            <MediaFigure
              src={`${PATEL.base}/brand/patel-breakout-hero.webp`}
              alt="PATEL — A Private Vertical World Above Miami: the tower breaking out of its digital residence-selection frame"
              caption="PATEL — the building becomes the website"
              tag="PROJECT IDENTITY · GENERATED"
              ratio="wide"
              eager
            />
            <div style={{ marginTop: 'clamp(18px, 2.5vw, 36px)' }} />
            <MediaFigure
              src={PATEL.tower[0].src}
              alt={`The Patel — ${PATEL.tower[0].label}: the Miami tower at skyline scale`}
              caption={`The Patel — ${PATEL.tower[0].label}`}
              tag="BUILDING VISUALIZATION"
            />
            <div className="idv-grid-3" style={{ marginTop: 'clamp(18px, 2.5vw, 36px)' }}>
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
          </div>
          <ChipRow label="Methods used" items={study.methods} />
        </div>
      </section>

      <section className="idv2-section idv2-dark idv2-acc-present">
        <div className="idv2-inner">
          <Head
            eyebrow="RESIDENCE 1802"
            title={<>The drill-down into <span className="idv2-grad">one residence.</span></>}
            lede="The second sale is the unit: its own plan, its own rooms, carried by the same identity."
          />
          <MediaFigure
            src={PATEL.unit.floorplan}
            alt="The Patel, Residence 1802 — unit floor plan"
            caption="The Patel — Residence 1802, floor plan"
            tag="SOURCE — spatial truth"
            ratio="wide"
          />
          <div className="idv-grid-4" style={{ marginTop: 'clamp(18px, 2.5vw, 36px)' }}>
            {PATEL.unit.rooms.map((r) => (
              <MediaFigure
                key={r.src}
                src={r.src}
                alt={`The Patel, Residence 1802 — ${r.label}`}
                caption={r.label}
                ratio="45"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="idv2-section idv2-gradient-soft idv2-acc-present">
        <div className="idv2-inner">
          <Head eyebrow="FILM — THE PATEL" title={<>The hero <span className="idv2-acc-text">film.</span></>} />
          <MediaFigure
            video
            src={PATEL.film.desktop}
            poster={PATEL.film.poster}
            alt="The Patel hero film — the tower and its Miami environment in motion"
            caption="The Patel — hero film"
            tag="FILM"
            ratio="wide"
          />
        </div>
      </section>

      <section className="idv2-section idv2-spatial idv2-acc-present">
        <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 52px)' }}>
          <Head eyebrow="IDENTITY" title={<>One identity across <span className="idv2-acc-text">both scales.</span></>} />
          <div className="idv2-reveal" style={{ display: 'grid', justifyItems: 'center', gap: 20, padding: 'clamp(30px, 4vw, 64px) 0' }}>
            <img
              src={PATEL.brand}
              alt="The Patel brand lockup"
              loading="lazy"
              decoding="async"
              style={{ display: 'block', width: '100%', maxWidth: 560 }}
            />
            <div className="idv-mono-label">THE PATEL — PROJECT IDENTITY</div>
          </div>
          <ChipRow label="The delivered system" items={study.system} dark />
        </div>
      </section>
    </>
  );
}

/* ── FAQ (factual, shared across cases) ───────────────────────────────────── */
const FAQ = [
  ['Are these photographs of finished rooms?', 'No. Every image is a visualization built from the project’s source material. Where existing-condition photography appears — as in Maison Valmont’s before states — it is labeled as existing.'],
  ['Does every case include a finished film?', 'No. Maison Valmont and The Patel have rendered films, shown on their pages. Poolside Villa was delivered as plans, twenty-nine master frames and a film-ready storyboard — its film is directed, not rendered.'],
  ['What would a project like this need from me?', 'A starting point, not a finished package: a floor plan, phone photos or video of the existing rooms, or an architectural model. Key measurements are always verified on site before construction decisions.'],
];

function Faq() {
  return (
    <section className="idv2-section idv2-bright">
      <div className="idv2-inner" style={{ display: 'grid', gap: 24, maxWidth: 980 }}>
        <Eyebrow>QUESTIONS ABOUT THIS CASE</Eyebrow>
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

/* ── Next-case portal ─────────────────────────────────────────────────────── */
const NEXT_CASE = {
  'poolside-villa': 'maison-valmont',
  'maison-valmont': 'the-patel',
  'the-patel': 'poolside-villa',
};

function NextCasePortal({ slug }) {
  const next = CASE_STUDIES.find((c) => c.slug === NEXT_CASE[slug]);
  if (!next) return null;
  return (
    <Link to={`${IDV_BASE}/case-studies/${next.slug}`} className="idv2-portal idv2-acc-present">
      <img src={CASE_COVERS[next.slug]} alt="" loading="lazy" decoding="async" />
      <div className="idv2-inner">
        <span className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>NEXT CASE STUDY</span>
        <span className="idv2-h2" style={{ maxWidth: 900 }}>{next.name}: {next.kind.toLowerCase()}.</span>
        <span className="idv-mono-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#F5F5F0' }}>
          READ THE CASE <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

const SECTIONS = {
  'poolside-villa': PoolsideVilla,
  'maison-valmont': MaisonValmont,
  'the-patel': ThePatel,
};

export default function InteriorCaseStudy() {
  const { slug } = useParams();
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (!study || !PROJECTS[slug] || !SECTIONS[slug]) {
    return <Navigate to={`${IDV_BASE}/case-studies`} replace />;
  }
  const Body = SECTIONS[slug];
  return (
    <InteriorShell path={`${IDV_BASE}/case-studies/${slug}`}>
      <CaseHero study={study} />
      <Body study={study} />
      <Faq />
      <NextCasePortal slug={slug} />
      <CtaBand
        eyebrow="CASE STUDY"
        headline={`${study.name} started as source material. Your project can too.`}
        copy="Send a plan, a scan, or the property as it exists today — we build the visual system from there."
        primary={{ label: 'Start a similar project', to: '/Contact' }}
        secondary={{ label: 'All case studies', to: `${IDV_BASE}/case-studies` }}
      />
    </InteriorShell>
  );
}
