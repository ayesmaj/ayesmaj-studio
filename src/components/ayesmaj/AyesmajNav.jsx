import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LogoMark from "./LogoMark";
import CinematicButton from "./CinematicButton";
import { COLORS, FONTS } from "./theme";

const LINKS = [
  { label: "Work", to: "/Brands" },
  { label: "Services", to: "/Services" },
  { label: "About", to: "/About" },
  { label: "Studio", to: "/System" },
  { label: "Contact", to: "/Contact" },
];

/**
 * AyesmajNav — premium fixed top nav. Transparent over hero, blurs on scroll.
 */
export default function AyesmajNav() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px, 4vw, 48px)",
          background: scrolled ? "rgba(3,3,3,0.72)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? `1px solid ${COLORS.border}` : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          aria-label="AYESMAJ Studios home"
        >
          <LogoMark size={40} />
        </button>

        {/* Center links (desktop) */}
        <nav className="ayes-nav-links" style={{ display: "flex", gap: 38 }}>
          {LINKS.map((l) => (
            <button
              key={l.label}
              onClick={() => navigate(l.to)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: FONTS.ui,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: COLORS.gray,
                transition: "color 0.25s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.white)}
              onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.gray)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Right: CTA + mobile menu */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="ayes-nav-cta">
            <CinematicButton label="Start a Project" accent="#FFB000" onClick={() => navigate("/Contact")} />
          </div>
          <button
            className="ayes-nav-burger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{
              display: "none",
              background: "none",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 999,
              width: 44,
              height: 44,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: COLORS.white,
            }}
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1100,
              background: "rgba(3,3,3,0.96)",
              backdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              padding: "28px clamp(20px,6vw,48px)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <LogoMark size={38} />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                style={{
                  background: "none",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 999,
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: COLORS.white,
                }}
              >
                <X size={18} />
              </button>
            </div>

            <nav style={{ marginTop: 48, display: "flex", flexDirection: "column", gap: 6 }}>
              {LINKS.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i }}
                  onClick={() => { setOpen(false); navigate(l.to); }}
                  style={{
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontFamily: FONTS.display,
                    fontSize: 40,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    color: COLORS.white,
                    padding: "10px 0",
                  }}
                >
                  {l.label}
                </motion.button>
              ))}
            </nav>

            <div style={{ marginTop: "auto" }}>
              <CinematicButton label="Start a Project" accent="#FFB000" size="lg" onClick={() => { setOpen(false); navigate("/Contact"); }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS for nav */}
      <style>{`
        @media (max-width: 900px) {
          .ayes-nav-links { display: none !important; }
          .ayes-nav-cta { display: none !important; }
          .ayes-nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  );
}
