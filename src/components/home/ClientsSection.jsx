import React from 'react';
import { motion } from 'framer-motion';
import { InfiniteSlider } from '@/components/ui/infinite-slider';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

// SVG Logo components — monochrome, styled in gold
const LogoAurelia  = () => <svg viewBox="0 0 100 40" className="w-full h-full"><text x="50" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">AURELIA</text></svg>;
const LogoSolaris  = () => <svg viewBox="0 0 100 40" className="w-full h-full"><text x="50" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">SOLARIS</text></svg>;
const LogoEmber    = () => <svg viewBox="0 0 100 40" className="w-full h-full"><text x="50" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">EMBER</text></svg>;
const LogoVanta    = () => <svg viewBox="0 0 100 40" className="w-full h-full"><text x="50" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">VANTA</text></svg>;
const LogoMeridian = () => <svg viewBox="0 0 120 40" className="w-full h-full"><text x="60" y="28" textAnchor="middle" fontSize="16" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">MERIDIAN</text></svg>;
const LogoApex     = () => <svg viewBox="0 0 100 40" className="w-full h-full"><text x="50" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">APEX</text></svg>;
const LogoNova     = () => <svg viewBox="0 0 100 40" className="w-full h-full"><text x="50" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">NOVA</text></svg>;
const LogoCrest    = () => <svg viewBox="0 0 100 40" className="w-full h-full"><text x="50" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">CREST</text></svg>;
const LogoLumis    = () => <svg viewBox="0 0 100 40" className="w-full h-full"><text x="50" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">LUMIS</text></svg>;
const LogoDrift    = () => <svg viewBox="0 0 100 40" className="w-full h-full"><text x="50" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">DRIFT</text></svg>;
const LogoOrbit    = () => <svg viewBox="0 0 100 40" className="w-full h-full"><text x="50" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">ORBIT</text></svg>;
const LogoZenith   = () => <svg viewBox="0 0 100 40" className="w-full h-full"><text x="50" y="28" textAnchor="middle" fontSize="18" fontWeight="800" fill="currentColor" fontFamily="DM Sans,sans-serif" letterSpacing="3">ZENITH</text></svg>;

const CLIENTS = [
  { name: 'Aurelia Beauty',   logo: LogoAurelia  },
  { name: 'Solaris Tech',     logo: LogoSolaris  },
  { name: 'Ember Group',      logo: LogoEmber    },
  { name: 'Vanta Foods',      logo: LogoVanta    },
  { name: 'Meridian Co.',     logo: LogoMeridian },
  { name: 'Apex Sports',      logo: LogoApex     },
  { name: 'Nova Labs',        logo: LogoNova     },
  { name: 'Crest Real Estate',logo: LogoCrest    },
  { name: 'Lumis Capital',    logo: LogoLumis    },
  { name: 'Drift Studios',    logo: LogoDrift    },
  { name: 'Orbit Media',      logo: LogoOrbit    },
  { name: 'Zenith Brands',    logo: LogoZenith   },
];

// Divider dot between logos
const Dot = () => (
  <span style={{ color: 'rgba(200,164,78,0.3)', fontSize: 20, lineHeight: 1, userSelect: 'none' }}>✦</span>
);

export default function ClientsSection() {
  return (
    <section
      id="clients"
      className="relative py-28 overflow-hidden"
      style={{ background: 'transparent' }}
    >
      {/* top rule */}
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,78,0.12), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* heading */}
        <motion.div {...fade(0)} className="text-center mb-14">
          <p className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: '#C8A44E', fontFamily: 'DM Sans, sans-serif' }}>
            Trusted By
          </p>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tight"
            style={{ color: '#F2EDE4', fontFamily: 'DM Sans, sans-serif' }}
          >
            Our Clients
          </h2>
          <p className="mt-3 text-sm tracking-wide" style={{ color: 'rgba(242,237,228,0.45)', fontFamily: 'DM Sans, sans-serif' }}>
            Brands that trust AYESMAJ to tell their story.
          </p>
        </motion.div>
      </div>

      {/* ── Row 1: left → right ── */}
      <motion.div {...fade(0.1)} className="relative mb-5">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
          style={{ background: 'linear-gradient(to right, #07100A, transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
          style={{ background: 'linear-gradient(to left, #07100A, transparent)' }} />

        <InfiniteSlider gap={48} duration={35} durationOnHover={70}>
          {CLIENTS.map((c) => (
            <LogoItem key={c.name} client={c} />
          ))}
        </InfiniteSlider>
      </motion.div>

      {/* ── Row 2: right → left ── */}
      <motion.div {...fade(0.15)} className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
          style={{ background: 'linear-gradient(to right, #07100A, transparent)' }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
          style={{ background: 'linear-gradient(to left, #07100A, transparent)' }} />

        <InfiniteSlider gap={48} duration={28} durationOnHover={70} reverse>
          {[...CLIENTS].reverse().map((c) => (
            <LogoItem key={c.name} client={c} />
          ))}
        </InfiniteSlider>
      </motion.div>

      {/* bottom rule */}
      <div className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,78,0.08), transparent)' }} />
    </section>
  );
}

function LogoItem({ client }) {
  const Logo = client.logo;
  return (
    <div
      className="flex items-center gap-8 flex-shrink-0"
      style={{ color: 'rgba(200,164,78,0.55)' }}
    >
      {/* logo pill */}
      <div
        className="flex items-center justify-center px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 cursor-default"
        style={{
          border: '1px solid rgba(200,164,78,0.15)',
          background: 'rgba(200,164,78,0.04)',
          minWidth: 140,
          height: 44,
          color: 'rgba(200,164,78,0.55)',
          transition: 'color 0.3s, border-color 0.3s, background 0.3s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#C8A44E';
          e.currentTarget.style.borderColor = 'rgba(200,164,78,0.45)';
          e.currentTarget.style.background = 'rgba(200,164,78,0.08)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'rgba(200,164,78,0.55)';
          e.currentTarget.style.borderColor = 'rgba(200,164,78,0.15)';
          e.currentTarget.style.background = 'rgba(200,164,78,0.04)';
        }}
      >
        <div style={{ width: 110, height: 28 }}>
          <Logo />
        </div>
      </div>
      {/* separator dot */}
      <span style={{ color: 'rgba(200,164,78,0.2)', fontSize: 18, flexShrink: 0 }}>✦</span>
    </div>
  );
}
