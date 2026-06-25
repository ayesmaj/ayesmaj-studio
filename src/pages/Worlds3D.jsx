import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Box, Mountain, Clapperboard, Shapes } from "lucide-react";

import AyesmajBackground from "@/components/ayesmaj/AyesmajBackground";
import AyesmajNav from "@/components/ayesmaj/AyesmajNav";
import AyesmajFooter from "@/components/ayesmaj/AyesmajFooter";
import CinematicButton from "@/components/ayesmaj/CinematicButton";
import SectionHeader from "@/components/ayesmaj/SectionHeader";
import BeforeAfterSlider from "@/components/ayesmaj/BeforeAfterSlider";
import { COLORS, FONTS } from "@/components/ayesmaj/theme";

// ---- Purple accent (3D Worlds) -------------------------------------------
const ACCENT = "#9B5CFF";
const ACCENT_LIGHT = "#C084FC";
const ACCENT_RGB = "155,92,255";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const sectionStyle = {
  maxWidth: 1440,
  margin: "0 auto",
  padding: "clamp(64px,8vw,120px) clamp(20px,5vw,64px)",
};

const glassCard = {
  background: "rgba(255,255,255,0.045)",
  border: "1px solid rgba(255,255,255,0.09)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 24,
};

const label = {
  fontFamily: FONTS.ui,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: ACCENT,
};

const hideOnError = (e) => { e.currentTarget.style.display = "none"; };

const SERVICES = [
  {
    icon: Box,
    title: "Product Modeling",
    body: "Photoreal 3D models of your products, packaging, and concepts — render-ready for hero shots, web, AR, and animation.",
  },
  {
    icon: Mountain,
    title: "3D Environments",
    body: "Cinematic worlds and product stages built from scratch — lit, textured, and composed to set the tone before a word is said.",
  },
  {
    icon: Clapperboard,
    title: "CGI Commercials",
    body: "Fully rendered spots and launch films. Camera moves, turntables, and immersive sequences engineered for campaigns.",
  },
  {
    icon: Shapes,
    title: "Character / Object Design",
    body: "Original characters, mascots, and hero objects sculpted with personality and built for motion across every channel.",
  },
];

