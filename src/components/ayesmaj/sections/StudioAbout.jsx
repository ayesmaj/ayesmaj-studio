import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import { FONTS } from '@/components/ayesmaj/theme';
import { PROOF_BADGES } from '@/data/siteConfig';
import { SITE_DEMOS } from '@/data/media';

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

const hideOnError = (e) => { e.currentTarget.style.display = 'none'; };

// Swap to the original composite if the generated cover is still rendering.
const heroFallback = (e) => {
  if (e.currentTarget.dataset.fb) return;
  e.currentTarget.dataset.fb = '1';
  e.currentTarget.src = '/assets/ayesmaj/hero/hero-composite.png';
};

const PILLARS = [
  { n: '01', title: 'Direction',  line: 'We define the idea, audience, and visual position.' },
  { n: '02', title: 'Production', line: 'We create identity, content, websites, motion, and CGI.' },
  { n: '03', title: 'Systems',    line: 'We scale the visual world across every customer touchpoint.' },
];

// Shared glass frame for the collage
const frame = {
  position: 'absolute',
  background: 'rgba(255,255,255,0.035)',
  border: '1px solid rgba(255,255,255,0.09)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  borderRadius: 24,
  padding: 10,
  boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
};

const media = {
  display: 'block',
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 16,
};

// Slow float — disabled under prefers-reduced-motion
const float = (dur, delay = 0) =>
  reduceMotion
    ? {}
    : {
        animate: { y: [0, -10, 0] },
        transition: { duration: dur, delay, repeat: Infinity, ease: 'easeInOut' },
      };

export default function StudioAbout() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        background: '#0B0D0C',
        borderTop: '1px solid rgba(255,255,255,0.09)',
        padding: 'clamp(80px,10vw,150px) clamp(24px,5vw,80px)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,380px),1fr))',
          gap: 'clamp(48px,6vw,90px)',
          alignItems: 'center',
        }}
      >
        {/* ------------------------------ LEFT — copy ------------------------------ */}
        <div>
          <motion.p
            {...fade()}
            style={{
              fontFamily: FONTS.ui,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: GOLD,
              margin: '0 0 20px',
            }}
          >
            Inside Ayesmaj
          </motion.p>

          <motion.h2
            {...fade(0.05)}
            style={{
              fontFamily: FONTS.display,
              fontSize: 'clamp(36px,4.8vw,72px)',
              lineHeight: 0.96,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
              color: '#F6F3ED',
              margin: '0 0 22px',
            }}
          >
            One Studio.
            <br />
            <span style={gradText}>Every Visual Layer.</span>
          </motion.h2>

          <motion.p
            {...fade(0.1)}
            style={{
              fontFamily: FONTS.ui,
              fontSize: 'clamp(15px,1.3vw,17px)',
              lineHeight: 1.65,
              color: '#AAA39A',
              maxWidth: 480,
              margin: '0 0 clamp(36px,4vw,52px)',
            }}
          >
            Strategy, design, AI production, websites, and 3D — directed as one
            connected system.
          </motion.p>

          {/* pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px,2.6vw,34px)' }}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.n}
                {...fade(0.12 + i * 0.08)}
                style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(18px,2vw,28px)' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                  <span
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 'clamp(18px,1.6vw,22px)',
                      lineHeight: 1,
                      ...gradText,
                    }}
                  >
                    {p.n}
                  </span>
                  <span aria-hidden="true" style={{ width: 1, flex: 1, minHeight: 26, background: GRAD, opacity: 0.55 }} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 'clamp(18px,1.8vw,24px)',
                      letterSpacing: '0.03em',
                      textTransform: 'uppercase',
                      color: '#F6F3ED',
                      margin: '0 0 8px',
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: FONTS.ui,
                      fontSize: 14.5,
                      lineHeight: 1.6,
                      color: '#AAA39A',
                      margin: 0,
                      maxWidth: 440,
                    }}
                  >
                    {p.line}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* proof badges */}
          <motion.div
            {...fade(0.4)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: 'clamp(36px,4vw,52px) 0 0' }}
          >
            {PROOF_BADGES.map((b) => (
              <span
                key={b}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '9px 16px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  fontFamily: FONTS.ui,
                  fontSize: 10.5,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#D7D1C8',
                }}
              >
                <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: GRAD, flexShrink: 0 }} />
                {b}
              </span>
            ))}
          </motion.div>

          <motion.div {...fade(0.5)} style={{ marginTop: 'clamp(32px,3.6vw,44px)' }}>
            <CinematicButton label="Enter the Studio" accent={GOLD} onClick={() => navigate('/Studio')} />
          </motion.div>
        </div>

        {/* --------------------------- RIGHT — media collage --------------------------- */}
        <motion.div
          {...fade(0.15)}
          aria-hidden="true"
          style={{ position: 'relative', minHeight: 'clamp(440px,52vw,560px)' }}
        >
          {/* gold / purple glow */}
          <div
            style={{
              position: 'absolute',
              inset: '-12%',
              background:
                'radial-gradient(48% 42% at 68% 26%, rgba(216,183,90,0.16) 0%, transparent 70%),' +
                'radial-gradient(52% 46% at 26% 72%, rgba(122,72,255,0.18) 0%, transparent 70%)',
              filter: 'blur(10px)',
              pointerEvents: 'none',
            }}
          />

          {/* big tilted hero frame */}
          <motion.div
            {...float(9)}
            style={{ ...frame, top: 0, right: 0, width: '64%', rotate: 2.5, zIndex: 1 }}
          >
            <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: 16 }}>
              <img
                src="/generated/about/about-hero-world.png"
                alt=""
                loading="lazy"
                onError={heroFallback}
                style={media}
              />
            </div>
          </motion.div>

          {/* brand still */}
          <motion.div
            {...float(8, 0.8)}
            style={{ ...frame, top: '5%', left: '2%', width: '34%', rotate: -6, zIndex: 2 }}
          >
            <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: 16 }}>
              <img src="/brands/ashe/1.png" alt="" loading="lazy" onError={hideOnError} style={media} />
            </div>
          </motion.div>

          {/* website demo loop */}
          <motion.div
            {...float(10, 1.6)}
            style={{ ...frame, top: '42%', left: 0, width: '48%', rotate: -3, zIndex: 3 }}
          >
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: 16, background: '#070707' }}>
              <video
                src={SITE_DEMOS[1].src}
                poster={SITE_DEMOS[1].poster}
                autoPlay={!reduceMotion}
                muted
                loop
                playsInline
                preload="metadata"
                onError={hideOnError}
                style={media}
              />
            </div>
          </motion.div>

          {/* storyboard frame */}
          <motion.div
            {...float(11, 0.4)}
            style={{ ...frame, bottom: 0, right: '5%', width: '44%', rotate: 3, zIndex: 4 }}
          >
            <div style={{ aspectRatio: '16 / 10', overflow: 'hidden', borderRadius: 16 }}>
              <img
                src="/generated/storyboards/sb-03-hero.png"
                alt=""
                loading="lazy"
                onError={hideOnError}
                style={media}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
