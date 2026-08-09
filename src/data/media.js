/**
 * Central media manifest — ALL video sources are R2 CDN URLs because
 * public/videos/ is gitignored (too large for GitHub/Vercel). Posters and
 * AI-post images are small and committed locally.
 */
export const R2 = "https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev";

// 30 3D-animation loops (uploaded to R2 earlier)
export const ANIMATIONS = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  src: `${R2}/animations/${i + 1}.mp4`,
}));

// Real client website demos (R2 sites/) + committed poster frames
export const SITE_DEMOS = [
  { id: "vudu-energy",          title: "VUDU Energy",           category: "CPG / Brand",        src: `${R2}/sites/vudu-energy.mp4`,          poster: "/videos/websites/posters/vudu-energy.jpg" },
  { id: "podos-ai",             title: "PODOS AI",              category: "AI Infrastructure",  src: `${R2}/sites/podos-ai.mp4`,             poster: "/videos/websites/posters/podos-ai.jpg" },
  { id: "rebound-skincare",     title: "Rebound Skincare",      category: "Beauty / Medspa",    src: `${R2}/sites/rebound-skincare.mp4`,     poster: "/videos/websites/posters/rebound-skincare.jpg" },
  { id: "casa-ora",             title: "Casa Ora",              category: "Home / Remodeling",  src: `${R2}/sites/casa-ora.mp4`,             poster: "/videos/websites/posters/casa-ora.jpg" },
  { id: "syntropic",            title: "Syntropic",             category: "AI / Deep Tech",     src: `${R2}/sites/syntropic.mp4`,            poster: "/videos/websites/posters/syntropic.jpg" },
  { id: "electric-fuel-america",title: "Electric Fuel America", category: "Energy / Industrial",src: `${R2}/sites/electric-fuel-america.mp4`,poster: "/videos/websites/posters/electric-fuel-america.jpg" },
  { id: "kolie",                title: "Kolie",                 category: "AI Consumer",        src: `${R2}/sites/kolie.mp4`,                poster: "/videos/websites/posters/kolie.png" },
  { id: "arizona-chimney-pros", title: "Arizona Chimney Pros",  category: "Local Service",      src: `${R2}/sites/arizona-chimney-pros.mp4`, poster: "/videos/websites/posters/arizona-chimney-pros.jpg" },
  { id: "ayesmaj-studios",      title: "AYESMAJ Studios",       category: "Creative Studio",    src: `${R2}/sites/ayesmaj-studios.mp4`,      poster: "/videos/websites/posters/ayesmaj-studios.jpg" },
];

// AI-generated video work (R2 ai-videos/)
export const AI_VIDEOS = [
  { id: "kolie-ad",     title: "Kolie — AI Launch Ad",        category: "AI Commercial", src: `${R2}/ai-videos/kolie-ad.mp4`, poster: "/assets/ayesmaj/motion-posters/kolie-ad.jpg" },
  { id: "syntropic-3d", title: "Syntropic — 3D Explainer",    category: "AI x 3D Film",  src: `${R2}/ai-videos/syntropic-3d.mp4`, poster: "/assets/ayesmaj/motion-posters/syntropic-3d.jpg" },
  { id: "syntropic-53", title: "Syntropic — Concept Film",    category: "AI Brand Film", src: `${R2}/ai-videos/syntropic-53.mp4`, poster: "/assets/ayesmaj/motion-posters/syntropic-53.jpg" },
];

// Showreel hero films (R2 root, uploaded earlier)
export const SHOWREEL_FILMS = [
  { id: "factory", title: "Factory", category: "CGI Commercial", src: `${R2}/factory.mp4`, poster: "/assets/ayesmaj/motion-posters/factory.jpg" },
  { id: "optimus", title: "Optimus", category: "3D Animation",   src: `${R2}/optimus.mp4`, poster: "/assets/ayesmaj/motion-posters/optimus.jpg" },
  { id: "yafora",  title: "Yafora",  category: "Brand Film",     src: `${R2}/yafora.mp4`, poster: "/assets/ayesmaj/motion-posters/yafora.jpg" },
];

// AI social post system (committed images)
export const AI_POSTS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  src: `/assets/ayesmaj/ai-posts/post-${i + 1}.png`,
}));

export const STORYBOARD_REF = "/assets/ayesmaj/storyboard-ref.png";
