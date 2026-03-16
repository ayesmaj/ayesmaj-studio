import React from 'react';
import { motion } from 'framer-motion';

export default function CaseStudyOverview({ brand }) {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left label */}
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="lg:col-span-3">
          <p className="text-[11px] tracking-[0.4em] text-[#00ff77]/60 uppercase sticky top-32">Overview</p>
        </motion.div>

        {/* Right content */}
        <div className="lg:col-span-9 space-y-16">
          <motion.p initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="text-2xl md:text-3xl text-white/80 leading-relaxed font-light"
          >
            {brand.overview || 'A premium brand system designed to elevate, differentiate, and drive measurable results across all touchpoints.'}
          </motion.p>

          {/* Deliverables */}
          {brand.deliverables?.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <p className="text-[10px] tracking-[0.4em] text-gray-700 uppercase mb-6">Deliverables</p>
              <div className="flex flex-wrap gap-3">
                {brand.deliverables.map((d, i) => (
                  <motion.span key={d}
                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                    className="px-5 py-2.5 rounded-full border border-white/[0.08] text-sm text-gray-400 tracking-wide"
                  >
                    {d}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Meta */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-12 pt-4 border-t border-white/[0.04]">
            {brand.industry && (
              <div>
                <p className="text-[10px] tracking-[0.3em] text-gray-700 uppercase mb-2">Industry</p>
                <p className="text-white text-sm">{brand.industry}</p>
              </div>
            )}
            {brand.year && (
              <div>
                <p className="text-[10px] tracking-[0.3em] text-gray-700 uppercase mb-2">Year</p>
                <p className="text-white text-sm">{brand.year}</p>
              </div>
            )}
            {brand.tags?.length > 0 && (
              <div>
                <p className="text-[10px] tracking-[0.3em] text-gray-700 uppercase mb-2">Services</p>
                <p className="text-white text-sm">{brand.tags.join(' · ')}</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}