import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import { FONTS } from '@/components/ayesmaj/theme';
import { SITE, PROOF_BADGES } from '@/data/siteConfig';
import { AI_POSTS } from '@/data/media';
import { getBrand, getBrandAssetPath } from '@/data/brands';

const GOLD = '#D8B75A';
const GRAD = 'linear-gradient(90deg,#D8B75A 0%,#C88B58 30%,#A45FDB 70%,#7A48FF 100%)';

const gradText = {
  backgroundImage: GRAD,
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  color: 'transparent',
};

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const section = { maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' };

const eyebrowStyle = (color = GOLD) => ({
  fontFamily: FONTS.ui,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: '0.4em',
  textTransform: 'uppercase',
  color,
  margin: 0,
});

/* Premium cover with fallback to the original brand asset. */
function BrandCover({ id, alt, radius = 0 }) {
  const brand = getBrand(id);
  if (!brand) return null;
  return (
    <img
      src={`/generated/projects/${id}/cover.webp`}
      alt={alt || `${brand.name} — ${brand.category}`}
      loading="lazy"
      onError={(e) => {
        if (e.currentTarget.dataset.fb) { e.currentTarget.style.display = 'none'; return; }
        e.currentTarget.dataset.fb = '1';
        e.currentTarget.src = getBrandAssetPath(brand, brand.featured);
      }}
      style={{
        width: '100%', height: '100%', objectFit: 'cover',
        display: 'block', borderRadius: radius,
      }}
    />
  );
}

/* ---------------------------------- data ---------------------------------- */

// Hero collage — 4 small real fragments (brands + generated), drifting slowly.
const COLLAGE = [
  { type: 'cover', id: 'ashe', drift: 12, dur: 7 },
  { type: 'img', src: '/brands/butterfly/1.webp', fb: '/brands/butterfly/2.webp', drift: -14, dur: 9 },
  { type: 'img', src: AI_POSTS[0].src, fb: AI_POSTS[1].src, drift: 10, dur: 8 },
  { type: 'img', src: '/brands/noam/1.webp', fb: '/brands/noam/logo.webp', drift: -10, dur: 10 },
];

const APPROACH = [
  { n: '01', label: 'Strategy', line: 'Positioning before pixels.', thumb: '/logos/1.webp' },
  { n: '02', label: 'Visual Language', line: 'One system for every surface.', thumb: '/brands/ashe/3.webp' },
  { n: '03', label: 'Content', line: 'Campaigns, not one-offs.', thumb: AI_POSTS[1].src },
  { n: '04', label: 'Digital Experience', line: 'Sites built to convert.', thumb: '/videos/websites/posters/vudu-energy.webp' },
  { n: '05', label: 'Motion', line: 'Film-grade movement.', thumb: '/brands/blenday/1.webp' },
  { n: '06', label: 'Launch', line: 'Everything ships together.', thumb: '/brands/pita-basta/1.webp' },
];

const WORK_WALL = ['ashe', 'blenday', 'butterfly', 'pita-basta', 'noam', 'lacroix'];

/* ---------------------------------- page ---------------------------------- */

export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'About | AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', overflowX: 'clip', color: '#F6F3ED' }}>
      <style>{`
        .about-focus:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; border-radius: 4px; }
        .about-wall-link:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; }
        .about-wall-link:hover img, .about-wall-link:focus-visible img { transform: scale(1.04); }
      `}</style>

      <AyesmajNav />

      {/* 1 ── EDITORIAL HERO (dark) */}
      <header style={{ ...section, paddingTop: 'clamp(140px,18vh,220px)', paddingBottom: 'clamp(60px,8vw,110px)' }}>
        <motion.p {...fade(0)} style={eyebrowStyle()}>About Ayesmaj</motion.p>
        <motion.h1
          {...fade(0.08)}
          style={{
            fontFamily: FONTS.display,
            fontSize: 'clamp(40px,7vw,108px)',
            lineHeight: 0.98,
            textTransform: 'uppercase',
            letterSpacing: '0.005em',
            margin: '26px 0 0',
            maxWidth: 1100,
            color: '#F6F3ED',
          }}
        >
          A creative studio built for the <span style={gradText}>next era</span> of branding.
        </motion.h1>

        {/* motion collage strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,150px), 1fr))',
            gap: 'clamp(12px,2vw,24px)',
            marginTop: 'clamp(48px,6vw,90px)',
            maxWidth: 900,
          }}
        >
          {COLLAGE.map((f, i) => (
            <motion.div
              key={i}
              {...fade(0.15 + i * 0.08)}
              style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '4 / 5', background: '#121512' }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, f.drift, 0] }}
                transition={reduceMotion ? undefined : { duration: f.dur, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '100%', height: '100%' }}
              >
                {f.type === 'cover' ? (
                  <BrandCover id={f.id} />
                ) : (
                  <img
                    src={f.src}
                    alt=""
                    loading="lazy"
                    onError={(e) => {
                      if (e.currentTarget.dataset.fb) { e.currentTarget.style.display = 'none'; return; }
                      e.currentTarget.dataset.fb = '1';
                      e.currentTarget.src = f.fb;
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </header>

      {/* 2 ── THE BELIEF (bright ivory) */}
      <section style={{ background: '#F7F3ED', color: '#111', padding: 'clamp(80px,10vw,150px) 0' }}>
        <div style={{ ...section, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,420px), 1fr))', gap: 'clamp(36px,5vw,80px)', alignItems: 'start' }}>
          <div>
            <motion.p {...fade(0)} style={eyebrowStyle('#A45FDB')}>The Belief</motion.p>
            <motion.h2
              {...fade(0.08)}
              style={{
                fontFamily: FONTS.display,
                fontSize: 'clamp(32px,4.6vw,68px)',
                lineHeight: 1.02,
                textTransform: 'uppercase',
                color: '#111',
                margin: '22px 0 0',
              }}
            >
              A brand should feel bigger than a logo.
            </motion.h2>
          </div>
          <div style={{ fontFamily: FONTS.ui, color: '#2C2B29', fontSize: 'clamp(16px,1.35vw,19px)', lineHeight: 1.75 }}>
            <motion.p {...fade(0.1)} style={{ margin: 0 }}>
              People decide whether to trust a brand in the first few seconds of seeing it.
              Visual quality is not decoration — it is the fastest signal of how seriously
              you take your own work. We treat every frame, page, and post as part of that signal.
            </motion.p>
            <motion.p {...fade(0.18)} style={{ margin: '24px 0 0' }}>
              Most brands are assembled from scattered deliverables — a logo from one place,
              a website from another, content from a third. We believe one connected system,
              directed by a single visual language, will always beat a pile of disconnected assets.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 3 ── CREATIVE DIRECTION (dark, restrained) */}
      <section style={{ background: '#0B0D0C', padding: 'clamp(80px,10vw,140px) 0' }}>
        <div style={{ ...section, maxWidth: 860, textAlign: 'center' }}>
          <motion.p {...fade(0)} style={eyebrowStyle()}>Creative Direction</motion.p>
          <motion.h2
            {...fade(0.08)}
            style={{
              fontFamily: FONTS.display,
              fontSize: 'clamp(26px,3.4vw,48px)',
              lineHeight: 1.05,
              textTransform: 'uppercase',
              margin: '22px 0 0',
              color: '#F6F3ED',
            }}
          >
            Founded and creatively directed by{' '}
            <span style={gradText}>{SITE.founder}</span>
          </motion.h2>
          <motion.p
            {...fade(0.16)}
            style={{
              fontFamily: FONTS.ui,
              color: '#AAA39A',
              fontSize: 'clamp(15px,1.3vw,18px)',
              lineHeight: 1.75,
              margin: '26px auto 0',
              maxWidth: 640,
            }}
          >
            AYESMAJ is a direction-led studio: every project starts with a creative point of
            view, and every deliverable is measured against it. We use AI tools throughout
            production to move at the speed of ideas — but human direction decides what ships.
            The result is work that feels authored, not generated.
          </motion.p>
        </div>
      </section>

      {/* 4 ── THE APPROACH (warm editorial) */}
      <section style={{ background: '#F0E8DC', color: '#111', padding: 'clamp(80px,10vw,150px) 0' }}>
        <div style={section}>
          <motion.p {...fade(0)} style={eyebrowStyle('#C88B58')}>The Approach</motion.p>
          <motion.h2
            {...fade(0.08)}
            style={{
              fontFamily: FONTS.display,
              fontSize: 'clamp(30px,4vw,58px)',
              lineHeight: 1.02,
              textTransform: 'uppercase',
              color: '#111',
              margin: '22px 0 clamp(40px,5vw,70px)',
              maxWidth: 760,
            }}
          >
            One system, six moves.
          </motion.h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px,2vw,22px)' }}>
            {APPROACH.map((s, i) => (
              <motion.div
                key={s.n}
                {...fade(0.06 * i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '14px 22px 14px 14px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.55)',
                  border: '1px solid rgba(17,17,17,0.1)',
                  flex: '1 1 clamp(260px, 30%, 420px)',
                  minWidth: 'min(100%, 260px)',
                }}
              >
                <img
                  src={s.thumb}
                  alt=""
                  loading="lazy"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', ...gradText }}>
                    {s.n}
                  </div>
                  <div style={{ fontFamily: FONTS.ui, fontWeight: 700, fontSize: 16, color: '#111', marginTop: 2 }}>
                    {s.label}
                  </div>
                  <div style={{ fontFamily: FONTS.ui, fontSize: 13.5, color: '#70665A', marginTop: 2 }}>
                    {s.line}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 ── SELECTED WORK WALL (dark) */}
      <section style={{ background: '#050505', padding: 'clamp(80px,10vw,150px) 0' }}>
        <div style={section}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'end', justifyContent: 'space-between', gap: 20, marginBottom: 'clamp(36px,4vw,60px)' }}>
            <div>
              <motion.p {...fade(0)} style={eyebrowStyle()}>Selected Work</motion.p>
              <motion.h2
                {...fade(0.08)}
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 'clamp(30px,4.4vw,64px)',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  color: '#F6F3ED',
                  margin: '20px 0 0',
                }}
              >
                Proof, not promises.
              </motion.h2>
            </div>
            <motion.div {...fade(0.14)}>
              <Link
                to="/Work"
                className="about-focus"
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#D7D1C8',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${GOLD}`,
                  paddingBottom: 4,
                }}
              >
                All work →
              </Link>
            </motion.div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px), 1fr))',
              gap: 'clamp(14px,2vw,24px)',
            }}
          >
            {WORK_WALL.map((id, i) => {
              const brand = getBrand(id);
              if (!brand) return null;
              return (
                <motion.div key={id} {...fade(0.05 * i)}>
                  <Link
                    to={`/BrandDetail?slug=${id}`}
                    className="about-wall-link"
                    aria-label={`${brand.name} — view case study`}
                    style={{ display: 'block', position: 'relative', borderRadius: 20, overflow: 'hidden', aspectRatio: '4 / 5', background: '#121512' }}
                  >
                    <div style={{ width: '100%', height: '100%', transition: 'transform 0.7s cubic-bezier(0.22,1,0.36,1)' }}>
                      <BrandCover id={id} />
                    </div>
                    <div
                      style={{
                        position: 'absolute', inset: 'auto 0 0 0',
                        padding: '48px 20px 18px',
                        background: 'linear-gradient(180deg, rgba(5,5,5,0) 0%, rgba(5,5,5,0.85) 100%)',
                      }}
                    >
                      <div style={{ fontFamily: FONTS.ui, fontWeight: 700, fontSize: 16, color: '#F6F3ED' }}>{brand.name}</div>
                      <div style={{ fontFamily: FONTS.ui, fontSize: 12.5, color: '#AAA39A', marginTop: 3 }}>{brand.category}</div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6 ── GLOBAL COLLABORATION (bright) */}
      <section style={{ background: '#F7F3ED', color: '#111', padding: 'clamp(70px,8vw,120px) 0' }}>
        <div style={{ ...section, textAlign: 'center' }}>
          <motion.p {...fade(0)} style={eyebrowStyle('#A45FDB')}>Global Collaboration</motion.p>
          <motion.h2
            {...fade(0.08)}
            style={{
              fontFamily: FONTS.display,
              fontSize: 'clamp(26px,3.6vw,52px)',
              lineHeight: 1.04,
              textTransform: 'uppercase',
              color: '#111',
              margin: '22px auto 0',
              maxWidth: 820,
            }}
          >
            Based in {SITE.location.split('—')[0].trim()}. Delivering worldwide.
          </motion.h2>
          <motion.div
            {...fade(0.16)}
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'clamp(10px,1.5vw,16px)', marginTop: 'clamp(32px,4vw,52px)' }}
          >
            {PROOF_BADGES.map((b) => (
              <span
                key={b}
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  padding: '12px 22px',
                  borderRadius: 999,
                  border: '1px solid rgba(17,17,17,0.18)',
                  color: '#2C2B29',
                  whiteSpace: 'nowrap',
                }}
              >
                {b}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7 ── FINAL CTA (dark) */}
      <section style={{ background: '#050505', padding: 'clamp(90px,12vw,170px) 0' }}>
        <div style={{ ...section, textAlign: 'center' }}>
          <motion.h2
            {...fade(0)}
            style={{
              fontFamily: FONTS.display,
              fontSize: 'clamp(36px,6vw,92px)',
              lineHeight: 0.98,
              textTransform: 'uppercase',
              color: '#F6F3ED',
              margin: 0,
            }}
          >
            Let’s build <span style={gradText}>your world.</span>
          </motion.h2>
          <motion.div {...fade(0.12)} style={{ marginTop: 'clamp(32px,4vw,52px)' }}>
            <CinematicButton label="Start a Project" accent={GOLD} size="lg" onClick={() => navigate('/Contact')} />
          </motion.div>
        </div>
      </section>

      <AyesmajFooter />
    </div>
  );
}
