import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { number: '500+', label: 'Hours of Visual Content', color: '#00C46A' },
  { number: '80+', label: 'Brands Elevated', color: '#00C46A' },
  { number: '25+', label: 'Awards & Recognition', color: '#00C46A' },
  { number: '15', label: 'Years of Excellence', color: '#00C46A' }
];

const stagger = {
  container: { staggerChildren: 0.1 },
  item: { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { duration: 0.6 } }
};

export default function StatsSection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group"
            >
              {/* Background circle accent */}
              <div
                className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur"
                style={{ background: stat.color }}
              />

              {/* Card */}
              <div className="relative rounded-xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 h-full flex flex-col justify-between hover:border-white/[0.15] transition-all duration-300">
                {/* Number dot */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: stat.color }} />
                </div>

                {/* Stats */}
                <div>
                  <div
                    className="text-4xl lg:text-5xl font-black mb-3 leading-tight"
                    style={{ color: stat.color, textShadow: `0 0 20px ${stat.color}22` }}
                  >
                    {stat.number}
                  </div>
                  <p className="text-xs lg:text-sm text-gray-400 font-medium tracking-wider uppercase leading-relaxed">
                    {stat.label}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}