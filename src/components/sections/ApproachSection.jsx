import React from 'react';
import { motion } from 'framer-motion';
import { Diamond, Film, Target } from 'lucide-react';

const pillars = [
  { icon: Diamond,  title: 'Luxury Finish',        desc: 'Every frame treated with the same precision as a feature film. We never cut corners on craft.' },
  { icon: Film,     title: 'Cinematic Direction',  desc: 'Story-led visuals informed by film language — not just "nice-looking renders".' },
  { icon: Target,   title: 'Precision Execution',  desc: 'On-brief, on-time, every time. Clarity of communication is part of the product.' },
];

export default function ApproachSection() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left */}
          <div>
            <p className="text-xs tracking-[0.35em] text-[#D4A853] uppercase mb-4">Our Philosophy</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
              We treat every<br />brand like a film set.
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-md">
              Great visuals aren't just about software or render farms — they're about taste, intention, and a deep understanding of what makes people stop and look.
            </p>
          </div>

          {/* Right — pillars */}
          <div className="space-y-5">
            {pillars.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="flex gap-5 items-start group"
              >
                <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-[#D4A853]/30 group-hover:bg-[#D4A853]/8 transition-all duration-300">
                  <p.icon size={20} className="text-[#D4A853]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}