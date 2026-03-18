import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function ShowreelSection() {
  return (
    <section id="work" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.35em] text-[#D4A853] uppercase mb-3">Showreel</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">See the work</h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
          className="relative group"
        >
          {/* Outer glow frame */}
          <div className="absolute -inset-[1.5px] rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{ background: 'linear-gradient(135deg, #D4A853, #2d8a4e, #D4A853)', filter: 'blur(1px)' }} />

          <div className="relative aspect-video rounded-3xl overflow-hidden bg-[#0d0d0d] border border-white/[0.04]">
            <img
              src="/brands/blenday/5.png"
              alt="Showreel"
              className="w-full h-full object-cover opacity-40 scale-105 group-hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

            {/* Corner marks */}
            {[['top-5 left-5', 'border-l border-t'], ['top-5 right-5', 'border-r border-t'], ['bottom-5 left-5', 'border-l border-b'], ['bottom-5 right-5', 'border-r border-b']].map(([pos, border], i) => (
              <div key={i} className={`absolute ${pos} w-8 h-8 ${border} border-[#D4A853]/25`} />
            ))}

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="absolute inset-0 rounded-full bg-[#D4A853]/20 blur-2xl scale-[2] group-hover:scale-[2.5] transition-transform duration-700" />
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-[#D4A853] to-[#B8860B] flex items-center justify-center shadow-2xl">
                  <Play size={28} className="text-black fill-black ml-1" />
                </div>
              </motion.button>
            </div>

            {/* Label */}
            <div className="absolute bottom-6 left-8 text-sm text-gray-400 font-medium tracking-widest uppercase">
              2024 Showreel
            </div>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 border-t border-white/[0.04] pt-14"
        >
          {[['50+', 'Projects Delivered'], ['15+', 'Countries Served'], ['4K', 'Standard Output'], ['100%', 'On-Time Rate']].map(([val, label]) => (
            <div key={label} className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#D4A853] to-[#2d8a4e] bg-clip-text text-transparent mb-1">{val}</div>
              <div className="text-xs text-gray-500 tracking-wider uppercase">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}