import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * MagneticText — characters react to the cursor like a magnetic field.
 *
 * Each character is wrapped in its own span. We track the cursor's distance
 * to each character's center; when the cursor enters a `radius` zone, the
 * character is pushed away from the cursor by an amount proportional to
 * (radius - distance) / radius, scaled by `strength`.
 *
 * Inspired by the TextMagneticField effect from framer.com/m/TextMagneticField.
 *
 * Props:
 *   text       : string of text to display (line breaks preserved with \n)
 *   radius     : magnetic field radius in px (default 160)
 *   strength   : max push distance in px (default 28)
 *   className  : passed to the wrapping span
 *   style      : passed to the wrapping span — set fontFamily, color, etc.
 *   as         : tag name for the root (default 'span')
 */
export default function MagneticText({
  text,
  radius = 160,
  strength = 28,
  className,
  style,
  as: Tag = "span",
}) {
  // Track the cursor in window coordinates so it works regardless of layout
  const [cursor, setCursor] = useState({ x: -9999, y: -9999, active: false });
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceRef.current) return;

    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY, active: true });
    const onLeave = () => setCursor((c) => ({ ...c, active: false }));
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Split into lines, then characters. Preserves spaces.
  const lines = text.split("\n");

  return (
    <Tag className={className} style={{ display: "block", ...style }}>
      {lines.map((line, li) => (
        <span key={li} style={{ display: "block" }}>
          {Array.from(line).map((ch, ci) => (
            <MagneticChar
              key={`${li}-${ci}`}
              ch={ch}
              cursor={cursor}
              radius={radius}
              strength={strength}
              reduceMotion={reduceRef.current}
            />
          ))}
        </span>
      ))}
    </Tag>
  );
}

// One character — measures its own position and computes its repulsion offset
function MagneticChar({ ch, cursor, radius, strength, reduceMotion }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduceMotion || !ref.current) return;
    if (!cursor.active) { setOffset({ x: 0, y: 0 }); return; }

    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = cursor.x - cx;
    const dy = cursor.y - cy;
    const dist = Math.hypot(dx, dy);

    if (dist > radius) { setOffset({ x: 0, y: 0 }); return; }

    // Falloff: 1 at center, 0 at radius edge — squared for a softer feel
    const t = 1 - dist / radius;
    const falloff = t * t;
    // Push AWAY from cursor (negate)
    const norm = dist || 1;
    setOffset({
      x: -(dx / norm) * strength * falloff,
      y: -(dy / norm) * strength * falloff,
    });
  }, [cursor, radius, strength, reduceMotion]);

  // Space character — render with a width but no animation (saves work)
  if (ch === " ") return <span ref={ref} style={{ display: "inline-block", width: "0.28em" }}>&nbsp;</span>;

  return (
    <motion.span
      ref={ref}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 180, damping: 14, mass: 0.5 }}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {ch}
    </motion.span>
  );
}
