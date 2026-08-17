import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeader from "../SectionHeader";
import { COLORS, FONTS } from "../theme";
import { BRANDS, getBrandAssetPath } from "@/data/brands";

// Filter buttons → keyword matcher against each brand's tags + category
const FILTERS = [
  { key: "all", label: "All", match: () => true },
  { key: "branding", label: "Branding", match: (t) => /brand identity|identity|logo|luxury/i.test(t) },
  { key: "motion", label: "Motion & Film", match: (t) => /film|motion|commercial/i.test(t) },
  { key: "3d", label: "3D & CGI", match: (t) => /cgi|3d|character|render/i.test(t) },
  { key: "campaign", label: "Campaign", match: (t) => /campaign|product|art direction/i.test(t) },
];

export default function SelectedWorlds() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const items = useMemo(() => {
    const f = FILTERS.find((x) => x.key === filter);
    return BRANDS.filter((b) => {
      const hay = `${b.category} ${(b.tags || []).join(" ")}`;
      return f.match(hay);
    });
  }, [filter]);

  return (
    <section style={{ padding: "clamp(60px,8vw,120px) clamp(24px,5vw,80px)", borderTop: `1px solid ${COLORS.border}` }}>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <SectionHeader eyebrow="Portfolio" title="Selected Digital Worlds" />

        {/* Filters */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 10,
            margin: "36px 0 44px",
          }}
        >
          {FILTERS.map((f) => {
            const active = filter === f.key;
            const count = BRANDS.filter((b) => {
              const hay = `${b.category} ${(b.tags || []).join(" ")}`;
              return f.match(hay);
            }).length;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  borderRadius: 999,
                  cursor: "pointer",
                  color: active ? "#030303" : COLORS.gray,
                  background: active ? "#FFB000" : "transparent",
                  border: `1px solid ${active ? "#FFB000" : COLORS.border}`,
                  transition: "all 0.3s ease",
                }}
              >
                {f.label} <span style={{ opacity: active ? 0.65 : 0.5 }}>({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: 18,
          }}
        >
          <AnimatePresence mode="popLayout">
            {items.map((b) => (
              <motion.button
                key={b.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => navigate(`/BrandDetail?slug=${b.id}`)}
                whileHover={{ y: -6 }}
                className="ayes-work-card"
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  borderRadius: 16,
                  overflow: "hidden",
                  cursor: "pointer",
                  border: `1px solid ${COLORS.border}`,
                  background: COLORS.black2,
                  padding: 0,
                  textAlign: "left",
                }}
              >
                <img
                  src={`/generated/projects/${b.id}/cover.webp`}
                  alt={b.name}
                  loading="lazy"
                  onError={(e) => {
                    if (!e.currentTarget.dataset.fb) { e.currentTarget.dataset.fb = 1; e.currentTarget.src = getBrandAssetPath(b, b.featured); }
                    else e.currentTarget.style.opacity = 0;
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                  className="ayes-work-img"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(3,3,3,0.95) 0%, rgba(3,3,3,0.1) 55%, rgba(3,3,3,0.3) 100%)",
                  }}
                />
                <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: 20, zIndex: 2 }}>
                  <span
                    style={{
                      fontFamily: FONTS.ui,
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: b.accent || "#FFB000",
                    }}
                  >
                    {b.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 24,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      color: COLORS.white,
                      margin: "6px 0 4px",
                    }}
                  >
                    {b.name}
                  </h3>
                  <p style={{ fontFamily: FONTS.ui, fontSize: 12.5, color: COLORS.gray, margin: 0 }}>
                    {b.subtitle}
                  </p>
                  <span
                    className="ayes-work-cta"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      marginTop: 12,
                      fontFamily: FONTS.ui,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: b.accent || "#FFB000",
                    }}
                  >
                    View Project <ArrowUpRight size={13} />
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .ayes-work-card:hover .ayes-work-img { transform: scale(1.06); }
      `}</style>
    </section>
  );
}
