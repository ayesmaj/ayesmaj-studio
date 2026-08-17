import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import { FONTS } from '@/components/ayesmaj/theme';

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

// Upcoming editorial categories — intentionally non-functional until essays exist.
const CATEGORIES = ['Brand Strategy', 'Website Design', 'AI Content', '3D & CGI', 'Creative Direction'];

export default function Insights() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Insights | AYESMAJ Studios';
    window.scrollTo(0, 0);
    // Placeholder content — keep out of search indexes until real essays ship.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <div style={{ background: '#050505', color: WHITE, fontFamily: FONTS.ui, overflowX: 'hidden' }}>
      <AyesmajNav />

      {/* ── Editorial hero (dark) ───────────────────────────────────────── */}
      <section style={{ position: 'relative', padding: 'clamp(140px, 20vh, 220px) 24px 80px', textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(122,72,255,0.10), transparent 70%)', pointerEvents: 'none' }} />
        <motion.p {...fade(0)} style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, marginBottom: 22 }}>
          Insights
        </motion.p>
        <motion.h1 {...fade(0.1)} style={{
          fontFamily: FONTS.display, textTransform: 'uppercase', fontWeight: 800,
          fontSize: 'clamp(38px, 6.5vw, 96px)', lineHeight: 1.02, letterSpacing: '0.005em',
          maxWidth: 980, margin: '0 auto',
        }}>
          Thinking behind{' '}
          <span style={{ background: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>the worlds</span>
        </motion.h1>
        <motion.p {...fade(0.2)} style={{ maxWidth: 620, margin: '26px auto 0', fontSize: 'clamp(15px, 1.3vw, 18px)', lineHeight: 1.65, color: GRAY }}>
          Essays on brand, design, AI production and world-building — written from the studio floor, not the sidelines.
        </motion.p>
      </section>

      {/* ── Category pills (upcoming) ───────────────────────────────────── */}
      <section aria-label="Upcoming categories" style={{ padding: '0 24px 70px' }}>
        <motion.div {...fade(0.1)} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 820, margin: '0 auto' }}>
          {CATEGORIES.map((c) => (
            <span
              key={c}
              aria-disabled="true"
              title="Coming soon"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px',
                borderRadius: 999, border: `1px solid ${BORDER}`, background: GLASS,
                fontSize: 12, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: MUTED, cursor: 'default', userSelect: 'none',
              }}
            >
              {c}
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: GOLD, opacity: 0.8 }}>SOON</span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── Empty state ─────────────────────────────────────────────────── */}
      <section style={{ padding: '0 24px 140px' }}>
        <motion.div {...fade(0.15)} style={{
          maxWidth: 720, margin: '0 auto', textAlign: 'center',
          background: GLASS, border: `1px solid ${BORDER}`, borderRadius: 24,
          backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
          padding: 'clamp(48px, 7vw, 80px) clamp(24px, 5vw, 64px)',
          position: 'relative', overflow: 'hidden',
        }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: GRADIENT }} />
          <PenLine size={28} color={GOLD} aria-hidden="true" />
          <h2 style={{
            fontFamily: FONTS.display, textTransform: 'uppercase', fontWeight: 800,
            fontSize: 'clamp(26px, 3.4vw, 44px)', lineHeight: 1.05, color: WHITE, margin: '22px 0 16px',
          }}>
            First essays are in production.
          </h2>
          <p style={{ fontSize: 15.5, lineHeight: 1.7, color: MUTED, maxWidth: 480, margin: '0 auto 36px' }}>
            We publish when there is something worth saying — no filler, no recycled takes.
            In the meantime, the fastest way to get our thinking is to talk to us directly.
          </p>
          <CinematicButton label="Talk to the Studio" accent={GOLD} onClick={() => navigate('/Contact')} />
        </motion.div>
      </section>

      <AyesmajFooter />
    </div>
  );
}
