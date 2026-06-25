import React, { useEffect } from 'react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import HeroWorlds from '@/components/ayesmaj/HeroWorlds';
import FutureOfBranding from '@/components/ayesmaj/sections/FutureOfBranding';
import SelectedWorlds from '@/components/ayesmaj/sections/SelectedWorlds';
import PerceptionPrice from '@/components/ayesmaj/sections/PerceptionPrice';
import CreativeSystem from '@/components/ayesmaj/sections/CreativeSystem';
import FinalCTA from '@/components/ayesmaj/sections/FinalCTA';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';

export default function Home() {
  useEffect(() => {
    document.title = 'AYESMAJ Studios | Cinematic Branding, AI Content, Websites & 3D Worlds';
  }, []);

  return (
    <div style={{ background: '#020302', minHeight: '100vh', overflowX: 'clip', position: 'relative' }}>
      {/* ── Cinematic background atmosphere (shows behind all sections) ── */}
      <div aria-hidden style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background:
          'radial-gradient(circle at 16% 30%, rgba(179,255,63,0.10), transparent 42%),' +
          'radial-gradient(circle at 84% 22%, rgba(155,92,255,0.10), transparent 42%),' +
          'radial-gradient(circle at 50% 78%, rgba(255,176,0,0.08), transparent 45%),' +
          'linear-gradient(180deg, #020302, #050805)',
      }} />
      {/* Subtle grid, faded at the edges */}
      <div aria-hidden style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.12,
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        WebkitMaskImage: 'radial-gradient(ellipse 75% 75% at 50% 45%, black, transparent 82%)',
        maskImage: 'radial-gradient(ellipse 75% 75% at 50% 45%, black, transparent 82%)',
      }} />

      {/* ── Content (above the atmosphere) ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Cinematic hero — three worlds */}
        <AyesmajNav />
        <HeroWorlds />

        {/* Section 1 — three business categories */}
        <FutureOfBranding />

        {/* Section 2 — portfolio showcase with filters */}
        <SelectedWorlds />

        {/* Section 3 — perception / value argument */}
        <PerceptionPrice />

        {/* Section 4 — creative process timeline */}
        <CreativeSystem />

        {/* Section 5 — final CTA */}
        <FinalCTA />

        {/* Footer */}
        <AyesmajFooter />
      </div>
    </div>
  );
}
