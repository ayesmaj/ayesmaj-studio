import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Compass, PenTool, Package, BookOpen, Clapperboard, Rocket, ArrowUpRight,
} from 'lucide-react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import SectionHeader from '@/components/ayesmaj/SectionHeader';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import { FONTS } from '@/components/ayesmaj/theme';
import { BRANDS, BRAND_NAV_GROUPS, getBrandAssetPath } from '@/data/brands';

// ── Palette ──────────────────────────────────────────────────────────────────
const GOLD = '#D8B75A';
const WHITE = '#F6F3ED';
const GRAY = '#D7D1C8';
const MUTED = '#AAA39A';
const BORDER = 'rgba(255,255,255,0.09)';
const GLASS = 'rgba(255,255,255,0.035)';
const GRADIENT = 'linear-gradient(90deg,#D8B75A 0%,#C88B58 30%,#A45FDB 70%,#7A48FF 100%)';

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

// ── Content ──────────────────────────────────────────────────────────────────
const DELIVERABLES = [
  { icon: Compass, title: 'Positioning & Strategy', line: 'Who you are, who it is for, and why it wins — decided before anything is drawn.' },
  { icon: PenTool, title: 'Logo & Identity System', line: 'A mark plus the full visual language: type, color, layout logic, iconography.' },
  { icon: Package, title: 'Packaging & Labels', line: 'Shelf-ready packaging systems that carry the identity into the physical world.' },
  { icon: BookOpen, title: 'Brand Guidelines', line: 'A working rulebook so every future asset stays unmistakably on-brand.' },
  { icon: Clapperboard, title: 'Campaign Art Direction', line: 'Imagery, film and content direction that extend the identity into culture.' },
  { icon: Rocket, title: 'Launch System', line: 'Everything sequenced for day one — site, socials, decks, collateral.' },
];

const IDENTITY_IDS = BRAND_NAV_GROUPS.find((group) => group.label === 'Branding & Identity')?.brands || [];

