import React, { useEffect } from 'react';
import CircuitBackground from '@/components/home/CircuitBackground';
import HomeNav from '@/components/home/HomeNav';
import HomeFooter from '@/components/home/HomeFooter';
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
    <div style={{ background: '#0B0F0C', minHeight: '100vh', overflowX: 'hidden' }}>
      <CircuitBackground />
      <HomeNav />
      <BrandingHero />
      <BrandingPortfolio />
      <BrandingProcess />
      <BrandingClients />
      <BrandingCTA />
      <HomeFooter />
    </div>
  );
}