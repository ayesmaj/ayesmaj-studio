import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';

const GOLD = '#C8A44E';
const GOLD_LIGHT = '#E8C96D';

export default function HomeFinalCTA() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(200,164,78,0.2), transparent)',
          marginBottom: 'clamp(60px,8vw,100px)',
        }} />

        {/* CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(255,255,255,0.025)',
            border: '1px solid rgba(200,164,78,0.18)',
            borderRadius: 24,
            padding: 'clamp(48px,6vw,80px) clamp(32px,5vw,80px)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Background glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(200,164,78,0.06) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 50% 40% at 50% 100%, rgba(74,120,74,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }} />

          {/* Top shimmer line */}
          <div style={{
            position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
            background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)`,
          }} />

          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.52em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(8px,0.75vw,10px)',
              letterSpacing: '0.52em', textTransform: 'uppercase',
              color: GOLD, marginBottom: 20,
            }}
          >
            READY TO START
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(26px,4.2vw,60px)',
              fontWeight: 800, lineHeight: 1.0,
              letterSpacing: '-0.035em', color: '#F8FAFC',
              marginBottom: 20,
              maxWidth: 760, margin: '0 auto 20px',
            }}
          >
            Ready to Make Your Brand<br />
            <span style={{
              fontStyle: 'italic',
              background: `linear-gradient(125deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Look Bigger?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              fontSize: 'clamp(14px,1.2vw,17px)',
              color: 'rgba(248,250,252,0.48)',
              lineHeight: 1.7,
              maxWidth: 520, margin: '0 auto 40px',
            }}
          >
            Send us your website, product, or idea — we'll show you how to turn it into a premium digital experience.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link
              to={createPageUrl('Contact')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(11px,0.9vw,13px)',
                fontWeight: 700, letterSpacing: '0.06em',
                padding: 'clamp(13px,1.3vw,16px) clamp(28px,2.8vw,40px)',
                borderRadius: 100,
                background: `linear-gradient(135deg, ${GOLD_LIGHT} 0%, ${GOLD} 50%, #9A7B3A 100%)`,
                color: '#07100A',
                border: '1px solid rgba(200,164,78,0.4)',
                boxShadow: '0 0 44px rgba(200,164,78,0.3), 0 8px 32px rgba(0,0,0,0.5)',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = '0 0 60px rgba(200,164,78,0.5), 0 12px 40px rgba(0,0,0,0.6)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 0 44px rgba(200,164,78,0.3), 0 8px 32px rgba(0,0,0,0.5)';
                e.currentTarget.style.transform = '';
              }}
            >
              Start a Project <ArrowRight size={14} />
            </Link>

            <Link
              to={createPageUrl('Contact')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(11px,0.9vw,13px)',
                fontWeight: 700, letterSpacing: '0.06em',
                padding: 'clamp(13px,1.3vw,16px) clamp(28px,2.8vw,40px)',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.04)',
                color: 'rgba(248,250,252,0.82)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(14px)',
                textDecoration: 'none', whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              }}
            >
              Contact AYESMAJ
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
