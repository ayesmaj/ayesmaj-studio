import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowUpRight, ExternalLink } from 'lucide-react';

/* ─── Brand Data ──────────────────────────────────────────────── */
const BRANDS = [
  {
    id: 'ashe',
    name: "ASHÉ",
    subtitle: "Ritual Roast",
    category: "Brand Identity & Campaign",
    accent: "#C8922A",
    description:
      "Ancient Fire. Modern Ritual. A cinematic brand identity for an artisan coffee roaster — blending sacred symbolism with premium product storytelling.",
    images: ['1.png','2.png','3.png','4.png','5.png'],
    videos: [],
    featured: '1.png',
  },
  {
    id: 'boom-chica',
    name: "BOOM CHICKA POP",
    subtitle: "Product Campaign",
    category: "Product Visualization",
    accent: "#E91E8C",
    description:
      "High-energy product campaign for Angie's Boom Chicka Pop — vibrant compositions that pop off the screen and drive irresistible appetite appeal.",
    images: ['1.png','2.png','3.png'],
    videos: [],
    featured: '1.png',
  },
  {
    id: 'lacroix',
    name: "LaCROIX",
    subtitle: "Sparkling Water",
    category: "Product Visualization",
    accent: "#5BCA6A",
    description:
      "Fresh, dynamic product visualization for LaCroix sparkling water — clean compositions with cinematic liquid motion and explosive color.",
    images: ['1.png'],
    videos: [],
    featured: '1.png',
  },
  {
    id: 'blenday',
    name: "BLENDAY",
    subtitle: "Blend the Day",
    category: "Brand Identity + Motion",
    accent: "#9B59B6",
    description:
      "Full brand identity and motion graphics for BLENDAY frozen fruit blends — bold color, kinetic energy, and lifestyle-driven visual storytelling.",
    images: ['1.png','2.png','3.png','4.png','5.png'],
    videos: ['6.mp4','7.mp4'],
    featured: '1.png',
  },
  {
    id: 'characters',
    name: "CHARACTER DESIGN",
    subtitle: "CGI & Brand Mascots",
    category: "3D Character Animation",
    accent: "#FFD700",
    description:
      "AI-powered character creation and brand mascot development — from concept to fully realized 3D characters with personality, presence, and cultural resonance.",
    images: ['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png'],
    videos: [],
    featured: '2.png',
  },
  {
    id: 'noam',
    name: "NOAM",
    subtitle: "Cinematic Production",
    category: "Motion + Film",
    accent: "#E8E8E8",
    description:
      "Studio-grade cinematic product visualization and motion production — dramatic lighting, precision staging, and film-quality post-production.",
    images: ['1.png','2.png','3.jpeg'],
    videos: [],
    featured: '1.png',
  },
  {
    id: 'interior-design',
    name: "INTERIOR DESIGN",
    subtitle: "Architectural Visualization",
    category: "3D Visualization",
    accent: "#D2A679",
    description:
      "Photorealistic architectural visualization for luxury residential and commercial spaces — bringing blueprints to life with cinematic precision and warmth.",
    images: ['1.jpeg','2.jpeg','3.jpeg','4.jpeg','5.jpeg','6.jpeg','7.jpeg','8.jpeg'],
    videos: [],
    featured: '1.jpeg',
  },
  {
    id: 'logos',
    name: "BRAND IDENTITIES",
    subtitle: "Logo Design Portfolio",
    category: "Branding",
    accent: "#00C46A",
    description:
      "Logo design and complete brand identity systems — from concept to full visual language, built to command attention and communicate power.",
    images: ['1.png','2.jpeg','3.jpeg','4.jpeg','5.jpeg','6.jpeg','7.jpeg','8.jpeg'],
    videos: [],
    featured: '1.png',
  },
];

/* ─── Video Card ──────────────────────────────────────────────── */
function VideoCard({ src, brandId }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const inView = useInView(ref, { margin: '-10%' });
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;
    if (inView) {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  }, [inView]);

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-2xl"
      style={{ aspectRatio: '16/9', background: '#0a0a0a' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      <video
        ref={videoRef}
        src={`/brands/${brandId}/${src}`}
        muted
        loop
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,196,106,0.2)', border: '1.5px solid rgba(0,196,106,0.5)' }}
          >
            <Play size={24} fill="#00C46A" className="text-[#00C46A] ml-1" />
          </div>
        </div>
      )}
      <div className="absolute bottom-3 left-3 text-[9px] tracking-widest uppercase font-bold px-2 py-1 rounded"
        style={{ background: 'rgba(0,0,0,0.6)', color: '#00C46A' }}>
        Motion
      </div>
    </motion.div>
  );
}

