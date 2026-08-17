import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import WormholeTransition from "./WormholeTransition";
import CinematicButton from "./CinematicButton";
import MagneticText from "./MagneticText";
import { WORLDS, COLORS, FONTS } from "./theme";

const COMPOSITE = "/assets/ayesmaj/hero/hero-composite.png";

// Each world's extra "reveal" copy + signature stats. Shown on hover.
const REVEALS = {
  website: {
    blurb: "Cinematic websites & landing pages engineered to convert.",
    stats: [{ v: "+212%", l: "Conversion Lift" }, { v: "<1.2s", l: "First Paint" }],
  },
  "ai-marketing": {
    blurb: "AI videos, images & campaigns produced at studio scale.",
    stats: [{ v: "10×", l: "Output Speed" }, { v: "60+", l: "Brand Visuals/mo" }],
  },
  "3d-worlds": {
    blurb: "Photoreal 3D models, environments & immersive product worlds.",
    stats: [{ v: "8K", l: "Render Quality" }, { v: "∞", l: "Angles & Variants" }],
  },
};

// Per-world diagonal panel images (transparent, separated from the composite)
const PANEL_IMAGES = {
  website: "/assets/ayesmaj/hero/panel-website.png",
  "ai-marketing": "/assets/ayesmaj/hero/panel-ai.png",
  "3d-worlds": "/assets/ayesmaj/hero/panel-3d.png",
};

/**
 * HeroWorlds — cinematic split-world hero with PANEL HOVER REVEAL.
 * Composite sits as the base layer (fills any gaps); 3 transparent
 * diagonal panels float on top — hover expands one and reveals more.
 */
