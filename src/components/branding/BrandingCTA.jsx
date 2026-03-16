import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function BrandingCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative py-36 px-6 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,163,78,0.2), transparent)' }} />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, rgba(0,196,106,0.12) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs tracking-[0.6em] uppercase mb-6"
          style={{ color: '#C8A44E' }}
        >
          Ready to Begin
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-6"
        >
          Let's build your<br />brand world.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-base mb-10"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          Tell us about your product, and we'll turn it into a cinematic experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            onClick={() => navigate(createPageUrl('Contact'))}
            whileHover={{ boxShadow: '0 0 40px rgba(0,196,106,0.3)', scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold tracking-widest uppercase text-sm transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(200,163,78,0.9), rgba(200,163,78,0.7))',
              color: '#0B0F0C',
              minHeight: '44px',
            }}
          >
            Start a Project <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}