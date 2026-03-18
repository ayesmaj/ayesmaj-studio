import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const VARIANTS = {
  up: {
    hidden:  { opacity: 0, y: 40,  filter: 'blur(10px)' },
    visible: { opacity: 1, y: 0,   filter: 'blur(0px)'  },
  },
  left: {
    hidden:  { opacity: 0, x: -40, filter: 'blur(10px)' },
    visible: { opacity: 1, x: 0,   filter: 'blur(0px)'  },
  },
  right: {
    hidden:  { opacity: 0, x: 40,  filter: 'blur(10px)' },
    visible: { opacity: 1, x: 0,   filter: 'blur(0px)'  },
  },
  scale: {
    hidden:  { opacity: 0, scale: 0.96, filter: 'blur(10px)' },
    visible: { opacity: 1, scale: 1,    filter: 'blur(0px)'  },
  },
  fade: {
    hidden:  { opacity: 0, filter: 'blur(8px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
};

export default function SectionReveal({
  children,
  className = '',
  delay     = 0,
  variant   = 'up',
  duration  = 0.9,
  amount    = 0.05,
}) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, amount });

  return (
    <motion.div
      ref={ref}
      variants={VARIANTS[variant] ?? VARIANTS.up}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'opacity, transform, filter' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
