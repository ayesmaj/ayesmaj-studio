import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import HomeFooter from '@/components/home/HomeFooter';
import CircuitBackground from '@/components/home/CircuitBackground';

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/036cab6ae_AYESMAJ4.png";

const LINKS = [
  { label: 'Home', page: 'Home' },
  { label: 'System', page: 'System' },
  { label: 'Services', page: 'Services' },
  { label: 'Pricing', page: 'Pricing' },
  { label: 'Contact', page: 'Contact' },
];

export default function Pricing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-white overflow-x-hidden" style={{ background: '#0B0F0C' }}>
      <CircuitBackground />

      {/* Dashboard Navigation */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: 'rgba(11,15,12,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(200,163,78,0.08)'
        }}>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[70px]">
          {/* Logo / Home Button */}
          <Link to={createPageUrl('Home')} className="flex items-center group">
            <img src={LOGO_URL} alt="AYESMAJ" className="h-8 w-auto hover:opacity-80 transition-opacity" />
          </Link>

          {/* Home Icon Button (Desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to={createPageUrl('Home')}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
              title="Go to Home">
              <Home size={18} className="text-[#C8A44E]" />
            </Link>

            {/* Menu */}
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              {LINKS.slice(1).map((l) => (
                <Link key={l.label} to={createPageUrl(l.page)}
                  className="text-[11px] tracking-widest uppercase font-bold text-gray-500 hover:text-white transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-white p-1">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen &&
          <motion.div
            initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-y-0 right-0 z-40 w-full sm:w-80 flex flex-col px-8 pt-28 pb-10"
            style={{ background: 'rgba(11,15,12,0.97)', backdropFilter: 'blur(20px)', borderLeft: '1px solid rgba(200,163,78,0.08)' }}>

            <div className="absolute inset-x-0 top-0 h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(200,163,78,0.3), transparent)' }} />

            <nav className="flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <Link key={l.label} to={createPageUrl(l.page)} onClick={() => setMenuOpen(false)}>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="text-left py-4 text-2xl font-black transition-colors border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.04)', color: l.page === 'Home' ? '#00C46A' : 'white' }}>
                    {l.label}
                  </motion.div>
                </Link>
              ))}
            </nav>
          </motion.div>
        }
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 pt-36 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            Pricing Plans
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-gray-400 text-lg max-w-lg mx-auto">
            Flexible pricing for every project size and budget.
          </motion.p>
        </div>
      </main>

      <HomeFooter />
    </div>
  );
}