// AYESMAJ Studios — reusable fixed cinematic background.
// Pure presentational layer: radial mood glows + faint circuit grid + a few glowing dots.
// `accent` is an rgb string (e.g. '255,176,0') for the page's mood glow.

const DOTS = [
  { top: "18%", left: "12%", c: "216,183,90" }, // gold
  { top: "32%", left: "82%", c: "179,255,63" }, // green
  { top: "68%", left: "22%", c: "216,183,90" }, // gold
  { top: "78%", left: "70%", c: "155,92,255" }, // purple
  { top: "50%", left: "50%", c: "179,255,63" }, // green
];

export default function AyesmajBackground({ accent = "179,255,63" }) {
  const gridMask =
    "radial-gradient(ellipse 75% 75% at 50% 45%, #000 0%, transparent 82%)";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* 1. radial mood glows + base gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: [
            "radial-gradient(60% 60% at 0% 0%, rgba(179,255,63,0.08), transparent 70%)",
            "radial-gradient(60% 60% at 100% 0%, rgba(155,92,255,0.08), transparent 70%)",
            `radial-gradient(70% 60% at 50% 95%, rgba(${accent},0.10), transparent 72%)`,
            "linear-gradient(180deg, #020302, #050805)",
          ].join(","),
        }}
      />

      {/* 2. faint circuit/grid texture, masked so it fades at the edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.1,
          backgroundImage: [
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 64px)",
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 64px)",
          ].join(","),
          backgroundSize: "64px 64px",
          WebkitMaskImage: gridMask,
          maskImage: gridMask,
        }}
      />

      {/* 3. a few very subtle glowing dots */}
      {DOTS.map((d, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: d.top,
            left: d.left,
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: `rgba(${d.c},0.9)`,
            boxShadow: `0 0 8px 2px rgba(${d.c},0.5)`,
            opacity: 0.35,
          }}
        />
      ))}
    </div>
  );
}
