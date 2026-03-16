import React, { useEffect } from 'react';
import CircuitBackground from '@/components/home/CircuitBackground';
import HomeNav from '@/components/home/HomeNav';
import HeroNew from '@/components/home/HeroNew';
import StatsSection from '@/components/home/StatsSection';
import AboutSection from '@/components/home/AboutSection';
import BeforeAfterSection from '@/components/home/BeforeAfterSlider';
import WorksGrid from '@/components/home/WorksGrid';
import CommercialsSection from '@/components/home/CommercialsSection';
import BrandingSection from '@/components/home/BrandingSection';
import ClientsSection from '@/components/home/ClientsSection';
import ContactSection from '@/components/home/ContactSection';
import HomeFooter from '@/components/home/HomeFooter';
import SectionReveal from '@/components/home/SectionReveal';
import ReelSection from '@/components/home/ReelSection';
import WhoWeCreateFor from '@/components/home/WhoWeCreateFor';

export default function Home() {
  useEffect(() => {
    document.title = 'AYESMAJ Studios — Premium 3D Animation & Brand Films';
  }, []);

  return (
    <div style={{ background: '#07100A', minHeight: '100vh', overflowX: 'clip', position: 'relative' }}>
      {/* Background layer (fixed, behind everything) */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
        <CircuitBackground />
      </div>

      {/* Content layer (relative, above background) */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        
        <HomeNav />
      <HeroNew />
            <SectionReveal variant="up" delay={0}><AboutSection /></SectionReveal>
      <WhoWeCreateFor />
      <SectionReveal variant="up" delay={0}><BeforeAfterSection /></SectionReveal>
      <SectionReveal variant="up" delay={0}><WorksGrid /></SectionReveal>
      <SectionReveal variant="up" delay={0}><ReelSection /></SectionReveal>
      <SectionReveal variant="up" delay={0}><CommercialsSection /></SectionReveal>
      <SectionReveal variant="up" delay={0}><BrandingSection /></SectionReveal>
      <SectionReveal variant="up" delay={0}><ClientsSection /></SectionReveal>
      <SectionReveal variant="up" delay={0}><ContactSection /></SectionReveal>
      <SectionReveal variant="up" delay={0}><HomeFooter /></SectionReveal>
      </div>
    </div>
  );
}