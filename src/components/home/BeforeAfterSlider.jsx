import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

function Slider({ beforeImg, afterImg, beforeLabel, afterLabel }) {
  const [pos, setPos]           = useState(50);
  const [dragging, setDragging] = useState(false);
  const containerRef            = useRef(null);

  const clamp = (v) => Math.min(Math.max(v, 2), 98);

  const getPos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPos(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  // ── Pointer events (unified mouse + touch) ──────────────────────────────
  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    getPos(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!dragging) return;
    getPos(e.clientX);
  };
  const onPointerUp = () => setDragging(false);

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl select-none"
      style={{
        aspectRatio: '16/9',
        border: '1px solid rgba(0,196,106,0.2)',
        boxShadow: '0 0 40px rgba(0,0,0,0.6)',
        cursor: dragging ? 'col-resize' : 'ew-resize',
        touchAction: 'none', /* prevents page scroll while dragging */
        WebkitUserSelect: 'none',
        userSelect: 'none',
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* After (base) */}
      <img src={afterImg} alt="After" draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none" />

      {/* Before (clipped left) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ width: `${pos}%` }}>
        <img src={beforeImg} alt="Before" draggable={false}
          className="absolute inset-0 h-full object-cover pointer-events-none"
          style={{ width: `${10000 / pos}%`, maxWidth: 'none' }} />
      </div>

      {/* Divider */}
      <div className="absolute top-0 bottom-0 w-px pointer-events-none"
        style={{ left: `${pos}%`, background: 'rgba(0,196,106,0.7)',
          boxShadow: '0 0 6px rgba(0,196,106,0.5)' }} />

      {/* Handle — 48px for comfortable touch target */}
      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none
                      w-12 h-12 rounded-full flex items-center justify-center z-10"
        style={{
          left: `${pos}%`,
          background: '#0B0F0C',
          border: `2px solid ${dragging ? '#00ff77' : '#00C46A'}`,
          boxShadow: dragging
            ? '0 0 24px rgba(0,255,119,0.5)'
            : '0 0 18px rgba(0,196,106,0.35)',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}>
        <span className="text-[#00C46A] text-sm font-bold">⇔</span>
      </div>

      {/* Labels */}
      <div className="absolute bottom-3 left-3 text-[10px] tracking-widest uppercase font-bold px-2 py-1 rounded pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.75)', color: '#00C46A',
          opacity: pos > 18 ? 1 : 0, transition: 'opacity 0.3s' }}>
        {beforeLabel}
      </div>
      <div className="absolute bottom-3 right-3 text-[10px] tracking-widest uppercase font-bold px-2 py-1 rounded pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.75)', color: '#00C46A',
          opacity: pos < 82 ? 1 : 0, transition: 'opacity 0.3s' }}>
        {afterLabel}
      </div>

      {/* Hint — always visible on mobile, fades after first drag */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5
                      px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase pointer-events-none"
        style={{ background: 'rgba(0,196,106,0.12)', border: '1px solid rgba(0,196,106,0.4)',
          color: '#00C46A', opacity: dragging ? 0 : 1, transition: 'opacity 0.3s' }}>
        {/* Show different hint on mobile vs desktop */}
        <span className="hidden md:inline">Drag to Compare</span>
        <span className="md:hidden">Swipe to Compare</span>
      </div>
    </div>
  );
}

export default function BeforeAfterSection() {
  return (
    <section id="compare" className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden"
      style={{ background: 'transparent' }}>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,196,106,0.08),transparent)' }} />

      <div className="max-w-6xl mx-auto">
        <motion.div {...fade(0)} className="text-center mb-10 md:mb-16">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#00C46A' }}>Process</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
            From Concept to Final Frame
          </h2>
        </motion.div>

        {/* Stack on mobile, 2-col on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <motion.div {...fade(0.1)}>
            <p className="text-center text-xs text-gray-600 tracking-widest uppercase mb-3 md:mb-4">
              Slider 01 — Clay to Final Render
            </p>
            <Slider
              beforeImg="/images/can-raw.png"
              afterImg="/images/can-final.png"
              beforeLabel="Clay Model"
              afterLabel="Final Render"
            />
          </motion.div>
          <motion.div {...fade(0.2)}>
            <p className="text-center text-xs text-gray-600 tracking-widest uppercase mb-3 md:mb-4">
              Slider 02 — Raw Model to Final Render
            </p>
            <Slider
              beforeImg="/images/car-raw.png"
              afterImg="/images/car-final.png"
              beforeLabel="Raw Model"
              afterLabel="Final Render"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
