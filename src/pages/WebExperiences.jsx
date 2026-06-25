import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight, ArrowUpRight, Check, Target, Clapperboard, Cpu, Gauge,
  Monitor, MousePointerClick, Box,
} from 'lucide-react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';

// ── Palette (green Website-Design world) ─────────────────────────────────────
const BG = '#030603';
const GREEN = '#B3FF3F';
const GREEN_RGB = '179,255,63';
const GOLD = '#F5C84B';
const GOLD_RGB = '245,200,75';
const WHITE = '#F5F5F0';
const GRAY = '#A9A9A9';
const MUTED = '#6F6F6F';
const BORDER = 'rgba(255,255,255,0.10)';
const GLASS = 'rgba(255,255,255,0.045)';
const DISPLAY = "'Anton', sans-serif";
const UI = "'Space Grotesk', system-ui, sans-serif";
const A = '/assets/ayesmaj/web-experiences';

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

// ── Reusable gold CTA ────────────────────────────────────────────────────────
function GoldButton({ label, onClick, solid = true }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10, height: 58, padding: '0 34px',
        borderRadius: 999, cursor: 'pointer', fontFamily: UI, fontSize: 13, fontWeight: 700,
        letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap',
        border: solid ? '1px solid transparent' : `1px solid ${BORDER}`,
        background: solid ? `linear-gradient(135deg, #F5D76E, #D8B75A)` : 'rgba(255,255,255,0.035)',
        color: solid ? '#050505' : WHITE,
        boxShadow: solid ? `0 18px 60px rgba(${GOLD_RGB},0.22)` : 'none',
        transition: 'transform 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = solid ? `0 22px 70px rgba(${GOLD_RGB},0.34)` : `0 0 28px rgba(255,255,255,0.08)`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = solid ? `0 18px 60px rgba(${GOLD_RGB},0.22)` : 'none'; }}
    >
      {label} <ArrowRight size={15} />
    </button>
  );
}

// ── Diagonal panel showcase — reveals more on hover ──────────────────────────
const PANELS = [
  { id: 'desktop', label: 'Desktop', sub: 'Premium Business Sites', img: `${A}/web-hero-desktop-showcase.jpg`, stat: '+212%', statLabel: 'Conversion Lift' },
  { id: 'dashboard', label: 'Dashboard', sub: 'AI & SaaS Platforms', img: `${A}/web-hero-laptop-dashboard.jpg`, stat: '< 1.2s', statLabel: 'First Paint' },
  { id: 'mobile', label: 'Mobile', sub: 'Pixel-Perfect on Every Screen', img: `${A}/web-hero-mobile-showcase.jpg`, stat: '100/100', statLabel: 'Lighthouse Score' },
];

