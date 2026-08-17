/**
 * seoMeta — per-route title/description used to prerender static HTML.
 *
 * Single source of truth for crawlable head tags. scripts/prerender.mjs reads
 * this at build time and writes dist/<Route>/index.html so every URL ships a
 * unique title, description, canonical and Open Graph set BEFORE hydration.
 *
 * Values for routes that already render <Seo .../> are copied verbatim from
 * those pages so the prerendered head matches what React sets after mount.
 * If you change a page's <Seo> props, change them here too — the build check
 * in prerender.mjs fails on any sitemap route missing from this table, but it
 * cannot detect drift in wording.
 *
 * `blurb` is the one crawlable paragraph rendered into #root as a fallback.
 * React replaces it on hydration, so users never see it.
 *
 * `ogTitle` overrides `title` for Open Graph and Twitter only, where the limit
 * is ~60 characters — search titles can run longer. Set it only when `title`
 * exceeds 60; prerender.mjs fails the build if any og:title is longer.
 *
 * `service` emits schema.org Service for the six service pages, and `parent`
 * adds an intermediate BreadcrumbList crumb.
 */
export const SEO_ROUTES = {
  "/": {
    title: "AYESMAJ Studios | Cinematic Branding, AI Content, Websites & 3D Worlds",
    ogTitle: "AYESMAJ Studios — Branding, Film, Web & 3D",
    description:
      "AYESMAJ Studios builds complete visual worlds — brand identity, cinematic websites, AI content production, and immersive 3D — as one connected creative system.",
    h1: "We build brands. We create worlds.",
    blurb:
      "AYESMAJ Studios is a multi-discipline creative studio in Phoenix, Arizona, working worldwide. We combine brand strategy and identity, premium web design, AI content production, 3D and CGI, motion and VFX, and storyboard direction into one connected system.",
  },
  "/Work": {
    title: "Selected Work | AYESMAJ Studios",
    description:
      "Selected work from AYESMAJ Studios — brand identities, cinematic websites, AI campaigns, and 3D worlds built from concept to launch.",
    h1: "Selected Work",
    blurb:
      "Brand identities, cinematic websites, AI campaigns, and 3D worlds produced by AYESMAJ Studios from concept through launch.",
  },
  "/Services": {
    title:
      "Creative Services | Branding, Web Design, AI Content & 3D | AYESMAJ Studios",
    ogTitle: "Creative Services — AYESMAJ Studios",
    description:
      "Explore AYESMAJ Studios services including brand identity, premium web design, AI content and video, 3D CGI, motion, storyboards, packaging, and campaign art direction.",
    image: "/assets/ayesmaj/generated/capabilities/capability-01-brand-strategy.webp",
    h1: "Creative Services",
    blurb:
      "Brand strategy and identity, premium websites, AI content production, 3D and CGI, motion film and VFX, and storyboards with visual direction.",
  },
  "/Studio": {
    title: "The Studio | AYESMAJ Studios",
    description:
      "Inside AYESMAJ Studios — how a multi-discipline team takes brands from strategy and identity through cinematic content, web, and 3D production.",
    h1: "The Studio",
    blurb:
      "AYESMAJ Studios is a multi-discipline creative studio combining brand strategy, design, film, AI production, and 3D under one roof.",
  },
  "/About": {
    title: "About | AYESMAJ Studios",
    description:
      "AYESMAJ Studios is a multi-discipline creative studio based in Phoenix, Arizona, working worldwide across branding, film, AI production, web, and 3D.",
    h1: "About AYESMAJ Studios",
    blurb:
      "Founded by Rafael Smadja, AYESMAJ Studios is based in Phoenix, Arizona and collaborates with companies worldwide across branding, cinematic content, web experiences, and 3D production.",
  },
  "/Contact": {
    title: "Contact — AYESMAJ Studios",
    description:
      "Start a project with AYESMAJ Studios. Based in Phoenix, Arizona and working worldwide — we respond within 24 hours.",
    h1: "Start a Project",
    blurb:
      "Tell us about your brand and what you need to build. AYESMAJ Studios is based in Phoenix, Arizona and works with companies worldwide.",
  },
  "/Pricing": {
    title: "Pricing — AYESMAJ Studios",
    description:
      "Transparent packages for branding, premium websites, AI content, and 3D production from AYESMAJ Studios — from concept to launch.",
    h1: "Pricing",
    blurb:
      "Transparent packages covering brand identity, premium websites, AI content production, and 3D work, from concept through launch.",
  },
  "/WebExperiences": {
    title: "Web Experiences | AYESMAJ Studios",
    description:
      "Premium cinematic websites engineered to convert — landing pages, full business sites, and interactive 3D web experiences by AYESMAJ Studios.",
    h1: "Web Experiences",
    blurb:
      "Premium cinematic websites engineered to convert: landing pages, full business sites, e-commerce, and interactive 3D web experiences.",
  },
  "/AiMarketing": {
    title: "AI Marketing & Content | AYESMAJ Studios",
    description:
      "AI-directed campaign films, product imagery, and scalable content systems built by AYESMAJ Studios.",
    h1: "AI Marketing & Content",
    blurb:
      "AI-directed campaign films, product imagery, and scalable content systems produced by AYESMAJ Studios.",
  },
  "/Worlds3D": {
    title: "3D Worlds, CGI & Models | AYESMAJ Studios",
    description:
      "Cinematic product CGI, immersive 3D environments, characters, and interactive brand worlds by AYESMAJ Studios.",
    h1: "3D Worlds & CGI",
    blurb:
      "Cinematic product CGI, immersive 3D environments, characters, and interactive brand worlds.",
  },
  "/AiVideos": {
    title: "Motion, Film & VFX | AYESMAJ Studios",
    description:
      "Cinematic brand films, commercials, product animation, visual effects, and AI-powered motion production by AYESMAJ Studios.",
    h1: "Motion, Film & VFX",
    blurb:
      "Cinematic brand films, commercials, product animation, visual effects, and AI-powered motion production.",
  },
  "/AiPosts": {
    title: "AI Posts | AYESMAJ Studios",
    description:
      "AI-generated social content and brand imagery by AYESMAJ Studios — scroll-stopping posts produced at scale.",
    h1: "AI Campaigns & Posts",
    blurb:
      "AI-generated social content and brand imagery, produced at scale for campaigns.",
  },
  "/Storyboards": {
    title: "Storyboards & Visual Direction | AYESMAJ Studios",
    description:
      "Explore cinematic storyboards, production boards, visual treatments, and campaign direction created by AYESMAJ Studios.",
    h1: "Storyboards & Visual Direction",
    blurb:
      "Cinematic storyboards, production boards, visual treatments, and campaign direction — see the film before it exists.",
  },
  "/Animations": {
    title: "Animations — AYESMAJ Studios",
    description:
      "3D animations and motion work by AYESMAJ Studios — cinematic loops, product animations, and brand films.",
    h1: "Animation Gallery",
    blurb:
      "3D animations and motion work: cinematic loops, product animations, and brand films.",
  },
  "/Brands": {
    title: "Brand Identity Portfolio | AYESMAJ Studios",
    description:
      "Brand identity work by AYESMAJ Studios — logo systems, visual language, and complete brand worlds built for modern companies.",
    h1: "Brand Identity Portfolio",
    blurb:
      "Logo systems, visual language, and complete brand worlds built for modern companies.",
  },
  "/ServiceBranding": {
    title: "Brand Strategy & Identity | AYESMAJ Studios",
    description:
      "Positioning, logo systems, and visual language from AYESMAJ Studios — brand identity built as a complete, connected system.",
    h1: "Brand Strategy & Identity",
    blurb:
      "Positioning, logo systems, and visual language, built as a complete and connected brand system.",
  },
  "/Faq": {
    title: "FAQ — AYESMAJ Studios",
    description:
      "Common questions about working with AYESMAJ Studios — process, timelines, pricing, revisions, and what happens after launch.",
    h1: "Frequently Asked Questions",
    blurb:
      "Questions about process, timelines, pricing, revisions, and what happens after launch.",
  },
  "/Insights": {
    title: "Insights — AYESMAJ Studios",
    description:
      "Notes on branding, cinematic content, AI production, and web design from the team at AYESMAJ Studios.",
    h1: "Insights",
    blurb:
      "Notes on branding, cinematic content, AI production, and web design.",
  },
  "/Privacy": {
    title: "Privacy Policy — AYESMAJ Studios",
    description:
      "How AYESMAJ Studios collects, uses, and protects your information, and the choices you have over your data.",
    h1: "Privacy & Data Policy",
    blurb:
      "What we collect, why we need it, how it is used, and the choices you have over your data.",
  },
  "/Terms": {
    title: "Terms of Use — AYESMAJ Studios",
    description:
      "The terms governing use of the AYESMAJ Studios website and the services provided by the studio.",
    h1: "Terms of Use",
    blurb:
      "The terms that govern use of this website and the services provided by AYESMAJ Studios.",
  },
  "/Cookies": {
    title: "Cookie Policy — AYESMAJ Studios",
    description:
      "How AYESMAJ Studios uses cookies and similar technologies, and how you can control them.",
    h1: "Cookie Policy",
    blurb:
      "How this site uses cookies and similar technologies, and how you can control them.",
  },
  "/Accessibility": {
    title: "Accessibility — AYESMAJ Studios",
    description:
      "AYESMAJ Studios' commitment to accessible design, the standards we work toward, and how to report an accessibility issue.",
    h1: "Accessibility",
    blurb:
      "Our commitment to accessible design, the standards we work toward, and how to report an issue.",
  },
};

/**
 * Routes that describe a service offering, mapped to their schema.org
 * serviceType. These also get /Services as their breadcrumb parent.
 *
 * Deliberately not schema'd: FAQPage (rich results restricted to government
 * and healthcare sites since Aug 2023) and HowTo (deprecated Sep 2023).
 */
export const SERVICE_ROUTES = {
  "/ServiceBranding": "Brand identity design",
  "/WebExperiences": "Web design and development",
  "/AiMarketing": "AI content production",
  "/Worlds3D": "3D modeling and CGI",
  "/AiVideos": "Video production and visual effects",
  "/Storyboards": "Storyboard and art direction",
};
