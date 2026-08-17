import React from "react";
import ParallaxUnfurlingGallery from "../../ui/3d-parallax-unfurling-gallery";

const ARTWORK = [
  { src: "/brands/blenday/1.png", alt: "Purple Blenday campaign and packaging artwork", label: "Campaign / Packaging" },
  { src: "/videos/websites/posters/electric-fuel-america.jpg", alt: "Electric Fuel America cinematic website", label: "Web / Motion", position: "center 40%" },
  { src: "/concepts/orbit-footwear.webp", alt: "Futuristic performance footwear visualization", label: "Product / CGI" },
  { src: "/brands/paranormal/1.jpeg", alt: "Paranormal luxury bottle branding", label: "Identity / Packaging" },
  { src: "/brands/ashe/3.png", alt: "Ashe black and gold identity system", label: "Brand / Identity" },
  { src: "/videos/websites/posters/podos-ai.jpg", alt: "Podos AI immersive technology website", label: "AI / Web Experience", position: "center 56%" },
  { src: "/assets/ayesmaj/generated/storyboard/story-04-world.webp", alt: "Universal brand ecosystem presentation", label: "Art Direction / AI" },
  { src: "/concepts/solara-fragrance.webp", alt: "Golden fragrance product campaign", label: "Beauty / Product" },
  { src: "/images/car-final.png", alt: "Performance car in a cinematic garage", label: "Automotive / CGI" },
  { src: "/concepts/nocturne-chocolate.webp", alt: "Luxury chocolate packaging concept", label: "Luxury / Packaging" },
  { src: "/concepts/nexus-mobility.webp", alt: "Autonomous mobility vehicle concept", label: "Mobility / 3D" },
  { src: "/concepts/kinetiq-sportswear.webp", alt: "Cinematic sportswear campaign", label: "Fashion / Campaign", position: "center 42%" },
];

export default function FutureOfBranding() {
  return (
    <section id="visual-universe" aria-label="AYESMAJ visual universe">
      <ParallaxUnfurlingGallery
        images={ARTWORK}
        eyebrow="AYESMAJ / Visual Universe"
        title="Every Idea."
        outlineTitle="Every Form."
        disciplines="Brand · Film · Web · AI · 3D"
      />
    </section>
  );
}
