import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Star, Crown, Building2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import { COLORS, FONTS } from '@/components/ayesmaj/theme';

const GOLD = '#FFB000';
const GOLD_RGB = '255,176,0';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

// Tier accents mapped to the brand three-world palette
const PACKAGES = [
  {
    id: 'starter', name: 'Starter', icon: <Zap size={20} />,
    price: { monthly: 499, yearly: 399 }, tagline: 'Launch your brand identity',
    accent: '#B3FF3F', accentRGB: '179,255,63', popular: false,
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
    id: 'growth', name: 'Growth', icon: <Star size={20} />,
    price: { monthly: 1299, yearly: 999 }, tagline: 'Full creative engine for scaling brands',
    accent: GOLD, accentRGB: GOLD_RGB, popular: true,
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
    id: 'studio', name: 'Studio Pro', icon: <Crown size={20} />,
    price: { monthly: 2999, yearly: 2399 }, tagline: 'Your outsourced creative department',
    accent: '#9B5CFF', accentRGB: '155,92,255', popular: false,
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
    id: 'enterprise', name: 'Enterprise', icon: <Building2 size={20} />,
    price: null, tagline: 'Custom solution for large-scale brands',
    accent: '#F5F5F0', accentRGB: '245,245,240', popular: false,
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

const FAQ = [
  ['How does payment work?', 'We accept bank transfer, PayPal, and credit card. For monthly plans, payment is taken at the start of each cycle. One-time projects require 50% upfront.'],
  ['Can I cancel anytime?', 'Yes — monthly plans can be cancelled with 7 days notice before the next billing date. No lock-in contracts.'],
  ['Do I own the files?', 'Yes. Once a project is paid in full you receive all source files, exports and full commercial rights.'],
  ['How fast is delivery?', 'Starter: 7 days. Growth: 5 days priority. Studio Pro: same-day revisions. Timelines start after brief is confirmed.'],
  ['Can I upgrade my plan?', "Absolutely. You can upgrade at any time and we'll pro-rate the difference for the current month."],
];

function PriceCard({ pkg, billing }) {
  const navigate = useNavigate();
  const price = billing === 'yearly' ? pkg.price?.yearly : pkg.price?.monthly;
  const handleOrder = () => navigate(`/Contact?package=${pkg.id}`);

  return (
    <motion.div {...fade()}
      style={{
        position: 'relative', display: 'flex', flexDirection: 'column', borderRadius: 22, overflow: 'hidden',
        background: pkg.popular ? `linear-gradient(160deg, rgba(${pkg.accentRGB},0.10), rgba(${pkg.accentRGB},0.03))` : COLORS.glass,
        border: pkg.popular ? `1px solid rgba(${pkg.accentRGB},0.45)` : `1px solid ${COLORS.border}`,
        boxShadow: pkg.popular ? `0 0 60px rgba(${pkg.accentRGB},0.14), 0 24px 60px rgba(0,0,0,0.5)` : '0 8px 40px rgba(0,0,0,0.4)',
      }}>
      {pkg.popular && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <div style={{ padding: '6px 20px', fontFamily: FONTS.ui, fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', borderRadius: '0 0 12px 12px', background: pkg.accent, color: '#030303' }}>
            Most Popular
          </div>
        </div>
      )}

      <div style={{ padding: 30, paddingTop: pkg.popular ? 48 : 30, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Icon + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
          <div style={{ width: 42, height: 42, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(${pkg.accentRGB},0.12)`, border: `1px solid rgba(${pkg.accentRGB},0.3)`, color: pkg.accent }}>
            {pkg.icon}
          </div>
          <div>
            <h3 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 800, textTransform: 'uppercase', color: COLORS.white, margin: 0, lineHeight: 1 }}>{pkg.name}</h3>
            <p style={{ fontFamily: FONTS.ui, fontSize: 11.5, color: COLORS.muted, margin: '4px 0 0' }}>{pkg.tagline}</p>
          </div>
        </div>

        {/* Price */}
        <div style={{ marginBottom: 24 }}>
          {price ? (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
              <span style={{ fontFamily: FONTS.display, fontSize: 52, fontWeight: 800, color: COLORS.white, lineHeight: 1 }}>${price.toLocaleString()}</span>
              <span style={{ fontFamily: FONTS.ui, color: COLORS.muted, fontSize: 14, marginBottom: 6 }}>/month</span>
            </div>
          ) : (
            <span style={{ fontFamily: FONTS.display, fontSize: 44, fontWeight: 800, color: COLORS.white, lineHeight: 1 }}>Custom</span>
          )}
          {billing === 'yearly' && price && (
            <p style={{ fontFamily: FONTS.ui, fontSize: 11.5, marginTop: 6, color: pkg.accent }}>
              Save ${((pkg.price.monthly - pkg.price.yearly) * 12).toLocaleString()}/year
            </p>
          )}
        </div>

        <div style={{ height: 1, marginBottom: 22, background: `rgba(${pkg.accentRGB},0.2)` }} />

        {/* Features */}
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1, marginBottom: 28, padding: 0, listStyle: 'none' }}>
          {pkg.features.map(f => (
            <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 11 }}>
              <span style={{ marginTop: 2, flexShrink: 0, width: 16, height: 16, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(${pkg.accentRGB},0.16)` }}>
                <Check size={9} style={{ color: pkg.accent }} strokeWidth={3} />
              </span>
              <span style={{ fontFamily: FONTS.ui, color: 'rgba(245,245,240,0.7)', fontSize: 13.5, lineHeight: 1.45 }}>{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button onClick={handleOrder}
          style={{
            width: '100%', height: 52, borderRadius: 14, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: FONTS.ui, fontSize: 13, fontWeight: 700, letterSpacing: '0.04em',
            border: pkg.popular ? 'none' : `1px solid rgba(${pkg.accentRGB},0.3)`,
            background: pkg.popular ? pkg.accent : `rgba(${pkg.accentRGB},0.12)`,
            color: pkg.popular ? '#030303' : pkg.accent,
            boxShadow: pkg.popular ? `0 0 30px rgba(${pkg.accentRGB},0.3)` : 'none',
            transition: 'background 0.3s ease',
          }}
          onMouseEnter={e => { if (!pkg.popular) e.currentTarget.style.background = `rgba(${pkg.accentRGB},0.22)`; }}
          onMouseLeave={e => { if (!pkg.popular) e.currentTarget.style.background = `rgba(${pkg.accentRGB},0.12)`; }}
        >
          {pkg.price ? 'Order & Get Started' : 'Contact Us'}
          <ArrowRight size={15} />
        </button>
        {pkg.price && (
          <button onClick={handleOrder}
            style={{ width: '100%', marginTop: 8, padding: '10px', borderRadius: 12, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: FONTS.ui, fontSize: 12, color: 'rgba(245,245,240,0.3)', transition: 'color 0.3s ease' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(245,245,240,0.6)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,240,0.3)'}
          >
            or book a free discovery call first
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const navigate = useNavigate();
  const [billing, setBilling] = useState('monthly');
  useEffect(() => { document.title = 'Pricing — AYESMAJ Studios'; window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: COLORS.black, minHeight: '100vh', overflowX: 'hidden', color: COLORS.white }}>
      <AyesmajNav />

      {/* HERO */}
      <section style={{ position: 'relative', padding: '160px clamp(24px,5vw,80px) 60px', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(${GOLD_RGB},0.10) 0%, transparent 70%)` }} />
        <motion.div {...fade(0)}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 18px', borderRadius: 999, marginBottom: 28, fontFamily: FONTS.ui, fontSize: 11, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', background: `rgba(${GOLD_RGB},0.1)`, border: `1px solid rgba(${GOLD_RGB},0.25)`, color: GOLD }}>
            <Sparkles size={12} /> Transparent Pricing
          </div>
        </motion.div>
        <motion.h1 {...fade(0.1)} style={{ fontFamily: FONTS.display, fontSize: 'clamp(40px,7vw,104px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.01em', textTransform: 'uppercase', color: COLORS.white, margin: 0 }}>
          Invest in Your<br />
          <span style={{ background: `linear-gradient(125deg, #FFD36A 0%, ${GOLD} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Brand's Future</span>
        </motion.h1>
        <motion.p {...fade(0.2)} style={{ fontFamily: FONTS.ui, fontSize: 'clamp(15px,1.3vw,18px)', color: COLORS.gray, maxWidth: 560, margin: '24px auto 36px', lineHeight: 1.6 }}>
          AI-powered content, 3D animation, branding, and custom websites — all in one creative package built around your brand.
        </motion.p>
        {/* Billing toggle */}
        <motion.div {...fade(0.25)} style={{ display: 'inline-flex', borderRadius: 16, padding: 5, background: 'rgba(255,255,255,0.05)', border: `1px solid ${COLORS.border}` }}>
          {['monthly', 'yearly'].map(b => (
            <button key={b} onClick={() => setBilling(b)}
              style={{ padding: '11px 24px', borderRadius: 12, border: 'none', cursor: 'pointer', fontFamily: FONTS.ui, fontSize: 13, fontWeight: 700, textTransform: 'capitalize', background: billing === b ? GOLD : 'transparent', color: billing === b ? '#030303' : 'rgba(245,245,240,0.4)', transition: 'all 0.3s ease' }}>
              {b}{b === 'yearly' && <span style={{ marginLeft: 8, fontSize: 10, fontWeight: 800, color: billing === b ? '#030303' : '#B3FF3F' }}>-20%</span>}
            </button>
          ))}
        </motion.div>
      </section>

      {/* CARDS */}
      <section style={{ maxWidth: 1400, margin: '0 auto', padding: '0 clamp(24px,5vw,80px) 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px),1fr))', gap: 18 }}>
          {PACKAGES.map(pkg => <PriceCard key={pkg.id} pkg={pkg} billing={billing} />)}
        </div>
      </section>

      {/* ADD-ONS */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '0 clamp(24px,5vw,80px) 96px' }}>
        <motion.div {...fade()} style={{ textAlign: 'center', marginBottom: 44 }}>
          <p style={{ fontFamily: FONTS.ui, fontSize: 11, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, marginBottom: 12 }}>À la carte</p>
          <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(28px,3.6vw,48px)', fontWeight: 800, textTransform: 'uppercase', color: COLORS.white, margin: 0 }}>Add-Ons & One-Time Services</h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px),1fr))', gap: 14 }}>
          {ADD_ONS.map((item, i) => (
            <motion.div key={item.name} {...fade(i * 0.04)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 22px', borderRadius: 14, background: COLORS.glass, border: `1px solid ${COLORS.border}` }}>
              <span style={{ fontFamily: FONTS.ui, color: 'rgba(245,245,240,0.72)', fontSize: 14 }}>{item.name}</span>
              <span style={{ fontFamily: FONTS.display, color: COLORS.white, fontSize: 18, fontWeight: 800 }}>{item.price}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '0 clamp(24px,5vw,40px) 96px' }}>
        <motion.div {...fade()} style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(26px,3vw,40px)', fontWeight: 800, textTransform: 'uppercase', color: COLORS.white, margin: 0 }}>Common Questions</h2>
        </motion.div>
        {FAQ.map(([q, a], i) => (
          <motion.details key={q} {...fade(i * 0.05)} className="ayes-faq" style={{ borderBottom: `1px solid ${COLORS.border}`, padding: '20px 0', cursor: 'pointer' }}>
            <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: FONTS.ui, color: COLORS.white, fontWeight: 600, fontSize: 15, listStyle: 'none' }}>
              {q}
              <span className="ayes-faq-plus" style={{ color: GOLD, fontSize: 22, lineHeight: 1, transition: 'transform 0.3s ease' }}>+</span>
            </summary>
            <p style={{ marginTop: 12, fontFamily: FONTS.ui, color: COLORS.gray, fontSize: 14.5, lineHeight: 1.6 }}>{a}</p>
          </motion.details>
        ))}
      </section>

      {/* CTA */}
      <section style={{ position: 'relative', padding: 'clamp(80px,11vw,150px) 24px', textAlign: 'center', overflow: 'hidden', borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(${GOLD_RGB},0.09) 0%, transparent 70%)` }} />
        <motion.div {...fade()} style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(34px,5.5vw,76px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.98, color: COLORS.white, margin: '0 0 20px' }}>
            Not Sure Which Plan?<br />
            <span style={{ background: `linear-gradient(125deg, #FFD36A 0%, ${GOLD} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Let's Talk.</span>
          </h2>
          <p style={{ fontFamily: FONTS.ui, color: COLORS.gray, maxWidth: 460, margin: '0 auto 32px', fontSize: 16, lineHeight: 1.6 }}>
            Book a free 20-minute call and we'll recommend exactly what your brand needs.
          </p>
          <button onClick={() => navigate('/Contact')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '0 36px', height: 60, borderRadius: 999, border: 'none', cursor: 'pointer', fontFamily: FONTS.ui, fontSize: 13, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', background: GOLD, color: '#030303', boxShadow: `0 0 40px rgba(${GOLD_RGB},0.3)` }}>
            Book a Free Call <ArrowRight size={16} />
          </button>
        </motion.div>
      </section>

      <AyesmajFooter />

      <style>{`
        .ayes-faq summary::-webkit-details-marker { display: none; }
        .ayes-faq[open] .ayes-faq-plus { transform: rotate(45deg); }
      `}</style>
    </div>
  );
}
