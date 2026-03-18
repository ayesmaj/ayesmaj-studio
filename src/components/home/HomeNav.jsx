import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Film, Palette, LayoutGrid,
  Coffee, Sparkles, Star, Leaf, Wine, Sandwich, Bug, Ghost,
  Home, Tag, Image, User, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { BRANDS, BRAND_NAV_GROUPS } from '@/data/brands';

const LOGO_URL = '/logo.png';
const GOLD     = '#C8A44E';
const GOLD_DIM = 'rgba(200,164,78,0.42)';

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

// ── Mega-dropdown ─────────────────────────────────────────────────────────────
// NOTE: Links do NOT call closeMenu() — doing so unmounts the element via
// AnimatePresence exit BEFORE Router finishes navigation. Instead, the parent's
// useEffect on location changes closes the menu after navigation completes.
function WorkMenu() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 4 }}
      transition={{ type: 'spring', mass: 0.5, damping: 14, stiffness: 130 }}
      className="absolute left-0 mt-3 p-5 rounded-2xl"
      style={{
        background: 'rgba(7,16,10,0.97)',
        backdropFilter: 'blur(28px)',
        border: '1px solid rgba(200,164,78,0.15)',
        minWidth: 560,
        zIndex: 9999,
        boxShadow: '0 32px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(200,164,78,0.06)',
      }}
    >
      {/* Quick links */}
      <div className="flex gap-6 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        {[
          { label: 'Showreel',          icon: <Film size={12} />,       to: createPageUrl('Reel') },
          { label: 'All Brands',        icon: <LayoutGrid size={12} />, to: createPageUrl('Brands') },
          { label: 'Portfolio Gallery', icon: <Palette size={12} />,    to: createPageUrl('Branding') },
        ].map(item => (
          <Link key={item.label} to={item.to}
            className="flex items-center gap-1.5 text-xs font-bold tracking-wide transition-colors"
            style={{ color: GOLD_DIM }}
            onMouseEnter={e => e.currentTarget.style.color = GOLD}
            onMouseLeave={e => e.currentTarget.style.color = GOLD_DIM}
          >
            <span style={{ color: GOLD }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </div>

      {/* 3-column brand tree */}
      <div className="grid grid-cols-3 gap-x-6">
        {BRAND_NAV_GROUPS.map(group => (
          <div key={group.label}>
            <p className="text-[9px] font-bold tracking-[0.32em] uppercase mb-3"
              style={{ color: 'rgba(200,164,78,0.5)' }}>
              {group.label}
            </p>
            {group.brands.map(id => {
              const brand = BRANDS.find(b => b.id === id);
              if (!brand) return null;
              return (
                <Link key={id} to={`/BrandDetail?slug=${id}`}
                  className="flex items-center gap-1.5 py-[5px] text-xs font-medium transition-colors"
                  style={{
                    color: 'rgba(248,250,252,0.4)',
                    fontFamily: "'Satoshi', system-ui, sans-serif",
                    letterSpacing: '0.02em',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#F8FAFC'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(248,250,252,0.4)'}
                >
                  <span style={{ color: brand.accent, opacity: 0.85, marginRight: 6, flexShrink: 0 }}>
                    {BRAND_ICONS[id]}
                  </span>
                  {brand.name}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Link to={createPageUrl('Contact')}
          className="flex items-center gap-1.5 text-xs font-medium transition-colors"
          style={{ color: 'rgba(200,164,78,0.4)' }}
          onMouseEnter={e => e.currentTarget.style.color = GOLD}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(200,164,78,0.4)'}
        >
          <ArrowRight size={11} /> Start a Project
        </Link>
      </div>
    </motion.div>
  );
}

// ── Main nav ──────────────────────────────────────────────────────────────────
export default function HomeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const workRef                 = useRef(null);
  const location                = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Close dropdown when clicking OUTSIDE the workRef container ──
  useEffect(() => {
    if (!workOpen) return;
    const handler = (e) => {
      if (workRef.current && !workRef.current.contains(e.target)) {
        setWorkOpen(false);
      }
    };
    // Use 'click' not 'mousedown' so Link navigation fires first
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, [workOpen]);

  // ── Close after route change (navigation completed) ──
  useEffect(() => {
    setWorkOpen(false);
    setOpen(false);
  }, [location.pathname, location.search]);

  const isActive = (page) => location.pathname === createPageUrl(page);

  const plainLinks = [
    { label: 'Branding', page: 'Branding' },
    { label: 'Reel',     page: 'Reel'     },
    { label: 'About',    page: 'About'    },
    { label: 'Pricing',  page: 'Pricing'  },
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
          background: scrolled ? 'rgba(7,16,10,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(22px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(200,164,78,0.1)' : '1px solid transparent',
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

            {/* Work — click to open, stays open */}
            <div ref={workRef} className="relative">
              <button
                onClick={() => setWorkOpen(v => !v)}
                className="relative pb-0.5 flex items-center gap-1"
                style={linkStyle(workOpen)}
              >
                Work
                <motion.span animate={{ rotate: workOpen ? 180 : 0 }} transition={{ duration: 0.22 }}>
                  <ChevronDown size={11} style={{ opacity: 0.7 }} />
                </motion.span>
                <span className="absolute bottom-0 left-0 h-px transition-all duration-300"
                  style={{ background: GOLD, width: workOpen ? '100%' : '0' }} />
              </button>

              <AnimatePresence>
                {workOpen && <WorkMenu />}
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
              border: '1px solid rgba(200,164,78,0.4)',
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

          {/* Hamburger — mobile only */}
          <button onClick={() => setOpen(v => !v)} className="lg:hidden text-white p-2" aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile backdrop */}
      <div className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300"
        onClick={() => setOpen(false)}
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
          visibility: open ? 'visible' : 'hidden' }} />

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
              style={{ background: 'linear-gradient(90deg,transparent,rgba(200,164,78,0.35),transparent)' }} />

            <nav className="flex flex-col gap-2 mb-6">
              {/* Work — expanded inline */}
              <div className="py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                <p className="text-2xl font-black text-white mb-4"
                  style={{ fontFamily: "'Satoshi', system-ui, sans-serif" }}>Work</p>
                <div className="flex flex-col gap-2 mb-4 pl-1">
                  {[
                    { label: 'Showreel',          to: createPageUrl('Reel')     },
                    { label: 'All Brands',         to: createPageUrl('Brands')   },
                    { label: 'Portfolio Gallery',  to: createPageUrl('Branding') },
                  ].map(item => (
                    <Link key={item.label} to={item.to}
                      className="text-sm font-semibold py-1 transition-colors"
                      style={{ color: GOLD_DIM }}
                      onMouseEnter={e => e.currentTarget.style.color = GOLD}
                      onMouseLeave={e => e.currentTarget.style.color = GOLD_DIM}
                    >
                      → {item.label}
                    </Link>
                  ))}
                </div>
                <div className="pl-1 flex flex-col gap-1">
                  {BRANDS.map(brand => (
                    <Link key={brand.id} to={`/BrandDetail?slug=${brand.id}`}
                      className="flex items-center gap-2 text-xs py-1 transition-colors"
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
                <Link key={l.label} to={createPageUrl(l.page)}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="py-4 text-2xl font-black border-b transition-colors"
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

            <Link to={createPageUrl('Contact')}
              className="py-4 rounded-2xl font-black text-lg tracking-widest uppercase text-white text-center mt-auto"
              style={{
                fontFamily: "'Satoshi', system-ui, sans-serif",
                background: 'linear-gradient(135deg,#C8A44E,#9A7B3A)',
                minHeight: '56px',
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
