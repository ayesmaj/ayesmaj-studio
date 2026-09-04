import React, { useEffect } from 'react';
import Seo from '@/components/ayesmaj/Seo';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import AyesmajBackground from '@/components/ayesmaj/AyesmajBackground';
import HeroWorlds from '@/components/ayesmaj/HeroWorlds';
import FutureOfBranding from '@/components/ayesmaj/sections/FutureOfBranding';
import CapabilitiesShowcase from '@/components/ayesmaj/sections/CapabilitiesShowcase';
import WebExpPreview from '@/components/ayesmaj/sections/WebExpPreview';
import Commercials from '@/components/ayesmaj/sections/Commercials';
import RealBrands from '@/components/ayesmaj/sections/RealBrands';
import PerceptionPrice from '@/components/ayesmaj/sections/PerceptionPrice';
import CreativeSystem from '@/components/ayesmaj/sections/CreativeSystem';
import StudioAbout from '@/components/ayesmaj/sections/StudioAbout';
import ClientsStrip from '@/components/ayesmaj/sections/ClientsStrip';
import BeforeAfterShowcase from '@/components/ayesmaj/sections/BeforeAfterShowcase';
import BrandWorldCTA from '@/components/ayesmaj/sections/BrandWorldCTA';

export default function Home() {
  useEffect(() => {
    document.title = 'AYESMAJ Studios | Cinematic Branding, AI Content, Websites & 3D Worlds';
  }, []);

  return (
    <div style={{ background: '#020302', minHeight: '100vh', overflowX: 'clip', position: 'relative' }}>
      <Seo
        title="AYESMAJ Studios | Cinematic Branding, AI Content, Websites & 3D Worlds"
        description="AYESMAJ Studios builds complete visual worlds — brand identity, cinematic websites, AI content production, and immersive 3D — as one connected creative system."
        path="/"
      />
      {/* Shared cinematic background atmosphere */}
      <AyesmajBackground accent="255,176,0" />

      {/* Content above the atmosphere */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AyesmajNav />
        <HeroWorlds />

        {/* Full-screen visual universe */}
        <FutureOfBranding />

        {/* A concise overview of the studio's full skill set */}
        <CapabilitiesShowcase />

        {/* Web experiences preview */}
        <WebExpPreview />

        {/* Showreel / cinematic commercials */}
        <Commercials />

        {/* Portfolio showcase */}
        <RealBrands />

        {/* Self-initiated work and visual experiments */}

        {/* Perception / value argument */}
        <PerceptionPrice />

        {/* Storyboard — from idea to launch */}
        <CreativeSystem />

        {/* Before / after — drag to compare */}
        <BeforeAfterShowcase />

        {/* The studio + stats */}
        <StudioAbout />

        {/* Clients wall with hover reveal */}
        <ClientsStrip />

        {/* Ready to build a brand world — bright luxury form */}
        <BrandWorldCTA />

        <AyesmajFooter />
      </div>
    </div>
  );
}
