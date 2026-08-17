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
    images: ['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png'],
    videos: [],
    featured: '1.png',
    logo: 'logo ashe.png',
    sections: [
      { title: 'Brand Identity', images: ['3.png'] },
      { title: 'Digital Experience', images: ['1.png', '2.png'] },
      { title: 'Campaign', images: ['4.png', '5.png', '6.png', '7.png'] },
      { title: 'Packaging', images: ['8.png', '9.png', '10.png'] },
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
      '1.png',
      '2.png',
      '3.png',
      '4.png',
      'generated/campaign/billboard.webp',
      'generated/web/website-responsive.webp',
      'generated/social/social-system.webp',
      'generated/environment/product-environment.webp',
      'generated/storyboard/storyboard.webp',
      'generated/film/film-keyframes.webp',
    ],
    videos: ['6.webm','7.webm'],
    featured: 'generated/master/brand-world-master.webp',
    logo: 'logo-generated.png',
    sections: [
      { title: 'Identity & Materials', images: ['generated/identity/identity-system.webp', 'generated/identity/logo-material.webp'] },
      { title: 'Product Family & Packaging', images: ['generated/packaging/packaging-lineup.webp', 'generated/packaging/packaging-detail.webp'] },
      { title: 'Campaign System', images: ['1.png', '2.png', '3.png', '4.png', 'generated/campaign/billboard.webp'] },
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
    images: ['1.png','2.png','3.png'],
    videos: [],
    featured: '1.png',
    logo: 'logo-generated.png',
    sections: [
      { title: 'Strawberry Edition', images: ['1.png'] },
      { title: 'Chocolate Almond Edition', images: ['2.png'] },
      { title: 'Campaign Art Direction', images: ['3.png'] },
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
    images: ['1.jpg','2.jpg','3.png'],
    videos: ['4.webm'],
    featured: '1.jpg',
    logo: 'logo-generated.png',
    sections: [
      { title: 'Campaign Visuals', images: ['1.jpg', '2.jpg'] },
      { title: 'CGI Renders', images: ['3.png'] },
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
    images: ['1.jpg'],
    videos: ['2.webm'],
    featured: '1.jpg',
    logo: 'logo-generated.png',
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
    images: ['1.png','2.png','3.png','4.jpg','5.jpg','6.png','7.png','8.jpg','9.jpg','10.jpg','11.jpg','12.jpg','13.jpg','14.png','15.png'],
    videos: [],
    featured: '1.png',
    logo: 'logo-generated.png',
    sections: [
      { title: 'Headwear', images: ['1.png', '4.jpg', '7.png'] },
      { title: 'Apparel', images: ['9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg'] },
      { title: 'Design & Patterns', images: ['2.png', '3.png', '5.jpg', '6.png', '8.jpg', '14.png', '15.png'] },
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
    images: ['1.jpeg','2.jpeg','3.jpg','4.jpg','5.jpg','6.jpg'],
    videos: [],
    featured: '1.jpeg',
    logo: 'logo-generated.png',
    sections: [
      { title: 'Product Design', images: ['1.jpeg', '2.jpeg'] },
      { title: 'Campaign Visuals', images: ['3.jpg', '4.jpg', '5.jpg', '6.jpg'] },
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
    images: ['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','11.png'],
    videos: [],
    featured: '1.png',
    logo: '1.png',
    sections: [
      { title: 'Logo & Mark', images: ['1.png'] },
      { title: 'Packaging', images: ['2.png', '3.png', '4.png', '5.png', '6.png', '7.png', '8.png', '9.png', '10.png'] },
      { title: 'Production Files', images: ['11.png'] },
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
    images: ['1.png', 'Gemini_Generated_Image_das3i5sas3i5sas3i.png'],
    videos: [],
    featured: '1.png',
    logo: 'logo-generated.png',
    sections: [
      { title: 'Identity & Packaging', images: ['1.png'] },
      { title: 'Campaign Visuals', images: ['Gemini_Generated_Image_das3i5sas3i5sas3i.png'] },
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
      'logo on white 2.png',
      'ChatGPT Image Mar 27, 2026, 02_59_28 PM.png',
      'ChatGPT Image May 24, 2026, 05_49_01 PM (1).png',
      'ChatGPT Image May 24, 2026, 05_49_01 PM (2).png',
      'ChatGPT Image May 24, 2026, 05_49_01 PM (3).png',
      'ChatGPT Image May 24, 2026, 05_49_01 PM (4).png',
      'ChatGPT Image May 24, 2026, 05_49_02 PM (8).png',
      'ChatGPT Image May 27, 2026, 01_39_25 PM.png',
      'ChatGPT Image May 27, 2026, 01_39_30 PM.png',
      'ChatGPT Image May 27, 2026, 01_39_35 PM.png',
      'ChatGPT Image May 27, 2026, 01_45_05 PM (1).png',
      'ChatGPT Image May 27, 2026, 01_45_06 PM (6).png',
      'ChatGPT Image May 27, 2026, 01_45_06 PM (8).png',
    ],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/arizona-chimney-pros.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image May 27, 2026, 01_45_06 PM (8).png',
    logo: 'logo on white 2.png',
    sections: [
      { title: 'Identity', images: ['logo on white 2.png', 'ChatGPT Image Mar 27, 2026, 02_59_28 PM.png'] },
      { title: 'Campaign & Service Story', images: ['ChatGPT Image May 24, 2026, 05_49_01 PM (1).png', 'ChatGPT Image May 24, 2026, 05_49_01 PM (2).png', 'ChatGPT Image May 24, 2026, 05_49_01 PM (3).png', 'ChatGPT Image May 24, 2026, 05_49_01 PM (4).png', 'ChatGPT Image May 24, 2026, 05_49_02 PM (8).png', 'ChatGPT Image May 27, 2026, 01_45_06 PM (8).png'] },
      { title: 'Social System', images: ['ChatGPT Image May 27, 2026, 01_39_25 PM.png', 'ChatGPT Image May 27, 2026, 01_39_30 PM.png', 'ChatGPT Image May 27, 2026, 01_39_35 PM.png', 'ChatGPT Image May 27, 2026, 01_45_05 PM (1).png', 'ChatGPT Image May 27, 2026, 01_45_06 PM (6).png'] },
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
    images: ['logo ayesmaj color.png', 'ChatGPT Image Jun 24, 2026, 05_18_25 PM.png', 'ChatGPT Image Aug 4, 2026, 06_53_51 PM.png', 'ChatGPT Image Aug 5, 2026, 12_02_52 AM.png'],
    videos: [
      { src: 'logo-intro.webm', title: 'Logo Motion' },
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/ayesmaj-studios.mp4', title: 'Studio Website Walkthrough' },
    ],
    featured: 'ChatGPT Image Aug 4, 2026, 06_53_51 PM.png',
    logo: 'logo ayesmaj color.png',
    sections: [
      { title: 'Identity', images: ['logo ayesmaj color.png', 'ChatGPT Image Jun 24, 2026, 05_18_25 PM.png'] },
      { title: 'Brand World & Campaign', images: ['ChatGPT Image Aug 4, 2026, 06_53_51 PM.png', 'ChatGPT Image Aug 5, 2026, 12_02_52 AM.png'] },
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
    images: ['casa ora logo.png', 'logo casa ora shape and text.png', 'logo casa ora shape.png', 'ChatGPT Image May 25, 2026, 01_42_17 PM.png', 'ChatGPT Image May 25, 2026, 01_53_30 PM.png', 'ChatGPT Image May 25, 2026, 02_11_32 PM.png', 'ChatGPT Image May 25, 2026, 0s1_56_06 PM.png', 'ChatGPT Image May 25, 2026, 09_17_19 PM.png'],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/casa-ora.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image May 25, 2026, 01_53_30 PM.png',
    logo: 'logo casa ora shape and text.png',
    sections: [
      { title: 'Logo System', images: ['casa ora logo.png', 'logo casa ora shape and text.png', 'logo casa ora shape.png'] },
      { title: 'Digital Service System', images: ['ChatGPT Image May 25, 2026, 01_42_17 PM.png', 'ChatGPT Image May 25, 2026, 01_53_30 PM.png', 'ChatGPT Image May 25, 2026, 02_11_32 PM.png', 'ChatGPT Image May 25, 2026, 0s1_56_06 PM.png'] },
      { title: 'Campaign & Launch', images: ['ChatGPT Image May 25, 2026, 09_17_19 PM.png'] },
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
    images: ['electric-fuel-america-logo.png', 'ChatGPT Image Jul 31, 2026, 05_51_57 PM.png', 'ChatGPT Image Aug 3, 2026, 05_37_16 PM.png', 'ChatGPT Image Jul 31, 2026, 06_18_22 PM.png', 'ChatGPT Image Aug 4, 2026, 06_54_49 PM.png'],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/electric-fuel-america.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image Jul 31, 2026, 06_18_22 PM.png',
    logo: 'electric-fuel-america-logo.png',
    sections: [
      { title: 'Identity', images: ['electric-fuel-america-logo.png'] },
      { title: 'Mission & Product Story', images: ['ChatGPT Image Jul 31, 2026, 05_51_57 PM.png', 'ChatGPT Image Aug 3, 2026, 05_37_16 PM.png'] },
      { title: 'Campaign & Digital', images: ['ChatGPT Image Jul 31, 2026, 06_18_22 PM.png', 'ChatGPT Image Aug 4, 2026, 06_54_49 PM.png'] },
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
    images: ['happy-jack-logo-transparent.png', 'happy-jack-bottle.webp', 'Happy Jack Distillers (1).png', 'Happy Jack Distillers (2).png', 'Happy Jack Distillers (3).png'],
    videos: [],
    featured: 'Happy Jack Distillers (3).png',
    logo: 'happy-jack-logo-transparent.png',
    sections: [
      { title: 'Identity', images: ['happy-jack-logo-transparent.png'] },
      { title: 'Packaging & Product', images: ['happy-jack-bottle.webp', 'Happy Jack Distillers (2).png'] },
      { title: 'Brand & Digital Story', images: ['Happy Jack Distillers (1).png', 'Happy Jack Distillers (3).png'] },
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
    images: ['logo kolie.png', 'ChatGPT Image Jul 1, 2026, 02_01_25 PM.png', 'ChatGPT Image Jul 15, 2026, 03_55_35 PM.png', 'ChatGPT Image Jun 28, 2026, 08_11_40 PM.png', 'ChatGPT Image Jun 28, 2026, 08_11_46 PM.png', 'ChatGPT Image Jul 14, 2026, 08_44_58 PM.png', 'ChatGPT Image Jul 14, 2026, 08_46_26 PM.png', 'ChatGPT Image Jul 15, 2026, 06_11_15 PM.png', 'ChatGPT Image Jul 15, 2026, 10_34_22 PM.png', 'ChatGPT Image Jul 20, 2026, 08_57_08 PM.png', 'ChatGPT Image Jun 28, 2026, 06_59_41 PM.png'],
    videos: [
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/kolie.mp4', title: 'Website Walkthrough' },
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/ai-videos/kolie-ad.mp4', title: 'AI Launch Film' },
    ],
    featured: 'ChatGPT Image Jun 28, 2026, 08_11_46 PM.png',
    logo: 'logo kolie.png',
    sections: [
      { title: 'Identity', images: ['logo kolie.png'] },
      { title: 'Campaign & Launch', images: ['ChatGPT Image Jul 1, 2026, 02_01_25 PM.png', 'ChatGPT Image Jul 15, 2026, 03_55_35 PM.png', 'ChatGPT Image Jun 28, 2026, 08_11_40 PM.png', 'ChatGPT Image Jun 28, 2026, 08_11_46 PM.png'] },
      { title: 'Product & Brand System', images: ['ChatGPT Image Jul 14, 2026, 08_44_58 PM.png', 'ChatGPT Image Jul 14, 2026, 08_46_26 PM.png', 'ChatGPT Image Jul 15, 2026, 06_11_15 PM.png', 'ChatGPT Image Jul 15, 2026, 10_34_22 PM.png', 'ChatGPT Image Jul 20, 2026, 08_57_08 PM.png', 'ChatGPT Image Jun 28, 2026, 06_59_41 PM.png'] },
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
    images: ['podos logo.png', 'hero_dense_01.jpg', 'ChatGPT Image May 13, 2026, 12_30_47 AM.png', 'ChatGPT Image May 6, 2026, 06_53_12 PM.png', 'ChatGPT Image May 17, 2026, 02_38_48 PM (5).png', 'ChatGPT Image May 17, 2026, 02_42_32 PM (8).png', 'ChatGPT Image May 17, 2026, 03_29_19 PM (4).png', 'ChatGPT Image May 17, 2026, 03_29_21 PM (10).png', 'ChatGPT Image May 17, 2026, 03_46_21 PM.png', 'ChatGPT Image May 17, 2026, 03_49_15 PM.png', 'ChatGPT Image May 31, 2026, 07_01_02 PM.png', 'ChatGPT Image May 7, 2026, 02_54_05 PM.png', 'ChatGPT Image May 7, 2026, 02_56_48 PM.png', 'ChatGPT Image May 7, 2026, 03_31_52 PM.png'],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/podos-ai.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image May 17, 2026, 03_29_19 PM (4).png',
    logo: 'podos logo.png',
    sections: [
      { title: 'Identity', images: ['podos logo.png'] },
      { title: 'Hero & Product Overview', images: ['hero_dense_01.jpg', 'ChatGPT Image May 13, 2026, 12_30_47 AM.png', 'ChatGPT Image May 6, 2026, 06_53_12 PM.png'] },
      { title: 'Product Visualization & Technical Story', images: ['ChatGPT Image May 17, 2026, 02_38_48 PM (5).png', 'ChatGPT Image May 17, 2026, 02_42_32 PM (8).png', 'ChatGPT Image May 17, 2026, 03_29_19 PM (4).png', 'ChatGPT Image May 17, 2026, 03_29_21 PM (10).png', 'ChatGPT Image May 17, 2026, 03_46_21 PM.png', 'ChatGPT Image May 17, 2026, 03_49_15 PM.png', 'ChatGPT Image May 31, 2026, 07_01_02 PM.png', 'ChatGPT Image May 7, 2026, 02_54_05 PM.png', 'ChatGPT Image May 7, 2026, 02_56_48 PM.png', 'ChatGPT Image May 7, 2026, 03_31_52 PM.png'] },
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
    images: ['rebound logo.png', 'rebound shape logo.png', 'ChatGPT Image Jun 8, 2026, 05_06_56 PM (10).png', 'ChatGPT Image Jun 8, 2026, 08_17_45 PM.png', 'ChatGPT Image Jun 8, 2026, 09_39_14 PM.png', 'ChatGPT Image Jun 8, 2026, 10_10_29 PM.png', 'ChatGPT Image Jun 8, 2026, 05_06_55 PM (5).png', 'ChatGPT Image Jun 8, 2026, 05_06_55 PM (8).png', 'ChatGPT Image Jun 8, 2026, 09_10_36 PM (2).png', 'ChatGPT Image Jun 8, 2026, 09_10_36 PM (4).png', 'ChatGPT Image Jun 8, 2026, 09_10_37 PM (6).png'],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/rebound-skincare.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image Jun 8, 2026, 08_17_45 PM.png',
    logo: 'rebound logo.png',
    sections: [
      { title: 'Identity', images: ['rebound logo.png', 'rebound shape logo.png'] },
      { title: 'Campaign & Digital Experience', images: ['ChatGPT Image Jun 8, 2026, 05_06_56 PM (10).png', 'ChatGPT Image Jun 8, 2026, 08_17_45 PM.png', 'ChatGPT Image Jun 8, 2026, 09_39_14 PM.png', 'ChatGPT Image Jun 8, 2026, 10_10_29 PM.png'] },
      { title: 'Product Imagery & Visual System', images: ['ChatGPT Image Jun 8, 2026, 05_06_55 PM (5).png', 'ChatGPT Image Jun 8, 2026, 05_06_55 PM (8).png', 'ChatGPT Image Jun 8, 2026, 09_10_36 PM (2).png', 'ChatGPT Image Jun 8, 2026, 09_10_36 PM (4).png', 'ChatGPT Image Jun 8, 2026, 09_10_37 PM (6).png'] },
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
    images: ['syntropic-logo.png', 'wordmark-white.png', 'ChatGPT Image May 18, 2026, 09_14_33 PM.png', 'ChatGPT Image May 11, 2026, 06_19_50 PM.png', 'ChatGPT Image May 19, 2026, 03_55_37 PM.png', 'ChatGPT Image May 21, 2026, 06_37_18 PM.png'],
    videos: [
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/syntropic.mp4', title: 'Website Walkthrough' },
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/ai-videos/syntropic-3d.mp4', title: '3D Explainer' },
      { src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/ai-videos/syntropic-53.mp4', title: 'Concept Film' },
    ],
    featured: 'ChatGPT Image May 11, 2026, 06_19_50 PM.png',
    logo: 'syntropic-logo.png',
    sections: [
      { title: 'Identity', images: ['syntropic-logo.png', 'wordmark-white.png'] },
      { title: 'Product & Digital Experience', images: ['ChatGPT Image May 18, 2026, 09_14_33 PM.png'] },
      { title: 'Campaign & Motion', images: ['ChatGPT Image May 11, 2026, 06_19_50 PM.png', 'ChatGPT Image May 19, 2026, 03_55_37 PM.png', 'ChatGPT Image May 21, 2026, 06_37_18 PM.png'] },
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
    images: ['vudu logo.png', 'ChatGPT Image Mar 20, 2026, 05_32_11 PM.png', 'ChatGPT Image Mar 20, 2026, 06_45_45 PM-gigapixel-art-scale-2_00x.png', 'ChatGPT Image Mar 20, 2026, 06_52_43 PM.png', 'ChatGPT Image Mar 20, 2026, 06_54_52 PM.png', 'peach mango-gigapixel-standard-scale-2_00x (1).png', 'IMG_4249-gigapixel-art-scale-6_00x.jpg', 'IMG_4250-gigapixel-art-scale-6_00x.jpg', 'IMG_4251-gigapixel-art-scale-6_00x.jpg'],
    videos: [{ src: 'https://pub-b58b6ae218d440519d982e88e2e185e9.r2.dev/sites/vudu-energy.mp4', title: 'Website Walkthrough' }],
    featured: 'ChatGPT Image Mar 20, 2026, 06_45_45 PM-gigapixel-art-scale-2_00x.png',
    logo: 'vudu logo.png',
    sections: [
      { title: 'Identity', images: ['vudu logo.png'] },
      { title: 'Packaging & Flavor System', images: ['ChatGPT Image Mar 20, 2026, 05_32_11 PM.png', 'ChatGPT Image Mar 20, 2026, 06_45_45 PM-gigapixel-art-scale-2_00x.png', 'ChatGPT Image Mar 20, 2026, 06_52_43 PM.png', 'ChatGPT Image Mar 20, 2026, 06_54_52 PM.png', 'peach mango-gigapixel-standard-scale-2_00x (1).png'] },
      { title: 'Product Campaign & Photography', images: ['IMG_4249-gigapixel-art-scale-6_00x.jpg', 'IMG_4250-gigapixel-art-scale-6_00x.jpg', 'IMG_4251-gigapixel-art-scale-6_00x.jpg'] },
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
    images: ['1.jpeg','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','11.png','12.png','13.png','14.png','15.png','16.png','17.png','18.png','19.png','20.png','21.png','22.png','23.png','24.png','25.png','26.png','27.png','28.png','29.png','30.png','31.png','32.jpeg'],
    videos: [],
    featured: '1.jpeg',
    sections: [
      { title: 'Mascot & Character Studies', images: ['1.jpeg','4.png','13.png','18.png','19.png','20.png','22.png','24.png','28.png','31.png'] },
      { title: 'Cinematic Character Portraits', images: ['5.png','6.png','7.png','8.png','9.png','10.png','11.png'] },
      { title: 'Pop-Culture Remix / Spec Studies', images: ['2.png','3.png','12.png','14.png','15.png','16.png','17.png','21.png','23.png','25.png','26.png','27.png','29.png','30.png','32.jpeg'] },
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
    images: ['logo.png','1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','11.png','12.jpg','13.png','14.jpg','15.png'],
    videos: ['16.webm','17.webm','18.webm','19.webm','20.webm'],
    featured: 'logo.png',
    logo: 'logo.png',
    sections: [
      { title: 'Brand Identity', images: ['logo.png'] },
      { title: 'Product Range', images: ['1.png','2.png','3.png','4.png','5.png','6.png','7.png','8.png','9.png','10.png','11.png','12.jpg','13.png','14.jpg','15.png'] },
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
    images: ['1.jpeg','2.jpeg','3.jpeg','4.jpeg','5.jpeg','6.jpeg','7.jpeg','8.jpeg','9.jpeg','10.jpeg','11.jpeg','12.jpeg','13.jpeg','14.jpeg','15.jpeg','16.jpeg','17.jpeg','18.jpeg'],
    videos: [],
    featured: '1.jpeg',
    sections: [
      { title: 'Showroom & Retail', images: ['1.jpeg','2.jpeg','3.jpeg','4.jpeg','5.jpeg','6.jpeg'] },
      { title: 'Living Spaces', images: ['7.jpeg','8.jpeg','9.jpeg','10.jpeg','11.jpeg','12.jpeg'] },
      { title: 'Detail Shots', images: ['13.jpeg','14.jpeg','15.jpeg','16.jpeg','17.jpeg','18.jpeg'] },
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
    images: ['1.png','2.jpeg','3.jpeg','4.jpeg','5.jpeg','6.jpeg','7.jpeg','8.jpeg','9.jpeg','10.jpeg','11.jpeg','12.jpeg','13.jpeg','14.jpeg','15.jpeg','16.jpeg','17.jpeg','18.jpeg','19.jpeg','20.jpeg'],
    videos: [],
    featured: '1.png',
    sections: [
      { title: 'Logo Marks', images: ['1.png','4.jpeg','6.jpeg','8.jpeg','9.jpeg','10.jpeg','12.jpeg','13.jpeg','14.jpeg','16.jpeg','17.jpeg','19.jpeg'] },
      { title: 'Optimus Identity System', images: ['2.jpeg','5.jpeg','7.jpeg','15.jpeg'] },
      { title: 'SST Identity System', images: ['3.jpeg','11.jpeg'] },
      { title: 'AYESMAJ Studio Identities', images: ['18.jpeg','20.jpeg'] },
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
    images: ['1.jpg','2.png','3.png','4.jpeg','5.png','6.jpeg'],
    videos: [],
    featured: '1.jpg',
    sections: [
      { title: 'Product CGI', images: ['1.jpg', '2.png'] },
      { title: 'Campaign Visuals', images: ['3.png', '4.jpeg'] },
      { title: 'Digital Art', images: ['5.png', '6.jpeg'] },
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
