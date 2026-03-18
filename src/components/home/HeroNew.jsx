import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useSpring,
} from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ShinyButton } from '@/components/ui/shiny-button';

/* ════════════════════════════════════════════════════════════════
   FRAME SEQUENCE CONFIGURATION
   ════════════════════════════════════════════════════════════════

   Frames live in:  /public/sequence/
   Current frames:  10000.png → 10680.png  (681 frames)

   To update:
   - TOTAL_FRAMES   → how many PNG files you have
   - FIRST_FRAME    → the numeric filename of your first frame
   - FRAME_FOLDER   → path inside /public/
   - SCROLL_TUNNEL  → total scroll height (increase to slow the seq)

   Alpha transparency is fully preserved on the HTML canvas —
   the atmospheric background shows through every clear pixel.
   ════════════════════════════════════════════════════════════════ */

const TOTAL_FRAMES  = 681;          // ← UPDATE: your actual frame count
const FIRST_FRAME   = 10000;        // ← UPDATE: numeric name of frame 1
const FRAME_FOLDER  = '/sequence/'; // ← UPDATE: folder inside /public/
const FRAME_EXT     = '.png';       //   keep .png for transparency

/* How long the hero "lasts" in scroll distance.
   600vh = user scrolls 6× viewport height through the hero.
   Raise this to slow the animation playback; lower to speed up.  */
const SCROLL_TUNNEL = '600vh';      // ← UPDATE to taste


