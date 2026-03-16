import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Premium cinematic transition layer between sections.
 * Creates seamless blending with soft gradient shadows and subtle depth.
 */
export default function SectionTransitionLayer() {
  const { scrollY } = useScroll();
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Soft gradient shadow that moves with scroll
  const shadowOpacity = useTransform(scrollY, [0, 200, 400, 600], [0, 0.05, 0.08, 0.05]);

  return (
    <div className="fixed inset-0 z-20" style={{ top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', touchAction: 'none' }}>
      {/* Soft vignette shadow for depth - seamless between sections */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.2) 100%)',
          opacity: shadowOpacity,
        }}
      />

      {/* Subtle horizontal light sweep during major transitions */}
      <motion.div
        className="absolute inset-y-0 w-full"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,196,106,0.02) 50%, transparent 100%)',
          transform: `translateX(${(scrollPos % 1200) - 600}px)`,
        }}
      />

      {/* Ultra-subtle horizontal line at section boundaries for visual continuity */}
      <div
        className="absolute inset-x-0 h-px"
        style={{
          top: `${(scrollPos / 8) % 100}%`,
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,196,106,0.08) 50%, transparent 100%)',
          opacity: 0.6,
        }}
      />

      {/* Dust particle effect that strengthens during transitions */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(0,196,106,0.01) 0%, transparent 100%)',
          opacity: Math.sin(scrollPos / 300) * 0.03 + 0.02,
        }}
      />
    </div>
  );
}