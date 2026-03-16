import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const items = [
  {
    quote: "AYESMAJ made our product launch film look like it cost 10x what we paid. The CGI quality is genuinely unmatched.",
    author: "Sarah Chen", role: "CMO, Velocity Tech",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80"
  },
  {
    quote: "Fast, collaborative, and incredibly talented. They understood our brand language from day one and delivered beyond expectations.",
    author: "Marcus Webb", role: "Creative Director, Apex Motors",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80"
  },
  {
    quote: "We've worked with studios in London and LA. AYESMAJ sits right at the top in terms of craft and communication.",
    author: "Elena Rodriguez", role: "Founder, Luxe Cosmetics",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80"
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
                <img src={t.img} alt={t.author} className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10" />
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