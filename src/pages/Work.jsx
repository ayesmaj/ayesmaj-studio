import React, { useEffect, useMemo, useState } from 'react';
import Seo from '@/components/ayesmaj/Seo';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import SectionHeader from '@/components/ayesmaj/SectionHeader';
import { FONTS } from '@/components/ayesmaj/theme';
import { BRANDS, getBrandAssetPath } from '@/data/brands';
import { SITE_DEMOS, AI_VIDEOS, AI_POSTS } from '@/data/media';

const GRADIENT = 'linear-gradient(90deg,#D8B75A 0%,#C58B57 28%,#A35BDA 72%,#7A48FF 100%)';
const GOLD = '#D8B75A';

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const FILTERS = [
  'All Work',
  'Branding & Identity',
  'Packaging & Labels',
  'Websites',
  'AI Posts',
  'AI Videos',
  '3D Animation',
  'CGI & Motion',
  'Campaigns',
];

// Derive filter types for a brand from its tags + category.
function brandTypes(b) {
  const hay = [b.category, ...b.tags].join(' ');
  const types = [];
  if (/brand|identity|logo/i.test(hay)) types.push('Branding & Identity');
  if (/packag/i.test(hay)) types.push('Packaging & Labels');
  if (/web|website|landing|digital experience/i.test(hay)) types.push('Websites');
  if (/3d|character/i.test(hay)) types.push('3D Animation');
  if (/cgi|render|motion|film/i.test(hay)) types.push('CGI & Motion');
  if (/campaign|product|art direction/i.test(hay)) types.push('Campaigns');
  return types.length ? types : ['Campaigns'];
}

// One unified feed: brands (tall image cards), sites + AI videos (wide video
// cards), plus a single AI-posts collage card. Interleaved 1 wide : 2 tall so
// rows alternate; grid dense flow keeps it packed.
function buildFeed() {
  const wides = [
    ...SITE_DEMOS.map((s) => ({
      key: `site-${s.id}`, kind: 'video', size: 'wide', types: ['Websites'],
      tag: 'Websites', title: s.title, subtitle: s.category, src: s.src, poster: s.poster,
    })),
    ...AI_VIDEOS.map((v) => ({
      key: `ai-${v.id}`, kind: 'video', size: 'wide', types: ['AI Videos'],
      tag: 'AI Videos', title: v.title, subtitle: v.category, src: v.src,
    })),
  ];
  const talls = [
    ...BRANDS.map((b) => ({
      key: `brand-${b.id}`, kind: 'brand', size: 'tall', types: brandTypes(b),
      tag: brandTypes(b)[0], title: b.name, subtitle: b.subtitle, accent: b.accent,
      cover: `/generated/projects/${b.id}/cover.webp`,
      fallback: getBrandAssetPath(b, b.featured), slug: b.id, year: b.year,
    })),
    {
      key: 'ai-posts', kind: 'posts', size: 'tall', types: ['AI Posts'],
      tag: 'AI Posts', title: 'AI SOCIAL SYSTEM', subtitle: 'Daily AI-generated posts',
      images: AI_POSTS.map((p) => p.src),
    },
  ];
  const feed = [];
  while (wides.length || talls.length) {
    if (wides.length) feed.push(wides.shift());
    if (talls.length) feed.push(talls.shift());
    if (talls.length) feed.push(talls.shift());
  }
  return feed;
}

const FEED = buildFeed();

function CardMedia({ item, reduced }) {
  if (item.kind === 'video') {
    return (
      <video
        className="work-media"
        src={item.src}
        poster={item.poster}
        autoPlay={!reduced}
        muted
        loop
        playsInline
        preload="metadata"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    );
  }
  if (item.kind === 'posts') {
    return (
      <div className="work-media" style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, padding: 4 }}>
        {item.images.slice(0, 4).map((src) => (
          <img
            key={src}
            src={src}
            alt="AI post"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10 }}
          />
        ))}
      </div>
    );
  }
  return (
    <img
      className="work-media"
      src={item.cover}
      alt={item.title}
      loading="lazy"
      onError={(e) => {
        if (!e.currentTarget.dataset.fb) { e.currentTarget.dataset.fb = 1; e.currentTarget.src = item.fallback; }
        else e.currentTarget.style.display = 'none';
      }}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}

