import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import CinematicButton from "../CinematicButton";
import { COLORS, FONTS } from "../theme";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const ACCENT = "#B3FF3F";
const ACCENT_RGB = "179,255,63";

const CHECKLIST = [
  "Premium landing pages",
  "Full business websites",
  "Interactive 3D websites",
  "Product showcase pages",
  "AI-powered web systems",
  "Conversion-focused structure",
];

const MOCKS = [
  "/assets/ayesmaj/web-experiences/web-hero-desktop-showcase.jpg",
  "/assets/ayesmaj/web-experiences/web-hero-laptop-dashboard.jpg",
  "/assets/ayesmaj/web-experiences/project-natura.jpg",
];

export default function WebExpPreview() {
  const navigate = useNavigate();

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
        {/* LEFT — copy + checklist */}
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
            Web Experiences
          </p>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(30px, 4.4vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "0.005em",
              textTransform: "uppercase",
              color: COLORS.white,
              margin: "0 0 22px",
            }}
          >
            Websites That Feel Like Premium Products
          </h2>
          <p
            style={{
              fontFamily: FONTS.ui,
              fontSize: "clamp(15px,1.3vw,18px)",
              lineHeight: 1.65,
              color: COLORS.gray,
              margin: "0 0 32px",
              maxWidth: 560,
            }}
          >
            We engineer fast, cinematic websites that turn attention into
            customers — designed, built, and tuned for conversion.
          </p>

          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 36px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,220px),1fr))",
              gap: 14,
            }}
          >
            {CHECKLIST.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  fontFamily: FONTS.ui,
                  fontSize: 15,
                  color: COLORS.white,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `1px solid rgba(${ACCENT_RGB},0.45)`,
                    background: `rgba(${ACCENT_RGB},0.10)`,
                  }}
                >
                  <Check size={14} color={ACCENT} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <CinematicButton
            label="Explore Web Experiences"
            accent={ACCENT}
            onClick={() => navigate("/WebExperiences")}
          />
        </motion.div>

        {/* RIGHT — stacked browser mockups */}
        <motion.div
          {...fade(0.1)}
          style={{ display: "flex", flexDirection: "column", gap: "clamp(16px,2vw,24px)" }}
        >
          {MOCKS.map((src, i) => (
            <div
              key={src}
              style={{
                background: COLORS.glass,
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: `0 0 45px rgba(${ACCENT_RGB},0.08)`,
                transform: `translateX(${i % 2 === 1 ? "clamp(0px,2vw,28px)" : "0px"})`,
              }}
            >
              {/* browser chrome bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "10px 14px",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => (
                  <span
                    key={c}
                    style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.85 }}
                  />
                ))}
              </div>
              <div style={{ aspectRatio: "16 / 9", background: COLORS.black2 }}>
                <img
                  src={src}
                  alt=""
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
