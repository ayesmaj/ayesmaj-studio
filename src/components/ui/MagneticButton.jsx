import React, { useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Wraps any button/element with a subtle magnetic hover pull effect.
 * Usage: <MagneticButton><button>…</button></MagneticButton>
 */
export default function MagneticButton({ children, className = '', strength = 0.3 }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)';
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.div>
  );
}