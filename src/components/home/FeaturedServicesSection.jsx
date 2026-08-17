import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Monitor, Box, Palette, Cpu, ArrowUpRight } from 'lucide-react';

const GOLD = '#C8A44E';
const GOLD_LIGHT = '#E8C96D';
const GREEN = '#B3E65A';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

function ServiceCard({ icon: Icon, title, description, accent, delay, to }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  const isGold = accent === GOLD;
  const accentRGB = isGold ? '200,164,78' : '179,230,90';

  return (
    <motion.div
      {...fade(delay)}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 900 }}
    >
      <motion.div
        animate={{
          borderColor: hovered ? `rgba(${accentRGB},0.35)` : 'rgba(200,164,78,0.1)',
          boxShadow: hovered
            ? `0 0 60px rgba(${accentRGB},0.14), 0 28px 80px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.05)`
            : '0 4px 32px rgba(0,0,0,0.35)',
        }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'rgba(255,255,255,0.025)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(200,164,78,0.1)',
          borderRadius: 20,
          padding: 'clamp(28px,2.5vw,40px) clamp(24px,2.2vw,36px)',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle inner glow on hover */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '60%',
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(${accentRGB},0.06) 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />

        {/* Icon */}
        <motion.div
          animate={{
            boxShadow: hovered ? `0 0 28px rgba(${accentRGB},0.35)` : '0 0 0px transparent',
            background: hovered ? `rgba(${accentRGB},0.1)` : 'rgba(255,255,255,0.04)',
          }}
          transition={{ duration: 0.4 }}
          style={{
            width: 52, height: 52,
            borderRadius: 14,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid rgba(${accentRGB},0.25)`,
            marginBottom: 24,
          }}
        >
          <Icon size={22} color={accent} />
        </motion.div>

        <h3 style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 'clamp(16px,1.4vw,19px)',
          fontWeight: 700,
          color: '#F8FAFC',
          marginBottom: 12,
          lineHeight: 1.25,
          letterSpacing: '-0.015em',
        }}>
          {title}
        </h3>

        <p style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 'clamp(13px,1vw,14.5px)',
          color: 'rgba(248,250,252,0.46)',
          lineHeight: 1.72,
          marginBottom: 24,
        }}>
          {description}
        </p>

        {/* Bottom accent line */}
        <motion.div
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: 1,
            background: `linear-gradient(90deg, ${accent}, transparent)`,
            marginBottom: 20,
          }}
        />

        {/* Link arrow */}
        {to && (
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 11, fontWeight: 700,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: accent,
            }}
          >
            <Link
              to={createPageUrl(to)}
              style={{ color: 'inherit', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}
            >
              Explore <ArrowUpRight size={12} />
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

const SERVICES = [
  {
    icon: Monitor,
    title: 'Cinematic Web Experiences',
    description: 'Interactive websites, premium landing pages, scroll animations, 3D product sections, and conversion-focused layouts.',
    accent: GOLD,
    to: 'WebExperiences',
  },
  {
    icon: Box,
    title: '3D Animation & Motion',
    description: 'Product films, cinematic ads, motion graphics, and high-end visual storytelling that makes brands unforgettable.',
    accent: GREEN,
    to: 'Animations',
  },
  {
    icon: Palette,
    title: 'Premium Brand Identity',
    description: 'Logo systems, visual direction, packaging concepts, social assets, and complete brand worlds built to last.',
    accent: GOLD,
    to: 'Branding',
  },
  {
    icon: Cpu,
    title: 'AI Business Systems',
    description: 'AI receptionists, lead funnels, dashboards, automation tools, and smart business workflows.',
    accent: GREEN,
    to: 'System',
  },
];

export default function FeaturedServicesSection() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

        {/* Section header */}
        <motion.div {...fade(0)} style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,80px)' }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.52em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(8px,0.75vw,10px)',
              letterSpacing: '0.52em',
              textTransform: 'uppercase',
              color: GOLD,
              marginBottom: 18,
            }}
          >
            WHAT WE BUILD
          </motion.p>
          <motion.h2
            {...fade(0.1)}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(28px,4.5vw,62px)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              color: '#F8FAFC',
              maxWidth: 720,
              margin: '0 auto',
            }}
          >
            Built for Brands That<br />
            <span style={{
              fontStyle: 'italic',
              background: `linear-gradient(125deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Need to Look Expensive
            </span>
          </motion.h2>
        </motion.div>

        {/* 4-card grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: 'clamp(14px,1.8vw,22px)',
        }}>
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.title} {...svc} delay={0.08 + i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}
