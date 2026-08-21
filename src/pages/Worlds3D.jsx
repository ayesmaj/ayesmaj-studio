import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Cuboid,
  Globe2,
  Layers,
  Play,
  ScanLine,
  Sparkles,
} from "lucide-react";
import Seo from "@/components/ayesmaj/Seo";
import AyesmajNav from "@/components/ayesmaj/AyesmajNav";
import AyesmajFooter from "@/components/ayesmaj/AyesmajFooter";
import "./Worlds3D.css";

const GENERATED = "/assets/ayesmaj/service-worlds";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.68, delay, ease: [0.16, 1, 0.3, 1] },
});

const capabilities = [
  {
    number: "01",
    icon: Cuboid,
    title: "Product CGI",
    body: "Photoreal products, exploded views, material studies, and launch-ready hero renders.",
    image: `${GENERATED}/worlds3d-product.webp`,
  },
  {
    number: "02",
    icon: Globe2,
    title: "Immersive Spaces",
    body: "Digital showrooms, virtual tours, brand pavilions, and environments people can explore.",
    image: `${GENERATED}/worlds3d-environment.webp`,
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Characters & Worlds",
    body: "Original characters, cinematic settings, and visual universes designed to carry a story.",
    image: "/characters/1.webp",
  },
];

const reels = [
  { title: "Noam — Material Reveal", video: "/brands/noam/18.webm", label: "Product film" },
  { title: "Noam — Precision Motion", video: "/brands/noam/19.webm", label: "CGI sequence" },
  { title: "Noam — Launch Cut", video: "/brands/noam/20.webm", label: "Brand motion" },
];

const characters = [
  ["/characters/1.webp", "Cinematic mascot"],
  ["/characters/4.webp", "Creature study"],
  ["/characters/5.webp", "Hero character"],
  ["/characters/10.webp", "Stylized portrait"],
  ["/characters/20.webp", "World character"],
  ["/characters/31.webp", "Campaign character"],
];

const steps = [
  ["01", "Shape", "Block the object, space, or character around the story it needs to tell."],
  ["02", "Surface", "Build materials, texture, detail, and a visual language people can feel."],
  ["03", "Light", "Direct the atmosphere with cinematic light, scale, and camera movement."],
  ["04", "Launch", "Deliver stills, film, interactive scenes, and optimized web experiences."],
];