export default function Work() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All Work');
  const [modal, setModal] = useState(null);
  const reduced = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    document.title = 'Selected Work | AYESMAJ Studios';
    window.scrollTo(0, 0);
    const f = new URLSearchParams(window.location.search).get('f');
    if (f === 'Branding & Identity') {
      navigate('/Branding', { replace: true });
      return;
    }
    if (f && FILTERS.includes(f)) setFilter(f);
  }, [navigate]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => e.key === 'Escape' && setModal(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modal]);

  const items = filter === 'All Work' ? FEED : FEED.filter((i) => i.types.includes(filter));
  const section = { maxWidth: 1380, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' };

  return (
    <div style={{ background: '#0D0F0E', minHeight: '100vh', overflowX: 'clip', position: 'relative', color: '#F6F3ED' }}>
      <Seo
        title="Selected Work | AYESMAJ Studios"
        description="Selected work from AYESMAJ Studios — brand identities, cinematic websites, AI campaigns, and 3D worlds built from concept to launch."
        path="/Work"
      />
      <style>{`
        .work-grid { display: grid; grid-template-columns: repeat(6, 1fr); grid-auto-flow: dense; gap: clamp(14px, 1.8vw, 24px); }
        .work-card--wide { grid-column: span 4; aspect-ratio: 16/9; }
        .work-card--tall { grid-column: span 2; aspect-ratio: 4/5; }
        @media (max-width: 980px) {
          .work-card--wide { grid-column: span 6; }
          .work-card--tall { grid-column: span 3; }
        }
        @media (max-width: 560px) {
          .work-card--tall { grid-column: span 6; }
        }
        .work-card { position: relative; border-radius: 22px; overflow: hidden; cursor: pointer; background: #141715; border: 1px solid rgba(255,255,255,0.07); transition: transform .5s cubic-bezier(.22,1,.36,1), border-color .5s ease, box-shadow .5s ease; }
        .work-card:hover { transform: translateY(-6px); border-color: rgba(216,183,90,0.35); box-shadow: 0 24px 60px rgba(0,0,0,0.5), 0 0 40px rgba(122,72,255,0.08); }
        .work-media { transition: transform .8s cubic-bezier(.22,1,.36,1); }
        .work-card:hover .work-media { transform: scale(1.06); }
      `}</style>

      {/* soft vignette */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 45%), radial-gradient(90% 70% at 50% 110%, rgba(122,72,255,0.05) 0%, transparent 55%)' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <AyesmajNav />

        <main>
          {/* HERO */}
          <section style={{ ...section, paddingTop: 'clamp(140px,16vw,200px)', paddingBottom: 'clamp(40px,5vw,72px)' }}>
            <SectionHeader
              as="h1"
              align="left"
              max={980}
              eyebrow="SELECTED WORK"
              title={<>DIGITAL WORLDS BUILT TO BE{' '}<span style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>REMEMBERED</span></>}
              subtitle="Brands, films, websites and AI systems — one gallery, no filler."
              accent={GOLD}
            />
          </section>

          {/* FILTERS */}
          <section style={{ ...section, paddingBottom: 'clamp(32px,4vw,48px)' }}>
            <motion.div {...fade(0.05)} style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {FILTERS.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{
                      position: 'relative',
                      borderRadius: 999,
                      padding: 1,
                      border: 'none',
                      background: active ? GRADIENT : 'rgba(255,255,255,0.10)',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-block',
                        borderRadius: 999,
                        padding: '10px 20px',
                        background: '#0D0F0E',
                        fontFamily: FONTS.ui,
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        ...(active
                          ? { backgroundImage: 'linear-gradient(#0D0F0E,#0D0F0E)', color: 'transparent', WebkitBackgroundClip: 'padding-box' }
                          : { color: '#AAA39A' }),
                      }}
                    >
                      {active ? (
                        <span style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{f}</span>
                      ) : (
                        f
                      )}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </section>

          {/* GALLERY */}
          <section style={{ ...section, paddingBottom: 'clamp(64px,8vw,120px)' }}>
            <div className="work-grid">
              {items.map((item, i) => (
                <motion.div
                  key={item.key}
                  {...fade(Math.min(i, 5) * 0.05)}
                  className={`work-card work-card--${item.size}`}
                  onClick={() =>
                    item.kind === 'brand'
                      ? navigate(`/BrandDetail?slug=${item.slug}`)
                      : setModal(item)
                  }
                >
                  {/* gradient fallback behind media (brand accent or purple/gold) */}
                  <div aria-hidden style={{ position: 'absolute', inset: 0, background: `radial-gradient(120% 120% at 30% 20%, ${item.accent ? `${item.accent}22` : 'rgba(122,72,255,0.12)'} 0%, #141715 70%)` }} />
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <CardMedia item={item} reduced={reduced} />
                  </div>
                  {/* dark overlay for text */}
                  <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.28) 32%, transparent 60%)' }} />
                  <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 'clamp(16px,2vw,24px)' }}>
                    <p style={{ fontFamily: FONTS.ui, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: GOLD, margin: '0 0 8px' }}>
                      {item.tag}
                    </p>
                    <h3 style={{ fontFamily: FONTS.display, fontSize: 'clamp(18px,1.8vw,26px)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.01em', lineHeight: 1.02, color: '#F6F3ED', margin: '0 0 4px' }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: FONTS.ui, fontSize: 13, color: '#D7D1C8', margin: 0 }}>
                      {item.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ ...section, paddingBottom: 'clamp(80px,10vw,140px)', textAlign: 'center' }}>
            <motion.div {...fade(0.1)}>
              <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(30px,4.6vw,64px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.98, color: '#F6F3ED', margin: '0 0 28px' }}>
                Your Brand Could Be Next
              </h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <CinematicButton label="Start a Project" accent={GOLD} size="lg" onClick={() => navigate('/Contact')} />
              </div>
            </motion.div>
          </section>
        </main>

        <AyesmajFooter />
      </div>

      {/* MODAL — larger video / posts view */}
      {modal && (
        <div
          onClick={() => setModal(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(5,5,5,0.88)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(16px,4vw,48px)' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'relative', width: 'min(1100px,100%)', borderRadius: 24, overflow: 'hidden', background: '#141715', border: '1px solid rgba(255,255,255,0.09)' }}
          >
            <button
              onClick={() => setModal(null)}
              aria-label="Close"
              style={{ position: 'absolute', top: 14, right: 14, zIndex: 2, width: 40, height: 40, borderRadius: 999, border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(5,5,5,0.6)', color: '#F6F3ED', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
            {modal.kind === 'video' ? (
              <video
                src={modal.src}
                poster={modal.poster}
                autoPlay={!reduced}
                muted
                loop
                controls
                playsInline
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 8, padding: 8, maxHeight: '70vh', overflowY: 'auto' }}>
                {modal.images.map((src) => (
                  <img key={src} src={src} alt="AI post" onError={(e) => { e.currentTarget.style.display = 'none'; }} style={{ width: '100%', borderRadius: 12, display: 'block' }} />
                ))}
              </div>
            )}
            <div style={{ padding: '16px 22px 20px' }}>
              <p style={{ fontFamily: FONTS.ui, fontSize: 10.5, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: GOLD, margin: '0 0 6px' }}>{modal.tag}</p>
              <h3 style={{ fontFamily: FONTS.display, fontSize: 'clamp(20px,2.4vw,30px)', fontWeight: 800, textTransform: 'uppercase', color: '#F6F3ED', margin: 0 }}>{modal.title}</h3>
              <p style={{ fontFamily: FONTS.ui, fontSize: 13.5, color: '#AAA39A', margin: '6px 0 0' }}>{modal.subtitle}</p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
