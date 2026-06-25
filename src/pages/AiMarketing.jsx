import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Film, ImageIcon, Share2, Clapperboard, PackageOpen, Rocket } from "lucide-react";
import { COLORS, FONTS } from "@/components/ayesmaj/theme";
import AyesmajBackground from "@/components/ayesmaj/AyesmajBackground";
import AyesmajNav from "@/components/ayesmaj/AyesmajNav";
import AyesmajFooter from "@/components/ayesmaj/AyesmajFooter";
import SectionHeader from "@/components/ayesmaj/SectionHeader";
import CinematicButton from "@/components/ayesmaj/CinematicButton";

const ACCENT = "#FFB000";
const ACCENT_SOFT = "#FFD36A";
const ACCENT_RGB = "255,176,0";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const SECTION = {
  maxWidth: 1400,
  margin: "0 auto",
  padding: "clamp(64px,8vw,120px) clamp(20px,5vw,48px)",
};

const LABEL = {
  fontFamily: FONTS.ui,
  textTransform: "uppercase",
  letterSpacing: "0.28em",
  fontSize: 12,
  fontWeight: 600,
  color: ACCENT,
};

const cardBase = {
  background: COLORS.glass,
  border: "1px solid rgba(255,255,255,0.09)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 24,
  padding: 32,
  transition: "transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease",
};

const hideBroken = (e) => {
  e.currentTarget.style.display = "none";
};

function GlassCard({ children }) {
  return (
    <div
      style={cardBase}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = "rgba(216,183,90,0.35)";
        e.currentTarget.style.boxShadow = "0 0 45px rgba(216,183,90,0.10)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </div>
  );
}

function IconCard({ Icon, title, body, delay }) {
  return (
    <motion.div {...fade(delay)}>
      <GlassCard>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            display: "grid",
            placeItems: "center",
            background: `rgba(${ACCENT_RGB},0.12)`,
            border: `1px solid rgba(${ACCENT_RGB},0.30)`,
            marginBottom: 22,
          }}
        >
          <Icon size={26} color={ACCENT} strokeWidth={1.6} />
        </div>
        <h3
          style={{
            fontFamily: FONTS.display,
            textTransform: "uppercase",
            fontSize: "clamp(20px,2vw,26px)",
            fontWeight: 800,
            letterSpacing: "0.01em",
            lineHeight: 0.98,
            color: COLORS.white,
            margin: "0 0 14px",
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: FONTS.ui,
            fontSize: 15,
            lineHeight: 1.7,
            color: COLORS.gray,
            margin: 0,
          }}
        >
          {body}
        </p>
      </GlassCard>
    </motion.div>
  );
}

const GRID = {
  display: "grid",
  gap: 24,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px),1fr))",
};

const SERVICES = [
  { Icon: Film, title: "AI Video Campaigns", body: "Cinematic brand films, product reveals, and scroll-stopping social ads — generated, directed, and edited with the latest AI video models. Premium output in days, not months." },
  { Icon: ImageIcon, title: "AI Image Systems", body: "Campaign visuals, product renders, and consistent brand worlds at infinite scale. One visual language, endless on-brand variations, zero photoshoot logistics." },
  { Icon: Share2, title: "Brand Social Content", body: "Platform-native cuts for Instagram, TikTok, YouTube, and LinkedIn — formatted, captioned, and optimized so your message lands the moment it's seen." },
];

const CONCEPTS = [
  { Icon: Clapperboard, title: "Concept Films", body: "Bold visual concepts that define how a brand feels before a single product is shown — mood, motion, and message engineered to be remembered." },
  { Icon: PackageOpen, title: "Product Spots", body: "Tight, high-impact product features built for paid placement — every frame designed to drive clicks, demos, and sales." },
  { Icon: Rocket, title: "Launch Campaigns", body: "End-to-end launch content systems: teasers, hero films, cutdowns, and social — a coordinated rollout that makes a launch feel like an event." },
];

const STEPS = [
  { n: "01", title: "Brief", body: "We align on goals, audience, and the visual feel before anything is generated." },
  { n: "02", title: "Generate", body: "We produce a wide field of AI-driven concepts, frames, and motion at speed." },
  { n: "03", title: "Curate", body: "We direct and refine — selecting, editing, and grading only the strongest." },
  { n: "04", title: "Deliver", body: "Final assets shipped in every format your channels need, ready to publish." },
];

const WORK = [
  { img: "/assets/ayesmaj/web-experiences/project-nexora.jpg", cat: "AI Video Campaign", title: "Nexora Launch Film" },
  { img: "/assets/ayesmaj/web-experiences/web-hero-laptop-dashboard.jpg", cat: "AI Image System", title: "SaaS Brand Visuals" },
  { img: "/assets/ayesmaj/web-experiences/web-hero-desktop-showcase.jpg", cat: "Social Content Engine", title: "Always-On Social" },
];

