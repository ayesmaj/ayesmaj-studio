import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import SectionHeader from '@/components/ayesmaj/SectionHeader';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import { WORLDS, COLORS, FONTS } from '@/components/ayesmaj/theme';

const PILLARS = [
  {
    world: WORLDS[0],
    blurb: 'Cinematic websites and landing pages engineered to convert.',
    items: ['Premium landing pages', 'Full business websites', 'Interactive & 3D web', 'Conversion-focused structure'],
  },
  {
    world: WORLDS[1],
    blurb: 'AI videos, images, and full campaigns produced at scale.',
    items: ['AI cinematic video ads', 'AI product & brand imagery', 'Campaign systems', 'Social-first content engines'],
  },
  {
    world: WORLDS[2],
    blurb: 'High-end 3D models, product visuals, and immersive worlds.',
    items: ['Product 3D modeling', 'Photoreal product visuals', 'Cinematic environments', 'Motion & animation'],
  },
];

export default function Services() {
  const navigate = useNavigate();
  useEffect(() => { document.title = 'Services — AYESMAJ Studios'; window.scrollTo(0, 0); }, []);

  return (
    <div style={{ background: COLORS.black, minHeight: '100vh', overflowX: 'hidden', color: COLORS.white }}>
      <AyesmajNav />

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 50% 0%, rgba(255,176,0,0.08), transparent 55%)' }} />

      <main style={{ position: 'relative', zIndex: 10, padding: '160px clamp(24px,5vw,80px) 40px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>

          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,80px)' }}>
            <p style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: '#FFB000', marginBottom: 18 }}>What We Do</p>
            <h1 style={{ fontFamily: FONTS.display, fontSize: 'clamp(40px,7vw,108px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.01em', textTransform: 'uppercase', color: COLORS.white, margin: 0 }}>
              Three Worlds.<br />One Brand System.
            </h1>
            <p style={{ fontFamily: FONTS.ui, fontSize: 'clamp(15px,1.4vw,19px)', color: COLORS.gray, maxWidth: 640, margin: '26px auto 0', lineHeight: 1.65 }}>
              Websites, AI content, and 3D worlds — connected into one visual system, so your brand looks bigger before the first conversation.
            </p>
          </motion.div>

          {/* Pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,330px),1fr))', gap: 20 }}>
            {PILLARS.map((p, i) => (
              <motion.div key={p.world.category}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16,1,0.3,1] }}
                style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', border: `1px solid rgba(${p.world.accentRGB},0.2)`, background: COLORS.black2, display: 'flex', flexDirection: 'column' }}>
                {/* Image header */}
                <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
                  <img src={p.world.image} alt={p.world.title} loading="lazy" onError={(e)=>{e.currentTarget.style.display='none';}} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${COLORS.black2} 0%, transparent 70%), radial-gradient(circle at 50% 100%, rgba(${p.world.accentRGB},0.25), transparent 60%)` }} />
                  <div style={{ position: 'absolute', left: 24, bottom: 16, fontFamily: FONTS.display, fontSize: 44, fontWeight: 800, color: p.world.accent, lineHeight: 1, textShadow: `0 0 24px rgba(${p.world.accentRGB},0.4)` }}>{p.world.index}</div>
                </div>

                <div style={{ padding: 28, display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontFamily: FONTS.display, fontSize: 25, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', color: COLORS.white, margin: '0 0 10px' }}>{p.world.title}</h3>
                  <p style={{ fontFamily: FONTS.ui, fontSize: 14.5, lineHeight: 1.6, color: COLORS.gray, margin: '0 0 20px' }}>{p.blurb}</p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                    {p.items.map((it) => (
                      <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: FONTS.ui, fontSize: 14, color: 'rgba(245,245,240,0.82)' }}>
                        <Check size={15} color={p.world.accent} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                        {it}
                      </div>
                    ))}
                  </div>

                  <button onClick={() => navigate(p.world.route)}
                    style={{ marginTop: 'auto', display: 'inline-flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: p.world.accent, padding: 0 }}>
                    Explore <ArrowUpRight size={15} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* CTA */}
      <section style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: 'clamp(80px,10vw,140px) 24px' }}>
        <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(32px,5vw,68px)', fontWeight: 800, textTransform: 'uppercase', color: COLORS.white, margin: '0 0 22px' }}>Let's Build Your Brand World</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CinematicButton label="Start a Project" accent="#FFB000" size="lg" onClick={() => navigate('/Contact')} />
        </div>
      </section>

      <AyesmajFooter />
    </div>
  );
}