function HoverShowcase() {
  const [active, setActive] = useState(null);

  // Diagonal clip-path per position
  const clipFor = (i) =>
    i === 0
      ? 'polygon(0 0, 100% 0, calc(100% - 56px) 100%, 0 100%)'
      : i === 2
      ? 'polygon(56px 0, 100% 0, 100% 100%, 0 100%)'
      : 'polygon(56px 0, 100% 0, calc(100% - 56px) 100%, 0 100%)';

  return (
    <div className="we-showcase" style={{ position: 'relative', minHeight: 600, width: '100%' }}>
      {/* radial green glow behind everything */}
      <div style={{ position: 'absolute', inset: '-10% -5%', background: `radial-gradient(ellipse 60% 55% at 50% 50%, rgba(${GREEN_RGB},0.18), transparent 70%)`, pointerEvents: 'none' }} />

      {/* 3 diagonal hover panels */}
      <div style={{ position: 'relative', height: 560, display: 'flex', borderRadius: 22, overflow: 'visible' }}>
        {PANELS.map((p, i) => {
          const isActive = active === i;
          const isDimmed = active !== null && !isActive;
          return (
            <motion.div
              key={p.id}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              animate={{ flexGrow: isActive ? 1.9 : isDimmed ? 0.75 : 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'relative', flexBasis: 0, flexGrow: 1, height: '100%',
                marginLeft: i === 0 ? 0 : -28, cursor: 'pointer', overflow: 'hidden',
                clipPath: clipFor(i), WebkitClipPath: clipFor(i),
              }}
            >
              {/* Background image with subtle zoom on hover */}
              <motion.img
                src={p.img}
                alt={`${p.label} — ${p.sub}`}
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ duration: 1.1, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {/* Dimming + green scrim */}
              <motion.div
                animate={{ opacity: isDimmed ? 0.55 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ position: 'absolute', inset: 0, background: 'rgba(3,6,3,0.85)', pointerEvents: 'none' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(3,6,3,0.92) 0%, rgba(3,6,3,0.15) 50%, rgba(3,6,3,0.55) 100%)` }} />
              {/* Accent glow per panel — intensifies when active */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0.5 }}
                transition={{ duration: 0.5 }}
                style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 50% 75%, rgba(${GREEN_RGB},0.32), transparent 60%)`, pointerEvents: 'none' }}
              />

              {/* Bottom content */}
              <motion.div
                animate={{ y: isActive ? -10 : 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{ position: 'absolute', left: 0, right: 0, bottom: 26, padding: '0 22px', textAlign: 'center', zIndex: 2 }}
              >
                <div style={{ fontFamily: UI, fontSize: 10, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: GREEN, marginBottom: 8 }}>
                  {`0${i + 1}`}
                </div>
                <h3 style={{ fontFamily: DISPLAY, fontSize: isActive ? 28 : 22, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.03em', color: WHITE, margin: '0 0 6px', transition: 'font-size 0.4s' }}>
                  {p.label}
                </h3>
                <p style={{ fontFamily: UI, fontSize: 11.5, letterSpacing: '0.16em', textTransform: 'uppercase', color: GRAY, margin: 0 }}>
                  {p.sub}
                </p>

                {/* Stat row — revealed when active */}
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, height: isActive ? 'auto' : 0, marginTop: isActive ? 14 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '8px 16px', borderRadius: 999, background: `rgba(${GREEN_RGB},0.10)`, border: `1px solid rgba(${GREEN_RGB},0.4)` }}>
                    <span style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 800, color: GREEN }}>{p.stat}</span>
                    <span style={{ fontFamily: UI, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: WHITE }}>{p.statLabel}</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Hint when nothing hovered */}
      <motion.div
        animate={{ opacity: active === null ? [0.3, 0.8, 0.3] : 0 }}
        transition={{ duration: 2.4, repeat: active === null ? Infinity : 0 }}
        style={{ position: 'absolute', bottom: -28, left: 0, right: 0, textAlign: 'center', fontFamily: UI, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: GRAY, pointerEvents: 'none' }}
      >
        ← Hover to reveal →
      </motion.div>
    </div>
  );
}

// ── Capability data ──────────────────────────────────────────────────────────
const CAPS = [
  { icon: Target, title: 'Strategy First', sub: 'Purpose-led websites' },
  { icon: Clapperboard, title: 'Cinematic Design', sub: 'Emotion through visuals' },
  { icon: Cpu, title: 'AI-Powered', sub: 'Smarter digital experiences' },
  { icon: Gauge, title: 'Performance Focused', sub: 'Built for speed & growth' },
];

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate();
  return (
    <section style={{ position: 'relative', minHeight: '100vh', padding: '140px clamp(24px,5vw,80px) 60px', display: 'flex', alignItems: 'center' }}>
      <div className="we-hero-grid" style={{ maxWidth: 1500, margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 64, alignItems: 'center' }}>
        <div>
          <motion.div {...fade(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, border: `1px solid rgba(${GREEN_RGB},0.25)`, background: `rgba(${GREEN_RGB},0.06)`, borderRadius: 999, padding: '10px 18px', marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
            <span style={{ fontFamily: UI, fontSize: 11.5, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: GREEN }}>Cinematic Web Experiences</span>
          </motion.div>

          <motion.h1 {...fade(0.08)} style={{ fontFamily: DISPLAY, fontSize: 'clamp(46px,6.5vw,116px)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '0.005em', textTransform: 'uppercase', color: WHITE, margin: 0 }}>
            Websites That<br />Feel Like<br />
            <span style={{ background: 'linear-gradient(90deg, #F5D76E, #D8B75A, #B88A2A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Cinematic Digital Showrooms
            </span>
          </motion.h1>

          <motion.p {...fade(0.16)} style={{ fontFamily: UI, fontSize: 'clamp(15px,1.3vw,18px)', lineHeight: 1.7, color: 'rgba(245,245,240,0.68)', maxWidth: 620, margin: '26px 0 0' }}>
            We craft premium websites, interactive landing pages, and AI-powered digital experiences for brands that want to stand out — and stay remembered.
          </motion.p>

          <motion.div {...fade(0.24)} style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 34 }}>
            <GoldButton label="Build My Website" onClick={() => navigate('/Contact')} />
            <GoldButton label="See Website Work" solid={false} onClick={() => { const el = document.getElementById('selected-work'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }} />
          </motion.div>

          <motion.div {...fade(0.32)} style={{ display: 'flex', flexWrap: 'wrap', gap: 26, marginTop: 40, paddingTop: 28, borderTop: `1px solid ${BORDER}` }}>
            {CAPS.map(({ icon: Icon, title, sub }) => (
              <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Icon size={17} color={GREEN} />
                <div>
                  <div style={{ fontFamily: UI, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: WHITE }}>{title}</div>
                  <div style={{ fontFamily: UI, fontSize: 10.5, color: MUTED }}>{sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="we-hero-visual">
          <HoverShowcase />
        </motion.div>
      </div>
    </section>
  );
}

// ── SERVICE CARDS ────────────────────────────────────────────────────────────
const SERVICES = [
  { icon: Monitor, title: 'Premium Business Websites', desc: 'Strategic, brand-driven websites that build trust and drive results.' },
  { icon: MousePointerClick, title: 'Interactive Landing Pages', desc: 'High-converting, story-led pages built for maximum impact.' },
  { icon: Box, title: '3D / AI-Enhanced Web Experiences', desc: 'Immersive 3D visuals and AI-powered interfaces that amaze and engage.' },
];

function ServiceCards() {
  return (
    <section style={{ padding: 'clamp(70px,8vw,120px) clamp(24px,5vw,80px)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <motion.h2 {...fade(0)} style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', color: WHITE, margin: '0 0 clamp(40px,5vw,64px)', letterSpacing: '0.01em' }}>
          Websites Built to Make Brands Feel Premium
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px),1fr))', gap: 18 }}>
          {SERVICES.map((s, i) => (
            <motion.div key={s.title} {...fade(i * 0.08)} className="we-glass"
              style={{ borderRadius: 22, padding: 30, background: GLASS, border: `1px solid ${BORDER}`, backdropFilter: 'blur(18px)', transition: 'border-color 0.3s, box-shadow 0.3s' }}>
              <div style={{ width: 46, height: 46, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(${GREEN_RGB},0.08)`, border: `1px solid rgba(${GREEN_RGB},0.25)`, marginBottom: 20 }}>
                <s.icon size={20} color={GREEN} />
              </div>
              <h3 style={{ fontFamily: DISPLAY, fontSize: 22, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', color: WHITE, margin: '0 0 10px' }}>{s.title}</h3>
              <p style={{ fontFamily: UI, fontSize: 14.5, lineHeight: 1.6, color: GRAY, margin: 0 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── SELECTED WORK ────────────────────────────────────────────────────────────
const FILTERS = ['All', 'Business', 'E-Commerce', 'AI', 'Landing Pages'];
const PROJECTS = [
  { id: 'luxeline', title: 'LUXELINE INTERIORS', type: 'Luxury Interior Design Studio', cat: 'Business', img: `${A}/project-luxeline.jpg` },
  { id: 'nexora', title: 'NEXORA AI', type: 'AI Analytics Platform', cat: 'AI', img: `${A}/project-nexora.jpg` },
  { id: 'natura', title: 'NATURA SKINCARE', type: 'Clean Beauty E-commerce', cat: 'E-Commerce', img: `${A}/project-natura.jpg` },
];

function SelectedWork() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const items = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.cat === filter);
  return (
    <section id="selected-work" style={{ padding: 'clamp(70px,8vw,120px) clamp(24px,5vw,80px)', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <motion.p {...fade(0)} style={{ fontFamily: UI, fontSize: 12, fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: GREEN, textAlign: 'center', marginBottom: 16 }}>Selected Website Work</motion.p>
        <motion.h2 {...fade(0.05)} style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', color: WHITE, margin: '0 0 36px', letterSpacing: '0.01em' }}>
          Websites Built to Make People Stop
        </motion.h2>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 44 }}>
          {FILTERS.map((f) => {
            const active = filter === f;
            return (
              <button key={f} onClick={() => setFilter(f)}
                style={{ fontFamily: UI, fontSize: 10.5, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '9px 18px', borderRadius: 999, cursor: 'pointer',
                  background: active ? `rgba(${GREEN_RGB},0.16)` : 'transparent', border: `1px solid ${active ? `rgba(${GREEN_RGB},0.5)` : BORDER}`, color: active ? GREEN : GRAY, transition: 'all 0.3s' }}>
                {f}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,330px),1fr))', gap: 18 }}>
          {items.map((p, i) => (
            <motion.div key={p.id} {...fade(i * 0.08)} onClick={() => navigate('/Contact')} className="we-work"
              style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', border: `1px solid ${BORDER}`, background: GLASS, height: 280, transition: 'border-color 0.3s, box-shadow 0.3s' }}>
              <img src={p.img} alt={`${p.title} website`} loading="lazy" className="we-work-img"
                onError={(e) => { e.currentTarget.style.opacity = 0; }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,6,3,0.95) 0%, rgba(3,6,3,0.1) 60%, transparent 100%)' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 22, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, zIndex: 2 }}>
                <div>
                  <h3 style={{ fontFamily: DISPLAY, fontSize: 23, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', color: WHITE, margin: '0 0 4px' }}>{p.title}</h3>
                  <p style={{ fontFamily: UI, fontSize: 12.5, color: GREEN, margin: 0, letterSpacing: '0.04em' }}>{p.type}</p>
                </div>
                <span style={{ flexShrink: 0, width: 38, height: 38, borderRadius: '50%', border: `1px solid rgba(${GREEN_RGB},0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: GREEN }}>
                  <ArrowUpRight size={16} />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROCESS ──────────────────────────────────────────────────────────────────
const STEPS = [
  { n: '01', title: 'Brand Direction', desc: 'We define the message, offer, audience, and visual position.' },
  { n: '02', title: 'Visual World', desc: 'We create the cinematic style, color language, typography, and page mood.' },
  { n: '03', title: 'Website Structure', desc: 'We build the flow: hero, services, proof, conversion, and story.' },
  { n: '04', title: 'AI / 3D Assets', desc: 'We generate premium visuals, interface graphics, videos, or 3D elements.' },
  { n: '05', title: 'Launch Polish', desc: 'We refine speed, mobile, SEO basics, animation, and final experience.' },
];

function Process() {
  return (
    <section style={{ padding: 'clamp(70px,8vw,120px) clamp(24px,5vw,80px)', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <motion.h2 {...fade(0)} style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px,4vw,56px)', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', color: WHITE, margin: '0 0 14px', letterSpacing: '0.01em' }}>
          From Website to Brand World
        </motion.h2>
        <motion.p {...fade(0.05)} style={{ fontFamily: UI, fontSize: 16, lineHeight: 1.65, color: GRAY, textAlign: 'center', maxWidth: 640, margin: '0 auto clamp(48px,6vw,72px)' }}>
          A premium website is not just pages. It is strategy, perception, visuals, trust, and conversion working together.
        </motion.p>
        <div className="we-process" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16, position: 'relative' }}>
          <div className="we-process-line" style={{ position: 'absolute', top: 27, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg, transparent, rgba(${GREEN_RGB},0.5), transparent)` }} />
          {STEPS.map((s, i) => (
            <motion.div key={s.n} {...fade(i * 0.08)} style={{ position: 'relative', textAlign: 'center' }}>
              <div style={{ width: 54, height: 54, margin: '0 auto 18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: DISPLAY, fontSize: 19, fontWeight: 800, color: GREEN, background: BG, border: `1px solid rgba(${GREEN_RGB},0.4)`, boxShadow: `0 0 24px rgba(${GREEN_RGB},0.14)`, position: 'relative', zIndex: 2 }}>{s.n}</div>
              <h3 style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', color: WHITE, margin: '0 0 8px' }}>{s.title}</h3>
              <p style={{ fontFamily: UI, fontSize: 13.5, lineHeight: 1.55, color: GRAY, margin: 0 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── BEFORE / AFTER ───────────────────────────────────────────────────────────
function BeforeAfter() {
  const before = ['Generic template', 'Weak visual identity', 'No clear offer', 'Low trust', 'Looks small'];
  const after = ['Cinematic brand world', 'Premium layout', 'Clear conversion flow', 'Strong trust', 'Higher perceived value'];
  return (
    <section style={{ padding: 'clamp(70px,8vw,120px) clamp(24px,5vw,80px)', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.h2 {...fade(0)} style={{ fontFamily: DISPLAY, fontSize: 'clamp(26px,3.6vw,52px)', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', color: WHITE, margin: '0 0 clamp(40px,5vw,60px)', letterSpacing: '0.01em' }}>
          Your Website Is Either Building Trust or Killing It
        </motion.h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px),1fr))', gap: 18 }}>
          <motion.div {...fade(0.05)} style={{ borderRadius: 20, padding: 'clamp(28px,3vw,40px)', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
              <span style={{ fontFamily: UI, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,95,87,0.75)' }}>Before</span>
            </div>
            {before.map((b, i) => (
              <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none', fontFamily: UI, fontSize: 15, color: 'rgba(245,245,240,0.5)' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,95,87,0.45)', flexShrink: 0 }} />{b}
              </div>
            ))}
          </motion.div>
          <motion.div {...fade(0.13)} style={{ position: 'relative', borderRadius: 20, padding: 'clamp(28px,3vw,40px)', background: `rgba(${GREEN_RGB},0.04)`, border: `1px solid rgba(${GREEN_RGB},0.28)`, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: `linear-gradient(90deg, transparent, rgba(${GREEN_RGB},0.6), transparent)` }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: GREEN, boxShadow: `0 0 10px ${GREEN}` }} />
              <span style={{ fontFamily: UI, fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: GREEN }}>After AYESMAJ</span>
            </div>
            {after.map((a, i) => (
              <div key={a} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none', fontFamily: UI, fontSize: 15, color: 'rgba(245,245,240,0.78)' }}>
                <Check size={14} color={GREEN} strokeWidth={2.5} style={{ flexShrink: 0 }} />{a}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.p {...fade(0.1)} style={{ fontFamily: DISPLAY, fontSize: 'clamp(22px,2.8vw,40px)', fontWeight: 800, textTransform: 'uppercase', textAlign: 'center', color: WHITE, margin: 'clamp(48px,6vw,72px) auto 0', maxWidth: 800, lineHeight: 1.1, letterSpacing: '0.01em' }}>
          "If your brand looks basic,<br />people expect <span style={{ color: GOLD }}>basic prices.</span>"
        </motion.p>
      </div>
    </section>
  );
}

// ── FINAL CTA ────────────────────────────────────────────────────────────────
function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section style={{ position: 'relative', padding: 'clamp(80px,11vw,160px) 24px', textAlign: 'center', overflow: 'hidden', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(${GREEN_RGB},0.10), transparent 65%)` }} />
      <motion.div {...fade(0)} style={{ position: 'relative', zIndex: 2 }}>
        <h2 style={{ fontFamily: DISPLAY, fontSize: 'clamp(34px,5.5vw,80px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.98, color: WHITE, margin: '0 0 22px', letterSpacing: '0.005em' }}>
          Let's Build the Website<br />People Remember
        </h2>
        <p style={{ fontFamily: UI, fontSize: 17, color: GRAY, maxWidth: 540, margin: '0 auto 36px', lineHeight: 1.6 }}>
          Send us your current website, product, or idea. We'll turn it into a premium digital experience.
        </p>
        <GoldButton label="Start a Website Project" onClick={() => navigate('/Contact')} />
      </motion.div>
    </section>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────
export default function WebExperiences() {
  useEffect(() => {
    document.title = 'Web Experiences | AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: BG, minHeight: '100vh', overflowX: 'clip', position: 'relative' }}>
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `radial-gradient(circle at 18% 18%, rgba(${GREEN_RGB},0.10), transparent 45%), radial-gradient(circle at 82% 12%, rgba(${GOLD_RGB},0.07), transparent 45%), linear-gradient(180deg, #020302, #050805)` }} />
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.14,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent 80%)',
        maskImage: 'radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent 80%)' }} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <AyesmajNav />
        <main>
          <Hero />
          <ServiceCards />
          <SelectedWork />
          <Process />
          <BeforeAfter />
          <FinalCTA />
        </main>
        <AyesmajFooter />
      </div>

      <style>{`
        .we-glass:hover { border-color: rgba(${GREEN_RGB},0.45) !important; box-shadow: 0 0 40px rgba(${GREEN_RGB},0.15) !important; }
        .we-work:hover { border-color: rgba(${GREEN_RGB},0.45) !important; box-shadow: 0 0 40px rgba(${GREEN_RGB},0.15) !important; }
        .we-work:hover .we-work-img { transform: scale(1.05); }
        @media (max-width: 1000px) {
          .we-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .we-hero-visual { order: 2; }
          .we-showcase { min-height: 460px !important; }
          .we-process { grid-template-columns: 1fr !important; gap: 28px !important; text-align: left !important; }
          .we-process-line { display: none !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .we-showcase * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
