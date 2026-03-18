import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import MagneticButton from '@/components/ui/MagneticButton';

const LOGO_URL = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80";

const links = [
  { label: 'System', href: '#system' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '/contact', isPage: true },
];

export default function Navigation({ reducedMotion, onToggleReducedMotion }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-2xl border-b border-white/[0.04]' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-5 lg:px-8 flex items-center justify-between h-[68px]">
          {/* Logo */}
          <button onClick={() => go('#hero')} className="flex items-center gap-2.5 group">
            <img src={LOGO_URL} alt="AJ" className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-widest text-white/90">AYESMAJ</span>
              <span className="block text-[8px] tracking-[0.45em] text-gray-600 -mt-0.5">STUDIOS</span>
            </div>
          </button>

          {/* Center CTA */}
          <MagneticButton strength={0.3} className="hidden lg:inline-block">
            <button onClick={() => go('#contact')}
              className="flex items-center gap-2 text-[13px] font-bold px-5 py-2 rounded-full bg-[#00ff77] text-black hover:shadow-[0_0_24px_rgba(0,255,119,0.45)] hover:scale-[1.03] transition-all duration-300 group"
            >
              Order a Video <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </MagneticButton>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Reduce motion toggle */}
            <button
              onClick={onToggleReducedMotion}
              className="hidden lg:flex items-center gap-1.5 text-[11px] text-gray-600 hover:text-gray-400 transition-colors"
              title="Toggle reduce motion"
            >
              <span className={`w-7 h-3.5 rounded-full border transition-colors relative ${reducedMotion ? 'border-[#00ff77]/60 bg-[#00ff77]/10' : 'border-white/10 bg-white/5'}`}>
                <span className={`absolute top-0.5 w-2.5 h-2.5 rounded-full transition-all ${reducedMotion ? 'left-3.5 bg-[#00ff77]' : 'left-0.5 bg-gray-600'}`} />
              </span>
            </button>

            <button onClick={() => setOpen(!open)} className="text-white p-1">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Slide-out menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-96 bg-[#080808]/95 backdrop-blur-2xl border-l border-white/[0.05] flex flex-col px-10 pt-28 pb-12"
          >
            {/* Green accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff77]/30 to-transparent" />

            <nav className="flex flex-col gap-2 mb-auto">
              {links.map((l, i) => (
                  <motion.button key={l.label} onClick={() => go(l.href, l.isPage)}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group text-left py-4 border-b border-white/[0.04] flex items-center justify-between"
                >
                  <span className="text-2xl font-extrabold text-white group-hover:text-[#00ff77] transition-colors">
                    {l.label}
                  </span>
                  <ArrowRight size={16} className="text-gray-700 group-hover:text-[#00ff77] group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </nav>

            <motion.button onClick={() => go('#contact')} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
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