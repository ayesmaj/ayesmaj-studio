import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const LOGO_URL = '/logo.png';

const LINKS = [
  { label: 'Work',     page: 'Work' },
  { label: 'Branding', page: 'Branding' },
  { label: 'Reel',     page: 'Reel' },
  { label: 'About',    page: 'About' },
  { label: 'Pricing',  page: 'Pricing' },
];

export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (page) => location.pathname === createPageUrl(page);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(7,16,10,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(22px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(200,164,78,0.1)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[70px]">

          <Link to={createPageUrl('Home')} className="flex items-center">
            <img
              src={LOGO_URL}
              alt="AYESMAJ Studios"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {LINKS.map((l) => {
              const active = isActive(l.page);
              return (
                <Link
                  key={l.label}
                  to={createPageUrl(l.page)}
                  className="relative pb-0.5 group"
                  style={{
                    fontFamily: "'Satoshi', system-ui, sans-serif",
                    fontSize: '11px', letterSpacing: '0.18em',
                    textTransform: 'uppercase', fontWeight: 600,
                    color: active ? '#C8A44E' : 'rgba(248,250,252,0.42)',
                    transition: 'color 0.3s',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#F8FAFC'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(248,250,252,0.42)'; }}
                >
                  {l.label}
                  <span
                    className="absolute bottom-0 left-0 h-px transition-all duration-300"
                    style={{ background: '#C8A44E', width: active ? '100%' : '0' }}
                  />
                  {!active && (
                    <span
                      className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                      style={{ background: 'rgba(200,164,78,0.5)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <Link
            to={createPageUrl('Contact')}
            className="hidden lg:flex items-center gap-2 transition-all duration-300"
            style={{
              fontFamily: "'Satoshi', system-ui, sans-serif",
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', fontWeight: 700,
              padding: '10px 22px', borderRadius: '100px', minHeight: '44px',
              border: '1px solid rgba(200,164,78,0.4)',
              color: '#C8A44E',
              background: 'rgba(200,164,78,0.05)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(200,164,78,0.14)';
              e.currentTarget.style.boxShadow = '0 0 22px rgba(200,164,78,0.22)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(200,164,78,0.05)';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            Start a Project
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-white p-1"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile backdrop */}
      <div
        className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300"
        onClick={() => setOpen(false)}
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          visibility: open ? 'visible' : 'hidden',
        }}
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 flex flex-col px-8 pt-28 pb-10"
            style={{
              background: 'rgba(7,16,10,0.98)',
              backdropFilter: 'blur(22px)',
              borderLeft: '1px solid rgba(200,164,78,0.1)',
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,78,0.35), transparent)' }}
            />
            <nav className="flex flex-col gap-2 mb-auto">
              {LINKS.map((l, i) => (
                <Link key={l.label} to={createPageUrl(l.page)} onClick={() => setOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="py-4 text-2xl font-black transition-colors border-b"
                    style={{
                      fontFamily: "'Satoshi', system-ui, sans-serif",
                      borderColor: 'rgba(255,255,255,0.04)',
                      color: isActive(l.page) ? '#C8A44E' : 'white',
                    }}
                  >
                    {l.label}
                  </motion.div>
                </Link>
              ))}
            </nav>
            <Link
              to={createPageUrl('Contact')}
              onClick={() => setOpen(false)}
              className="py-4 rounded-2xl font-black text-lg tracking-widest uppercase text-white transition-all text-center"
              style={{
                fontFamily: "'Satoshi', system-ui, sans-serif",
                background: 'linear-gradient(135deg, #C8A44E, #9A7B3A)',
                minHeight: '44px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 40px rgba(200,164,78,0.35)',
              }}
            >
              Start a Project →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
