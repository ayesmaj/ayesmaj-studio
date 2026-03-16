import React, { useEffect, useRef } from 'react';

/* Dark green / warm gold palette */
const GREEN = { r: 74,  g: 120, b: 74  }; // muted forest green
const GOLD  = { r: 200, g: 164, b: 78  }; // #C8A44E warm gold

export default function CircuitBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    let animId;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener('resize', resize);

    /* Circuit nodes */
    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.4 + Math.random() * 1.8,
      pulse: Math.random() * Math.PI * 2,
      useGold: Math.random() > 0.6,
    }));

    /* Floating particles */
    const particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      size: 0.5 + Math.random() * 1.2,
      speedX: (Math.random() - 0.5) * 0.14,
      speedY: -0.07 - Math.random() * 0.11,
      opacity: 0.15 + Math.random() * 0.35,
      useGold: Math.random() > 0.55,
    }));

    /* Static circuit lines */
    const lines = [];
    nodes.forEach((n, i) => {
      const connections = nodes.filter((_, j) => {
        if (j === i) return false;
        const dx = n.x - nodes[j].x;
        const dy = n.y - nodes[j].y;
        return Math.sqrt(dx * dx + dy * dy) < 220;
      }).slice(0, 2);
      connections.forEach(c => {
        lines.push({
          x1: n.x, y1: n.y, x2: c.x, y2: c.y,
          glowPhase: Math.random() * Math.PI * 2,
          useGold: Math.random() > 0.5,
        });
      });
    });

    /* Light sweep */
    let sweepX = -200;

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);

      /* ── Base background: deep blue-black ── */
      const bg = ctx.createRadialGradient(W * 0.5, H * 0.35, 0, W * 0.5, H * 0.35, W * 0.9);
      bg.addColorStop(0, '#0a1a0c');
      bg.addColorStop(0.5, '#07100A');
      bg.addColorStop(1, '#050D07');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* ── Subtle grid ── */
      ctx.strokeStyle = 'rgba(74,120,74,0.08)';
      ctx.lineWidth = 0.4;
      const gs = 72;
      for (let x = 0; x < W; x += gs) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += gs) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      /* ── Deep green center bloom ── */
      const bloom = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, W * 0.5);
      bloom.addColorStop(0, 'rgba(30,80,30,0.08)');
      bloom.addColorStop(1, 'rgba(30,80,30,0)');
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, W, H);

      /* ── Circuit lines ── */
      lines.forEach(l => {
        const glow = 0.5 + 0.5 * Math.sin(t * 0.0006 + l.glowPhase);
        const c = l.useGold ? GOLD : GREEN;
        ctx.strokeStyle = `rgba(${c.r},${c.g},${c.b},${0.05 + glow * 0.1})`;
        ctx.lineWidth = 0.7 + glow * 0.6;
        if (glow > 0.72) {
          ctx.shadowColor = `rgb(${c.r},${c.g},${c.b})`;
          ctx.shadowBlur  = 5;
        } else {
          ctx.shadowBlur = 0;
        }
        const midX = l.x1 + (l.x2 - l.x1) * 0.5;
        ctx.beginPath();
        ctx.moveTo(l.x1, l.y1);
        ctx.lineTo(midX, l.y1);
        ctx.lineTo(midX, l.y2);
        ctx.lineTo(l.x2, l.y2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      /* ── Nodes ── */
      nodes.forEach(n => {
        n.pulse += 0.011;
        const alpha = 0.35 + 0.3 * Math.sin(n.pulse);
        const c = n.useGold ? GOLD : GREEN;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${alpha})`;
        ctx.shadowColor = `rgb(${c.r},${c.g},${c.b})`;
        ctx.shadowBlur  = 7;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      /* ── Floating particles ── */
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        const c = p.useGold ? GOLD : GREEN;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${c.r},${c.g},${c.b},${p.opacity})`;
        ctx.fill();
      });

      /* ── Light sweep ── */
      sweepX += 0.38;
      if (sweepX > W + 400) sweepX = -400;
      const sweep = ctx.createLinearGradient(sweepX - 180, 0, sweepX + 180, 0);
      sweep.addColorStop(0, 'rgba(200,164,78,0)');
      sweep.addColorStop(0.5, 'rgba(200,164,78,0.018)');
      sweep.addColorStop(1, 'rgba(200,164,78,0)');
      ctx.fillStyle = sweep;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
      style={{ background: '#07100A', pointerEvents: 'none' }}
    />
  );
}
