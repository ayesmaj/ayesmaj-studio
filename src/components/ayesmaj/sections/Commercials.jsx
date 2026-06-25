import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";
import VideoCard from "../VideoCard";
import { COLORS } from "../theme";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const CARDS = [
  {
    title: "Factory",
    category: "CGI Commercial",
    accent: "#FFB000",
    accentRGB: "255,176,0",
    poster: "/assets/ayesmaj/hero/hero-world-ai-marketing.png",
  },
  {
    title: "BLENDAY",
    category: "Brand Film",
    accent: "#B3FF3F",
    accentRGB: "179,255,63",
    poster: "/assets/ayesmaj/hero/hero-world-website.png",
  },
  {
    title: "Optimus",
    category: "3D Animation",
    accent: "#9B5CFF",
    accentRGB: "155,92,255",
    poster: "/assets/ayesmaj/hero/hero-world-3d.png",
  },
];

export default function Commercials() {
  return (
    <section
      style={{
        padding: "clamp(64px,8vw,120px) clamp(24px,5vw,80px)",
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionHeader
          eyebrow="Showreel"
          title="Cinematic Commercials"
          subtitle="Click any card to play. Hover to control."
          accent="#FFB000"
        />

        <div
          style={{
            marginTop: "clamp(40px,5vw,64px)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px),1fr))",
            gap: "clamp(18px,2vw,28px)",
          }}
        >
          {CARDS.map((c, i) => (
            <motion.div key={c.title} {...fade(i * 0.1)}>
              <VideoCard
                title={c.title}
                category={c.category}
                accent={c.accent}
                accentRGB={c.accentRGB}
                poster={c.poster}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
