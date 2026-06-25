import React from "react";
import { motion } from "framer-motion";
import { COLORS, FONTS } from "./theme";

/**
 * SectionHeader — reusable cinematic section heading.
 *
 * Props:
 *   eyebrow   : small uppercase label
 *   title     : big display headline (string or JSX)
 *   subtitle  : supporting paragraph
 *   accent    : eyebrow color (default gold)
 *   align     : "center" (default) | "left"
 *   max       : max width of the block
 *   as        : heading tag for the title — "h2" (default) | "h1"
 */
export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  accent = "#FFB000",
  align = "center",
  max = 760,
  as = "h2",
}) {
  const Heading = motion[as] || motion.h2;
  return (
    <div style={{ textAlign: align, maxWidth: max, margin: align === "center" ? "0 auto" : 0 }}>
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{
            fontFamily: FONTS.ui,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: accent,
            marginBottom: 18,
          }}
        >
          {eyebrow}
        </motion.p>
      )}

      <Heading
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: FONTS.display,
          fontSize: "clamp(30px, 4.4vw, 64px)",
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: "0.005em",
          textTransform: "uppercase",
          color: COLORS.white,
          margin: 0,
        }}
      >
        {title}
      </Heading>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            fontFamily: FONTS.ui,
            fontSize: "clamp(15px, 1.3vw, 18px)",
            lineHeight: 1.65,
            color: COLORS.gray,
            margin: align === "center" ? "22px auto 0" : "22px 0 0",
            maxWidth: 620,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
