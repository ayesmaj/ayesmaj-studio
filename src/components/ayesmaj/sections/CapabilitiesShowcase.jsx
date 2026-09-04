import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Box,
  Clapperboard,
  Code2,
  Compass,
  Palette,
  Sparkles,
} from "lucide-react";
import SectionHeader from "../SectionHeader";
import { COLORS, FONTS } from "../theme";

/* Each card shows REAL client work rather than generated abstract artwork
   (owner request 2026-09-03), and a different brand per card so the six read
   as a body of work instead of one project. Paths verified on disk by
   scripts/real-brands.mjs. */
const CAPABILITIES = [
  {
    index: "01",
    title: "Brand Strategy & Identity",
    description: "Positioning, visual identity, logo systems, packaging, and creative direction that makes a brand feel complete.",
    skills: ["Strategy", "Identity", "Packaging"],
    icon: Compass,
    image: "/brands/baron-herzog/generated/packaging/packaging-lineup.webp",
    credit: "BARON HERZOG",
    accent: "#FFC84B",
    rgb: "255,200,75",
  },
  {
    index: "02",
    title: "AI Content Production",
    description: "Cinematic campaigns, product visuals, commercials, and scalable content systems powered by advanced AI.",
    skills: ["AI Film", "Campaigns", "Content Systems"],
    icon: Sparkles,
    image: "/brands/ashe/5.webp",
    credit: "ASHÉ",
    accent: "#FF8A3D",
    rgb: "255,138,61",
  },
  {
    index: "03",
    title: "Web Design & Development",
    description: "Premium websites, landing pages, responsive systems, and digital experiences built to convert.",
    skills: ["UX/UI", "Development", "Interaction"],
    icon: Code2,
    image: "/brands/syntropic/generated/web/website-responsive.webp",
    credit: "SYNTROPIC",
    accent: "#B3FF3F",
    rgb: "179,255,63",
  },
  {
    index: "04",
    title: "3D & CGI Worlds",
    description: "Product renders, environments, characters, models, and cinematic CGI built from the ground up.",
    skills: ["Modeling", "CGI", "Environments"],
    icon: Box,
    image: "/brands/noam/generated/cgi/cgi-hero.webp",
    credit: "NOAM",
    accent: "#B985FF",
    rgb: "185,133,255",
  },
  {
    index: "05",
    title: "Motion, Film & VFX",
    description: "Brand films, product animation, editing, motion design, and visual effects created for impact.",
    skills: ["Animation", "Film", "VFX"],
    icon: Clapperboard,
    image: "/brands/happy%20jack%20-%20whiskey/generated/web/homepage-hero.webp",
    credit: "HAPPY JACK",
    accent: "#61E7FF",
    rgb: "97,231,255",
  },
  {
    index: "06",
    title: "Campaign Art Direction",
    description: "Big campaign ideas translated into visual concepts, advertising systems, and launch-ready assets.",
    skills: ["Concept", "Art Direction", "Launch"],
    icon: Palette,
    image: "/brands/rebound/ChatGPT%20Image%20Jun%208,%202026,%2010_10_29%20PM.webp",
    credit: "REBOUND",
    accent: "#FF6FAE",
    rgb: "255,111,174",
  },
];

