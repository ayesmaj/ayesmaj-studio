import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Film,
  ImageIcon,
  Layers,
  Play,
  Rocket,
  Share2,
  Sparkles,
} from "lucide-react";
import Seo from "@/components/ayesmaj/Seo";
import AyesmajNav from "@/components/ayesmaj/AyesmajNav";
import AyesmajFooter from "@/components/ayesmaj/AyesmajFooter";
import "./AiMarketing.css";

const GENERATED = "/assets/ayesmaj/service-worlds";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

const services = [
  {
    icon: Film,
    number: "01",
    title: "AI Films & Commercials",
    body: "Campaign films with a real director's eye—concept, performance, edit, sound, and every cutdown your launch needs.",
    image: `${GENERATED}/ai-fashion-campaign.webp`,
  },
  {
    icon: ImageIcon,
    number: "02",
    title: "Image Campaign Systems",
    body: "One strong visual language expanded across key art, product visuals, paid media, launch assets, and social.",
    image: `${GENERATED}/ai-product-launch.webp`,
  },
  {
    icon: Share2,
    number: "03",
    title: "Always-On Social",
    body: "A repeatable content engine that keeps every format recognizable, premium, and ready for the next channel.",
    image: "/brands/blenday/4.webp",
  },
];

const reels = [
  {
    title: "Blenday — Launch World",
    type: "Brand film",
    video: "/brands/blenday/6.webm",
    href: "/BrandDetail?slug=blenday",
    className: "ai-reel-card ai-reel-card--wide",
  },
  {
    title: "Noam — Product Motion",
    type: "CGI commercial",
    video: "/brands/noam/17.webm",
    href: "/BrandDetail?slug=noam",
    className: "ai-reel-card ai-reel-card--tall",
  },
  {
    title: "Honey — Liquid Energy",
    type: "Product spot",
    video: "/brands/honey/2.webm",
    href: "/BrandDetail?slug=honey",
    className: "ai-reel-card",
  },
];

const stages = [
  ["01", "Find the signal", "A sharp campaign idea, audience truth, and visual position."],
  ["02", "Build the world", "A controlled palette, lighting language, characters, and product rules."],
  ["03", "Make it move", "Hero film, cutdowns, social motion, sound, and finishing."],
  ["04", "Scale the system", "Every channel gets the right format without losing the original idea."],
];

function VideoTile({ item, delay = 0 }) {
  return (
    <motion.article {...reveal(delay)} className={item.className}>
      <video
        src={item.video}
        muted
        loop
        autoPlay
        playsInline
        preload="metadata"
        aria-label={`${item.title} video preview`}
      />
      <span className="ai-reel-scrim" aria-hidden="true" />
      <div className="ai-reel-copy">
        <span>{item.type}</span>
        <h3>{item.title}</h3>
      </div>
      <Link to={item.href} className="ai-reel-link" aria-label={`View ${item.title} case study`}>
        <ArrowUpRight aria-hidden="true" />
      </Link>
    </motion.article>
  );
}

