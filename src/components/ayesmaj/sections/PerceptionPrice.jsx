import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { WORLDS, COLORS, FONTS } from "../theme";

const STATS = [
  {
    index: "01",
    title: "First Impression",
    body: "People decide how much to trust you in seconds. Your visual world is that decision.",
    accent: WORLDS[0].accent,
    accentRGB: WORLDS[0].accentRGB,
  },
  {
    index: "02",
    title: "Premium Trust",
    body: "A brand that looks considered and high-end is assumed to be more capable and more reliable.",
    accent: WORLDS[1].accent,
    accentRGB: WORLDS[1].accentRGB,
  },
  {
    index: "03",
    title: "Higher Perceived Value",
    body: "When the experience feels expensive, the price stops being the conversation.",
    accent: WORLDS[2].accent,
    accentRGB: WORLDS[2].accentRGB,
  },
];

export default function PerceptionPrice() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(80px,10vw,150px) clamp(24px,5vw,80px)",
        borderTop: `1px solid ${COLORS.border}`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 0%, rgba(255,176,0,0.08), transparent 55%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <SectionHeader
          eyebrow="Why It Matters"
          title="Because Perception Changes Price"
          subtitle="If your brand looks basic, people expect basic prices. We build the visual world that makes a company feel premium, trusted, and unforgettable."
        />

        <div
          style={{
            marginTop: "clamp(48px,6vw,80px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
            gap: 20,
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                padding: "36px 30px",
                borderRadius: 18,
                background: COLORS.glass,
                border: `1px solid rgba(${s.accentRGB},0.2)`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: -30,
                  right: -10,
                  fontFamily: FONTS.display,
                  fontSize: 130,
                  fontWeight: 800,
                  color: `rgba(${s.accentRGB},0.10)`,
                  lineHeight: 1,
                  pointerEvents: "none",
                }}
              >
                {s.index}
              </div>
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 40,
                  fontWeight: 800,
                  color: s.accent,
                  lineHeight: 1,
                  marginBottom: 18,
                  textShadow: `0 0 24px rgba(${s.accentRGB},0.35)`,
                }}
              >
                {s.index}
              </div>
              <h3
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 24,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  color: COLORS.white,
                  margin: "0 0 12px",
                }}
              >
                {s.title}
              </h3>
              <p style={{ fontFamily: FONTS.ui, fontSize: 15, lineHeight: 1.6, color: COLORS.gray, margin: 0 }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
