import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import { COLORS, FONTS } from "../theme";

const STEPS = [
  { n: "01", title: "Brand Direction", body: "We define the positioning, tone, and visual language your brand will own." },
  { n: "02", title: "Visual World", body: "We design the cinematic look — color, type, motion, and the worlds your brand lives in." },
  { n: "03", title: "AI Content Engine", body: "We build a repeatable system that produces on-brand videos and images at scale." },
  { n: "04", title: "Website / 3D Build", body: "We engineer the website, product visuals, and immersive 3D experiences." },
  { n: "05", title: "Launch & Scale", body: "We ship, measure, and keep the content engine running as you grow." },
];

const ACCENT = "#FFB000";
const ACCENT_RGB = "255,176,0";

export default function CreativeSystem() {
  return (
    <section
      style={{
        padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px)",
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader eyebrow="How We Work" title="Our Creative System" align="left" />

        <div style={{ marginTop: "clamp(48px,6vw,72px)", position: "relative" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: 27,
              top: 10,
              bottom: 10,
              width: 1,
              background: `linear-gradient(to bottom, transparent, rgba(${ACCENT_RGB},0.4), transparent)`,
            }}
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "relative",
                display: "flex",
                gap: 28,
                paddingBottom: i < STEPS.length - 1 ? 38 : 0,
                alignItems: "flex-start",
              }}
            >
              {/* Node */}
              <div
                style={{
                  flexShrink: 0,
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: FONTS.display,
                  fontSize: 20,
                  fontWeight: 800,
                  color: ACCENT,
                  background: COLORS.black2,
                  border: `1px solid rgba(${ACCENT_RGB},0.35)`,
                  boxShadow: `0 0 24px rgba(${ACCENT_RGB},0.15)`,
                  zIndex: 2,
                }}
              >
                {s.n}
              </div>

              <div style={{ paddingTop: 6 }}>
                <h3
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: "clamp(22px, 2.4vw, 32px)",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    color: COLORS.white,
                    margin: "0 0 8px",
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontFamily: FONTS.ui, fontSize: 15.5, lineHeight: 1.6, color: COLORS.gray, margin: 0, maxWidth: 620 }}>
                  {s.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
