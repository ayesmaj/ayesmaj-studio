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
    img: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/0a0bd0596_ChatGPTImageFeb25202608_40_29PM-Copy.png',
  },
  {
    title: 'Boom Chicka Pop Bars',
    sub: 'Product Packaging · CGI Visualization',
    img: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/653171468_ChatGPTImageFeb25202608_40_04PM.png',
  },
  {
    title: 'ASHÉ Full Campaign',
    sub: 'Print · Digital · Motion',
    img: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/eed53e348_ChatGPTImageFeb25202608_40_33PM.png',
  },
  {
    title: 'NOAM Audio',
    sub: 'Product Visualization · CGI · Ad Creative',
    img: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/a803b8b9c_in_studio.png',
  },
  {
    title: 'Blenday',
    sub: 'Brand Identity · Packaging · CGI',
    img: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/cb541ac7e_ChatGPTImageJan26202609_38_37PM.png',
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