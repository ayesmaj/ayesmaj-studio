/**
 * /interior-design — cinematic hub, rebuilt to the owner's redesign brief:
 * alternating bright/dark rhythm, wide grid, condensed AYESMAJ display type,
 * one gradient phrase per section, pinned scroll moments, media-dominant
 * layouts. Copy still comes from @/data/interiorDesign; media from
 * @/data/interiorMedia — every image appears exactly once on this page.
 *
 * Section rhythm (brief §2):
 * 01 bright gradient hero → 02 black pinned problem → 03 bright growing
 * stages → 04 dark spatial 3D models → 05 full-screen interior → 06 soft
 * gradient truths → 07 black scroll-film → 08 bright case proof (+ compact
 * recommender) → 09 dark studio collage → 10 full-screen CTA.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { InteriorShell, Eyebrow, IdvButton, MethodSwitcher } from '@/components/interior/kit';
import { IDV_BASE, IDV_EYEBROW, METHODS, GOALS, CASE_STUDIES, CAPABILITIES } from '@/data/interiorDesign';
import { INTERIOR_MENU } from '@/data/siteConfig';
import { VILLA, APARTMENT, VALMONT, PATEL, CASE_COVERS, MODELS } from '@/data/interiorMedia';
import ModelViewer from '@/components/interior/ModelViewer';
import DarkSectionBackground from '@/components/interior/DarkSectionBackground';
import InteriorDesignHero from '@/features/interior-design/hero/InteriorDesignHero.jsx';
import './interior2.css';

const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

const rise = (d = 0) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* ── 01 · HERO — bright gradient world, growing transformation fan ────────── */
/* ── 02 · THE PROBLEM — black pinned transformation (raw → editorial) ─────── */
/* Spaces & Property types (owner IA 2026-08-22): six pages on their 800px navigation previews. */
function SpacesAndTypes() {
  return (
    <section className="idv2-section idv2-bright" id="spaces">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(30px, 4vw, 52px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 18, maxWidth: 1000 }}>
          <Eyebrow>SPACES · PROPERTY TYPES</Eyebrow>
          <h2 className="idv2-h2">Pick the room, <span className="idv2-grad">or the whole property.</span></h2>
          <p className="idv-lede">Kitchens, bathrooms and furnishing on one side; apartments, houses and buildings on the other. Every page runs the same system — scan, plan, visualize, experience — on real projects.</p>
        </div>
        {INTERIOR_MENU.groups.map((g) => (
          <div key={g.title} style={{ display: 'grid', gap: 16 }}>
            <div className="idv-mono-label">{g.title.toUpperCase()}</div>
            <div className="idv2-cases" style={{ gridAutoRows: 'clamp(260px, 26vw, 400px)' }}>
              {g.items.map((it, i) => {
                return (
                  <div key={it.to} className="idv2-case-card idv2-case-card--third">
                    <Link to={it.to} className="idv2-case-link" aria-label={`${it.label} — ${it.line}`}>
                      <img src={it.preview} alt="" loading="lazy" decoding="async" width="800" height="500" />
                      <span className="idv2-case-num" aria-hidden="true">0{i + 1}</span>
                      <span className="idv2-case-meta"><span className="idv-mono-label">{g.title.toUpperCase()}</span><span className="idv2-case-name">{it.label}</span><span className="idv2-case-aud">{it.line}</span></span>
                      <span className="idv2-case-arrow" aria-hidden="true"><ArrowRight size={18} /></span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Problem() {
  const wrapRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const editorialOpacity = useTransform(scrollYProgress, [0.15, 0.7], [0, 1]);
  const pair = APARTMENT.pair; // terrace: surviving raw → generated editorial

  return (
    <section className="idv2-section idv2-dark">
      <DarkSectionBackground asset="architectural-grid" position="right bottom" overlay={0.7} textSide="left" parallax="none" />
      <div ref={wrapRef} className="idv2-pin-wrap" style={{ height: reduced ? 'auto' : '260vh' }}>
        <div className="idv2-pin" style={reduced ? { position: 'relative', height: '100svh' } : undefined}>
          <img src={pair.raw} alt="Canal Apartment terrace as raw captured source" loading="lazy" decoding="async" />
          <motion.img
            src={pair.editorial}
            alt="The same Canal Apartment terrace as the finished editorial visual"
            style={{ opacity: reduced ? 1 : editorialOpacity }}
            loading="lazy"
            decoding="async"
          />
          <div className="idv2-pin-scrim" />
          <div className="idv2-inner" style={{ position: 'relative', display: 'grid', alignContent: 'center', gap: 22, height: '100%' }}>
            <div style={{ maxWidth: 620, display: 'grid', gap: 20 }}>
              <Eyebrow>THE PROBLEM</Eyebrow>
              <h2 className="idv2-h2">
                The design may be clear to you.{' '}
                <span className="idv2-grad">Make it visible to them.</span>
              </h2>
              <p className="idv-lede">
                Designers read scale, circulation, proportion and material from plans. Clients need
                to see the complete room, understand how furniture fits and feel what the final
                result could become.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, maxWidth: 480 }}>
                {[['DESIGNER SEES', ['Scale', 'Circulation', 'Proportion', 'Technical intent']],
                  ['CLIENT EXPERIENCES', ['The complete room', 'Furniture fit', 'Material', 'Atmosphere']]].map(([t, items]) => (
                  <div key={t} style={{ display: 'grid', gap: 8 }}>
                    <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{t}</div>
                    {items.map((it) => <div key={it} style={{ borderTop: '1px solid rgba(255,255,255,0.16)', paddingTop: 7, fontSize: 14.5 }}>{it}</div>)}
                  </div>
                ))}
              </div>
              <div className="idv-mono-label">CANAL APARTMENT — SCROLL: SOURCE BECOMES ROOM</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 03 · THE SYSTEM — bright, growing panels ─────────────────────────────── */
const STAGES2 = [
  { n: '01', t: 'Capture', q: 'What exists now?', line: 'Scans and existing-condition capture build the fast, honest foundation.', src: VILLA.sequence[0].src, alt: 'Poolside Villa exterior as captured condition', accent: '#8FA3B5', to: METHODS['ai-scan-house'].route },
  { n: '02', t: 'Understand', q: 'How is the space organized?', line: 'Plans and 3D floor plans make the whole layout readable at once.', src: APARTMENT.studies[4].src, alt: 'Canal Apartment overview plan study', accent: '#8B9268', to: METHODS['3d-floor-plan-house'].route },
  { n: '03', t: 'Experience', q: 'What will it feel like?', line: 'Renders and film add material, light, movement and emotion.', src: VILLA.sequence[12].src, alt: 'Poolside Villa primary bedroom render', accent: '#D8963A', to: METHODS['ai-video-house'].route },
  { n: '04', t: 'Present', q: 'How should it be communicated?', line: 'Identity, website and deck turn visuals into approvals and sales.', src: PATEL.interiors[1].src, alt: 'The Patel presentation-ready interior', accent: '#A35BDA', to: METHODS['complete-visual-presentation'].route },
];

/* ── 04 · SPATIAL DEPTH — dark technical world with the live models ───────── */
const ALL_MODELS = [MODELS.featured, ...MODELS.project, ...MODELS.spaces, ...MODELS.objects];

function SpatialModels() {
  const [idx, setIdx] = useState(0);
  const m = ALL_MODELS[idx];
  return (
    <section className="idv2-section idv2-spatial idv2-m3d-section" id="models">
      <DarkSectionBackground asset="geometric-facets" position="center right" overlay={0.58} textSide="left" glow="purple" />
      <div className="idv2-m3d" aria-label="Interactive 3D model stage">
        <ModelViewer model={m} auto stage shift={0.25} />
      </div>
      <div className="idv2-inner idv2-m3d-copy">
        <div className="idv2-m3d-col idv2-reveal">
          <Eyebrow>02 / UNDERSTAND · INTERACTIVE 3D</Eyebrow>
          <h2 className="idv2-h2">Make the entire <span className="idv2-grad">layout</span> understandable.</h2>
          <p className="idv-lede">Not screenshots — the actual models, loaded as you arrive. Drag to turn them and read the space in the round.</p>
          <div className="idv2-chips" role="group" aria-label="Choose a model">
            {ALL_MODELS.map((x, i) => (
              <button key={x.key} type="button" className="idv2-chip" aria-pressed={i === idx} onClick={() => setIdx(i)}>{x.name}</button>
            ))}
          </div>
          <div className="idv2-m3d-meta">
            <div className="idv-mono-label"><span style={{ color: 'var(--idv-champagne)' }}>{m.credit}</span> · {m.name.toUpperCase()}</div>
            <p style={{ margin: 0, fontSize: 14.5, color: 'rgba(245,245,240,0.82)' }}>{m.line}</p>
          </div>
          <div style={{ display: 'grid' }}>
            <Link className="idv2-line-link" to={METHODS['3d-floor-plan-apartment'].route}>Apartment 3D plan <ArrowRight size={15} aria-hidden="true" /></Link>
            <Link className="idv2-line-link" to={METHODS['3d-floor-plan-house'].route}>House 3D plan <ArrowRight size={15} aria-hidden="true" /></Link>
            <Link className="idv2-line-link" to={METHODS['3d-building-visualization'].route}>Building visualization <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 05 · FULL-SCREEN INTERIOR ────────────────────────────────────────────── */
function FullInterior() {
  return (
    <section className="idv2-full">
      <img src={VILLA.sequence[4].src} alt="Poolside Villa living room opening to the pool, photorealistic visualization" loading="lazy" decoding="async" />
      <div className="idv2-full-scrim" />
      <div className="idv2-inner" style={{ position: 'relative', display: 'grid', gap: 20, width: '100%' }}>
        <Eyebrow>03 / EXPERIENCE</Eyebrow>
        <h2 className="idv2-h2" style={{ maxWidth: 820 }}>
          A floor plan shows the space. Light makes it <span className="idv2-grad">feel real.</span>
        </h2>
        <p className="idv-lede" style={{ color: 'rgba(245,245,240,0.8)' }}>
          Photorealistic interiors reveal material, atmosphere, furniture scale and the emotional
          character of the project.
        </p>
        <div style={{ paddingBottom: 'clamp(40px, 6vw, 80px)' }}>
          <IdvButton to={METHODS['ai-video-apartment'].route} ghost>Explore interior visualization</IdvButton>
        </div>
      </div>
    </section>
  );
}

/* ── 06 · SAME PROJECT, DIFFERENT TRUTHS — soft gradient, dominant media ──── */
const TRUTHS = [
  { key: 'plan', label: 'PLAN', src: PATEL.unit.floorplan, alt: 'The Patel Residence 1802 furnished floor plan', shows: ['Furniture scale', 'Circulation', 'Spatial relationships', 'Indoor / outdoor connection'] },
  { key: 'building', label: 'BUILDING', src: PATEL.tower[1].src, alt: 'The Patel tower architecture study', shows: ['The full volume', 'Where the residence sits', 'Exterior identity'] },
  { key: 'render', label: 'RENDER', src: PATEL.interiors[0].src, alt: 'The Patel interior render, Atlantic calm direction', shows: ['Material', 'Furniture language', 'Lighting and atmosphere'] },
  { key: 'film', label: 'FILM', src: PATEL.film.poster, alt: 'The Patel cinematic film frame', shows: ['Arrival and movement', 'Sequence', 'Emotional value'] },
];

function Truths() {
  const [view, setView] = useState('plan');
  const active = TRUTHS.find((t) => t.key === view) || TRUTHS[0];
  return (
    <section className="idv2-section idv2-gradient-soft">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 3.6vw, 48px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 18, maxWidth: 960 }}>
          <Eyebrow>COMPARISON · THE PATEL, MIAMI</Eyebrow>
          <h2 className="idv2-h2">Each method reveals a <span className="idv2-grad">different truth.</span></h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          <MethodSwitcher ariaLabel="Method view" options={TRUTHS.map((t) => ({ key: t.key, label: t.label }))} value={view} onChange={setView} />
          <div className="idv2-truths-media">
            <img src={active.src} alt={active.alt} loading="lazy" decoding="async" />
            <div className="idv2-truths-panel" aria-live="polite">
              <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{active.label} SHOWS</div>
              {active.shows.map((s) => <div key={s} style={{ fontSize: 13.5, borderTop: '1px solid rgba(255,255,255,0.14)', paddingTop: 6 }}>{s}</div>)}
            </div>
          </div>
          <div className="idv2-thumbs" role="group" aria-label="Method thumbnails">
            {TRUTHS.map((t) => (
              <button key={t.key} type="button" aria-pressed={view === t.key} aria-label={t.label} onClick={() => setView(t.key)}>
                <img src={t.src} alt="" loading="lazy" decoding="async" />
              </button>
            ))}
          </div>
          <div>
            <Link to={`${IDV_BASE}/compare-visualization-methods`} className="idv-mono-label" style={{ display: 'inline-flex', gap: 8, alignItems: 'center', textDecoration: 'none', color: 'var(--idv-walnut)' }}>
              COMPARE ALL METHODS <ArrowRight size={12} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 07 · AI FILM — black cinema, scroll-controlled playback ──────────────── */
/* Scrub technique adapted from 21st.dev "Scroll-Linked Video Scrubber"
   (pulkitxm): tall wrapper + sticky viewport + scroll progress mapped to
   video.currentTime. Chapters and reduced-motion/mobile fallbacks added. */
const FILM_CHAPTERS = [
  { at: 0.0, n: '01 PLAN', line: 'Understand the space.' },
  { at: 0.3, n: '02 INTERIOR', line: 'See the design.' },
  { at: 0.6, n: '03 MOTION', line: 'Experience the journey.' },
  { at: 0.85, n: '04 PRESENTATION', line: null },
];

function ScrollFilm() {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  const [simple, setSimple] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)');
    const set = () => setSimple(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => {
    if (simple || reduced) return undefined;
    const wrap = wrapRef.current;
    const video = videoRef.current;
    if (!wrap || !video) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!Number.isFinite(video.duration) || video.duration === 0) return;
      const rect = wrap.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      if (range <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / range));
      setProgress(p);
      // one frame short of the end: seeking to exactly `duration` fires `ended`
      video.currentTime = Math.min(p * video.duration, video.duration - 1 / 30);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    video.addEventListener('loadedmetadata', update);
    update();
    return () => { window.removeEventListener('scroll', onScroll); video.removeEventListener('loadedmetadata', update); if (raf) cancelAnimationFrame(raf); };
  }, [simple, reduced]);

  const chapter = FILM_CHAPTERS.reduce((acc, c) => (progress >= c.at ? c : acc), FILM_CHAPTERS[0]);
  const flat = simple || reduced;

  return (
    <section className="idv2-section" style={{ background: '#050505', color: '#F5F5F0' }}>
      <DarkSectionBackground asset="cosmic-energy" position="center right" overlay={0.62} textSide="left" parallax="none" />
      <div ref={wrapRef} className="idv2-pin-wrap" style={{ height: flat ? 'auto' : '380vh' }}>
        <div className="idv2-pin" style={flat ? { position: 'relative', height: 'auto', minHeight: '70svh' } : undefined}>
          <video
            ref={videoRef}
            src={PATEL.film.desktop}
            poster={PATEL.environment}
            muted={!sound}
            playsInline
            preload="metadata"
            data-scrub=""
            controls={flat}
            style={flat ? { position: 'relative', width: '100%', height: 'auto', display: 'block' } : undefined}
            aria-label="The Patel cinematic development film"
          />
          <div className="idv2-chapter">
            <Eyebrow>AI FILM · THE PATEL</Eyebrow>
            {chapter.line ? (
              <>
                <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{chapter.n}</div>
                <h2 className="idv2-h2" style={{ fontSize: 'clamp(34px, 4.4vw, 64px)' }}>{chapter.line}</h2>
              </>
            ) : (
              <>
                <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>04 PRESENTATION</div>
                <h2 className="idv2-h2" style={{ fontSize: 'clamp(34px, 4.4vw, 64px)' }}>Make the project <span className="idv2-grad">unforgettable.</span></h2>
              </>
            )}
            {!flat ? <div className="idv-mono-label">SCROLL TO PLAY</div> : null}
            <div>
              <button
                type="button"
                className="idv-btn idv-btn--ghost"
                style={{ background: 'transparent', color: '#F5F5F0', borderColor: 'rgba(255,255,255,0.35)', padding: '10px 18px', fontSize: 11.5 }}
                onClick={() => { setSound((s) => !s); const v = videoRef.current; if (v && flat) v.play().catch(() => {}); }}
              >
                {sound ? 'MUTE' : 'PLAY WITH SOUND'}
              </button>
            </div>
          </div>
          {!flat ? (
            <div className="idv2-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ── 08 · CASE PROOF — bright, image-heavy, honest ────────────────────────── */
function Recommender() {
  const [goal, setGoal] = useState(null);
  const picked = GOALS.find((g) => g.key === goal);
  return (
    <div id="recommender" style={{ borderTop: '1px solid var(--idv-stone)', paddingTop: 'clamp(28px, 3vw, 44px)', display: 'grid', gap: 20 }}>
      <div className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>START HERE — WHAT DOES YOUR CLIENT NEED TO UNDERSTAND?</div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }} role="group" aria-label="Project goal">
        {GOALS.map((g) => (
          <button key={g.key} type="button" aria-pressed={goal === g.key} onClick={() => setGoal(g.key)} className="idv-btn"
            style={goal === g.key
              ? { background: 'var(--idv-ink)', color: '#FAF7F1', border: '1px solid var(--idv-ink)', padding: '11px 20px', fontSize: 12 }
              : { background: '#FFFDF9', color: 'var(--idv-ink)', border: '1px solid var(--idv-stone)', padding: '11px 20px', fontSize: 12 }}>
            {g.label}
          </button>
        ))}
      </div>
      {picked ? (
        <div aria-live="polite" style={{ display: 'grid', gap: 12 }}>
          <div className="idv-mono-label">RECOMMENDED VISUAL SYSTEM</div>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
            {picked.stack.map((key, i) => (
              <li key={key} style={{ display: 'flex', alignItems: 'baseline', gap: 14, borderTop: '1px solid var(--idv-stone)', paddingTop: 10 }}>
                <span className="idv-stage-num" style={{ fontSize: 15 }}>0{i + 1}</span>
                <Link to={METHODS[key].route} style={{ fontFamily: 'var(--idv-serif)', fontWeight: 600, fontSize: 'clamp(17px, 1.6vw, 24px)', color: 'inherit', textDecoration: 'none' }}>{METHODS[key].label}</Link>
              </li>
            ))}
          </ol>
          <div><IdvButton to="/Contact">Send this brief to AYESMAJ</IdvButton></div>
        </div>
      ) : null}
    </div>
  );
}

function CaseProof() {
  return (
    <section className="idv2-section idv2-bright">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(30px, 4vw, 52px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 18, maxWidth: 1000 }}>
          <Eyebrow>CASE STUDIES</Eyebrow>
          <h2 className="idv2-h2">From source material to a complete <span className="idv2-grad">visual world.</span></h2>
          <p className="idv-lede">Three real projects, three different starting points — a pair of flat plans, an existing Paris salon, a Miami tower model. Open any of them to walk the full sequence.</p>
        </div>

        {/* Adapted from 21st "Condition Grid": alternating spans, overlaid name badge + arrow. Covers are the projects' own frames. */}
        <div className="idv2-cases idv2-reveal">
          {CASE_STUDIES.map((c, i) => (
            <motion.div
              key={c.slug}
              className={`idv2-case-card idv2-case-card--${i === 0 ? 'a' : i === 1 ? 'b' : 'wide'}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link to={`${IDV_BASE}/case-studies/${c.slug}`} className="idv2-case-link" aria-label={`${c.name} case study — ${c.kind}`}>
                <img src={CASE_COVERS[c.slug]} alt="" loading="lazy" decoding="async" />
                <span className="idv2-case-num" aria-hidden="true">0{i + 1}</span>
                <span className="idv2-case-meta">
                  <span className="idv-mono-label">{c.kind.toUpperCase()}</span>
                  <span className="idv2-case-name">{c.name}</span>
                  <span className="idv2-case-aud">{c.audience}</span>
                </span>
                <span className="idv2-case-arrow" aria-hidden="true"><ArrowRight size={18} /></span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Honest capability statements — the brief bans invented percentages. */}
        <div className="idv2-honest idv2-reveal">
          {[['ONE SOURCE', 'Multiple visual outputs'], ['ONE STUDIO', 'One consistent language'], ['FROM EARLY CONCEPT', 'To final presentation']].map(([a, b]) => (
            <div key={a}><span className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>{a}</span><span style={{ fontFamily: 'var(--idv-serif)', fontWeight: 600, fontSize: 'clamp(18px, 1.6vw, 22px)' }}>{b}</span></div>
          ))}
        </div>

        <Recommender />
      </div>
    </section>
  );
}

/* ── 09 · ONE STUDIO — dark brand world, layered collage ──────────────────── */
const COLLAGE = [
  { src: VILLA.sequence[7].src, alt: 'Poolside Villa kitchen render', style: { left: '2%', top: '6%', width: '30%', aspectRatio: '16/10' } },
  { src: PATEL.tower[2].src, alt: 'The Patel in its Miami environment', style: { right: '4%', top: '0%', width: '26%', aspectRatio: '4/5' } },
  { src: APARTMENT.gallery[1].src, alt: 'Canal Apartment lounge', style: { left: '38%', top: '22%', width: '30%', aspectRatio: '16/10', zIndex: 2 } },
  { src: VALMONT.materials[0].src, alt: 'Maison Valmont calacatta material study', style: { left: '10%', bottom: '4%', width: '20%', aspectRatio: '1/1' } },
  { src: VALMONT.gallery[0].src, alt: 'Maison Valmont arrival sequence frame', style: { right: '14%', bottom: '8%', width: '24%', aspectRatio: '16/10' } },
  { src: VILLA.sequence[15].src, alt: 'Poolside Villa primary bath render', style: { left: '68%', top: '48%', width: '18%', aspectRatio: '3/4', zIndex: 1 } },
];

function OneStudio() {
  return (
    <section className="idv2-section idv2-dark">
      <DarkSectionBackground asset="topographic" position="right bottom" overlay={0.55} textSide="left" glow="gold" />
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(30px, 4vw, 52px)' }}>
        <div className="idv2-reveal" style={{ display: 'grid', gap: 18, maxWidth: 1000 }}>
          <Eyebrow>WHY AYESMAJ STUDIOS</Eyebrow>
          <h2 className="idv2-h2">One studio. <span className="idv2-grad">Every visual language</span> the project needs.</h2>
        </div>
        <div className="idv2-collage idv2-reveal" aria-label="Studio work across every visual language">
          <div className="idv2-glow-gold" style={{ left: '-6%', top: '-10%' }} />
          <div className="idv2-glow-purple" style={{ right: '-4%', bottom: '-12%' }} />
          {COLLAGE.map((f) => (
            <div key={f.src} className="idv2-collage-frame" style={f.style}>
              <img src={f.src} alt={f.alt} loading="lazy" decoding="async" />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 'clamp(14px, 2.2vw, 34px)', flexWrap: 'wrap' }}>
          {CAPABILITIES.flatMap((c) => c.items.slice(0, 2)).slice(0, 8).map((w) => (
            <span key={w} className="idv-mono-label" style={{ borderTop: '1px solid rgba(216,183,90,0.4)', paddingTop: 8 }}>{w}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function InteriorDesign() {
  return (
    <InteriorShell path={IDV_BASE}>
      <InteriorDesignHero />
      <hr className="idv2-spill" />
      <SpacesAndTypes />
      <Problem />
      <Truths />
      <SpatialModels />
      <FullInterior />
      <ScrollFilm />
      <CaseProof />
      <OneStudio />
    </InteriorShell>
  );
}
