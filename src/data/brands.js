/**
 * Central source of truth for all brand case studies.
 * Most assets live in /public/brands/{assetDir || id}/. Character and logo
 * studies use their dedicated top-level libraries.
 */

export const BRANDS = [
  {
    id: 'ashe',
    name: "ASHÉ",
    subtitle: "Ritual Roast",
    category: "Brand Identity & Campaign",
    accent: "#C8922A",
    description: "A dark, ritual-inspired coffee brand fusing spiritual depth with artisan roasting culture. Full visual identity, packaging, and campaign direction.",
    tags: ["Brand Identity", "Packaging", "Campaign"],
    year: "2024",
    images: ['1.webp','2.webp','3.webp','4.webp','5.webp','6.webp','7.webp','8.webp','9.webp','10.webp'],
    videos: [],
    featured: '1.webp',
    logo: 'logo ashe.webp',
    sections: [
      { title: 'Brand Identity', images: ['3.webp'] },
      { title: 'Digital Experience', images: ['1.webp', '2.webp'] },
      { title: 'Campaign', images: ['4.webp', '5.webp', '6.webp', '7.webp'] },
      { title: 'Packaging', images: ['8.webp', '9.webp', '10.webp'] },
    ],
  },
  {
    id: 'blenday',
    name: "BLENDAY",
    subtitle: "Blend the Day",
    category: "Brand Film & Motion",
    accent: "#9B59B6",
    description: "A vibrant frozen-fruit smoothie brand with cinematic product films, bold CGI splashes, and a 90s-inspired campaign aesthetic.",
    tags: ["Brand Film", "CGI", "Motion"],
    year: "2024",
    images: [
      'generated/identity/identity-system.webp',
      'generated/identity/logo-material.webp',
      'generated/packaging/packaging-lineup.webp',
      'generated/packaging/packaging-detail.webp',
      '1.webp',
      '2.webp',
      '3.webp',
      '4.webp',
      'generated/campaign/billboard.webp',
      'generated/web/website-responsive.webp',
      'generated/social/social-system.webp',
      'generated/environment/product-environment.webp',
      'generated/storyboard/storyboard.webp',
      'generated/film/film-keyframes.webp',
    ],
    videos: ['6.webm','7.webm'],
    featured: 'generated/master/brand-world-master.webp',
    logo: 'logo-generated.webp',
    sections: [
      { title: 'Identity & Materials', images: ['generated/identity/identity-system.webp', 'generated/identity/logo-material.webp'] },
      { title: 'Product Family & Packaging', images: ['generated/packaging/packaging-lineup.webp', 'generated/packaging/packaging-detail.webp'] },
      { title: 'Campaign System', images: ['1.webp', '2.webp', '3.webp', '4.webp', 'generated/campaign/billboard.webp'] },
      { title: 'Digital & Spatial Experience', images: ['generated/web/website-responsive.webp', 'generated/social/social-system.webp', 'generated/environment/product-environment.webp'] },
      { title: 'Storyboard & Film Direction', images: ['generated/storyboard/storyboard.webp', 'generated/film/film-keyframes.webp'] },
    ],
  },
  {
    id: 'boom-chica',
    name: "BOOM CHICKA POP",
    subtitle: "Pop the Moment",
    category: "Product Campaign",
    accent: "#E91E8C",
    description: "High-energy product campaign for the cult-favourite snack brand. Bold colours, lifestyle visuals and punchy art direction.",
    tags: ["Campaign", "Product", "Packaging", "Art Direction"],
    year: "2024",
    images: ['1.webp','2.webp','3.webp'],
    videos: [],
    featured: '1.webp',
    logo: 'logo-generated.webp',
    sections: [
      { title: 'Strawberry Edition', images: ['1.webp'] },
      { title: 'Chocolate Almond Edition', images: ['2.webp'] },
      { title: 'Campaign Art Direction', images: ['3.webp'] },
    ],
  },
  {
    id: 'lacroix',
    name: "LaCROIX",
    subtitle: "Sparkling Identity",
    category: "CGI Commercial & Brand",
    accent: "#5BCA6A",
    description: "A sparkling water brand reimagined through CGI product renders, slow-motion liquid VFX, and a lively social campaign.",
    tags: ["CGI", "Commercial", "Packaging", "3D Render"],
    year: "2025",
    images: ['1.webp','2.webp','3.webp'],
    videos: ['4.webm'],
    featured: '1.webp',
    logo: 'logo-generated.webp',
    sections: [
      { title: 'Campaign Visuals', images: ['1.webp', '2.webp'] },
      { title: 'CGI Renders', images: ['3.webp'] },
    ],
  },
  {
    id: 'honey',
    name: "HONEY",
    subtitle: "Golden Standard",
    category: "Brand Film",
    accent: "#F5A623",
    description: "A premium honey brand film — warm amber tones, slow macro shots and cinematic liquid pours bringing nature's gold to life.",
    tags: ["Brand Film", "Motion", "Product", "Packaging"],
    year: "2025",
    images: ['1.webp'],
    videos: ['2.webm'],
    featured: '1.webp',
    logo: 'logo-generated.webp',
  },
  {
    id: 'butterfly',
    name: "BUTTERFLY",
    subtitle: "The Metamorphosis Collection",
    category: "CGI & Character Design",
    accent: "#7B68EE",
    description: "A conceptual CGI fashion project exploring transformation. High-fidelity 3D renders, character rigs and ethereal visual language.",
    tags: ["CGI", "Character Design", "Fashion"],
    year: "2025",
    images: ['1.webp','2.webp','3.webp','4.webp','5.webp','6.webp','7.webp','8.webp','9.webp','10.webp','11.webp','12.webp','13.webp','14.webp','15.webp'],
    videos: [],
    featured: '1.webp',
    logo: 'logo-generated.webp',
    sections: [
      { title: 'Headwear', images: ['1.webp', '4.webp', '7.webp'] },
      { title: 'Apparel', images: ['9.webp', '10.webp', '11.webp', '12.webp', '13.webp'] },
      { title: 'Design & Patterns', images: ['2.webp', '3.webp', '5.webp', '6.webp', '8.webp', '14.webp', '15.webp'] },
    ],
  },
  {
    id: 'paranormal',
    name: "PARANORMAL",
    subtitle: "Beyond the Frame",
    category: "Premium Spirits Identity & Packaging",
    accent: "#8B0000",
    description: "A horror-meets-fine-art creative campaign. Eerie atmosphere, unsettling beauty and avant-garde visual storytelling.",
    tags: ["Brand Identity", "Packaging", "Campaign", "Art Direction"],
    year: "2025",
    images: ['1.webp','2.webp','3.webp','4.webp','5.webp','6.webp'],
    videos: [],
    featured: '1.webp',
    logo: 'logo-generated.webp',
    sections: [
      { title: 'Product Design', images: ['1.webp', '2.webp'] },
      { title: 'Campaign Visuals', images: ['3.webp', '4.webp', '5.webp', '6.webp'] },
    ],
  },
  {
    id: 'pita-basta',
    name: "PITA BASTA",
    subtitle: "Street Food Elevated",
    category: "Brand Identity & Packaging",
    accent: "#E8A87C",
    description: "A bold Middle-Eastern street food brand elevated through contemporary design — vibrant identity, packaging system and collateral.",
    tags: ["Brand Identity", "Packaging", "Food"],
    year: "2025",
    images: ['1.webp','2.webp','3.webp','4.webp','5.webp','6.webp','7.webp','8.webp','9.webp','10.webp','11.webp'],
    videos: [],
    featured: '1.webp',
    logo: '1.webp',
    sections: [
      { title: 'Logo & Mark', images: ['1.webp'] },
      { title: 'Packaging', images: ['2.webp', '3.webp', '4.webp', '5.webp', '6.webp', '7.webp', '8.webp', '9.webp', '10.webp'] },
      { title: 'Production Files', images: ['11.webp'] },
    ],
  },
  {
    id: 'baron-herzog',
    name: "BARON HERZOG",
    subtitle: "Fine Wine Collection",
    category: "Luxury Brand Identity",
    accent: "#722F37",
    description: "A prestige kosher wine label reimagined — heritage meets modern luxury through refined typography, gold foil concepts and cellar-to-table storytelling.",
    tags: ["Luxury", "Brand Identity", "Wine"],
    year: "2025",
    images: ['1.webp', 'Gemini_Generated_Image_das3i5sas3i5sas3i.webp'],
    videos: [],
    featured: '1.webp',
    logo: 'logo-generated.webp',
    sections: [
      { title: 'Identity & Packaging', images: ['1.webp'] },
      { title: 'Campaign Visuals', images: ['Gemini_Generated_Image_das3i5sas3i5sas3i.webp'] },
    ],
  },
  {
    id: 'arizona-chimney-pros',
    assetDir: 'arizona chimney pros',
    name: "ARIZONA CHIMNEY PROS",
    subtitle: "Service Brand, Built to Convert",
    category: "Service Brand Identity & Campaign",
    accent: "#F16A17",
    description: "A direct-response service brand that pairs Arizona warmth with credible field imagery and a disciplined black, orange, and brass campaign system.",
    tags: ["Brand Identity", "Campaign", "Art Direction", "Local Service", "Web Design"],
    year: "2026",
    images: [
      'logo on white 2.webp',
      'ChatGPT Image Mar 27, 2026, 02_59_28 PM.webp',
      'ChatGPT Image May 24, 2026, 05_49_01 PM (1).webp',
      'ChatGPT Image May 24, 2026, 05_49_01 PM (2).webp',
      'ChatGPT Image May 24, 2026, 05_49_01 PM (3).webp',
      'ChatGPT Image May 24, 2026, 05_49_01 PM (4).webp',
      'ChatGPT Image May 24, 2026, 05_49_02 PM (8).webp',
      'ChatGPT Image May 27, 2026, 01_39_25 PM.webp',
      'ChatGPT Image May 27, 2026, 01_39_30 PM.webp',
      'ChatGPT Image May 27, 2026, 01_39_35 PM.webp',
      'ChatGPT Image May 27, 2026, 01_45_05 PM (1).webp',
      'ChatGPT Image May 27, 2026, 01_45_06 PM (6).webp',
      'ChatGPT Image May 27, 2026, 01_45_06 PM (8).webp',
    ],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/arizona-chimney-pros.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image May 27, 2026, 01_45_06 PM (8).webp',
    logo: 'logo on white 2.webp',
    sections: [
      { title: 'Identity', images: ['logo on white 2.webp', 'ChatGPT Image Mar 27, 2026, 02_59_28 PM.webp'] },
      { title: 'Campaign & Service Story', images: ['ChatGPT Image May 24, 2026, 05_49_01 PM (1).webp', 'ChatGPT Image May 24, 2026, 05_49_01 PM (2).webp', 'ChatGPT Image May 24, 2026, 05_49_01 PM (3).webp', 'ChatGPT Image May 24, 2026, 05_49_01 PM (4).webp', 'ChatGPT Image May 24, 2026, 05_49_02 PM (8).webp', 'ChatGPT Image May 27, 2026, 01_45_06 PM (8).webp'] },
      { title: 'Social System', images: ['ChatGPT Image May 27, 2026, 01_39_25 PM.webp', 'ChatGPT Image May 27, 2026, 01_39_30 PM.webp', 'ChatGPT Image May 27, 2026, 01_39_35 PM.webp', 'ChatGPT Image May 27, 2026, 01_45_05 PM (1).webp', 'ChatGPT Image May 27, 2026, 01_45_06 PM (6).webp'] },
    ],
  },
  {
    id: 'ayesmaj-studios',
    assetDir: 'ayesmaj studios',
    name: "AYESMAJ STUDIOS",
    subtitle: "We Build Brands. We Create Worlds.",
    category: "Creative Studio Identity & Motion",
    accent: "#D8B75A",
    description: "A cinematic studio identity built around transformation: a sharp monogram, prismatic light, and distinct creative worlds held together by one premium digital system.",
    tags: ["Brand Identity", "Motion", "Campaign", "Creative Direction", "Web Design"],
    year: "2026",
    images: ['logo ayesmaj color.webp', 'ChatGPT Image Jun 24, 2026, 05_18_25 PM.webp', 'ChatGPT Image Aug 4, 2026, 06_53_51 PM.webp', 'ChatGPT Image Aug 5, 2026, 12_02_52 AM.webp'],
    videos: [
      { src: 'logo-intro.webm', title: 'Logo Motion' },
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/ayesmaj-studios.mp4', title: 'Studio Website Walkthrough' },
    ],
    featured: 'ChatGPT Image Aug 4, 2026, 06_53_51 PM.webp',
    logo: 'logo ayesmaj color.webp',
    sections: [
      { title: 'Identity', images: ['logo ayesmaj color.webp', 'ChatGPT Image Jun 24, 2026, 05_18_25 PM.webp'] },
      { title: 'Brand World & Campaign', images: ['ChatGPT Image Aug 4, 2026, 06_53_51 PM.webp', 'ChatGPT Image Aug 5, 2026, 12_02_52 AM.webp'] },
    ],
  },
  {
    id: 'casa-ora',
    assetDir: 'casa ora',
    name: "CASA ORA",
    subtitle: "Design-Build, Made Clear",
    category: "Brand Identity & Digital Experience",
    accent: "#B88A48",
    description: "A calm digital service brand that balances high-end residential taste with operational clarity across homeowner, contractor, and guest experiences.",
    tags: ["Brand Identity", "UI/UX", "Digital Product", "Web Design"],
    year: "2026",
    images: ['casa ora logo.webp', 'logo casa ora shape and text.webp', 'logo casa ora shape.webp', 'ChatGPT Image May 25, 2026, 01_42_17 PM.webp', 'ChatGPT Image May 25, 2026, 01_53_30 PM.webp', 'ChatGPT Image May 25, 2026, 02_11_32 PM.webp', 'ChatGPT Image May 25, 2026, 0s1_56_06 PM.webp', 'ChatGPT Image May 25, 2026, 09_17_19 PM.webp'],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/casa-ora.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image May 25, 2026, 01_53_30 PM.webp',
    logo: 'logo casa ora shape and text.webp',
    sections: [
      { title: 'Logo System', images: ['casa ora logo.webp', 'logo casa ora shape and text.webp', 'logo casa ora shape.webp'] },
      { title: 'Digital Service System', images: ['ChatGPT Image May 25, 2026, 01_42_17 PM.webp', 'ChatGPT Image May 25, 2026, 01_53_30 PM.webp', 'ChatGPT Image May 25, 2026, 02_11_32 PM.webp', 'ChatGPT Image May 25, 2026, 0s1_56_06 PM.webp'] },
      { title: 'Campaign & Launch', images: ['ChatGPT Image May 25, 2026, 09_17_19 PM.webp'] },
    ],
  },
  {
    id: 'electric-fuel-america',
    assetDir: 'electric fuel america',
    name: "ELECTRIC FUEL AMERICA",
    subtitle: "Powering the Mission",
    category: "Technology Brand & Campaign",
    accent: "#D81824",
    description: "A mission-ready visual system translating advanced battery engineering into a clear defense narrative across land, sea, air, space, and soldier applications.",
    tags: ["Brand Identity", "Campaign", "Art Direction", "Web Design"],
    year: "2026",
    images: ['electric-fuel-america-logo.webp', 'ChatGPT Image Jul 31, 2026, 05_51_57 PM.webp', 'ChatGPT Image Aug 3, 2026, 05_37_16 PM.webp', 'ChatGPT Image Jul 31, 2026, 06_18_22 PM.webp', 'ChatGPT Image Aug 4, 2026, 06_54_49 PM.webp'],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/electric-fuel-america.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image Jul 31, 2026, 06_18_22 PM.webp',
    logo: 'electric-fuel-america-logo.webp',
    sections: [
      { title: 'Identity', images: ['electric-fuel-america-logo.webp'] },
      { title: 'Mission & Product Story', images: ['ChatGPT Image Jul 31, 2026, 05_51_57 PM.webp', 'ChatGPT Image Aug 3, 2026, 05_37_16 PM.webp'] },
      { title: 'Campaign & Digital', images: ['ChatGPT Image Jul 31, 2026, 06_18_22 PM.webp', 'ChatGPT Image Aug 4, 2026, 06_54_49 PM.webp'] },
    ],
  },
  {
    id: 'happy-jack-whiskey',
    assetDir: 'happy jack - whiskey',
    name: "HAPPY JACK DISTILLERS",
    subtitle: "High-Country Arizona Whiskey",
    category: "Brand Identity & Packaging",
    accent: "#B8792D",
    description: "A high-country whiskey identity shaped by Arizona landscape, handcrafted detail, and a restrained copper-and-black visual language with cinematic warmth.",
    tags: ["Brand Identity", "Packaging", "Product", "Art Direction", "Web Design"],
    year: "2026",
    images: ['happy-jack-logo-transparent.webp', 'happy-jack-bottle.webp', 'Happy Jack Distillers (1).webp', 'Happy Jack Distillers (2).webp', 'Happy Jack Distillers (3).webp'],
    videos: [],
    featured: 'Happy Jack Distillers (3).webp',
    logo: 'happy-jack-logo-transparent.webp',
    sections: [
      { title: 'Identity', images: ['happy-jack-logo-transparent.webp'] },
      { title: 'Packaging & Product', images: ['happy-jack-bottle.webp', 'Happy Jack Distillers (2).webp'] },
      { title: 'Brand & Digital Story', images: ['Happy Jack Distillers (1).webp', 'Happy Jack Distillers (3).webp'] },
    ],
  },
  {
    id: 'kolie',
    assetDir: 'kolie',
    name: "KOLIE",
    subtitle: "The AI Phone Agent",
    category: "AI Brand Identity & Product",
    accent: "#145BFF",
    description: "A friendly AI phone-agent brand combining an approachable bot character with a rigorous blue product system for calls, scheduling, and customer operations.",
    tags: ["Brand Identity", "AI Product", "Campaign", "Web Design"],
    year: "2026",
    images: ['logo kolie.webp', 'ChatGPT Image Jul 1, 2026, 02_01_25 PM.webp', 'ChatGPT Image Jul 15, 2026, 03_55_35 PM.webp', 'ChatGPT Image Jun 28, 2026, 08_11_40 PM.webp', 'ChatGPT Image Jun 28, 2026, 08_11_46 PM.webp', 'ChatGPT Image Jul 14, 2026, 08_44_58 PM.webp', 'ChatGPT Image Jul 14, 2026, 08_46_26 PM.webp', 'ChatGPT Image Jul 15, 2026, 06_11_15 PM.webp', 'ChatGPT Image Jul 15, 2026, 10_34_22 PM.webp', 'ChatGPT Image Jul 20, 2026, 08_57_08 PM.webp', 'ChatGPT Image Jun 28, 2026, 06_59_41 PM.webp'],
    videos: [
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/kolie.mp4', title: 'Website Walkthrough' },
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/ai-videos/kolie-ad.mp4', title: 'AI Launch Film' },
    ],
    featured: 'ChatGPT Image Jun 28, 2026, 08_11_46 PM.webp',
    logo: 'logo kolie.webp',
    sections: [
      { title: 'Identity', images: ['logo kolie.webp'] },
      { title: 'Campaign & Launch', images: ['ChatGPT Image Jul 1, 2026, 02_01_25 PM.webp', 'ChatGPT Image Jul 15, 2026, 03_55_35 PM.webp', 'ChatGPT Image Jun 28, 2026, 08_11_40 PM.webp', 'ChatGPT Image Jun 28, 2026, 08_11_46 PM.webp'] },
      { title: 'Product & Brand System', images: ['ChatGPT Image Jul 14, 2026, 08_44_58 PM.webp', 'ChatGPT Image Jul 14, 2026, 08_46_26 PM.webp', 'ChatGPT Image Jul 15, 2026, 06_11_15 PM.webp', 'ChatGPT Image Jul 15, 2026, 10_34_22 PM.webp', 'ChatGPT Image Jul 20, 2026, 08_57_08 PM.webp', 'ChatGPT Image Jun 28, 2026, 06_59_41 PM.webp'] },
    ],
  },
  {
    id: 'podos-ai',
    assetDir: 'podos ai',
    name: "PODOS AI",
    subtitle: "AI Infrastructure, Engineered to Scale",
    category: "AI Product Visualization & Brand",
    accent: "#1BB6D4",
    description: "A product-led visual world for modular AI infrastructure, combining engineered precision, scale cues, technical cutaways, and launch-ready investor storytelling.",
    tags: ["Brand Identity", "Product Visualization", "CGI", "Campaign", "Web Design"],
    year: "2026",
    images: ['podos logo.webp', 'hero_dense_01.webp', 'ChatGPT Image May 13, 2026, 12_30_47 AM.webp', 'ChatGPT Image May 6, 2026, 06_53_12 PM.webp', 'ChatGPT Image May 17, 2026, 02_38_48 PM (5).webp', 'ChatGPT Image May 17, 2026, 02_42_32 PM (8).webp', 'ChatGPT Image May 17, 2026, 03_29_19 PM (4).webp', 'ChatGPT Image May 17, 2026, 03_29_21 PM (10).webp', 'ChatGPT Image May 17, 2026, 03_46_21 PM.webp', 'ChatGPT Image May 17, 2026, 03_49_15 PM.webp', 'ChatGPT Image May 31, 2026, 07_01_02 PM.webp', 'ChatGPT Image May 7, 2026, 02_54_05 PM.webp', 'ChatGPT Image May 7, 2026, 02_56_48 PM.webp', 'ChatGPT Image May 7, 2026, 03_31_52 PM.webp'],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/podos-ai.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image May 17, 2026, 03_29_19 PM (4).webp',
    logo: 'podos logo.webp',
    sections: [
      { title: 'Identity', images: ['podos logo.webp'] },
      { title: 'Hero & Product Overview', images: ['hero_dense_01.webp', 'ChatGPT Image May 13, 2026, 12_30_47 AM.webp', 'ChatGPT Image May 6, 2026, 06_53_12 PM.webp'] },
      { title: 'Product Visualization & Technical Story', images: ['ChatGPT Image May 17, 2026, 02_38_48 PM (5).webp', 'ChatGPT Image May 17, 2026, 02_42_32 PM (8).webp', 'ChatGPT Image May 17, 2026, 03_29_19 PM (4).webp', 'ChatGPT Image May 17, 2026, 03_29_21 PM (10).webp', 'ChatGPT Image May 17, 2026, 03_46_21 PM.webp', 'ChatGPT Image May 17, 2026, 03_49_15 PM.webp', 'ChatGPT Image May 31, 2026, 07_01_02 PM.webp', 'ChatGPT Image May 7, 2026, 02_54_05 PM.webp', 'ChatGPT Image May 7, 2026, 02_56_48 PM.webp', 'ChatGPT Image May 7, 2026, 03_31_52 PM.webp'] },
    ],
  },
  {
    id: 'rebound',
    assetDir: 'rebound',
    name: "REBOUND AESTHETICS",
    subtitle: "Restore. Renew. Rebound.",
    category: "Beauty Brand Identity & Campaign",
    accent: "#B88749",
    description: "A restorative skincare system built from soft natural light, tactile stone, warm metallic detail, and a consultation-first website experience.",
    tags: ["Brand Identity", "Product", "Campaign", "Web Design"],
    year: "2026",
    images: ['rebound logo.webp', 'rebound shape logo.webp', 'ChatGPT Image Jun 8, 2026, 05_06_56 PM (10).webp', 'ChatGPT Image Jun 8, 2026, 08_17_45 PM.webp', 'ChatGPT Image Jun 8, 2026, 09_39_14 PM.webp', 'ChatGPT Image Jun 8, 2026, 10_10_29 PM.webp', 'ChatGPT Image Jun 8, 2026, 05_06_55 PM (5).webp', 'ChatGPT Image Jun 8, 2026, 05_06_55 PM (8).webp', 'ChatGPT Image Jun 8, 2026, 09_10_36 PM (2).webp', 'ChatGPT Image Jun 8, 2026, 09_10_36 PM (4).webp', 'ChatGPT Image Jun 8, 2026, 09_10_37 PM (6).webp'],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/rebound-skincare.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image Jun 8, 2026, 08_17_45 PM.webp',
    logo: 'rebound logo.webp',
    sections: [
      { title: 'Identity', images: ['rebound logo.webp', 'rebound shape logo.webp'] },
      { title: 'Campaign & Digital Experience', images: ['ChatGPT Image Jun 8, 2026, 05_06_56 PM (10).webp', 'ChatGPT Image Jun 8, 2026, 08_17_45 PM.webp', 'ChatGPT Image Jun 8, 2026, 09_39_14 PM.webp', 'ChatGPT Image Jun 8, 2026, 10_10_29 PM.webp'] },
      { title: 'Product Imagery & Visual System', images: ['ChatGPT Image Jun 8, 2026, 05_06_55 PM (5).webp', 'ChatGPT Image Jun 8, 2026, 05_06_55 PM (8).webp', 'ChatGPT Image Jun 8, 2026, 09_10_36 PM (2).webp', 'ChatGPT Image Jun 8, 2026, 09_10_36 PM (4).webp', 'ChatGPT Image Jun 8, 2026, 09_10_37 PM (6).webp'] },
    ],
  },
  {
    id: 'syntropic',
    assetDir: 'syntropic',
    name: "SYNTROPIC",
    subtitle: "Intelligence in Motion",
    category: "AI Brand Identity & Motion",
    accent: "#8D4FFF",
    description: "A luminous identity for an AI efficiency layer, using flowing data lines, electric gradients, and glass-like product storytelling to make system performance tangible.",
    tags: ["Brand Identity", "Motion", "Campaign", "Web Design"],
    year: "2026",
    images: ['syntropic-logo.webp', 'wordmark-white.webp', 'ChatGPT Image May 18, 2026, 09_14_33 PM.webp', 'ChatGPT Image May 11, 2026, 06_19_50 PM.webp', 'ChatGPT Image May 19, 2026, 03_55_37 PM.webp', 'ChatGPT Image May 21, 2026, 06_37_18 PM.webp'],
    videos: [
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/syntropic.mp4', title: 'Website Walkthrough' },
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/ai-videos/syntropic-3d.mp4', title: '3D Explainer' },
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/ai-videos/syntropic-53.mp4', title: 'Concept Film' },
    ],
    featured: 'ChatGPT Image May 11, 2026, 06_19_50 PM.webp',
    logo: 'syntropic-logo.webp',
    sections: [
      { title: 'Identity', images: ['syntropic-logo.webp', 'wordmark-white.webp'] },
      { title: 'Product & Digital Experience', images: ['ChatGPT Image May 18, 2026, 09_14_33 PM.webp'] },
      { title: 'Campaign & Motion', images: ['ChatGPT Image May 11, 2026, 06_19_50 PM.webp', 'ChatGPT Image May 19, 2026, 03_55_37 PM.webp', 'ChatGPT Image May 21, 2026, 06_37_18 PM.webp'] },
    ],
  },
  {
    id: 'vudu-energy-drink',
    assetDir: 'vudu - energy drink',
    name: "VUDU ENERGY",
    subtitle: "Zero Sugar. Full Voltage.",
    category: "Beverage Brand Identity & Packaging",
    accent: "#16B9BC",
    description: "A high-energy beverage identity built around a fluid V mark, saturated flavor coding, condensation, and explosive product-centered composition.",
    tags: ["Brand Identity", "Packaging", "Product", "Campaign", "Web Design"],
    year: "2026",
    images: ['vudu logo.webp', 'ChatGPT Image Mar 20, 2026, 05_32_11 PM.webp', 'ChatGPT Image Mar 20, 2026, 06_45_45 PM-gigapixel-art-scale-2_00x.webp', 'ChatGPT Image Mar 20, 2026, 06_52_43 PM.webp', 'ChatGPT Image Mar 20, 2026, 06_54_52 PM.webp', 'peach mango-gigapixel-standard-scale-2_00x (1).webp', 'IMG_4249-gigapixel-art-scale-6_00x.webp', 'IMG_4250-gigapixel-art-scale-6_00x.webp', 'IMG_4251-gigapixel-art-scale-6_00x.webp'],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/vudu-energy.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image Mar 20, 2026, 06_45_45 PM-gigapixel-art-scale-2_00x.webp',
    logo: 'vudu logo.webp',
    sections: [
      { title: 'Identity', images: ['vudu logo.webp'] },
      { title: 'Packaging & Flavor System', images: ['ChatGPT Image Mar 20, 2026, 05_32_11 PM.webp', 'ChatGPT Image Mar 20, 2026, 06_45_45 PM-gigapixel-art-scale-2_00x.webp', 'ChatGPT Image Mar 20, 2026, 06_52_43 PM.webp', 'ChatGPT Image Mar 20, 2026, 06_54_52 PM.webp', 'peach mango-gigapixel-standard-scale-2_00x (1).webp'] },
      { title: 'Product Campaign & Photography', images: ['IMG_4249-gigapixel-art-scale-6_00x.webp', 'IMG_4250-gigapixel-art-scale-6_00x.webp', 'IMG_4251-gigapixel-art-scale-6_00x.webp'] },
    ],
  },
  {
    id: 'characters',
    name: "CHARACTER DESIGN",
    subtitle: "Mascots, Portraits & Spec Studies",
    category: "3D Character & Concept Art",
    accent: "#FFD700",
    description: "A wide character-design study spanning original mascots, cinematic portraits, and clearly labeled pop-culture remix concepts. Presented as still-image exploration and visual development.",
    tags: ["CGI", "Character Design", "3D", "Concept Art"],
    year: "2024",
    assetBase: '/characters',
    images: ['1.webp','2.webp','3.webp','4.webp','5.webp','6.webp','7.webp','8.webp','9.webp','10.webp','11.webp','12.webp','13.webp','14.webp','15.webp','16.webp','17.webp','18.webp','19.webp','20.webp','21.webp','22.webp','23.webp','24.webp','25.webp','26.webp','27.webp','28.webp','29.webp','30.webp','31.webp','32.webp'],
    videos: [],
    featured: '1.webp',
    sections: [
      { title: 'Mascot & Character Studies', images: ['1.webp','4.webp','13.webp','18.webp','19.webp','20.webp','22.webp','24.webp','28.webp','31.webp'] },
      { title: 'Cinematic Character Portraits', images: ['5.webp','6.webp','7.webp','8.webp','9.webp','10.webp','11.webp'] },
      { title: 'Pop-Culture Remix / Spec Studies', images: ['2.webp','3.webp','12.webp','14.webp','15.webp','16.webp','17.webp','21.webp','23.webp','25.webp','26.webp','27.webp','29.webp','30.webp','32.webp'] },
    ],
  },
  {
    id: 'noam',
    name: "NOAM",
    subtitle: "Portable Sound, Visualized",
    category: "Product CGI & Motion",
    accent: "#E8E8E8",
    description: "A rugged portable speaker visualized from multiple design angles through high-resolution modeling, lighting studies, color variants, and cinematic motion frames.",
    tags: ["Product Visualization", "CGI", "Motion", "3D Render"],
    year: "2024",
    images: ['logo.webp','1.webp','2.webp','3.webp','4.webp','5.webp','6.webp','7.webp','8.webp','9.webp','10.webp','11.webp','12.webp','13.webp','14.webp','15.webp'],
    videos: ['16.webm','17.webm','18.webm','19.webm','20.webm'],
    featured: 'logo.webp',
    logo: 'logo.webp',
    sections: [
      { title: 'Brand Identity', images: ['logo.webp'] },
      { title: 'Product Range', images: ['1.webp','2.webp','3.webp','4.webp','5.webp','6.webp','7.webp','8.webp','9.webp','10.webp','11.webp','12.webp','13.webp','14.webp','15.webp'] },
    ],
  },
  {
    id: 'interior-design',
    name: "INTERIOR DESIGN",
    subtitle: "Space as Canvas",
    category: "Architectural Visualisation",
    accent: "#D2A679",
    description: "Photoreal architectural visualization of bespoke interiors, balancing warm materials, precise staging, rich ambient light, and commercial spatial storytelling.",
    tags: ["Architectural Visualization", "3D Render", "Interior", "CGI"],
    year: "2024",
    images: ['1.webp','2.webp','3.webp','4.webp','5.webp','6.webp','7.webp','8.webp','9.webp','10.webp','11.webp','12.webp','13.webp','14.webp','15.webp','16.webp','17.webp','18.webp'],
    videos: [],
    featured: '1.webp',
    sections: [
      { title: 'Showroom & Retail', images: ['1.webp','2.webp','3.webp','4.webp','5.webp','6.webp'] },
      { title: 'Living Spaces', images: ['7.webp','8.webp','9.webp','10.webp','11.webp','12.webp'] },
      { title: 'Detail Shots', images: ['13.webp','14.webp','15.webp','16.webp','17.webp','18.webp'] },
    ],
  },
  {
    id: 'logos',
    name: "BRAND IDENTITIES",
    subtitle: "Logo & Mark Systems",
    category: "Identity Design",
    accent: "#00C46A",
    description: "A curated collection of logo marks, wordmarks and full identity systems created for clients across tech, hospitality and lifestyle sectors.",
    tags: ["Logo", "Brand Identity", "Identity System"],
    year: "2024–25",
    assetBase: '/logos',
    images: ['1.webp','2.webp','3.webp','4.webp','5.webp','6.webp','7.webp','8.webp','9.webp','10.webp','11.webp','12.webp','13.webp','14.webp','15.webp','16.webp','17.webp','18.webp','19.webp','20.webp'],
    videos: [],
    featured: '1.webp',
    sections: [
      { title: 'Logo Marks', images: ['1.webp','4.webp','6.webp','8.webp','9.webp','10.webp','12.webp','13.webp','14.webp','16.webp','17.webp','19.webp'] },
      { title: 'Optimus Identity System', images: ['2.webp','5.webp','7.webp','15.webp'] },
      { title: 'SST Identity System', images: ['3.webp','11.webp'] },
      { title: 'AYESMAJ Studio Identities', images: ['18.webp','20.webp'] },
    ],
  },
  {
    id: 'general',
    name: "GENERAL WORK",
    subtitle: "Creative Miscellany",
    category: "Mixed Media",
    accent: "#A0A0A0",
    description: "A selection of creative work spanning photography, digital art, and experimental visuals that don't fit neatly into a single category.",
    tags: ["Photography", "Digital Art", "Experimental"],
    year: "2024–25",
    images: ['1.webp','2.webp','3.webp','4.webp','5.webp','6.webp'],
    videos: [],
    featured: '1.webp',
    sections: [
      { title: 'Product CGI', images: ['1.webp', '2.webp'] },
      { title: 'Campaign Visuals', images: ['3.webp', '4.webp'] },
      { title: 'Digital Art', images: ['5.webp', '6.webp'] },
    ],
  },
];

