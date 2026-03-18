import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandingProjectBlock from './BrandingProjectBlock.jsx';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const FILTERS = ['All', 'Packaging', 'Product Visuals', 'Mascots', 'Campaigns', 'Visual Identity'];

export const PROJECTS = [
  {
    id: 1,
    slug: 'ashe-ritual-roast',
    brand: 'ASHÉ Ritual Roast',
    category: 'Visual Identity',
    desc: 'Full brand world for a premium artisan coffee label.',
    img: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    services: ['Brand Identity', 'Visual Design', 'Packaging', 'CGI'],
    overview: 'ASHÉ Ritual Roast is a premium artisan coffee brand built on spiritual ritual and sensory experience. We crafted a full brand world — from identity to packaging — that communicates depth, warmth, and craftsmanship.',
    gallery: [
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
    ],
  },
  {
    id: 2,
    slug: 'ashe-product-reveal',
    brand: 'ASHÉ Product Reveal',
    category: 'Product Visuals',
    desc: 'Cinematic 3D product reveal for Ritual Roast launch.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    services: ['CGI', '3D Animation', 'Product Visualization'],
    overview: 'A cinematic 3D product reveal created for the launch of ASHÉ Ritual Roast. The animation showcases the product in dramatic lighting with a focus on texture, material quality, and brand atmosphere.',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    ],
  },
  {
    id: 3,
    slug: 'ashe-full-campaign',
    brand: 'ASHÉ Full Campaign',
    category: 'Campaigns',
    desc: 'Multi-platform visual campaign spanning print and digital.',
    img: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
    services: ['Campaign Strategy', 'Print Design', 'Digital Assets', 'Motion'],
    overview: "A full multi-channel campaign for ASHÉ spanning print ads, digital banners, and social media content. Every piece was designed with a cinematic, ritualistic visual language to reflect the brand's identity.",
    gallery: [
      'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80',
      'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80',
    ],
  },
  {
    id: 4,
    slug: 'boom-chicka-pop-strawberry',
    brand: 'Boom Chicka Pop — Strawberry',
    category: 'Packaging',
    desc: "Vibrant CGI packaging for Angie's Boom Chicka Pop bars.",
    img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80',
    services: ['Packaging Design', 'CGI', 'Product Visualization'],
    overview: "CGI packaging visualization for Angie's Boom Chicka Pop Strawberry flavor. Vibrant berry tones and dynamic composition communicate freshness and flavor to retail audiences.",
    gallery: [
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80',
      'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80',
      'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
    ],
  },
  {
    id: 5,
    slug: 'boom-chicka-pop-lemon-cream',
    brand: 'Boom Chicka Pop — Lemon Cream',
    category: 'Packaging',
    desc: 'CGI product packaging with immersive ingredient scenes.',
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80',
    services: ['Packaging Design', 'CGI', 'Product Visualization'],
    overview: 'Lemon Cream flavor packaging for Boom Chicka Pop. Bright citrus palette and ingredient-led composition deliver an appetizing, premium product experience.',
    gallery: [
      'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=800&q=80',
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80',
    ],
  },
  {
    id: 6,
    slug: 'boom-chicka-pop-choc-fudge',
    brand: 'Boom Chicka Pop — Choc Fudge',
    category: 'Packaging',
    desc: 'Rich chocolate-toned packaging visualization.',
    img: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
    services: ['Packaging Design', 'CGI', 'Product Visualization'],
    overview: 'Deep chocolate and fudge tones dominate this CGI packaging visualization for Boom Chicka Pop. Rich textures and moody lighting enhance the indulgent character of the flavor.',
    gallery: [
      'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=800&q=80',
      'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80',
    ],
  },
  {
    id: 7,
    slug: 'bean-mascot',
    brand: 'Bean Mascot',
    category: 'Mascots',
    desc: '3D character design for ASHÉ brand storytelling.',
    img: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&q=80',
    services: ['Character Design', '3D Modeling', 'Brand Storytelling'],
    overview: 'A 3D mascot character designed to embody the spirit and personality of the ASHÉ brand. The Bean mascot serves as a playful yet premium ambassador across digital and social content.',
    gallery: [
      'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&q=80',
    ],
  },
  {
    id: 8,
    slug: 'noam-audio',
    brand: 'NOAM Audio',
    category: 'Product Visuals',
    desc: 'Premium product visualization for powersport audio brand.',
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
    services: ['Product Visualization', 'CGI', 'Ad Creative'],
    overview: 'High-end product visualization for NOAM Audio, a premium powersport speaker brand. Studio-quality CGI renders communicate the premium build quality and rugged aesthetic of the product line.',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80',
    ],
  },
  {
    id: 9,
    slug: 'blenday',
    brand: 'Blenday',
    category: 'Packaging',
    desc: 'Bold frozen fruit mix packaging with vibrant splash CGI.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    services: ['Packaging Design', 'CGI', 'Brand Identity'],
    overview: 'Blenday is a frozen fruit mix brand built for energy and color. The packaging design features vibrant splash CGI and bold typography, communicating freshness and vitality at retail.',
    gallery: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    ],
  },
];

export default function BrandingGrid() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section className="relative pt-16 pb-8 px-0">
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,163,78,0.12), transparent)' }} />

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div {...fade(0)} className="text-center mb-10">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#C8A44E' }}>Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Featured Brand Projects</h2>
        </motion.div>

        {/* Filter Pills */}
        <motion.div {...fade(0.1)} className="flex flex-wrap justify-center gap-3 mb-6">
          {FILTERS.map(f => (
            <motion.button
              key={f}
              onClick={() => setActive(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 py-2 rounded-full text-xs tracking-widest uppercase font-bold transition-all duration-300"
              style={{
                border: `1px solid ${active === f ? 'rgba(200,163,78,0.6)' : 'rgba(200,163,78,0.15)'}`,
                color: active === f ? '#C8A44E' : 'rgba(255,255,255,0.4)',
                background: active === f ? 'rgba(200,163,78,0.06)' : 'transparent',
                boxShadow: active === f ? '0 0 16px rgba(0,196,106,0.1)' : 'none',
              }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Project blocks — cinematic, stacked */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {filtered.map((project) => (
            <BrandingProjectBlock key={project.id} project={project} />
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-24 text-white/30 text-lg font-bold tracking-widest uppercase">
              No projects in this category yet.
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}