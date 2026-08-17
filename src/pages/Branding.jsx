import React, { useEffect } from 'react';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import BrandingPortfolio from '@/components/branding/BrandingPortfolio.jsx';

export default function Branding() {
  useEffect(() => {
    document.title = 'Branding & Visual Campaigns — AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#0D0F0E', minHeight: '100vh', overflowX: 'hidden' }}>
      <AyesmajNav />
      <BrandingPortfolio />
      <AyesmajFooter />
    </div>
  );
}
