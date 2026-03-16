import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import Navigation from '@/components/navigation/Navigation';
import Footer from '@/components/sections/Footer';
import BrandCard from '@/components/brands/BrandCard';
import BrandsHero from '@/components/brands/BrandsHero';
import BrandsFilter from '@/components/brands/BrandsFilter';
import { ArrowRight, Loader2, Sparkles, X } from 'lucide-react';
import AIBrandAssistant from '@/components/brands/AIBrandAssistant';
import { AnimatePresence as AP } from 'framer-motion';

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState('All');
  const [activeService, setActiveService] = useState('All');
  const [activeYear, setActiveYear] = useState('All');
  const [showAI, setShowAI] = useState(false);

  useEffect(() => {
    document.title = "Brands & Collaborations — AYESMAJ Studios";
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    base44.entities.Brand.list('-created_date').then(data => {
      setBrands(data);
      setLoading(false);
    });
  }, []);

  const filtered = brands.filter(b => {
    const inIndustry = activeIndustry === 'All' || b.industry === activeIndustry;
    const inService = activeService === 'All' || (b.tags || []).includes(activeService);
    const inYear = activeYear === 'All' || b.year === activeYear;
    return inIndustry && inService && inYear;
  });

  const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#0B0B0B' }}>
      <Navigation reducedMotion={reducedMotion} onToggleReducedMotion={() => setReducedMotion(v => !v)} />

      <BrandsHero />

      {/* AI Assistant toggle */}
      <div className="max-w-7xl mx-auto px-6 pt-4 pb-2 flex justify-end">
        <button onClick={() => setShowAI(v => !v)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-wide transition-all duration-300 ${showAI ? 'bg-[#00ff77]/10 border-[#00ff77]/30 text-[#00ff77] shadow-[0_0_20px_rgba(0,255,119,0.1)]' : 'border-white/[0.07] text-gray-500 hover:text-[#00ff77] hover:border-[#00ff77]/20'}`}
        >
          <Sparkles size={12} />
          AI Content Assistant
          {showAI && <X size={11} className="ml-0.5" />}
        </button>
      </div>

      <AP>
        {showAI && (
          <div className="max-w-7xl mx-auto px-6 pb-6">
            <AIBrandAssistant onClose={() => setShowAI(false)} />
          </div>
        )}
      </AP>

      {/* Filter bar */}
      <BrandsFilter
        brands={brands}
        activeIndustry={activeIndustry} setActiveIndustry={setActiveIndustry}
        activeService={activeService} setActiveService={setActiveService}
        activeYear={activeYear} setActiveYear={setActiveYear}
      />

      {/* Grid */}
      <section className="px-6 pb-32 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="animate-spin text-[#00ff77]" size={28} />
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-center py-40 text-gray-700 text-sm tracking-widest uppercase">
            No brands found
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((brand, i) => (
                <motion.div key={brand.id}
                  initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.55, delay: i * 0.07 }}
                >
                  <BrandCard brand={brand} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="relative border-t border-white/[0.04] py-32 px-6 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,255,119,0.06) 0%, transparent 65%)' }} />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="text-[11px] tracking-[0.35em] text-[#00ff77]/60 uppercase mb-5">Work with us</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 leading-tight">
            Ready to Build Your<br />Brand System?
          </h2>
          <a href="/#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#00ff77] text-black text-sm font-bold hover:shadow-[0_0_50px_rgba(0,255,119,0.4)] hover:scale-105 transition-all duration-300 group"
          >
            Start Your Project <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}