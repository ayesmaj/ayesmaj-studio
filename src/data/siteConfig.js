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
  // Branded mailbox — leave empty until hello@ayesmajstudios.com actually exists
  // (the domain has no MX record as of 2026-08-21); the footer falls back to `email`.
  brandedEmail: "",
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
    behance: "",
  },
  defaultOgImage: "/assets/ayesmaj/hero/hero-composite.webp",
};

// Canonical navigation (top-level)
export const NAV = [
  { label: "Work", to: "/Work" },
  { label: "Services", to: "/Services", mega: "services" },
  { label: "Interior Design", to: "/interior-design", mega: "interior" },
  { label: "Studio", to: "/Studio" },
  { label: "About", to: "/About" },
  { label: "Contact", to: "/Contact" },
];

// Interior Design mega-menu (owner IA 2026-08-22): Overview · Spaces · Property types.
// Previews live in /interior-design/generated/navigation (see src/content/interior-design-generated-media.ts).
export const INTERIOR_MENU = {
  overview: { label: "Overview", to: "/interior-design", line: "From scan and plan to a world the client can enter.", preview: "/interior-design/generated/navigation/overview.webp" },
  groups: [
    { title: "Spaces", items: [
      { label: "Kitchens", to: "/interior-design/kitchens", line: "The room everything revolves around.", preview: "/interior-design/generated/navigation/kitchens.webp" },
      { label: "Bathrooms", to: "/interior-design/bathrooms", line: "Stone, water, light.", preview: "/interior-design/generated/navigation/bathrooms.webp" },
      { label: "Furniture & Decor", to: "/interior-design/furniture-decor", line: "The space is built - now give it a life.", preview: "/interior-design/generated/navigation/furniture-decor.webp" },
    ] },
    { title: "Property types", items: [
      { label: "Apartments", to: "/interior-design/apartments", line: "See the entire apartment, then step inside.", preview: "/interior-design/generated/navigation/apartments.webp" },
      { label: "Homes", to: "/interior-design/homes", line: "Understand the whole home, experience every part.", preview: "/interior-design/generated/navigation/homes.webp" },
      { label: "Buildings & Developments", to: "/interior-design/buildings", line: "From building model to a world buyers can enter.", preview: "/interior-design/generated/navigation/buildings.webp" },
    ] },
  ],
};

// Services mega-menu items (each links to a full service page)
/* Internal links go straight to the canonical route. The lowercase
   /services/* aliases still exist as permanent redirects in vercel.json for
   external and historical links, but linking them internally sent every click
   and every rendered-crawl hop through a 308 for no benefit. */
export const SERVICES_MENU = [
  { label: "Brand Strategy & Identity", to: "/ServiceBranding", line: "Positioning, logo systems, and visual language." },
  { label: "Premium Websites", to: "/WebExperiences", line: "Cinematic sites engineered to convert." },
  { label: "AI Content Production", to: "/AiMarketing", line: "AI images, posts, and campaigns at scale." },
  { label: "3D & CGI", to: "/Worlds3D", line: "Product modeling, environments, photoreal renders." },
  { label: "Motion, Film & VFX", to: "/AiVideos", line: "Commercials, brand films, launch reels." },
  { label: "Storyboards & Direction", to: "/Storyboards", line: "See the film before it exists." },
  { label: "Interior Design Visualization", to: "/interior-design", line: "Scans, 3D plans, AI film and client presentations for spatial projects." },
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

export const FOOTER_BLURB =
  "A visualization, branding and marketing studio creating complete visual worlds for ambitious ideas, products and spaces.";

export const FOOTER_EXPLORE = [
  { label: "Work", to: "/Work" },
  { label: "Studio", to: "/Studio" },
  { label: "About", to: "/About" },
  { label: "Insights", to: "/Insights" },
  { label: "Contact", to: "/Contact" },
];

const FOOTER_SERVICE_LABELS = [
  "Brand Strategy & Identity",
  "Premium Websites",
  "AI Content Production",
  "3D & CGI",
  "Motion, Film & VFX",
  "Interior Design Visualization",
];
export const FOOTER_SERVICES = FOOTER_SERVICE_LABELS
  .map((label) => SERVICES_MENU.find((s) => s.label === label))
  .filter(Boolean)
  .map(({ label, to }) => ({ label, to }));

// Kept for the prerender's crawlable link list; the footer itself now shows Selected Work.
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
