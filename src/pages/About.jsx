import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import CircuitBackground from '@/components/home/CircuitBackground';
import HomeNav from '@/components/home/HomeNav';
import HomeFooter from '@/components/home/HomeFooter';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowUpRight, Zap, Eye, Globe, Award } from 'lucide-react';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const STATS = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '50+', label: 'Global Brands' },
  { value: '8+', label: 'Years of Craft' },
  { value: '3', label: 'Studio Locations' },
];

const VALUES = [
  { icon: Eye, title: 'Cinematic Vision', desc: 'Every frame is designed like a film — intentional, atmospheric, and emotionally resonant.' },
  { icon: Zap, title: 'Craft Over Speed', desc: 'We move fast but never compromise quality. Every pixel earns its place.' },
  { icon: Globe, title: 'Global Perspective', desc: 'Studios in LA, London, and Dubai — giving us a truly international creative lens.' },
  { icon: Award, title: 'Brand Elevation', desc: 'We don\'t just make visuals. We build worlds around brands that demand attention.' },
];

export default function About() {
  useEffect(() => {
    document.title = 'About — AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#0B0F0C', minHeight: '100vh', overflowX: 'hidden' }}>
      <CircuitBackground />
      <HomeNav />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Hero */}
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="text-center mb-24">
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#C8A44E' }}>About the Studio</p>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-none mb-8">
              We Make Brands<br />
              <span style={{ WebkitTextStroke: '1px rgba(200,163,78,0.5)', color: 'transparent' }}>Unforgettable.</span>
            </h1>
            <p className="text-base md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              AYESMAJ Studios is a premium 3D animation and visual storytelling studio. We partner with brands globally to create cinematic experiences that command attention and drive results.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div {...fade(0.1)} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
            {STATS.map((s, i) => (
              <motion.div key={s.label} {...fade(0.1 + i * 0.08)}
                className="text-center rounded-2xl py-10 px-6"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(200,163,78,0.1)' }}
              >
                <div className="text-4xl md:text-5xl font-black mb-2" style={{ color: '#C8A44E' }}>{s.value}</div>
                <div className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div {...fade(0.1)}>
              <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#C8A44E' }}>Our Story</p>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Built on Craft, Driven by Obsession</h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                <p>Founded by a team of 3D artists, filmmakers, and brand strategists, AYESMAJ Studios was built from a single conviction: visual quality is a competitive advantage.</p>
                <p>We combine cutting-edge CGI technology with cinematic storytelling to create work that doesn't just look good — it performs.</p>
                <p>From premium product reveals to full brand world builds, every project we take on receives the same obsessive level of craft.</p>
              </div>
            </motion.div>
            <motion.div {...fade(0.2)}>
              <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3', border: '1px solid rgba(200,163,78,0.15)' }}>
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/6096cd13a_ChatGPTImageFeb25202608_40_31PM.png"
                  alt="AYESMAJ Studio" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(11,15,12,0.6) 0%, transparent 60%)' }} />
              </div>
            </motion.div>
          </div>

          {/* Values */}
          <motion.div {...fade(0.1)} className="mb-24">
            <p className="text-xs tracking-[0.5em] uppercase mb-4 text-center" style={{ color: '#C8A44E' }}>Our Values</p>
            <h2 className="text-3xl md:text-4xl font-black text-white text-center mb-12">What Drives Us</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VALUES.map((v, i) => {
                const Icon = v.icon;
                return (
                  <motion.div key={v.title} {...fade(0.1 + i * 0.1)}
                    className="rounded-2xl p-8 flex gap-6"
                    style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(200,163,78,0.1)' }}
                  >
                    <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(0,196,106,0.1)', border: '1px solid rgba(0,196,106,0.25)' }}>
                      <Icon size={18} color="#00C46A" />
                    </div>
                    <div>
                      <h3 className="text-white font-black text-base mb-2">{v.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div {...fade(0.2)} className="text-center">
            <h2 className="text-3xl font-black text-white mb-4">Ready to Work Together?</h2>
            <p className="mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>Tell us about your project and let's create something extraordinary.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl('Contact')}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-black text-sm tracking-widest uppercase transition-all duration-300"
                style={{ background: 'rgba(0,196,106,0.1)', border: '1px solid rgba(0,196,106,0.5)', color: '#00C46A', minHeight: '52px' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 30px rgba(0,196,106,0.25)'; e.currentTarget.style.background = 'rgba(0,196,106,0.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.background = 'rgba(0,196,106,0.1)'; }}
              >
                Start a Project <ArrowUpRight size={16} />
              </Link>
              <Link to={createPageUrl('Work')}
                className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-black text-sm tracking-widest uppercase transition-all duration-300"
                style={{ border: '1px solid rgba(200,163,78,0.3)', color: '#C8A44E', minHeight: '52px' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(200,163,78,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}