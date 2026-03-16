import React from 'react';
import { motion } from 'framer-motion';

export default function CaseStudyResults({ brand }) {
  const results = brand.results || [];
  if (results.length === 0) return null;

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.4em] text-[#00ff77]/60 uppercase mb-16">
          Results
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-3xl overflow-hidden border border-white/[0.04]">
          {results.map((result, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className="p-10 bg-[#0B0B0B] hover:bg-[#00ff77]/[0.02] transition-colors duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="w-1 h-8 rounded-full bg-[#00ff77] flex-shrink-0 mt-0.5"
                  style={{ boxShadow: '0 0 12px rgba(0,255,119,0.5)' }} />
                <p className="text-white text-lg font-medium leading-snug">{result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}