export default function AiMarketing() {
  useEffect(() => {
    document.title = "AI Marketing & Content | AYESMAJ Studios";
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className="ai-page">
      <Seo
        title="AI Marketing & Content | AYESMAJ Studios"
        description="AI-directed campaign films, product imagery, and scalable content systems built by AYESMAJ Studios."
        path="/AiMarketing"
      />
      <div className="service-nav-backdrop" aria-hidden="true" />
      <AyesmajNav />

      <main>
        <section className="ai-hero">
          <div className="ai-hero-orb ai-hero-orb--one" aria-hidden="true" />
          <div className="ai-hero-orb ai-hero-orb--two" aria-hidden="true" />
          <motion.div {...reveal()} className="ai-hero-copy">
            <p className="ai-kicker"><Sparkles size={15} aria-hidden="true" /> AI campaign studio</p>
            <h1>Campaigns that look <em>shot.</em><br />Not generated.</h1>
            <p className="ai-hero-lede">
              We combine creative direction, AI production, motion, and finishing to build
              complete campaign worlds—not random content.
            </p>
            <div className="ai-actions">
              <Link to="/Contact" className="ai-button ai-button--primary">
                Start a campaign <ArrowRight aria-hidden="true" />
              </Link>
              <a href="#ai-work" className="ai-button ai-button--ghost">
                Watch the work <Play aria-hidden="true" />
              </a>
            </div>
            <div className="ai-proofline" aria-label="AI production capabilities">
              <span><b>01</b> Direction</span>
              <span><b>02</b> Generation</span>
              <span><b>03</b> Film & finish</span>
            </div>
          </motion.div>

          <motion.div {...reveal(0.12)} className="ai-hero-art">
            <img
              src={`${GENERATED}/ai-hero-campaign.webp`}
              alt="A luminous campaign world connecting beauty, product, travel, and fragrance visuals"
            />
            <div className="ai-hero-art-label">
              <span>One visual system</span>
              <strong>Film · Image · Social · Launch</strong>
            </div>
            <div className="ai-hero-frame ai-hero-frame--a" aria-hidden="true" />
            <div className="ai-hero-frame ai-hero-frame--b" aria-hidden="true" />
          </motion.div>
        </section>

        <section className="ai-statement" aria-label="Studio positioning">
          <span>Ideas with a pulse</span>
          <p>AI is the production engine. Taste is the difference.</p>
          <span>Built to scale</span>
        </section>

        <section className="ai-section ai-services">
          <motion.div {...reveal()} className="ai-section-heading">
            <p className="ai-kicker">What we make</p>
            <h2>One idea.<br /><em>Every format.</em></h2>
            <p>Every deliverable belongs to the same campaign world, from the first hero frame to the final social cut.</p>
          </motion.div>
          <div className="ai-service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article {...reveal(index * 0.08)} className="ai-service-card" key={service.title}>
                  <div className="ai-service-image">
                    <img src={service.image} alt="" loading="lazy" />
                    <span>{service.number}</span>
                  </div>
                  <div className="ai-service-body">
                    <Icon aria-hidden="true" />
                    <h3>{service.title}</h3>
                    <p>{service.body}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section id="ai-work" className="ai-work-section idv2-bgc idv2-bgc-01">
          <div className="ai-work-intro">
            <motion.div {...reveal()}>
              <p className="ai-kicker ai-kicker--light">Selected motion</p>
              <h2>Real work.<br /><em>Real movement.</em></h2>
            </motion.div>
            <motion.p {...reveal(0.1)}>
              Brand films, CGI product stories, and campaign assets produced from concept through final frame.
            </motion.p>
          </div>
          <div className="ai-reel-grid">
            {reels.map((item, index) => <VideoTile key={item.title} item={item} delay={index * 0.08} />)}
            <motion.article {...reveal(0.22)} className="ai-reel-card ai-reel-card--image">
              <img src={`${GENERATED}/ai-fashion-campaign.webp`} alt="Golden editorial fashion campaign" loading="lazy" />
              <span className="ai-reel-scrim" aria-hidden="true" />
              <div className="ai-reel-copy"><span>Campaign key art</span><h3>L'Or — The Eternal</h3></div>
            </motion.article>
            <motion.article {...reveal(0.28)} className="ai-reel-card ai-reel-card--image ai-reel-card--wide">
              <img src={`${GENERATED}/ai-product-launch.webp`} alt="Blue fragrance bottle surrounded by crystal water" loading="lazy" />
              <span className="ai-reel-scrim" aria-hidden="true" />
              <div className="ai-reel-copy"><span>Product launch</span><h3>Blue Current</h3></div>
            </motion.article>
          </div>
        </section>

        <section className="ai-section ai-process">
          <motion.div {...reveal()} className="ai-section-heading ai-section-heading--wide">
            <p className="ai-kicker">The content engine</p>
            <h2>From one signal<br />to a <em>whole world.</em></h2>
          </motion.div>
          <div className="ai-stage-grid">
            {stages.map(([number, title, body], index) => (
              <motion.article {...reveal(index * 0.07)} key={number}>
                <span>{number}</span>
                <div className="ai-stage-icon" aria-hidden="true">
                  {index === 0 && <Sparkles />}
                  {index === 1 && <Layers />}
                  {index === 2 && <Film />}
                  {index === 3 && <Rocket />}
                </div>
                <h3>{title}</h3>
                <p>{body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="ai-final">
          <div className="ai-final-art" aria-hidden="true">
            <img src={`${GENERATED}/ai-hero-campaign.webp`} alt="" loading="lazy" />
          </div>
          <motion.div {...reveal()} className="ai-final-copy">
            <p className="ai-kicker ai-kicker--light">Your next launch</p>
            <h2>Make the campaign feel bigger than the budget.</h2>
            <Link to="/Contact" className="ai-button ai-button--light">
              Build the visual world <ArrowRight aria-hidden="true" />
            </Link>
          </motion.div>
        </section>
      </main>

      <AyesmajFooter />
    </div>
  );
}
