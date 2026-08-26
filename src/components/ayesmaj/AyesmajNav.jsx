import React, { useState, useEffect } from "react";
import { trackPhoneClick } from '@/lib/track';
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  Menu, X, ChevronDown,
  Hexagon, Globe, Sparkles, Box, Clapperboard, PenTool,
  Mail, Phone, MapPin,
} from "lucide-react";
import LogoMark from "./LogoMark";
import CinematicButton from "./CinematicButton";
import { COLORS, FONTS } from "./theme";
import { SITE, NAV, SERVICES_MENU, WORK_MENU, INTERIOR_MENU } from "../../data/siteConfig";

const GRADIENT = "linear-gradient(90deg,#D8B75A 0%,#C88B58 30%,#A45FDB 70%,#7A48FF 100%)";

/* Every navigational control in this file used to be a <button onClick={go(to)}>.
   That rendered a chrome with ZERO real links: crawlers had nothing to follow,
   middle-click/ctrl-click did nothing, and screen readers announced buttons.
   Links now render real <a href> elements; react-router still intercepts plain
   left-clicks for SPA navigation and lets modified clicks reach the browser.
   MotionLink keeps the drawer's staggered entrance on a real anchor. */
const MotionLink = motion(Link);
const SERVICE_ICONS = [Hexagon, Globe, Sparkles, Box, Clapperboard, PenTool];

// Which top-level NAV item is active for the current pathname
const SERVICES_RE = /^\/(?:Services|services(?:\/|$)|ServiceBranding|ServiceAnimation|AiMarketing|Storyboards|System)/;
function isActive(item, pathname) {
  if (item.label === "Services") return SERVICES_RE.test(pathname);
  if (item.label === "Work") return /^\/(Work|Branding|BrandDetail|Brands|WebExperiences|AiPosts|AiVideos|Worlds3D|Animations|Reel)/.test(pathname);
  return pathname === item.to || pathname.startsWith(item.to + "/");
}

const panelStyle = {
  position: "absolute",
  top: "calc(100% + 16px)",
  left: "50%",
  background: "rgba(8,9,8,0.92)",
  border: "1px solid rgba(255,255,255,0.09)",
  backdropFilter: "blur(18px)",
  WebkitBackdropFilter: "blur(18px)",
  borderRadius: 24,
  boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
  overflow: "hidden",
};

/**
 * AyesmajNav — premium fixed top nav.
 * Transparent over hero → dark glass on scroll. Services mega menu,
 * Work dropdown, active-route gradient underline, full-screen mobile drawer.
 */
