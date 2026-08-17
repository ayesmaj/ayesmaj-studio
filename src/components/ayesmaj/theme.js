// AYESMAJ Studios — cinematic three-world design system
// Single source of truth for colors + world definitions.

export const COLORS = {
  black:   "#030303",
  black2:  "#070707",
  black3:  "#0B0B0B",
  white:   "#F5F5F0",
  gray:    "#A9A9A9",
  muted:   "#6F6F6F",
  border:  "rgba(255,255,255,0.12)",
  glass:   "rgba(255,255,255,0.045)",
};

// Each world = one business category.
// `route` uses the project's PascalCase auto-router convention.
export const WORLDS = [
  {
    index: "01",
    category: "website",
    title: "WEBSITE DESIGN",
    subtitle: "Digital experiences that convert.",
    route: "/WebExperiences",
    accent: "#B3FF3F",
    accentSoft: "#6CFF8F",
    accentRGB: "179,255,63",
    image: "/assets/ayesmaj/hero/hero-world-website.png",
    // radial glow position (x% of panel)
    glowAt: "35% 70%",
  },
  {
    index: "02",
    category: "ai-marketing",
    title: "AI MARKETING",
    subtitle: "Cinematic content that sells.",
    route: "/AiMarketing",
    accent: "#FFB000",
    accentSoft: "#FFD36A",
    accentRGB: "255,176,0",
    image: "/assets/ayesmaj/hero/hero-world-ai-marketing.png",
    glowAt: "50% 70%",
    featured: true,
  },
  {
    index: "03",
    category: "3d-worlds",
    title: "3D WORLDS & MODELS",
    subtitle: "Immersive worlds that inspire.",
    route: "/Worlds3D",
    accent: "#9B5CFF",
    accentSoft: "#C084FC",
    accentRGB: "155,92,255",
    image: "/assets/ayesmaj/hero/hero-world-3d.png",
    glowAt: "65% 70%",
  },
];

// Shared typography: Anton is the unmistakable AYESMAJ cinematic voice.
// Outfit is reserved for compact card titles where Anton would feel too loud.
export const FONTS = {
  display: "'Anton', 'Bebas Neue', 'Oswald', system-ui, sans-serif",
  card:    "'Outfit', 'DM Sans', system-ui, sans-serif",
  ui:      "'DM Sans', 'Inter', system-ui, sans-serif",
  myriad:  "'Myriad Pro', 'Myriad', 'Source Sans 3', 'Segoe UI', sans-serif",
};
