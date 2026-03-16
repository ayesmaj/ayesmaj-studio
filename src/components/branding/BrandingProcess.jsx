import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Pen, Box, Sun, Film, Rocket } from 'lucide-react';

const STEPS = [
  { label: 'Concept', icon: Lightbulb },
  { label: 'Design', icon: Pen },
  { label: '3D', icon: Box },
  { label: 'Lighting', icon: Sun },
  { label: 'Rendering', icon: Film },
  { label: 'Campaign', icon: Rocket },
];

export default function BrandingProcess() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,106,0.12), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#C8A44E' }}>How We Work</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Our Process</h2>
        </motion.div>

        {/* Process timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent 2%, rgba(200,163,78,0.25) 15%, rgba(200,163,78,0.25) 85%, transparent 98%)' }} />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-4 text-center group"
                >
                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.1, borderColor: 'rgba(0,196,106,0.6)', boxShadow: '0 0 24px rgba(0,196,106,0.15)' }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                    style={{
                      background: 'rgba(11,15,12,0.9)',
                      border: '1px solid rgba(200,163,78,0.25)',
                    }}
                  >
                    <Icon size={20} style={{ color: '#C8A44E' }} />
                  </motion.div>

                  {/* Step number */}
                  <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(200,163,78,0.4)' }}>
                    0{i + 1}
                  </span>

                  <p className="text-white font-bold text-sm">{step.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}