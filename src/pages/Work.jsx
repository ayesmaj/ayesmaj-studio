import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import AyesmajBackground from '@/components/ayesmaj/AyesmajBackground';
import SectionHeader from '@/components/ayesmaj/SectionHeader';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import { FONTS } from '@/components/ayesmaj/theme';
import { BRANDS } from '@/data/brands';

const ACCENT = '#FFB000';

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

// Filter pills → regex matched against each brand's category + tags.
// `websites` has no match in the current data → grid shows the empty state gracefully.
const FILTERS = [
  { label: 'ALL', test: null },
  { label: 'WEBSITES', test: /website|web design|landing/i },
  { label: 'AI CONTENT', test: /\bai\b/i },
  { label: '3D', test: /cgi|3d|render|character/i },
  { label: 'BRANDING', test: /brand|identity|logo/i },
  { label: 'MOTION', test: /film|motion|commercial/i },
];

const matchesFilter = (brand, test) =>
  !test || test.test([brand.category, ...(brand.tags || [])].join(' '));

// ── Single cinematic portfolio card ───────────────────────────────────────────
function WorkCard({ brand, index }) {
  const navigate = useNavigate();
  const src = `/brands/${brand.id}/${brand.featured}`;

  return (
    <motion.button
      layout
      type="button"
      onClick={() => navigate(`/BrandDetail?slug=${brand.id}`)}
      initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.96, filter: 'blur(6px)' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      style={{
        position: 'relative',
        display: 'block',
        textAlign: 'left',
        width: '100%',
        aspectRatio: '4 / 3',
        borderRadius: 24,
        overflow: 'hidden',
        border: `1px solid ${brand.accent}1F`,
        background: '#0B0B0B',
        cursor: 'pointer',
        padding: 0,
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${brand.accent}55`;
        e.currentTarget.style.boxShadow = `0 0 55px ${brand.accent}1A`;
        e.currentTarget.style.transform = 'translateY(-6px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${brand.accent}1F`;
        e.currentTarget.style.boxShadow = '';
        e.currentTarget.style.transform = '';
      }}
    >
      {/* Image */}
      <img
        src={src}
        alt={brand.name}
        loading="lazy"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)',
        }}
        className="group-hover:scale-105"
      />

      {/* Dark gradient for legible text */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(7,7,7,0.95) 0%, rgba(7,7,7,0.45) 38%, transparent 70%)',
        }}
      />

      {/* Arrow */}
      <div
        className="opacity-0 group-hover:opacity-100"
        style={{
          position: 'absolute',
          top: 18,
          right: 18,
          width: 40,
          height: 40,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: brand.accent,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        <ArrowUpRight size={18} color="#030303" />
      </div>

      {/* Copy */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '26px 26px 28px' }}>
        <p
          style={{
            fontFamily: FONTS.ui,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: brand.accent,
            margin: 0,
          }}
        >
          {brand.category}
        </p>
        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: 'clamp(22px, 2.4vw, 30px)',
            fontWeight: 800,
            lineHeight: 0.98,
            letterSpacing: '0.01em',
            textTransform: 'uppercase',
            color: '#F5F5F0',
            margin: '10px 0 0',
          }}
        >
          {brand.name}
        </h3>
        <p style={{ fontFamily: FONTS.ui, fontSize: 14, color: '#A9A9A9', margin: '4px 0 0' }}>
          {brand.subtitle}
        </p>
      </div>
    </motion.button>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Work() {
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    document.title = 'Work | AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  const active = FILTERS.find((f) => f.label === filter) || FILTERS[0];
  const filtered = useMemo(
    () => BRANDS.filter((b) => matchesFilter(b, active.test)),
    [active]
  );

  return (
    <div style={{ background: '#020302', minHeight: '100vh', overflowX: 'clip', position: 'relative' }}>
      <AyesmajBackground accent="255,176,0" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <AyesmajNav />

        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(120px,14vw,180px) 24px clamp(48px,6vw,72px)' }}>
            <motion.div {...fade(0)}>
              <SectionHeader
                as="h1"
                eyebrow="Selected Work"
                title="Digital Worlds Built to Be Remembered"
                subtitle="Brand films, identity systems, CGI and campaigns — a curated cut of the work, from first concept to final frame."
                accent={ACCENT}
                align="center"
                max={880}
              />
            </motion.div>
          </section>

          {/* ── Filter pills ─────────────────────────────────────────────── */}
          <section style={{ maxWidth: 1320, margin: '0 auto', padding: '0 24px clamp(36px,4vw,56px)' }}>
            <motion.div
              {...fade(0.1)}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}
            >
              {FILTERS.map((f) => {
                const on = f.label === filter;
                return (
                  <button
                    key={f.label}
                    onClick={() => setFilter(f.label)}
                    style={{
                      fontFamily: FONTS.ui,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      padding: '9px 18px',
                      borderRadius: 999,
                      cursor: 'pointer',
                      background: on ? 'rgba(255,176,0,0.16)' : 'rgba(255,255,255,0.045)',
                      border: on ? '1px solid rgba(255,176,0,0.5)' : '1px solid rgba(255,255,255,0.09)',
                      color: on ? ACCENT : '#A9A9A9',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    {f.label}
                  </button>
                );
              })}
            </motion.div>
          </section>

          {/* ── Grid ─────────────────────────────────────────────────────── */}
          <section style={{ maxWidth: 1500, margin: '0 auto', padding: '0 24px clamp(72px,10vw,128px)' }}>
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  textAlign: 'center',
                  padding: 'clamp(80px,12vw,160px) 0',
                  fontFamily: FONTS.ui,
                  fontSize: 13,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: '#6F6F6F',
                }}
              >
                No projects in this category yet
              </motion.div>
            ) : (
              <motion.div
                layout
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,360px),1fr))',
                  gap: 24,
                }}
              >
                <AnimatePresence>
                  {filtered.map((brand, i) => (
                    <WorkCard key={brand.id} brand={brand} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </section>

          {/* ── Final CTA ────────────────────────────────────────────────── */}
          <section style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(64px,8vw,120px) 24px clamp(96px,12vw,160px)', textAlign: 'center' }}>
            <motion.div {...fade(0)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30 }}>
              <SectionHeader
                eyebrow="Work With Us"
                title={<>Let's Build Something<br />Worth Remembering</>}
                subtitle="Got a brand, a film, or a world in your head? Tell us about it."
                accent={ACCENT}
                align="center"
                max={760}
              />
              <CinematicButton
                label="Start Your Project"
                accent={ACCENT}
                variant="solid"
                size="lg"
                onClick={() => (window.location.href = '/Contact')}
              />
            </motion.div>
          </section>
        </main>

        <AyesmajFooter />
      </div>
    </div>
  );
}
