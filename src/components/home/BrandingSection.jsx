import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

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
    img: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&q=80',
  },
  {
    title: 'Boom Chicka Pop Bars',
    sub: 'Product Packaging · CGI Visualization',
    img: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80',
  },
  {
    title: 'ASHÉ Full Campaign',
    sub: 'Print · Digital · Motion',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    title: 'NOAM Audio',
    sub: 'Product Visualization · CGI · Ad Creative',
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80',
  },
  {
    title: 'Blenday',
    sub: 'Brand Identity · Packaging · CGI',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
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
            <motion.div key={b.title} {...fade(i * 0.12)}>
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer"
                style={{ aspectRatio: '3/4', border: '1px solid rgba(0,196,106,0.1)' }}>
                <img src={b.img} alt={b.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                {/* Gradient */}
                <div className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(11,15,12,0.95) 0%, rgba(11,15,12,0.3) 50%, transparent 100%)' }} />

                {/* Green top accent on hover */}
                <div className="absolute top-0 inset-x-0 h-px transition-opacity duration-300 group-hover:opacity-100 opacity-0"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,106,0.6), transparent)' }} />

                {/* Content */}
                <div className="absolute bottom-0 inset-x-0 p-6">
                  <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#00C46A' }}>{b.sub}</p>
                  <h3 className="text-white font-black text-xl mb-4">{b.title}</h3>
                  <Link to={createPageUrl('Branding')} className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase transition-all duration-300"
                    style={{ color: '#00C46A' }}
                    onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                    onMouseLeave={e => e.currentTarget.style.gap = '8px'}>
                    View Full Branding <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}