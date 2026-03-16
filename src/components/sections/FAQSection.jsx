import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { q: "What is your typical project timeline?", a: "A standard 30-second animation typically takes 2–3 weeks from signed brief to final delivery. Comprehensive brand packages range from 4–8 weeks." },
  { q: "Do you work with international clients?", a: "Yes — we work with clients globally. Our async workflows and collaborative tooling make remote production seamless regardless of time zone." },
  { q: "What file formats do you deliver?", a: "We deliver MP4, MOV, ProRes, and custom formats on request. All Pro and Studio projects include 4K as standard." },
  { q: "Can you match our brand guidelines?", a: "Absolutely. Brand alignment is central to our process. We use your palette, typography, and motion language as a starting point, then elevate it." },
  { q: "How many revisions do you offer?", a: "Starter includes 2 revision rounds. Pro offers unlimited revisions. Studio tier includes unlimited revisions with a priority SLA." },
  { q: "Do you handle sound design and music?", a: "Yes — Pro and Studio tiers include professional sound design and licensed music sourcing. We partner with top music libraries for full licensing." },
];

export default function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-xs tracking-[0.35em] text-[#D4A853] uppercase mb-3">Questions</p>
          <h2 className="text-3xl md:text-5xl font-bold text-white">FAQ</h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full text-left">
                <div className={`rounded-xl border px-6 py-5 transition-all duration-300 ${open === i ? 'border-[#D4A853]/30 bg-white/[0.03]' : 'border-white/[0.04] bg-white/[0.015] hover:border-white/10'}`}>
                  <div className="flex items-center justify-between gap-4">
                    <span className={`font-medium text-sm transition-colors ${open === i ? 'text-[#D4A853]' : 'text-white'}`}>{f.q}</span>
                    <div className={`shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${open === i ? 'bg-[#D4A853]/15 text-[#D4A853]' : 'bg-white/[0.04] text-gray-500'}`}>
                      {open === i ? <Minus size={13} /> : <Plus size={13} />}
                    </div>
                  </div>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }} className="overflow-hidden"
                      >
                        <p className="pt-4 text-gray-500 text-sm leading-relaxed">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}