export default function CapabilitiesShowcase() {
  const navigate = useNavigate();

  return (
    <section
      id="capabilities"
      className="idv2-bgc idv2-bgc-02"
      style={{
        position: "relative",
        padding: "clamp(72px,9vw,132px) clamp(24px,5vw,80px)",
        borderTop: `1px solid ${COLORS.border}`,
        overflow: "hidden",
        background: "linear-gradient(135deg, #111510 0%, #192219 42%, #192228 100%)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at 8% 20%, rgba(255,200,75,0.11), transparent 32%), radial-gradient(circle at 92% 82%, rgba(97,231,255,0.09), transparent 35%)",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1320, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Built In-House"
          title="One Studio. Every Creative Skill."
          subtitle="From the first idea to the final frame, AYESMAJ connects strategy, design, technology, motion, and production under one roof."
        />

        <div
          className="ayes-capabilities-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 16,
            marginTop: 52,
          }}
        >
          {CAPABILITIES.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.article
                key={capability.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="ayes-capability-card"
                style={{
                  position: "relative",
                  aspectRatio: "4 / 5",
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 20,
                  overflow: "hidden",
                  background: "rgba(255,255,255,0.055)",
                  border: "1px solid rgba(255,255,255,0.13)",
                  boxShadow: "0 22px 70px rgba(0,0,0,0.24)",
                  "--cap-accent": capability.accent,
                  "--cap-rgb": capability.rgb,
                }}
              >
                <div className="ayes-capability-card__visual">
                  <img
                    src={capability.image}
                    alt={`${capability.credit} — real ${capability.title.toLowerCase()} work by AYESMAJ Studios`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="ayes-capability-card__visual-shade" aria-hidden="true" />
                  {/* Name the client. An unattributed image is decoration; a
                      credited one is proof the studio did the work. */}
                  <span
                    style={{
                      position: "absolute",
                      right: 14,
                      top: 16,
                      zIndex: 2,
                      padding: "5px 11px",
                      borderRadius: 999,
                      fontFamily: FONTS.ui,
                      fontSize: 9.5,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: capability.accent,
                      background: "rgba(3,6,3,0.72)",
                      border: `1px solid rgba(${capability.rgb},0.4)`,
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    {capability.credit}
                  </span>
                  <div className="ayes-capability-card__topline">
                    <div
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 14,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: capability.accent,
                        background: "rgba(3,6,3,0.72)",
                        border: `1px solid rgba(${capability.rgb},0.46)`,
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
                    </div>
                    <span style={{ fontFamily: FONTS.ui, fontSize: 11, fontWeight: 700, letterSpacing: "0.22em", color: capability.accent }}>
                      {capability.index}
                    </span>
                  </div>
                </div>

                <div className="ayes-capability-card__copy">
                  <h3
                    style={{
                      fontFamily: FONTS.card,
                      fontSize: "clamp(23px,1.8vw,31px)",
                      fontWeight: 650,
                      lineHeight: 1.08,
                      letterSpacing: "-0.018em",
                      color: COLORS.white,
                      margin: "0 0 12px",
                    }}
                  >
                    {capability.title}
                  </h3>
                  <p style={{ fontFamily: FONTS.ui, fontSize: 14.5, lineHeight: 1.65, color: COLORS.gray, margin: 0 }}>
                    {capability.description}
                  </p>

                  <div className="ayes-capability-card__footer">
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                      {capability.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontFamily: FONTS.ui,
                          fontSize: 9.5,
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: capability.accent,
                          padding: "7px 10px",
                          borderRadius: 999,
                          background: `rgba(${capability.rgb},0.08)`,
                          border: `1px solid rgba(${capability.rgb},0.22)`,
                        }}
                      >
                        {skill}
                      </span>
                      ))}
                    </div>
                    <button type="button" className="ayes-capability-card__explore" onClick={() => navigate("/Services")}>Explore <ArrowRight size={13} /></button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "center", marginTop: 44 }}>
          <button
            type="button"
            onClick={() => navigate("/Services")}
            style={{
              minHeight: 48,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "0 24px",
              borderRadius: 999,
              cursor: "pointer",
              fontFamily: FONTS.ui,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#07100C",
              background: "#FFC84B",
              border: "1px solid #FFC84B",
            }}
          >
            Explore All Services <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <style>{`
        .ayes-capability-card__visual {
          position: relative;
          flex: 0 0 64%;
          min-height: 0;
          overflow: hidden;
          background: #030503;
        }
        .ayes-capability-card__visual img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.015);
          transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1), filter 300ms ease;
        }
        .ayes-capability-card__visual-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(1,3,2,0.12), transparent 52%, rgba(12,15,13,0.74));
          pointer-events: none;
        }
        .ayes-capability-card__topline {
          position: absolute;
          inset: 18px 20px auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .ayes-capability-card__copy {
          display: flex;
          flex: 1;
          flex-direction: column;
          padding: 22px 26px 24px;
          background: linear-gradient(180deg, rgba(16,19,16,0.96), rgba(22,27,22,0.98));
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ayes-capability-card__footer { display:flex; align-items:flex-end; justify-content:space-between; gap:14px; margin-top:auto; padding-top:20px; }
        .ayes-capability-card__explore { display:inline-flex; align-items:center; gap:6px; flex:0 0 auto; padding:0; border:0; cursor:pointer; color:var(--cap-accent); background:transparent; font-family:${FONTS.ui}; font-size:9px; font-weight:700; letter-spacing:.14em; text-transform:uppercase; opacity:0; transform:translateX(-5px); transition:opacity .4s ease,transform .4s ease; }
        .ayes-capability-card:hover { border-color:var(--cap-accent) !important; }
        .ayes-capability-card:hover .ayes-capability-card__copy { transform:translateY(-3px); }
        .ayes-capability-card:hover .ayes-capability-card__explore { opacity:1; transform:translateX(0); }
        .ayes-capability-card:hover .ayes-capability-card__visual img {
          transform: scale(1.04);
          filter: saturate(1.08) contrast(1.03) brightness(1.05);
        }
        @media (max-width: 980px) {
          .ayes-capabilities-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          .ayes-capabilities-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ayes-capabilities-grid article { transform: none !important; }
          .ayes-capability-card__copy { transition:none; }
          .ayes-capability-card__explore { opacity:1; transform:none; transition:none; }
          .ayes-capability-card__visual img,
          .ayes-capability-card:hover .ayes-capability-card__visual img { transition: none; transform: none; }
        }
      `}</style>
    </section>
  );
}
