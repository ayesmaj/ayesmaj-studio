import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const items = [
  {
    quote: "AYESMAJ made our product launch film look like it cost 10x what we paid. The CGI quality is genuinely unmatched.",
    author: "Sarah Chen", role: "CMO, Velocity Tech",
    initials: "SC", color: "#C8A44E"
  },
  {
    quote: "Fast, collaborative, and incredibly talented. They understood our brand language from day one and delivered beyond expectations.",
    author: "Marcus Webb", role: "Creative Director, Apex Motors",
    initials: "MW", color: "#B3FF3F"
  },
  {
    quote: "We've worked with studios in London and LA. AYESMAJ sits right at the top in terms of craft and communication.",
    author: "Elena Rodriguez", role: "Founder, Luxe Cosmetics",
    initials: "ER", color: "#9B59B6"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs tracking-[0.35em] text-[#D4A853] uppercase mb-3">Client Stories</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Trusted by top brands</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <motion.div key={t.author}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl border border-white/[0.05] bg-white/[0.02] p-8 transition-all duration-400 hover:border-[#D4A853]/20 hover:bg-white/[0.035]"
            >
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-[#D4A853] text-[#D4A853]" />)}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-8 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-black ring-1 ring-white/10 shrink-0"
                  style={{ background: `${t.color}18`, color: t.color, border: `1px solid ${t.color}40` }}>
                  {t.initials}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.author}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}