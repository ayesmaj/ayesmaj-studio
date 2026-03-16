import React, { useEffect } from 'react';
import { useViewportScroll, useTransform, motion } from 'framer-motion';

/**
 * Premium scroll behavior enhancer.
 * Adds subtle parallax and depth to background as user scrolls.
 * Keeps the experience seamless and cinematic.
 */
export default function CinematicScroll({ children }) {
  const { scrollY } = useViewportScroll();

  // Background scale shift (very minimal - barely perceptible)
  const bgScale = useTransform(scrollY, [0, 2000], [1, 1.02]);

  // Background position drift (creates depth illusion)
  const bgY = useTransform(scrollY, [0, 3000], [0, -300]);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Background depth layer */}
      <motion.div
        style={{
          scale: bgScale,
          y: bgY,
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}