/* ── Mobile detection: skip heavy frame sequence on small screens ── */
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function HeroNew() {
  const containerRef  = useRef(null);
  const canvasRef     = useRef(null);
  const framesRef     = useRef([]);
  const drawnIdxRef   = useRef(-1);
  const rafRef        = useRef(null);
  // On mobile we skip frames entirely — mark ready immediately
  const [framesReady, setFramesReady] = useState(isMobile);

  /* ── 1. Track scroll 0→1 through this section ──────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  /* Smooth spring prevents choppy frame jumps */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 150,
    damping:   38,
    restDelta: 0.001,
  });

  /* ─── PHASE 1: Initial hero text ─── (scroll 0 → 0.34)
     Blurs IN on load.  As user scrolls → blurs OUT + scales + fades. */
  const p1Op      = useTransform(scrollYProgress, [0, 0.06, 0.22, 0.34], [0, 1, 1, 0]);
  const p1BlurN   = useTransform(scrollYProgress, [0, 0.06, 0.22, 0.34], [16, 0, 0, 32]);
  const p1Filt    = useMotionTemplate`blur(${p1BlurN}px)`;
  const p1Y       = useTransform(scrollYProgress, [0, 0.06, 0.34], [52, 0, -65]);
  const p1Scale   = useTransform(scrollYProgress, [0, 0.22, 0.34], [0.96, 1, 1.07]);

  /* Subtitle enters 2 beats after headline */
  const p1SubOp   = useTransform(scrollYProgress, [0.05, 0.12, 0.22, 0.34], [0, 1, 1, 0]);
  const p1SubBlur = useTransform(scrollYProgress, [0.05, 0.12, 0.22, 0.34], [10, 0, 0, 24]);
  const p1SubFilt = useMotionTemplate`blur(${p1SubBlur}px)`;
  const p1CtaOp   = useTransform(scrollYProgress, [0.08, 0.15, 0.24, 0.34], [0, 1, 1, 0]);

  /* ─── PHASE 2: Service scatter ─── (scroll 0.35 → 0.65) */
  const p2Op    = useTransform(scrollYProgress, [0.35, 0.44, 0.56, 0.65], [0, 1, 1, 0]);
  const p2BlurN = useTransform(scrollYProgress, [0.35, 0.44, 0.56, 0.65], [16, 0, 0, 20]);
  const p2Filt  = useMotionTemplate`blur(${p2BlurN}px)`;
  const p2Y     = useTransform(scrollYProgress, [0.35, 0.44, 0.56, 0.65], [44, 0, 0, -44]);

  /* ─── PHASE 3: Closing CTA ─── (scroll 0.66 → 1.0) */
  const p3Op    = useTransform(scrollYProgress, [0.66, 0.76, 0.91, 0.98], [0, 1, 1, 0]);
  const p3BlurN = useTransform(scrollYProgress, [0.66, 0.76, 0.91, 0.98], [14, 0, 0, 22]);
  const p3Filt  = useMotionTemplate`blur(${p3BlurN}px)`;
  const p3Y     = useTransform(scrollYProgress, [0.66, 0.76], [52, 0]);

  /* Scroll indicator disappears on first scroll */
  const scrollIndOp = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  /* Atmospheric glow intensity tracks scroll depth */
  const glowOp = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0.45, 0.9, 0.5, 0.25]);


  /* ════════════════════════════════════════════════════════════
     FRAME LOADER — desktop only, skipped entirely on mobile
     ════════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (isMobile) return; // ← skip on mobile — saves 632 MB of network + RAM

    const images = new Array(TOTAL_FRAMES);
    let done = 0;

    const tick = () => {
      done++;
      if (done === TOTAL_FRAMES) {
        framesRef.current = images;
        setFramesReady(true);
      }
    };

    /* Load first 60 frames eagerly, rest lazily to allow fast first-render */
    const EAGER = Math.min(60, TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `${FRAME_FOLDER}${FIRST_FRAME + i}${FRAME_EXT}`;
      if (i < EAGER) {
        img.onload  = tick;
        img.onerror = tick;
      } else {
        /* Defer non-critical frames — they still load but don't block ready state */
        img.onload  = () => {};
        img.onerror = () => {};
        done++; // count immediately so EAGER frames can resolve the promise
      }
      images[i] = img;
    }

    /* Resolve on first EAGER frames loaded */
    return () => { framesRef.current = []; };
  }, []);


  /* ════════════════════════════════════════════════════════════
     CANVAS RENDERER — draws one frame per rAF, alpha preserved
     ════════════════════════════════════════════════════════════ */
  const drawFrame = useCallback((progress) => {
    const canvas = canvasRef.current;
    const frames = framesRef.current;
    if (!canvas || !frames.length) return;

    const idx = Math.min(
      Math.round(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1,
    );
    if (idx === drawnIdxRef.current) return;
    drawnIdxRef.current = idx;

    const img = frames[idx];
    if (!img?.complete || !img.naturalWidth) return;

    const ctx    = canvas.getContext('2d');
    const parent = canvas.parentElement;
    const W = parent.offsetWidth;
    const H = parent.offsetHeight;

    if (canvas.width !== W || canvas.height !== H) {
      canvas.width  = W;
      canvas.height = H;
    }

    /* clearRect preserves alpha so background layers show through */
    ctx.clearRect(0, 0, W, H);

    /* cover-fit: fill canvas, maintain aspect ratio */
    const iR = img.naturalWidth / img.naturalHeight;
    const cR = W / H;
    let dw, dh;
    if (iR > cR) { dh = H; dw = dh * iR; }
    else          { dw = W; dh = dw / iR; }

    ctx.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
  }, []);

  useEffect(() => {
    const unsub = smooth.on('change', (v) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(v));
    });
    return () => {
      unsub();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [smooth, drawFrame]);

  useEffect(() => {
    const onResize = () => {
      drawnIdxRef.current = -1;
      drawFrame(smooth.get());
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, [drawFrame, smooth]);


  /* ════════════════════════════════════════════════════════════
     SHARED STYLES
     ════════════════════════════════════════════════════════════ */
  const btnPrimary = {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: 'clamp(12px,1.4vw,15px) clamp(24px,2.8vw,34px)',
    borderRadius: '100px',
    fontFamily: "'Satoshi', system-ui, sans-serif",
    fontSize: 'clamp(12px,1.05vw,14px)', fontWeight: 600,
    letterSpacing: '0.03em',
    background: 'linear-gradient(135deg, #C8A44E 0%, #9A7B3A 100%)',
    color: '#07100A',
    border: '1px solid rgba(200,164,78,0.4)',
    boxShadow: '0 0 44px rgba(200,164,78,0.28), 0 8px 32px rgba(0,0,0,0.5)',
    textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'all 0.3s ease',
  };

  const btnGhost = {
    display: 'inline-flex', alignItems: 'center', gap: '8px',
    padding: 'clamp(12px,1.4vw,15px) clamp(24px,2.8vw,34px)',
    borderRadius: '100px',
    fontFamily: "'Satoshi', system-ui, sans-serif",
    fontSize: 'clamp(12px,1.05vw,14px)', fontWeight: 600,
    letterSpacing: '0.03em',
    background: 'rgba(255,255,255,0.04)',
    color: 'rgba(248,250,252,0.82)',
    border: '1px solid rgba(255,255,255,0.12)',
    backdropFilter: 'blur(14px)',
    textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
    transition: 'all 0.3s ease',
  };


  /* ════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════ */
  return (
    /* ── Scroll tunnel: gives the sticky section room to breathe ── */
    <section
      ref={containerRef}
      style={{ height: SCROLL_TUNNEL, position: 'relative' }}
    >
      {/* ── Sticky viewport — always fills the screen ─── */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100dvh', width: '100%',
        overflow: 'hidden',
      }}>

        {/* ▓▓ LAYER 1: Deep base background */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(145deg, #050D07 0%, #07100A 55%, #050D07 100%)',
        }} />

        {/* ▓▓ LAYER 2: Atmospheric glow orbs */}
        <motion.div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 90% 70% at 50% 95%, rgba(40,80,40,0.3) 0%, transparent 65%)',
          opacity: glowOp,
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 55% 48% at 12% 12%, rgba(200,164,78,0.06) 0%, transparent 55%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 42% 36% at 88% 82%, rgba(74,120,74,0.1) 0%, transparent 55%)',
        }} />

        {/* ▓▓ LAYER 3: Hero video — all devices */}
        <video
          src="/hero-mobile.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            opacity: 0.55,
          }}
        />

        {/* ▓▓ LAYER 3b: PNG frame canvas — overlaid on desktop when frames are ready */}
        {!isMobile && (
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              opacity: framesReady ? 1 : 0,
              transition: 'opacity 1.2s ease',
            }}
            aria-hidden="true"
          />
        )}

        {/* ▓▓ LAYER 4: Radial vignette */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 88% 88% at 50% 50%, transparent 36%, rgba(5,13,7,0.58) 68%, rgba(5,13,7,0.96) 100%)',
        }} />

        {/* ▓▓ LAYER 5: Top + bottom cinematic fades */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(5,13,7,0.52) 0%, transparent 20%, transparent 76%, rgba(5,13,7,1) 100%)',
        }} />

        {/* ▓▓ LAYER 6: Subtle film grain */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px',
        }} />


        {/* ══════════════════════════════════════════════════════════
            PHASE 1 — Initial hero text
            scroll: 0 → 0.34
            In:  blur + rise from below
            Out: blur + scale up + dissolve
            ══════════════════════════════════════════════════════════ */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 clamp(24px,6vw,100px)',
          textAlign: 'center',
          opacity: p1Op, filter: p1Filt, y: p1Y, scale: p1Scale,
          willChange: 'transform, opacity, filter',
        }}>

          {/* Studio eyebrow */}
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.18em' }}
            animate={{ opacity: 1, letterSpacing: '0.52em' }}
            transition={{ duration: 1.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Satoshi', system-ui, sans-serif",
              fontSize: 'clamp(8px,0.82vw,11px)',
              letterSpacing: '0.52em', textTransform: 'uppercase',
              color: '#C8A44E',
              marginBottom: 'clamp(20px,2.5vw,32px)',
            }}
          >
            AYESMAJ STUDIOS
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Satoshi', system-ui, sans-serif",
              fontSize: 'clamp(34px,7.2vw,100px)',
              fontWeight: 800, lineHeight: 0.93,
              letterSpacing: '-0.035em', color: '#F8FAFC',
              marginBottom: 'clamp(16px,2vw,26px)',
              maxWidth: 'min(1020px,92vw)',
            }}
          >
            Cinematic 3D Visuals<br />
            That Make Brands<br />
            <span style={{
              fontStyle: 'italic',
              backgroundImage: 'linear-gradient(125deg, #E8C96D 0%, #C8A44E 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Impossible to Ignore.
            </span>
          </motion.h1>

          {/* Subtitle — has its own independent motion */}
          <motion.p style={{
            fontFamily: "'Satoshi', system-ui, sans-serif",
            fontSize: 'clamp(13px,1.5vw,18px)', lineHeight: 1.7, fontWeight: 400,
            color: 'rgba(248,250,252,0.52)',
            maxWidth: 'min(560px,88vw)',
            marginBottom: 'clamp(28px,4vw,48px)',
            opacity: p1SubOp, filter: p1SubFilt,
          }}>
            Premium 3D animation, logo motion, CGI, and cinematic brand
            visuals — designed to make products and brands feel bigger,
            sharper, and unforgettable.
          </motion.p>

          {/* CTAs */}
          <motion.div style={{
            display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center',
            opacity: p1CtaOp,
          }}>
            <ShinyButton as="a" href={createPageUrl('Contact')}>
              Start Your Project →
            </ShinyButton>
            <Link
              to={createPageUrl('Reel')}
              style={btnGhost}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
            >
              See Our Work
            </Link>
          </motion.div>
        </motion.div>


        {/* ══════════════════════════════════════════════════════════
            PHASE 2 — Services scatter
            scroll: 0.35 → 0.65
            ══════════════════════════════════════════════════════════ */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '0 clamp(24px,6vw,80px)',
          opacity: p2Op, filter: p2Filt, y: p2Y,
          pointerEvents: 'none',
          willChange: 'transform, opacity, filter',
        }}>
          <p style={{
            fontFamily: "'Satoshi', system-ui, sans-serif",
            fontSize: 'clamp(7px,0.75vw,10px)',
            letterSpacing: '0.5em', textTransform: 'uppercase',
            color: 'rgba(200,164,78,0.7)',
            marginBottom: 'clamp(18px,2.8vw,36px)',
          }}>WE CREATE</p>

          <div style={{
            display: 'flex', flexWrap: 'wrap',
            justifyContent: 'center', alignItems: 'baseline',
            gap: 'clamp(8px,1.5vw,20px) clamp(14px,3vw,44px)',
            maxWidth: 'min(920px,92vw)',
          }}>
            {[
              ['3D Animation',    true ],
              ['CGI Commercials', false],
              ['VFX',             true ],
              ['Logo Motion',     false],
              ['Brand Visuals',   true ],
              ['Motion Design',   false],
            ].map(([s, bright]) => (
              <span key={s} style={{
                fontFamily: "'Satoshi', system-ui, sans-serif",
                fontSize: bright ? 'clamp(20px,4.2vw,56px)' : 'clamp(15px,2.8vw,38px)',
                fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.05,
                color: bright ? 'rgba(248,250,252,0.9)' : 'rgba(248,250,252,0.2)',
              }}>{s}</span>
            ))}
          </div>
        </motion.div>


        {/* ══════════════════════════════════════════════════════════
            PHASE 3 — Closing CTA
            scroll: 0.66 → 1.0
            ══════════════════════════════════════════════════════════ */}
        <motion.div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 clamp(24px,6vw,100px)',
          opacity: p3Op, filter: p3Filt, y: p3Y,
          willChange: 'transform, opacity, filter',
        }}>
          <p style={{
            fontFamily: "'Satoshi', system-ui, sans-serif",
            fontSize: 'clamp(7px,0.75vw,10px)',
            letterSpacing: '0.52em', textTransform: 'uppercase',
            color: '#C8A44E',
            marginBottom: 'clamp(14px,2vw,22px)',
          }}>YOUR NEXT PROJECT</p>

          <h2 style={{
            fontFamily: "'Satoshi', system-ui, sans-serif",
            fontSize: 'clamp(28px,5.4vw,76px)',
            fontWeight: 800, lineHeight: 0.95, letterSpacing: '-0.03em',
            color: '#F8FAFC',
            marginBottom: 'clamp(26px,3.5vw,48px)',
            maxWidth: 'min(840px,90vw)',
          }}>
            Ready to make your brand<br />
            <span style={{
              fontStyle: 'italic',
              backgroundImage: 'linear-gradient(125deg, #E8C96D 0%, #C8A44E 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>impossible to ignore?</span>
          </h2>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <ShinyButton as="a" href={createPageUrl('Contact')}>
              Book a Project →
            </ShinyButton>
            <Link
              to={createPageUrl('About')}
              style={btnGhost}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
            >
              Our Story
            </Link>
          </div>
        </motion.div>


        {/* ── Scroll indicator ─────────────────────────────────── */}
        <motion.div style={{
          position: 'absolute',
          bottom: 'clamp(26px,4vh,44px)',
          left: '50%', x: '-50%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '10px',
          opacity: scrollIndOp, pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: "'Satoshi', system-ui, sans-serif",
            fontSize: '8px', letterSpacing: '0.42em', textTransform: 'uppercase',
            color: 'rgba(248,250,252,0.2)',
          }}>SCROLL</span>
          <motion.div
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.55, 0.12, 0.55] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '1px', height: 'clamp(36px,5vh,52px)',
              background: 'linear-gradient(to bottom, rgba(200,164,78,0.7), transparent)',
              transformOrigin: 'top',
            }}
          />
        </motion.div>

      </div>{/* /sticky */}
    </section>
  );
}