/* ─── Image Card ─────────────────────────────────────────────── */
function ImageCard({ src, brandId, accent, delay = 0, large = false }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-5%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-2xl group"
      style={{
        aspectRatio: large ? '4/3' : '1/1',
        background: '#0a100b',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
      whileHover={{ scale: 1.03 }}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black animate-pulse" />
      )}
      <img
        src={`/brands/${brandId}/${src}`}
        alt=""
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ opacity: loaded ? 1 : 0 }}
      />
      {/* Glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: `inset 0 0 40px ${accent}15` }}
      />
    </motion.div>
  );
}

/* ─── Brand Section ──────────────────────────────────────────── */
function BrandSection({ brand, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const num = String(index + 1).padStart(2, '0');
  const isEven = index % 2 === 0;

  const galleryImages = brand.images.filter(img => img !== brand.featured);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 px-6 overflow-hidden"
      style={{ borderTop: `1px solid rgba(255,255,255,0.04)` }}
    >
      {/* Accent glow blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${brand.accent}08 0%, transparent 70%)`,
          top: '50%',
          [isEven ? 'right' : 'left']: '-200px',
          transform: 'translateY(-50%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Header row */}
        <div className="flex items-start justify-between mb-12 flex-wrap gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase mb-2" style={{ color: brand.accent }}>
              {num} — {brand.category}
            </p>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none text-white"
              style={{ letterSpacing: '-0.03em' }}
            >
              {brand.name}
            </h2>
            <p className="text-sm tracking-widest uppercase mt-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
              {brand.subtitle}
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-xs text-sm leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            {brand.description}
          </motion.p>
        </div>

        {/* Hero + Gallery layout */}
        <div className={`grid gap-4 mb-6 ${isEven ? '' : ''}`}>
          {/* Featured hero */}
          <div className={`grid gap-4 ${galleryImages.length > 0 ? 'grid-cols-1 lg:grid-cols-5' : 'grid-cols-1'}`}>
            {/* Hero image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`relative overflow-hidden rounded-3xl group ${galleryImages.length > 0 ? 'lg:col-span-3' : ''}`}
              style={{
                aspectRatio: '16/9',
                border: `1px solid ${brand.accent}20`,
                boxShadow: `0 0 60px ${brand.accent}08`,
              }}
              whileHover={{ scale: 1.01 }}
            >
              <img
                src={`/brands/${brand.id}/${brand.featured}`}
                alt={brand.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Corner accent */}
              <div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(90deg, ${brand.accent}, transparent)` }}
              />
              <div className="absolute top-4 left-4">
                <span
                  className="text-[9px] tracking-widest uppercase font-bold px-3 py-1.5 rounded-full"
                  style={{ background: `${brand.accent}20`, color: brand.accent, border: `1px solid ${brand.accent}30` }}
                >
                  Featured
                </span>
              </div>
            </motion.div>

            {/* Side gallery (up to 4 images) */}
            {galleryImages.length > 0 && (
              <div className="lg:col-span-2 grid grid-cols-2 gap-3">
                {galleryImages.slice(0, 4).map((img, i) => (
                  <ImageCard key={img} src={img} brandId={brand.id} accent={brand.accent} delay={0.2 + i * 0.08} />
                ))}
              </div>
            )}
          </div>

          {/* Extra gallery row if more images */}
          {galleryImages.length > 4 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-1">
              {galleryImages.slice(4).map((img, i) => (
                <ImageCard key={img} src={img} brandId={brand.id} accent={brand.accent} delay={0.4 + i * 0.06} large />
              ))}
            </div>
          )}
        </div>

        {/* Video row */}
        {brand.videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
            className={`grid gap-4 ${brand.videos.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}
          >
            {brand.videos.map(v => (
              <VideoCard key={v} src={v} brandId={brand.id} />
            ))}
          </motion.div>
        )}

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 h-px origin-left"
          style={{ background: `linear-gradient(90deg, ${brand.accent}40, transparent)` }}
        />
      </div>
    </section>
  );
}

/* ─── Portfolio Hero ─────────────────────────────────────────── */
function PortfolioHero() {
  return (
    <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs tracking-[0.6em] uppercase mb-6" style={{ color: '#00C46A' }}>
          Our Work
        </p>
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none mb-6"
          style={{ letterSpacing: '-0.04em' }}
        >
          Brand
          <span
            className="block"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundImage: 'linear-gradient(135deg, #C8922A 0%, #FFD700 50%, #C8922A 100%)',
              backgroundClip: 'text',
            }}
          >
            Worlds.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Cinematic 3D · AI Video · Full Brand Identity — We don't create content, we build visual power.
        </p>

        {/* Stats row */}
        <div className="flex items-center justify-center gap-12 mt-16 flex-wrap">
          {[['8+','Brand Worlds'],['100+','Assets Delivered'],['3D + AI','Production Stack']].map(([val, lbl]) => (
            <div key={lbl} className="text-center">
              <p className="text-3xl font-black text-white" style={{ letterSpacing: '-0.03em' }}>{val}</p>
              <p className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>{lbl}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Decorative gradient line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,196,106,0.3))' }}
      />
    </section>
  );
}

/* ─── Main Export ────────────────────────────────────────────── */
export default function BrandingPortfolio() {
  return (
    <div style={{ background: '#080C09' }}>
      <PortfolioHero />
      {BRANDS.map((brand, i) => (
        <BrandSection key={brand.id} brand={brand} index={i} />
      ))}
      {/* Footer CTA */}
      <section className="py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#00C46A' }}>Start a Project</p>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6" style={{ letterSpacing: '-0.03em' }}>
            Ready to Build<br />Your Brand World?
          </h2>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, #C8922A, #FFD700)',
              color: '#000',
            }}
          >
            Let's Talk <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