export default function HeroWorlds() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(null);
  const [transition, setTransition] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const selectWorld = (world) => { if (!transition) setTransition(world); };
  const finishTransition = () => { if (transition) navigate(transition.route); };

  return (
    <section style={{ position: "relative", minHeight: "100vh", background: "#07100C", overflow: "hidden" }}>
      {/* ── Top + bottom scrims for legibility over panels ── */}
      {!isMobile && (
        <div style={{ position: "absolute", inset: 0, zIndex: 18, background: "linear-gradient(to bottom, rgba(7,16,12,0.68) 0%, rgba(7,16,12,0.24) 22%, transparent 42%, rgba(7,16,12,0.10) 64%, rgba(7,16,12,0.88) 100%)", pointerEvents: "none" }} />
      )}

      {/* ── Headline overlay ── */}
      <div style={{
        position: "absolute", top: isMobile ? "14vh" : "14vh", left: "50%",
        transform: "translateX(-50%)", zIndex: 30, width: "min(1100px, 92vw)",
        textAlign: "center", pointerEvents: "none",
      }}>
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.5em" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: FONTS.ui, fontSize: 13, fontWeight: 600, letterSpacing: "0.5em", textTransform: "uppercase", color: "#FFB000", marginBottom: 18, paddingLeft: "0.5em" }}
        >
          AYESMAJ STUDIOS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: FONTS.display, fontSize: "clamp(40px, 6.8vw, 108px)", fontWeight: 800,
            lineHeight: 0.92, letterSpacing: "0.005em", textTransform: "uppercase", margin: 0,
            color: "#F8FAFC",
            // Solid color (no gradient ghosting). Strong shadow lifts text off panels.
            textShadow: "0 2px 24px rgba(0,0,0,0.85), 0 0 60px rgba(0,0,0,0.55)",
            pointerEvents: "auto",
          }}
        >
          <MagneticText
            text={"WE BUILD BRANDS.\nWE CREATE WORLDS."}
            radius={170}
            strength={26}
          />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}
          style={{ fontFamily: FONTS.ui, fontSize: "clamp(11px, 1vw, 14px)", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,240,0.7)", marginTop: 20 }}
        >
          AI Powered · Future Driven · Limitless Possibilities
        </motion.p>
      </div>

      {/* ── Worlds ── */}
      {isMobile ? (
        <div style={{ position: "relative", zIndex: 10, paddingTop: "44vh", paddingBottom: 40 }}>
          {WORLDS.map((world) => (
            <MobileWorldCard key={world.category} world={world} onSelect={() => selectWorld(world)} />
          ))}
        </div>
      ) : (
        // Desktop: 3 expanding diagonal panels
        <div style={{ position: "absolute", inset: 0, zIndex: 15, display: "flex" }}>
          {WORLDS.map((world, i) => {
            const isActive = hover === i;
            const isDimmed = hover !== null && !isActive;
            return (
              <motion.div
                key={world.category}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onClick={() => selectWorld(world)}
                animate={{ flexGrow: isActive ? 1.22 : isDimmed ? 0.92 : 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "relative", flexBasis: 0, flexGrow: 1, height: "100%",
                  cursor: "pointer", overflow: "visible",
                  zIndex: isActive ? 3 : 1,
                }}
              >
                {/* Transparent diagonal panel image — use `contain` so the PNG's
                    diagonal transparent edges are preserved instead of cropped
                    by the rectangular container. Bottom-anchor so the panel
                    floor sits at the bottom of the section. */}
                <motion.img
                  src={PANEL_IMAGES[world.category]}
                  alt={`${world.title} — AYESMAJ Studios`}
                  animate={{
                    opacity: isActive ? 1 : isDimmed ? 0.45 : 0.92,
                    scale: isActive ? 1.015 : 1,
                  }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    objectFit: "contain",
                    objectPosition: "center bottom",
                    pointerEvents: "none",
                    filter: isDimmed ? "saturate(0.4)" : "saturate(1)",
                    transition: "filter 0.4s ease",
                  }}
                />

                {/* Accent glow on hover — radial so it stays inside the diagonal */}
                <motion.div
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 70% 60% at 50% 70%, rgba(${world.accentRGB},0.28), transparent 70%)`, pointerEvents: "none" }}
                />

                {/* SINGLE content block, bottom-anchored. Natural document flow:
                    number → title → subtitle → reveal → button. One flex column
                    can never overlap itself; on hover the reveal expands and the
                    whole block grows UPWARD (bottom pinned) so the button holds. */}
                <div
                  style={{
                    position: "absolute", left: 0, right: 0, bottom: "11vh",
                    padding: "0 16px", textAlign: "center", zIndex: 6,
                    display: "flex", flexDirection: "column", alignItems: "center",
                    pointerEvents: "none",
                  }}
                >
                  <div style={{ fontFamily: FONTS.display, fontSize: "clamp(40px, 4vw, 72px)", fontWeight: 800, lineHeight: 1, color: world.accent, textShadow: `0 0 30px rgba(${world.accentRGB},0.55)` }}>
                    {world.index}
                  </div>
                  <h3 style={{ fontFamily: FONTS.display, fontSize: "clamp(18px, 1.7vw, 30px)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "#F5F5F0", margin: "8px 0 6px", whiteSpace: "nowrap" }}>
                    {world.title}
                  </h3>
                  <p style={{ fontFamily: FONTS.ui, fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(245,245,240,0.72)", margin: 0 }}>
                    {world.subtitle}
                  </p>

                  {/* Reveal — collapses to 0 height when not hovered */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, height: isActive ? "auto" : 0, marginTop: isActive ? 16 : 0, marginBottom: isActive ? 18 : 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    style={{ overflow: "hidden", width: "100%" }}
                  >
                    <p style={{ fontFamily: FONTS.ui, fontSize: 13, lineHeight: 1.55, color: "rgba(245,245,240,0.82)", margin: "0 auto 14px", maxWidth: 320 }}>
                      {REVEALS[world.category].blurb}
                    </p>
                    <div style={{ display: "flex", justifyContent: "center", gap: 8, flexWrap: "wrap" }}>
                      {REVEALS[world.category].stats.map((s) => (
                        <div key={s.l} style={{
                          display: "inline-flex", alignItems: "center", gap: 8,
                          padding: "6px 12px", borderRadius: 999,
                          background: `rgba(${world.accentRGB},0.12)`, border: `1px solid rgba(${world.accentRGB},0.4)`,
                        }}>
                          <span style={{ fontFamily: FONTS.display, fontSize: 14, fontWeight: 800, color: world.accent }}>{s.v}</span>
                          <span style={{ fontFamily: FONTS.ui, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(245,245,240,0.85)" }}>{s.l}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  {/* marginTop keeps a gap from subtitle when reveal is collapsed */}
                  <div style={{ marginTop: 20, pointerEvents: "auto" }}>
                    <CinematicButton label="ENTER WORLD" accent={world.accent} onClick={(e) => { e.stopPropagation(); selectWorld(world); }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Bottom credibility bar (desktop) ── */}
      {!isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px clamp(24px,4vw,64px)",
            background: "rgba(10,20,15,0.58)", backdropFilter: "blur(12px)",
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 34, height: 34, borderRadius: "50%", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#FFB000", fontSize: 11 }}>▶</span>
            <div>
              <div style={{ fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: COLORS.white }}>Watch Showreel</div>
              <div style={{ fontFamily: FONTS.ui, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.muted }}>See the magic in action</div>
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,240,0.8)" }}>Multi-Discipline Creative Studio</div>
            <div style={{ fontFamily: FONTS.ui, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.muted }}>Branding · Websites · AI · 3D</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: FONTS.display, fontSize: 22, fontWeight: 800, color: "#FFB000", lineHeight: 1 }}>4K</div>
            <div style={{ fontFamily: FONTS.ui, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: COLORS.muted }}>From concept to launch</div>
          </div>
        </motion.div>
      )}

      {/* ── Transition ── */}
      <AnimatePresence>
        {transition && (
          <WormholeTransition accent={transition.accent} accentRGB={transition.accentRGB} onComplete={finishTransition} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ── Mobile world card ────────────────────────────────────────────────────────
function MobileWorldCard({ world, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onClick={onSelect}
      style={{
        position: "relative", height: "62vh", minHeight: 440, margin: "0 18px 18px",
        borderRadius: 20, overflow: "hidden", border: `1px solid rgba(${world.accentRGB},0.3)`, cursor: "pointer",
      }}
    >
      <img src={world.image} alt={`${world.title} — AYESMAJ Studios`} onError={(e) => { e.currentTarget.style.display = "none"; }}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.6) 100%), radial-gradient(circle at 50% 75%, rgba(${world.accentRGB},0.25), transparent 60%)` }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 32, textAlign: "center", padding: "0 20px" }}>
        <div style={{ fontFamily: FONTS.display, fontSize: 52, fontWeight: 800, color: world.accent, lineHeight: 1, textShadow: `0 0 24px rgba(${world.accentRGB},0.5)` }}>{world.index}</div>
        <h3 style={{ fontFamily: FONTS.display, fontSize: 26, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "#F5F5F0", margin: "8px 0 6px" }}>{world.title}</h3>
        <p style={{ fontFamily: FONTS.ui, fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,245,240,0.7)", marginBottom: 18 }}>{world.subtitle}</p>
        <CinematicButton label="ENTER WORLD" accent={world.accent} onClick={(e) => { e.stopPropagation(); onSelect(); }} />
      </div>
    </motion.div>
  );
}
