import React, { useEffect, useState, useCallback } from 'react';
import Seo from '@/components/ayesmaj/Seo';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import { FONTS } from '@/components/ayesmaj/theme';
import { AI_POSTS } from '@/data/media';

const GOLD = '#D8B75A';
const PURPLE = '#9B5CFF';
const PURPLE_RGB = '155,92,255';
const GRADIENT = 'linear-gradient(90deg,#D8B75A 0%,#C58B57 28%,#A35BDA 72%,#7A48FF 100%)';

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

export default function AiPosts() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  useEffect(() => {
    document.title = 'AI Posts | AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  const close = useCallback(() => setActive(null), []);
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active, close]);

  const section = { maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' };

  return (
    <div className="light-hero-page" style={{ background: '#0D0F0E', minHeight: '100vh', overflowX: 'clip', position: 'relative' }}>
      <Seo
        title="AI Posts | AYESMAJ Studios"
        description="AI-generated social content and brand imagery by AYESMAJ Studios — scroll-stopping posts produced at scale."
        path="/AiPosts"
      />
      <AyesmajNav />

      <main>
        {/* BRIGHT LUXURY INTRO */}
        <section style={{ background: '#F7F3ED', paddingTop: 'clamp(140px,16vw,200px)', paddingBottom: 'clamp(72px,9vw,130px)' }}>
          <div style={section}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: 900 }}
            >
              <p style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: PURPLE, marginBottom: 22 }}>
                AI Posts
              </p>
              <h1 style={{ fontFamily: FONTS.display, fontSize: 'clamp(40px,7vw,96px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', color: '#111111', margin: 0 }}>
                A Content{' '}
                <span style={{ background: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  Engine
                </span>{' '}
                for Your Brand
              </h1>
              <p style={{ fontFamily: FONTS.ui, fontSize: 'clamp(15px,1.4vw,19px)', color: '#6E685F', maxWidth: 620, margin: '28px 0 0', lineHeight: 1.7 }}>
                Daily AI-generated brand posts, campaigns, and carousels — always on-brand, always on schedule.
              </p>
            </motion.div>
          </div>
        </section>

        {/* DARK MASONRY GRID */}
        <div className="idv2-bgc idv2-bgc-04">
        <section style={{ paddingTop: 'clamp(64px,8vw,110px)', paddingBottom: 'clamp(64px,8vw,120px)' }}>
          <div style={section}>
            <div style={{ columns: '3 280px', columnGap: 'clamp(16px,2vw,24px)' }}>
              {AI_POSTS.map((post, i) => (
                <motion.div
                  key={post.id}
                  {...fade(i * 0.06)}
                  onClick={() => setActive(post)}
                  style={{
                    breakInside: 'avoid',
                    marginBottom: 'clamp(16px,2vw,24px)',
                    borderRadius: 20,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,0.09)',
                    background: 'linear-gradient(160deg, rgba(155,92,255,0.12), rgba(216,183,90,0.08))',
                    transition: 'transform 0.45s ease, box-shadow 0.45s ease, border-color 0.45s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.borderColor = `rgba(${PURPLE_RGB},0.45)`;
                    e.currentTarget.style.boxShadow = `0 20px 50px rgba(0,0,0,0.5), 0 0 36px rgba(${PURPLE_RGB},0.14)`;
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                    e.currentTarget.style.boxShadow = 'none';
                    const img = e.currentTarget.querySelector('img');
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  <img
                    src={post.src}
                    alt={`AI brand post ${post.id}`}
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    style={{ width: '100%', display: 'block', maxWidth: '100%', transition: 'transform 0.6s ease' }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ paddingBottom: 'clamp(80px,10vw,140px)', textAlign: 'center' }}>
          <div style={section}>
            <motion.div {...fade(0.05)}>
              <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(30px,4.5vw,64px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 0.98, color: '#F6F3ED', margin: '0 0 28px' }}>
                Your Feed, on Autopilot
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CinematicButton label="Build My Content Engine" accent={PURPLE} size="lg" onClick={() => navigate('/Contact')} />
              </div>
            </motion.div>
          </div>
        </section>
        </div>
      </main>

      <AyesmajFooter />

      {/* LIGHTBOX */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(5,5,5,0.94)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(16px,4vw,56px)',
            }}
          >
            <button
              onClick={close}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 24,
                right: 24,
                width: 48,
                height: 48,
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.06)',
                color: '#F6F3ED',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.94, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              src={active.src}
              alt={`AI brand post ${active.id}`}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              style={{ maxWidth: 'min(680px, 100%)', maxHeight: '88vh', borderRadius: 20, border: '1px solid rgba(255,255,255,0.12)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
