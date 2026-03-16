import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ClosingSection() {
  const go = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative py-40 px-6 overflow-hidden">
      {/* Full bleed glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,255,119,0.07) 0%, transparent 65%)' }} />

      {/* Horizontal lines */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff77]/20 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff77]/10 to-transparent" />

      {/* Sweep */}
      <motion.div
        initial={{ x: '-150%', opacity: 0 }}
        animate={{ x: '250%', opacity: [0, 0.2, 0] }}
        transition={{ duration: 4, delay: 2, repeat: Infinity, repeatDelay: 10 }}
        className="pointer-events-none absolute top-1/2 left-0 w-[50%] h-px bg-gradient-to-r from-transparent via-[#00ff77] to-transparent"
        style={{ filter: 'blur(1px)' }}
      />

      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-[11px] tracking-[0.35em] text-[#00ff77]/70 uppercase mb-8"
        >
          Let's Build
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.0] mb-8"
        >
          Your business should
          <br />
          <span className="text-white/20">work even when</span>
          <br />
          <span className="relative inline-block">
            you sleep.
            <motion.span
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-1 left-0 right-0 h-0.5 origin-left"
              style={{ background: 'linear-gradient(90deg, #00ff77, transparent)', boxShadow: '0 0 12px #00ff77' }}
            />
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-500 text-lg max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Let's build your intelligent system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
        >
          <button onClick={go}
            className="group px-10 py-4 rounded-full bg-[#00ff77] text-black text-sm font-bold transition-all duration-300 hover:shadow-[0_0_60px_rgba(0,255,119,0.5)] hover:scale-105 inline-flex items-center gap-2"
          >
            Start Now <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}