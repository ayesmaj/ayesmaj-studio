import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Film, Wand2, Globe, Palette, LayoutGrid, Clapperboard, Image, Sparkles, Coffee, Leaf, Wine, Sandwich, Bug, Ghost, Home, Tag, Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import MagneticButton from '@/components/ui/MagneticButton';
import { MenuItem, Menu as NavMenu, HoveredLink, MenuDivider } from '@/components/ui/navbar-menu';
import { BRAND_NAV_GROUPS, BRANDS } from '@/data/brands';

const LOGO_URL = "/logo.webp";

const mobileLinks = [
  { label: 'Home',     href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Showreel', href: '#work' },
  { label: 'All Brands', href: '/Brands', isPage: true },
  { label: 'Portfolio', href: '/Branding', isPage: true },
  { label: 'Pricing',  href: '#pricing' },
  { label: 'Contact',  href: '#contact' },
];

// ── Services dropdown items ──────────────────────────────────────────────────
function ServicesDropdown({ go }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-3 min-w-[360px] p-1">
      <div className="flex flex-col gap-3">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-1" style={{ color: '#00C46A' }}>Production</p>
        <HoveredLink onClick={() => go('#services')}>
          <span className="flex items-center gap-2"><Film size={13} className="text-[#00C46A]" /> CGI Commercials</span>
        </HoveredLink>
        <HoveredLink onClick={() => go('#services')}>
          <span className="flex items-center gap-2"><Clapperboard size={13} className="text-[#00C46A]" /> Brand Films</span>
        </HoveredLink>
        <HoveredLink onClick={() => go('#services')}>
          <span className="flex items-center gap-2"><Wand2 size={13} className="text-[#00C46A]" /> 3D Animation</span>
        </HoveredLink>
      </div>

      <div className="flex flex-col gap-3">
        <p className="text-[10px] font-bold tracking-[0.3em] uppercase mb-1" style={{ color: '#00C46A' }}>Creative</p>
        <HoveredLink href="/branding">
          <span className="flex items-center gap-2"><Palette size={13} className="text-[#00C46A]" /> Brand Identity</span>
        </HoveredLink>
        <HoveredLink onClick={() => go('#services')}>
          <span className="flex items-center gap-2"><Image size={13} className="text-[#00C46A]" /> Product Renders</span>
        </HoveredLink>
        <HoveredLink onClick={() => go('#services')}>
          <span className="flex items-center gap-2"><Globe size={13} className="text-[#00C46A]" /> Digital Campaigns</span>
        </HoveredLink>
      </div>
    </div>
  );
}

// ── Brand icon map ────────────────────────────────────────────────────────────
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

