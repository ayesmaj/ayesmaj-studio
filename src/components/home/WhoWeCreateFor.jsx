import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    id: 1,
    title: 'PRODUCT BRANDS',
    image: '/images/cat-product-brands.webp',
    desc: 'Elevating everyday products into visual icons',
  },
  {
    id: 2,
    title: 'LUXURY GOODS',
    image: '/images/cat-luxury.webp',
    desc: 'Crafting desire through cinematic detail',
  },
  {
    id: 3,
    title: 'TECH & STARTUPS',
    image: '/images/cat-tech.webp',
    desc: 'Translating innovation into compelling visuals',
  },
  {
    id: 4,
    title: 'FASHION & BEAUTY',
    image: '/images/cat-fashion.webp',
    desc: 'Where aesthetics meet storytelling',
  },
  {
    id: 5,
    title: 'ARCHITECTURE',
    image: '/images/cat-architecture.webp',
    desc: 'Bringing structures to life before they exist',
  },
  {
    id: 6,
    title: 'GLOBAL CAMPAIGNS',
    image: '/images/cat-luxury-2.webp',
    desc: 'World-class visuals for international reach',
  },
];

function GoldParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: 'rgba(200, 163, 78, 0.6)',
            boxShadow: '0 0 4px rgba(200, 163, 78, 0.4)',
          }}
          animate={{ y: [-12, 12, -12], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function CategoryCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        aspectRatio: '1/1',
        boxShadow: hovered
          ? '0 0 40px rgba(200, 163, 78, 0.18), 0 20px 60px rgba(0,0,0,0.7)'
          : '0 8px 40px rgba(0,0,0,0.6)',
        border: hovered ? '1px solid rgba(200,163,78,0.25)' : '1px solid rgba(255,255,255,0.06)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0px)',
        transition: 'transform 0.5s ease, box-shadow 0.5s ease, border 0.5s ease',
      }}
    >
      {/* Image wrapper */}
      <div style={{ height: '100%', width: '100%', position: 'absolute', top: 0 }}>
        <img
          src={item.image}
          alt={item.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.6s ease',
            filter: 'brightness(0.85) saturate(1)',
          }}
        />
      </div>

      {/* Emerald rim light */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered
            ? 'radial-gradient(ellipse at 50% 100%, rgba(0, 196, 106, 0.12) 0%, transparent 70%)'
            : 'radial-gradient(ellipse at 50% 100%, rgba(0, 196, 106, 0.05) 0%, transparent 60%)',
          transition: 'background 0.5s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Bottom text gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 45%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Gold bloom on hover */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid rgba(200,163,78,0.3)',
            borderRadius: 18,
            boxShadow: 'inset 0 0 30px rgba(200,163,78,0.06)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Card text */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 22px' }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginBottom: 6, letterSpacing: '0.1em' }}>
          {item.desc}
        </p>
        <h3 style={{
          color: '#fff',
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: '0.12em',
          marginBottom: 8,
          lineHeight: 1.2,
        }}>
          {item.title}
        </h3>
        {/* Animated gold underline */}
        <motion.div
          style={{ height: 1.5, background: 'linear-gradient(90deg, #C8A34F, transparent)', borderRadius: 2 }}
          animate={{ width: hovered ? '60%' : '24px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

export default function WhoWeCreateFor() {
  return (
    <section
      style={{
        background: '#050705',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 0 140px',
      }}
    >
      {/* Blend from previous section */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 120,
        background: 'linear-gradient(to bottom, #0B0B0C, #050705)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Floating gold particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <GoldParticles />
      </div>

      {/* Emerald center radial glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 600,
        height: 300,
        background: 'radial-gradient(ellipse, rgba(0, 196, 106, 0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1280, margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <p style={{
            fontSize: 10,
            letterSpacing: '0.5em',
            color: '#C8A34F',
            textTransform: 'uppercase',
            marginBottom: 16,
            fontWeight: 600,
          }}>
            THE STUDIO
          </p>
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: '#e8f5ee',
            textShadow: '0 0 60px rgba(0,196,106,0.25)',
            lineHeight: 1.1,
            margin: 0,
          }}>
            WHO WE CREATE FOR?
          </h2>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
        }}
          className="who-grid"
        >
          {CATEGORIES.map((item, i) => (
            <CategoryCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Blend to next section */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        background: 'linear-gradient(to bottom, transparent, #0B0B0C)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      <style>{`
        @media (max-width: 768px) {
          .who-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .who-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}