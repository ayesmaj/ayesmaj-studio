import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Play, Send } from 'lucide-react';

const steps = [
  { icon: Search,   num: '01', title: 'Discover',  desc: 'Deep-dive into your brand, goals, and audience to align creative direction.' },
  { icon: PenTool,  num: '02', title: 'Design',    desc: 'Style frames, mood boards, and 3D concepts presented for approval.' },
  { icon: Play,     num: '03', title: 'Animate',   desc: 'Full production in our pipeline — modelling, rigging, lighting, render.' },
  { icon: Send,     num: '04', title: 'Deliver',   desc: 'Final 4K files, source assets, and ready-to-deploy formats on schedule.' },
];

export default function ProcessSection() {
  return (
    <section id="process" className="relative py-28 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <p className="text-xs tracking-[0.35em] text-[#D4A853] uppercase mb-3">How It Works</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Our Process</h2>
        </motion.div>

        <div className="relative">
          {/* Animated connecting line */}
          <motion.div
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 0.3 }}
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-[1px] origin-left"
            style={{ background: 'linear-gradient(to right, #D4A853, #2d8a4e, #D4A853)', opacity: 0.3 }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 3 }}
                  className="relative z-10 w-20 h-20 rounded-2xl border border-white/[0.07] bg-white/[0.02] flex items-center justify-center mb-5 transition-all duration-300 group-hover:border-[#D4A853]/35 group-hover:shadow-[0_0_24px_rgba(212,168,83,0.15)]"
                >
                  <s.icon size={24} className="text-[#D4A853]" />
                </motion.div>
                <div className="text-[10px] tracking-[0.3em] text-[#D4A853]/60 mb-1 font-mono">{s.num}</div>
                <h3 className="text-white font-semibold text-base mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}