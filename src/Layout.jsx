import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';

export default function Layout({ children, currentPageName }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://api.fontshare.com/v2/css?f[]=satoshi@700,900&display=swap';
    document.head.appendChild(link);

    // Custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mouseenter', () => cursor.style.opacity = '1');
    document.addEventListener('mouseleave', () => cursor.style.opacity = '0');

    return () => cursor.remove();
  }, []);

  return (
    <div style={{ background: '#030303', minHeight: '100vh', overflow: 'visible', position: 'relative', WebkitOverflowScrolling: 'touch' }}>
      <style>{`
        .custom-cursor {
          position: fixed;
          width: 10px;
          height: 10px;
          background: #C8A34F;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          box-shadow: 0 0 10px rgba(200,163,78,0.5);
          opacity: 0;
          transition: opacity 0.2s;
        }
      `}</style>
      {/* ── Floating Call Now button (fixed bottom-right) ── */}
      <AnimatePresence>
        {scrolled && (
          <motion.a
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
              fontFamily: "'Satoshi', system-ui, sans-serif",
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