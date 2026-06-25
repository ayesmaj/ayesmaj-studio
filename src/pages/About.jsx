import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Zap, Eye, Globe, Award } from 'lucide-react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import SectionHeader from '@/components/ayesmaj/SectionHeader';
import { WORLDS, COLORS, FONTS } from '@/components/ayesmaj/theme';

const GOLD = '#FFB000';
const GOLD_RGB = '255,176,0';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const STATS = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '50+', label: 'Global Brands' },
  { value: '8+', label: 'Years of Craft' },
  { value: '3', label: 'Studio Locations' },
];

// Each value carries one of the three world accent colors
const VALUES = [
  { icon: Eye,   title: 'Cinematic Vision',   desc: 'Every frame is designed like a film — intentional, atmospheric, and emotionally resonant.', accent: WORLDS[1].accent, rgb: WORLDS[1].accentRGB },
  { icon: Zap,   title: 'Craft Over Speed',   desc: 'We move fast but never compromise quality. Every pixel earns its place.', accent: WORLDS[0].accent, rgb: WORLDS[0].accentRGB },
  { icon: Globe, title: 'Global Perspective', desc: 'A truly international creative lens, partnering with brands across the world.', accent: WORLDS[2].accent, rgb: WORLDS[2].accentRGB },
  { icon: Award, title: 'Brand Elevation',    desc: "We don't just make visuals. We build worlds around brands that demand attention.", accent: GOLD, rgb: GOLD_RGB },
];

export default function About() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'About — AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: COLORS.black, minHeight: '100vh', overflowX: 'hidden', color: COLORS.white }}>
      <AyesmajNav />

      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: `radial-gradient(circle at 50% 0%, rgba(${GOLD_RGB},0.08), transparent 55%)` }} />

      <main style={{ position: 'relative', zIndex: 10, padding: '160px clamp(24px,5vw,80px) 120px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16,1,0.3,1] }} style={{ textAlign: 'center', marginBottom: 'clamp(56px,7vw,96px)' }}>
            <p style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, marginBottom: 18 }}>About the Studio</p>
            <h1 style={{ fontFamily: FONTS.display, fontSize: 'clamp(40px,7vw,108px)', fontWeight: 800, lineHeight: 0.9, letterSpacing: '-0.01em', textTransform: 'uppercase', color: COLORS.white, margin: 0 }}>
              We Make Brands<br />
              <span style={{ WebkitTextStroke: `1px rgba(${GOLD_RGB},0.6)`, color: 'transparent' }}>Unforgettable.</span>
            </h1>
            <p style={{ fontFamily: FONTS.ui, fontSize: 'clamp(15px,1.4vw,19px)', color: COLORS.gray, maxWidth: 640, margin: '26px auto 0', lineHeight: 1.65 }}>
              AYESMAJ Studios builds premium cinematic websites, AI-powered marketing content, and immersive 3D worlds. We partner with brands globally to create experiences that command attention and drive results.
            </p>
          </motion.div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px),1fr))', gap: 16, marginBottom: 'clamp(56px,7vw,96px)' }}>
            {STATS.map((s, i) => (
              <motion.div key={s.label} {...fade(i * 0.08)}
                style={{ textAlign: 'center', borderRadius: 18, padding: '38px 24px', background: COLORS.glass, border: `1px solid rgba(${GOLD_RGB},0.14)` }}>
                <div style={{ fontFamily: FONTS.display, fontSize: 'clamp(36px,4vw,56px)', fontWeight: 800, color: GOLD, lineHeight: 1, marginBottom: 8 }}>{s.value}</div>
                <div style={{ fontFamily: FONTS.ui, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: COLORS.muted }}>{s.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Story */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,360px),1fr))', gap: 'clamp(32px,5vw,64px)', alignItems: 'center', marginBottom: 'clamp(56px,7vw,96px)' }}>
            <motion.div {...fade(0.05)}>
              <p style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 600, letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, marginBottom: 16 }}>Our Story</p>
              <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(28px,3.4vw,46px)', fontWeight: 800, textTransform: 'uppercase', color: COLORS.white, margin: '0 0 20px', lineHeight: 1.02 }}>Built on Craft, Driven by Obsession</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontFamily: FONTS.ui, fontSize: 15.5, lineHeight: 1.7, color: COLORS.gray }}>
                <p style={{ margin: 0 }}>Founded by a team of 3D artists, filmmakers, and brand strategists, AYESMAJ Studios was built from a single conviction: visual quality is a competitive advantage.</p>
                <p style={{ margin: 0 }}>We combine cutting-edge CGI and AI with cinematic storytelling to create work that doesn't just look good — it performs.</p>
                <p style={{ margin: 0 }}>From premium product reveals to full brand world builds, every project receives the same obsessive level of craft.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.15)}>
              <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden', aspectRatio: '4/3', border: `1px solid rgba(${GOLD_RGB},0.18)` }}>
                <img src="/about-hero.png" alt="AYESMAJ Studio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e)=>{e.currentTarget.style.display='none';}} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,3,3,0.6) 0%, transparent 60%)' }} />
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <div style={{ marginBottom: 'clamp(56px,7vw,96px)' }}>
            <SectionHeader eyebrow="Our Values" title="What Drives Us" />
            <div style={{ marginTop: 'clamp(36px,5vw,56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px),1fr))', gap: 18 }}>
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div key={v.title} {...fade(i * 0.08)}
                    style={{ borderRadius: 18, padding: 30, display: 'flex', gap: 20, background: COLORS.glass, border: `1px solid rgba(${v.rgb},0.18)` }}>
                    <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(${v.rgb},0.10)`, border: `1px solid rgba(${v.rgb},0.3)` }}>
                      <Icon size={19} color={v.accent} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily: FONTS.display, fontSize: 21, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', color: COLORS.white, margin: '2px 0 8px' }}>{v.title}</h3>
                      <p style={{ fontFamily: FONTS.ui, fontSize: 14.5, lineHeight: 1.6, color: COLORS.gray, margin: 0 }}>{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <motion.div {...fade(0.1)} style={{ textAlign: 'center' }}>
            <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(30px,4vw,56px)', fontWeight: 800, textTransform: 'uppercase', color: COLORS.white, margin: '0 0 16px' }}>Ready to Work Together?</h2>
            <p style={{ fontFamily: FONTS.ui, fontSize: 16, color: COLORS.gray, margin: '0 0 32px' }}>Tell us about your project and let's create something extraordinary.</p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <CinematicButton label="Start a Project" accent={GOLD} size="lg" onClick={() => navigate('/Contact')} />
              <CinematicButton label="View Our Work" accent="#F5F5F0" size="lg" onClick={() => navigate('/Brands')} />
            </div>
          </motion.div>
        </div>
      </main>

      <AyesmajFooter />
    </div>
  );
}
