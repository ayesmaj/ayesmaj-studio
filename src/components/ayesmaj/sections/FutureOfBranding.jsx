import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "../SectionHeader";
import { WORLDS, COLORS, FONTS } from "../theme";

const CARDS = [
  {
    world: WORLDS[0],
    label: "Web Experiences",
    body: "Cinematic websites and landing pages engineered to convert — fast, premium, unforgettable.",
  },
  {
    world: WORLDS[1],
    label: "AI Marketing Content",
    body: "Videos, images, and full campaigns produced with advanced AI — at a speed studios can't match.",
  },
  {
    world: WORLDS[2],
    label: "3D Worldbuilding",
    body: "Product visuals, models, and immersive 3D worlds that make a brand impossible to forget.",
  },
];

export default function FutureOfBranding() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: "clamp(80px,10vw,140px) clamp(24px,5vw,80px)" }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="One Visual System"
          title="The Future of Branding Is Not One Service"
          subtitle="AYESMAJ connects strategy, AI, cinematic design, websites, and 3D production into one visual system — so your brand looks bigger before the first conversation."
        />

        <div
          style={{
            marginTop: "clamp(48px,6vw,80px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: 22,
          }}
        >
          {CARDS.map((c, i) => (
            <motion.button
              key={c.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => navigate(c.world.route)}
              whileHover={{ y: -6 }}
              style={{
                position: "relative",
                textAlign: "left",
                cursor: "pointer",
                borderRadius: 18,
                overflow: "hidden",
                minHeight: 380,
                border: `1px solid rgba(${c.world.accentRGB},0.18)`,
                background: COLORS.black2,
                padding: 0,
              }}
              className="ayes-future-card"
            >
              {/* Background image */}
              <img
                src={c.world.image}
                alt={c.label}
                loading="lazy"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.55 }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(to top, rgba(3,3,3,0.96) 0%, rgba(3,3,3,0.4) 60%, rgba(3,3,3,0.7) 100%),
                    radial-gradient(circle at 50% 100%, rgba(${c.world.accentRGB},0.22), transparent 60%)`,
                }}
              />

              {/* Content */}
              <div style={{ position: "relative", zIndex: 2, padding: 28, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", minHeight: 380 }}>
                <div
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 44,
                    fontWeight: 800,
                    color: c.world.accent,
                    lineHeight: 1,
                    marginBottom: 14,
                    textShadow: `0 0 24px rgba(${c.world.accentRGB},0.4)`,
                  }}
                >
                  {c.world.index}
                </div>
                <h3
                  style={{
                    fontFamily: FONTS.display,
                    fontSize: 26,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    color: COLORS.white,
                    margin: "0 0 10px",
                  }}
                >
                  {c.label}
                </h3>
                <p style={{ fontFamily: FONTS.ui, fontSize: 14.5, lineHeight: 1.6, color: COLORS.gray, margin: "0 0 18px" }}>
                  {c.body}
                </p>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: FONTS.ui,
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: c.world.accent,
                  }}
                >
                  Enter World <ArrowUpRight size={15} />
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
