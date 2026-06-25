import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import AyesmajNav from "./AyesmajNav";
import CinematicButton from "./CinematicButton";
import LogoMark from "./LogoMark";
import { COLORS, FONTS } from "./theme";

/**
 * CategoryPage — reusable cinematic template for the three world pages.
 *
 * Props:
 *   accent, accentRGB, accentSoft : world colors
 *   eyebrow      : small label (e.g. "01 — WEBSITE DESIGN")
 *   headline     : big H1 string
 *   subheadline  : supporting line
 *   heroImage    : path to background image
 *   sections     : [{ title, body }]
 *   features     : [string]  (checklist)
 *   docTitle     : <title>
 */
export default function CategoryPage({
  accent,
  accentRGB,
  accentSoft,
  eyebrow,
  headline,
  subheadline,
  heroImage,
  sections = [],
  features = [],
  docTitle,
}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (docTitle) document.title = docTitle;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [docTitle]);

  return (
    <div style={{ background: COLORS.black, minHeight: "100vh", overflowX: "clip" }}>
      <AyesmajNav />

      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {heroImage && (
          <img
            src={heroImage}
            alt={headline}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(110deg, rgba(3,3,3,0.95) 0%, rgba(3,3,3,0.6) 55%, rgba(3,3,3,0.85) 100%),
              radial-gradient(circle at 25% 60%, rgba(${accentRGB},0.22), transparent 50%)`,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1320,
            margin: "0 auto",
            padding: "0 clamp(24px, 5vw, 80px)",
            width: "100%",
          }}
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1 }}
            style={{
              fontFamily: FONTS.ui,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: accent,
              marginBottom: 22,
            }}
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(40px, 6.5vw, 104px)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
              color: COLORS.white,
              maxWidth: 1000,
              margin: 0,
            }}
          >
            {headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{
              fontFamily: FONTS.ui,
              fontSize: "clamp(15px, 1.4vw, 19px)",
              color: COLORS.gray,
              lineHeight: 1.6,
              maxWidth: 560,
              margin: "26px 0 36px",
            }}
          >
            {subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            <CinematicButton label="Start a Project" accent={accent} size="lg" onClick={() => navigate("/Contact")} />
          </motion.div>
        </div>
      </section>

      {/* ── Feature checklist ── */}
      {features.length > 0 && (
        <section
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(60px,8vw,110px) clamp(24px,5vw,80px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: 16,
            }}
          >
            {features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "20px 22px",
                  borderRadius: 14,
                  background: COLORS.glass,
                  border: `1px solid rgba(${accentRGB},0.18)`,
                }}
              >
                <Check size={18} color={accent} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: FONTS.ui, fontSize: 15, color: COLORS.white }}>{f}</span>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* ── Content sections ── */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 clamp(24px,5vw,80px) clamp(60px,8vw,110px)",
        }}
      >
        {sections.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              padding: "44px 0",
              borderBottom: i < sections.length - 1 ? `1px solid ${COLORS.border}` : "none",
              display: "grid",
              gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.1fr)",
              gap: "clamp(24px, 5vw, 80px)",
              alignItems: "start",
            }}
            className="ayes-cat-section"
          >
            <h2
              style={{
                fontFamily: FONTS.display,
                fontSize: "clamp(26px, 3vw, 46px)",
                fontWeight: 800,
                textTransform: "uppercase",
                lineHeight: 1.02,
                letterSpacing: "0.01em",
                color: COLORS.white,
                margin: 0,
              }}
            >
              <span style={{ color: accent }}>{String(i + 1).padStart(2, "0")}</span> {s.title}
            </h2>
            <p
              style={{
                fontFamily: FONTS.ui,
                fontSize: "clamp(15px, 1.3vw, 18px)",
                lineHeight: 1.7,
                color: COLORS.gray,
                margin: 0,
              }}
            >
              {s.body}
            </p>
          </motion.div>
        ))}
      </section>

      {/* ── Final CTA ── */}
      <section
        style={{
          position: "relative",
          textAlign: "center",
          padding: "clamp(80px,10vw,150px) 24px",
          overflow: "hidden",
          borderTop: `1px solid ${COLORS.border}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 50% 50%, rgba(${accentRGB},0.12), transparent 65%)`,
          }}
        />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <LogoMark size={40} showText={false} />
          </div>
          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(34px, 5vw, 72px)",
              fontWeight: 800,
              textTransform: "uppercase",
              lineHeight: 1,
              color: COLORS.white,
              marginBottom: 22,
            }}
          >
            Ready to Build a Brand World?
          </h2>
          <p
            style={{
              fontFamily: FONTS.ui,
              fontSize: 17,
              color: COLORS.gray,
              maxWidth: 520,
              margin: "0 auto 34px",
              lineHeight: 1.6,
            }}
          >
            Send us your idea, product, or company. We'll turn it into a cinematic digital experience.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CinematicButton label="Start a Project" accent={accent} size="lg" onClick={() => navigate("/Contact")} />
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 760px) {
          .ayes-cat-section { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
      `}</style>
    </div>
  );
}
