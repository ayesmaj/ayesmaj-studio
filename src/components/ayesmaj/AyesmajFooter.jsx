import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CinematicButton from "./CinematicButton";
import { FONTS } from "./theme";
import {
  SITE,
  FOOTER_EXPLORE,
  FOOTER_SERVICES,
  FOOTER_WORK,
  LEGAL_LINKS,
} from "@/data/siteConfig";
import { BRANDS, getBrandAssetPath } from "@/data/brands";

const GOLD = "#D8B75A";
const IVORY = "#F6F3ED";
const GRAD =
  "linear-gradient(90deg,#D8B75A 0%,#C88B58 30%,#A45FDB 70%,#7A48FF 100%)";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

// ponytail: cover may still be generating — fall back to the original brand image once.
const coverError = (brand) => (e) => {
  if (e.currentTarget.dataset.fb) return;
  e.currentTarget.dataset.fb = "1";
  e.currentTarget.src = getBrandAssetPath(brand, brand.featured);
};

function FooterLink({ to, children, external }) {
  const inner = (
    <>
      <span className="ayes-flink-dot" aria-hidden="true" />
      {children}
    </>
  );
  const style = {
    fontFamily: FONTS.ui,
    fontSize: 14.5,
    color: "#AAA39A",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 0,
    transition: "color 0.25s ease",
    width: "fit-content",
  };
  return external ? (
    <a href={to} className="ayes-flink" style={style}>
      {inner}
    </a>
  ) : (
    <Link to={to} className="ayes-flink" style={style}>
      {inner}
    </Link>
  );
}

function SitemapCol({ title, children }) {
  return (
    <div>
      <h4
        style={{
          fontFamily: FONTS.ui,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: GOLD,
          marginBottom: 20,
        }}
      >
        {title}
      </h4>
      <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
        {children}
      </div>
    </div>
  );
}

