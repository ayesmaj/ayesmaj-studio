import React from "react";
import SectionHeader from "./SectionHeader";
import { FONTS } from "./theme";

const DEFAULT_NAMES = [
  "SOLARIS", "EMBER", "VANTA", "MERIDIAN", "APEX",
  "NOVA", "DRIFT", "LUMIS", "CREST",
];

const GOLD = "#FFB000";

/**
 * ClientMarquee — luxury infinite client logo strip.
 *
 * Props:
 *   label    : eyebrow label (default "Trusted By")
 *   title    : section headline (default "Our Clients")
 *   subtitle : supporting paragraph
 *   names    : array of client names (default DEFAULT_NAMES)
 */
export default function ClientMarquee({
  label = "Trusted By",
  title = "Our Clients",
  subtitle,
  names = DEFAULT_NAMES,
}) {
  // Duplicate twice so translateX(-50%) loops seamlessly.
  const loop = [...names, ...names];

  return (
    <section
      style={{
        maxWidth: 1500,
        margin: "0 auto",
        padding: "clamp(64px, 8vw, 120px) 0",
        position: "relative",
      }}
    >
      <div style={{ padding: "0 clamp(20px, 5vw, 48px)" }}>
        <SectionHeader eyebrow={label} title={title} subtitle={subtitle} accent={GOLD} />
      </div>

      <style>{`
        @keyframes ayesmaj-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .ayesmaj-marquee-track {
          display: flex;
          width: max-content;
          align-items: center;
          gap: 14px;
          animation: ayesmaj-marquee 30s linear infinite;
          will-change: transform;
        }
        .ayesmaj-marquee-mask:hover .ayesmaj-marquee-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .ayesmaj-marquee-track { animation: none; }
        }
      `}</style>

      <div
        className="ayesmaj-marquee-mask"
        style={{
          marginTop: "clamp(40px, 5vw, 64px)",
          overflow: "hidden",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent)",
        }}
      >
        <div className="ayesmaj-marquee-track">
          {loop.map((name, i) => (
            <React.Fragment key={i}>
              <span
                style={{
                  flexShrink: 0,
                  padding: "12px 26px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.045)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(18px)",
                  WebkitBackdropFilter: "blur(18px)",
                  fontFamily: FONTS.ui,
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(216,183,90,0.75)",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </span>
              {/* gold sparkle separator */}
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  width: 4,
                  height: 4,
                  borderRadius: "50%",
                  background: GOLD,
                  boxShadow: `0 0 8px ${GOLD}`,
                }}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
