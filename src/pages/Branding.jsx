import React, { useEffect } from 'react';
import CircuitBackground from '@/components/home/CircuitBackground';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import BrandingHero from '@/components/branding/BrandingHero.jsx';
import BrandingProcess from '@/components/branding/BrandingProcess.jsx';
import BrandingClients from '@/components/branding/BrandingClients.jsx';
import BrandingCTA from '@/components/branding/BrandingCTA.jsx';
import BrandingPortfolio from '@/components/branding/BrandingPortfolio.jsx';

export default function Branding() {
  useEffect(() => {
    document.title = 'Branding & Visual Campaigns — AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#030303', minHeight: '100vh', overflowX: 'hidden' }}>
      <CircuitBackground />
      <AyesmajNav />
      <BrandingHero />
      <BrandingPortfolio />
      <BrandingProcess />
      <BrandingClients />
      <BrandingCTA />
      <AyesmajFooter />
    </div>
  );
}