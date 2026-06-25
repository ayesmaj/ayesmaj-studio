import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FONTS } from "./theme";

/**
 * CinematicButton — pill button with magnetic hover + accent glow.
 *
 * Props:
 *   label    : string
 *   accent   : hex color (currentColor for border/glow)
 *   onClick  : fn
 *   variant  : "outline" (default) | "solid"
 *   size     : "md" (default) | "lg"
 */
export default function CinematicButton({
  label = "ENTER WORLD",
  accent = "#FFB000",
  onClick,
  variant = "outline",
  size = "md",
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Magnetic effect — button drifts toward the cursor
  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    setPos({ x: x * 0.22, y: y * 0.22 });
  };
  const reset = () => setPos({ x: 0, y: 0 });

  const isLg = size === "lg";

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      whileTap={{ scale: 0.96 }}
      className="ayes-cta group"
      style={{
        color: accent,
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        height: isLg ? 60 : 54,
        padding: isLg ? "0 40px" : "0 32px",
        borderRadius: 999,
        border: `1px solid ${variant === "solid" ? "transparent" : accent}`,
        background:
          variant === "solid" ? accent : "rgba(0,0,0,0.25)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        fontFamily: FONTS.ui,
        fontSize: isLg ? 13 : 12,
        fontWeight: 700,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "background 0.35s ease, box-shadow 0.35s ease, color 0.35s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 0 32px ${accent}`;
        if (variant !== "solid")
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
      }}
      onBlur={reset}
      onMouseOut={(e) => {
        if (e.currentTarget === e.target) return;
      }}
    >
      <span style={{ color: variant === "solid" ? "#030303" : accent }}>
        {label}
      </span>
      <ArrowRight
        size={isLg ? 18 : 16}
        style={{
          color: variant === "solid" ? "#030303" : accent,
          transition: "transform 0.35s ease",
        }}
        className="ayes-cta-arrow"
      />
    </motion.button>
  );
}
