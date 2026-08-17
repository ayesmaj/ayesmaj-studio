import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import { FONTS } from "../theme";

const GOLD = "#D8B75A";
const GRAD =
  "linear-gradient(90deg,#D8B75A 0%,#C58B57 28%,#A35BDA 72%,#7A48FF 100%)";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const hideOnError = (e) => {
  e.currentTarget.style.display = "none";
};

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const section = { maxWidth: 1320, margin: "0 auto", padding: "0 clamp(24px,5vw,80px)" };

/* --------------------------- client wall data --------------------------- */

const CLIENTS = [
  { name: "ASHÉ",                  thumb: "/brands/ashe/1.png" },
  { name: "BLENDAY",               thumb: "/brands/blenday/1.png" },
  { name: "BOOM CHICKA POP",       thumb: "/brands/boom-chica/1.png" },
  { name: "LaCROIX",               thumb: "/brands/lacroix/1.jpg" },
  { name: "HONEY",                 thumb: "/brands/honey/1.jpg" },
  { name: "NOAM",                  thumb: "/brands/noam/1.png" },
  { name: "PITA BASTA",            thumb: "/brands/pita-basta/1.png" },
  { name: "BARON HERZOG",          thumb: "/brands/baron-herzog/1.png" },
  { name: "VUDU ENERGY",           thumb: "/videos/websites/posters/vudu-energy.jpg" },
  { name: "PODOS AI",              thumb: "/videos/websites/posters/podos-ai.jpg" },
  { name: "SYNTROPIC",             thumb: "/videos/websites/posters/syntropic.jpg" },
  { name: "REBOUND",               thumb: "/videos/websites/posters/rebound-skincare.jpg" },
  { name: "CASA ORA",              thumb: "/videos/websites/posters/casa-ora.jpg" },
  { name: "KOLIE",                 thumb: "/videos/websites/posters/kolie.png" },
  { name: "ELECTRIC FUEL AMERICA", thumb: "/videos/websites/posters/electric-fuel-america.jpg" },
];

/* -------------------------------- section ------------------------------- */

export default function ClientsStrip() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(null);

  return (
    <section style={{ position: "relative", background: "#0D0F0E", overflow: "hidden", padding: "clamp(90px,11vw,160px) 0 0" }}>
      {/* subtle wall backdrop */}
      <img
        src="/generated/clients/clients-wall.png"
        alt=""
        onError={hideOnError}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.12, pointerEvents: "none" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(90% 70% at 50% 0%, rgba(13,15,14,0) 0%, #0D0F0E 85%)", pointerEvents: "none" }} />

      <div style={{ ...section, position: "relative" }}>
        <SectionHeader
          eyebrow="TRUSTED BY"
          title="BRANDS WE'VE BUILT WITH"
          subtitle="From CPG shelves to AI infrastructure — one visual language across every world."
          accent={GOLD}
        />

        {/* client wall */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
            gap: 14,
            marginTop: "clamp(48px,6vw,80px)",
          }}
        >
          {CLIENTS.map((c, i) => {
            const isHover = hovered === i;
            return (
              <motion.button
                key={c.name}
                {...fade(Math.min(i * 0.04, 0.4))}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
                onClick={() => navigate("/Work")}
                aria-label={`${c.name} — view work`}
                style={{
                  position: "relative",
                  padding: 1,
                  borderRadius: 24,
                  border: "none",
                  background: isHover ? GRAD : "rgba(255,255,255,0.09)",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "background 0.4s ease",
                }}
              >
                <span
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 104,
                    padding: "28px 18px",
                    borderRadius: 23,
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.035)",
                    backdropFilter: "blur(18px)",
                    WebkitBackdropFilter: "blur(18px)",
                  }}
                >
                  {/* project thumbnail reveal */}
                  <img
                    src={c.thumb}
                    alt=""
                    loading="lazy"
                    onError={hideOnError}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: isHover ? 1 : 0,
                      transform: isHover ? "scale(1.04)" : "scale(1.12)",
                      transition: "opacity 0.45s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  />
                  {/* scrim so the name stays readable over the image */}
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(180deg, rgba(5,5,5,0.30) 0%, rgba(5,5,5,0.72) 100%)",
                      opacity: isHover ? 1 : 0,
                      transition: "opacity 0.45s ease",
                    }}
                  />
                  <span
                    style={{
                      position: "relative",
                      fontFamily: FONTS.ui,
                      fontSize: 13,
                      fontWeight: 600,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      lineHeight: 1.5,
                      color: isHover ? "#FFFFFF" : "rgba(216,183,90,0.72)",
                      transition: "color 0.35s ease",
                    }}
                  >
                    {c.name}
                  </span>
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* slow marquee divider strip */}
      <div
        style={{
          position: "relative",
          marginTop: "clamp(64px,8vw,110px)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "20px 0",
          overflow: "hidden",
          maskImage: "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: reduceMotion ? "none" : "ayesClientsMarquee 60s linear infinite",
          }}
        >
          {[...CLIENTS, ...CLIENTS].map((c, i) => (
            <span
              key={i}
              style={{
                fontFamily: FONTS.ui,
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: "rgba(246,243,237,0.34)",
                whiteSpace: "nowrap",
                paddingRight: 64,
              }}
            >
              {c.name}
              <span aria-hidden="true" style={{ color: "rgba(216,183,90,0.5)", paddingLeft: 64 }}>•</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes ayesClientsMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </div>
    </section>
  );
}
