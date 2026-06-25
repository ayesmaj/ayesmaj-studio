import React from "react";
import CategoryPage from "@/components/ayesmaj/CategoryPage";

export default function Worlds3D() {
  return (
    <CategoryPage
      accent="#9B5CFF"
      accentSoft="#C084FC"
      accentRGB="155,92,255"
      eyebrow="03 — 3D Worlds & Models"
      headline="3D Worlds, Products & Immersive Brand Systems"
      subheadline="High-end 3D models, cinematic environments, product visuals, and digital worlds that make a brand impossible to forget."
      heroImage="/assets/ayesmaj/hero/hero-world-3d.png"
      docTitle="3D Worlds & Models — AYESMAJ Studios"
      features={[
        "Product 3D modeling",
        "Cinematic environments",
        "Photoreal product visuals",
        "Real-time & WebGL worlds",
        "Motion & animation",
        "Immersive brand experiences",
      ]}
      sections={[
        {
          title: "3D Modeling",
          body: "Precision models of your products, packaging, and concepts — built to photoreal quality and ready for renders, animation, web, or AR.",
        },
        {
          title: "Product Visualization",
          body: "Hero shots that look more premium than a physical photoshoot. Perfect lighting, infinite angles, every finish and colorway on demand.",
        },
        {
          title: "Environments",
          body: "Full cinematic worlds for your brand to live in — from sleek product stages to sprawling futuristic landscapes that set the tone before a word is said.",
        },
        {
          title: "Motion & Animation",
          body: "Bring it all to life. Camera moves, product turntables, and immersive sequences engineered for launches, sites, and campaigns.",
        },
      ]}
    />
  );
}