export default function Worlds3D() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "3D Worlds & Models | AYESMAJ Studios";
    window.scrollTo(0, 0);
  }, []);

  const scrollToWork = () => {
    document.getElementById("3d-work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#020302", minHeight: "100vh", overflowX: "clip", position: "relative" }}>
      <AyesmajBackground accent={ACCENT_RGB} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <AyesmajNav />

        <main>
          {/* 1. HERO -------------------------------------------------------- */}
          <section style={{ ...sectionStyle, paddingTop: "clamp(120px,14vw,180px)" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,420px),1fr))",
                gap: "clamp(40px,6vw,80px)",
                alignItems: "center",
              }}
            >
              {/* Left: copy */}
              <motion.div {...fade(0)}>
                <p style={{ ...label, marginBottom: 22 }}>3D Worlds &amp; Models</p>
                <h1
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: "clamp(44px,6.4vw,92px)",
                    fontWeight: 800,
                    lineHeight: 0.95,
                    letterSpacing: "0.01em",
                    textTransform: "uppercase",
                    color: COLORS.white,
                    margin: 0,
                  }}
                >
                  Immersive Worlds{" "}
                  <span
                    style={{
                      background: `linear-gradient(120deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: "transparent",
                    }}
                  >
                    Built for Brands
                  </span>
                </h1>
                <p
                  style={{
                    fontFamily: FONTS.ui,
                    fontSize: "clamp(15px,1.4vw,19px)",
                    lineHeight: 1.65,
                    color: COLORS.gray,
                    margin: "26px 0 0",
                    maxWidth: 540,
                  }}
                >
                  We build cinematic 3D environments, product models, character visuals,
                  CGI commercials, and immersive brand worlds.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 38 }}>
                  <CinematicButton
                    label="Start a Project"
                    accent={ACCENT}
                    variant="solid"
                    size="lg"
                    onClick={() => navigate("/Contact")}
                  />
                  <CinematicButton
                    label="See 3D Work"
                    accent={ACCENT}
                    size="lg"
                    onClick={scrollToWork}
                  />
                </div>
              </motion.div>

              {/* Right: floating glass frames */}
              <motion.div
                {...fade(0.15)}
                style={{ position: "relative", minHeight: 440 }}
              >
                {/* purple glow behind frames */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: "-10% -6%",
                    background: `radial-gradient(60% 60% at 60% 45%, rgba(${ACCENT_RGB},0.30), transparent 70%)`,
                    filter: "blur(20px)",
                    zIndex: 0,
                  }}
                />
                {/* main frame */}
                <motion.div
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    ...glassCard,
                    position: "relative",
                    zIndex: 2,
                    overflow: "hidden",
                    aspectRatio: "4 / 5",
                    maxWidth: 420,
                    margin: "0 0 0 auto",
                    boxShadow: `0 0 60px rgba(${ACCENT_RGB},0.22)`,
                  }}
                >
                  <img
                    src="/assets/ayesmaj/hero/hero-world-3d.png"
                    alt="3D brand world render"
                    onError={hideOnError}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </motion.div>
                {/* small overlapping frame */}
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  style={{
                    ...glassCard,
                    position: "absolute",
                    left: 0,
                    bottom: "8%",
                    zIndex: 3,
                    overflow: "hidden",
                    width: "46%",
                    aspectRatio: "1 / 1",
                    boxShadow: `0 0 45px rgba(${ACCENT_RGB},0.25)`,
                  }}
                >
                  <img
                    src="/assets/ayesmaj/hero/panel-3d.png"
                    alt="3D model detail"
                    onError={hideOnError}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* 2. SERVICE CARDS --------------------------------------------- */}
          <section style={sectionStyle}>
            <SectionHeader
              eyebrow="What We Build"
              title="3D Services"
              subtitle="From a single hero product to an entire animated brand universe."
              accent={ACCENT}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px),1fr))",
                gap: 24,
                marginTop: 56,
              }}
            >
              {SERVICES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.title}
                    {...fade(i * 0.08)}
                    className="ayes-glass-card"
                    style={{ ...glassCard, padding: 32 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-6px)";
                      e.currentTarget.style.borderColor = `rgba(${ACCENT_RGB},0.35)`;
                      e.currentTarget.style.boxShadow = `0 0 45px rgba(${ACCENT_RGB},0.10)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `rgba(${ACCENT_RGB},0.12)`,
                        border: `1px solid rgba(${ACCENT_RGB},0.3)`,
                        marginBottom: 22,
                      }}
                    >
                      <Icon size={24} color={ACCENT_LIGHT} />
                    </div>
                    <h3
                      style={{
                        fontFamily: FONTS.display,
                        fontSize: 22,
                        fontWeight: 800,
                        letterSpacing: "0.01em",
                        textTransform: "uppercase",
                        color: COLORS.white,
                        margin: "0 0 12px",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: FONTS.ui,
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: COLORS.gray,
                        margin: 0,
                      }}
                    >
                      {s.body}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* 3. FROM CLAY TO FINAL RENDER --------------------------------- */}
          <section style={sectionStyle}>
            <SectionHeader
              eyebrow="Process"
              title="From Clay to Final Render"
              subtitle="Every world starts as raw geometry. Drag to see how it transforms."
              accent={ACCENT}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,360px),1fr))",
                gap: 28,
                marginTop: 56,
              }}
            >
              <motion.div {...fade(0)}>
                <BeforeAfterSlider
                  beforeImg="/assets/ayesmaj/hero/hero-world-3d.png"
                  afterImg="/assets/ayesmaj/hero/hero-world-3d.png"
                  beforeLabel="CLAY MODEL"
                  afterLabel="FINAL RENDER"
                  accent={ACCENT}
                  accentRGB={ACCENT_RGB}
                />
              </motion.div>
              <motion.div {...fade(0.12)}>
                <BeforeAfterSlider
                  beforeImg="/assets/ayesmaj/hero/hero-world-3d.png"
                  afterImg="/assets/ayesmaj/hero/hero-world-3d.png"
                  beforeLabel="RAW MODEL"
                  afterLabel="FINAL RENDER"
                  accent={ACCENT}
                  accentRGB={ACCENT_RGB}
                />
              </motion.div>
            </div>
          </section>

          {/* 4. ANIMATION GRID ------------------------------------------- */}
          <section id="3d-work" style={sectionStyle}>
            <SectionHeader
              eyebrow="Motion Work"
              title="Animations"
              subtitle="Turntables, camera moves, and immersive sequences. New reels dropping soon."
              accent={ACCENT}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px),1fr))",
                gap: 24,
                marginTop: 56,
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  {...fade((i % 3) * 0.08)}
                  style={{
                    position: "relative",
                    aspectRatio: "16 / 11",
                    borderRadius: 24,
                    overflow: "hidden",
                    background: "#071207",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow: `inset 0 0 80px rgba(${ACCENT_RGB},0.08)`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 22,
                  }}
                >
                  {/* faint grid texture */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0.12,
                      backgroundImage: [
                        "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 40px)",
                        "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 40px)",
                      ].join(","),
                      maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000, transparent 80%)",
                      WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, #000, transparent 80%)",
                    }}
                  />
                  {/* purple glow */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `radial-gradient(50% 50% at 50% 60%, rgba(${ACCENT_RGB},0.16), transparent 70%)`,
                      pointerEvents: "none",
                    }}
                  />
                  <span
                    style={{
                      ...label,
                      position: "relative",
                      zIndex: 1,
                      fontSize: 13,
                      color: ACCENT_LIGHT,
                    }}
                  >
                    {`#${String(i + 1).padStart(2, "0")}`}
                  </span>
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      fontFamily: FONTS.ui,
                      fontSize: 12,
                      letterSpacing: "0.24em",
                      textTransform: "uppercase",
                      color: COLORS.muted,
                    }}
                  >
                    Coming Soon
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 5. FINAL CTA ------------------------------------------------- */}
          <section style={{ ...sectionStyle, textAlign: "center" }}>
            <motion.div
              {...fade(0)}
              style={{
                ...glassCard,
                padding: "clamp(48px,7vw,88px) clamp(24px,5vw,64px)",
                maxWidth: 980,
                margin: "0 auto",
                boxShadow: `0 0 70px rgba(${ACCENT_RGB},0.12)`,
              }}
            >
              <p style={{ ...label, marginBottom: 18 }}>Let's Create</p>
              <h2
                style={{
                  fontFamily: FONTS.display,
                  fontSize: "clamp(34px,5vw,68px)",
                  fontWeight: 800,
                  lineHeight: 0.98,
                  letterSpacing: "0.01em",
                  textTransform: "uppercase",
                  color: COLORS.white,
                  margin: "0 0 30px",
                }}
              >
                Let&apos;s Build Your{" "}
                <span
                  style={{
                    background: `linear-gradient(120deg, ${ACCENT}, ${ACCENT_LIGHT})`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                  }}
                >
                  3D World
                </span>
              </h2>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CinematicButton
                  label="Start a Project"
                  accent={ACCENT}
                  variant="solid"
                  size="lg"
                  onClick={() => navigate("/Contact")}
                />
              </div>
            </motion.div>
          </section>
        </main>

        <AyesmajFooter />
      </div>
    </div>
  );
}
