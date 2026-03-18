import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Film, Palette, LayoutGrid,
  Coffee, Sparkles, Star, Leaf, Wine, Sandwich, Bug, Ghost, Home, Tag, Image, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BRANDS, BRAND_NAV_GROUPS } from '@/data/brands';

const LOGO_URL   = '/logo.png';
const GOLD       = '#C8A44E';
const GOLD_DIM   = 'rgba(200,164,78,0.42)';

const BRAND_ICONS = {
  'ashe':            <Coffee size={11} />,
  'blenday':         <Sparkles size={11} />,
  'boom-chica':      <Star size={11} />,
  'lacroix':         <Leaf size={11} />,
  'honey':           <Star size={11} />,
  'butterfly':       <Bug size={11} />,
  'paranormal':      <Ghost size={11} />,
  'pita-basta':      <Sandwich size={11} />,
  'baron-herzog':    <Wine size={11} />,
  'characters':      <User size={11} />,
  'noam':            <User size={11} />,
  'interior-design': <Home size={11} />,
  'logos':           <Tag size={11} />,
  'general':         <Image size={11} />,
};

const springTransition = {
  type: 'spring', mass: 0.5, damping: 11.5,
  stiffness: 100, restDelta: 0.001, restSpeed: 0.001,
};

// ── Mega-dropdown with brand tree ────────────────────────────────────────────
function WorkMenu({ closeMenu }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.93, y: 6 }}
      transition={springTransition}
      className="absolute left-1/2 -translate-x-1/2 mt-4 z-50 p-5 rounded-2xl shadow-2xl"
      style={{
        background: 'rgba(7,16,10,0.97)',
        backdropFilter: 'blur(24px)',
        border: `1px solid rgba(200,164,78,0.15)`,
        minWidth: 560,
        boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,164,78,0.08)`,
      }}
    >
      {/* Top quick-links */}
      <div className="flex gap-4 mb-4 pb-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        {[
          { label: 'Showreel',        icon: <Film size={12} />,      href: createPageUrl('Reel') },
          { label: 'All Brands',      icon: <LayoutGrid size={12} />, href: createPageUrl('Brands') },
          { label: 'Portfolio Gallery',icon: <Palette size={12} />,  href: createPageUrl('Branding') },
        ].map(item => (
          <Link key={item.label} to={item.href} onClick={closeMenu}
            className="flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors"
            style={{ color: GOLD_DIM }}
            onMouseEnter={e => e.currentTarget.style.color = GOLD}
            onMouseLeave={e => e.currentTarget.style.color = GOLD_DIM}
          >
            <span style={{ color: GOLD }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* Brand groups — 3 columns */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-0.5">
        {BRAND_NAV_GROUPS.map(group => (
          <div key={group.label}>
            <p className="text-[9px] font-bold tracking-[0.32em] uppercase mb-2.5"
              style={{ color: 'rgba(200,164,78,0.5)' }}>
              {group.label}
            </p>
            {group.brands.map(id => {
              const brand = BRANDS.find(b => b.id === id);
              if (!brand) return null;
              return (
                <Link key={id}
                  to={`/BrandDetail?slug=${id}`}
                  onClick={closeMenu}
                  className="flex items-center gap-1.5 py-[5px] text-xs font-medium transition-colors group"
                  style={{ color: 'rgba(248,250,252,0.42)',
                    fontFamily: "'Satoshi', system-ui, sans-serif",
                    letterSpacing: '0.02em' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F8FAFC'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(248,250,252,0.42)'}
                >
                  <span className="transition-colors" style={{ color: brand.accent, opacity: 0.75 }}>
                    {BRAND_ICONS[id]}
                  </span>
                  {brand.name}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Link to={createPageUrl('Contact')} onClick={closeMenu}
          className="flex items-center gap-1.5 text-xs transition-colors"
          style={{ color: 'rgba(200,164,78,0.45)' }}
          onMouseEnter={e => e.currentTarget.style.color = GOLD}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,164,78,0.45)'}
        >
          <ArrowRight size={11} /> Start a Project
        </Link>
      </div>
    </motion.div>
  );
}

// ── Main nav ─────────────────────────────────────────────────────────────────
export default function HomeNav() {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [workOpen, setWorkOpen]   = useState(false);
  const workRef                   = useRef(null);
  const location                  = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close Work dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (workRef.current && !workRef.current.contains(e.target)) setWorkOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isActive = (page) => location.pathname === createPageUrl(page);

  const plainLinks = [
    { label: 'Branding', page: 'Branding' },
    { label: 'Reel',     page: 'Reel' },
    { label: 'About',    page: 'About' },
    { label: 'Pricing',  page: 'Pricing' },
  ];

  const linkStyle = (active) => ({
    fontFamily: "'Satoshi', system-ui, sans-serif",
    fontSize: '11px', letterSpacing: '0.18em',
    textTransform: 'uppercase', fontWeight: 600,
    color: active ? GOLD : 'rgba(248,250,252,0.42)',
    transition: 'color 0.3s',
  });

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(7,16,10,0.90)' : 'transparent',
          backdropFilter: scrolled ? 'blur(22px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(200,164,78,0.1)'
            : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[70px]">

          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center">
            <img src={LOGO_URL} alt="AYESMAJ Studios"
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">

            {/* Work — with dropdown */}
            <div ref={workRef} className="relative"
              onMouseEnter={() => setWorkOpen(true)}
              onMouseLeave={() => setWorkOpen(false)}>
              <button
                className="relative pb-0.5 group"
                style={linkStyle(false)}
                onMouseEnter={e => e.currentTarget.style.color = '#F8FAFC'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(248,250,252,0.42)'}
              >
                Work
                <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                  style={{ background: 'rgba(200,164,78,0.5)' }} />
              </button>

              <AnimatePresence>
                {workOpen && (
                  <WorkMenu closeMenu={() => { setWorkOpen(false); setOpen(false); }} />
                )}
              </AnimatePresence>
            </div>

            {/* Plain links */}
            {plainLinks.map((l) => {
              const active = isActive(l.page);
              return (
                <Link key={l.label} to={createPageUrl(l.page)}
                  className="relative pb-0.5 group"
                  style={linkStyle(active)}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#F8FAFC'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'rgba(248,250,252,0.42)'; }}
                >
                  {l.label}
                  <span className="absolute bottom-0 left-0 h-px transition-all duration-300"
                    style={{ background: GOLD, width: active ? '100%' : '0' }} />
                  {!active && (
                    <span className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                      style={{ background: 'rgba(200,164,78,0.5)' }} />
                  )}
                </Link>
              );
            })}
          </div>

          {/* CTA */}
          <Link to={createPageUrl('Contact')}
            className="hidden lg:flex items-center gap-2 transition-all duration-300"
            style={{
              fontFamily: "'Satoshi', system-ui, sans-serif",
              fontSize: '11px', letterSpacing: '0.18em',
              textTransform: 'uppercase', fontWeight: 700,
              padding: '10px 22px', borderRadius: '100px', minHeight: '44px',
              border: `1px solid rgba(200,164,78,0.4)`,
              color: GOLD, background: 'rgba(200,164,78,0.05)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(200,164,78,0.14)';
              e.currentTarget.style.boxShadow  = '0 0 22px rgba(200,164,78,0.22)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(200,164,78,0.05)';
              e.currentTarget.style.boxShadow  = '';
            }}
          >
            Start a Project
          </Link>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-1" aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile backdrop */}
      <div className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300"
        onClick={() => setOpen(false)}
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          visibility: open ? 'visible' : 'hidden' }}
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 flex flex-col px-8 pt-28 pb-10 overflow-y-auto"
            style={{
              background: 'rgba(7,16,10,0.98)',
              backdropFilter: 'blur(22px)',
              borderLeft: '1px solid rgba(200,164,78,0.1)',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(200,164,78,0.35), transparent)' }} />

            <nav className="flex flex-col gap-2 mb-6">
              {/* Work expanded in mobile */}
              <div className="py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                <p className="text-2xl font-black text-white mb-4"
                  style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>
                  Work
                </p>
                {/* Quick links */}
                <div className="flex flex-col gap-2 mb-4 pl-2">
                  {[
                    { label: 'Showreel', href: createPageUrl('Reel') },
                    { label: 'All Brands', href: createPageUrl('Brands') },
                    { label: 'Portfolio', href: createPageUrl('Branding') },
                  ].map(item => (
                    <Link key={item.label} to={item.href} onClick={() => setOpen(false)}
                      className="text-sm font-semibold transition-colors"
                      style={{ color: GOLD_DIM }}
                      onMouseEnter={e => e.currentTarget.style.color = GOLD}
                      onMouseLeave={e => e.currentTarget.style.color = GOLD_DIM}
                    >
                      → {item.label}
                    </Link>
                  ))}
                </div>
                {/* Brand list */}
                <div className="pl-2 flex flex-col gap-1.5">
                  {BRANDS.map(brand => (
                    <Link key={brand.id}
                      to={`/BrandDetail?slug=${brand.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 text-xs py-0.5 transition-colors"
                      style={{ color: 'rgba(248,250,252,0.38)',
                        fontFamily: "'Satoshi', system-ui, sans-serif" }}
                      onMouseEnter={e => e.currentTarget.style.color = '#F8FAFC'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(248,250,252,0.38)'}
                    >
                      <span style={{ color: brand.accent }}>{BRAND_ICONS[brand.id]}</span>
                      {brand.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Other links */}
              {plainLinks.map((l, i) => (
                <Link key={l.label} to={createPageUrl(l.page)} onClick={() => setOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="py-4 text-2xl font-black transition-colors border-b"
                    style={{
                      fontFamily: "'Satoshi', system-ui, sans-serif",
                      borderColor: 'rgba(255,255,255,0.04)',
                      color: isActive(l.page) ? GOLD : 'white',
                    }}
                  >
                    {l.label}
                  </motion.div>
                </Link>
              ))}
            </nav>

            <Link to={createPageUrl('Contact')} onClick={() => setOpen(false)}
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
