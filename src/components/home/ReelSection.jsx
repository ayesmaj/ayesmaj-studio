import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

export default function ReelSection() {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section id="reel" className="relative z-10 py-32 px-6" style={{ background: 'transparent', scrollMarginTop: '90px' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div {...fade(0)} className="text-center mb-10">
          <p className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: '#C8A44E' }}>Showreel</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">Watch Our Work</h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Cinematic brand films, product reveals, and campaign reels — built to move people.
          </p>
        </motion.div>

        {/* Showreel */}
        <motion.div {...fade(0.1)} className="mb-6">
          <div className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '16/9', border: '1px solid rgba(200,164,78,0.15)', boxShadow: '0 0 60px rgba(200,164,78,0.1), 0 30px 80px rgba(0,0,0,0.6)' }}>
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/dea3l8rmw/video/upload/q_auto,f_auto/0318_1_1_offmsw.mp4"
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className="text-center mt-3 text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(200,164,78,0.5)' }}>Official Showreel 2025</p>
        </motion.div>

        <motion.div {...fade(0.2)} className="text-center">
          <Link to={createPageUrl('Reel')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300"
            style={{ border: '1px solid rgba(200,164,78,0.4)', color: '#C8A44E', background: 'rgba(200,164,78,0.05)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(200,164,78,0.12)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(200,164,78,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(200,164,78,0.05)'; e.currentTarget.style.boxShadow = ''; }}>
            View Full Reel Page →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}