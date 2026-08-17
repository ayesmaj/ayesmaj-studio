import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import CircuitBackground from '@/components/home/CircuitBackground';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowUpRight } from 'lucide-react';
import ProjectInquiries from '@/components/dashboard/ProjectInquiries';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const CLIENTS = [
  { name: 'ASHÉ Ritual Roast', industry: 'Food & Beverage', services: ['Brand Identity', 'Packaging', 'CGI'] },
  { name: "Angie's Boom Chicka Pop", industry: 'Food & Beverage', services: ['Packaging Design', 'CGI', 'Product Visualization'] },
  { name: 'NOAM Audio', industry: 'Consumer Electronics', services: ['Product Visualization', 'CGI', 'Ad Creative'] },
  { name: 'Blenday', industry: 'Health & Wellness', services: ['Brand Identity', 'Packaging', 'CGI'] },
  { name: 'Aurelia Beauty', industry: 'Beauty', services: ['Brand Identity', 'Product Films'] },
  { name: 'Solaris Tech', industry: 'Technology', services: ['CGI', 'Motion Design'] },
  { name: 'Ember Group', industry: 'Real Estate', services: ['Brand Identity', 'Visual Design'] },
  { name: 'Vanta Foods', industry: 'Food & Beverage', services: ['Packaging', 'CGI'] },
  { name: 'Meridian Co.', industry: 'Services', services: ['Brand Identity', 'Campaign'] },
  { name: 'Apex Sports', industry: 'Sports', services: ['Product Films', '3D Animation'] },
  { name: 'Nova Labs', industry: 'Tech', services: ['Motion Design', 'Brand Identity'] },
  { name: 'Zenith Brands', industry: 'Retail', services: ['Visual Identity', 'CGI'] },
];

const TESTIMONIALS = [
  {
    quote: 'AYESMAJ elevated our brand from a simple product to a full cinematic experience. The quality is unmatched.',
    name: 'Sophia R.',
    role: 'CMO, ASHÉ Ritual Roast',
  },
  {
    quote: 'The CGI packaging work they did for us drove a 40% increase in shelf pickup. Truly premium output.',
    name: 'Marcus T.',
    role: 'Brand Director, Angie\'s Boom Chicka Pop',
  },
  {
    quote: 'Working with AYESMAJ feels like working with a Hollywood studio. Every frame is intentional.',
    name: 'Laila K.',
    role: 'Creative Lead, NOAM Audio',
  },
];

export default function Clients() {
  useEffect(() => {
    document.title = 'Clients — AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#030303', minHeight: '100vh', overflowX: 'hidden' }}>
      <CircuitBackground />
      <AyesmajNav />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#FFB000' }}>Trusted By</p>
            <h1 className="text-5xl md:text-7xl text-white mb-4"
              style={{ fontFamily: "'Anton', sans-serif", fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.01em' }}>Our Clients</h1>
            <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Brands who chose to elevate their visual presence with cinematic craft.
            </p>
          </motion.div>

          {/* Client grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-24">
            {CLIENTS.map((client, i) => (
              <motion.div key={client.name} {...fade(i * 0.04)}
                className="rounded-2xl p-6 flex flex-col gap-3 transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,176,0,0.1)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(179,255,63,0.3)'; e.currentTarget.style.background = 'rgba(179,255,63,0.03)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(179,255,63,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,176,0,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.boxShadow = ''; }}
              >
                <div className="text-xs tracking-widest uppercase font-bold" style={{ color: '#FFB000' }}>{client.industry}</div>
                <div className="text-white font-black text-base">{client.name}</div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {client.services.map(s => (
                    <span key={s} className="text-[9px] px-2 py-0.5 rounded-full font-bold tracking-widest uppercase"
                      style={{ background: 'rgba(255,176,0,0.07)', border: '1px solid rgba(255,176,0,0.15)', color: 'rgba(255,176,0,0.6)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonials */}
          <motion.div {...fade(0.1)} className="mb-20">
            <p className="text-xs tracking-[0.5em] uppercase mb-4 text-center" style={{ color: '#FFB000' }}>What They Say</p>
            <h2 className="text-3xl md:text-4xl text-white text-center mb-12"
              style={{ fontFamily: "'Anton', sans-serif", fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.01em' }}>Client Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <motion.div key={i} {...fade(0.1 + i * 0.1)}
                  className="rounded-2xl p-8"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,176,0,0.1)' }}
                >
                  <div className="text-3xl mb-4" style={{ color: '#FFB000' }}>"</div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.6)' }}>{t.quote}</p>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-xs tracking-wider" style={{ color: 'rgba(255,176,0,0.6)' }}>{t.role}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div {...fade(0.2)} className="text-center mb-24">
            <p className="text-lg mb-6" style={{ color: 'rgba(255,255,255,0.5)' }}>Ready to join them?</p>
            <Link to={createPageUrl('Contact')}
              className="inline-flex items-center gap-2 px-10 py-4 rounded-full font-black text-sm tracking-widest uppercase transition-all duration-300"
              style={{ background: 'rgba(179,255,63,0.1)', border: '1px solid rgba(179,255,63,0.5)', color: '#B3FF3F', minHeight: '52px' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(179,255,63,0.25)'; e.currentTarget.style.background = 'rgba(179,255,63,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.background = 'rgba(179,255,63,0.1)'; }}
            >
              Start a Project <ArrowUpRight size={16} />
            </Link>
          </motion.div>

          {/* Project Inquiries Dashboard */}
          <motion.div {...fade(0.25)} className="border-t border-white/[0.1] pt-24">
            <ProjectInquiries />
          </motion.div>
          </div>
          </main>

      <AyesmajFooter />
    </div>
  );
}