export default function AiMarketing() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "AI Marketing | AYESMAJ Studios";
    window.scrollTo(0, 0);
  }, []);

  const scrollToWork = () => {
    document.getElementById("ai-work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ background: "#020302", minHeight: "100vh", overflowX: "clip", position: "relative" }}>
      <AyesmajBackground accent={ACCENT_RGB} />
      <div style={{ position: "relative", zIndex: 1 }}>
        <AyesmajNav />

        <main>
          {/* 1. HERO */}
          <section style={{ ...SECTION, paddingTop: "clamp(120px,16vw,180px)" }}>
            <div
              style={{
                display: "grid",
                gap: "clamp(32px,5vw,64px)",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,360px),1fr))",
                alignItems: "center",
              }}
            >
              <motion.div {...fade(0)}>
                <p style={{ ...LABEL, marginBottom: 22 }}>AI Marketing Content</p>
                <h1
                  style={{
                    fontFamily: FONTS.display,
                    textTransform: "uppercase",
                    fontSize: "clamp(44px,6.4vw,92px)",
                    fontWeight: 800,
                    lineHeight: 0.95,
                    letterSpacing: "0.01em",
                    color: COLORS.white,
                    margin: "0 0 26px",
                  }}
                >
                  Cinematic Content
                  <br />
                  Built at{" "}
                  <span
                    style={{
                      background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_SOFT})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      color: ACCENT,
                    }}
                  >
                    AI Speed
                  </span>
                </h1>
                <p
                  style={{
                    fontFamily: FONTS.ui,
                    fontSize: "clamp(16px,1.4vw,19px)",
                    lineHeight: 1.7,
                    color: COLORS.gray,
                    maxWidth: 540,
                    margin: "0 0 34px",
                  }}
                >
                  We create AI-powered videos, images, campaigns, and brand visuals that help
                  companies look premium, move fast, and stay visible.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                  <CinematicButton label="Start a Project" accent={ACCENT} variant="solid" size="lg" onClick={() => navigate("/Contact")} />
                  <CinematicButton label="See AI Work" accent={ACCENT} size="lg" onClick={scrollToWork} />
                </div>
              </motion.div>

              {/* glass collage */}
              <motion.div
                {...fade(0.15)}
                style={{ position: "relative", minHeight: 420 }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "-8%",
                    background: `radial-gradient(60% 60% at 60% 40%, rgba(${ACCENT_RGB},0.22), transparent 70%)`,
                    filter: "blur(8px)",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    borderRadius: 24,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.09)",
                    boxShadow: `0 0 60px rgba(${ACCENT_RGB},0.18)`,
                    transform: "rotate(-2deg)",
                  }}
                >
                  <img
                    src="/assets/ayesmaj/web-experiences/web-hero-laptop-dashboard.jpg"
                    alt="AI-generated brand dashboard visual"
                    onError={hideBroken}
                    style={{ display: "block", width: "100%", height: "auto" }}
                  />
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: "-6%",
                    right: "-4%",
                    width: "52%",
                    borderRadius: 20,
                    overflow: "hidden",
                    border: `1px solid rgba(${ACCENT_RGB},0.35)`,
                    boxShadow: `0 0 45px rgba(${ACCENT_RGB},0.25)`,
                    transform: "rotate(4deg)",
                    background: "#070707",
                  }}
                >
                  <img
                    src="/assets/ayesmaj/web-experiences/project-nexora.jpg"
                    alt="AI-generated campaign film still"
                    onError={hideBroken}
                    style={{ display: "block", width: "100%", height: "auto" }}
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* 2. SERVICE CARDS */}
          <section style={SECTION}>
            <motion.div {...fade(0)} style={{ marginBottom: 56 }}>
              <SectionHeader
                eyebrow="What We Build"
                title="AI Content Services"
                subtitle="Three core engines that keep your brand looking premium and producing constantly."
                accent={ACCENT}
              />
            </motion.div>
            <div style={GRID}>
              {SERVICES.map((s, i) => (
                <IconCard key={s.title} {...s} delay={i * 0.1} />
              ))}
            </div>
          </section>

          {/* 3. COMMERCIAL CONCEPTS */}
          <section style={SECTION}>
            <motion.div {...fade(0)} style={{ marginBottom: 56 }}>
              <SectionHeader
                eyebrow="Commercial Concepts"
                title="Ideas Built to Sell"
                subtitle="From first concept to full launch — cinematic commercial work engineered around results."
                accent={ACCENT}
              />
            </motion.div>
            <div style={GRID}>
              {CONCEPTS.map((c, i) => (
                <IconCard key={c.title} {...c} delay={i * 0.1} />
              ))}
            </div>
          </section>

          {/* 4. CONTENT ENGINE PROCESS */}
          <section style={SECTION}>
            <motion.div {...fade(0)} style={{ marginBottom: 64 }}>
              <SectionHeader
                eyebrow="How It Works"
                title="The Content Engine"
                subtitle="A repeatable four-step pipeline that turns a brief into finished, on-brand content."
                accent={ACCENT}
              />
            </motion.div>

            <div style={{ position: "relative" }}>
              {/* connecting line */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 28,
                  left: 28,
                  right: 28,
                  height: 1,
                  background: `linear-gradient(90deg, transparent, rgba(${ACCENT_RGB},0.5), transparent)`,
                }}
                className="ai-process-line"
              />
              <div
                style={{
                  display: "grid",
                  gap: 32,
                  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,220px),1fr))",
                }}
              >
                {STEPS.map((step, i) => (
                  <motion.div key={step.n} {...fade(i * 0.1)} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        margin: "0 auto 22px",
                        display: "grid",
                        placeItems: "center",
                        background: "#071207",
                        border: `1px solid rgba(${ACCENT_RGB},0.45)`,
                        boxShadow: `0 0 28px rgba(${ACCENT_RGB},0.20)`,
                        fontFamily: FONTS.display,
                        fontSize: 20,
                        fontWeight: 800,
                        color: ACCENT,
                      }}
                    >
                      {step.n}
                    </div>
                    <h3
                      style={{
                        fontFamily: FONTS.display,
                        textTransform: "uppercase",
                        fontSize: 22,
                        fontWeight: 800,
                        letterSpacing: "0.01em",
                        color: COLORS.white,
                        margin: "0 0 12px",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: FONTS.ui,
                        fontSize: 14,
                        lineHeight: 1.65,
                        color: COLORS.gray,
                        margin: "0 auto",
                        maxWidth: 240,
                      }}
                    >
                      {step.body}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. SELECTED AI WORK */}
          <section id="ai-work" style={SECTION}>
            <motion.div {...fade(0)} style={{ marginBottom: 56 }}>
              <SectionHeader
                eyebrow="Selected Work"
                title="AI Content in Action"
                subtitle="A snapshot of recent campaigns, visuals, and content systems we've produced."
                accent={ACCENT}
              />
            </motion.div>
            <div style={GRID}>
              {WORK.map((w, i) => (
                <motion.div key={w.title} {...fade(i * 0.1)}>
                  <GlassCard>
                    <div
                      style={{
                        borderRadius: 16,
                        overflow: "hidden",
                        marginBottom: 20,
                        border: "1px solid rgba(255,255,255,0.08)",
                        aspectRatio: "16 / 10",
                        background: "#070707",
                      }}
                    >
                      <img
                        src={w.img}
                        alt={w.title}
                        onError={hideBroken}
                        style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <p style={{ ...LABEL, fontSize: 11, marginBottom: 10 }}>{w.cat}</p>
                    <h3
                      style={{
                        fontFamily: FONTS.display,
                        textTransform: "uppercase",
                        fontSize: 22,
                        fontWeight: 800,
                        letterSpacing: "0.01em",
                        color: COLORS.white,
                        margin: 0,
                      }}
                    >
                      {w.title}
                    </h3>
                  </GlassCard>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 6. FINAL CTA */}
          <section style={{ ...SECTION, textAlign: "center", position: "relative" }}>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(50% 70% at 50% 50%, rgba(${ACCENT_RGB},0.16), transparent 70%)`,
                pointerEvents: "none",
              }}
            />
            <motion.div {...fade(0)} style={{ position: "relative" }}>
              <h2
                style={{
                  fontFamily: FONTS.display,
                  textTransform: "uppercase",
                  fontSize: "clamp(40px,6vw,86px)",
                  fontWeight: 800,
                  lineHeight: 0.95,
                  letterSpacing: "0.01em",
                  color: COLORS.white,
                  margin: "0 auto 30px",
                  maxWidth: 900,
                }}
              >
                Let's Build Your{" "}
                <span
                  style={{
                    background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_SOFT})`,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: ACCENT,
                  }}
                >
                  Content Engine
                </span>
              </h2>
              <p
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: "clamp(16px,1.4vw,19px)",
                  lineHeight: 1.7,
                  color: COLORS.gray,
                  maxWidth: 560,
                  margin: "0 auto 36px",
                }}
              >
                Premium AI content, produced at scale. Tell us what you're launching and we'll
                build the visuals that move it.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CinematicButton label="Start a Project" accent={ACCENT} variant="solid" size="lg" onClick={() => navigate("/Contact")} />
              </div>
            </motion.div>
          </section>
        </main>

        <AyesmajFooter />
      </div>

      <style>{`
        @media (max-width: 760px) {
          .ai-process-line { display: none; }
        }
      `}</style>
    </div>
  );
}
