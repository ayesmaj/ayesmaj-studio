import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  Monitor, Zap, Box, Cpu, LayoutGrid, TrendingUp,
  Check, ArrowRight, Film, Layers, Smartphone, Star,
} from 'lucide-react';
import CircuitBackground from '@/components/home/CircuitBackground';
import HomeNav from '@/components/home/HomeNav';
import HomeFooter from '@/components/home/HomeFooter';

const GOLD = '#C8A44E';
const GOLD_LIGHT = '#E8C96D';
const GREEN = '#B3E65A';
const BG = '#07100A';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

/* ── HERO ───────────────────────────────────────────────────── */
function WEHero() {
  return (
    <section style={{
      minHeight: '100dvh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center',
      padding: '120px clamp(24px,6vw,100px) 80px',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background layers */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(40,80,40,0.18) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 50% 40% at 80% 80%, rgba(200,164,78,0.06) 0%, transparent 55%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(5,13,7,0.6) 0%, transparent 30%, transparent 70%, rgba(5,13,7,1) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(200,164,78,0.08)',
          border: '1px solid rgba(200,164,78,0.28)',
          borderRadius: 100, padding: '6px 18px',
          marginBottom: 28,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD, boxShadow: `0 0 8px rgba(200,164,78,0.8)` }} />
        <span style={{
          fontFamily: "'Satoshi', system-ui, sans-serif",
          fontSize: 'clamp(8px,0.7vw,10px)', letterSpacing: '0.3em',
          textTransform: 'uppercase', color: 'rgba(200,164,78,0.85)', fontWeight: 600,
        }}>
          Cinematic Web Experiences
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Satoshi', system-ui, sans-serif",
          fontSize: 'clamp(32px,6.5vw,90px)',
          fontWeight: 800, lineHeight: 0.94,
          letterSpacing: '-0.035em', color: '#F8FAFC',
          marginBottom: 'clamp(16px,2vw,24px)',
          maxWidth: 'min(1000px,92vw)',
        }}
      >
        Websites That Feel Like<br />
        <span style={{
          fontStyle: 'italic',
          background: `linear-gradient(125deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>
          Cinematic Digital Showrooms
        </span>
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: "'Satoshi', system-ui, sans-serif",
          fontSize: 'clamp(14px,1.4vw,18px)', lineHeight: 1.7,
          color: 'rgba(248,250,252,0.5)', maxWidth: 'min(580px,88vw)',
          marginBottom: 'clamp(32px,4vw,52px)',
        }}
      >
        We create premium websites, interactive landing pages, and AI-powered digital experiences for brands that want to stand out instantly.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Link
          to={createPageUrl('Contact')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: "'Satoshi', system-ui, sans-serif",
            fontSize: 'clamp(11px,0.9vw,13px)', fontWeight: 700, letterSpacing: '0.06em',
            padding: 'clamp(13px,1.3vw,16px) clamp(28px,2.8vw,40px)',
            borderRadius: 100,
            background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 50%, #9A7B3A 100%)`,
            color: BG, border: '1px solid rgba(200,164,78,0.4)',
            boxShadow: '0 0 44px rgba(200,164,78,0.3), 0 8px 32px rgba(0,0,0,0.5)',
            textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 60px rgba(200,164,78,0.5), 0 12px 40px rgba(0,0,0,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 44px rgba(200,164,78,0.3), 0 8px 32px rgba(0,0,0,0.5)'; e.currentTarget.style.transform = ''; }}
        >
          Build My Website <ArrowRight size={14} />
        </Link>
        <Link
          to={createPageUrl('Branding')}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: "'Satoshi', system-ui, sans-serif",
            fontSize: 'clamp(11px,0.9vw,13px)', fontWeight: 700, letterSpacing: '0.06em',
            padding: 'clamp(13px,1.3vw,16px) clamp(28px,2.8vw,40px)',
            borderRadius: 100,
            background: 'rgba(255,255,255,0.04)',
            color: 'rgba(248,250,252,0.82)',
            border: '1px solid rgba(255,255,255,0.12)',
            backdropFilter: 'blur(14px)', textDecoration: 'none',
            whiteSpace: 'nowrap', transition: 'all 0.3s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
        >
          See Website Work
        </Link>
      </motion.div>

      {/* Live website preview videos in browser frames */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex', gap: 16, marginTop: 60,
          maxWidth: 'min(900px,90vw)', width: '100%',
          justifyContent: 'center', flexWrap: 'wrap',
        }}
      >
        {[
          { src: '/videos/websites/website-1.mp4', url: 'luxury-brand.com', accent: GOLD },
          { src: '/videos/websites/website-2.mp4', url: 'aistartup.io', accent: GREEN },
          { src: '/videos/websites/website-3.mp4', url: 'realestate.co', accent: GOLD },
        ].map((m, i) => (
          <motion.div
            key={m.url}
            animate={{ y: [0, -8 + i * 3, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            style={{
              flex: '1 1 220px', maxWidth: 280,
              background: 'rgba(255,255,255,0.02)',
              border: `1px solid rgba(${m.accent === GOLD ? '200,164,78' : '179,230,90'},0.2)`,
              borderRadius: 12, overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            }}
          >
            {/* Browser chrome */}
            <div style={{ background: 'rgba(5,10,6,0.95)', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 6, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              {['#FF5F57','#FEBC2E','#28C840'].map((c,j) => (
                <div key={j} style={{ width: 7, height: 7, borderRadius: '50%', background: c, opacity: 0.65 }} />
              ))}
              <div style={{ flex: 1, height: 16, background: 'rgba(255,255,255,0.04)', borderRadius: 4, marginLeft: 6, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>
                <span style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 8, color: 'rgba(255,255,255,0.22)' }}>{m.url}</span>
              </div>
            </div>
            {/* Actual website video */}
            <div style={{ height: 120, overflow: 'hidden' }}>
              <video
                src={m.src}
                autoPlay muted loop playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

/* ── WHAT WE BUILD ──────────────────────────────────────────── */
const BUILDS = [
  { icon: Monitor, title: 'Premium Business Websites', desc: 'Full multi-page websites that represent your brand at the highest level — every page crafted with intention.', accent: GOLD },
  { icon: Zap, title: 'Interactive Landing Pages', desc: 'Conversion-focused pages with cinematic scroll animations, 3D elements, and magnetic CTAs.', accent: GREEN },
  { icon: Box, title: '3D Product Websites', desc: 'Interactive 3D product showcases and configurators that let visitors experience your product before buying.', accent: GOLD },
  { icon: Cpu, title: 'AI-Powered Websites', desc: 'Smart websites with embedded AI assistants, lead capture systems, and personalization engines.', accent: GREEN },
  { icon: Star, title: 'Brand Portfolio Websites', desc: 'Premium creative portfolios that position agencies, studios, and creatives as world-class.', accent: GOLD },
  { icon: TrendingUp, title: 'Sales Funnel Pages', desc: 'High-conversion funnel systems designed to turn visitors into paying clients on the first visit.', accent: GREEN },
];

function WhatWeBuild() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
        <motion.div {...fade(0)} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.52em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 10, letterSpacing: '0.52em', textTransform: 'uppercase', color: GOLD, marginBottom: 14 }}
          >
            WHAT WE BUILD
          </motion.p>
          <h2 style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(26px,4vw,56px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.032em', color: '#F8FAFC' }}>
            Not Templates.{' '}
            <span style={{ fontStyle: 'italic', background: `linear-gradient(125deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Digital Experiences.
            </span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(12px,1.5vw,18px)' }}>
          {BUILDS.map((b, i) => {
            const accentRGB = b.accent === GOLD ? '200,164,78' : '179,230,90';
            return (
              <motion.div
                key={b.title}
                {...fade(0.06 + i * 0.07)}
                whileHover={{ borderColor: `rgba(${accentRGB},0.3)`, boxShadow: `0 0 40px rgba(${accentRGB},0.1), 0 20px 60px rgba(0,0,0,0.5)` }}
                transition={{ duration: 0.35 }}
                style={{
                  background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(200,164,78,0.1)',
                  borderRadius: 18, padding: 'clamp(24px,2.2vw,32px)',
                  backdropFilter: 'blur(16px)',
                }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 12, border: `1px solid rgba(${accentRGB},0.25)`, background: `rgba(${accentRGB},0.07)`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <b.icon size={20} color={b.accent} />
                </div>
                <h3 style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(15px,1.2vw,17px)', fontWeight: 700, color: '#F8FAFC', marginBottom: 8, letterSpacing: '-0.01em' }}>{b.title}</h3>
                <p style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(12px,0.95vw,14px)', color: 'rgba(248,250,252,0.44)', lineHeight: 1.68 }}>{b.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── SHOWCASE ───────────────────────────────────────────────── */
// Update titles, categories, and descriptions below to match your actual website videos
const WEB_PROJECTS = [
  {
    id: 1, src: '/videos/websites/website-1.mp4', accent: GOLD,
    category: 'Business Website',
    title: 'AI Startup Platform',
    desc: 'Modern SaaS website with animated feature sections, glassmorphism UI, and a conversion-optimized pricing flow designed to close on the first visit.',
  },
  {
    id: 2, src: '/videos/websites/website-2.mp4', accent: GREEN,
    category: 'Real Estate',
    title: 'Premium Property Platform',
    desc: 'High-end real estate website with interactive map, video hero, and a filtered listings experience that positions the agency above every competitor in the market.',
  },
  {
    id: 3, src: '/videos/websites/website-3.mp4', accent: GOLD,
    category: 'CPG / Brand',
    title: 'Energy Drink Brand',
    desc: 'Full-energy brand website with kinetic typography, vibrant color transitions, and scroll-driven storytelling that sells the lifestyle — not just the product.',
  },
  {
    id: 4, src: '/videos/websites/website-4.mp4', accent: GREEN,
    category: 'Service Business',
    title: 'Home Services Funnel',
    desc: 'High-conversion lead-gen site for a home service company — built to build trust on the first scroll and route qualified leads to the right CTA every time.',
  },
  {
    id: 5, src: '/videos/websites/website-5.mp4', accent: GOLD,
    category: 'Portfolio',
    title: 'Creative Studio Portfolio',
    desc: 'World-class portfolio experience for a design agency — case study deep-dives, animated transitions, and a brand presence that commands premium project rates.',
  },
  {
    id: 6, src: '/videos/websites/website-6.mp4', accent: GREEN,
    category: 'Tech Product',
    title: 'Mobile App Landing',
    desc: 'Product launch page with scroll-driven 3D phone mockup, animated feature demos, and a waitlist flow engineered to capture leads from the first impression.',
  },
  {
    id: 7, src: '/videos/websites/website-7.mp4', accent: GOLD,
    category: 'Professional Services',
    title: 'Executive Services Firm',
    desc: 'Authority-first website for a consultancy — layered social proof, intelligent lead capture, and a brand voice designed to attract high-ticket clients from day one.',
  },
];

function WebVideoCard({ project, index }) {
  const isEven = index % 2 === 0;
  const accentRGB = project.accent === GOLD ? '200,164,78' : '179,230,90';

  return (
    <motion.div
      {...fade(0.05)}
      style={{
        display: 'flex',
        flexDirection: isEven ? 'row' : 'row-reverse',
        flexWrap: 'wrap',
        gap: 'clamp(28px,4vw,72px)',
        alignItems: 'center',
        marginBottom: 'clamp(56px,8vw,104px)',
      }}
    >
      {/* Video in browser frame */}
      <motion.div
        whileHover={{ boxShadow: `0 0 70px rgba(${accentRGB},0.14), 0 32px 80px rgba(0,0,0,0.7)` }}
        transition={{ duration: 0.4 }}
        style={{
          flex: '1 1 340px', minWidth: 0,
          borderRadius: 18, overflow: 'hidden',
          border: `1px solid rgba(${accentRGB},0.2)`,
          boxShadow: `0 0 24px rgba(${accentRGB},0.05), 0 16px 56px rgba(0,0,0,0.55)`,
          background: 'rgba(5,10,6,0.9)',
        }}
      >
        {/* Browser chrome */}
        <div style={{
          background: 'rgba(4,8,5,0.98)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          padding: '9px 14px',
          display: 'flex', alignItems: 'center', gap: 7,
        }}>
          {['#FF5F57', '#FEBC2E', '#28C840'].map((c, j) => (
            <div key={j} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: 0.7 }} />
          ))}
          <div style={{
            flex: 1, height: 18, background: 'rgba(255,255,255,0.04)',
            borderRadius: 5, marginLeft: 8,
            display: 'flex', alignItems: 'center', paddingLeft: 10,
          }}>
            <span style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 9, color: 'rgba(255,255,255,0.2)' }}>
              ayesmajstudios.com/work
            </span>
          </div>
        </div>
        {/* Actual website video */}
        <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
          <video
            src={project.src}
            autoPlay muted loop playsInline
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      </motion.div>

      {/* Text panel */}
      <div style={{ flex: '1 1 240px', minWidth: 0 }}>
        {/* Category badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: `rgba(${accentRGB},0.08)`,
          border: `1px solid rgba(${accentRGB},0.28)`,
          borderRadius: 100, padding: '5px 14px',
          marginBottom: 20,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: project.accent, boxShadow: `0 0 6px ${project.accent}` }} />
          <span style={{
            fontFamily: "'Satoshi', system-ui, sans-serif",
            fontSize: 9, fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: project.accent,
          }}>
            {project.category}
          </span>
        </div>

        {/* Project number + title */}
        <p style={{
          fontFamily: "'Satoshi', system-ui, sans-serif",
          fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
          color: `rgba(${accentRGB},0.38)`, marginBottom: 8,
        }}>
          {String(project.id).padStart(2, '0')} / 07
        </p>
        <h3 style={{
          fontFamily: "'Satoshi', system-ui, sans-serif",
          fontSize: 'clamp(22px,2.6vw,36px)',
          fontWeight: 800, lineHeight: 1.06,
          letterSpacing: '-0.03em', color: '#F8FAFC',
          marginBottom: 16,
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          fontFamily: "'Satoshi', system-ui, sans-serif",
          fontSize: 'clamp(13px,1.05vw,15px)',
          lineHeight: 1.75, color: 'rgba(248,250,252,0.48)',
          maxWidth: 440,
        }}>
          {project.desc}
        </p>

        {/* Accent line */}
        <div style={{
          height: 1, width: 48,
          background: `linear-gradient(90deg, ${project.accent}, transparent)`,
          marginTop: 28, opacity: 0.45,
        }} />
      </div>
    </motion.div>
  );
}

function ShowcaseGrid() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(200,164,78,0.2),transparent)', marginBottom: 'clamp(60px,8vw,100px)' }} />
        <motion.div {...fade(0)} style={{ textAlign: 'center', marginBottom: 'clamp(56px,7vw,88px)' }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.52em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 10, letterSpacing: '0.52em', textTransform: 'uppercase', color: GOLD, marginBottom: 14 }}
          >
            WEBSITE SHOWCASE
          </motion.p>
          <h2 style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(26px,4vw,56px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.032em', color: '#F8FAFC' }}>
            Websites Built to{' '}
            <span style={{ fontStyle: 'italic', background: `linear-gradient(125deg,${GOLD_LIGHT} 0%,${GOLD} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Make People Stop
            </span>
          </h2>
        </motion.div>

        {WEB_PROJECTS.map((project, i) => (
          <WebVideoCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── FEATURES ───────────────────────────────────────────────── */
const FEATURES = [
  { icon: Film, title: 'Cinematic Hero Sections', desc: 'Full-screen video backgrounds, scroll-driven animations, and parallax depth that makes every first impression count.' },
  { icon: Layers, title: 'Scroll-Based Storytelling', desc: 'Narrative-driven scrolling experiences that guide visitors through your brand story with precision and flow.' },
  { icon: Box, title: '3D Visual Integration', desc: 'Embedded Three.js scenes, product viewers, and interactive 3D elements that no template can replicate.' },
  { icon: LayoutGrid, title: 'Premium UI Systems', desc: 'Glassmorphism cards, magnetic buttons, smooth transitions, and micro-interactions that feel handcrafted.' },
  { icon: TrendingUp, title: 'Conversion Structure', desc: 'Every section answers: what is this, why should I trust it, and what do I do next — always moving toward the CTA.' },
  { icon: Smartphone, title: 'Mobile-First Polish', desc: 'Pixel-perfect on every screen. Not just "responsive" — actually designed to feel premium on mobile.' },
];

function FeaturesSection() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(200,164,78,0.2),transparent)', marginBottom: 'clamp(60px,8vw,100px)' }} />
        <motion.div {...fade(0)} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.52em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 10, letterSpacing: '0.52em', textTransform: 'uppercase', color: GOLD, marginBottom: 14 }}
          >
            THE DIFFERENCE
          </motion.p>
          <h2 style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(26px,4vw,56px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.032em', color: '#F8FAFC' }}>
            What Makes an AYESMAJ Website{' '}
            <span style={{ fontStyle: 'italic', background: `linear-gradient(125deg,${GOLD_LIGHT} 0%,${GOLD} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Different
            </span>
          </h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2px,0.5vw,4px)' }}>
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                whileHover={{ borderColor: 'rgba(200,164,78,0.25)', background: 'rgba(255,255,255,0.035)' }}
                transition={{ duration: 0.3 }}
                style={{
                  display: 'flex', gap: 'clamp(16px,2vw,28px)', alignItems: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(200,164,78,0.08)',
                  borderRadius: 16, padding: 'clamp(18px,2vw,24px) clamp(20px,2.2vw,32px)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, border: '1px solid rgba(200,164,78,0.2)', background: 'rgba(200,164,78,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <f.icon size={20} color={GOLD} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(14px,1.15vw,17px)', fontWeight: 700, color: '#F8FAFC', marginBottom: 5, letterSpacing: '-0.01em' }}>{f.title}</h3>
                  <p style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(12px,0.95vw,14px)', color: 'rgba(248,250,252,0.44)', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
                <div style={{ flexShrink: 0, width: 32, height: 32, borderRadius: '50%', border: '1px solid rgba(200,164,78,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={13} color={GOLD} strokeWidth={2.5} />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PACKAGES ───────────────────────────────────────────────── */
const PACKAGES = [
  {
    name: 'Landing Page',
    tag: 'Starter',
    desc: 'A single high-converting page built to impress, explain, and generate leads from day one.',
    includes: ['Cinematic hero section', 'Services or offer section', 'Social proof / testimonials', 'Strong CTA structure', 'Mobile optimized', '1 revision round'],
    accent: 'rgba(248,250,252,0.5)',
    featured: false,
  },
  {
    name: 'Premium Website',
    tag: 'Most Popular',
    desc: 'A full multi-page website that positions your brand as a premium player in your market.',
    includes: ['Up to 8 premium pages', 'Cinematic animations', 'Contact/booking system', 'Brand-aligned design system', 'SEO optimized structure', '3 revision rounds'],
    accent: GOLD,
    featured: true,
  },
  {
    name: 'Signature Experience',
    tag: 'Premium',
    desc: 'The full AYESMAJ treatment — an interactive cinematic website that makes your brand feel like a world-class production.',
    includes: ['Unlimited pages', '3D visual integration', 'Scroll-driven storytelling', 'AI-powered features', 'Brand design system', 'Priority support'],
    accent: GREEN,
    featured: false,
  },
];

function PackagesSection() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(200,164,78,0.2),transparent)', marginBottom: 'clamp(60px,8vw,100px)' }} />
        <motion.div {...fade(0)} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.52em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 10, letterSpacing: '0.52em', textTransform: 'uppercase', color: GOLD, marginBottom: 14 }}
          >
            PACKAGES
          </motion.p>
          <h2 style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(26px,4vw,56px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.032em', color: '#F8FAFC' }}>
            Choose Your{' '}
            <span style={{ fontStyle: 'italic', background: `linear-gradient(125deg,${GOLD_LIGHT} 0%,${GOLD} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Experience Level
            </span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(14px,1.8vw,22px)', alignItems: 'stretch' }}>
          {PACKAGES.map((pkg, i) => {
            const accentRGB = pkg.accent === GOLD ? '200,164,78' : pkg.accent === GREEN ? '179,230,90' : '248,250,252';
            return (
              <motion.div key={pkg.name} {...fade(0.08 + i * 0.1)}>
                <motion.div
                  whileHover={{ borderColor: `rgba(${accentRGB},0.3)`, boxShadow: `0 0 50px rgba(${accentRGB},0.1), 0 24px 70px rgba(0,0,0,0.6)` }}
                  transition={{ duration: 0.35 }}
                  style={{
                    background: pkg.featured ? 'rgba(200,164,78,0.04)' : 'rgba(255,255,255,0.02)',
                    border: pkg.featured ? `1px solid rgba(200,164,78,0.35)` : '1px solid rgba(200,164,78,0.1)',
                    borderRadius: 20, padding: 'clamp(28px,2.5vw,38px)',
                    height: '100%', display: 'flex', flexDirection: 'column',
                    backdropFilter: 'blur(16px)',
                    boxShadow: pkg.featured ? '0 0 40px rgba(200,164,78,0.08)' : 'none',
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {pkg.featured && (
                    <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(200,164,78,0.6),transparent)' }} />
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <h3 style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(17px,1.4vw,20px)', fontWeight: 800, color: '#F8FAFC', letterSpacing: '-0.015em' }}>{pkg.name}</h3>
                    <span style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: pkg.accent === 'rgba(248,250,252,0.5)' ? 'rgba(248,250,252,0.5)' : pkg.accent, background: `rgba(${accentRGB},0.1)`, border: `1px solid rgba(${accentRGB},0.25)`, borderRadius: 100, padding: '4px 12px', whiteSpace: 'nowrap' }}>
                      {pkg.tag}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(13px,1vw,15px)', color: 'rgba(248,250,252,0.48)', lineHeight: 1.68, marginBottom: 24 }}>{pkg.desc}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', flex: 1 }}>
                    {pkg.includes.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)', fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(12px,0.95vw,14px)', color: 'rgba(248,250,252,0.65)' }}>
                        <Check size={12} color={pkg.accent === 'rgba(248,250,252,0.5)' ? GOLD : pkg.accent} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={createPageUrl('Contact')}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      fontFamily: "'Satoshi', system-ui, sans-serif",
                      fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '14px 24px', borderRadius: 100, textDecoration: 'none',
                      background: pkg.featured ? `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 50%, #9A7B3A 100%)` : 'rgba(255,255,255,0.04)',
                      color: pkg.featured ? BG : 'rgba(248,250,252,0.75)',
                      border: pkg.featured ? '1px solid rgba(200,164,78,0.4)' : '1px solid rgba(255,255,255,0.1)',
                      boxShadow: pkg.featured ? '0 0 30px rgba(200,164,78,0.25)' : 'none',
                      transition: 'all 0.3s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = ''; }}
                  >
                    Get a Custom Quote <ArrowRight size={13} />
                  </Link>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── BEFORE / AFTER ─────────────────────────────────────────── */
function BeforeAfterSection() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,rgba(200,164,78,0.2),transparent)', marginBottom: 'clamp(60px,8vw,100px)' }} />
        <motion.div {...fade(0)} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,72px)' }}>
          <h2 style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(26px,4vw,56px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.032em', color: '#F8FAFC' }}>
            Your Website Is Either{' '}
            <span style={{ fontStyle: 'italic', background: `linear-gradient(125deg,${GOLD_LIGHT} 0%,${GOLD} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Building Trust or Killing It
            </span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 'clamp(16px,2vw,24px)' }}>
          {/* BEFORE */}
          <motion.div {...fade(0.08)}>
            <div style={{ background: 'rgba(255,80,80,0.04)', border: '1px solid rgba(255,80,80,0.12)', borderRadius: 20, padding: 'clamp(28px,2.5vw,40px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                <span style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,95,87,0.7)' }}>BEFORE</span>
              </div>
              {['Generic template design', 'Weak, stock-photo visuals', 'No clear value proposition', 'Low trust, high bounce rate', 'Looks like everyone else'].map((item, i) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(13px,1.05vw,15px)', color: 'rgba(248,250,252,0.5)' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,95,87,0.4)', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* AFTER */}
          <motion.div {...fade(0.16)}>
            <div style={{ background: 'rgba(200,164,78,0.04)', border: '1px solid rgba(200,164,78,0.25)', borderRadius: 20, padding: 'clamp(28px,2.5vw,40px)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(200,164,78,0.5),transparent)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: GOLD, boxShadow: '0 0 10px rgba(200,164,78,0.8)' }} />
                <span style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(200,164,78,0.8)' }}>AFTER AYESMAJ</span>
              </div>
              {['Cinematic brand world', 'Premium layout and visuals', 'Crystal-clear offer & CTA', 'Strong first impression & trust', 'Looks like a $10M company'].map((item, i) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 0', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(13px,1.05vw,15px)', color: 'rgba(248,250,252,0.75)' }}>
                  <Check size={13} color={GOLD} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── FINAL CTA ──────────────────────────────────────────────── */
function WEFinalCTA() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(200,164,78,0.18)',
            borderRadius: 24, padding: 'clamp(48px,6vw,80px) clamp(32px,5vw,80px)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,164,78,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: 1, background: `linear-gradient(90deg,transparent,${GOLD}55,transparent)` }} />

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.52em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 10, letterSpacing: '0.52em', textTransform: 'uppercase', color: GOLD, marginBottom: 20 }}
          >
            LET'S BUILD
          </motion.p>

          <h2 style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(26px,4.2vw,58px)', fontWeight: 800, lineHeight: 1.0, letterSpacing: '-0.032em', color: '#F8FAFC', marginBottom: 20, maxWidth: 700, margin: '0 auto 20px' }}>
            Let's Build the Website{' '}
            <span style={{ fontStyle: 'italic', background: `linear-gradient(125deg,${GOLD_LIGHT} 0%,${GOLD} 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              People Remember
            </span>
          </h2>

          <p style={{ fontFamily: "'Satoshi', system-ui, sans-serif", fontSize: 'clamp(14px,1.2vw,17px)', color: 'rgba(248,250,252,0.48)', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>
            Send us your current site or idea. We'll turn it into a premium digital experience.
          </p>

          <Link
            to={createPageUrl('Contact')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: "'Satoshi', system-ui, sans-serif",
              fontSize: 'clamp(11px,0.9vw,13px)', fontWeight: 700, letterSpacing: '0.06em',
              padding: 'clamp(14px,1.4vw,18px) clamp(32px,3vw,48px)', borderRadius: 100,
              background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 50%, #9A7B3A 100%)`,
              color: BG, border: '1px solid rgba(200,164,78,0.4)',
              boxShadow: '0 0 44px rgba(200,164,78,0.3), 0 8px 32px rgba(0,0,0,0.5)',
              textDecoration: 'none', whiteSpace: 'nowrap', transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 60px rgba(200,164,78,0.5), 0 12px 40px rgba(0,0,0,0.6)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 44px rgba(200,164,78,0.3), 0 8px 32px rgba(0,0,0,0.5)'; e.currentTarget.style.transform = ''; }}
          >
            Start a Website Project <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ── PAGE ───────────────────────────────────────────────────── */
export default function WebExperiences() {
  useEffect(() => {
    document.title = 'Web Experiences — AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: BG, minHeight: '100vh', overflowX: 'clip', position: 'relative' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none' }}>
        <CircuitBackground />
      </div>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <HomeNav />
        <WEHero />
        <WhatWeBuild />
        <ShowcaseGrid />
        <FeaturesSection />
        <PackagesSection />
        <BeforeAfterSection />
        <WEFinalCTA />
        <HomeFooter />
      </div>
    </div>
  );
}
