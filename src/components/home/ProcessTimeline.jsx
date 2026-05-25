import React from 'react';
import { motion } from 'framer-motion';

const GOLD = '#C8A44E';
const GOLD_LIGHT = '#E8C96D';

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We deep-dive into your brand, market, audience, and goals to build the right creative foundation.',
  },
  {
    num: '02',
    title: 'Design Direction',
    desc: 'Visual strategy, moodboards, and creative direction locked — you see the vision before we build it.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Our team executes with precision — every frame, pixel, and element crafted to standard.',
  },
  {
    num: '04',
    title: 'Polish',
    desc: 'Refinement cycles until every detail feels premium, intentional, and brand-true.',
  },
  {
    num: '05',
    title: 'Launch',
    desc: 'Go live with full optimization, performance, and cinematic brand impact from day one.',
  },
];

export default function ProcessTimeline() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

        {/* Divider */}
        <div style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(200,164,78,0.2), transparent)',
          marginBottom: 'clamp(60px,8vw,100px)',
        }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(48px,6vw,80px)' }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.15em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.52em' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "'Satoshi', system-ui, sans-serif",
              fontSize: 'clamp(8px,0.75vw,10px)',
              letterSpacing: '0.52em', textTransform: 'uppercase',
              color: GOLD, marginBottom: 16,
            }}
          >
            HOW WE WORK
          </motion.p>
          <h2 style={{
            fontFamily: "'Satoshi', system-ui, sans-serif",
            fontSize: 'clamp(28px,4.5vw,62px)',
            fontWeight: 800, lineHeight: 1.0,
            letterSpacing: '-0.035em', color: '#F8FAFC',
          }}>
            Our Creative System
          </h2>
        </motion.div>

        {/* ── Desktop: horizontal ── */}
        <div
          className="hidden md:flex"
          style={{ gap: 0, position: 'relative', alignItems: 'flex-start' }}
        >
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              top: 28,
              left: '10%', right: '10%',
              height: 1,
              background: `linear-gradient(90deg, transparent, rgba(200,164,78,0.35), rgba(200,164,78,0.35), transparent)`,
              transformOrigin: 'left',
            }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ flex: 1, padding: '0 14px', textAlign: 'center' }}
            >
              {/* Circle node */}
              <motion.div
                whileHover={{ boxShadow: '0 0 40px rgba(200,164,78,0.4)', scale: 1.08 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: 56, height: 56, borderRadius: '50%',
                  border: '1px solid rgba(200,164,78,0.4)',
                  background: 'rgba(200,164,78,0.07)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 24px',
                  boxShadow: '0 0 20px rgba(200,164,78,0.12)',
                  position: 'relative', zIndex: 2,
                }}
              >
                <span style={{
                  fontFamily: "'Satoshi', system-ui, sans-serif",
                  fontSize: 11, fontWeight: 800,
                  color: GOLD, letterSpacing: '0.08em',
                }}>
                  {step.num}
                </span>
              </motion.div>

              <h3 style={{
                fontFamily: "'Satoshi', system-ui, sans-serif",
                fontSize: 'clamp(14px,1.2vw,17px)',
                fontWeight: 700, color: '#F8FAFC',
                marginBottom: 10, letterSpacing: '-0.01em',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: "'Satoshi', system-ui, sans-serif",
                fontSize: 'clamp(12px,0.9vw,13.5px)',
                color: 'rgba(248,250,252,0.42)',
                lineHeight: 1.65,
              }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile: vertical ── */}
        <div
          className="flex md:hidden flex-col"
          style={{ position: 'relative', gap: 0 }}
        >
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: 27, top: 56, bottom: 0,
              width: 1,
              background: 'linear-gradient(to bottom, rgba(200,164,78,0.4), transparent)',
              transformOrigin: 'top',
            }}
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex', gap: 20, alignItems: 'flex-start',
                paddingBottom: i < STEPS.length - 1 ? 36 : 0,
              }}
            >
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                border: '1px solid rgba(200,164,78,0.4)',
                background: 'rgba(200,164,78,0.07)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 20px rgba(200,164,78,0.12)',
              }}>
                <span style={{
                  fontFamily: "'Satoshi', system-ui, sans-serif",
                  fontSize: 11, fontWeight: 800,
                  color: GOLD, letterSpacing: '0.08em',
                }}>
                  {step.num}
                </span>
              </div>
              <div style={{ paddingTop: 14 }}>
                <h3 style={{
                  fontFamily: "'Satoshi', system-ui, sans-serif",
                  fontSize: 17, fontWeight: 700,
                  color: '#F8FAFC', marginBottom: 8,
                  letterSpacing: '-0.01em',
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "'Satoshi', system-ui, sans-serif",
                  fontSize: 14, color: 'rgba(248,250,252,0.42)',
                  lineHeight: 1.65,
                }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
