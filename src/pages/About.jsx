import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Film, Box, Sparkles, Globe, Hexagon, Rocket } from 'lucide-react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import AyesmajBackground from '@/components/ayesmaj/AyesmajBackground';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import SectionHeader from '@/components/ayesmaj/SectionHeader';
import { COLORS, FONTS } from '@/components/ayesmaj/theme';

const GOLD = '#FFB000';
const GOLD_RGB = '255,176,0';

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const CAPABILITIES = [
  { icon: Film, title: 'Cinematic Design', desc: 'Film-grade art direction across every brand touchpoint.' },
  { icon: Box, title: '3D Animation & CGI', desc: 'Photoreal product visuals and immersive 3D worlds.' },
  { icon: Sparkles, title: 'AI Content', desc: 'AI video, imagery, and campaigns produced at scale.' },
  { icon: Globe, title: 'Websites & Landing Pages', desc: 'Conversion-driven sites built to look cinematic.' },
  { icon: Hexagon, title: 'Brand Identity', desc: 'Cohesive visual systems that scale across channels.' },
  { icon: Rocket, title: 'Future Marketing Tools', desc: 'Next-gen creative pipelines that keep brands ahead.' },
];

const STATS = [
  { value: '120+', label: 'Projects Delivered' },
  { value: '6+', label: 'Years Experience' },
  { value: '40+', label: 'Global Clients' },
  { value: '4K', label: 'Render Quality' },
];

export default function About() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'The Studio | AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  const section = { maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' };

  return (
    <div style={{ background: '#020302', minHeight: '100vh', overflowX: 'clip', position: 'relative', color: COLORS.white }}>
      <AyesmajBackground accent="255,176,0" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <AyesmajNav />

        <main>
          {/* 1. HERO */}
          <section style={{ ...section, paddingTop: 'clamp(140px,16vw,200px)', paddingBottom: 'clamp(64px,8vw,120px)' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: 980 }}
            >
              <p style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginBottom: 22 }}>
                The Studio
              </p>
              <h1 style={{ fontFamily: FONTS.display, fontSize: 'clamp(40px,7vw,104px)', fontWeight: 800, lineHeight: 0.95, letterSpacing: '0.01em', textTransform: 'uppercase', color: COLORS.white, margin: 0 }}>
                A Future Creative Studio for Brands That Want More
              </h1>
              <p style={{ fontFamily: FONTS.ui, fontSize: 'clamp(15px,1.4vw,19px)', color: COLORS.gray, maxWidth: 660, margin: '28px 0 0', lineHeight: 1.7 }}>
                AYESMAJ Studios is an AI-powered creative studio combining cinematic design, 3D animation, AI content, websites, and branding into one visual system.
              </p>
            </motion.div>
          </section>

          {/* 2. MISSION + WHAT WE BELIEVE */}
          <section style={{ ...section, paddingBottom: 'clamp(64px,8vw,120px)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,360px),1fr))', gap: 'clamp(20px,3vw,32px)' }}>
              {[
                {
                  label: 'Our Mission',
                  title: 'One System, From Concept to Launch',
                  body: "We exist to make ambitious brands look bigger than they are — and then help them grow into it. By uniting cinematic design, CGI, and AI under one roof, we take a brand from first concept to full launch without ever breaking the visual language. One studio, one system, one obsession with craft.",
                },
                {
                  label: 'What We Believe',
                  title: 'Cinematic Quality Is a Competitive Edge',
                  body: 'We believe visual quality is no longer a luxury — it is the fastest way to earn trust. AI lets us move at the speed of ideas, but every frame is still directed like a film. Rooted locally and built for international brands, we treat each project as a world worth designing with intention.',
                },
              ].map((b, i) => (
                <motion.div
                  key={b.label}
                  {...fade(i * 0.1)}
                  style={{
                    background: 'rgba(255,255,255,0.045)',
                    border: '1px solid rgba(255,255,255,0.09)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    borderRadius: 24,
                    padding: 'clamp(28px,3.5vw,44px)',
                  }}
                >
                  <p style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, margin: '0 0 18px' }}>
                    {b.label}
                  </p>
                  <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(26px,3vw,40px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 1.02, color: COLORS.white, margin: '0 0 18px' }}>
                    {b.title}
                  </h2>
                  <p style={{ fontFamily: FONTS.ui, fontSize: 'clamp(15px,1.2vw,16.5px)', lineHeight: 1.75, color: COLORS.gray, margin: 0 }}>
                    {b.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 3. CAPABILITIES */}
          <section style={{ ...section, paddingBottom: 'clamp(64px,8vw,120px)' }}>
            <SectionHeader eyebrow="Capabilities" title="One Studio. Every Discipline." subtitle="A full creative stack under one cinematic visual system." accent={GOLD} />
            <div style={{ marginTop: 'clamp(40px,5vw,64px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px),1fr))', gap: 18 }}>
              {CAPABILITIES.map((c, i) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.title}
                    {...fade(i * 0.06)}
                    className="ayes-card"
                    style={{
                      background: 'rgba(255,255,255,0.045)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      backdropFilter: 'blur(18px)',
                      WebkitBackdropFilter: 'blur(18px)',
                      borderRadius: 24,
                      padding: 30,
                      transition: 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-6px)';
                      e.currentTarget.style.borderColor = 'rgba(216,183,90,0.35)';
                      e.currentTarget.style.boxShadow = '0 0 45px rgba(216,183,90,0.10)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{ width: 46, height: 46, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(${GOLD_RGB},0.10)`, border: `1px solid rgba(${GOLD_RGB},0.3)`, marginBottom: 20 }}>
                      <Icon size={20} color={GOLD} />
                    </div>
                    <h3 style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.02em', color: COLORS.white, margin: '0 0 10px' }}>
                      {c.title}
                    </h3>
                    <p style={{ fontFamily: FONTS.ui, fontSize: 14.5, lineHeight: 1.6, color: COLORS.gray, margin: 0 }}>
                      {c.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* 4. STUDIO STATS */}
          <section style={{ ...section, paddingBottom: 'clamp(64px,8vw,120px)' }}>
            <motion.div
              {...fade(0.05)}
              style={{
                background: 'rgba(255,255,255,0.045)',
                border: '1px solid rgba(255,255,255,0.09)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                borderRadius: 24,
                padding: 'clamp(32px,4vw,56px) clamp(20px,3vw,40px)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px),1fr))',
                gap: 0,
              }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  style={{
                    textAlign: 'center',
                    padding: '12px clamp(16px,2vw,32px)',
                    borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div style={{ fontFamily: FONTS.display, fontSize: 'clamp(44px,5vw,72px)', fontWeight: 800, color: GOLD, lineHeight: 1, marginBottom: 12, textShadow: `0 0 30px rgba(${GOLD_RGB},0.25)` }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: FONTS.ui, fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase', color: COLORS.muted }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </section>

          {/* 5. FINAL CTA */}
          <section style={{ ...section, paddingTop: 'clamp(40px,5vw,64px)', paddingBottom: 'clamp(80px,10vw,140px)', textAlign: 'center' }}>
            <motion.div {...fade(0.1)}>
              <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(32px,5vw,72px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 0.98, color: COLORS.white, margin: '0 0 28px' }}>
                Let's Build Something Cinematic
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CinematicButton label="Let's Build Something Cinematic" accent={GOLD} size="lg" onClick={() => navigate('/Contact')} />
              </div>
            </motion.div>
          </section>
        </main>

        <AyesmajFooter />
      </div>
    </div>
  );
}
