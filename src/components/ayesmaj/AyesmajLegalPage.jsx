import React, { Children, isValidElement, useEffect } from "react";
import { motion, MotionConfig } from "framer-motion";
import { ArrowDown, ArrowRight, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import AyesmajNav from "./AyesmajNav";
import AyesmajFooter from "./AyesmajFooter";
import { FONTS } from "./theme";
import { SITE } from "@/data/siteConfig";
import "./AyesmajLegalPage.css";

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
};

export function LegalSection({ id, index, title, children }) {
  return (
    <motion.section id={id} className="ayz-policy-section" {...reveal}>
      <div className="ayz-policy-section__number" aria-hidden="true">
        {String(index).padStart(2, "0")}
      </div>
      <div className="ayz-policy-section__body">
        <h2>{title}</h2>
        {children}
      </div>
    </motion.section>
  );
}

export function PolicyLink({ to, children }) {
  return <Link to={to}>{children}</Link>;
}

export default function AyesmajLegalPage({
  eyebrow,
  title,
  intro,
  icon: Icon,
  accent = "violet",
  metaDescription,
  highlights = [],
  note,
  children,
}) {
  const sections = Children.toArray(children).filter(isValidElement);

  useEffect(() => {
    document.title = `${title} — ${SITE.name}`;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", metaDescription);
    window.scrollTo(0, 0);
  }, [metaDescription, title]);

  return (
    <MotionConfig reducedMotion="user">
      <div className={`ayz-policy ayz-policy--${accent}`} style={{ fontFamily: FONTS.ui }}>
        <AyesmajNav />

        <header className="ayz-policy-hero">
          <div className="ayz-policy-hero__grid" aria-hidden="true" />
          <div className="ayz-policy-orb ayz-policy-orb--one" aria-hidden="true" />
          <div className="ayz-policy-orb ayz-policy-orb--two" aria-hidden="true" />

          <motion.div
            className="ayz-policy-hero__copy"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="ayz-policy-kicker">
              <Sparkles size={14} aria-hidden="true" />
              {eyebrow}
            </div>
            <h1 style={{ fontFamily: FONTS.display }}>{title}</h1>
            <p>{intro}</p>
            <div className="ayz-policy-meta">
              <span>Last updated</span>
              <strong>August 5, 2026</strong>
            </div>
          </motion.div>

          <motion.div
            className="ayz-policy-hero__art"
            initial={{ opacity: 0, scale: 0.94, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
          >
            <div className="ayz-policy-sculpture">
              <span className="ayz-policy-sculpture__ring ayz-policy-sculpture__ring--a" />
              <span className="ayz-policy-sculpture__ring ayz-policy-sculpture__ring--b" />
              <span className="ayz-policy-sculpture__core">
                <Icon size={56} strokeWidth={1.2} />
              </span>
            </div>
            <div className="ayz-policy-art-card ayz-policy-art-card--top">
              <span>AYESMAJ / STANDARD</span>
              <strong>Clear by design.</strong>
            </div>
            <div className="ayz-policy-art-card ayz-policy-art-card--bottom">
              <span>DOCUMENT / {String(sections.length).padStart(2, "0")}</span>
              <strong>{title}</strong>
            </div>
          </motion.div>

          <a className="ayz-policy-scroll" href="#policy-content">
            Read the document <ArrowDown size={16} aria-hidden="true" />
          </a>
        </header>

        <main id="policy-content" className="ayz-policy-main">
          <motion.aside className="ayz-policy-rail" {...reveal} aria-label={`${title} contents`}>
            <p>In this document</p>
            <nav>
              {sections.map((section, index) => (
                <a key={section.props.id} href={`#${section.props.id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.props.title}
                </a>
              ))}
            </nav>
            <a className="ayz-policy-email" href={`mailto:${SITE.email}`}>
              <Mail size={17} aria-hidden="true" />
              <span>
                Questions?
                <strong>Email the studio</strong>
              </span>
            </a>
          </motion.aside>

          <div className="ayz-policy-document">
            {highlights.length > 0 && (
              <motion.div className="ayz-policy-glance" {...reveal}>
                <div>
                  <span className="ayz-policy-glance__eyebrow">At a glance</span>
                  <h2>Designed to be understood.</h2>
                </div>
                <div className="ayz-policy-glance__items">
                  {highlights.map((highlight, index) => (
                    <div key={highlight}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <p>{highlight}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="ayz-policy-sections">{children}</div>

            {note && (
              <motion.div className="ayz-policy-note" {...reveal}>
                <span>Studio note</span>
                <p>{note}</p>
              </motion.div>
            )}

            <motion.div className="ayz-policy-contact" {...reveal}>
              <div>
                <span>Need clarity?</span>
                <h2 style={{ fontFamily: FONTS.display }}>LET&rsquo;S TALK LIKE HUMANS.</h2>
                <p>Questions about this document or anything on the site? A real person from the studio will reply.</p>
              </div>
              <Link to="/Contact" className="ayz-policy-contact__button">
                Contact the studio <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </motion.div>
          </div>
        </main>

        <AyesmajFooter />
      </div>
    </MotionConfig>
  );
}
