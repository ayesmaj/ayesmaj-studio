import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const GOLD = '#C8A44E';
const GOLD_LIGHT = '#E8C96D';
const GREEN = '#B3E65A';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const CATS = ['All', 'Websites', '3D', 'Branding', 'AI Systems', 'Motion'];

const PROJECTS = [
  {
    id: 1,
    title: 'Luxury Product Launch',
    category: 'Websites',
    desc: 'Cinematic landing page with scroll-driven 3D reveals.',
    gradient: 'linear-gradient(145deg, #1a0f04 0%, #3d2a10 50%, #1a0f04 100%)',
    accent: GOLD,
    tag: 'Web Experience',
    size: 'large',
  },
  {
    id: 2,
    title: 'Ashe Coffee Brand',
    category: 'Branding',
    desc: 'Full identity system, packaging, and digital assets.',
    gradient: 'linear-gradient(145deg, #0a1205 0%, #1c3010 50%, #0a1205 100%)',
    accent: GREEN,
    tag: 'Brand Identity',
    size: 'normal',
  },
  {
    id: 3,
    title: 'Product Animation Reel',
    category: '3D',
    desc: 'Photorealistic 3D product films for social and web.',
    gradient: 'linear-gradient(145deg, #050d12 0%, #0f2535 50%, #050d12 100%)',
    accent: '#6BB8E6',
    tag: '3D Animation',
    size: 'normal',
  },
  {
    id: 4,
    title: 'AI Lead Receptionist',
    category: 'AI Systems',
    desc: 'Automated intake system with CRM integration.',
    gradient: 'linear-gradient(145deg, #0a0f0a 0%, #1a2b1a 50%, #0a0f0a 100%)',
    accent: GREEN,
    tag: 'AI System',
    size: 'normal',
  },
  {
    id: 5,
    title: 'Blenday Energy Drink',
    category: 'Motion',
    desc: 'CGI commercial with kinetic liquid motion.',
    gradient: 'linear-gradient(145deg, #100a04 0%, #2e1e08 50%, #100a04 100%)',
    accent: GOLD,
    tag: 'Motion Design',
    size: 'large',
  },
  {
    id: 6,
    title: 'Real Estate Platform',
    category: 'Websites',
    desc: 'Premium property showcase with interactive maps.',
    gradient: 'linear-gradient(145deg, #05080f 0%, #111e35 50%, #05080f 100%)',
    accent: '#6BB8E6',
    tag: 'Web Experience',
    size: 'normal',
  },
];

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const accentRGB = project.accent === GOLD ? '200,164,78'
    : project.accent === GREEN ? '179,230,90'
    : '107,184,230';

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 18,
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: project.size === 'large' ? '2/1' : '1/1',
        cursor: 'pointer',
        border: `1px solid rgba(${accentRGB},0.12)`,
        transition: 'border-color 0.4s, box-shadow 0.4s',
        boxShadow: hovered
          ? `0 0 50px rgba(${accentRGB},0.12), 0 24px 60px rgba(0,0,0,0.6)`
          : '0 4px 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Background gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: project.gradient,
        transition: 'transform 0.6s ease',
        transform: hovered ? 'scale(1.04)' : 'scale(1)',
      }} />

      {/* Geometric abstract element */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <motion.div
          animate={{
            opacity: hovered ? 0.15 : 0.08,
            scale: hovered ? 1.1 : 1,
            rotate: hovered ? 12 : 0,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '55%', height: '55%',
            border: `1px solid ${project.accent}`,
            borderRadius: '50%',
          }}
        />
        <motion.div
          animate={{
            opacity: hovered ? 0.1 : 0.05,
            scale: hovered ? 0.85 : 1,
            rotate: hovered ? -8 : 0,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            width: '35%', height: '35%',
            border: `1px solid ${project.accent}`,
            borderRadius: 12,
          }}
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(5,13,7,0.95) 0%, rgba(5,13,7,0.3) 55%, transparent 100%)',
      }} />

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(5,13,7,0.35)',
          backdropFilter: 'blur(1px)',
        }}
      />

      {/* Category tag */}
      <div style={{
        position: 'absolute', top: 16, left: 16,
        background: `rgba(${accentRGB},0.15)`,
        border: `1px solid rgba(${accentRGB},0.35)`,
        borderRadius: 100,
        padding: '4px 12px',
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 9, fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: project.accent,
      }}>
        {project.tag}
      </div>

      {/* Bottom info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '20px 20px 22px',
      }}>
        <motion.p
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 12, color: 'rgba(248,250,252,0.52)',
            marginBottom: 4, lineHeight: 1.5,
          }}
        >
          {project.desc}
        </motion.p>
        <p style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: 'clamp(14px,1.2vw,17px)',
          fontWeight: 700, color: '#F8FAFC',
          marginBottom: hovered ? 12 : 0,
          transition: 'margin 0.3s',
          letterSpacing: '-0.01em',
        }}>
          {project.title}
        </p>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 10, fontWeight: 700,
            letterSpacing: '0.16em', textTransform: 'uppercase',
            color: project.accent,
            border: `1px solid rgba(${accentRGB},0.4)`,
            borderRadius: 100, padding: '6px 14px',
            background: `rgba(${accentRGB},0.08)`,
          }}
        >
          View Case Study <ArrowUpRight size={10} />
        </motion.div>
      </div>
    </div>
  );
}

export default function PortfolioShowcase() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

        {/* Header */}
        <motion.div {...fade(0)} style={{ textAlign: 'center', marginBottom: 'clamp(36px,4vw,52px)' }}>
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.52em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(8px,0.75vw,10px)',
              letterSpacing: '0.52em', textTransform: 'uppercase',
              color: GOLD, marginBottom: 16,
            }}
          >
            SELECTED WORK
          </motion.p>
          <motion.h2
            {...fade(0.1)}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(28px,4.5vw,62px)',
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: '-0.035em', color: '#F8FAFC',
            }}
          >
            Selected{' '}
            <span style={{
              fontStyle: 'italic',
              background: `linear-gradient(125deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Digital Worlds
            </span>
          </motion.h2>
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          {...fade(0.15)}
          style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginBottom: 'clamp(32px,4vw,52px)' }}
        >
          {CATS.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActive(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 10, fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase',
                padding: '8px 20px', borderRadius: 100,
                border: `1px solid ${active === cat ? 'rgba(200,164,78,0.55)' : 'rgba(255,255,255,0.08)'}`,
                color: active === cat ? GOLD : 'rgba(248,250,252,0.38)',
                background: active === cat ? 'rgba(200,164,78,0.08)' : 'transparent',
                boxShadow: active === cat ? '0 0 16px rgba(200,164,78,0.15)' : 'none',
                cursor: 'pointer', transition: 'all 0.3s',
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(12px,1.5vw,18px)',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.45, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ gridColumn: project.size === 'large' ? 'span 2' : 'span 1' }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
