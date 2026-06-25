import React, { useEffect } from 'react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import AyesmajBackground from '@/components/ayesmaj/AyesmajBackground';
import HeroWorlds from '@/components/ayesmaj/HeroWorlds';
import FutureOfBranding from '@/components/ayesmaj/sections/FutureOfBranding';
import WebExpPreview from '@/components/ayesmaj/sections/WebExpPreview';
import Commercials from '@/components/ayesmaj/sections/Commercials';
import SelectedWorlds from '@/components/ayesmaj/sections/SelectedWorlds';
import PerceptionPrice from '@/components/ayesmaj/sections/PerceptionPrice';
import CreativeSystem from '@/components/ayesmaj/sections/CreativeSystem';
import StudioAbout from '@/components/ayesmaj/sections/StudioAbout';
import ClientsStrip from '@/components/ayesmaj/sections/ClientsStrip';
import FinalCTA from '@/components/ayesmaj/sections/FinalCTA';

export default function Home() {
  useEffect(() => {
    document.title = 'AYESMAJ Studios | Cinematic Branding, AI Content, Websites & 3D Worlds';
  }, []);

  return (
    <div style={{ background: '#020302', minHeight: '100vh', overflowX: 'clip', position: 'relative' }}>
      {/* Shared cinematic background atmosphere */}
      <AyesmajBackground accent="255,176,0" />

      {/* Content above the atmosphere */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AyesmajNav />
        <HeroWorlds />

        {/* Three business categories */}
        <FutureOfBranding />

        {/* Web experiences preview */}
        <WebExpPreview />

        {/* Showreel / cinematic commercials */}
        <Commercials />

        {/* Portfolio showcase */}
        <SelectedWorlds />

        {/* Perception / value argument */}
        <PerceptionPrice />

        {/* Creative process timeline */}
        <CreativeSystem />

        {/* The studio + stats */}
        <StudioAbout />

        {/* Clients marquee */}
        <ClientsStrip />

        {/* Final CTA */}
        <FinalCTA />

        <AyesmajFooter />
      </div>
    </div>
  );
}
