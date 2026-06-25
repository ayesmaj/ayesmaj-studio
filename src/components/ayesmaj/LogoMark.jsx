import React from "react";

/**
 * LogoMark — horizontal AYESMAJ lockup: the A monogram + "AYESMAJ" wordmark.
 * A symbol: /assets/ayesmaj/logo-a.png (transparent, gold/purple glow).
 *
 * Props:
 *   size      : height of the A symbol in px (default 38)
 *   showText  : show the "AYESMAJ" wordmark beside the A (default true)
 *   color     : wordmark color (default white)
 */
export default function LogoMark({ size = 38, showText = true, color = "#F5F5F0" }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: size * 0.34 }}>
      <img
        src="/assets/ayesmaj/logo-a.png"
        alt="AYESMAJ Studios"
        height={size}
        style={{ height: size, width: "auto", display: "block", objectFit: "contain", userSelect: "none" }}
        draggable={false}
      />
      {showText && (
        <span
          style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontSize: size * 0.52,
            fontWeight: 700,
            letterSpacing: "0.3em",
            color,
            paddingLeft: "0.16em",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          AYESMAJ
        </span>
      )}
    </div>
  );
}
