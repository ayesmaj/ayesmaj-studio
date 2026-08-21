import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../SectionHeader";
import CinematicButton from "../CinematicButton";
import "./CreativeSystem.css";

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const FRAMES = [
  {
    n: "01",
    title: "IDEA",
    sub: "One conversation becomes one clear creative direction.",
    img: "/generated/storyboards/sb-01-idea.webp",
  },
  {
    n: "02",
    title: "VISUAL DIRECTION",
    sub: "Colors, type and mood locked before we build.",
    img: "/generated/storyboards/sb-02-direction.webp",
  },
  {
    n: "03",
    title: "HERO BUILD",
    sub: "We craft the centerpiece your brand leads with.",
    img: "/generated/storyboards/sb-03-hero.webp",
  },
  {
    n: "04",
    title: "EXPAND THE SYSTEM",
    sub: "One hero becomes a full library of assets.",
    img: "/generated/storyboards/sb-04-expand.webp",
  },
  {
    n: "05",
    title: "LAUNCH IN MOTION",
    sub: "Everything ships animated, ready for every channel.",
    img: "/generated/storyboards/sb-05-launch.webp",
  },
];

export default function CreativeSystem() {
  const navigate = useNavigate();

  return (
    <section id="creative-system" className="sb-section idv2-bgc idv2-bgc-08">
      <div className="sb-inner">
        <SectionHeader
          eyebrow="The Storyboard"
          title="FROM IDEA TO LAUNCH"
          subtitle="Five scenes. That is the whole process."
          accent="#D8B75A"
        />

        <div className="sb-row">
          <div className="sb-line" aria-hidden="true" />
          {FRAMES.map((f, i) => (
            <motion.article className="sb-frame" key={f.n} {...fade(i * 0.08)}>
              <div className="sb-media">
                <span className="sb-bignum" aria-hidden="true">{f.n}</span>
                <img
                  src={f.img}
                  alt={`Storyboard scene ${f.n}: ${f.title}`}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <i className="sb-corner sb-tl" aria-hidden="true" />
                <i className="sb-corner sb-tr" aria-hidden="true" />
                <i className="sb-corner sb-bl" aria-hidden="true" />
                <i className="sb-corner sb-br" aria-hidden="true" />
              </div>
              <span className="sb-scene">SCENE {f.n}</span>
              <h3 className="sb-title">{f.title}</h3>
              <p className="sb-sub">{f.sub}</p>
            </motion.article>
          ))}
        </div>

        <motion.div className="sb-actions" {...fade(0.15)}>
          <button type="button" className="sb-link" onClick={() => navigate("/Storyboards")}>
            Full storyboards <span aria-hidden="true">&rarr;</span>
          </button>
          <CinematicButton label="Talk to Us" accent="#D8B75A" onClick={() => navigate("/Contact")} />
        </motion.div>
      </div>
    </section>
  );
}
