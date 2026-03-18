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
    img: '/brands/ashe/1.png',
    services: ['Brand Identity', 'Visual Design', 'Packaging', 'CGI'],
    overview: 'ASHÉ Ritual Roast is a premium artisan coffee brand built on spiritual ritual and sensory experience. We crafted a full brand world — from identity to packaging — that communicates depth, warmth, and craftsmanship.',
    gallery: [
      '/brands/ashe/1.png',
      '/brands/ashe/2.png',
      '/brands/ashe/3.png',
      '/brands/ashe/4.png',
    ],
  },
  {
    id: 2,
    slug: 'ashe-product-reveal',
    brand: 'ASHÉ Product Reveal',
    category: 'Product Visuals',
    desc: 'Cinematic 3D product reveal for Ritual Roast launch.',
    img: '/brands/ashe/3.png',
    services: ['CGI', '3D Animation', 'Product Visualization'],
    overview: 'A cinematic 3D product reveal created for the launch of ASHÉ Ritual Roast. The animation showcases the product in dramatic lighting with a focus on texture, material quality, and brand atmosphere.',
    gallery: [
      '/brands/ashe/3.png',
      '/brands/ashe/4.png',
      '/brands/ashe/5.png',
    ],
  },
  {
    id: 3,
    slug: 'ashe-full-campaign',
    brand: 'ASHÉ Full Campaign',
    category: 'Campaigns',
    desc: 'Multi-platform visual campaign spanning print and digital.',
    img: '/brands/ashe/5.png',
    services: ['Campaign Strategy', 'Print Design', 'Digital Assets', 'Motion'],
    overview: "A full multi-channel campaign for ASHÉ spanning print ads, digital banners, and social media content. Every piece was designed with a cinematic, ritualistic visual language to reflect the brand's identity.",
    gallery: [
      '/brands/ashe/5.png',
      '/brands/ashe/1.png',
      '/brands/ashe/2.png',
    ],
  },
  {
    id: 4,
    slug: 'boom-chicka-pop-strawberry',
    brand: 'Boom Chicka Pop — Strawberry',
    category: 'Packaging',
    desc: "Vibrant CGI packaging for Angie's Boom Chicka Pop bars.",
    img: '/brands/boom-chica/1.png',
    services: ['Packaging Design', 'CGI', 'Product Visualization'],
    overview: "CGI packaging visualization for Angie's Boom Chicka Pop Strawberry flavor. Vibrant berry tones and dynamic composition communicate freshness and flavor to retail audiences.",
    gallery: [
      '/brands/boom-chica/1.png',
      '/brands/boom-chica/2.png',
      '/brands/boom-chica/3.png',
    ],
  },
  {
    id: 5,
    slug: 'boom-chicka-pop-lemon-cream',
    brand: 'Boom Chicka Pop — Lemon Cream',
    category: 'Packaging',
    desc: 'CGI product packaging with immersive ingredient scenes.',
    img: '/brands/boom-chica/2.png',
    services: ['Packaging Design', 'CGI', 'Product Visualization'],
    overview: 'Lemon Cream flavor packaging for Boom Chicka Pop. Bright citrus palette and ingredient-led composition deliver an appetizing, premium product experience.',
    gallery: [
      '/brands/boom-chica/2.png',
      '/brands/boom-chica/3.png',
    ],
  },
  {
    id: 6,
    slug: 'boom-chicka-pop-choc-fudge',
    brand: 'Boom Chicka Pop — Choc Fudge',
    category: 'Packaging',
    desc: 'Rich chocolate-toned packaging visualization.',
    img: '/brands/boom-chica/3.png',
    services: ['Packaging Design', 'CGI', 'Product Visualization'],
    overview: 'Deep chocolate and fudge tones dominate this CGI packaging visualization for Boom Chicka Pop. Rich textures and moody lighting enhance the indulgent character of the flavor.',
    gallery: [
      '/brands/boom-chica/3.png',
      '/brands/boom-chica/1.png',
    ],
  },
  {
    id: 7,
    slug: 'character-design',
    brand: 'Character Design',
    category: 'Mascots',
    desc: '3D CGI character designs for brand storytelling.',
    img: '/brands/characters/1.png',
    services: ['Character Design', '3D Modeling', 'Brand Storytelling'],
    overview: 'A series of 3D CGI characters designed to embody distinct brand personalities. Each character is crafted with detail, expression, and purpose — built to serve as premium ambassadors across digital and social content.',
    gallery: [
      '/brands/characters/1.png',
      '/brands/characters/2.png',
      '/brands/characters/3.png',
      '/brands/characters/4.png',
      '/brands/characters/5.png',
      '/brands/characters/6.png',
      '/brands/characters/7.png',
      '/brands/characters/8.png',
    ],
  },
  {
    id: 8,
    slug: 'noam-audio',
    brand: 'NOAM Audio',
    category: 'Product Visuals',
    desc: 'Premium product visualization for powersport audio brand.',
    img: '/brands/noam/1.png',
    services: ['Product Visualization', 'CGI', 'Ad Creative'],
    overview: 'High-end product visualization for NOAM Audio, a premium powersport speaker brand. Studio-quality CGI renders communicate the premium build quality and rugged aesthetic of the product line.',
    gallery: [
      '/brands/noam/1.png',
      '/brands/noam/2.png',
      '/brands/noam/3.jpeg',
    ],
  },
  {
    id: 9,
    slug: 'blenday',
    brand: 'Blenday',
    category: 'Packaging',
    desc: 'Bold frozen fruit mix packaging with vibrant splash CGI.',
    img: '/brands/blenday/1.png',
    services: ['Packaging Design', 'CGI', 'Brand Identity'],
    overview: 'Blenday is a frozen fruit mix brand built for energy and color. The packaging design features vibrant splash CGI and bold typography, communicating freshness and vitality at retail.',
    gallery: [
      '/brands/blenday/1.png',
      '/brands/blenday/2.png',
      '/brands/blenday/3.png',
      '/brands/blenday/4.png',
      '/brands/blenday/5.png',
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