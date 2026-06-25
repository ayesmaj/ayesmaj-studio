import React from "react";
import { motion } from "framer-motion";
import CinematicButton from "./CinematicButton";
import { FONTS } from "./theme";

/**
 * WorldPanel — one diagonal cinematic world in the hero (desktop).
 *
 * Props:
 *   world      : world object from theme.js (index,title,subtitle,accent,...)
 *   isActive   : boolean — hovered/focused
 *   isDimmed   : boolean — another panel is active
 *   onEnter    : fn — pointer enters
 *   onLeave    : fn — pointer leaves
 *   onSelect   : fn — clicked / button pressed
 *   position   : "left" | "center" | "right"  (diagonal clip direction)
 */
export default function WorldPanel({
  world,
  isActive,
  isDimmed,
  onEnter,
  onLeave,
  onSelect,
  position,
}) {
  // Diagonal edges via clip-path — left/right panels are skewed, center is a parallelogram
  const clip =
    position === "left"
      ? "polygon(0 0, 100% 0, calc(100% - 90px) 100%, 0 100%)"
      : position === "right"
      ? "polygon(90px 0, 100% 0, 100% 100%, 0 100%)"
      : "polygon(90px 0, 100% 0, calc(100% - 90px) 100%, 0 100%)";

  return (
    <motion.div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onSelect}
      animate={{
        flexGrow: isActive ? 1.6 : isDimmed ? 0.78 : 1,
      }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        flexBasis: 0,
        flexGrow: 1,
        height: "100%",
        overflow: "hidden",
        cursor: "pointer",
        marginLeft: position === "left" ? 0 : -45,
        clipPath: clip,
        WebkitClipPath: clip,
      }}
      className={`ayes-world ayes-world--${world.category}`}
    >
      {/* Background image with zoom */}
      <motion.div
        animate={{ scale: isActive ? 1.08 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0 }}
      >
        <img
          src={world.image}
          alt={`${world.title} — AYESMAJ Studios`}
          loading="eager"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Gradient base so text stays readable even before image loads */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(160deg, #050505 0%, rgba(${world.accentRGB},0.05) 55%, #020202 100%)`,
            zIndex: -1,
          }}
        />
      </motion.div>

      {/* Dark vertical scrim for legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.20) 45%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      {/* Accent color glow — intensifies on hover */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.55 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${world.glowAt}, rgba(${world.accentRGB},0.28), transparent 48%)`,
          pointerEvents: "none",
        }}
      />

      {/* World content — lower third */}
      <motion.div
        animate={{ y: isActive ? -12 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "11vh",
          transform: "translateX(-50%)",
          width: "84%",
          maxWidth: 360,
          textAlign: "center",
          zIndex: 5,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(40px, 4vw, 76px)",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "0.04em",
            color: world.accent,
            textShadow: `0 0 30px rgba(${world.accentRGB},0.5)`,
          }}
        >
          {world.index}
        </div>

        <h3
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(22px, 1.9vw, 34px)",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "#F5F5F0",
            margin: "10px 0 8px",
            lineHeight: 1.05,
          }}
        >
          {world.title}
        </h3>

        <p
          style={{
            fontFamily: FONTS.ui,
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(245,245,240,0.72)",
            marginBottom: 22,
          }}
        >
          {world.subtitle}
        </p>

        <CinematicButton
          label="ENTER WORLD"
          accent={world.accent}
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
        />
      </motion.div>
    </motion.div>
  );
}
