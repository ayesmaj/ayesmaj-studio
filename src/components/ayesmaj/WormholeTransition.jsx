import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FONTS } from "./theme";

/**
 * WormholeTransition — full-screen cinematic overlay played when a hero world
 * is clicked, before routing to the category page.
 *
 * Sequence (~1.4s):
 *   1. Black overlay fades in + logo flash
 *   2. Radial tunnel of the world's accent color zooms toward the viewer
 *   3. Light streaks + glitch scanlines
 *   4. onComplete() fires → parent navigates
 *
 * Respects prefers-reduced-motion (instant fade, shorter).
 *
 * Props:
 *   accent     : hex color of the chosen world
 *   accentRGB  : "r,g,b"
 *   onComplete : fn called when the animation finishes
 */
export default function WormholeTransition({ accent, accentRGB, onComplete }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(onComplete, reduce ? 400 : 1400);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#030303",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pointerEvents: "all",
      }}
    >
      {/* Radial tunnel — concentric rings zooming in */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0.0 }}
        animate={{ scale: 6, opacity: [0, 0.9, 0] }}
        transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        style={{
          position: "absolute",
          width: "60vmin",
          height: "60vmin",
          borderRadius: "50%",
          background: `repeating-radial-gradient(circle at center,
            rgba(${accentRGB},0.0) 0px,
            rgba(${accentRGB},0.0) 14px,
            rgba(${accentRGB},0.35) 16px,
            rgba(${accentRGB},0.0) 30px)`,
          filter: "blur(1px)",
        }}
      />

      {/* Core glow */}
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 3, opacity: [0, 1, 0] }}
        transition={{ duration: 1.4, ease: "easeIn" }}
        style={{
          position: "absolute",
          width: "40vmin",
          height: "40vmin",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${accentRGB},0.55) 0%, transparent 65%)`,
        }}
      />

      {/* Light streaks */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: [0, 0.7, 0] }}
          transition={{ duration: 0.9, delay: 0.1 + i * 0.03, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 2,
            height: "60vh",
            transformOrigin: "top center",
            background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`,
            transform: `rotate(${i * 30}deg)`,
          }}
        />
      ))}

      {/* Logo flash */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 1.1] }}
        transition={{ duration: 1.2, times: [0, 0.25, 0.7, 1] }}
        style={{ position: "relative", zIndex: 2, textAlign: "center" }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(60px, 10vw, 120px)",
            fontWeight: 800,
            color: "#F5F5F0",
            lineHeight: 1,
            letterSpacing: "0.02em",
            textShadow: `0 0 40px ${accent}, 0 0 80px rgba(${accentRGB},0.5)`,
          }}
        >
          A
        </div>
        <div
          style={{
            fontFamily: FONTS.ui,
            fontSize: 12,
            letterSpacing: "0.5em",
            color: "rgba(245,245,240,0.7)",
            marginTop: 8,
            paddingLeft: "0.5em",
          }}
        >
          AYESMAJ
        </div>
      </motion.div>

      {/* Glitch scanlines */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.25, 0, 0.18, 0] }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 4px)",
          mixBlendMode: "overlay",
        }}
      />
    </motion.div>
  );
}
