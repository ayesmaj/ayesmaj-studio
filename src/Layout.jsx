import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import useSmoothVideoPlayback from './components/ayesmaj/useSmoothVideoPlayback';

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);
  const layoutRef = useRef(null);

  useSmoothVideoPlayback(layoutRef);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Custom gold cursor-follower removed 2026-08-21 at the owner's request.

  return (
    <div ref={layoutRef} style={{ background: '#030303', minHeight: '100vh', overflow: 'visible', position: 'relative', WebkitOverflowScrolling: 'touch' }}>
      <style>{`
      `}</style>
      {/* ── Floating Call Now button (fixed bottom-right) ── */}
      <AnimatePresence>
        {scrolled && (
          <motion.a
            className="ayes-floating-call"
            href="tel:5093197999"
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: '28px',
              right: '28px',
              zIndex: 9998,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '14px 24px',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, #E8C96D 0%, #C8A44E 100%)',
              color: '#07100A',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: '14px',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: '0 0 28px rgba(200,164,78,0.5), 0 8px 32px rgba(0,0,0,0.5)',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 48px rgba(200,164,78,0.7), 0 8px 40px rgba(0,0,0,0.6)';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 28px rgba(200,164,78,0.5), 0 8px 32px rgba(0,0,0,0.5)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Phone size={17} strokeWidth={2.5} />
            Call Now
          </motion.a>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPageName}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', minHeight: '100vh', position: 'relative', zIndex: 10, overflow: 'visible', willChange: 'opacity' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
