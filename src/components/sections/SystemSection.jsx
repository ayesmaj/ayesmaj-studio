import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Target, TrendingUp } from 'lucide-react';

const steps = [
  {
    icon: Zap,
    label: 'Attraction',
    color: '#00ff77',
    items: ['AI Video', '3D Animation', 'Creative Campaigns'],
    desc: 'Stop-scroll content that pulls your ideal client into your world.'
  },
  {
    icon: Target,
    label: 'Conversion',
    color: '#00cc55',
    items: ['AI Phone Agent', 'Smart Website', 'Automated Follow-Up'],
    desc: 'Intelligent systems that close leads 24/7 without human effort.'
  },
  {
    icon: TrendingUp,
    label: 'Growth',
    color: '#009933',
    items: ['Analytics', 'Optimization', 'Lead Scaling'],
    desc: 'Data-driven scaling that compounds every month.'
  }
];

export default function SystemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="system" className="relative py-32 px-6 overflow-hidden">
      {/* bg glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,255,119,0.03) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[11px] tracking-[0.35em] text-[#00ff77]/70 uppercase mb-4">The Method</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">How Our System Works</h2>
        </motion.div>

        {/* Steps */}
        <div ref={ref} className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[20%] right-[20%] h-px z-0">
            <motion.div
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left w-full h-full"
              style={{ background: 'linear-gradient(90deg, #00ff77, #009933)', boxShadow: '0 0 12px rgba(0,255,119,0.4)' }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.label}
                  initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="group"
                >
                  <div className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8 hover:border-[#00ff77]/20 transition-all duration-500 hover:bg-[#00ff77]/[0.02]">
                    {/* Glow on hover */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ boxShadow: `0 0 40px rgba(0,255,119,0.08) inset` }} />

                    {/* Icon */}
                    <div className="relative mb-8">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ background: `${step.color}12`, border: `1px solid ${step.color}25` }}>
                        <Icon size={24} style={{ color: step.color }} />
                      </div>
                      {/* Step number */}
                      <span className="absolute top-0 right-0 text-[48px] font-extrabold leading-none"
                        style={{ color: `${step.color}08` }}>0{i + 1}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3">{step.label}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{step.desc}</p>

                    <ul className="space-y-2">
                      {step.items.map(item => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-gray-400">
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: step.color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}