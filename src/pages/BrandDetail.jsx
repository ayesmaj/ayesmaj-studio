import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/sections/Footer';
import CaseStudyHero from '@/components/brands/CaseStudyHero';
import CaseStudyOverview from '@/components/brands/CaseStudyOverview';
import CaseStudyGallery from '@/components/brands/CaseStudyGallery';
import CaseStudyResults from '@/components/brands/CaseStudyResults';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function BrandDetail() {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) { setLoading(false); return; }

    base44.entities.Brand.filter({ slug }).then(data => {
      const b = data[0] || null;
      setBrand(b);
      if (b) document.title = `${b.name} — AYESMAJ Studios`;
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0B0B0B' }}>
        <Loader2 className="animate-spin text-[#00ff77]" size={32} />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6" style={{ background: '#0B0B0B' }}>
        <p className="text-gray-500 text-sm tracking-widest uppercase">Brand not found</p>
        <Link to={createPageUrl('Brands')} className="text-[#00ff77] text-sm hover:underline">
          ← Back to Brands
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#0B0B0B' }}>
      <Navigation reducedMotion={reducedMotion} onToggleReducedMotion={() => setReducedMotion(v => !v)} />

      <CaseStudyHero brand={brand} />
      <CaseStudyOverview brand={brand} />
      <CaseStudyGallery brand={brand} />
      {brand.video_url && <CaseStudyVideo url={brand.video_url} />}
      <CaseStudyResults brand={brand} />

      {/* Final CTA */}
      <section className="relative py-40 px-6 text-center overflow-hidden border-t border-white/[0.04]">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(0,255,119,0.07) 0%, transparent 60%)' }} />
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9 }}>
          <p className="text-[11px] tracking-[0.4em] text-[#00ff77]/60 uppercase mb-6">Next Step</p>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] mb-10">
            Let's Build the Next<br />Brand System
          </h2>
          <a href="/#contact"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-[#00ff77] text-black text-sm font-bold hover:shadow-[0_0_60px_rgba(0,255,119,0.45)] hover:scale-105 transition-all duration-300 group"
          >
            Start Your Project <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

function CaseStudyVideo({ url }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden aspect-video bg-black border border-white/[0.05]"
          style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
        >
          <iframe src={url} className="w-full h-full" allow="autoplay; fullscreen" allowFullScreen title="Brand Video" />
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/[0.05]" />
        </motion.div>
      </div>
    </section>
  );
}