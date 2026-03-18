import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/sections/Footer';
import { getBrand, BRANDS } from '@/data/brands';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
});

// ── Inline video player ────────────────────────────────────────────────────
function VideoCard({ src, accent }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted]     = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { threshold: 0.3 });

  const handleMetadata = () => {
    if (ref.current && !playing) ref.current.currentTime = 1.5;
  };

  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); setPlaying(false); }
    else         { ref.current.currentTime = 0; ref.current.play(); setPlaying(true); }
  };

  useEffect(() => {
    if (!inView && playing && ref.current) { ref.current.pause(); setPlaying(false); }
  }, [inView, playing]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (ref.current) ref.current.muted = next;
  };

  return (
    <motion.div {...fade()} className="relative rounded-2xl overflow-hidden group cursor-pointer"
      style={{ aspectRatio:'16/9', border:`1px solid ${accent}22` }}
      onClick={toggle}>
      <video ref={ref} src={src} loop playsInline muted={muted} preload="metadata"
        onLoadedMetadata={handleMetadata}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0"
        style={{ background:'linear-gradient(to top, rgba(8,12,10,0.6) 0%, transparent 50%)' }} />

      {/* Play/pause */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all"
          style={{ background:'rgba(8,12,10,0.8)', border:`2px solid ${accent}cc`,
            backdropFilter:'blur(8px)', boxShadow:`0 0 32px ${accent}44` }}>
          {playing
            ? <Pause size={20} style={{ color: accent }} fill={accent} />
            : <Play  size={20} className="ml-1" style={{ color: accent }} fill={accent} />}
        </div>
      </div>

      {/* Mute */}
      <button onClick={e => { e.stopPropagation(); toggleMute(); }}
        className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center"
        style={{ background:'rgba(0,0,0,0.6)', border:'1px solid rgba(255,255,255,0.15)' }}>
        {muted ? <VolumeX size={14} className="text-white" /> : <Volume2 size={14} className="text-white" />}
      </button>
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────
export default function BrandDetail() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const slug = new URLSearchParams(window.location.search).get('slug');
    const b = slug ? getBrand(slug) : null;
    setBrand(b);
    if (b) document.title = `${b.name} — AYESMAJ Studios`;
    else   document.title = 'Brand Not Found — AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  const allIds = BRANDS.map(b => b.id);
  const idx    = brand ? allIds.indexOf(brand.id) : -1;
  const prev   = idx > 0                 ? BRANDS[idx - 1] : null;
  const next   = idx < allIds.length - 1 ? BRANDS[idx + 1] : null;

  if (!brand) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-white"
        style={{ background:'#080C09' }}>
        <p className="text-gray-500 text-xs tracking-[0.3em] uppercase">Brand not found</p>
        <Link to="/Brands" className="text-[#00C46A] text-sm hover:underline flex items-center gap-2">
          <ArrowLeft size={14} /> Back to all brands
        </Link>
      </div>
    );
  }

  const assetBase = `/brands/${brand.id}`;
  const { accent } = brand;

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background:'#080C09' }}>
      <Navigation reducedMotion={reducedMotion} onToggleReducedMotion={() => setReducedMotion(v => !v)} />

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={`${assetBase}/${brand.featured}`} alt={brand.name}
            className="w-full h-full object-cover" />
          <div className="absolute inset-0"
            style={{ background:'linear-gradient(to top, #080C09 0%, rgba(8,12,9,0.6) 50%, rgba(8,12,9,0.15) 100%)' }} />
        </div>

        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{ background:`radial-gradient(ellipse at 50% 100%, ${accent}22 0%, transparent 70%)` }} />

        {/* Back */}
        <Link to="/Brands"
          className="absolute top-24 left-6 lg:left-12 z-10 flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors"
          style={{ color:`${accent}bb` }}>
          <ArrowLeft size={14} /> All Brands
        </Link>

        {/* Text */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 pb-20">
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }}
            transition={{ duration:1, ease:[0.16,1,0.3,1] }}>
            <p className="text-xs font-bold tracking-[0.4em] uppercase mb-4" style={{ color: accent }}>
              {brand.category}
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black text-white leading-none mb-3">
              {brand.name}
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/40 mb-8">{brand.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {brand.tags.map(t => (
                <span key={t} className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
                  style={{ background:`${accent}18`, border:`1px solid ${accent}35`, color: accent }}>
                  {t}
                </span>
              ))}
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase px-3 py-1.5 rounded-full"
                style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.35)' }}>
                {brand.year}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── DESCRIPTION ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 lg:px-12 py-20">
        <motion.p {...fade()} className="text-lg md:text-xl text-white/55 leading-relaxed">
          {brand.description}
        </motion.p>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────────────── */}
      {brand.images.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <motion.p {...fade()} className="text-[10px] font-bold tracking-[0.4em] uppercase mb-10"
            style={{ color: accent }}>
            Gallery
          </motion.p>
          {/* Masonry */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-gap:1rem]">
            {brand.images.map((img, i) => (
              <motion.div key={img} {...fade(i * 0.04)}
                className="break-inside-avoid mb-4 overflow-hidden rounded-2xl group"
                style={{ border:`1px solid ${accent}12` }}>
                <img src={`${assetBase}/${img}`} alt={`${brand.name} ${i + 1}`}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── VIDEOS ────────────────────────────────────────────────────── */}
      {brand.videos.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
          <motion.p {...fade()} className="text-[10px] font-bold tracking-[0.4em] uppercase mb-10"
            style={{ color: accent }}>
            Films &amp; Motion
          </motion.p>
          <div className={`grid gap-6 ${brand.videos.length > 1 ? 'md:grid-cols-2' : 'max-w-4xl'}`}>
            {brand.videos.map(v => (
              <VideoCard key={v} src={`${assetBase}/${v}`} accent={accent} />
            ))}
          </div>
        </section>
      )}

      {/* ── PREV / NEXT ───────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 border-t"
        style={{ borderColor:'rgba(255,255,255,0.05)' }}>
        <div className="flex items-center justify-between gap-6">
          {prev ? (
            <Link to={`/BrandDetail?slug=${prev.id}`}
              className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                <ArrowLeft size={16} className="text-white/50 group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-white/25 mb-0.5">Previous</p>
                <p className="font-bold text-white/70 group-hover:text-white transition-colors">{prev.name}</p>
              </div>
            </Link>
          ) : <div />}

          {next ? (
            <Link to={`/BrandDetail?slug=${next.id}`}
              className="group flex items-center gap-3 text-right">
              <div>
                <p className="text-[10px] tracking-widest uppercase text-white/25 mb-0.5">Next</p>
                <p className="font-bold text-white/70 group-hover:text-white transition-colors">{next.name}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all"
                style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)' }}>
                <ArrowRight size={16} className="text-white/50 group-hover:text-white transition-colors" />
              </div>
            </Link>
          ) : <div />}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="relative py-40 px-6 text-center overflow-hidden border-t"
        style={{ borderColor:'rgba(255,255,255,0.04)' }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background:`radial-gradient(ellipse at 50% 60%, ${accent}12 0%, transparent 60%)` }} />
        <motion.div {...fade()}>
          <p className="text-[11px] tracking-[0.4em] uppercase mb-6" style={{ color:`${accent}88` }}>Next Step</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-10">
            Let's Build the Next<br />Brand System
          </h2>
          <a href="/#contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full text-black text-sm font-bold hover:scale-105 transition-all duration-300 group"
            style={{ background: accent }}>
            Start Your Project <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
