import React from "react";
import { FONTS } from "./theme";

/**
 * LogoMark / BrandLockup — the A mark + a clean premium HTML wordmark.
 * Wordmark is real text (SEO/crisp at any size), NOT baked into an image.
 *
 * Props:
 *   size      : height of the A symbol in px (default 38)
 *   showText  : show the wordmark (default true)
 *   color     : wordmark color (default soft ivory)
 *   studios   : show the small "STUDIOS" line under the wordmark (default true)
 */
export default function LogoMark({ size = 38, showText = true, color = "#F6F3ED", studios = true }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: size * 0.32 }}>
      <img
        src="/assets/ayesmaj/logo-a.webp"
        alt="AYESMAJ Studios"
        height={size}
        style={{ height: size, width: "auto", display: "block", objectFit: "contain", userSelect: "none" }}
        draggable={false}
      />
      {showText && (
        <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1 }}>
          <span
            style={{
              fontFamily: FONTS.myriad,
              fontSize: Math.max(15, Math.round(size * 0.46)),
              fontWeight: 700,
              letterSpacing: "0.16em",
              color,
              whiteSpace: "nowrap",
            }}
          >
            AYESMAJ
          </span>
          {studios && (
            <span
              style={{
                fontFamily: FONTS.myriad,
                fontSize: Math.max(8, Math.round(size * 0.2)),
                fontWeight: 700,
                letterSpacing: "0.34em",
                marginTop: 3,
                background: "linear-gradient(90deg,#D8B75A 0%,#C88B58 30%,#A45FDB 70%,#7A48FF 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                whiteSpace: "nowrap",
              }}
            >
              STUDIOS
            </span>
          )}
        </span>
      )}
    </span>
  );
}
