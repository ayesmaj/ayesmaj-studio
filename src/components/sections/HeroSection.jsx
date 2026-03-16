import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import { useParallax } from '@/components/ui/useParallax';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.16, 1, 0.3, 1] }
});

export default function HeroSection() {
  const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  const { ref: parallaxRef, y: parallaxY } = useParallax(0.25);

  return (
    <section id="hero" ref={parallaxRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden">

      {/* Green bloom top — parallax layer */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-25"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #00ff7720 0%, transparent 70%)', filter: 'blur(60px)', transform: `translateY(${parallaxY * 0.5}px)` }} />

      {/* Bottom glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-15"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, #00cc5520 0%, transparent 70%)', filter: 'blur(80px)' }} />

      {/* Sweep light */}
      <motion.div
        initial={{ x: '-150%', opacity: 0 }}
        animate={{ x: '250%', opacity: [0, 0.25, 0] }}
        transition={{ duration: 3.5, delay: 5, repeat: Infinity, repeatDelay: 14 }}
        className="pointer-events-none absolute top-[40%] left-0 w-[40%] h-px bg-gradient-to-r from-transparent via-[#00ff77] to-transparent z-10"
        style={{ filter: 'blur(1px)' }}
      />

      {/* Grid overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">

        {/* Status badge */}
        <motion.div {...fade(0.1)} className="mb-8 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#00ff77]/20 bg-[#00ff77]/[0.04] backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff77] shadow-[0_0_8px_#00ff77]" style={{ animation: 'pulse 2s infinite' }} />
          <span className="text-[11px] tracking-[0.3em] text-[#00ff77]/80 uppercase font-light">Systems Active</span>
        </motion.div>

        {/* Headline */}
        <motion.h1 {...fade(0.22)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] tracking-tight mb-7"
        >
          WE BUILD
          <br />
          <span className="relative inline-block">
            INTELLIGENT
            <span className="absolute -inset-1 blur-2xl opacity-20" style={{ background: 'linear-gradient(90deg, #00ff77, transparent)' }} />
          </span>
          <br />
          <span className="text-white/20">MEDIA SYSTEMS</span>
        </motion.h1>

        {/* Sub */}
        <motion.p {...fade(0.38)} className="text-gray-400 text-base md:text-xl max-w-xl mb-12 leading-relaxed font-light tracking-wide">
          Cinematic AI content. Automated growth.<br className="hidden md:block" /> Full digital infrastructure.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fade(0.52)} className="flex flex-col sm:flex-row gap-4 items-center">
          <MagneticButton strength={0.35}>
            <button onClick={() => go('#contact')}
              className="group px-8 py-4 rounded-full bg-[#00ff77] text-black text-sm font-bold transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,255,119,0.5)] hover:scale-105 flex items-center gap-2"
            >
              Build My System <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </MagneticButton>
          <MagneticButton strength={0.28}>
            <button onClick={() => go('#work')}
              className="group px-8 py-4 rounded-full border border-white/10 text-white text-sm font-medium transition-all duration-300 hover:border-[#00ff77]/30 hover:bg-white/[0.03] flex items-center gap-2"
            >
              View Work <ArrowRight size={15} className="text-gray-500 group-hover:translate-x-1 group-hover:text-[#00ff77] transition-all" />
            </button>
          </MagneticButton>
        </motion.div>

        {/* Stats strip */}
        <motion.div {...fade(0.7)} className="mt-20 flex flex-wrap justify-center gap-10 md:gap-16">
          {[['50+', 'Brands Built'], ['3M+', 'Leads Generated'], ['12+', 'Countries'], ['98%', 'Retention Rate']].map(([n, l]) => (
            <div key={l} className="text-center">
              <div className="text-2xl font-extrabold text-white mb-0.5">{n}</div>
              <div className="text-[11px] tracking-[0.2em] text-gray-600 uppercase">{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.4, repeat: Infinity }}>
          <ChevronDown size={20} className="text-gray-700" />
        </motion.div>
      </motion.div>
    </section>
  );
}