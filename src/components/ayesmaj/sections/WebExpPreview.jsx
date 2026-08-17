import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CinematicButton from "../CinematicButton";
import { FONTS } from "../theme";
import { SITE_DEMOS } from "@/data/media.js";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const GOLD = "#D8B75A";
const PURPLE = "#7A48FF";
const INK = "#111111";
const INK_SOFT = "#2C2B29";
const INK_MUTED = "#6E685F";

const DEMOS = SITE_DEMOS.slice(0, 6);

export default function WebExpPreview() {
  const navigate = useNavigate();

  return (
    <section
      id="web-experiences-preview"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(180deg,#F7F3ED 0%,#EFE5D8 100%)",
        padding: "clamp(72px,9vw,140px) 0",
      }}
    >
      {/* hide scrollbar for the snap row */}
      <style>{`
        .wep-row{scrollbar-width:none;-ms-overflow-style:none}
        .wep-row::-webkit-scrollbar{display:none}
      `}</style>

      {/* header */}
      <div style={{ padding: "0 clamp(24px,5vw,80px)", maxWidth: 1280, margin: "0 auto" }}>
        <motion.p
          {...fade(0)}
          style={{
            fontFamily: FONTS.ui,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: GOLD,
            margin: 0,
          }}
        >
          WEB EXPERIENCES
        </motion.p>

        <motion.h2
          {...fade(0.08)}
          style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(32px,4.6vw,68px)",
            lineHeight: 1.02,
            textTransform: "uppercase",
            color: INK,
            margin: "18px 0 0",
            maxWidth: 900,
          }}
        >
          WEBSITES THAT FEEL LIKE PREMIUM PRODUCTS
        </motion.h2>

        <motion.p
          {...fade(0.16)}
          style={{
            fontFamily: FONTS.ui,
            fontSize: "clamp(15px,1.3vw,18px)",
            lineHeight: 1.65,
            color: INK_MUTED,
            margin: "20px 0 0",
            maxWidth: 560,
          }}
        >
          Real client sites — designed, built and shipped by AYESMAJ.
        </motion.p>
      </div>

      {/* horizontal snap-scroll row */}
      <motion.div
        {...fade(0.2)}
        className="wep-row"
        style={{
          display: "flex",
          gap: "clamp(18px,2.4vw,32px)",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          padding: "clamp(40px,5vw,64px) clamp(24px,5vw,80px) 12px",
        }}
      >
        {DEMOS.map((demo) => (
          <div
            key={demo.id}
            style={{
              flex: "0 0 auto",
              width: "min(82vw, 460px)",
              scrollSnapAlign: "center",
            }}
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: 22,
                overflow: "hidden",
                background: "rgba(255,255,255,0.48)",
                border: "1px solid rgba(255,255,255,0.72)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                boxShadow: "0 24px 60px rgba(130,98,60,0.14)",
              }}
            >
              {/* browser chrome */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(17,17,17,0.07)",
                }}
              >
                <span style={{ display: "flex", gap: 6 }}>
                  {["#E8695A", "#E9BE55", "#69BF6B"].map((c) => (
                    <span key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                  ))}
                </span>
                <span
                  style={{
                    fontFamily: FONTS.ui,
                    fontSize: 12,
                    fontWeight: 600,
                    color: INK_SOFT,
                    marginLeft: 6,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {demo.title.toLowerCase().replace(/\s+/g, "")}.com
                </span>
              </div>

              {/* video */}
              <div style={{ aspectRatio: "16 / 10", background: "linear-gradient(135deg,#E5DBCF,#EFE5D8)" }}>
                <video
                  src={demo.src}
                  poster={demo.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            </motion.div>

            {/* caption */}
            <div style={{ padding: "16px 6px 0" }}>
              <p style={{ fontFamily: FONTS.ui, fontSize: 16, fontWeight: 700, color: INK, margin: 0 }}>
                {demo.title}
              </p>
              <p
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: INK_MUTED,
                  margin: "6px 0 0",
                }}
              >
                {demo.category}
              </p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        {...fade(0.1)}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 18,
          justifyContent: "center",
          padding: "clamp(32px,4vw,56px) clamp(24px,5vw,80px) 0",
        }}
      >
        <CinematicButton
          label="Explore Web Experiences"
          accent={PURPLE}
          variant="solid"
          onClick={() => navigate("/WebExperiences")}
        />
        <CinematicButton
          label="All Sites"
          accent={INK}
          onClick={() => navigate("/Work")}
        />
      </motion.div>
    </section>
  );
}
