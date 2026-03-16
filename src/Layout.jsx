import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children, currentPageName }) {
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
    <div style={{ background: '#0B0B0C', minHeight: '100vh', overflow: 'visible', position: 'relative', WebkitOverflowScrolling: 'touch' }}>
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
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPageName}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', minHeight: '100vh', position: 'relative', zIndex: 10, overflow: 'visible' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}