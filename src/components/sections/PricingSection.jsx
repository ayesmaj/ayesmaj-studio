import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter System',
    tagline: 'Establish your digital presence.',
    features: [
      'Brand identity & positioning',
      'Smart website build',
      'One hero video production',
      'AI chatbot integration',
      'Basic analytics setup',
    ],
    cta: 'Schedule Strategy Call',
    highlight: false,
  },
  {
    name: 'Growth System',
    tagline: 'Automate, convert, scale.',
    features: [
      'Everything in Starter',
      'AI Phone Agent (24/7)',
      'Monthly content pipeline',
      'CRM + booking automation',
      'Paid media management',
      'Monthly performance reports',
    ],
    cta: 'Schedule Strategy Call',
    highlight: true,
  },
  {
    name: 'Full AI Infrastructure',
    tagline: 'Your business, fully automated.',
    features: [
      'Everything in Growth',
      'Custom AI workflows',
      'Multi-channel content system',
      'Dedicated strategy team',
      'Weekly optimization sprints',
      'White-glove onboarding',
    ],
    cta: 'Schedule Strategy Call',
    highlight: false,
  },
];

export default function PricingSection() {
  const go = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      {/* Center glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] opacity-[0.05]"
        style={{ background: 'radial-gradient(ellipse, #00ff77 0%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-[11px] tracking-[0.35em] text-[#00ff77]/70 uppercase mb-4">Packages</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5">Choose Your System</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm leading-relaxed">
            No generic subscriptions. Each system is engineered for your specific growth stage.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
              className={`relative rounded-3xl p-8 border transition-all duration-500 group
                ${plan.highlight
                  ? 'border-[#00ff77]/30 bg-[#00ff77]/[0.04]'
                  : 'border-white/[0.05] bg-white/[0.02] hover:border-white/[0.10]'
                }`}
            >
              {/* Popular badge */}
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#00ff77] text-black text-[10px] font-bold tracking-widest uppercase">
                  Most Popular
                </div>
              )}

              {/* Glow overlay */}
              {plan.highlight && (
                <div className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{ boxShadow: '0 0 60px rgba(0,255,119,0.08) inset' }} />
              )}

              <div className="mb-8">
                <h3 className="text-xl font-extrabold text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.tagline}</p>
              </div>

              <div className="h-px bg-white/[0.05] mb-8" />

              <ul className="space-y-3.5 mb-10">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-400">
                    <Check size={14} className="mt-0.5 flex-shrink-0 text-[#00ff77]" />
                    {f}
                  </li>
                ))}
              </ul>

              <button onClick={go}
                className={`w-full py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 group/btn transition-all duration-300
                  ${plan.highlight
                    ? 'bg-[#00ff77] text-black hover:shadow-[0_0_30px_rgba(0,255,119,0.4)] hover:scale-[1.02]'
                    : 'border border-white/10 text-white hover:border-[#00ff77]/30 hover:bg-[#00ff77]/[0.04]'
                  }`}
              >
                {plan.cta} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="text-center text-gray-700 text-sm mt-10"
        >
          All systems include onboarding, strategy alignment, and dedicated support.
        </motion.p>
      </div>
    </section>
  );
}