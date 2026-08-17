import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Box, Image as ImageIcon, Monitor } from "lucide-react";
import SectionHeader from "../SectionHeader";
import { COLORS } from "../theme";
import "./PerceptionPrice.css";

const COMPARISONS = [
  {
    index: "01",
    type: "3D Product",
    title: "From Default Render to Desire",
    description: "Lighting, materials, composition, and art direction turn an object into a premium product world.",
    beforeImage: "/assets/ayesmaj/generated/comparisons/before-3d.webp",
    afterImage: "/assets/ayesmaj/generated/comparisons/after-3d.webp",
    beforeAlt: "Basic flat gray 3D fragrance bottle render",
    afterAlt: "Premium cinematic gold fragrance bottle render by AYESMAJ",
    Icon: Box,
    beforeTags: ["Flat light", "Default material", "No story"],
    afterTags: ["Art directed", "Photoreal CGI", "Cinematic world"],
  },
  {
    index: "02",
    type: "Poster Branding",
    title: "From Template to Brand Icon",
    description: "A generic offer becomes a campaign people recognize, remember, and want to be part of.",
    beforeImage: "/assets/ayesmaj/generated/comparisons/before-branding.webp",
    afterImage: "/assets/ayesmaj/generated/comparisons/after-branding.webp",
    beforeAlt: "Basic generic product poster without brand identity",
    afterAlt: "Premium purple and gold fragrance campaign art direction by AYESMAJ",
    Icon: ImageIcon,
    beforeTags: ["Generic type", "Flat layout", "Forgettable"],
    afterTags: ["Ownable identity", "Hero product", "Campaign system"],
  },
  {
    index: "03",
    type: "Website",
    title: "From Web Page to Experience",
    description: "Basic information becomes an immersive digital world that earns attention and builds trust instantly.",
    beforeImage: "/assets/ayesmaj/generated/comparisons/before-web.webp",
    afterImage: "/assets/ayesmaj/generated/comparisons/after-web.webp",
    beforeAlt: "Basic generic website template",
    afterAlt: "Premium cinematic aerospace website experience by AYESMAJ",
    Icon: Monitor,
    beforeTags: ["Template page", "Weak hierarchy", "No emotion"],
    afterTags: ["Cinematic UX", "Clear story", "Premium trust"],
  },
];

export default function PerceptionPrice() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="before-after" className="perception-comparison" style={{ borderTop: `1px solid ${COLORS.border}` }}>
      <div className="perception-comparison__glow" />
      <div className="perception-comparison__inner">
        <SectionHeader
          eyebrow="Before / After AYESMAJ"
          title="See What Premium Changes"
          subtitle="The same offer can feel cheap or unforgettable. Move from basic execution to a visual world people value."
        />

        <div className="perception-comparison__legend" aria-hidden="true">
          <span><i /> Before — without AYESMAJ</span>
          <span><i /> After — by AYESMAJ</span>
        </div>

        <div className="perception-comparison__list">
          {COMPARISONS.map((item, index) => {
            const Icon = item.Icon;
            return (
              <motion.article
                className="comparison-case"
                key={item.index}
                initial={reduceMotion ? false : { opacity: 0, y: 34 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <header className="comparison-case__header">
                  <div className="comparison-case__identity">
                    <span className="comparison-case__index">{item.index}</span>
                    <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
                    <span>{item.type}</span>
                  </div>
                  <div className="comparison-case__copy">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </header>

                <div className="comparison-case__visuals">
                  <div className="comparison-side comparison-side--before">
                    <span className="comparison-side__label">Before</span>
                    <img src={item.beforeImage} alt={item.beforeAlt} loading="lazy" decoding="async" />
                    <div className="comparison-side__scrim" />
                  </div>

                  <div className="comparison-transform" aria-hidden="true">
                    <ArrowRight size={22} strokeWidth={2.2} />
                  </div>

                  <div className="comparison-side comparison-side--after">
                    <span className="comparison-side__label">After AYESMAJ</span>
                    <img src={item.afterImage} alt={item.afterAlt} loading="lazy" decoding="async" />
                    <div className="comparison-side__after-glow" />
                  </div>
                </div>

                <footer className="comparison-case__footer">
                  <div className="comparison-case__tags comparison-case__tags--before">
                    {item.beforeTags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <div className="comparison-case__tags comparison-case__tags--after">
                    {item.afterTags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </footer>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