// Curated brand-world expansions generated from each project's real source
// material. Originals stay in place; these assets complete the presentation
// with the same identity -> product -> campaign -> digital -> film rhythm used
// by the BLENDAY case study.
const BRAND_WORLD_EXPANSIONS = {
  'arizona-chimney-pros': {
    sections: [
      ['Complete Brand World', ['generated/master/brand-world-master.webp']],
      ['Campaign & Social System', ['generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Service Story', ['generated/storyboard/from-outdated-to-centerpiece.webp', 'generated/storyboard/storyboard.webp']],
    ],
  },
  ashe: {
    sections: [
      ['Complete Brand World', ['generated/master/brand-world-master.webp']],
      ['Campaign & Social System', ['generated/social/social-system.webp']],
      ['Storyboard & Film Direction', ['generated/storyboard/from-origin-to-ritual.webp', 'generated/storyboard/storyboard.webp']],
    ],
  },
  'ayesmaj-studios': {
    sections: [
      ['Complete Studio World', ['generated/master/brand-world-master.webp']],
      ['Campaign & Social System', ['generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Motion Direction', ['generated/storyboard/building-a-brand-world.webp', 'generated/storyboard/storyboard.webp']],
    ],
  },
  'baron-herzog': {
    sections: [
      ['Complete Brand World', ['generated/master/brand-world-master.webp']],
      ['Packaging System', ['generated/packaging/packaging-lineup.webp', 'generated/packaging/packaging-detail.webp']],
      ['Campaign & Social System', ['generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Film Direction', ['generated/storyboard/storyboard.webp']],
    ],
  },
  'boom-chica': {
    sections: [
      ['Complete Brand World', ['generated/master/brand-world-master.webp']],
      ['Product Family & Packaging', ['generated/packaging/packaging-lineup.webp', 'generated/packaging/packaging-detail.webp']],
      ['Campaign & Social System', ['generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Film Direction', ['generated/storyboard/storyboard.webp']],
    ],
  },
  butterfly: {
    sections: [
      ['Complete Fashion World', ['generated/master/brand-world-master.webp']],
      ['CGI Hero', ['generated/cgi/cgi-hero.webp']],
      ['Campaign & Social System', ['generated/campaign/campaign-system.webp', 'generated/social/social-system.webp']],
      ['Storyboard & Motion Direction', ['generated/storyboard/storyboard.webp']],
    ],
  },
  'casa-ora': {
    sections: [
      ['Complete Digital Brand World', ['generated/master/brand-world-master.webp']],
      ['Product Touchpoints', ['generated/packaging/packaging-lineup.webp', 'generated/packaging/packaging-detail.webp']],
      ['Campaign & Social System', ['generated/social/social-system.webp']],
      ['Storyboard & Customer Journey', ['generated/storyboard/storyboard.webp']],
    ],
  },
  'electric-fuel-america': {
    sections: [
      ['Complete Mission World', ['generated/master/brand-world-master.webp']],
      ['Campaign System', ['generated/campaign/campaign-system.webp', 'generated/social/social-system.webp']],
      ['Storyboard & Mission Sequence', ['generated/storyboard/power-across-every-domain.webp', 'generated/storyboard/storyboard.webp']],
    ],
  },
  general: {
    sections: [
      ['Experimental Archive', ['generated/master/brand-world-master.webp', 'generated/identity/identity-system.webp']],
      ['Campaign & Social Studies', ['generated/social/social-system.webp']],
      ['Storyboard Studies', ['generated/storyboard/storyboard.webp']],
    ],
  },
  'happy-jack-whiskey': {
    sections: [
      ['Complete Brand World', ['generated/master/brand-world-master.webp']],
      ['Campaign & Social System', ['generated/campaign/campaign-system.webp', 'generated/social/social-system.webp']],
      ['Storyboard & Film Direction', ['generated/storyboard/storyboard.webp']],
    ],
  },
  honey: {
    sections: [
      ['Complete Brand World', ['generated/master/brand-world-master.webp']],
      ['Product Family & Packaging', ['generated/packaging/packaging-lineup.webp', 'generated/packaging/packaging-detail.webp']],
      ['Campaign & Social System', ['generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Film Direction', ['generated/storyboard/storyboard.webp']],
    ],
  },
  'interior-design': {
    sections: [
      ['Complete Spatial World', ['generated/master/brand-world-master.webp']],
      ['Identity & Material System', ['generated/identity/identity-system.webp']],
      ['CGI Hero', ['generated/cgi/cgi-hero.webp']],
      ['Campaign & Social System', ['generated/campaign/campaign-system.webp', 'generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Spatial Journey', ['generated/storyboard/storyboard.webp']],
    ],
  },
  kolie: {
    sections: [
      ['Complete Product World', ['generated/master/brand-world-master.webp']],
      ['Campaign & Social System', ['generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Product Story', ['generated/storyboard/the-call-you-almost-missed.webp', 'generated/storyboard/storyboard.webp']],
    ],
  },
  lacroix: {
    sections: [
      ['Complete Brand World', ['generated/master/brand-world-master.webp']],
      ['Product Family & Packaging', ['generated/packaging/packaging-lineup.webp', 'generated/packaging/packaging-detail.webp']],
      ['Campaign & Social System', ['generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Film Direction', ['generated/storyboard/storyboard.webp']],
    ],
  },
  noam: {
    sections: [
      ['Complete Product World', ['generated/master/brand-world-master.webp']],
      ['CGI Product Hero', ['generated/cgi/cgi-hero.webp']],
      ['Campaign & Social System', ['generated/campaign/campaign-system.webp', 'generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Motion Direction', ['generated/storyboard/storyboard.webp']],
    ],
  },
  paranormal: {
    sections: [
      ['Complete Brand World', ['generated/master/brand-world-master.webp']],
      ['Campaign & Social System', ['generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Film Direction', ['generated/storyboard/the-peacock-awakens.webp', 'generated/storyboard/storyboard.webp']],
    ],
  },
  'pita-basta': {
    sections: [
      ['Complete Brand World', ['generated/master/brand-world-master.webp']],
      ['Campaign & Social System', ['generated/campaign/campaign-system.webp', 'generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Food Story', ['generated/storyboard/storyboard.webp']],
    ],
  },
  'podos-ai': {
    sections: [
      ['Complete Product World', ['generated/master/brand-world-master.webp']],
      ['CGI Product Hero', ['generated/cgi/cgi-hero.webp']],
      ['Campaign & Social System', ['generated/campaign/campaign-system.webp', 'generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Product Story', ['generated/storyboard/infrastructure-arrives.webp', 'generated/storyboard/storyboard.webp']],
    ],
  },
  rebound: {
    sections: [
      ['Complete Brand World', ['generated/master/brand-world-master.webp']],
      ['Campaign & Social System', ['generated/campaign/campaign-system.webp', 'generated/social/social-system.webp']],
      ['Storyboard & Treatment Journey', ['generated/storyboard/return-to-yourself.webp', 'generated/storyboard/storyboard.webp']],
    ],
  },
  syntropic: {
    sections: [
      ['Complete AI Product World', ['generated/master/brand-world-master.webp']],
      ['Campaign & Social System', ['generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Motion Direction', ['generated/storyboard/one-computer-does-the-work-of-ten.webp', 'generated/storyboard/storyboard.webp', 'generated/film/film-keyframes.webp']],
    ],
  },
  'vudu-energy-drink': {
    sections: [
      ['Complete Brand World', ['generated/master/brand-world-master.webp']],
      ['Campaign & Social System', ['generated/campaign/campaign-system.webp', 'generated/social/social-system.webp']],
      ['Digital Experience', ['generated/web/website-responsive.webp']],
      ['Storyboard & Film Direction', ['generated/storyboard/activate-the-night.webp', 'generated/storyboard/storyboard.webp']],
    ],
  },
};

for (const brand of BRANDS) {
  const expansion = BRAND_WORLD_EXPANSIONS[brand.id];
  if (!expansion) continue;

  const generatedSections = expansion.sections.map(([title, images]) => ({ title, images }));
  const generatedImages = generatedSections.flatMap((section) => section.images);
  const generatedOverview = [...new Set(generatedImages)].sort((left, right) => {
    const priority = (asset) => {
      if (asset.includes('/master/')) return 0;
      if (asset.includes('/cgi/')) return 1;
      if (asset.includes('/packaging/')) return 2;
      if (asset.includes('/web/')) return 3;
      if (asset.includes('/campaign/')) return 4;
      if (asset.includes('/social/')) return 5;
      if (asset.includes('/identity/')) return 6;
      if (asset.includes('/film/')) return 7;
      if (asset.includes('/storyboard/')) return 8;
      return 9;
    };
    return priority(left) - priority(right);
  });

  if (generatedSections[0]) {
    generatedSections[0] = { ...generatedSections[0], images: generatedOverview };
  }
  const originalSections = brand.sections || [
    { title: 'Original Work', images: brand.images || [] },
  ];

  brand.featured = 'generated/master/brand-world-master.webp';
  brand.images = [...new Set([...generatedImages, ...(brand.images || [])])];
  brand.sections = [...generatedSections, ...originalSections];
}

// Every project now includes a true desktop homepage hero generated from its
// own logo, palette, and source artwork. Keep this section directly after the
// Project Story + Identity System sequence rendered by BrandDetail.
const WEBSITE_HERO_ASSET = 'generated/web/homepage-hero.webp';

for (const brand of BRANDS) {
  brand.websiteHero = WEBSITE_HERO_ASSET;
  brand.images = [...new Set([WEBSITE_HERO_ASSET, ...(brand.images || [])])];

  const sections = brand.sections || [{ title: 'Original Work', images: brand.images || [] }];
  const withoutHomepageHero = sections
    .map((section) => ({
      ...section,
      images: (section.images || []).filter((image) => image !== WEBSITE_HERO_ASSET),
    }))
    .filter((section) => section.images.length > 0 || /(identity|logo)/i.test(section.title));

  brand.sections = [
    { title: 'Website Homepage', images: [WEBSITE_HERO_ASSET] },
    ...withoutHomepageHero,
  ];
}

export const getBrand = (id) => BRANDS.find(b => b.id === id) || null;

const encodeAssetPath = (value) => value
  .split('/')
  // Vite's static-file middleware treats an encoded comma (%2C) as a
  // different pathname on Windows. Keep commas literal while encoding the
  // characters that can genuinely break a URL (spaces, #, ?, and so on).
  .map((part) => encodeURIComponent(part).replace(/%2C/gi, ','))
  .join('/');

export const getBrandAssetBase = (brand) => {
  if (brand.assetBase) return brand.assetBase;
  return `/brands/${encodeAssetPath(brand.assetDir || brand.id)}`;
};

export const getBrandAssetPath = (brand, file) => {
  if (!file) return '';
  if (/^(?:https?:)?\/\//i.test(file) || file.startsWith('/')) return file;
  return `${getBrandAssetBase(brand)}/${encodeAssetPath(file)}`;
};

export const getBrandVideo = (brand, video) => {
  const item = typeof video === 'string' ? { src: video } : video;
  return { ...item, src: getBrandAssetPath(brand, item.src) };
};

export const BRAND_NAV_GROUPS = [
  {
    label: "Branding & Identity",
    brands: ['ashe', 'boom-chica', 'lacroix', 'honey', 'baron-herzog', 'pita-basta', 'paranormal', 'logos', 'arizona-chimney-pros', 'ayesmaj-studios', 'casa-ora', 'electric-fuel-america', 'happy-jack-whiskey', 'kolie', 'rebound', 'vudu-energy-drink'],
  },
  {
    label: "CGI & Motion",
    brands: ['blenday', 'butterfly', 'characters', 'noam', 'podos-ai', 'syntropic'],
  },
  {
    label: "Other Work",
    brands: ['interior-design', 'general'],
  },
];
