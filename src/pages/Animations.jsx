import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Maximize2 } from 'lucide-react';
import HomeNav from '@/components/home/HomeNav';
import Footer from '@/components/sections/Footer';

const TOTAL = 30;

// ── Single lazy-loading video card ────────────────────────────────────────────
function AnimCard({ id, index }) {
  const wrapRef  = useRef(null);
  const videoRef = useRef(null);
  const [inView,  setInView]  = useState(false);
  const [loaded,  setLoaded]  = useState(false);
  const [muted,   setMuted]   = useState(true);
  const [hasErr,  setHasErr]  = useState(false);

  // ── 1. Watch wrapper enter / leave viewport ──────────────────────────────
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.05, rootMargin: '120px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // ── 2. Play / pause based on visibility ─────────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !loaded) return;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView, loaded]);

  const onCanPlay = useCallback(() => {
    setLoaded(true);
    if (inView && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [inView]);

  const toggleMute = (e) => {
    e.stopPropagation();
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  const openFS = (e) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    (v.requestFullscreen || v.webkitRequestFullscreen || v.mozRequestFullScreen)?.call(v);
  };

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        aspectRatio: '16/9',
        background: '#0d1610',
        border: '1px solid rgba(200,164,78,0.12)',
      }}
    >
      {/* Lazy: only inject <video> once in viewport */}
      {inView && !hasErr && (
        <video
          ref={videoRef}
          src={`https://res.cloudinary.com/dea3l8rmw/video/upload/q_auto,f_auto/${id}.mp4`}
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={onCanPlay}
          onError={() => setHasErr(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Gradient overlay so controls are readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(8,12,9,0.85) 0%, transparent 45%)' }}
      />

      {/* Clip number + controls — always visible (good for touch) */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-3 pb-3">
        <span
          className="text-[10px] font-bold tracking-[0.2em] uppercase"
          style={{ color: 'rgba(200,164,78,0.7)' }}
        >
          #{String(id).padStart(2, '0')}
        </span>

        <div className="flex items-center gap-2">
          {/* Mute / Unmute — 44px tap target */}
          <button
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity active:opacity-60"
            style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            {muted
              ? <VolumeX size={14} className="text-white/70" />
              : <Volume2 size={14} className="text-white/70" />}
          </button>

          {/* Fullscreen — 44px tap target */}
          <button
            onClick={openFS}
            aria-label="Fullscreen"
            className="w-11 h-11 rounded-full flex items-center justify-center transition-opacity active:opacity-60"
            style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(255,255,255,0.18)',
            }}
          >
            <Maximize2 size={14} className="text-white/70" />
          </button>
        </div>
      </div>

      {/* Loading shimmer */}
      {!loaded && !hasErr && inView && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: 'linear-gradient(135deg, #0d1610 0%, #111d14 50%, #0d1610 100%)' }}
        />
      )}

      {/* Dark placeholder before entering viewport */}
      {!inView && !loaded && (
        <div className="absolute inset-0" style={{ background: '#0d1610' }} />
      )}

      {/* Error state */}
      {hasErr && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-xs tracking-widest uppercase"
            style={{ color: 'rgba(200,164,78,0.25)' }}
          >
            #{String(id).padStart(2, '0')}
          </span>
        </div>
      )}
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Animations() {
  useEffect(() => {
    document.title = 'Animations — AYESMAJ Studios';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#080C09' }}>
      <HomeNav />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-16 px-6 text-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,164,78,0.08) 0%, transparent 60%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-xs font-bold tracking-[0.45em] uppercase mb-4"
            style={{ color: 'rgba(200,164,78,0.7)' }}
          >
            Motion Work
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-4">
            Animations
          </h1>
          <p className="max-w-lg mx-auto text-base md:text-lg text-white/35 leading-relaxed">
            CGI, 3D animation, product films and motion design.
          </p>
          <p className="mt-4 text-[10px] tracking-widest uppercase text-white/20">
            Videos load &amp; play as you scroll · tap <VolumeX size={10} className="inline" /> to hear audio
          </p>
        </motion.div>
      </section>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
        {/* 1 col mobile → 2 col tablet → 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: TOTAL }, (_, i) => (
            <AnimCard key={i + 1} id={i + 1} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="relative border-t py-24 px-6 text-center overflow-hidden"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(200,164,78,0.06) 0%, transparent 65%)' }}
        />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p
            className="text-[11px] tracking-[0.35em] uppercase mb-4"
            style={{ color: 'rgba(200,164,78,0.6)' }}
          >
            Start Something
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
            Let's Create Your<br />Next Animation
          </h2>
          <a
            href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-black text-sm font-bold hover:scale-105 active:scale-95 transition-all duration-300"
            style={{ background: '#C8A44E', minHeight: '52px' }}
          >
            Start Your Project →
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
