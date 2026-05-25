import React, { useEffect } from 'react';
import CircuitBackground from '@/components/home/CircuitBackground';
import HomeNav from '@/components/home/HomeNav';
import HeroNew from '@/components/home/HeroNew';
import FeaturedServicesSection from '@/components/home/FeaturedServicesSection';
import AboutSection from '@/components/home/AboutSection';
import WebExperiencesPreview from '@/components/home/WebExperiencesPreview';
import WorksGrid from '@/components/home/WorksGrid';
import PortfolioShowcase from '@/components/home/PortfolioShowcase';
import ZoomParallaxSection from '@/components/home/ZoomParallaxSection';
import ReelSection from '@/components/home/ReelSection';
import CommercialsSection from '@/components/home/CommercialsSection';
import BrandingSection from '@/components/home/BrandingSection';
import ProcessTimeline from '@/components/home/ProcessTimeline';
import BeforeAfterSection from '@/components/home/BeforeAfterSlider';
import WhyAyesmaj from '@/components/home/WhyAyesmaj';
import ClientsSection from '@/components/home/ClientsSection';
import HomeFinalCTA from '@/components/home/HomeFinalCTA';
import ContactSection from '@/components/home/ContactSection';
import HomeFooter from '@/components/home/HomeFooter';
import SectionReveal from '@/components/home/SectionReveal';
import WhoWeCreateFor from '@/components/home/WhoWeCreateFor';

export default function Home() {
  useEffect(() => {
    document.title = 'AYESMAJ Studios — Cinematic Websites, 3D Animation & Branding';
  }, []);

  return (
    <div style={{ background: '#07100A', minHeight: '100vh', overflowX: 'clip', position: 'relative' }}>
      {/* Fixed background layer */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
        <CircuitBackground />
      </div>

      {/* Content layer */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <HomeNav />
        <HeroNew />

        {/* Services overview */}
        <SectionReveal variant="up" delay={0}><FeaturedServicesSection /></SectionReveal>

        {/* Studio about */}
        <SectionReveal variant="up" delay={0}><AboutSection /></SectionReveal>

        {/* Web experiences preview */}
        <SectionReveal variant="up" delay={0}><WebExperiencesPreview /></SectionReveal>

        {/* Animation portfolio */}
        <SectionReveal variant="up" delay={0}><WorksGrid /></SectionReveal>

        {/* Portfolio showcase with filters */}
        <SectionReveal variant="up" delay={0}><PortfolioShowcase /></SectionReveal>

        {/* Cinematic scroll parallax */}
        <ZoomParallaxSection />

        {/* Showreel */}
        <SectionReveal variant="up" delay={0}><ReelSection /></SectionReveal>

        {/* Commercials */}
        <SectionReveal variant="up" delay={0}><CommercialsSection /></SectionReveal>

        {/* Branding */}
        <SectionReveal variant="up" delay={0}><BrandingSection /></SectionReveal>

        {/* Process */}
        <SectionReveal variant="up" delay={0}><ProcessTimeline /></SectionReveal>

        {/* Before / After */}
        <SectionReveal variant="up" delay={0}><BeforeAfterSection /></SectionReveal>

        {/* Why AYESMAJ */}
        <SectionReveal variant="up" delay={0}><WhyAyesmaj /></SectionReveal>

        {/* Clients */}
        <SectionReveal variant="up" delay={0}><ClientsSection /></SectionReveal>

        {/* Final CTA */}
        <SectionReveal variant="up" delay={0}><HomeFinalCTA /></SectionReveal>

        {/* Contact form */}
        <SectionReveal variant="up" delay={0}><ContactSection /></SectionReveal>

        <SectionReveal variant="up" delay={0}><HomeFooter /></SectionReveal>
      </div>
    </div>
  );
}
