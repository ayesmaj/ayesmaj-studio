import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import HomeNav from '@/components/home/HomeNav';
import Footer from '@/components/sections/Footer';
import { BRANDS, BRAND_NAV_GROUPS } from '@/data/brands';

// ── Animation helpers ─────────────────────────────────────────────────────────
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

// ── Single brand card ─────────────────────────────────────────────────────────
function BrandCard({ brand, index }) {
  const assetBase = `/brands/${brand.id}`;
  const thumb = `${assetBase}/${brand.featured}`;

  return (
    <motion.div
      key={brand.id}
      initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        to={`/BrandDetail?slug=${brand.id}`}
        className="group block relative rounded-3xl overflow-hidden border border-white/[0.05] hover:border-opacity-30 transition-all duration-500 flex flex-col"
        style={{
          background: '#111111',
          borderColor: `${brand.accent}18`,
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = `${brand.accent}44`; e.currentTarget.style.boxShadow = `0 0 60px ${brand.accent}12`; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = `${brand.accent}18`; e.currentTarget.style.boxShadow = ''; }}
      >
        {/* Thumbnail */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={thumb}
            alt={brand.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #111111 0%, transparent 60%)' }} />

          {/* Arrow badge */}
          <div className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100"
            style={{ background: brand.accent }}>
            <ArrowUpRight size={16} className="text-black" />
          </div>

          {/* Year pill */}
          <span className="absolute top-4 left-4 text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 rounded-full"
            style={{ background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            {brand.year}
          </span>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-3 flex-1">
          {/* Category */}
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase" style={{ color: brand.accent }}>
            {brand.category}
          </p>

          {/* Name + subtitle */}
          <div>
            <h3 className="text-white font-extrabold text-xl tracking-tight leading-tight">
              {brand.name}
            </h3>
            <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {brand.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {brand.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {brand.tags.map(tag => (
              <span key={tag}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
                style={{ background: `${brand.accent}14`, border: `1px solid ${brand.accent}30`, color: brand.accent }}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTA row */}
          <div className="mt-2 w-full py-3 rounded-2xl border text-center text-xs font-bold tracking-widest uppercase transition-all duration-300"
            style={{ borderColor: `${brand.accent}25`, color: 'rgba(255,255,255,0.35)' }}>
            View Case Study
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// Group labels → set of brand ids for filtering
const GROUP_IDS = Object.fromEntries(
  [{ label: 'All' }, ...BRAND_NAV_GROUPS].map(g => [g.label, g.brands ? new Set(g.brands) : null])
);
const GROUP_LABELS = ['All', ...BRAND_NAV_GROUPS.map(g => g.label)];

// Unique years from data (newest first)
const ALL_YEARS = ['All', ...Array.from(new Set(BRANDS.map(b => b.year))).sort((a, b) => (b > a ? 1 : -1))];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function Brands() {
  const [activeGroup, setActiveGroup] = useState('All');
  const [activeYear,  setActiveYear]  = useState('All');

  const filtered = useMemo(() => BRANDS.filter(b => {
    const ids = GROUP_IDS[activeGroup];
    const inGroup = !ids || ids.has(b.id);
    const inYear  = activeYear === 'All' || b.year === activeYear;
    return inGroup && inYear;
  }), [activeGroup, activeYear]);

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#080C09' }}>
      <HomeNav />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
        {/* ambient glow */}
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,164,78,0.07) 0%, transparent 65%)' }} />

        <motion.div {...fade(0)}>
          <p className="text-xs font-bold tracking-[0.45em] uppercase mb-5"
            style={{ color: 'rgba(200,164,78,0.7)' }}>
            Portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-5">
            Brands &amp; Collaborations
          </h1>
          <p className="max-w-xl mx-auto text-base md:text-lg text-white/35 leading-relaxed">
            Case studies, brand films, and full identity systems — from concept to final frame.
          </p>
        </motion.div>
      </section>

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <motion.div {...fade(0.1)} className="flex flex-wrap gap-2 items-center justify-center">
          {/* Group pills */}
          {GROUP_LABELS.map(g => (
            <button key={g} onClick={() => setActiveGroup(g)}
              className="text-[10px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: activeGroup === g ? 'rgba(200,164,78,0.18)' : 'rgba(255,255,255,0.04)',
                border: activeGroup === g ? '1px solid rgba(200,164,78,0.5)' : '1px solid rgba(255,255,255,0.08)',
                color: activeGroup === g ? '#C8A44E' : 'rgba(255,255,255,0.35)',
              }}>
              {g === 'All' ? 'All Work' : g}
            </button>
          ))}

          <div className="w-px h-5 mx-1" style={{ background: 'rgba(255,255,255,0.08)' }} />

          {/* Year pills */}
          {ALL_YEARS.map(y => (
            <button key={y} onClick={() => setActiveYear(y)}
              className="text-[10px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full transition-all duration-200"
              style={{
                background: activeYear === y ? 'rgba(200,164,78,0.18)' : 'rgba(255,255,255,0.04)',
                border: activeYear === y ? '1px solid rgba(200,164,78,0.5)' : '1px solid rgba(255,255,255,0.08)',
                color: activeYear === y ? '#C8A44E' : 'rgba(255,255,255,0.35)',
              }}>
              {y}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-40 text-gray-700 text-sm tracking-widest uppercase">
            No brands match the selected filters
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((brand, i) => (
                <BrandCard key={brand.id} brand={brand} index={i} />
              ))}
            </div>
          </AnimatePresence>
        )}
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────────────── */}
      <section className="relative border-t py-32 px-6 text-center overflow-hidden"
        style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(200,164,78,0.06) 0%, transparent 65%)' }} />
        <motion.div {...fade()}>
          <p className="text-[11px] tracking-[0.35em] uppercase mb-5"
            style={{ color: 'rgba(200,164,78,0.6)' }}>
            Work with us
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
            Ready to Build Your<br />Brand System?
          </h2>
          <a href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-black text-sm font-bold hover:scale-105 transition-all duration-300 group"
            style={{ background: '#C8A44E' }}>
            Start Your Project
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
