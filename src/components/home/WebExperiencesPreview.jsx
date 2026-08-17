import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Check, ArrowRight } from 'lucide-react';

const GOLD = '#C8A44E';
const GOLD_LIGHT = '#E8C96D';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

function BrowserMockup({ url, title, delay, offsetLeft = 0, accentColor = GOLD, videoSrc }) {
  const accentRGB = accentColor === GOLD ? '200,164,78' : '179,230,90';
  return (
    <motion.div
      {...fade(delay)}
      style={{ marginLeft: offsetLeft }}
    >
      <motion.div
        whileHover={{ y: -4, boxShadow: `0 32px 80px rgba(0,0,0,0.7), 0 0 40px rgba(${accentRGB},0.12)` }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: `1px solid rgba(${accentRGB},0.15)`,
          borderRadius: 16,
          overflow: 'hidden',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 16px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* Browser chrome bar */}
        <div style={{
          background: 'rgba(7,16,10,0.92)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '9px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            {['#FF5F57', '#FEBC2E', '#28C840'].map((c, i) => (
              <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.65 }} />
            ))}
          </div>
          <div style={{
            flex: 1, height: 20,
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 6, marginLeft: 8,
            display: 'flex', alignItems: 'center', paddingLeft: 10,
          }}>
            <span style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 9, color: 'rgba(255,255,255,0.28)',
              letterSpacing: '0.02em',
            }}>
              {url}
            </span>
          </div>
        </div>

        {/* Video content */}
        <div style={{ position: 'relative', height: 180, overflow: 'hidden', background: '#050d07' }}>
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              display: 'block',
              pointerEvents: 'none',
            }}
          />
          {/* Subtle vignette overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 60%, rgba(5,13,7,0.45) 100%)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Site title label */}
        <div style={{
          padding: '8px 14px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(7,16,10,0.7)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: '#28C840', opacity: 0.8,
          }} />
          <span style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 9, color: 'rgba(255,255,255,0.32)',
            letterSpacing: '0.05em',
          }}>
            {title}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const BULLETS = [
  'Premium landing pages',
  'Full business websites',
  'Interactive 3D websites',
  'Product showcase pages',
  'AI-powered web systems',
  'Conversion-focused structure',
];

export default function WebExperiencesPreview() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(200,164,78,0.2), transparent)',
          marginBottom: 'clamp(60px,8vw,100px)',
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
          gap: 'clamp(48px,6vw,80px)',
          alignItems: 'center',
        }}>

          {/* LEFT: text */}
          <div>
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.15em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.52em' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(8px,0.75vw,10px)',
                letterSpacing: '0.52em',
                textTransform: 'uppercase',
                color: GOLD,
                marginBottom: 16,
              }}
            >
              WEB EXPERIENCES
            </motion.p>

            <motion.h2
              {...fade(0.08)}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(26px,3.8vw,52px)',
                fontWeight: 800,
                lineHeight: 1.02,
                letterSpacing: '-0.032em',
                color: '#F8FAFC',
                marginBottom: 20,
              }}
            >
              Websites That Feel<br />
              <span style={{
                fontStyle: 'italic',
                background: `linear-gradient(125deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Like Premium Products
              </span>
            </motion.h2>

            <motion.p
              {...fade(0.16)}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(14px,1.2vw,16.5px)',
                color: 'rgba(248,250,252,0.5)',
                lineHeight: 1.72,
                marginBottom: 32,
                maxWidth: 480,
              }}
            >
              We design websites that don't just sit online — they sell, impress, explain, and make the brand feel more valuable.
            </motion.p>

            {/* Bullet list */}
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px' }}>
              {BULLETS.map((b, i) => (
                <motion.li
                  key={b}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.24 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '9px 0',
                    borderBottom: i < BULLETS.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    fontSize: 'clamp(13px,1.05vw,15px)',
                    color: 'rgba(248,250,252,0.7)',
                  }}
                >
                  <Check size={13} color={GOLD} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  {b}
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div {...fade(0.58)}>
              <Link
                to={createPageUrl('WebExperiences')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: 'clamp(10px,0.85vw,12px)',
                  fontWeight: 700, letterSpacing: '0.14em',
                  textTransform: 'uppercase', color: GOLD,
                  border: '1px solid rgba(200,164,78,0.35)',
                  borderRadius: 100, padding: '12px 28px',
                  background: 'rgba(200,164,78,0.05)',
                  textDecoration: 'none', transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(200,164,78,0.12)';
                  e.currentTarget.style.boxShadow = '0 0 28px rgba(200,164,78,0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(200,164,78,0.05)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                Explore Web Experiences <ArrowRight size={13} />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: stacked browser mockups with real videos */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <BrowserMockup
              url="aistartup.io" title="AI Startup Platform"
              delay={0.08}
              videoSrc="https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/websites/website-1.mp4"
            />
            <BrowserMockup
              url="realestate.co" title="Premium Property Platform"
              delay={0.16} offsetLeft={28} accentColor="#B3E65A"
              videoSrc="https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/websites/website-2.mp4"
            />
            <BrowserMockup
              url="blenday.com" title="Energy Drink Brand"
              delay={0.24}
              videoSrc="https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/websites/website-3.mp4"
            />

            {/* Ambient glow behind mockups */}
            <div style={{
              position: 'absolute', inset: '-20px',
              background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(200,164,78,0.05) 0%, transparent 70%)',
              pointerEvents: 'none', zIndex: -1,
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}
