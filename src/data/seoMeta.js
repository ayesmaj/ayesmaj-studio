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
  /* /Brands used to hold this entry, but that route is a client-side redirect
     stub - the real portfolio has always rendered at /Branding. /Brands is now
     a server-side 308 in vercel.json and is deliberately absent here, so it is
     neither prerendered nor in the sitemap. h1 matches what the page actually
     renders, so the prerendered and rendered DOM agree. */
  "/Branding": {
    title: "Branding & Visual Campaigns | AYESMAJ Studios",
    /* Client names confirmed by the owner 2026-08-25. They matter here beyond
       trust: the portfolio renders them client-side, so before this the brands
       existed nowhere in the crawlable HTML and the page could not surface for
       any brand-name query. */
    description:
      "Brand identity, packaging and product campaign work by AYESMAJ Studios for LaCroix, Boom Chicka Pop, ASHÉ, Blenday and Noam.",
    h1: "Brand Worlds Built to Be Remembered.",
    blurb:
      "Brand identity, packaging and product campaign work for LaCroix, Boom Chicka Pop, ASHÉ Ritual Roast, Blenday and Noam — logo systems, 3D product visualization, character design and complete brand worlds.",
  },
  "/Reel": {
    title: "Showreel & Brand Films | AYESMAJ Studios",
    description:
      "Cinematic brand films, product reveals and campaign reels from AYESMAJ Studios — the showreel plus work for Boom Chicka Pop and ASHÉ.",
    h1: "Watch Our Work",
    blurb:
      "Cinematic brand films, product reveals and campaign reels — including the AYESMAJ logo reveal and product work for Boom Chicka Pop and ASHÉ Ritual Roast.",
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
  "/interior-design": {
    title: "Interior Design Visualization | AYESMAJ Studios",
    description:
      "AI scans, 3D floor plans, building visualization, photorealistic interiors, cinematic AI video and complete client presentations - one connected visual system for spatial projects.",
    h1: "From model to a world your client can enter.",
    blurb:
      "We transform scans, plans and architectural models into immersive visual experiences clients can understand, explore and remember - apartments, houses and buildings, from AI scan to cinematic film.",
  },
  "/interior-design/ai-scan-apartment": {
    title: "AI Apartment Scan & Existing-Condition Visualization | AYESMAJ Studios",
    ogTitle: "AI Apartment Scan | AYESMAJ Studios",
    description:
      "Turn apartment photos, video or plans into a clean spatial foundation - AI-assisted existing-condition capture for renovations, remote design and furniture planning.",
    h1: "Capture the apartment as it exists today.",
    blurb:
      "An AI-assisted apartment scan builds a fast visual foundation for renovations, redesigns, furniture planning and early client conversations. It is a communication foundation, not survey documentation - key measurements are verified on site.",
  },
  "/interior-design/ai-scan-house": {
    title: "AI House Scan for Renovation and Visualization | AYESMAJ Studios",
    ogTitle: "AI House Scan | AYESMAJ Studios",
    description:
      "AI-assisted capture of the existing house - floors, garage, yard and pool become one clear visual foundation for renovation and design.",
    h1: "Turn the existing house into a clear visual foundation.",
    blurb:
      "A house capture brings floors, garage, yard, pool and the building footprint into one coherent picture. A design and communication foundation, not engineering, permit or survey certification.",
  },
  "/interior-design/3d-floor-plan-apartment": {
    title: "3D Apartment Floor Plans and Interior Visualization | AYESMAJ Studios",
    ogTitle: "3D Apartment Floor Plan | AYESMAJ Studios",
    description:
      "Furnished 3D floor plans that show furniture scale, circulation and how every room connects - built for client approval, rentals and renovation decisions.",
    h1: "See the complete apartment in one glance.",
    blurb:
      "A furnished 3D floor plan shows what flat drawings cannot: true furniture scale, circulation between rooms, storage and kitchen relationships, bedroom privacy and balcony connections.",
  },
  "/interior-design/3d-floor-plan-house": {
    title: "3D House Floor Plans with Pool, Garage and Interiors | AYESMAJ Studios",
    ogTitle: "3D House Floor Plan | AYESMAJ Studios",
    description:
      "3D house floor plans across levels - public and private zones, stair alignment, garage, pool and outdoor living, readable in one view.",
    h1: "Understand the entire home before entering a room.",
    blurb:
      "Multi-level living made readable: public versus private zones, the garage-to-house route, stair alignment, and how indoor living meets pool and yard. Communicates the design; does not replace structural or permit documentation.",
  },
  "/interior-design/3d-building-visualization": {
    title: "3D Building Visualization for Architects and Developers | AYESMAJ Studios",
    ogTitle: "3D Building Visualization | AYESMAJ Studios",
    description:
      "Building visualization for developments - the full volume, exploded levels, unit locations, amenities and exterior identity for sales and investors.",
    h1: "Show the scale before showing the unit.",
    blurb:
      "For buildings and developments the story starts above the unit: the full volume, exploded levels, where each residence sits, and what the lobby, amenities and roof promise buyers and investors.",
  },
  "/interior-design/ai-video-apartment": {
    title: "AI Apartment Walkthrough Video and Interior Film | AYESMAJ Studios",
    ogTitle: "AI Apartment Film | AYESMAJ Studios",
    description:
      "Cinematic AI apartment films - movement, light and atmosphere that let clients feel the space before it is built.",
    h1: "Turn the apartment plan into a journey.",
    blurb:
      "An apartment film walks the client from living room to balcony: movement, room sequence, light and atmosphere. Plans remain the spatial source of truth; the film moves the camera, not the walls.",
  },
  "/interior-design/ai-video-house": {
    title: "AI House Walkthrough Video and Property Film | AYESMAJ Studios",
    ogTitle: "AI House Film | AYESMAJ Studios",
    description:
      "Cinematic AI house films - arrival, flow and indoor-outdoor life for luxury presentation, marketing and homeowner approval.",
    h1: "Show the life between the rooms.",
    blurb:
      "A house film is about arrival and flow: the approach, the entry, the stair, the primary suite, and the moment the living room opens to the pool. It sells the life, not the drawing.",
  },
  "/interior-design/compare-visualization-methods": {
    title: "Compare Visualization Methods | AYESMAJ Studios",
    description:
      "Scan, 3D floor plan, render or AI video? Compare every visualization method by speed, clarity, realism and impact - and get the right stack for the next decision.",
    h1: "The best method depends on the next decision.",
    blurb:
      "None of the methods wins alone. Scans capture what exists, plans win layout approvals, renders carry material and light, film delivers emotion - the strongest presentations combine them in the right order.",
  },
  "/interior-design/complete-visual-presentation": {
    title: "Complete Visual Presentation | AYESMAJ Studios",
    description:
      "From one plan to a complete visual campaign: scans, 3D plans, imagery, film, identity, website and presentation as one modular system.",
    h1: "From one plan to a complete visual campaign.",
    blurb:
      "Visualization wins understanding; presentation wins decisions. Identity, website, deck and social content turn project visuals into a modular system built for approval, sales and launch.",
  },
  "/interior-design/client-presentation": {
    title: "Client Presentation Experiences | AYESMAJ Studios",
    description:
      "Do not send the client a folder of files. AYESMAJ builds branded presentation experiences - story, plans, rooms, materials, film and approvals in one place.",
    h1: "Give the client an experience, not a folder.",
    blurb:
      "A client presentation gathers the project story, floor plans, room views, materials, film and approval steps into one branded experience built for decisions.",
  },
  "/interior-design/kitchens": {
    image: "/interior-design/generated/og/kitchens.jpg",
    title: "Kitchen Design Visualization | AYESMAJ Studios",
    ogTitle: "Kitchen Visualization | AYESMAJ Studios",
    description:
      "Kitchen layouts, cabinetry, materials and photoreal 3D visualization - design the room everything revolves around, from plan to cinematic frame.",
    h1: "Design the room everything revolves around.",
    blurb:
      "Kitchen visualization from AYESMAJ Studios: layouts compared, cabinetry and appliance walls resolved, materials chosen in context, and the finished kitchen shown as photoreal imagery and film frames before anything is built.",
  },
  "/interior-design/bathrooms": {
    image: "/interior-design/generated/og/bathrooms.jpg",
    title: "Bathroom Design Visualization | AYESMAJ Studios",
    ogTitle: "Bathroom Visualization | AYESMAJ Studios",
    description:
      "Bathroom layouts, stone and fixture selection and photoreal 3D visualization - primary, compact and powder rooms resolved before construction.",
    h1: "Stone. Water. Light.",
    blurb:
      "Bathroom visualization from AYESMAJ Studios: layouts, primary and compact bathrooms, powder rooms, stone and fixture materials and before-and-after imagery of the same architecture.",
  },
  "/interior-design/furniture-decor": {
    image: "/interior-design/generated/og/furniture-decor.jpg",
    title: "Furniture & Decor Visualization | AYESMAJ Studios",
    ogTitle: "Furniture & Decor | AYESMAJ Studios",
    description:
      "Furniture layouts, material palettes and styled-room visualization - the same architectural shell empty and fully furnished, from reference direction to finished room.",
    h1: "The space is built. Now give it a life.",
    blurb:
      "Furniture and decor visualization from AYESMAJ Studios: the empty shell, the furniture plan, the reference direction and the styled finished room - living, bedroom and dining collections in one consistent language.",
  },
  "/interior-design/apartments": {
    image: "/interior-design/generated/og/apartments.jpg",
    title: "Apartment Visualization | AYESMAJ Studios",
    ogTitle: "Apartment Visualization | AYESMAJ Studios",
    description:
      "Apartment scans, clean plans, furnished 3D floor plans and photoreal rooms - see the entire apartment, then step inside, one consistent project from source to film frame.",
    h1: "See the entire apartment. Then step inside.",
    blurb:
      "Apartment visualization from AYESMAJ Studios: an existing-condition scan becomes a clean plan, a furnished 3D floor plan and photoreal living, kitchen, bedroom, bathroom and balcony imagery of the same apartment.",
  },
  "/interior-design/homes": {
    image: "/interior-design/generated/og/homes.jpg",
    title: "House Visualization | AYESMAJ Studios",
    ogTitle: "House Visualization | AYESMAJ Studios",
    description:
      "Complete house visualization - ground and upper 3D floor plans, cutaway, living, kitchen, primary suite, pool, garage and landscape of one consistent modern home, plus the house film.",
    h1: "Understand the whole home. Experience every part of it.",
    blurb:
      "House visualization from AYESMAJ Studios: one consistent modern home shown as 3D floor plans, a whole-house cutaway, room imagery, pool and outdoor living, garage, arrival and a continuous house film.",
  },
  "/interior-design/buildings": {
    image: "/interior-design/generated/og/buildings.jpg",
    title: "Building & Development Visualization | AYESMAJ Studios",
    ogTitle: "Building Visualization | AYESMAJ Studios",
    description:
      "Residential building and development visualization - the real PATEL tower model, exploded levels, unit selection, residence plans, lobby, amenities, rooftop and launch film.",
    h1: "From building model to a world buyers can enter.",
    blurb:
      "Building and development visualization from AYESMAJ Studios, built on the real PATEL Miami tower: interactive model, exploded levels, unit selection, residence plans, lobby and amenities, rooftop, residence interiors and the launch film.",
  },
  "/interior-design/case-studies": {
    title: "Interior Visualization Case Studies | AYESMAJ Studios",
    description:
      "Real projects taken from source material to complete visual worlds - a new-build villa, a Maison Valmont restoration and a Miami development.",
    h1: "From source material to complete visual world.",
    blurb:
      "Three real projects, three different communication problems: a new-build poolside villa, the restoration of Maison Valmont, and The Patel, a Miami residential development presented at two scales.",
  },
  "/interior-design/case-studies/poolside-villa": {
    title: "Poolside Villa Case Study | AYESMAJ Studios",
    description:
      "A new-build house taken from two floor plans to a 29-frame cinematic visual sequence - every room, both levels and the pool terrace.",
    h1: "Poolside Villa",
    blurb:
      "Two flat floor plans became a home the owners could walk through in their minds: twenty-nine master frames covering every room, both levels and the pool terrace, in one consistent architecture.",
  },
  "/interior-design/case-studies/maison-valmont": {
    title: "Maison Valmont Case Study | AYESMAJ Studios",
    description:
      "A restoration made visible: existing rooms, an eight-stage process, before-and-after pairs and a transformation film.",
    h1: "Maison Valmont",
    blurb:
      "The value of a restoration is invisible in ruined rooms. Before-and-after pairs made the decision tangible, an eight-stage sequence showed the path, and the transformation film delivered the reveal.",
  },
  "/interior-design/case-studies/the-patel": {
    title: "The Patel Case Study | AYESMAJ Studios",
    description:
      "A Miami residential tower presented at two scales - the building in its skyline, then Residence 1802 with its own plan and rooms.",
    h1: "The Patel",
    blurb:
      "A development sells twice: first the tower at skyline scale in its Miami light, then the drill-down into Residence 1802 with its own floor plan and rooms - carried by one project identity.",
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
  "/interior-design": "Interior design visualization",
  "/interior-design/kitchens": "Kitchen design visualization",
  "/interior-design/bathrooms": "Bathroom design visualization",
  "/interior-design/furniture-decor": "Furniture and decor visualization",
  "/interior-design/apartments": "Apartment design visualization",
  "/interior-design/homes": "House design visualization",
  "/interior-design/buildings": "Architectural building visualization",
  "/interior-design/ai-scan-apartment": "AI apartment scanning",
  "/interior-design/ai-scan-house": "AI house scanning",
  "/interior-design/3d-floor-plan-apartment": "3D floor plan design",
  "/interior-design/3d-floor-plan-house": "3D floor plan design",
  "/interior-design/3d-building-visualization": "Architectural building visualization",
  "/interior-design/ai-video-apartment": "AI interior video production",
  "/interior-design/ai-video-house": "AI interior video production",
  "/interior-design/complete-visual-presentation": "Visual presentation systems",
};
