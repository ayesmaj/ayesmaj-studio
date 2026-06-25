import { useRef, useState } from 'react';

const FONTS = { ui: "'Space Grotesk', 'Inter', system-ui, sans-serif" };

const hideOnError = (e) => { e.currentTarget.style.display = 'none'; };

const pill = {
  position: 'absolute',
  top: 14,
  fontFamily: FONTS.ui,
  fontSize: 11,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  padding: '6px 12px',
  borderRadius: 999,
  background: 'rgba(0,0,0,0.45)',
  border: '1px solid rgba(255,255,255,0.14)',
  backdropFilter: 'blur(10px)',
  color: '#F5F5F0',
  pointerEvents: 'none',
  zIndex: 3,
};

export default function BeforeAfterSlider({
  beforeImg,
  afterImg,
  beforeLabel = 'CLAY MODEL',
  afterLabel = 'FINAL RENDER',
  accent = '#9B5CFF',
  accentRGB = '155,92,255',
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const update = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  // ponytail: single pointer-event path covers mouse + touch (Pointer Events API). No separate touch handlers needed.
  const onDown = (e) => { dragging.current = true; e.currentTarget.setPointerCapture?.(e.pointerId); update(e.clientX); };
  const onMove = (e) => { if (dragging.current) update(e.clientX); };
  const onUp = () => { dragging.current = false; };

  const img = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    userSelect: 'none',
    pointerEvents: 'none',
  };

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 10',
        borderRadius: 26,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.09)',
        background: '#071207',
        touchAction: 'none',
        cursor: 'ew-resize',
      }}
    >
      {/* base = after */}
      <img src={afterImg} alt={afterLabel} style={img} onError={hideOnError} draggable={false} />

      {/* before clipped to pos% */}
      <img
        src={beforeImg}
        alt={beforeLabel}
        style={{ ...img, clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        onError={hideOnError}
        draggable={false}
      />

      {/* divider + handle */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: `${pos}%`,
          width: 2,
          background: accent,
          boxShadow: `0 0 18px rgba(${accentRGB},0.7)`,
          transform: 'translateX(-1px)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            width: 44,
            height: 44,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.55)',
            border: `2px solid ${accent}`,
            boxShadow: `0 0 24px rgba(${accentRGB},0.45)`,
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            color: accent,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          <span aria-hidden>‹</span>
          <span aria-hidden>›</span>
        </div>
      </div>

      {/* labels */}
      <span style={{ ...pill, left: 14, color: accent, borderColor: `rgba(${accentRGB},0.4)` }}>{beforeLabel}</span>
      <span style={{ ...pill, right: 14 }}>{afterLabel}</span>
      <span style={{ ...pill, left: '50%', transform: 'translateX(-50%)' }}>Drag to compare</span>
    </div>
  );
}
