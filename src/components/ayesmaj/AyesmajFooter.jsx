import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CinematicButton from "./CinematicButton";
import LogoMark from "./LogoMark";
import { useIsMobile } from "@/hooks/use-mobile";
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Clock, ChevronDown } from "lucide-react";
import { FONTS } from "./theme";
import {
  SITE,
  FOOTER_BLURB,
  FOOTER_EXPLORE,
  FOOTER_SERVICES,
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

/* ── Global utility footer helpers ─────────────────────────────────────── */

const BehanceIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9.6 11.2c.9-.4 1.5-1.2 1.5-2.3 0-2.2-1.6-2.9-3.6-2.9H2v12h5.7c2.2 0 4.1-1 4.1-3.5 0-1.6-.8-2.8-2.2-3.3ZM4.6 8h2.6c1 0 1.7.4 1.7 1.4s-.7 1.4-1.7 1.4H4.6V8Zm2.9 8H4.6v-3.3h2.9c1.2 0 2 .5 2 1.7s-.8 1.6-2 1.6ZM22 13.6c0-2.8-1.6-4.8-4.5-4.8-2.8 0-4.7 2.1-4.7 4.8 0 2.8 1.8 4.8 4.7 4.8 2.2 0 3.7-1 4.3-3h-2.3c-.3.7-1 1.1-2 1.1-1.4 0-2.2-.8-2.3-2.2H22v-.7Zm-6.8-1c.2-1.2 1-1.9 2.2-1.9 1.3 0 2 .8 2.1 1.9h-4.3ZM14.3 6.5h5.4v1.3h-5.4V6.5Z" />
  </svg>
);

const SOCIALS = [
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "behance", label: "Behance", Icon: BehanceIcon },
  { key: "youtube", label: "YouTube", Icon: Youtube },
];

const ULINK = {
  fontFamily: FONTS.ui,
  fontSize: 14.5,
  lineHeight: 1.4,
  textDecoration: "none",
  display: "inline-block",
  width: "fit-content",
};

function ULink({ to, children }) {
  return <Link to={to} className="ayes-ulink" style={ULINK}>{children}</Link>;
}

function ColTitle({ children }) {
  return (
    <h3
      style={{
        fontFamily: FONTS.ui,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: GOLD,
        margin: "0 0 22px",
      }}
    >
      {children}
    </h3>
  );
}

/* Desktop: plain column. Mobile: native <details> accordion (keyboard + screen-reader accessible for free). */
function FootCol({ title, mobile, children }) {
  if (!mobile) {
    return (
      <div className="ayes-ufoot-col">
        <ColTitle>{title}</ColTitle>
        <div className="ayes-ufoot-links">{children}</div>
      </div>
    );
  }
  return (
    <details className="ayes-ufoot-acc">
      <summary className="ayes-ufoot-sum">
        <h3
          style={{
            fontFamily: FONTS.ui,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: GOLD,
            margin: 0,
          }}
        >
          {title}
        </h3>
        <ChevronDown size={16} aria-hidden="true" className="ayes-ufoot-chev" />
      </summary>
      <div className="ayes-ufoot-links" style={{ paddingBottom: 18 }}>{children}</div>
    </details>
  );
}

/* Phoenix never observes DST, so a plain IANA zone is exact. */
function usePhoenixTime() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(id);
  }, []);
  const time = new Intl.DateTimeFormat("en-US", { timeZone: "America/Phoenix", hour: "numeric", minute: "2-digit" }).format(now);
  const date = new Intl.DateTimeFormat("en-US", { timeZone: "America/Phoenix", month: "short", day: "numeric", year: "numeric" }).format(now);
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: "America/Phoenix", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(now).map((x) => [x.type, x.value])
  );
  const iso = `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}-07:00`;
  return { time, date, iso };
}

const SELECTED_WORK = BRANDS.slice(0, 4); // curated portfolio order, real projects only

