import React from 'react';
import { motion } from 'framer-motion';
import { ZoomParallax } from '@/components/ui/zoom-parallax';

// 7 hero shots from across the brand portfolio
const PARALLAX_IMAGES = [
  { src: '/brands/ashe/1.png',        alt: 'ASHÉ Ritual Roast' },
  { src: '/brands/blenday/1.png',     alt: 'BLENDAY Campaign' },
  { src: '/brands/paranormal/1.jpeg', alt: 'PARANORMAL' },
  { src: '/brands/boom-chica/1.png',  alt: 'BOOM CHICKA POP' },
  { src: '/brands/pita-basta/2.png',  alt: 'PITA BASTA' },
  { src: '/brands/lacroix/1.jpg',     alt: 'LaCROIX' },
  { src: '/characters/1.jpeg', alt: 'Character Design' },
];

export default function ZoomParallaxSection() {
  return (
    <section className="relative" style={{ background: '#07100A' }}>
      {/* Header */}
      <div className="relative z-10 text-center pt-24 pb-8 pointer-events-none">
        <motion.p
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-bold tracking-[0.4em] uppercase"
          style={{ color: '#C8922A' }}
        >
          Our Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl font-black text-white mt-3 leading-tight"
        >
          Scroll to Explore
        </motion.h2>
      </div>

      <ZoomParallax images={PARALLAX_IMAGES} />
    </section>
  );
}
