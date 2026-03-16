import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Box, Megaphone, Phone, Globe, BarChart2 } from 'lucide-react';

const blocks = [
  {
    label: 'Creative',
    color: '#00ff77',
    services: [
      { icon: Film, name: 'Cinematic AI Video', desc: 'Photorealistic brand films powered by generative AI and human storytelling.' },
      { icon: Box, name: 'High-End 3D Animation', desc: 'Product visualization and motion that makes audiences stop scrolling.' },
      { icon: Megaphone, name: 'Brand Launch Campaigns', desc: 'Full-funnel creative strategy from concept to distribution.' },
    ]
  },
  {
    label: 'Automation',
    color: '#00cc99',
    services: [
      { icon: Phone, name: 'AI Phone Agents', desc: '24/7 intelligent voice agents that qualify, book, and follow up with leads.' },
      { icon: Globe, name: 'Smart Booking Systems', desc: 'Frictionless scheduling infrastructure connected to your CRM.' },
      { icon: BarChart2, name: 'CRM Integration', desc: 'Every lead, call, and conversion tracked and attributed automatically.' },
    ]
  },
  {
    label: 'Growth',
    color: '#00aaff',
    services: [
      { icon: BarChart2, name: 'Performance Media', desc: 'Paid acquisition with AI-optimized creative testing at scale.' },
      { icon: Film, name: 'Data Tracking', desc: 'Custom dashboards that show you exactly what drives revenue.' },
      { icon: Megaphone, name: 'Continuous Optimization', desc: 'Monthly strategy sessions backed by real performance data.' },
    ]
  }
];

export default function ServicesSection() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle left glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-[400px] h-[600px] opacity-[0.06]"
        style={{ background: 'radial-gradient(ellipse at 0% 50%, #00ff77 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-[11px] tracking-[0.35em] text-[#00ff77]/70 uppercase mb-4">Our Services</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white max-w-lg leading-tight">
            Three Pillars.<br />One System.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {blocks.map((block, bi) => (
            <motion.div key={block.label}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: bi * 0.12 }}
              className="group relative rounded-3xl border border-white/[0.05] bg-white/[0.02] p-8 hover:border-white/[0.12] transition-all duration-500"
              onMouseEnter={() => setHovered(bi)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl transition-opacity duration-500 pointer-events-none"
                style={{ opacity: hovered === bi ? 1 : 0, boxShadow: `0 0 60px ${block.color}10 inset, 0 0 100px ${block.color}05` }} />

              {/* Block label */}
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px" style={{ background: block.color }} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: block.color }}>
                  {block.label}
                </span>
              </div>

              {/* Services */}
              <div className="space-y-6">
                {block.services.map((svc, si) => {
                  const Icon = svc.icon;
                  return (
                    <motion.div key={svc.name}
                      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: bi * 0.1 + si * 0.08 }}
                      className="group/item flex gap-4"
                    >
                      <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                        style={{ background: `${block.color}10`, border: `1px solid ${block.color}20` }}>
                        <Icon size={15} style={{ color: block.color }} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white mb-1 group-hover/item:text-[#00ff77] transition-colors">
                          {svc.name}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">{svc.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Bottom accent line */}
              <div className="mt-8 h-px w-0 group-hover:w-full transition-all duration-700"
                style={{ background: `linear-gradient(90deg, ${block.color}, transparent)` }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}