import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import SectionHeader from '@/components/ayesmaj/SectionHeader';
import VideoCard from '@/components/ayesmaj/VideoCard';
import { FONTS } from '@/components/ayesmaj/theme';
import { PROOF_BADGES } from '@/data/siteConfig';
import { ANIMATIONS, SITE_DEMOS, AI_POSTS, SHOWREEL_FILMS } from '@/data/media';

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

const section = { maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' };

/* ---------------------------------- data ---------------------------------- */

const MANIFESTO = [
  { a: 'A brand is not a logo.', b: "It's a world.", bg: '#050505', dark: true, cls: 'idv2-bgc idv2-bgc-06' },
  { a: 'Every layer speaks', b: 'one language.', bg: '#F7F3ED', dark: false },
  { a: 'Directed, not decorated.', b: 'Frame by frame.', bg: '#0B0D0C', dark: true, cls: 'idv2-bgc idv2-bgc-04' },
];

const WALL = [
  { label: 'Identity',    type: 'img',   src: '/brands/ashe/1.webp' },
  { label: 'Websites',    type: 'video', src: SITE_DEMOS[0].src, poster: SITE_DEMOS[0].poster },
  { label: 'AI Content',  type: 'img',   src: AI_POSTS[0].src },
  { label: '3D',          type: 'video', src: ANIMATIONS[2].src },
  { label: 'Storyboards', type: 'img',   src: '/generated/storyboards/sb-03-hero.webp' },
  { label: 'Direction',   type: 'img',   src: '/generated/about/about-philosophy-01.webp' },
];

const PROCESS = [
  { n: '01', t: 'Strategy', line: 'Position, audience, and the idea worth building.' },
  { n: '02', t: 'Design',   line: 'Identity and visual language, defined once.' },
  { n: '03', t: 'Content',  line: 'Campaigns, posts, and imagery in the same world.' },
  { n: '04', t: 'Motion',   line: 'Film, animation, and CGI that move the story.' },
  { n: '05', t: 'Launch',   line: 'Websites and rollout across every touchpoint.' },
];

/* ---------------------------------- page ---------------------------------- */

export default function Studio() {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'The Studio | AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', overflowX: 'clip', position: 'relative', color: '#F6F3ED' }}>
      <AyesmajNav />

      <main>
        {/* 1. HERO */}
        <section style={{ position: 'relative', minHeight: '92vh', display: 'flex', alignItems: 'flex-end', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 90% at 50% 10%, #181C19 0%, #0B0D0C 45%, #050505 100%)' }} />
          <img
            src="/generated/about/about-hero-world.webp"
            alt=""
            onError={hideOnError}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,5,0.4) 0%, rgba(5,5,5,0.12) 42%, rgba(5,5,5,0.94) 100%)' }} />

          <div style={{ ...section, position: 'relative', width: '100%', paddingTop: 'clamp(160px,18vw,220px)', paddingBottom: 'clamp(64px,8vw,110px)' }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ maxWidth: 1020 }}
            >
              <p style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 600, letterSpacing: '0.34em', textTransform: 'uppercase', color: GOLD, marginBottom: 24 }}>
                The Studio
              </p>
              <h1 style={{ fontFamily: FONTS.display, fontSize: 'clamp(44px,7.6vw,116px)', lineHeight: 0.94, letterSpacing: '0.01em', textTransform: 'uppercase', color: '#F6F3ED', margin: 0 }}>
                Where <span style={gradText}>Brand Worlds</span> Are Built
              </h1>
            </motion.div>
          </div>
        </section>

        {/* 2. MANIFESTO — alternating dark / bright bands */}
        {MANIFESTO.map((m, i) => (
          <section key={m.a} className={m.cls} style={{ background: m.bg, padding: 'clamp(90px,11vw,160px) 0' }}>
            <motion.div {...fade()} style={{ ...section, textAlign: i % 2 ? 'right' : 'left' }}>
              <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(32px,5.2vw,76px)', lineHeight: 1.0, letterSpacing: '0.01em', textTransform: 'uppercase', color: m.dark ? '#F6F3ED' : '#111111', margin: 0, marginLeft: i % 2 ? 'auto' : 0, maxWidth: 900 }}>
                {m.a}
                <br />
                <span style={gradText}>{m.b}</span>
              </h2>
            </motion.div>
          </section>
        ))}

        {/* 3. DISCIPLINES MEDIA WALL */}
        <section className="idv2-bgc idv2-bgc-01" style={{ background: '#0B0D0C', padding: 'clamp(100px,12vw,160px) 0' }}>
          <div style={section}>
            <SectionHeader
              eyebrow="Disciplines"
              title="The Layers of the World"
              subtitle="Real work from every discipline — one visual language across all of it."
              accent={GOLD}
              align="left"
            />
            <div style={{ marginTop: 'clamp(44px,5vw,72px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,280px),1fr))', gap: 'clamp(18px,2.5vw,28px)' }}>
              {WALL.map((d, i) => (
                <motion.div
                  key={d.label}
                  {...fade(i * 0.06)}
                  whileHover={{ y: -8 }}
                  style={{
                    position: 'relative',
                    borderRadius: 24,
                    overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.09)',
                    background: 'linear-gradient(170deg,#181C19 0%,#121512 60%,#0B0D0C 100%)',
                    aspectRatio: '4 / 5',
                  }}
                >
                  {d.type === 'video' ? (
                    <video
                      src={d.src}
                      poster={d.poster}
                      autoPlay={!reduceMotion}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      onError={hideOnError}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <img
                      src={d.src}
                      alt={d.label}
                      loading="lazy"
                      onError={hideOnError}
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(5,5,5,0) 45%, rgba(5,5,5,0.9) 100%)' }} />
                  <div style={{ position: 'absolute', left: 22, right: 22, bottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span aria-hidden="true" style={{ width: 22, height: 2, background: GRAD, borderRadius: 2, flexShrink: 0 }} />
                    <span style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#F6F3ED' }}>
                      {d.label}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. PROCESS */}
        <section className="idv2-bgc idv2-bgc-08" style={{ background: '#050505', padding: 'clamp(100px,12vw,160px) 0' }}>
          <div style={section}>
            <SectionHeader
              eyebrow="Process"
              title="Concept to Launch"
              subtitle="Five stages, one direction — nothing gets lost between hands."
              accent={GOLD}
              align="left"
            />
            <div style={{ marginTop: 'clamp(44px,5vw,72px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,200px),1fr))', gap: 'clamp(18px,2.5vw,28px)' }}>
              {PROCESS.map((p, i) => (
                <motion.div key={p.n} {...fade(i * 0.08)}>
                  <div aria-hidden="true" style={{ height: 2, width: '100%', background: GRAD, borderRadius: 2, opacity: 0.7, marginBottom: 22 }} />
                  <div style={{ fontFamily: FONTS.display, fontSize: 'clamp(30px,3vw,44px)', lineHeight: 1, ...gradText }}>
                    {p.n}
                  </div>
                  <h3 style={{ fontFamily: FONTS.display, fontSize: 'clamp(19px,1.8vw,24px)', letterSpacing: '0.03em', textTransform: 'uppercase', color: '#F6F3ED', margin: '14px 0 10px' }}>
                    {p.t}
                  </h3>
                  <p style={{ fontFamily: FONTS.ui, fontSize: 14, lineHeight: 1.6, color: '#AAA39A', margin: 0 }}>
                    {p.line}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. STUDIO REEL */}
        <section className="idv2-bgc idv2-bgc-07" style={{ background: '#0B0D0C', padding: 'clamp(100px,12vw,160px) 0' }}>
          <div style={section}>
            <SectionHeader
              eyebrow="Studio Reel"
              title="Watch the World Move"
              accent={GOLD}
              align="left"
            />
            <div style={{ marginTop: 'clamp(44px,5vw,72px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,320px),1fr))', gap: 'clamp(18px,2.5vw,28px)' }}>
              {SHOWREEL_FILMS.map((f, i) => (
                <motion.div key={f.id} {...fade(i * 0.08)}>
                  <VideoCard
                    title={f.title}
                    category={f.category}
                    videoSrc={f.src}
                    accent={GOLD}
                    accentRGB="216,183,90"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. PROOF BADGES BAND */}
        <section style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.09)', borderBottom: '1px solid rgba(255,255,255,0.09)', padding: 'clamp(48px,6vw,72px) 0' }}>
          <motion.div {...fade()} style={{ ...section, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
            {PROOF_BADGES.map((b) => (
              <span
                key={b}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 18px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.035)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  fontFamily: FONTS.ui,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#D7D1C8',
                }}
              >
                <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: '50%', background: GRAD, flexShrink: 0 }} />
                {b}
              </span>
            ))}
          </motion.div>
        </section>

        {/* 7. FINAL CTA — bright ivory */}
        <section style={{ background: 'linear-gradient(180deg,#F7F3ED 0%,#EFE5D8 100%)', padding: 'clamp(110px,13vw,180px) 0', textAlign: 'center' }}>
          <motion.div {...fade()} style={section}>
            <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(34px,5.4vw,80px)', textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 0.98, color: '#111111', margin: '0 0 18px' }}>
              Ready to Build <span style={gradText}>Your World</span>?
            </h2>
            <p style={{ fontFamily: FONTS.ui, fontSize: 'clamp(15px,1.3vw,18px)', color: '#70665A', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.7 }}>
              Bring the idea. We direct everything it needs to look like a category leader.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CinematicButton label="Start the Conversation" accent={GOLD} variant="solid" size="lg" onClick={() => navigate('/Contact')} />
            </div>
          </motion.div>
        </section>
      </main>

      <AyesmajFooter />
    </div>
  );
}
