import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Star, Crown, Building2, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import HomeNav from '@/components/home/HomeNav';
import HomeFooter from '@/components/home/HomeFooter';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const PACKAGES = [
  {
    id: 'starter',
    name: 'Starter',
    icon: <Zap size={20} />,
    price: { monthly: 499, yearly: 399 },
    tagline: 'Launch your brand identity',
    accent: '#00C46A',
    popular: false,
    features: [
      'AI-generated brand content (20 posts/mo)',
      '1 short 3D animation (up to 15 sec)',
      'Logo design + brand mark',
      'Brand color & typography system',
      'Social media kit (10 templates)',
      '1 landing page (custom design)',
      '2 revision rounds',
      'Email delivery within 7 days',
    ],
  },
  {
    id: 'growth',
    name: 'Growth',
    icon: <Star size={20} />,
    price: { monthly: 1299, yearly: 999 },
    tagline: 'Full creative engine for scaling brands',
    accent: '#C8A44E',
    popular: true,
    features: [
      'AI content creation (60 posts/mo)',
      '3 × 3D animations / CGI ads (30 sec each)',
      'Full brand identity system',
      'Custom website (up to 5 pages)',
      'Product CGI renders (up to 5 shots)',
      'Monthly strategy & creative call',
      'Social media campaign direction',
      'Priority delivery within 5 days',
      'Unlimited revisions',
    ],
  },
  {
    id: 'studio',
    name: 'Studio Pro',
    icon: <Crown size={20} />,
    price: { monthly: 2999, yearly: 2399 },
    tagline: 'Your outsourced creative department',
    accent: '#A78BFA',
    popular: false,
    features: [
      'Unlimited AI content creation',
      'Up to 8 × 3D animations/CGI videos per month',
      'Full brand system + campaign direction',
      'Full website + landing pages (unlimited)',
      'VFX & cinematic product commercials',
      'Weekly creative strategy calls',
      'Dedicated project manager',
      'Same-day revisions',
      'Source files included',
      'White-label option',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: <Building2 size={20} />,
    price: null,
    tagline: 'Custom solution for large-scale brands',
    accent: '#F472B6',
    popular: false,
    features: [
      'Everything in Studio Pro',
      'Dedicated CGI & animation team',
      'Custom AI workflow built for your brand',
      'Multi-platform campaign delivery',
      'Long-form brand films & commercials',
      'International campaign strategy',
      'NDAs & white-label agreements',
      'SLA & guaranteed turnaround',
    ],
  },
];

const ADD_ONS = [
  { name: 'Extra 3D Animation (30 sec)', price: '$249' },
  { name: 'Full Website Build (10 pages)', price: '$1,499' },
  { name: 'Product CGI Pack (10 renders)', price: '$699' },
  { name: 'AI Content Pack (30 extra posts)', price: '$199' },
  { name: 'Brand Identity Only', price: '$799' },
  { name: 'Landing Page Only', price: '$399' },
];

function PriceCard({ pkg, billing }) {
  const navigate = useNavigate();
  const price = billing === 'yearly' ? pkg.price?.yearly : pkg.price?.monthly;

  const handleOrder = () => {
    navigate(`${createPageUrl('Contact')}?package=${pkg.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex flex-col rounded-3xl overflow-hidden"
      style={{
        background: pkg.popular
          ? `linear-gradient(145deg, rgba(200,164,78,0.1), rgba(200,164,78,0.04))`
          : 'rgba(255,255,255,0.03)',
        border: pkg.popular
          ? `1px solid rgba(200,164,78,0.4)`
          : `1px solid rgba(255,255,255,0.08)`,
        boxShadow: pkg.popular
          ? '0 0 60px rgba(200,164,78,0.12), 0 24px 60px rgba(0,0,0,0.5)'
          : '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {pkg.popular && (
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <div className="px-5 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase rounded-b-xl"
            style={{ background: '#C8A44E', color: '#07100A' }}>
            Most Popular
          </div>
        </div>
      )}

      <div className="p-7 md:p-8 flex-1 flex flex-col" style={{ paddingTop: pkg.popular ? '3rem' : undefined }}>
        {/* Icon + name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: `${pkg.accent}18`, border: `1px solid ${pkg.accent}30`, color: pkg.accent }}>
            {pkg.icon}
          </div>
          <div>
            <h3 className="font-black text-white text-lg">{pkg.name}</h3>
            <p className="text-[11px] text-white/40">{pkg.tagline}</p>
          </div>
        </div>

        {/* Price */}
        <div className="mb-6">
          {price ? (
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black text-white">${price.toLocaleString()}</span>
              <span className="text-white/40 text-sm mb-2">/month</span>
            </div>
          ) : (
            <div className="flex items-end gap-2">
              <span className="text-4xl font-black text-white">Custom</span>
            </div>
          )}
          {billing === 'yearly' && price && (
            <p className="text-[11px] mt-1" style={{ color: pkg.accent }}>
              Save ${((pkg.price.monthly - pkg.price.yearly) * 12).toLocaleString()}/year
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="h-px mb-6" style={{ background: `${pkg.accent}20` }} />

        {/* Features */}
        <ul className="flex flex-col gap-3 flex-1 mb-8">
          {pkg.features.map(f => (
            <li key={f} className="flex items-start gap-3">
              <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: `${pkg.accent}18` }}>
                <Check size={9} style={{ color: pkg.accent }} strokeWidth={3} />
              </span>
              <span className="text-white/65 text-sm leading-snug">{f}</span>
            </li>
          ))}
        </ul>

        {/* Primary CTA — Order & Pay */}
        <button
          onClick={handleOrder}
          className="w-full py-4 rounded-2xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group"
          style={pkg.popular
            ? { background: '#C8A44E', color: '#07100A', boxShadow: '0 0 30px rgba(200,164,78,0.3)' }
            : { background: `${pkg.accent}18`, border: `1px solid ${pkg.accent}30`, color: pkg.accent }
          }
          onMouseEnter={e => {
            if (!pkg.popular) e.currentTarget.style.background = `${pkg.accent}28`;
          }}
          onMouseLeave={e => {
            if (!pkg.popular) e.currentTarget.style.background = `${pkg.accent}18`;
          }}
        >
          {pkg.price ? 'Order & Get Started' : 'Contact Us'}
          <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Secondary — book a call */}
        {pkg.price && (
          <button
            onClick={() => handleOrder()}
            className="w-full mt-2 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300"
            style={{ color: 'rgba(255,255,255,0.3)', background: 'transparent' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
          >
            or book a free discovery call first
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState('monthly');

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#07100A' }}>
      <HomeNav />

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-20 px-6 text-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(200,164,78,0.08) 0%, transparent 70%)' }} />

        <motion.div {...fade(0)}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-[11px] font-bold tracking-[0.3em] uppercase"
            style={{ background: 'rgba(200,164,78,0.1)', border: '1px solid rgba(200,164,78,0.2)', color: '#C8A44E' }}>
            <Sparkles size={12} /> Transparent Pricing
          </div>
        </motion.div>

        <motion.h1 {...fade(0.1)}
          className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 tracking-tight">
          Invest in Your<br />
          <span style={{
            fontStyle: 'italic',
            backgroundImage: 'linear-gradient(125deg, #E8C96D 0%, #C8A44E 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Brand's Future</span>
        </motion.h1>

        <motion.p {...fade(0.2)}
          className="text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          AI-powered content, 3D animation, branding, and custom websites —
          all in one creative package built around your brand.
        </motion.p>

        {/* Billing toggle */}
        <motion.div {...fade(0.25)} className="inline-flex rounded-2xl p-1 mb-4"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
          {['monthly', 'yearly'].map(b => (
            <button key={b} onClick={() => setBilling(b)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 capitalize"
              style={billing === b
                ? { background: '#C8A44E', color: '#07100A' }
                : { color: 'rgba(255,255,255,0.4)' }}>
              {b}
              {b === 'yearly' && <span className="ml-2 text-[10px] font-black text-green-400">-20%</span>}
            </button>
          ))}
        </motion.div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PACKAGES.map(pkg => (
            <PriceCard key={pkg.id} pkg={pkg} billing={billing} />
          ))}
        </div>
      </section>

      {/* ── ADD-ONS ── */}
      <section className="max-w-5xl mx-auto px-6 lg:px-12 pb-24">
        <motion.div {...fade()} className="text-center mb-12">
          <p className="text-[10px] tracking-[0.5em] uppercase mb-3" style={{ color: '#C8A44E' }}>
            À la carte
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white">Add-Ons & One-Time Services</h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ADD_ONS.map((item, i) => (
            <motion.div key={item.name} {...fade(i * 0.04)}
              className="flex items-center justify-between p-5 rounded-2xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-white/70 text-sm">{item.name}</span>
              <span className="font-black text-white text-sm">{item.price}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ROW ── */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <motion.div {...fade()} className="text-center mb-10">
          <h2 className="text-2xl font-black text-white">Common Questions</h2>
        </motion.div>
        {[
          ['How does payment work?', 'We accept bank transfer, PayPal, and credit card. For monthly plans, payment is taken at the start of each cycle. One-time projects require 50% upfront.'],
          ['Can I cancel anytime?', 'Yes — monthly plans can be cancelled with 7 days notice before the next billing date. No lock-in contracts.'],
          ['Do I own the files?', 'Yes. Once a project is paid in full you receive all source files, exports and full commercial rights.'],
          ['How fast is delivery?', 'Starter: 7 days. Growth: 5 days priority. Studio Pro: same-day revisions. Timelines start after brief is confirmed.'],
          ['Can I upgrade my plan?', 'Absolutely. You can upgrade at any time and we\'ll pro-rate the difference for the current month.'],
        ].map(([q, a], i) => (
          <motion.details key={q} {...fade(i * 0.05)}
            className="group border-b py-5 cursor-pointer"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <summary className="flex items-center justify-between text-white font-bold text-sm list-none">
              {q}
              <span className="text-white/30 group-open:rotate-45 transition-transform duration-300 text-xl leading-none">+</span>
            </summary>
            <p className="mt-3 text-white/50 text-sm leading-relaxed">{a}</p>
          </motion.details>
        ))}
      </section>

      {/* ── CTA ── */}
      <section className="relative py-32 px-6 text-center overflow-hidden"
        style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(200,164,78,0.07) 0%, transparent 70%)' }} />
        <motion.div {...fade()}>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Not sure which plan?<br />
            <span style={{
              fontStyle: 'italic',
              backgroundImage: 'linear-gradient(125deg, #E8C96D 0%, #C8A44E 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>Let's talk.</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto mb-10">
            Book a free 20-minute call and we'll recommend exactly what your brand needs.
          </p>
          <Link to={createPageUrl('Contact')}
            className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 group"
            style={{ background: '#C8A44E', color: '#07100A', boxShadow: '0 0 40px rgba(200,164,78,0.25)' }}>
            Book a Free Call <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <HomeFooter />
    </div>
  );
}
