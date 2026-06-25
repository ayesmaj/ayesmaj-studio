import React from "react";
import { useNavigate } from "react-router-dom";
import LogoMark from "./LogoMark";
import { WORLDS, COLORS, FONTS } from "./theme";

const COLS = [
  {
    title: "Worlds",
    links: [
      { label: "Website Design", to: WORLDS[0].route },
      { label: "AI Marketing", to: WORLDS[1].route },
      { label: "3D Worlds & Models", to: WORLDS[2].route },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Work", to: "/Brands" },
      { label: "About", to: "/About" },
      { label: "Pricing", to: "/Pricing" },
      { label: "Contact", to: "/Contact" },
    ],
  },
];

export default function AyesmajFooter() {
  const navigate = useNavigate();
  const year = 2026;
  return (
    <footer
      style={{
        borderTop: `1px solid ${COLORS.border}`,
        padding: "clamp(48px,6vw,80px) clamp(24px,5vw,80px) 36px",
        background: COLORS.black,
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr",
          gap: "clamp(32px,5vw,64px)",
        }}
        className="ayes-footer-grid"
      >
        <div>
          <LogoMark size={34} />
          <p
            style={{
              fontFamily: FONTS.ui,
              fontSize: 14.5,
              lineHeight: 1.7,
              color: COLORS.gray,
              maxWidth: 320,
              marginTop: 20,
            }}
          >
            We build brands. We create worlds. AI-powered branding, cinematic websites, and immersive digital experiences.
          </p>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h4
              style={{
                fontFamily: FONTS.ui,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: COLORS.muted,
                marginBottom: 18,
              }}
            >
              {col.title}
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {col.links.map((l) => (
                <button
                  key={l.label}
                  onClick={() => navigate(l.to)}
                  style={{
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: FONTS.ui,
                    fontSize: 14.5,
                    color: COLORS.gray,
                    padding: 0,
                    transition: "color 0.25s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.white)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.gray)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          maxWidth: 1320,
          margin: "48px auto 0",
          paddingTop: 24,
          borderTop: `1px solid ${COLORS.border}`,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span style={{ fontFamily: FONTS.ui, fontSize: 12.5, color: COLORS.muted }}>
          © {year} AYESMAJ Studios. All rights reserved.
        </span>
        <span style={{ fontFamily: FONTS.ui, fontSize: 12.5, color: COLORS.muted, letterSpacing: "0.1em" }}>
          WE BUILD BRANDS. WE CREATE WORLDS.
        </span>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .ayes-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
