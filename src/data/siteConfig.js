/**
 * siteConfig — the single source of truth for brand, routes, contact, legal
 * and default SEO. Do not hardcode these values anywhere else.
 * Fields marked [REVIEW] need owner confirmation before legal use.
 */
export const SITE = {
  name: "AYESMAJ Studios",
  legalName: "AYESMAJ Studios", // [REVIEW] exact legal entity name
  url: "https://ayesmajstudios.com",
  tagline: "WE BUILD BRANDS. WE CREATE WORLDS.",
  description:
    "AYESMAJ Studios builds complete visual worlds — brand identity, cinematic content, premium websites, AI production, and immersive 3D — as one connected creative system.",
  email: "ayesmajstudios@gmail.com",
  phone: "+1 (509) 319-7999",
  phoneHref: "tel:5093197999",
  location: "Phoenix, Arizona — working worldwide",
  jurisdiction: "Arizona, USA", // [REVIEW] governing law for Terms
  founder: "Rafael Smadja",
  social: {
    // [REVIEW] add/confirm live profiles; only verified links are listed
    instagram: "",
    youtube: "",
    linkedin: "",
  },
  defaultOgImage: "/assets/ayesmaj/hero/hero-composite.png",
};

// Canonical navigation (top-level)
export const NAV = [
  { label: "Work", to: "/Work" },
  { label: "Services", to: "/services", mega: "services" },
  { label: "Studio", to: "/Studio" },
  { label: "About", to: "/About" },
  { label: "Contact", to: "/Contact" },
];

// Services mega-menu items (each links to a full service page)
export const SERVICES_MENU = [
  { label: "Brand Strategy & Identity", to: "/services/branding", line: "Positioning, logo systems, and visual language." },
  { label: "Premium Websites", to: "/services/web-design", line: "Cinematic sites engineered to convert." },
  { label: "AI Content Production", to: "/services/ai-content", line: "AI images, posts, and campaigns at scale." },
  { label: "3D & CGI", to: "/services/3d-cgi", line: "Product modeling, environments, photoreal renders." },
  { label: "Motion, Film & VFX", to: "/services/motion-vfx", line: "Commercials, brand films, launch reels." },
  { label: "Storyboards & Direction", to: "/services/storyboards", line: "See the film before it exists." },
  { label: "AI Brand System", to: "/System", line: "Turn a brief into a connected brand and content direction." },
];

// Canonical work destinations. Each discipline has one clear home instead of
// multiple pages that show the same projects in different wrappers.
export const WORK_MENU = [
  { label: "All Work", to: "/Work" },
  { label: "Branding & Identity", to: "/Branding" },
  { label: "Web Experiences", to: "/WebExperiences" },
  { label: "AI Campaigns", to: "/AiPosts" },
  { label: "Films & VFX", to: "/AiVideos" },
  { label: "3D & CGI Worlds", to: "/Worlds3D" },
  { label: "Animation Gallery", to: "/Animations" },
  { label: "Showreel", to: "/Reel" },
];

export const FOOTER_EXPLORE = [
  { label: "Work", to: "/Work" },
  { label: "Services", to: "/services" },
  { label: "Studio", to: "/Studio" },
  { label: "About", to: "/About" },
  { label: "Contact", to: "/Contact" },
  { label: "Insights", to: "/Insights" },
  { label: "Pricing", to: "/Pricing" },
  { label: "Clients", to: "/Clients" },
  { label: "FAQ", to: "/Faq" },
];

export const FOOTER_SERVICES = SERVICES_MENU.map(({ label, to }) => ({ label, to }));

export const FOOTER_WORK = [
  { label: "Branding & Identity", to: "/Branding" },
  { label: "Web Experiences", to: "/WebExperiences" },
  { label: "AI Campaigns", to: "/AiPosts" },
  { label: "AI Videos", to: "/AiVideos" },
  { label: "3D & CGI Worlds", to: "/Worlds3D" },
  { label: "Animation Gallery", to: "/Animations" },
  { label: "Showreel", to: "/Reel" },
  { label: "Storyboards", to: "/Storyboards" },
];

export const LEGAL_LINKS = [
  { label: "Privacy Policy", to: "/Privacy" },
  { label: "Terms of Use", to: "/Terms" },
  { label: "Cookie Policy", to: "/Cookies" },
  { label: "Accessibility", to: "/Accessibility" },
];

// Truthful capability badges — replaces unverified numeric claims.
export const PROOF_BADGES = [
  "MULTI-DISCIPLINE STUDIO",
  "GLOBAL COLLABORATION",
  "4K PRODUCTION",
  "FROM CONCEPT TO LAUNCH",
];

// Data processors actually used by this site (for Privacy/Cookie pages)
export const PROCESSORS = [
  { name: "Web3Forms", purpose: "contact / project-intake form delivery" },
  { name: "Cloudflare R2", purpose: "video content delivery (CDN)" },
  { name: "Vercel", purpose: "website hosting" },
];