export default function AyesmajFooter() {
  const navigate = useNavigate();
  const strip = [...BRANDS, ...BRANDS]; // duplicated for seamless loop
  const mobile = useIsMobile();
  const phx = usePhoenixTime();
  const email = SITE.brandedEmail || SITE.email;
  // Only profiles with a URL in SITE.social render — never a dead or invented link.
  const socials = SOCIALS.map((s) => ({ ...s, href: (SITE.social && SITE.social[s.key]) || "" })).filter((s) => s.href);

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

      {/* ---------- GLOBAL UTILITY FOOTER — quieter than the pre-footer above ---------- */}
      <section className="ayes-ufoot" aria-label="Site information">

        <div className="ayes-ufoot-inner">
          <div className={`ayes-ufoot-grid${mobile ? " is-mobile" : ""}`}>
            {/* 1 — BRAND */}
            <div className="ayes-ufoot-brand">
              <Link to="/" className="ayes-ulogo" aria-label="AYESMAJ Studios — home" style={{ display: "inline-block", textDecoration: "none" }}>
                <LogoMark size={34} />
              </Link>
              <p
                style={{
                  fontFamily: FONTS.ui,
                  fontSize: 14.5,
                  lineHeight: 1.7,
                  color: "#B3ACA2",
                  maxWidth: 300,
                  margin: "22px 0 26px",
                }}
              >
                {FOOTER_BLURB}
              </p>
              {socials.length ? (
                <nav className="ayes-ufoot-social" aria-label="Social profiles">
                  {socials.map(({ key, label, Icon, href }) => (
                    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className="ayes-usoc" aria-label={label} title={label}>
                      <Icon size={18} aria-hidden="true" />
                    </a>
                  ))}
                </nav>
              ) : null}
            </div>

            {/* 5 — CONTACT (second on mobile, last on desktop via CSS order) */}
            <div className="ayes-ufoot-col ayes-ufoot-contact">
              <ColTitle>Contact</ColTitle>
              <div className="ayes-ufoot-links" style={{ gap: 16 }}>
                <a href={`mailto:${email}`} className="ayes-umail" style={{ ...ULINK, color: IVORY, display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <Mail size={15} aria-hidden="true" style={{ color: GOLD, flexShrink: 0 }} />
                  <span className="ayes-umail-text">{email}</span>
                </a>
                <a href={SITE.phoneHref} className="ayes-ulink" style={{ ...ULINK, display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <Phone size={15} aria-hidden="true" style={{ color: GOLD, flexShrink: 0 }} />
                  {SITE.phone}
                </a>
                <div style={{ ...ULINK, color: "#B3ACA2", display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <MapPin size={15} aria-hidden="true" style={{ color: GOLD, flexShrink: 0, marginTop: 3 }} />
                  <span>Phoenix, Arizona<br />Working worldwide</span>
                </div>
                <div className="ayes-ufoot-time" style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Clock size={15} aria-hidden="true" style={{ color: GOLD, flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontFamily: FONTS.ui, fontSize: 10.5, letterSpacing: "0.26em", textTransform: "uppercase", color: "#8A8277" }}>
                      PHX local time
                    </div>
                    <div style={{ fontFamily: FONTS.ui, fontSize: 14.5, color: "#B3ACA2", fontVariantNumeric: "tabular-nums", marginTop: 4 }}>
                      <time dateTime={phx.iso}>{phx.time}</time>
                      <span style={{ display: "block", fontSize: 12.5, color: "#8A8277", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 2 }}>{phx.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2 — EXPLORE */}
            <FootCol title="Explore" mobile={mobile}>
              {FOOTER_EXPLORE.map((l) => (
                <ULink key={l.to} to={l.to}>{l.label}</ULink>
              ))}
            </FootCol>

            {/* 3 — SERVICES */}
            <FootCol title="Services" mobile={mobile}>
              {FOOTER_SERVICES.map((l) => (
                <ULink key={l.to} to={l.to}>{l.label}</ULink>
              ))}
            </FootCol>

            {/* 4 — SELECTED WORK (real projects from the portfolio data) */}
            <FootCol title="Selected Work" mobile={mobile}>
              {SELECTED_WORK.map((b) => (
                <Link key={b.id} to={`/BrandDetail?slug=${b.id}`} className="ayes-uwork" aria-label={`${b.name} — ${b.category}`}>
                  <img
                    src={getBrandAssetPath(b, b.featured)}
                    alt=""
                    width={56}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => { e.currentTarget.style.visibility = "hidden"; }}
                  />
                  <span>
                    <span className="ayes-uwork-name">{b.name}</span>
                    <span className="ayes-uwork-cat">{b.category}</span>
                  </span>
                </Link>
              ))}
            </FootCol>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="ayes-ufoot-bar">
          <div className="ayes-ufoot-bar-inner">
            <nav aria-label="Legal" className="ayes-ufoot-legal">
              {LEGAL_LINKS.map((l) => (
                <Link key={l.to} to={l.to} className="ayes-ulink ayes-ulink--sm">{l.label}</Link>
              ))}
            </nav>
            <span className="ayes-ufoot-copy">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
            <span className="ayes-ufoot-tag">{SITE.tagline}</span>
          </div>
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

        /* ── utility footer ground ─────────────────────────────── */
        .ayes-ufoot {
          position: relative; isolation: isolate; color: #B3ACA2; overflow: hidden;
          background-color: #070708;
          background-image: url('/assets/ayesmaj/footer/web/footer-bg.webp');
          background-image: image-set(url('/assets/ayesmaj/footer/web/footer-bg.avif') type('image/avif'), url('/assets/ayesmaj/footer/web/footer-bg.webp') type('image/webp'));
          background-size: cover; background-position: center; background-repeat: no-repeat;
        }
        .ayes-ufoot::before { /* thin gold → purple divider */
          content: ''; position: absolute; left: 0; right: 0; top: 0; height: 1px; z-index: 3;
          background: ${GRAD}; opacity: .85;
        }
        .ayes-ufoot-inner { position: relative; z-index: 1; max-width: 1320px; margin: 0 auto; padding: clamp(64px, 7vw, 104px) clamp(24px, 5vw, 80px) clamp(48px, 5vw, 72px); }

        /* ── five columns with soft vertical separators ────────── */
        .ayes-ufoot-grid { display: grid; grid-template-columns: 1.45fr 0.8fr 1.15fr 1.3fr 1.1fr; gap: clamp(28px, 3.2vw, 48px); }
        .ayes-ufoot-col { padding-left: clamp(20px, 2.4vw, 32px); border-left: 1px solid rgba(255,255,255,.065); }
        .ayes-ufoot-contact { order: 5; }
        .ayes-ufoot-links { display: flex; flex-direction: column; gap: 13px; }
        .ayes-ufoot-brand { padding-right: clamp(8px, 2vw, 24px); }
        .ayes-ufoot-social { display: flex; gap: 10px; }
        .ayes-usoc {
          display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 999px;
          color: #B3ACA2; border: 1px solid rgba(255,255,255,.09); background: rgba(255,255,255,.02);
          transition: color .2s ease, border-color .2s ease, transform .2s ease;
        }
        .ayes-usoc:hover, .ayes-usoc:focus-visible { color: ${IVORY}; border-color: rgba(216,183,90,.55); transform: translateY(-2px); }

        /* ── links: slide 4px right + gold→purple hairline ─────── */
        .ayes-ulink { position: relative; color: #B3ACA2; cursor: pointer; transition: color .2s ease, transform .2s ease; }
        .ayes-ulink::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -3px; height: 1px; background: ${GRAD};
          transform: scaleX(0); transform-origin: left; transition: transform .2s ease;
        }
        .ayes-ulink:hover, .ayes-ulink:focus-visible { color: ${IVORY}; transform: translateX(4px); }
        .ayes-ulink:hover::after, .ayes-ulink:focus-visible::after { transform: scaleX(1); }
        .ayes-ulink--sm { display: inline-block; font-family: ${FONTS.ui}; font-size: 12.5px; color: #8A8277; text-decoration: none; }

        /* ── email: ivory → gradient text ───────────────────────── */
        .ayes-umail { transition: color .2s ease; }
        .ayes-umail-text { background-image: ${GRAD}; -webkit-background-clip: text; background-clip: text; color: ${IVORY}; transition: color .2s ease; }
        .ayes-umail:hover .ayes-umail-text, .ayes-umail:focus-visible .ayes-umail-text { color: transparent; }

        /* ── selected work rows ─────────────────────────────────── */
        .ayes-uwork { display: flex; align-items: center; gap: 12px; text-decoration: none; color: #B3ACA2; width: fit-content; }
        .ayes-uwork img { width: 56px; height: 40px; object-fit: cover; border-radius: 6px; border: 1px solid rgba(255,255,255,.08); filter: brightness(.82); transition: filter .2s ease, border-color .2s ease; flex-shrink: 0; background: #111; }
        .ayes-uwork:hover img, .ayes-uwork:focus-visible img { filter: brightness(1.04); border-color: rgba(216,183,90,.45); }
        .ayes-uwork > span { display: flex; flex-direction: column; gap: 2px; }
        .ayes-uwork-name { font-family: ${FONTS.ui}; font-size: 14px; font-weight: 600; color: ${IVORY}; letter-spacing: .02em; transition: color .2s ease; }
        .ayes-uwork-cat { font-family: ${FONTS.ui}; font-size: 12px; color: #8A8277; }
        .ayes-uwork:hover .ayes-uwork-name { color: ${GOLD}; }

        /* ── bottom bar ─────────────────────────────────────────── */
        .ayes-ufoot-bar { position: relative; z-index: 1; border-top: 1px solid rgba(255,255,255,.07); }
        .ayes-ufoot-bar-inner { max-width: 1320px; margin: 0 auto; padding: 22px clamp(24px, 5vw, 80px); display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 14px 28px; }
        .ayes-ufoot-legal { display: flex; flex-wrap: wrap; gap: 8px 22px; }
        .ayes-ufoot-copy { font-family: ${FONTS.ui}; font-size: 12.5px; color: #8A8277; text-align: center; white-space: nowrap; }
        .ayes-ufoot-tag { font-family: ${FONTS.ui}; font-size: 12px; letter-spacing: .2em; color: #B3ACA2; text-align: right; }

        /* ── mobile: brand + contact first, then accordions ─────── */
        .ayes-ufoot-grid.is-mobile { grid-template-columns: 1fr; gap: 0; }
        .ayes-ufoot-grid.is-mobile .ayes-ufoot-brand { padding: 0 0 34px; }
        .ayes-ufoot-grid.is-mobile .ayes-ufoot-col { border-left: 0; padding-left: 0; }
        .ayes-ufoot-grid.is-mobile .ayes-ufoot-contact { order: 0; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,.07); margin-bottom: 6px; }
        .ayes-ufoot-acc { border-bottom: 1px solid rgba(255,255,255,.07); }
        .ayes-ufoot-sum { display: flex; align-items: center; justify-content: space-between; gap: 12px; min-height: 56px; padding: 4px 0; cursor: pointer; list-style: none; }
        .ayes-ufoot-sum::-webkit-details-marker { display: none; }
        .ayes-ufoot-chev { color: ${GOLD}; transition: transform .2s ease; }
        .ayes-ufoot-acc[open] .ayes-ufoot-chev { transform: rotate(180deg); }
        .ayes-ufoot-sum:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; border-radius: 4px; }
        @media (max-width: 767px) {
          /* CSS holds the single-column stack before React swaps in the accordions */
          .ayes-ufoot-grid { grid-template-columns: 1fr; gap: 0; }
          .ayes-ufoot-brand { padding: 0 0 34px; }
          .ayes-ufoot-col { border-left: 0; padding-left: 0; }
          .ayes-ufoot-contact { order: 0; padding-bottom: 30px; border-bottom: 1px solid rgba(255,255,255,.07); margin-bottom: 6px; }
          .ayes-ufoot-col:not(.ayes-ufoot-contact) { padding: 18px 0; border-bottom: 1px solid rgba(255,255,255,.07); }
          .ayes-ufoot-links { gap: 0; }
          .ayes-ulink, .ayes-uwork { display: flex; align-items: center; min-height: 44px; }
          .ayes-ulink--sm { padding: 12px 0; min-height: 44px; }
          .ayes-ufoot-legal { gap: 0 22px; }
          .ayes-ufoot-bar-inner { grid-template-columns: 1fr; text-align: left; }
          .ayes-ufoot-copy, .ayes-ufoot-tag { text-align: left; white-space: normal; }
          .ayes-ufoot { background-image: url('/assets/ayesmaj/footer/web/footer-bg-1080.webp'); background-position: 68% center; }
        }
        @media (min-width: 768px) and (max-width: 1100px) {
          .ayes-ufoot-grid { grid-template-columns: 1fr 1fr 1fr; }
          .ayes-ufoot-brand { grid-column: 1 / -1; padding-bottom: 8px; }
          .ayes-ufoot-col { border-left: 0; padding-left: 0; }
        }

        .ayes-ulink:focus-visible, .ayes-usoc:focus-visible, .ayes-uwork:focus-visible, .ayes-umail:focus-visible, .ayes-ulogo:focus-visible {
          outline: 2px solid ${GOLD}; outline-offset: 3px; border-radius: 4px;
        }
        @media (prefers-reduced-motion: reduce) {
          .ayes-ulink, .ayes-ulink::after, .ayes-usoc, .ayes-uwork img, .ayes-umail, .ayes-umail-text, .ayes-ufoot-chev, .ayes-ufoot-sum, .ayes-uwork-name { transition: none; }
          .ayes-ulink:hover, .ayes-ulink:focus-visible, .ayes-usoc:hover, .ayes-usoc:focus-visible { transform: none; }
        }
      `}</style>
    </footer>
  );
}
