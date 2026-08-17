import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../SectionHeader';
import BeforeAfterSlider from '@/components/ayesmaj/BeforeAfterSlider';
import { FONTS } from '../theme';

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const GOLD = { accent: '#D8B75A', accentRGB: '216,183,90' };
const PURPLE = { accent: '#9B5CFF', accentRGB: '155,92,255' };

const TABS = [
  { id: 'website', label: 'Website', beforeLabel: 'DRAFT', afterLabel: 'FINAL SITE', ...GOLD },
  { id: 'product', label: 'Product', beforeLabel: 'SKETCH', afterLabel: 'FINAL RENDER', ...PURPLE },
  { id: 'space', label: 'Space', beforeLabel: 'BLUEPRINT', afterLabel: 'FINAL VIZ', ...GOLD },
  { id: 'brand', label: 'Brand', beforeLabel: 'EXPLORATION', afterLabel: 'IDENTITY', ...PURPLE },
].map((t) => ({
  ...t,
  beforeImg: `/generated/before-after/${t.id === 'website' ? 'web' : t.id}-before.png`,
  afterImg: `/generated/before-after/${t.id === 'website' ? 'web' : t.id}-after.png`,
}));

export default function BeforeAfterShowcase() {
  const [active, setActive] = useState(TABS[0]);

  return (
    <section style={{ background: '#141715', padding: 'clamp(80px, 10vw, 140px) 24px', overflow: 'hidden' }}>
      <SectionHeader
        eyebrow="BEFORE / AFTER"
        title="FROM SKETCH TO SIGNATURE"
        subtitle="Drag to compare — same subject, two stages of craft."
        accent="#D8B75A"
      />

      {/* tabs */}
      <motion.div
        {...fade(0.1)}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 10,
          margin: '44px auto 28px',
          maxWidth: 1000,
        }}
      >
        {TABS.map((t) => {
          const on = t.id === active.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t)}
              style={{
                fontFamily: FONTS.ui,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '10px 22px',
                borderRadius: 999,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                color: on ? t.accent : '#AAA39A',
                background: on ? `rgba(${t.accentRGB},0.09)` : 'rgba(255,255,255,0.035)',
                border: on ? `1px solid rgba(${t.accentRGB},0.5)` : '1px solid rgba(255,255,255,0.09)',
                boxShadow: on ? `0 0 22px rgba(${t.accentRGB},0.18)` : 'none',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </motion.div>

      {/* slider — key remounts on tab switch so clip position resets */}
      <motion.div {...fade(0.2)} style={{ maxWidth: 1000, margin: '0 auto' }}>
        <BeforeAfterSlider
          key={active.id}
          beforeImg={active.beforeImg}
          afterImg={active.afterImg}
          beforeLabel={active.beforeLabel}
          afterLabel={active.afterLabel}
          accent={active.accent}
          accentRGB={active.accentRGB}
        />
        <p
          style={{
            fontFamily: FONTS.ui,
            fontSize: 13,
            letterSpacing: '0.06em',
            color: '#6E685F',
            textAlign: 'center',
            margin: '18px 0 0',
          }}
        >
          {active.beforeLabel} → {active.afterLabel}
        </p>
      </motion.div>
    </section>
  );
}
