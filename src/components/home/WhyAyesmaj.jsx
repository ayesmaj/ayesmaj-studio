import React from 'react';
import { motion } from 'framer-motion';
import { Eye, TrendingUp, DollarSign } from 'lucide-react';

const GOLD = '#C8A44E';
const GOLD_LIGHT = '#E8C96D';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

const POINTS = [
  {
    icon: Eye,
    title: 'Better First Impression',
    desc: 'Visitors form an opinion in 0.05 seconds. A cinematic first impression sets the price anchor before they read a single word.',
  },
  {
    icon: TrendingUp,
    title: 'Stronger Trust',
    desc: 'Premium design signals investment, which signals stability, which signals that you\'re worth paying more for.',
  },
  {
    icon: DollarSign,
    title: 'Higher Perceived Value',
    desc: 'The same product in a luxury package sells for 3–5× more. Your digital presence is your most visible package.',
  },
];

export default function WhyAyesmaj() {
  return (
    <section style={{ background: 'transparent', padding: 'clamp(80px,10vw,140px) 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 'clamp(48px,6vw,80px)',
          alignItems: 'center',
        }}>

          {/* LEFT: headline */}
          <div>
            <motion.p
              initial={{ opacity: 0, letterSpacing: '0.15em' }}
              whileInView={{ opacity: 1, letterSpacing: '0.52em' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(8px,0.75vw,10px)',
                letterSpacing: '0.52em', textTransform: 'uppercase',
                color: GOLD, marginBottom: 18,
              }}
            >
              THE AYESMAJ ADVANTAGE
            </motion.p>

            <motion.h2
              {...fade(0.08)}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(28px,4.2vw,58px)',
                fontWeight: 800, lineHeight: 1.02,
                letterSpacing: '-0.032em', color: '#F8FAFC',
                marginBottom: 24,
              }}
            >
              Because Perception<br />
              <span style={{
                fontStyle: 'italic',
                background: `linear-gradient(125deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Changes Price
              </span>
            </motion.h2>

            <motion.p
              {...fade(0.16)}
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: 'clamp(14px,1.2vw,17px)',
                color: 'rgba(248,250,252,0.5)',
                lineHeight: 1.72,
                maxWidth: 480,
              }}
            >
              If your brand looks basic, people expect basic prices. AYESMAJ helps brands look premium before the first conversation.
            </motion.p>

            {/* Gold accent line */}
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: 1,
                background: `linear-gradient(90deg, ${GOLD}, transparent)`,
                marginTop: 32,
              }}
            />
          </div>

          {/* RIGHT: 3 points */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2vw,24px)' }}>
            {POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  whileHover={{
                    borderColor: 'rgba(200,164,78,0.3)',
                    boxShadow: '0 0 40px rgba(200,164,78,0.08), 0 16px 48px rgba(0,0,0,0.5)',
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(200,164,78,0.1)',
                    borderRadius: 16,
                    padding: 'clamp(20px,2vw,28px)',
                    display: 'flex', gap: 18, alignItems: 'flex-start',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    border: '1px solid rgba(200,164,78,0.25)',
                    background: 'rgba(200,164,78,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <point.icon size={18} color={GOLD} />
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 'clamp(14px,1.1vw,16px)',
                      fontWeight: 700, color: '#F8FAFC',
                      marginBottom: 6, letterSpacing: '-0.01em',
                    }}>
                      {point.title}
                    </h3>
                    <p style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      fontSize: 'clamp(12px,0.95vw,14px)',
                      color: 'rgba(248,250,252,0.44)',
                      lineHeight: 1.68,
                    }}>
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
