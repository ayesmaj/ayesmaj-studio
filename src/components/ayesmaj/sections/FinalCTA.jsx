import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CinematicButton from "../CinematicButton";
import LogoMark from "../LogoMark";
import { COLORS, FONTS } from "../theme";

export default function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section
      style={{
        position: "relative",
        textAlign: "center",
        padding: "clamp(90px,11vw,170px) 24px",
        overflow: "hidden",
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      {/* Tri-color ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 20% 60%, rgba(179,255,63,0.10), transparent 40%),
            radial-gradient(circle at 50% 40%, rgba(255,176,0,0.12), transparent 45%),
            radial-gradient(circle at 80% 60%, rgba(155,92,255,0.12), transparent 40%)`,
          pointerEvents: "none",
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", zIndex: 2 }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
          <LogoMark size={46} showText={false} />
        </div>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(38px, 6vw, 86px)",
            fontWeight: 800,
            textTransform: "uppercase",
            lineHeight: 0.98,
            color: COLORS.white,
            margin: "0 0 22px",
          }}
        >
          Ready to Build a<br />Brand World?
        </h2>
        <p
          style={{
            fontFamily: FONTS.ui,
            fontSize: 17,
            color: COLORS.gray,
            maxWidth: 540,
            margin: "0 auto 36px",
            lineHeight: 1.6,
          }}
        >
          Send us your idea, product, or company. We'll turn it into a cinematic digital experience.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CinematicButton label="Start a Project" accent="#FFB000" size="lg" onClick={() => navigate("/Contact")} />
        </div>
      </motion.div>
    </section>
  );
}
