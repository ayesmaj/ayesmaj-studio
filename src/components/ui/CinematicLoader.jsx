import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOGO_URL = null; // Logo managed via text below

export default function CinematicLoader({ onComplete }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => { onComplete(); }, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase < 2 && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: '#080808' }}
        >
          {/* radial glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: phase >= 1 ? 0.25 : 0, scale: phase >= 1 ? 1.4 : 0.6 }}
            transition={{ duration: 1.2 }}
            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, #D4A853 0%, transparent 70%)', filter: 'blur(80px)' }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 24, scale: phase >= 1 ? 1 : 0.9 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col items-center gap-4"
          >
            <img
              src="/logo-full.webp"
              alt="AYESMAJ Studios"
              style={{ height: '70px', width: 'auto', objectFit: 'contain' }}
            />
            {/* thin progress line */}
            <div className="w-32 h-[1px] bg-white/5 overflow-hidden rounded mt-2">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
                className="h-full w-full bg-gradient-to-r from-transparent via-[#D4A853] to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}