export default function Worlds3D() {
  useEffect(() => {
    document.title = "3D Worlds, CGI & Models | AYESMAJ Studios";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="worlds-page">
      <Seo
        title="3D Worlds, CGI & Models | AYESMAJ Studios"
        description="Cinematic product CGI, immersive 3D environments, characters, and interactive brand worlds by AYESMAJ Studios."
        path="/Worlds3D"
      />
      <div className="service-nav-backdrop" aria-hidden="true" />
      <AyesmajNav />

      <main>
        <section className="worlds-hero">
          <motion.div {...reveal()} className="worlds-hero-copy">
            <p className="worlds-kicker"><Box size={15} aria-hidden="true" /> 3D worlds & CGI</p>
            <h1>Objects.<br />Spaces.<br /><em>Worlds.</em></h1>
            <p>
              From a single product to an entire environment, we build visual experiences
              that feel tangible, cinematic, and impossible to ignore.
            </p>
            <div className="worlds-actions">
              <Link to="/Contact" className="worlds-button worlds-button--primary">
                Build a world <ArrowRight aria-hidden="true" />
              </Link>
              <a href="#worlds-work" className="worlds-button worlds-button--ghost">
                Explore CGI <Play aria-hidden="true" />
              </a>
            </div>
            <div className="worlds-hero-tags" aria-label="3D capabilities">
              <span>Product visualization</span>
              <span>Interactive 3D</span>
              <span>Environment design</span>
            </div>
          </motion.div>

          <motion.div {...reveal(0.12)} className="worlds-hero-art">
            <img
              src={`${GENERATED}/worlds3d-hero.webp`}
              alt="A bright futuristic 3D sculpture gallery with a sneaker, watch, chrome ring, and violet orbital form"
            />
            <div className="worlds-hero-orbit worlds-hero-orbit--one" aria-hidden="true" />
            <div className="worlds-hero-orbit worlds-hero-orbit--two" aria-hidden="true" />
            <div className="worlds-hero-note">
              <ScanLine aria-hidden="true" />
              <span>CGI / Environment / Product</span>
              <strong>One world, every camera.</strong>
            </div>
          </motion.div>
        </section>

        <section className="worlds-signal" aria-label="3D studio promise">
          <span>Model</span><i aria-hidden="true" />
          <span>Texture</span><i aria-hidden="true" />
          <span>Light</span><i aria-hidden="true" />
          <span>Animate</span><i aria-hidden="true" />
          <span>Experience</span>
        </section>

        <section className="worlds-section worlds-capabilities">
          <motion.div {...reveal()} className="worlds-heading">
            <div><p className="worlds-kicker">What we build</p><h2>Made to feel<br /><em>physically real.</em></h2></div>
            <p>Every surface, reflection, lens, and movement is art-directed to make the object—or the whole world—feel believable.</p>
          </motion.div>
          <div className="worlds-cap-grid">
            {capabilities.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article {...reveal(index * 0.08)} className="worlds-cap-card" key={item.title}>
                  <div className="worlds-cap-media"><img src={item.image} alt="" loading="lazy" /><span>{item.number}</span></div>
                  <div className="worlds-cap-copy"><Icon aria-hidden="true" /><h3>{item.title}</h3><p>{item.body}</p></div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="worlds-work" className="worlds-motion idv2-bgc idv2-bgc-04">
          <div className="worlds-motion-heading">
            <motion.div {...reveal()}><p className="worlds-kicker worlds-kicker--light">In motion</p><h2>Pixels with<br /><em>weight.</em></h2></motion.div>
            <motion.p {...reveal(0.1)}>Real AYESMAJ product CGI. Click through to the complete Noam visual system and motion study.</motion.p>
          </div>
          <div className="worlds-reel-grid">
            {reels.map((reel, index) => (
              <motion.article {...reveal(index * 0.08)} key={reel.title} className={index === 0 ? "worlds-reel worlds-reel--wide" : "worlds-reel"}>
                <video src={reel.video} muted autoPlay loop playsInline preload="metadata" aria-label={`${reel.title} video preview`} />
                <span className="worlds-reel-shade" aria-hidden="true" />
                <div><span>{reel.label}</span><h3>{reel.title}</h3></div>
                <Link to="/BrandDetail?slug=noam" aria-label={`View ${reel.title} case study`}><ArrowUpRight aria-hidden="true" /></Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="worlds-section worlds-transformation">
          <motion.div {...reveal()} className="worlds-heading">
            <div><p className="worlds-kicker">The transformation</p><h2>From blockout<br />to <em>final light.</em></h2></div>
            <p>Not two copies of the same render. This is the visual jump from raw geometry to a directed, premium product image.</p>
          </motion.div>
          <motion.div {...reveal(0.08)} className="worlds-before-after">
            <figure>
              <img src="/assets/ayesmaj/generated/comparisons/before-3d.webp" alt="Simple gray 3D product blockout before art direction" loading="lazy" />
              <figcaption><span>Before</span><strong>Raw geometry</strong></figcaption>
            </figure>
            <div className="worlds-transform-arrow" aria-hidden="true"><ArrowRight /></div>
            <figure>
              <img src="/assets/ayesmaj/generated/comparisons/after-3d.webp" alt="Premium final CGI product render with materials and cinematic light" loading="lazy" />
              <figcaption><span>After AYESMAJ</span><strong>Material, light, story</strong></figcaption>
            </figure>
          </motion.div>
        </section>

        <section className="worlds-gallery-section idv2-bgc idv2-bgc-02">
          <div className="worlds-gallery-heading">
            <motion.div {...reveal()}><p className="worlds-kicker worlds-kicker--light">Character worlds</p><h2>Every character<br />needs a <em>universe.</em></h2></motion.div>
            <motion.div {...reveal(0.08)} className="worlds-gallery-side">
              <p>Original character studies, cinematic portraits, and visual experiments from the studio archive.</p>
              <Link to="/BrandDetail?slug=characters">See all character work <ArrowRight aria-hidden="true" /></Link>
            </motion.div>
          </div>
          <div className="worlds-character-grid">
            {characters.map(([src, label], index) => (
              <motion.div {...reveal(index * 0.05)} className={`worlds-character-card worlds-character-card--${(index % 4) + 1}`} key={src}>
                <img src={src} alt={label} loading="lazy" />
                <span className="worlds-character-card__veil" aria-hidden="true" />
                <span className="worlds-character-card__index">{String(index + 1).padStart(2, "0")}</span>
                <span className="worlds-character-card__label">{label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="worlds-section worlds-process">
          <motion.div {...reveal()} className="worlds-heading worlds-heading--single">
            <div><p className="worlds-kicker">How it becomes real</p><h2>Four moves.<br /><em>One believable world.</em></h2></div>
          </motion.div>
          <div className="worlds-steps">
            {steps.map(([number, title, body], index) => (
              <motion.article {...reveal(index * 0.07)} key={number}>
                <span>{number}</span>
                <div className="worlds-step-icon" aria-hidden="true">{index < 2 ? <Layers /> : index === 2 ? <ScanLine /> : <Globe2 />}</div>
                <h3>{title}</h3><p>{body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="worlds-final">
          <img src={`${GENERATED}/worlds3d-environment.webp`} alt="" aria-hidden="true" loading="lazy" />
          <span className="worlds-final-shade" aria-hidden="true" />
          <motion.div {...reveal()}>
            <p className="worlds-kicker worlds-kicker--light">Enter the next world</p>
            <h2>Give the brand somewhere unforgettable to live.</h2>
            <Link to="/Contact" className="worlds-button worlds-button--light">Start a 3D project <ArrowRight aria-hidden="true" /></Link>
          </motion.div>
        </section>
      </main>

      <AyesmajFooter />
    </div>
  );
}
