import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { FEATURED_WORK } from '@/data/featuredWork';
import { WORK_ARCHIVE, WORK_COUNTS } from '@/data/workArchive';
import './work-hero.css';

/* The /Work opening.
   Adapted from 21st "hero-carousel" (24752) - see docs/component-sources.md.
   Two things were worth taking from that source and are kept here:

   1. The background stack. Rather than a glass panel over a flat ground, the
      hero grades a real project photo: photo -> hue grade in the piece's own
      accent -> wash -> the page's existing grain. The hero therefore changes
      colour with whatever the visitor is looking at, and the depth comes from
      actual work instead of decoration.
   2. Measured geometry. Card sizes are computed from the stage's real size via
      ResizeObserver, so the cluster has no breakpoints to drift out of sync.

   Stripped from the source: its wheel handler (a wheel-capturing hero at the
   top of a long archive page fights the very first scroll gesture), drag,
   autoplay, its own top bar and grain, and the position rail. */

const STAT_FILMS = WORK_ARCHIVE.filter((i) => i.video).length;
const STAT_MINUTES = Math.round(WORK_ARCHIVE.filter((i) => i.video).reduce((s, i) => s + (i.dur || 0), 0) / 60);
const STATS = [
  [WORK_ARCHIVE.length.toLocaleString(), 'pieces archived'],
  [String(Object.keys(WORK_COUNTS).length), 'disciplines'],
  [String(STAT_FILMS), `films · ${STAT_MINUTES} min`],
];

export default function WorkHero({ onExplore }) {
  const [index, setIndex] = useState(0);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const reduced = useReducedMotion();
  const active = FEATURED_WORK[index];

  /* Measured, not breakpointed: the cluster reads its own stage. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const read = () => setBox({ w: stage.clientWidth, h: stage.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(stage);
    return () => ro.disconnect();
  }, []);

  const fullH = Math.max(150, Math.min(box.h * 0.86, 460));
  const halfH = fullH * 0.62;
  const cardW = Math.max(88, Math.min(fullH * 0.7, box.w / FEATURED_WORK.length - 10));

  const go = useCallback((i) => {
    const n = (i + FEATURED_WORK.length) % FEATURED_WORK.length;
    setIndex(n);
    cardRefs.current[n]?.focus();
    cardRefs.current[n]?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, []);

  const onKeyDown = (e, i) => {
    const k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowDown') { e.preventDefault(); go(i + 1); }
    else if (k === 'ArrowLeft' || k === 'ArrowUp') { e.preventDefault(); go(i - 1); }
    else if (k === 'Home') { e.preventDefault(); go(0); }
    else if (k === 'End') { e.preventDefault(); go(FEATURED_WORK.length - 1); }
  };

  const swing = reduced ? { duration: 0 } : { duration: 0.7, ease: [0.22, 1, 0.36, 1] };
  const spring = reduced ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 34, mass: 0.9 };

  return (
    <section className="wk-hero" aria-labelledby="wk-hero-title">
      {/* ── Ground: generated atmosphere, then the active piece graded into it ── */}
      <div className="wk-hero-bg" aria-hidden="true">
        <div className="wk-hero-bg-plate" />
        <motion.img
          key={active.image}
          className="wk-hero-bg-shot"
          src={active.image}
          alt=""
          draggable={false}
          initial={{ opacity: 0, scale: reduced ? 1.12 : 1.22 }}
          animate={{ opacity: 0.26, scale: 1.12 }}
          transition={reduced ? { duration: 0 } : { opacity: { duration: 0.9 }, scale: { duration: 7, ease: 'linear' } }}
        />
        <div className="wk-hero-bg-grade" style={{ backgroundColor: active.accent || '#A35BDA' }} />
        <div className="wk-hero-bg-wash" />
      </div>

      <div className="wk-hero-inner">
        <div className="wk-hero-copy">
          <motion.p className="wk-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={swing}>
            Selected Work · The Archive
          </motion.p>

          <motion.h1
            id="wk-hero-title"
            className="wk-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...swing, delay: reduced ? 0 : 0.06 }}
          >
            Digital worlds<br />
            built to be<br />
            <span className="wk-grad-text">remembered.</span>
          </motion.h1>

          <motion.p
            className="wk-hero-lede"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...swing, delay: reduced ? 0 : 0.12 }}
          >
            A curated archive of brand systems, cinematic film, interiors, CGI and
            digital experiences — built from concept to launch.
          </motion.p>

          <motion.div
            className="wk-hero-actions"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...swing, delay: reduced ? 0 : 0.18 }}
          >
            <button type="button" className="wk-btn wk-btn--primary" onClick={onExplore}>
              Explore the archive <ArrowDown size={16} aria-hidden="true" />
            </button>
            <Link className="wk-btn wk-btn--ghost" to="/Contact">
              Start a project <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.dl
            className="wk-hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...swing, delay: reduced ? 0 : 0.26 }}
          >
            {STATS.map(([value, label]) => (
              <div key={label}>
                <dt>{value}</dt>
                <dd>{label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ── The cluster. Six real pieces; the focused one stands full height. ── */}
        <div
          className="wk-hero-stage"
          ref={stageRef}
          role="group"
          aria-roledescription="carousel"
          aria-label="Featured work — use arrow keys to browse"
        >
          <div className="wk-hero-rail">
            {FEATURED_WORK.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                ref={(el) => { cardRefs.current[i] = el; }}
                className="wk-hero-card"
                aria-label={`${item.title} — ${item.tagline}`}
                aria-current={i === index}
                onClick={() => go(i)}
                onMouseEnter={() => !reduced && setIndex(i)}
                onFocus={() => setIndex(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                style={{ width: cardW || undefined, '--wk-card-accent': item.accent || '#D8B75A' }}
                animate={{ height: i === index ? fullH : halfH }}
                transition={spring}
              >
                <img src={item.image} alt="" loading={i < 2 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
                <span className="wk-hero-card-scrim" aria-hidden="true" />
                <span className="wk-hero-card-meta" aria-hidden="true">
                  <span className="wk-hero-card-cat">{item.cat}</span>
                  <span className="wk-hero-card-name">{item.title}</span>
                </span>
              </motion.button>
            ))}
          </div>
          <p className="wk-hero-caption" aria-live="polite">
            <span className="wk-hero-caption-name">{active.title}</span>
            <span className="wk-hero-caption-tag">{active.tagline}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
