import React from 'react';
import { motion } from 'framer-motion';

export default function BrandsHero() {
  return (
    <section className="relative min-h-[60vh] flex items-end pb-20 pt-40 px-6 overflow-hidden">
      {/* Animated glow lines */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: [0, 0.15, 0], scaleX: [0, 1, 1] }}
            transition={{ duration: 4 + i * 1.2, delay: i * 0.8, repeat: Infinity, repeatDelay: 6 + i * 2 }}
            className="absolute left-0 right-0 h-px origin-left"
            style={{
              top: `${20 + i * 15}%`,
              background: 'linear-gradient(90deg, transparent 0%, #00ff77 40%, transparent 100%)',
              filter: 'blur(0.5px)'
            }}
          />
        ))}
        {/* Radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse, #00ff77 0%, transparent 65%)', filter: 'blur(60px)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
          <p className="text-[11px] tracking-[0.4em] text-[#00ff77]/60 uppercase mb-6">Portfolio</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[0.95] mb-8">
            Brands &<br />Collaborations
          </h1>
          <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
            Selected identity, packaging, motion and AI systems<br className="hidden md:block" />
            built by AYESMAJ Studios.
          </p>
        </motion.div>
      </div>
    </section>
  );
}