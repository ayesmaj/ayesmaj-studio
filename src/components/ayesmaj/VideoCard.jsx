import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { FONTS } from "./theme";

/**
 * VideoCard — premium cinematic video/showreel card.
 *
 * Props:
 *   title     : string
 *   category  : string
 *   accent    : hex color (default GOLD)
 *   accentRGB : "r,g,b" for translucent fills
 *   poster    : poster image src
 *   videoSrc  : optional muted-loop video, plays on hover or tap
 */
export default function VideoCard({
  title = "SHOWREEL",
  category = "FILM",
  accent = "#FFB000",
  accentRGB = "255,176,0",
  poster,
  videoSrc,
}) {
  const videoRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [playing, setPlaying] = useState(false);

  const playVideo = () => {
    const v = videoRef.current;
    if (v) v.play().catch(() => {});
  };

  const pauseVideo = (reset = false) => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    if (reset) v.currentTime = 0;
  };

  const enter = () => {
    setHover(true);
    playVideo();
  };
  const leave = () => {
    setHover(false);
    if (!playing) pauseVideo(true);
  };

  const togglePlayback = () => {
    const next = !playing;
    setPlaying(next);
    if (next) playVideo();
    else pauseVideo();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePlayback();
    }
  };

  return (
    <motion.div
      onMouseEnter={enter}
      onMouseLeave={leave}
      onClick={videoSrc ? togglePlayback : undefined}
      onKeyDown={videoSrc ? handleKeyDown : undefined}
      role={videoSrc ? "button" : undefined}
      tabIndex={videoSrc ? 0 : undefined}
      aria-label={videoSrc ? `${playing ? "Pause" : "Play"} ${title} ${category}` : undefined}
      animate={{ y: hover ? -6 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "relative",
        aspectRatio: "16 / 10",
        borderRadius: 24,
        overflow: "hidden",
        border: `1px solid ${hover ? "rgba(" + accentRGB + ",0.35)" : "rgba(255,255,255,0.09)"}`,
        background: "#070707",
        cursor: "pointer",
        transition: "border-color 0.35s ease",
      }}
    >
      {poster && (
        <img
          src={poster}
          alt=""
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}

      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          preload="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: hover || playing ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        />
      )}

      {/* legibility gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.15) 45%, rgba(3,3,3,0) 70%)",
        }}
      />

      {/* play button */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${accent}`,
            background: `rgba(${accentRGB},0.15)`,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transform: hover ? "scale(1.1)" : "scale(1)",
            boxShadow: hover ? `0 0 45px rgba(${accentRGB},0.55)` : `0 0 18px rgba(${accentRGB},0.18)`,
            transition: "transform 0.35s ease, box-shadow 0.35s ease",
          }}
        >
          <Play size={26} fill={accent} stroke={accent} style={{ marginLeft: 3 }} />
        </div>
      </div>

      {/* title + category */}
      <div
        style={{
          position: "absolute",
          left: 24,
          bottom: 22,
          right: 24,
        }}
      >
        <div
          style={{
            fontFamily: FONTS.display,
            fontWeight: 800,
            fontSize: "clamp(20px, 2.4vw, 30px)",
            lineHeight: 0.95,
            letterSpacing: "0.01em",
            textTransform: "uppercase",
            color: "#F5F5F0",
          }}
        >
          {title}
        </div>
        <div
          style={{
            marginTop: 8,
            fontFamily: FONTS.ui,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: accent,
          }}
        >
          {category}
        </div>
      </div>
    </motion.div>
  );
}
