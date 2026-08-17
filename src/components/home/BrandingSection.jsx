import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const BLOCKS = [
  {
    title: 'ASHÉ Ritual Roast',
    sub: 'Brand Identity · Packaging Design',
    img: '/brands/ashe/1.webp',
    slug: 'ashe',
  },
  {
    title: 'Boom Chicka Pop',
    sub: 'Product Campaign · Art Direction',
    img: '/brands/boom-chica/1.webp',
    slug: 'boom-chica',
  },
  {
    title: 'LaCROIX',
    sub: 'CGI Commercial · 3D Render',
    img: '/brands/lacroix/3.webp',
    slug: 'lacroix',
  },
  {
    title: 'NOAM Audio',
    sub: 'Product Visualization · CGI · Ad Creative',
    img: '/brands/noam/1.webp',
    slug: 'noam',
  },
  {
    title: 'BLENDAY',
    sub: 'Brand Film · CGI · Motion',
    img: '/brands/blenday/1.webp',
    slug: 'blenday',
  },
];

export default function BrandingSection() {
  return (
    <section id="branding" className="relative py-32 px-6 overflow-hidden" style={{ background: 'transparent', scrollMarginTop: '90px' }}>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,106,0.08), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div {...fade(0)} className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#00C46A' }}>Branding</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Brand Visual Worlds</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {BLOCKS.map((b, i) => (
            <motion.div key={b.slug} {...fade(i * 0.12)}>
              <Link to={`/BrandDetail?slug=${b.slug}`}
                className="relative overflow-hidden rounded-2xl group cursor-pointer block"
                style={{ aspectRatio: '3/4', border: '1px solid rgba(0,196,106,0.1)' }}>
                <img src={b.img} alt={b.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                {/* Gradient */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(11,15,12,0.95) 0%, rgba(11,15,12,0.3) 50%, transparent 100%)' }} />

                {/* Top accent on hover */}
                <div className="absolute top-0 inset-x-0 h-px transition-opacity duration-300 group-hover:opacity-100 opacity-0"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,106,0.6), transparent)' }} />

                {/* Content */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#00C46A' }}>{b.sub}</p>
                  <h3 className="text-white font-black text-xl mb-4">{b.title}</h3>
                  <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-300 group-hover:gap-3"
                    style={{ color: '#00C46A' }}>
                    View Case Study <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}