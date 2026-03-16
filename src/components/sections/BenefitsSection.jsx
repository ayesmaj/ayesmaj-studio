import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Zap } from 'lucide-react';

const benefits = [
  {
    icon: Award,
    title: "Premium Quality",
    body: "4K renders, physically accurate lighting, and a high-end finish that rivals top international studios.",
    accent: "#D4A853"
  },
  {
    icon: TrendingUp,
    title: "Higher Engagement",
    body: "Scroll-stopping visuals that outperform static content. Brands see 3–5× better ad performance.",
    accent: "#2d8a4e"
  },
  {
    icon: Zap,
    title: "Fast & Scalable",
    body: "AI-assisted pipeline and proven systems mean faster turnarounds without sacrificing quality.",
    accent: "#D4A853"
  }
];

export default function BenefitsSection() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.35em] text-[#D4A853] uppercase mb-3">Why AYESMAJ</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">The difference is visible</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <motion.div key={b.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8 overflow-hidden transition-all duration-500 hover:border-[#D4A853]/25 hover:bg-white/[0.04]"
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at 50% 0%, ${b.accent}18 0%, transparent 70%)` }} />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 border border-white/[0.06]"
                  style={{ background: `${b.accent}12` }}>
                  <b.icon size={22} style={{ color: b.accent }} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{b.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}