// ── Work dropdown — full brand tree ──────────────────────────────────────────
function WorkDropdown({ go }) {
  return (
    <div className="p-1" style={{ minWidth: 520 }}>
      {/* Top row: Showreel + All Brands */}
      <div className="flex gap-3 mb-4 pb-4 border-b" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
        <HoveredLink onClick={() => go('#work')}>
          <span className="flex items-center gap-2"><Film size={13} className="text-[#00C46A]" /> Showreel</span>
        </HoveredLink>
        <HoveredLink href="/Brands">
          <span className="flex items-center gap-2"><LayoutGrid size={13} className="text-[#00C46A]" /> All Brands</span>
        </HoveredLink>
        <HoveredLink href="/Branding">
          <span className="flex items-center gap-2"><Palette size={13} className="text-[#00C46A]" /> Portfolio Gallery</span>
        </HoveredLink>
      </div>

      {/* Brand groups */}
      <div className="grid grid-cols-3 gap-x-6 gap-y-1">
        {BRAND_NAV_GROUPS.map(group => (
          <div key={group.label}>
            <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-2"
              style={{ color:'rgba(0,196,106,0.6)' }}>
              {group.label}
            </p>
            {group.brands.map(id => {
              const brand = BRANDS.find(b => b.id === id);
              if (!brand) return null;
              return (
                <HoveredLink key={id} href={`/BrandDetail?slug=${id}`}>
                  <span className="flex items-center gap-1.5 py-0.5"
                    style={{ color: 'inherit' }}>
                    <span style={{ color: brand.accent, opacity: 0.8 }}>
                      {BRAND_ICONS[id]}
                    </span>
                    <span className="text-xs">{brand.name}</span>
                  </span>
                </HoveredLink>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t" style={{ borderColor:'rgba(255,255,255,0.06)' }}>
        <HoveredLink onClick={() => go('#contact')}>
          <span className="flex items-center gap-2 text-white/40 hover:text-[#00C46A] text-xs">
            <ArrowRight size={12} /> Start a Project
          </span>
        </HoveredLink>
      </div>
    </div>
  );
}

export default function Navigation({ reducedMotion, onToggleReducedMotion }) {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const go = (href, isPage) => {
    if (isPage) {
      window.location.href = href;
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
    setOpen(false);
    setActiveMenu(null);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/60 backdrop-blur-2xl border-b border-white/[0.04]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-[68px]">

          {/* ── Logo ── */}
          <button onClick={() => go('#hero')} className="flex items-center gap-2.5 group">
            <img
              src={LOGO_URL}
              alt="AJ"
              className="h-8 w-auto transition-transform duration-300 group-hover:scale-110"
            />
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-widest text-white/90">AYESMAJ</span>
              <span className="block text-[8px] tracking-[0.45em] text-gray-600 -mt-0.5">STUDIOS</span>
            </div>
          </button>

          {/* ── Desktop dropdown nav (hidden on mobile) ── */}
          <div className="hidden lg:block">
            <NavMenu setActive={setActiveMenu}>
              {/* Plain link: no dropdown */}
              <button
                onMouseEnter={() => setActiveMenu(null)}
                onClick={() => go('#system')}
                className="text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-colors"
              >
                System
              </button>

              <MenuItem setActive={setActiveMenu} active={activeMenu} item="Services">
                <ServicesDropdown go={go} />
              </MenuItem>

              <MenuItem setActive={setActiveMenu} active={activeMenu} item="Work">
                <WorkDropdown go={go} />
              </MenuItem>

              <button
                onMouseEnter={() => setActiveMenu(null)}
                onClick={() => go('#pricing')}
                className="text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-colors"
              >
                Pricing
              </button>

              <button
                onMouseEnter={() => setActiveMenu(null)}
                onClick={() => go('#contact')}
                className="text-sm font-semibold tracking-wide text-white/80 hover:text-white transition-colors"
              >
                Contact
              </button>
            </NavMenu>
          </div>

          {/* ── CTA Button ── */}
          <MagneticButton strength={0.3} className="hidden lg:inline-block">
            <button
              onClick={() => go('#contact')}
              className="flex items-center gap-2 text-[13px] font-bold px-5 py-2 rounded-full bg-[#00ff77] text-black hover:shadow-[0_0_24px_rgba(0,255,119,0.45)] hover:scale-[1.03] transition-all duration-300 group"
            >
              Order a Video
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </MagneticButton>

          {/* ── Right side: reduce-motion + hamburger ── */}
          <div className="flex items-center gap-4">
            <button
              onClick={onToggleReducedMotion}
              className="hidden lg:flex items-center gap-1.5 text-[11px] text-gray-600 hover:text-gray-400 transition-colors"
              title="Toggle reduce motion"
            >
              <span
                className={`w-7 h-3.5 rounded-full border transition-colors relative ${
                  reducedMotion
                    ? 'border-[#00ff77]/60 bg-[#00ff77]/10'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-2.5 h-2.5 rounded-full transition-all ${
                    reducedMotion ? 'left-3.5 bg-[#00ff77]' : 'left-0.5 bg-gray-600'
                  }`}
                />
              </span>
            </button>

            <button onClick={() => setOpen(!open)} className="text-white p-1 lg:hidden">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
            {/* Mobile-only hamburger shown, on lg we hide it via lg:hidden above */}
            <button onClick={() => setOpen(!open)} className="text-white p-1 hidden lg:block lg:invisible">
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile slide-out menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 bg-[#080808]/95 backdrop-blur-2xl border-l border-white/[0.05] flex flex-col px-10 pt-28 pb-12"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff77]/30 to-transparent" />

            <nav className="flex flex-col gap-2 mb-auto">
              {mobileLinks.map((l, i) => (
                <motion.button
                  key={l.label}
                  onClick={() => go(l.href, l.isPage)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group text-left py-4 border-b border-white/[0.04] flex items-center justify-between"
                >
                  <span className="text-2xl font-extrabold text-white group-hover:text-[#00ff77] transition-colors">
                    {l.label}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-gray-700 group-hover:text-[#00ff77] group-hover:translate-x-1 transition-all"
                  />
                </motion.button>
              ))}
            </nav>

            <motion.button
              onClick={() => go('#contact')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 py-4 rounded-2xl bg-[#00ff77] text-black font-bold text-lg hover:shadow-[0_0_30px_rgba(0,255,119,0.4)] transition-all"
            >
              Order a Video →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