export default function AyesmajFooter() {
  const navigate = useNavigate();
  const strip = [...BRANDS, ...BRANDS]; // duplicated for seamless loop

  return (
    <footer style={{ background: "#050505", overflow: "hidden" }}>
      {/* ---------- LAYER 1 — cinematic CTA ---------- */}
      <section className="idv2-bgc idv2-bgc-03"
        style={{
          position: "relative",
          padding: "clamp(80px,10vw,150px) clamp(24px,5vw,80px) clamp(48px,6vw,80px)",
          borderTop: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        {/* giant faint A watermark */}
        <img
          src="/assets/ayesmaj/logo-a.webp"
          alt=""
          aria-hidden="true"
          onError={(e) => (e.currentTarget.style.display = "none")}
          style={{
            position: "absolute",
            right: "-6%",
            top: "50%",
            transform: "translateY(-55%)",
            width: "min(58vw, 760px)",
            maxWidth: "none",
            opacity: 0.06,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative" }}>
          <motion.h2
            {...fade(0)}
            style={{
              fontFamily: FONTS.display,
              fontSize: "clamp(2.6rem, 7vw, 6.4rem)",
              lineHeight: 1.02,
              textTransform: "uppercase",
              color: IVORY,
              maxWidth: 980,
              margin: 0,
            }}
          >
            LET&rsquo;S BUILD SOMETHING{" "}
            <span
              style={{
                background: GRAD,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              PEOPLE REMEMBER.
            </span>
          </motion.h2>

          <motion.p
            {...fade(0.1)}
            style={{
              fontFamily: FONTS.ui,
              fontSize: "clamp(15px, 1.6vw, 17.5px)",
              lineHeight: 1.7,
              color: "#D7D1C8",
              maxWidth: 560,
              margin: "28px 0 40px",
            }}
          >
            {SITE.description}
          </motion.p>

          <motion.div
            {...fade(0.2)}
            style={{ display: "flex", gap: 18, flexWrap: "wrap" }}
          >
            <CinematicButton
              label="Start a Project"
              accent={GOLD}
              variant="solid"
              size="lg"
              onClick={() => navigate("/Contact")}
            />
            <CinematicButton
              label="View Our Work"
              accent={IVORY}
              size="lg"
              onClick={() => navigate("/Work")}
            />
          </motion.div>
        </div>

        {/* film strip marquee */}
        <div
          className="ayes-strip"
          aria-hidden="true"
          style={{
            marginTop: "clamp(56px,7vw,96px)",
            maskImage:
              "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            overflow: "hidden",
          }}
        >
          <div className="ayes-strip-track" style={{ display: "flex", gap: 16, width: "max-content" }}>
            {strip.map((b, i) => (
              <img
                key={`${b.id}-${i}`}
                src={`/generated/projects/${b.id}/cover.webp`}
                onError={coverError(b)}
                alt=""
                loading="lazy"
                draggable={false}
                style={{
                  width: 150,
                  height: 188, // 4:5
                  objectFit: "cover",
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.09)",
                  flexShrink: 0,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- LAYER 2 — sitemap ---------- */}
      <section
        style={{
          background: "#0B0D0C",
          borderTop: "1px solid rgba(255,255,255,0.09)",
          padding: "clamp(48px,6vw,80px) clamp(24px,5vw,80px)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
            gap: "clamp(32px,4vw,56px)",
          }}
        >
          <SitemapCol title="Explore">
            {FOOTER_EXPLORE.map((l) => (
              <FooterLink key={l.to} to={l.to}>{l.label}</FooterLink>
            ))}
          </SitemapCol>
          <SitemapCol title="Services">
            {FOOTER_SERVICES.map((l) => (
              <FooterLink key={l.to} to={l.to}>{l.label}</FooterLink>
            ))}
          </SitemapCol>
          <SitemapCol title="Work">
            {FOOTER_WORK.map((l) => (
              <FooterLink key={l.to + l.label} to={l.to}>{l.label}</FooterLink>
            ))}
          </SitemapCol>
          <SitemapCol title="Contact">
            <FooterLink to={`mailto:${SITE.email}`} external>{SITE.email}</FooterLink>
            <FooterLink to={SITE.phoneHref} external>{SITE.phone}</FooterLink>
            <span style={{ fontFamily: FONTS.ui, fontSize: 14.5, color: "#AAA39A", lineHeight: 1.6 }}>
              {SITE.location}
            </span>
          </SitemapCol>
        </div>
      </section>

      {/* ---------- LAYER 3 — utility bar ---------- */}
      <section
        style={{
          background: "#0B0D0C",
          borderTop: "1px solid rgba(255,255,255,0.09)",
          padding: "22px clamp(24px,5vw,80px)",
        }}
      >
        <div
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px 28px",
          }}
        >
          <nav
            aria-label="Legal"
            style={{ display: "flex", flexWrap: "wrap", gap: "8px 22px" }}
          >
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="ayes-flink"
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 12.5,
                  color: "#70665A",
                  textDecoration: "none",
                  transition: "color 0.25s ease",
                }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <span style={{ fontFamily: FONTS.ui, fontSize: 12.5, color: "#70665A" }}>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </span>

          <span
            style={{
              fontFamily: FONTS.ui,
              fontSize: 12.5,
              letterSpacing: "0.14em",
              color: "#AAA39A",
            }}
          >
            {SITE.tagline}
          </span>

          <button
            type="button"
            className="ayes-flink"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: 999,
              padding: "8px 18px",
              cursor: "pointer",
              fontFamily: FONTS.ui,
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#D7D1C8",
              transition: "color 0.25s ease, border-color 0.25s ease",
            }}
          >
            Back to top ↑
          </button>
        </div>
      </section>

      <style>{`
        .ayes-strip-track {
          animation: ayes-marquee 40s linear infinite;
        }
        .ayes-strip:hover .ayes-strip-track {
          animation-play-state: paused;
        }
        @keyframes ayes-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ayes-strip-track { animation: none; }
        }
        .ayes-flink-dot {
          display: inline-block;
          width: 0;
          height: 5px;
          border-radius: 999px;
          background: ${GRAD};
          opacity: 0;
          transition: width 0.25s ease, margin-right 0.25s ease, opacity 0.25s ease;
        }
        .ayes-flink:hover, .ayes-flink:focus-visible { color: #FFFFFF !important; }
        .ayes-flink:hover .ayes-flink-dot,
        .ayes-flink:focus-visible .ayes-flink-dot {
          width: 5px;
          margin-right: 9px;
          opacity: 1;
        }
        .ayes-flink:focus-visible,
        footer button:focus-visible {
          outline: 2px solid #D8B75A;
          outline-offset: 3px;
          border-radius: 4px;
        }
      `}</style>
    </footer>
  );
}
