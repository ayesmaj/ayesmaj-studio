import React from "react";
import CategoryPage from "@/components/ayesmaj/CategoryPage";

export default function AiMarketing() {
  return (
    <CategoryPage
      accent="#FFB000"
      accentSoft="#FFD36A"
      accentRGB="255,176,0"
      eyebrow="02 — AI Marketing"
      headline="AI Content That Makes Brands Move"
      subheadline="Cinematic images, videos, campaigns, and brand content built with advanced AI tools — produced at a speed and scale traditional studios can't match."
      heroImage="/assets/ayesmaj/hero/hero-world-ai-marketing.png"
      docTitle="AI Marketing — AYESMAJ Studios"
      features={[
        "AI cinematic video ads",
        "AI product & brand imagery",
        "Full campaign systems",
        "Social-first content engines",
        "Voiceover & motion design",
        "Always-on content pipelines",
      ]}
      sections={[
        {
          title: "AI Videos",
          body: "Cinematic brand films, product reveals, and social ads generated and edited with the latest AI video models — directed for emotion, paced for conversion, and delivered in days, not months.",
        },
        {
          title: "AI Images",
          body: "Scroll-stopping campaign visuals, product renders, and brand worlds. Consistent style, infinite variations, zero photoshoot logistics — your brand looking premium across every channel.",
        },
        {
          title: "Campaign Systems",
          body: "Not one-off posts — complete content systems. We design the visual language, then build a repeatable engine that keeps producing on-brand assets at scale.",
        },
        {
          title: "Social Content",
          body: "Platform-native cuts for Instagram, TikTok, YouTube, and LinkedIn — formatted, captioned, and optimized so your message lands the moment it's seen.",
        },
      ]}
    />
  );
}
