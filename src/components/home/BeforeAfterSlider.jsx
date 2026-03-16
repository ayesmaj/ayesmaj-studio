import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

function Slider({ beforeImg, afterImg, beforeLabel, afterLabel }) {
  const [pos, setPos] = useState(50);
  const [hovered, setHovered] = useState(false);
  const dragging = useRef(false);
  const containerRef = useRef(null);

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98);
    setPos(pct);
  }, []);

  const onMouseMove = (e) => { if (dragging.current) updatePos(e.clientX); };
  const onTouchMove = (e) => updatePos(e.touches[0].clientX);

  return (
    <motion.div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl select-none cursor-col-resize"
      style={{
        aspectRatio: '16/9',
        border: `1px solid ${hovered ? 'rgba(0,196,106,0.35)' : 'rgba(0,196,106,0.15)'}`,
        boxShadow: hovered
          ? '0 0 50px rgba(0,196,106,0.12), 0 20px 60px rgba(0,0,0,0.7)'
          : '0 0 40px rgba(0,0,0,0.6)',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; setHovered(false); }}
      onTouchMove={onTouchMove}
      onTouchEnd={() => { dragging.current = false; }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* After (base) */}
      <img src={afterImg} alt="After" className="absolute inset-0 w-full h-full object-cover" />

      {/* Before (clipped) */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src={beforeImg} alt="Before" className="absolute inset-0 w-full h-full object-cover"
          style={{ width: `${100 / (pos / 100)}%`, maxWidth: 'none' }} />
      </div>

      {/* Divider line */}
       <div className="absolute top-0 bottom-0 w-px" style={{ left: `${pos}%`, background: 'rgba(0,196,106,0.7)' }} />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center z-10"
        style={{
          left: `${pos}%`,
          background: '#0B0F0C',
          border: '2px solid #00C46A',
          boxShadow: '0 0 18px rgba(0,196,106,0.35)',
          cursor: 'col-resize',
        }}
        onMouseDown={() => { dragging.current = true; }}
        onTouchStart={() => { dragging.current = true; }}
      >
        <span className="text-[#00C46A] text-xs font-bold select-none">⇔</span>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 text-[10px] tracking-widest uppercase font-bold px-2 py-1 rounded"
        style={{ background: 'rgba(0,0,0,0.7)', color: '#00C46A', opacity: pos > 15 ? 1 : 0, transition: 'opacity 0.3s' }}>
        {beforeLabel}
      </div>
      <div className="absolute bottom-4 right-4 text-[10px] tracking-widest uppercase font-bold px-2 py-1 rounded"
        style={{ background: 'rgba(0,0,0,0.7)', color: '#00C46A', opacity: pos < 85 ? 1 : 0, transition: 'opacity 0.3s' }}>
        {afterLabel}
      </div>

      {/* Hover CTA */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
        transition={{ duration: 0.3 }}
        className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase pointer-events-none"
        style={{ background: 'rgba(0,196,106,0.12)', border: '1px solid rgba(0,196,106,0.4)', color: '#00C46A' }}
      >
        Drag to Compare <ArrowUpRight size={10} />
      </motion.div>
    </motion.div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section id="compare" className="relative py-32 px-6 overflow-hidden" style={{ background: 'transparent' }}>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,106,0.08), transparent)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div {...fade(0)} className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#00C46A' }}>Process</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">From Concept to Final Frame</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div {...fade(0.1)}>
            <p className="text-center text-xs text-gray-600 tracking-widest uppercase mb-4">Slider 01 — Wireframe to Render</p>
            <Slider
              beforeImg="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/d39193e13_Heinekens.png"
              afterImg="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/93c9aef4f_ChatGPTImageFeb28202609_33_49PM.png"
              beforeLabel="Wireframe"
              afterLabel="Final Render"
            />
          </motion.div>
          <motion.div {...fade(0.2)}>
            <p className="text-center text-xs text-gray-600 tracking-widest uppercase mb-4">Slider 02 — Raw Model to Final Render</p>
            <Slider
              beforeImg="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/5aeef83a7_car2s.png"
              afterImg="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/8ae06e129_ChatGPTImageFeb28202609_48_45PM.png"
              beforeLabel="Raw Model"
              afterLabel="Final Render"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}