const PROCESS = [
  { n: '01', label: 'Discover', line: 'Research, market and voice.' },
  { n: '02', label: 'Direction', line: 'Positioning and creative territory.' },
  { n: '03', label: 'Design', line: 'Mark, type, color, imagery.' },
  { n: '04', label: 'Systems', line: 'Packaging, guidelines, templates.' },
  { n: '05', label: 'Launch', line: 'Rollout across every touchpoint.' },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function ServiceBranding() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Brand Strategy & Identity | AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  const identityWork = IDENTITY_IDS
    .map((id) => BRANDS.find((b) => b.id === id))
    .filter(Boolean);

  return (
    <div style={{ background: '#050505', color: WHITE, fontFamily: FONTS.ui, overflowX: 'hidden' }}>
      <style>{`
        .sb-focus:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; border-radius: 24px; }
      `}</style>
      <AyesmajNav />

      {/* ── Hero (dark) ─────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: 'clamp(140px, 20vh, 220px) 24px 110px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(216,183,90,0.10), transparent 70%)', pointerEvents: 'none' }} />
        <motion.p {...fade(0)} style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, marginBottom: 22 }}>
          Brand Strategy &amp; Identity
        </motion.p>
        <motion.h1 {...fade(0.1)} style={{
          fontFamily: FONTS.display, textTransform: 'uppercase', fontWeight: 800,
          fontSize: 'clamp(38px, 6.5vw, 96px)', lineHeight: 1.02, letterSpacing: '0.005em',
          maxWidth: 1000, margin: '0 auto',
        }}>
          A brand should feel{' '}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>bigger</span>{' '}
          than a logo.
        </motion.h1>
        <motion.p {...fade(0.2)} style={{ maxWidth: 640, margin: '26px auto 0', fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: 1.65, color: GRAY }}>
          Positioning, identity systems, packaging and launch — built as one connected world, not a folder of assets.
        </motion.p>
        <motion.div {...fade(0.3)} style={{ marginTop: 40 }}>
          <CinematicButton label="Start Your Brand" accent={GOLD} size="lg" onClick={() => navigate('/Contact')} />
        </motion.div>
      </section>

      {/* ── What we deliver ─────────────────────────────────────────────── */}
      <section style={{ padding: '90px 24px 110px', background: '#0B0D0C' }}>
        <SectionHeader eyebrow="What we deliver" title="One identity, every touchpoint" accent={GOLD} />
        <div style={{
          maxWidth: 1180, margin: '64px auto 0', display: 'grid', gap: 20,
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        }}>
          {DELIVERABLES.map((d, i) => (
            <motion.div key={d.title} {...fade(i * 0.06)} style={{
              background: GLASS, border: `1px solid ${BORDER}`, borderRadius: 24,
              backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', padding: '32px 28px',
            }}>
              <d.icon size={26} color={GOLD} aria-hidden="true" />
              <h3 style={{ fontFamily: FONTS.ui, fontSize: 18, fontWeight: 700, margin: '18px 0 10px', color: WHITE }}>{d.title}</h3>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: MUTED, margin: 0 }}>{d.line}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Selected identity work ──────────────────────────────────────── */}
      <section style={{ padding: '100px 24px 110px' }}>
        <SectionHeader eyebrow="Selected identity work" title="Brands we built from zero" accent={GOLD} />
        <div style={{
          maxWidth: 1180, margin: '64px auto 0', display: 'grid', gap: 22,
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
        }}>
          {identityWork.map((b, i) => (
            <motion.div key={b.id} {...fade(i * 0.07)}>
              <Link
                to={`/BrandDetail?slug=${b.id}`}
                className="sb-focus group"
                style={{
                  display: 'block', position: 'relative', borderRadius: 24, overflow: 'hidden',
                  border: `1px solid ${BORDER}`, background: '#121512', textDecoration: 'none',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${b.accent}55`; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BORDER; }}
              >
                <div style={{ aspectRatio: '4 / 5', overflow: 'hidden' }}>
                  <img
                    src={`/generated/projects/${b.id}/cover.png`}
                    alt={`${b.name} — ${b.category}`}
                    loading="lazy"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.fb) { e.currentTarget.dataset.fb = 1; e.currentTarget.src = getBrandAssetPath(b, b.featured); }
                      else e.currentTarget.style.display = 'none';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }}
                  />
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 45%)' }} />
                <div style={{ position: 'absolute', left: 22, right: 22, bottom: 20 }}>
                  <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: b.accent, margin: '0 0 8px' }}>
                    {b.category}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <h3 style={{ fontFamily: FONTS.display, textTransform: 'uppercase', fontSize: 22, fontWeight: 800, color: WHITE, margin: 0 }}>
                      {b.name}
                    </h3>
                    <ArrowUpRight size={18} color={WHITE} aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Process strip ───────────────────────────────────────────────── */}
      <section style={{ padding: '90px 24px 110px', background: '#0B0D0C' }}>
        <SectionHeader eyebrow="Process" title="Five moves. One world." accent={GOLD} />
        <div style={{ maxWidth: 1180, margin: '64px auto 0', position: 'relative' }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: GRADIENT, opacity: 0.6 }} />
          <div style={{
            display: 'grid', gap: 28, paddingTop: 40,
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          }}>
            {PROCESS.map((p, i) => (
              <motion.div key={p.n} {...fade(i * 0.08)}>
                <p style={{ fontFamily: FONTS.display, fontSize: 34, fontWeight: 800, color: GOLD, margin: 0 }}>{p.n}</p>
                <h3 style={{ fontSize: 16, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: WHITE, margin: '12px 0 8px' }}>{p.label}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: MUTED, margin: 0 }}>{p.line}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA (bright ivory) ────────────────────────────────────── */}
      <section style={{ background: '#F7F3ED', color: '#111', padding: '110px 24px', textAlign: 'center' }}>
        <motion.p {...fade(0)} style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#70665A', marginBottom: 20 }}>
          Ready when you are
        </motion.p>
        <motion.h2 {...fade(0.1)} style={{
          fontFamily: FONTS.display, textTransform: 'uppercase', fontWeight: 800,
          fontSize: 'clamp(32px, 5vw, 72px)', lineHeight: 1.03, color: '#111', maxWidth: 860, margin: '0 auto',
        }}>
          Let&rsquo;s build a brand worth remembering.
        </motion.h2>
        <motion.div {...fade(0.2)} style={{ marginTop: 38 }}>
          <Link
            to="/Contact"
            className="sb-focus"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 12, height: 58, padding: '0 38px',
              borderRadius: 999, background: '#111', color: '#F7F3ED', textDecoration: 'none',
              fontFamily: FONTS.ui, fontSize: 13, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 18px 50px rgba(0,0,0,0.25)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
          >
            Start the Conversation <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>
      </section>

      <AyesmajFooter />
    </div>
  );
}
