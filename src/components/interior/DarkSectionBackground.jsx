/**
 * DarkSectionBackground — a generated AYESMAJ material/energy background
 * behind a dark section (owner brief 2026-08-21: "black is no longer one
 * color"). Layering, bottom to top: responsive image (AVIF → WebP, mobile
 * crop under 860px) → readability gradient keyed to where the text sits →
 * film grain (adapted from the 21st.dev "Silk Blend" background's grain
 * layer) → the section's real HTML content above (z-index 1).
 *
 * Parent must be position:relative (every .idv2-section is). Parallax is a
 * 10px scroll drift, off under prefers-reduced-motion.
 */
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const BASE = '/interior-design/backgrounds';
const FILES = {
  'cosmic-energy': '01-cosmic-energy-flow',
  'architectural-grid': '02-architectural-grid',
  'stone-bronze': '03-stone-bronze-material',
  'geometric-facets': '04-geometric-facets',
  'silk-wave': '05-silk-wave-flow',
  'dark-concrete': '06-dark-concrete',
  'cinematic-light': '07-cinematic-light-leak',
  'topographic': '08-topographic-contours',
};

const GRAIN = "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0'/></filter><rect width='160' height='160' filter='url(%23n)'/></svg>\")";

function overlayFor(textSide, strength) {
  const a = (k) => `rgba(5,5,6,${Math.min(1, strength * k).toFixed(2)})`;
  if (textSide === 'right') return `linear-gradient(270deg, ${a(1.35)} 0%, ${a(1.05)} 34%, ${a(0.4)} 68%, ${a(0.15)} 100%)`;
  if (textSide === 'center') return `radial-gradient(ellipse 60% 70% at 50% 50%, ${a(1.3)} 0%, ${a(0.9)} 45%, ${a(0.3)} 100%)`;
  if (textSide === 'both') return `linear-gradient(180deg, ${a(1.1)} 0%, ${a(0.8)} 50%, ${a(1.1)} 100%)`;
  return `linear-gradient(90deg, ${a(1.35)} 0%, ${a(1.05)} 34%, ${a(0.4)} 68%, ${a(0.15)} 100%)`;
}

export default function DarkSectionBackground({
  asset, position = 'center right', mobilePosition = 'center', overlay = 0.6,
  textSide = 'left', parallax = 'subtle', glow = 'none',
}) {
  const file = FILES[asset];
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  if (!file) return null;
  const drift = parallax === 'subtle' && !reduced;
  return (
    <div ref={ref} className="idv2-bgwrap" aria-hidden="true">
      <motion.picture style={{ position: 'absolute', inset: -12, display: 'block', y: drift ? y : 0 }}>
        <source media="(max-width: 860px)" srcSet={`${BASE}/mobile/${file}.webp`} type="image/webp" />
        <source srcSet={`${BASE}/web/${file}.avif`} type="image/avif" />
        <img
          src={`${BASE}/web/${file}.webp`}
          alt=""
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: position, display: 'block' }}
          className="idv2-bgimg"
          data-mobile-position={mobilePosition}
        />
      </motion.picture>
      <div style={{ position: 'absolute', inset: 0, background: overlayFor(textSide, overlay) }} />
      {glow !== 'none' ? (
        <div style={{ position: 'absolute', inset: 0, background: glow === 'gold'
          ? 'radial-gradient(700px 420px at 85% 100%, rgba(216,183,90,0.14), transparent 60%)'
          : 'radial-gradient(700px 420px at 85% 0%, rgba(163,91,218,0.16), transparent 60%)' }} />
      ) : null}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: GRAIN, opacity: 0.07, mixBlendMode: 'overlay' }} />
    </div>
  );
}
