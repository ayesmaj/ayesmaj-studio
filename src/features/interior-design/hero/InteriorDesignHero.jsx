/**
 * InteriorDesignHero — the PATEL tower breaking out of a digital project
 * screen onto the AYESMAJ page (owner brief 2026-08-21).
 *
 * Everything that matters is HTML: h1, copy, CTAs, screen text, credit,
 * method strip. The 3D engine (towerScene.js + three) is imported only after
 * mount, and only on devices that pass pickTier(); everyone else gets the
 * poster. Layer order (bottom → top): background → atmosphere → screen
 * (surface, contact shadow, inner 3D view, screen UI, bezel) → breakout 3D
 * view (+ birds, same frame) → copy → site navigation.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroMethodStrip from './HeroMethodStrip.jsx';
import { HERO_ASSETS, HERO_COPY, pickTier } from './hero.config.js';
import './hero.css';

const EASE = [0.22, 1, 0.36, 1];

export default function InteriorDesignHero({ copy: copyOverride = null }) {
  const HERO = { ...HERO_COPY, ...(copyOverride || {}) };
  const reduced = useReducedMotion();
  const hostRef = useRef(null);
  const glRef = useRef(null);
  const innerRef = useRef(null);
  const dragRef = useRef(null);
  const sectionRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | fallback | error
  const [progress, setProgress] = useState(0);
  const [touch, setTouch] = useState(false);

  // 3D lifecycle: tier → lazy engine → dispose on unmount
  useEffect(() => {
    const tier = pickTier();
    const isMobile = window.innerWidth < 768;
    setTouch(isMobile || tier === 'reduced' || window.matchMedia('(pointer: coarse)').matches);
    if (!tier) { setStatus('fallback'); return undefined; }
    let scene = null, dead = false;
    setStatus('loading');
    import('./towerScene.js')
      .then(({ createTowerScene }) => {
        if (dead) return null; // left the page during the import: never create a context
        return createTowerScene({
          glCanvas: glRef.current, innerCanvas: innerRef.current, host: hostRef.current, dragEl: dragRef.current,
          tier, mobile: isMobile, onProgress: (p) => { if (!dead) setProgress(p); },
          onLost: () => { if (!dead) setStatus('fallback'); },
        });
      })
      .then((s) => { if (!s) return; if (dead) { s.dispose(); return; } scene = s; setStatus('ready'); })
      .catch((err) => { console.error('Interior hero 3D failed; showing poster', err); if (!dead) setStatus('fallback'); });
    return () => { dead = true; scene?.dispose(); };
  }, []);

  // scroll storytelling (brief §13): tower rises, screen lowers, copy fades — CSS vars only
  useEffect(() => {
    if (reduced) return undefined;
    const el = sectionRef.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = el.offsetHeight || 1;
      const p = Math.min(1, Math.max(0, window.scrollY / (h * 0.9)));
      el.style.setProperty('--p', p.toFixed(3));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, [reduced]);

  const rise = (delay) => reduced
    ? { initial: false }
    : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } };
  const loading = status === 'loading';
  const fallback = status === 'fallback';
  const ready = status === 'ready';

  return (
    <section ref={sectionRef} className={`idh idh--${status}${reduced ? ' idh--reduced' : ''}`} aria-label="Interior Design Visualization">
      <picture className="idh-bg" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet={HERO_ASSETS.background.mobile} type="image/webp" />
        <source srcSet={HERO_ASSETS.background.avif} type="image/avif" />
        <img src={HERO_ASSETS.background.webp} alt="" decoding="async" fetchpriority="high" />
      </picture>
      <div className="idh-atmo" aria-hidden="true" />

      <div className="idh-grid">
        {/* ── copy ─────────────────────────────────────────────────── */}
        <div className="idh-copy">
          <motion.div {...rise(0.9)} className="idv-eyebrow">{HERO.eyebrow}</motion.div>
          <motion.h1 {...rise(1.0)} className="idv2-display idv2-display--hero idh-h1">
            {HERO.headline.map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}
            <motion.span {...rise(1.55)} className="idv2-grad" style={{ display: 'inline-block' }}>{HERO.headlineGradient}</motion.span>
          </motion.h1>
          <motion.p {...rise(1.15)} className="idv-lede idh-lede">{HERO.body}</motion.p>
          <motion.div {...rise(1.3)} className="idh-ctas">
            <a href={HERO.primary.to} className="idv-btn idh-btn idh-btn--gold">{HERO.primary.label} <ArrowRight size={15} aria-hidden="true" /></a>
            <Link to={HERO.secondary.to} className="idv-btn idh-btn">{HERO.secondary.label} <ArrowRight size={15} aria-hidden="true" /></Link>
          </motion.div>
          <motion.div {...rise(1.4)} className="idv-mono-label idh-methods">{HERO.methods}</motion.div>
          {!fallback ? (
            <motion.div {...rise(1.5)} className="idv-mono-label idh-hint">{touch ? HERO.hintTouch : HERO.hint}</motion.div>
          ) : null}
        </div>

        {/* ── stage: screen + tower + birds ────────────────────────── */}
        <div ref={hostRef} className="idh-stage">
          <div className="idh-screen" aria-hidden={fallback}>
            <div className="idh-screen-surface" />
            <div className="idh-contact" />
            <canvas ref={innerRef} className="idh-inner" aria-hidden="true" />
            <div className="idh-screen-ui">
              <span className="idh-dots" aria-hidden="true"><i /><i /><i /></span>
              <div className="idh-screen-text">
                <span className="idv-mono-label">{HERO.screen.eyebrow}</span>
                <strong>{HERO.screen.title}</strong>
                <span className="idh-screen-sub">{HERO.screen.sub}</span>
                <span className="idv-mono-label idh-screen-kind">{HERO.screen.kind}</span>
                <Link to={HERO.screen.to} className="idh-screen-cta">{HERO.screen.cta} <ArrowRight size={13} aria-hidden="true" /></Link>
              </div>
            </div>
            <div className="idh-screen-edge" aria-hidden="true" />
          </div>

          <canvas
            ref={glRef}
            className="idh-gl"
            role={ready ? 'img' : undefined}
            aria-label={ready ? HERO.canvasLabel : undefined}
            aria-hidden={!ready}
            style={{ opacity: ready ? 1 : 0 }}
          />
          {/* drag zone over the tower column only — the canvas itself is click-transparent so copy/CTAs work through it */}
          <div ref={dragRef} className="idh-drag" aria-hidden="true" style={{ display: ready ? 'block' : 'none' }} />

          {fallback ? (
            <img className="idh-poster" src={HERO_ASSETS.poster} alt="The PATEL tower rising out of a digital presentation screen above Biscayne Bay at golden hour." decoding="async" />
          ) : null}

          {loading ? (
            <div className="idh-loader" role="status" aria-live="polite">
              <span className="idv-mono-label">{HERO.loader[0]}</span>
              <span className="idh-loader-line">{HERO.loader[1]}</span>
              <span className="idh-loader-bar" aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} /></span>
            </div>
          ) : null}

          <div className="idv-mono-label idh-credit">{HERO.credit}</div>
        </div>
      </div>

      <HeroMethodStrip />
    </section>
  );
}
