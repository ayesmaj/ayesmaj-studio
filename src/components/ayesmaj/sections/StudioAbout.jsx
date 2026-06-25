import React from "react";
import { motion } from "framer-motion";
import { COLORS, FONTS } from "../theme";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const ACCENT = "#FFB000";
const ACCENT_RGB = "255,176,0";

const PARAS = [
  "AYESMAJ is an AI-powered creative studio building cinematic brand worlds for ambitious companies.",
  "We produce AI marketing content, cinematic 3D and CGI, brand identity, and premium websites — one connected creative system, not scattered deliverables.",
  "We work locally and internationally, partnering with founders and teams who want their brand to look and feel like a category leader.",
];

const STATS = [
  { num: "120+", label: "Projects" },
  { num: "6+", label: "Years" },
  { num: "40+", label: "Global Clients" },
  { num: "4K", label: "Render Quality" },
];

export default function StudioAbout() {
  return (
    <section
      style={{
        padding: "clamp(64px,8vw,120px) clamp(24px,5vw,80px)",
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,340px),1fr))",
          gap: "clamp(40px,5vw,72px)",
          alignItems: "center",
        }}
      >
        {/* LEFT — copy */}
        <motion.div {...fade()}>
          <p
            style={{
              fontFamily: FONTS.ui,
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: ACCENT,
              marginBottom: 18,
            }}
          >
            The Studio
          </p>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(48px, 8vw, 110px)",
              fontWeight: 800,
              lineHeight: 0.9,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              color: COLORS.white,
              margin: "0 0 28px",
            }}
          >
            AYESMAJ
          </h2>
          {PARAS.map((p, i) => (
            <p
              key={i}
              style={{
                fontFamily: FONTS.ui,
                fontSize: "clamp(15px,1.3vw,17px)",
                lineHeight: 1.65,
                color: COLORS.gray,
                margin: "0 0 16px",
                maxWidth: 560,
              }}
            >
              {p}
            </p>
          ))}
        </motion.div>

        {/* RIGHT — stats */}
        <motion.div
          {...fade(0.1)}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "clamp(14px,1.6vw,22px)",
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                background: COLORS.glass,
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                borderRadius: 24,
                padding: "clamp(24px,3vw,38px) clamp(20px,2.5vw,30px)",
              }}
            >
              <div
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "clamp(44px,6vw,72px)",
                  fontWeight: 800,
                  lineHeight: 0.95,
                  letterSpacing: "0.01em",
                  color: ACCENT,
                  textShadow: `0 0 32px rgba(${ACCENT_RGB},0.25)`,
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontFamily: FONTS.ui,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: COLORS.gray,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
