import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CinematicButton from "../CinematicButton";
import LogoMark from "../LogoMark";
import { FONTS } from "../theme";

export default function FinalCTA() {
  const navigate = useNavigate();
  return (
    <section
      id="start-a-project"
      style={{
        position: "relative",
        textAlign: "center",
        padding: "clamp(90px,11vw,170px) 24px",
        overflow: "hidden",
        borderTop: "1px solid rgba(189,174,151,.5)",
        background: "radial-gradient(circle at 18% 20%,rgba(255,255,255,.8),transparent 28%),radial-gradient(circle at 85% 32%,rgba(122,72,255,.13),transparent 28%),linear-gradient(135deg,#F7F4EF,#EFE7DA 54%,#E8DDD0)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(circle at 20% 70%, rgba(216,183,90,0.20), transparent 34%),
            radial-gradient(circle at 50% 25%, rgba(255,255,255,0.50), transparent 40%),
            radial-gradient(circle at 82% 65%, rgba(155,92,255,0.12), transparent 36%)`,
          pointerEvents: "none",
        }}
      />
      <span aria-hidden="true" style={{ position: "absolute", top: "-110px", right: "8%", width: 250, height: 250, borderRadius: "50%", border: "1px solid rgba(255,255,255,.78)", background: "linear-gradient(145deg,rgba(255,255,255,.55),rgba(192,132,252,.14),rgba(216,183,90,.16))", boxShadow: "inset 0 0 55px rgba(255,255,255,.7),0 28px 90px rgba(122,72,255,.10)", pointerEvents: "none" }} />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative", zIndex: 2, width: "min(100%,900px)", margin: "0 auto", padding: "clamp(42px,6vw,76px) clamp(24px,5vw,68px)", border: "1px solid rgba(255,255,255,.72)", borderRadius: 30, background: "rgba(255,255,255,.48)", boxShadow: "0 28px 90px rgba(120,100,80,.15)", backdropFilter: "blur(22px)" }}
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
            color: "#121212",
            margin: "0 0 22px",
          }}
        >
          Ready to Build a<br />Brand World?
        </h2>
        <p
          style={{
            fontFamily: FONTS.ui,
            fontSize: 17,
            color: "#6E6A64",
            maxWidth: 540,
            margin: "0 auto 36px",
            lineHeight: 1.6,
          }}
        >
          Send us your idea, product, or company. We'll turn it into a cinematic digital experience.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CinematicButton label="Start a Project" accent="#7A48FF" size="lg" onClick={() => navigate("/Contact")} />
        </div>
      </motion.div>
    </section>
  );
}
