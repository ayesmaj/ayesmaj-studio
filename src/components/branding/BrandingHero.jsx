import React from 'react';
import { motion } from 'framer-motion';

export default function BrandingHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
      {/* Ambient green glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(179,255,63,0.5) 0%, transparent 70%)' }} />
      </div>

      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(179,255,63,0.3), transparent)' }} />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-[0.6em] uppercase mb-6"
           style={{ color: '#B3FF3F' }}
        >
          AYESMAJ Studios · Creative Services
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl text-white leading-[1.05] mb-6"
          style={{ fontFamily: "'Anton', sans-serif", fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.01em' }}
        >
          Branding &<br />Visual Campaigns
        </motion.h1>

        {/* Green underline animation */}
         <motion.div
           initial={{ width: 0 }}
           animate={{ width: '120px' }}
           transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
           className="mx-auto mb-8 h-px"
           style={{ background: 'linear-gradient(90deg, transparent, #B3FF3F, transparent)' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl font-light mb-6"
          style={{ color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}
        >
          Visual identity. Product worlds. Cinematic brand presence.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-base leading-relaxed max-w-2xl mx-auto"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          We design high-end visual branding systems, product campaigns, packaging visuals and 3D brand worlds
          that elevate businesses into premium experiences.
        </motion.p>
      </div>
    </section>
  );
}