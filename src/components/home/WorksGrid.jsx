import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

function VideoCard({ src, delay = 0 }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Setting muted in JS is required for iOS Safari autoplay
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden relative"
      style={{ aspectRatio: '16/9', border: '1px solid rgba(200,164,78,0.15)', background: '#07100A' }}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </motion.div>
  );
}

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
});

const CATS = ['All', 'Product Animation', 'Character Design', 'Food Commercial', 'Brand Visuals', 'Motion Design'];

const WORKS = [];

function WorkCard({ item }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const imgX = useTransform(springX, [-0.5, 0.5], ['4%', '-4%']);
  const imgY = useTransform(springY, [-0.5, 0.5], ['4%', '-4%']);
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mouseX, mouseY]);

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(createPageUrl('BrandingCaseStudy') + `?slug=${item.slug}`)}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="relative overflow-hidden rounded-2xl cursor-pointer h-full"
      animate={{
        borderColor: hovered ? 'rgba(0,196,106,0.4)' : 'rgba(0,196,106,0.08)',
        boxShadow: hovered ?
        '0 0 40px rgba(0,196,106,0.15), 0 20px 60px rgba(0,0,0,0.5)' :
        '0 0 0px transparent'
      }}
      transition={{ duration: 0.35 }}
      whileTap={{ scale: 0.98 }}>

      <div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 'inherit' }}>
        <motion.img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover"
          style={{ x: hovered ? imgX : 0, y: hovered ? imgY : 0, scale: hovered ? 1.12 : 1 }}
          transition={{ scale: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }} />

      </div>

      <div className="absolute inset-0"
      style={{ background: 'linear-gradient(to top, rgba(11,15,12,0.92) 0%, rgba(11,15,12,0.2) 55%, transparent 100%)' }} />

      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
        style={{ background: 'rgba(11,15,12,0.45)', backdropFilter: 'blur(2px)' }} />


      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: 'inset 0 0 30px rgba(0,196,106,0.08)' }} />


      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">

        <motion.span
          animate={{ letterSpacing: hovered ? '0.45em' : '0.4em' }}
          className="text-[10px] uppercase font-bold"
          style={{ color: '#00C46A' }}>

          {item.cat}
        </motion.span>
        <span className="text-white font-bold text-xl text-center px-4">{item.title}</span>
        <motion.div
          animate={{ scale: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full"
          style={{ border: '1px solid rgba(0,196,106,0.6)', color: '#00C46A', background: 'rgba(0,196,106,0.08)' }}>

          View Project <ArrowUpRight size={12} />
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ opacity: hovered ? 0 : 1, y: hovered ? 4 : 0 }}
        transition={{ duration: 0.25 }}
        className="absolute bottom-4 left-4 right-4">

        <p className="text-white font-bold text-sm">{item.title}</p>
        <p className="text-xs mt-0.5" style={{ color: '#00C46A' }}>{item.cat}</p>
      </motion.div>
    </motion.div>);

}

export default function WorksGrid() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? WORKS : WORKS.filter((w) => w.cat === active);

  return (
    <section id="work" className="relative py-32 px-6 overflow-hidden" style={{ background: 'transparent', scrollMarginTop: '90px' }}>
      <div className="absolute top-0 inset-x-0 h-px"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,106,0.08), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div {...fade(0)} className="text-center mb-12">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#00C46A' }}>Portfolio</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">ANIMATION</h2>
        </motion.div>

        <motion.div {...fade(0.1)} className="flex flex-wrap justify-center gap-3 mb-12">
          {CATS.map((c) =>
          <motion.button key={c} onClick={() => setActive(c)}
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
          className="px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-bold transition-all duration-300"
          style={{
            border: `1px solid ${active === c ? 'rgba(0,196,106,0.6)' : 'rgba(255,255,255,0.08)'}`,
            color: active === c ? '#00C46A' : '#666',
            background: active === c ? 'rgba(0,196,106,0.08)' : 'transparent',
            boxShadow: active === c ? '0 0 14px rgba(0,196,106,0.15)' : 'none'
          }}>
              {c}
            </motion.button>
          )}
        </motion.div>

        {/* Featured Videos — served from Cloudinary CDN */}
        {(() => {
          const CLD = 'https://res.cloudinary.com/dea3l8rmw/video/upload/q_auto,f_auto';
          return (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <VideoCard delay={0.12} src={`${CLD}/0318_1_1_offmsw.mp4`} />
                <VideoCard delay={0.14} src={`${CLD}/yafora_dlfdir.mp4`} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <VideoCard delay={0.16} src={`${CLD}/aldo_animation_shoes_2_a3qeoo.mp4`} />
                <VideoCard delay={0.18} src={`${CLD}/optimus_animation_5_u1saen.mp4`} />
                <VideoCard delay={0.20} src={`${CLD}/0318_6_lwnh4l.mp4`} />
              </div>
            </>
          );
        })()}

        <motion.div {...fade(0.15)}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]"
        style={{ perspective: 1000 }}>

          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) =>
            <motion.div key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -10 }}
            transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className={item.size === 'large' ? 'col-span-2 row-span-2' : ''}>

                <WorkCard item={item} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>);

}