export default function AyesmajNav() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // "services" | "work" | "interior" | null
  const [interiorPreview, setInteriorPreview] = useState(null); // hovered item in the Interior Design mega menu
  const [drawer, setDrawer] = useState(false);

  const [lightGround, setLightGround] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Does the page paint something light directly under the unscrolled nav?
     The bar is transparent until you scroll, so the page's own top 80px is what
     the links sit on. Five page families each patched this by hand with an
     !important override, and the five that forgot - /Services, /AiMarketing,
     /Worlds3D, /AiVideos, /Branding - rendered every nav item at ~1:1 contrast.
     Measuring the ground retires the opt-in: a page cannot forget to declare
     itself, and a page added later inherits the right behaviour for free.

     Deliberately conservative. It only reacts to an *opaque* background-colour
     it can actually read; a hero image or video leaves the bar transparent, as
     today. Every confirmed failure was a flat CSS colour, and staying put on
     media means this can darken a cinematic hero it misread. */
  useEffect(() => {
    if (typeof document === "undefined" || !document.elementsFromPoint) return undefined;

    const channel = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
    const luminance = (r, g, b) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    // The dimmer of the two link colours, #AAA39A. If that clears 4.5:1 the
    // brighter active item does too, so it is the only one worth testing.
    const LINK_LUMINANCE = luminance(170, 163, 154);

    const measure = () => {
      const nav = document.querySelector(".ayes-nav-root");
      let worst = Infinity;
      for (const frac of [0.2, 0.5, 0.8]) {
        const stack = document.elementsFromPoint(Math.round(window.innerWidth * frac), 40);
        for (const el of stack) {
          if (nav && (el === nav || nav.contains(el))) continue;
          const cs = getComputedStyle(el);
          if (cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.9) continue;
          const parts = (cs.backgroundColor.match(/[\d.]+/g) || []).map(Number);
          if (parts.length < 3) continue;
          const alpha = parts[3] === undefined ? 1 : parts[3];
          if (alpha < 0.9) continue; // translucent: whatever is under it still shows
          const bg = luminance(parts[0], parts[1], parts[2]);
          const [hi, lo] = [LINK_LUMINANCE, bg].sort((a, b) => b - a);
          worst = Math.min(worst, (hi + 0.05) / (lo + 0.05));
          break; // first opaque layer is the one that gets painted
        }
      }
      setLightGround(worst < 4.5);
    };

    /* One sample is not enough: every page is a lazy route chunk, so on a cold
       direct load the nav mounts before the hero paints - /Services and
       /AiVideos both did exactly that and stayed transparent over cream.

       Poll for a bounded window rather than debouncing a MutationObserver. The
       observer was tried first and never fired: this tree mutates continuously
       (framer-motion mounting and unmounting nodes), so every mutation reset the
       debounce and it was starved indefinitely. A fixed poll cannot be starved,
       and 20 hit-tests spread over 4s costs nothing. Re-measuring is idempotent -
       an unchanged boolean makes React bail out. */
    const raf = requestAnimationFrame(measure);
    const poll = setInterval(measure, 120);
    const stopPolling = setTimeout(() => clearInterval(poll), 4000);

    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(poll);
      clearTimeout(stopPolling);
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

  // Escape closes any open menu / the drawer
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setOpenMenu(null); setDrawer(false); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawer]);

  const closeMenus = () => { setOpenMenu(null); setDrawer(false); };

  /* Two reasons to paint a surface, and they need different strengths. Scrolled
     over a dark page, 0.72 is enough and keeps the glassy look. Over a cream
     page 0.72 only reaches 3.6:1 - which is why every hand-written override on
     this site uses 0.95. Measured: 0.95 over #F7F3ED gives 7.6:1. */
  const solid = scrolled || lightGround;
  const surface = lightGround ? "rgba(8,9,8,0.95)" : "rgba(5,5,5,0.72)";

  const linkStyle = (active) => ({
    position: "relative",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 2px",
    fontFamily: FONTS.ui,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    textDecoration: "none",
    color: active ? "#F6F3ED" : "#AAA39A",
    transition: "color 0.25s ease",
  });

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        className="ayes-nav-root"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: 80,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 clamp(20px, 4vw, 48px)",
          /* `solid` covers both reasons the bar needs a surface: the reader has
             scrolled, or the page under it is too light to read light type on. */
          background: solid ? surface : "transparent",
          backdropFilter: solid ? "blur(18px)" : "none",
          WebkitBackdropFilter: solid ? "blur(18px)" : "none",
          borderBottom: solid ? "1px solid rgba(255,255,255,0.09)" : "1px solid transparent",
          transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenus}
          aria-label="AYESMAJ Studios home"
          style={{ display: "inline-flex", textDecoration: "none", padding: 0 }}
        >
          <LogoMark size={40} />
        </Link>

        {/* Center links (desktop) */}
        <nav className="ayes-nav-links" aria-label="Primary" style={{ display: "flex", gap: 34, alignItems: "center" }}>
          {NAV.map((item) => {
            const active = isActive(item, pathname);
            const menuKey = item.mega === "services" ? "services" : item.mega === "interior" ? "interior" : item.label === "Work" ? "work" : null;
            const trigger = (
              <Link
                to={item.to}
                onClick={closeMenus}
                onFocus={menuKey ? () => setOpenMenu(menuKey) : undefined}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#F6F3ED"; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "#AAA39A"; }}
                aria-haspopup={menuKey ? "true" : undefined}
                aria-expanded={menuKey ? openMenu === menuKey : undefined}
                style={linkStyle(active)}
              >
                {item.label}
                {menuKey && (
                  <ChevronDown
                    size={12}
                    aria-hidden
                    style={{
                      transition: "transform 0.25s ease",
                      transform: openMenu === menuKey ? "rotate(180deg)" : "none",
                    }}
                  />
                )}
                {active && (
                  <motion.span
                    layoutId="ayes-nav-underline"
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: 2, right: 2, bottom: 0,
                      height: 2, borderRadius: 2,
                      background: GRADIENT,
                    }}
                  />
                )}
              </Link>
            );

            if (!menuKey) return <React.Fragment key={item.label}>{trigger}</React.Fragment>;

            return (
              <div
                key={item.label}
                style={{ position: "relative" }}
                onMouseEnter={() => setOpenMenu(menuKey)}
                onMouseLeave={() => setOpenMenu((m) => (m === menuKey ? null : m))}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setOpenMenu((m) => (m === menuKey ? null : m));
                  }
                }}
              >
                {trigger}

                {/* SERVICES mega menu */}
                <AnimatePresence>
                  {menuKey === "services" && openMenu === "services" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: 8, x: "-50%" }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      role="menu"
                      aria-label="Services"
                      style={{
                        ...panelStyle,
                        width: "min(620px, 92vw)",
                        padding: 14,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 4,
                      }}
                    >
                      {SERVICES_MENU.map((s, i) => {
                        const Icon = SERVICE_ICONS[i] || Hexagon;
                        return (
                          <Link
                            key={s.to}
                            to={s.to}
                            role="menuitem"
                            className="ayes-mega-item"
                            onClick={closeMenus}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 14,
                              textAlign: "left",
                              textDecoration: "none",
                              padding: "14px 16px",
                              borderRadius: 14,
                              transition: "background 0.25s ease, transform 0.25s ease",
                            }}
                          >
                            <span
                              aria-hidden
                              style={{
                                flexShrink: 0,
                                width: 36, height: 36,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 10,
                                border: "1px solid rgba(255,255,255,0.09)",
                                background: "rgba(255,255,255,0.035)",
                                color: "#D8B75A",
                              }}
                            >
                              <Icon size={16} />
                            </span>
                            <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                              <span style={{ fontFamily: FONTS.ui, fontSize: 13.5, fontWeight: 600, color: "#F6F3ED", letterSpacing: "0.02em" }}>
                                {s.label}
                              </span>
                              <span style={{ fontFamily: FONTS.ui, fontSize: 12, fontWeight: 400, color: "#AAA39A", lineHeight: 1.45 }}>
                                {s.line}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* INTERIOR DESIGN mega menu (owner IA 2026-08-22) */}
                <AnimatePresence>
                  {menuKey === "interior" && openMenu === "interior" && (() => {
                    const all = [INTERIOR_MENU.overview, ...INTERIOR_MENU.groups.flatMap((g) => g.items)];
                    const current = interiorPreview || all.find((i) => pathname.startsWith(i.to) && i.to !== "/interior-design") || INTERIOR_MENU.overview;
                    const itemBtn = (it) => (
                      <Link
                        key={it.to}
                        to={it.to}
                        role="menuitem"
                        className="ayes-mega-item"
                        onClick={closeMenus}
                        onMouseEnter={() => setInteriorPreview(it)}
                        onFocus={() => setInteriorPreview(it)}
                        style={{ display: "flex", flexDirection: "column", gap: 3, textAlign: "left", textDecoration: "none", padding: "10px 14px", borderRadius: 12, transition: "background 0.25s ease, transform 0.25s ease", width: "100%" }}
                      >
                        <span style={{ fontFamily: FONTS.display, fontSize: 19, letterSpacing: "0.04em", textTransform: "uppercase", color: current.to === it.to ? "#D8B75A" : "#F6F3ED", lineHeight: 1 }}>{it.label}</span>
                        <span style={{ fontFamily: FONTS.ui, fontSize: 12, color: "#AAA39A", lineHeight: 1.4 }}>{it.line}</span>
                      </Link>
                    );
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 10, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 8, x: "-50%" }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        role="menu"
                        aria-label="Interior Design"
                        onMouseLeave={() => setInteriorPreview(null)}
                        style={{ ...panelStyle, width: "min(860px, 94vw)", padding: 14, display: "grid", gridTemplateColumns: "1fr 1fr 1.35fr", gap: 6, border: "1px solid rgba(216,183,90,0.28)", boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 18px 40px -10px rgba(122,72,255,0.35)" }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                          <div style={{ fontFamily: FONTS.ui, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#70665A", padding: "8px 14px 6px" }}>Overview</div>
                          {itemBtn(INTERIOR_MENU.overview)}
                          <div style={{ fontFamily: FONTS.ui, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#70665A", padding: "14px 14px 6px" }}>{INTERIOR_MENU.groups[0].title}</div>
                          {INTERIOR_MENU.groups[0].items.map(itemBtn)}
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2, borderLeft: "1px solid rgba(255,255,255,0.07)" }}>
                          <div style={{ fontFamily: FONTS.ui, fontSize: 10.5, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#70665A", padding: "8px 14px 6px" }}>{INTERIOR_MENU.groups[1].title}</div>
                          {INTERIOR_MENU.groups[1].items.map(itemBtn)}
                        </div>
                        <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", minHeight: 250, background: "#0b0b0d", border: "1px solid rgba(255,255,255,0.07)" }} aria-hidden>
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={current.preview}
                              src={current.preview}
                              alt=""
                              initial={{ opacity: 0, scale: 1.03 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                            />
                          </AnimatePresence>
                          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,5,7,0) 45%, rgba(5,5,7,0.82) 100%)" }} />
                          <div style={{ position: "absolute", left: 14, right: 14, bottom: 12, display: "grid", gap: 4 }}>
                            <span style={{ fontFamily: FONTS.ui, fontSize: 10.5, letterSpacing: "0.3em", textTransform: "uppercase", color: "#D8B75A" }}>Interior Design</span>
                            <span style={{ fontFamily: FONTS.display, fontSize: 22, textTransform: "uppercase", color: "#F6F3ED", lineHeight: 1 }}>{current.label}</span>
                          </div>
                          <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 1, background: GRADIENT, opacity: 0.8 }} />
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>

                {/* WORK dropdown */}
                <AnimatePresence>
                  {menuKey === "work" && openMenu === "work" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, x: "-50%" }}
                      animate={{ opacity: 1, y: 0, x: "-50%" }}
                      exit={{ opacity: 0, y: 8, x: "-50%" }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      role="menu"
                      aria-label="Work"
                      style={{ ...panelStyle, width: 230, padding: 10, borderRadius: 20 }}
                    >
                      {WORK_MENU.map((w) => (
                        <Link
                          key={w.to}
                          to={w.to}
                          role="menuitem"
                          className="ayes-mega-item"
                          onClick={closeMenus}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            textDecoration: "none",
                            padding: "11px 14px",
                            borderRadius: 12,
                            fontFamily: FONTS.ui,
                            fontSize: 13,
                            fontWeight: 500,
                            color: "#D7D1C8",
                            transition: "background 0.25s ease, color 0.25s ease",
                          }}
                        >
                          {w.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Right: CTA (desktop) + burger (mobile) */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="ayes-nav-cta">
            <CinematicButton label="Start a Project" accent="#D8B75A" to="/Contact" onClick={closeMenus} />
          </div>
          <button
            className="ayes-nav-burger"
            onClick={() => setDrawer(true)}
            aria-label="Open menu"
            aria-expanded={drawer}
            style={{
              display: "none",
              background: "none",
              border: `1px solid ${COLORS.border}`,
              borderRadius: 999,
              width: 46, height: 46,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#F6F3ED",
            }}
          >
            <Menu size={19} />
          </button>
        </div>
      </motion.header>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1100,
              background: "rgba(5,5,5,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
              padding: "22px clamp(20px,6vw,48px) 40px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Link
                to="/"
                onClick={closeMenus}
                aria-label="AYESMAJ Studios home"
                style={{ display: "inline-flex", textDecoration: "none", padding: 0 }}
              >
                <LogoMark size={36} />
              </Link>
              <button
                onClick={() => setDrawer(false)}
                aria-label="Close menu"
                style={{
                  background: "none",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 999,
                  width: 46, height: 46,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#F6F3ED",
                }}
              >
                <X size={19} />
              </button>
            </div>

            {/* Big NAV links */}
            <nav aria-label="Primary mobile" style={{ marginTop: 40, display: "flex", flexDirection: "column" }}>
              {NAV.map((item, i) => {
                const active = isActive(item, pathname);
                return (
                  <MotionLink
                    key={item.label}
                    to={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.4 }}
                    onClick={closeMenus}
                    style={{
                      display: "block",
                      textAlign: "left",
                      textDecoration: "none",
                      fontFamily: FONTS.display,
                      fontSize: "clamp(34px, 9vw, 52px)",
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      color: active ? "transparent" : "#F6F3ED",
                      background: active ? GRADIENT : "none",
                      WebkitBackgroundClip: active ? "text" : undefined,
                      backgroundClip: active ? "text" : undefined,
                      padding: "12px 0",
                      minHeight: 56,
                    }}
                  >
                    {item.label}
                  </MotionLink>
                );
              })}
            </nav>

            {/* Services group */}
            <div style={{ marginTop: 36 }}>
              <div style={{ fontFamily: FONTS.ui, fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#70665A", marginBottom: 10 }}>
                Services
              </div>
              {SERVICES_MENU.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  onClick={closeMenus}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    textDecoration: "none",
                    fontFamily: FONTS.ui,
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#D7D1C8",
                    padding: "13px 0",
                    minHeight: 48,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {s.label}
                </Link>
              ))}
            </div>

            {/* Interior Design group */}
            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: FONTS.ui, fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#70665A", marginBottom: 10 }}>
                Interior Design
              </div>
              {[INTERIOR_MENU.overview, ...INTERIOR_MENU.groups.flatMap((g) => g.items)].map((it) => (
                <Link
                  key={it.to}
                  to={it.to}
                  onClick={closeMenus}
                  style={{ display: "block", width: "100%", textAlign: "left", textDecoration: "none", fontFamily: FONTS.ui, fontSize: 16, fontWeight: 500, color: pathname === it.to ? "#D8B75A" : "#D7D1C8", padding: "13px 0", minHeight: 48, borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  {it.label}
                </Link>
              ))}
            </div>

            {/* Work group */}
            <div style={{ marginTop: 32 }}>
              <div style={{ fontFamily: FONTS.ui, fontSize: 11, fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#70665A", marginBottom: 10 }}>
                Work
              </div>
              {WORK_MENU.map((w) => (
                <Link
                  key={w.to}
                  to={w.to}
                  onClick={closeMenus}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    textDecoration: "none",
                    fontFamily: FONTS.ui,
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#D7D1C8",
                    padding: "13px 0",
                    minHeight: 48,
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {w.label}
                </Link>
              ))}
            </div>

            {/* Contact block */}
            <div style={{ marginTop: 36, display: "flex", flexDirection: "column", gap: 4 }}>
              <a
                href={`mailto:${SITE.email}`}
                style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: FONTS.ui, fontSize: 15, color: "#AAA39A", textDecoration: "none", padding: "12px 0", minHeight: 48 }}
              >
                <Mail size={16} aria-hidden style={{ color: "#D8B75A" }} /> {SITE.email}
              </a>
              <a
                href={SITE.phoneHref}
                onClick={() => trackPhoneClick("nav")}
                style={{ display: "inline-flex", alignItems: "center", gap: 12, fontFamily: FONTS.ui, fontSize: 15, color: "#AAA39A", textDecoration: "none", padding: "12px 0", minHeight: 48 }}
              >
                <Phone size={16} aria-hidden style={{ color: "#D8B75A" }} /> {SITE.phone}
              </a>
              <Link
                to="/Contact"
                onClick={closeMenus}
                style={{ display: "inline-flex", alignItems: "center", gap: 12, textDecoration: "none", textAlign: "left", fontFamily: FONTS.ui, fontSize: 15, color: "#AAA39A", padding: "12px 0", minHeight: 48 }}
              >
                <MapPin size={16} aria-hidden style={{ color: "#D8B75A" }} /> {SITE.location}
              </Link>
            </div>

            <div style={{ marginTop: 28 }}>
              <CinematicButton
                label="Start a Project"
                accent="#D8B75A"
                size="lg"
                to="/Contact"
                onClick={closeMenus}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive + hover/focus CSS */}
      <style>{`
        @media (max-width: 1023px) {
          .ayes-nav-links { display: none !important; }
          .ayes-nav-cta { display: none !important; }
          .ayes-nav-burger { display: flex !important; }
        }
        .ayes-mega-item { position: relative; }
        .ayes-mega-item::before {
          content: '';
          position: absolute;
          left: 0; top: 10px; bottom: 10px;
          width: 2px; border-radius: 2px;
          background: linear-gradient(180deg,#D8B75A 0%,#C88B58 30%,#A45FDB 70%,#7A48FF 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }
        .ayes-mega-item:hover, .ayes-mega-item:focus-visible {
          background: rgba(255,255,255,0.05) !important;
          transform: translateX(2px);
        }
        .ayes-mega-item:hover::before, .ayes-mega-item:focus-visible::before { opacity: 1; }
        .ayes-nav-root button:focus-visible,
        .ayes-nav-root a:focus-visible,
        [role="dialog"] button:focus-visible,
        [role="dialog"] a:focus-visible {
          outline: 2px solid #D8B75A;
          outline-offset: 3px;
          border-radius: 6px;
        }
        @media (prefers-reduced-motion: reduce) {
          .ayes-mega-item, .ayes-nav-root * { transition: none !important; }
        }
      `}</style>
    </MotionConfig>
  );
}
