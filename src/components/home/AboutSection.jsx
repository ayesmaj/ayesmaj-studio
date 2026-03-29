import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

// Animated stat counter
function StatCounter({ num, label, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center gap-1 group"
    >
      <motion.span
        className="text-3xl font-black"
        style={{ color: '#E6C36A' }}
        animate={inView ? { textShadow: ['0 0 0px #C8A44E', '0 0 20px rgba(200,163,78,0.5)', '0 0 0px #C8A44E'] } : {}}
        transition={{ duration: 2, delay: delay + 0.5, repeat: Infinity, repeatDelay: 3 }}
      >
        {num}
      </motion.span>
      <span className="text-xs text-gray-600 tracking-widest uppercase">{label}</span>
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden" style={{ background: 'transparent', scrollMarginTop: '90px' }}>

      {/* Full-width video background - autoplay loop muted no controls */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: '#000', overflow: 'hidden' }}>
        <video
          src="https://www.dropbox.com/scl/fi/5u2cm4et1bjtx753f3sng/0629.mp4?rlkey=gmx4t34qa0htfzynf1oso8tqp&st=x6t0792m&raw=1"
          autoPlay
          loop
          muted
          playsInline
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Text content below video */}
      <div className="relative px-6 py-24 text-center">

        {/* Animated background grid lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(3)].map((_, i) => (
            <motion.div key={i}
              className="absolute inset-x-0 h-px"
              style={{
                top: `${25 + i * 25}%`,
                background: 'linear-gradient(90deg, transparent, rgba(10,20,10,0.2), transparent)',
              }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3 + i, repeat: Infinity, delay: i * 1.2 }}
            />
          ))}
        </div>

        <motion.p {...fade(0)} className="text-xs tracking-[0.5em] uppercase mb-4"
          style={{ color: '#C8A44E' }}>
          The Studio
        </motion.p>

        <motion.h2 {...fade(0.1)} className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tight">
          AYESMAJ
        </motion.h2>

        <motion.div {...fade(0.3)} className="max-w-3xl mx-auto">
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-5">
            AYESMAJ Studios is an AI-powered creative studio specializing in content marketing, 3D animation, and brand building.
          </p>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-5">
            We produce AI-generated marketing content, cinematic 3D animation and CGI, full brand identity systems, and custom websites &amp; landing pages — all tailored to your brand.
          </p>
          <p className="text-gray-600 text-base leading-relaxed">
            Working with brands locally and internationally — from concept to launch.
          </p>
        </motion.div>

        {/* Gold line accent */}
        <motion.div {...fade(0.45)} className="mt-16 flex justify-center">
          <motion.div
            className="h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #C8A44E, transparent)' }}
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Stats */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[['120+','Projects Delivered',0.55],['6+','Years Experience',0.65],['40+','Global Clients',0.75],['4K','Render Quality',0.85]].map(([num,label,delay]) => (
            <StatCounter key={label} num={num} label={label} delay={delay} />
          ))}
        </div>

        <div className="absolute bottom-0 inset-x-0 h-40"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(11,15,12,0.2))' }} />
      </div>
    </section>
  );
}