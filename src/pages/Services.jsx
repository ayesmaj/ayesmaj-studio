import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Clapperboard,
  Compass,
  Cuboid,
  Layers3,
  MonitorUp,
  PenTool,
  Sparkles,
} from "lucide-react";
import AyesmajNav from "@/components/ayesmaj/AyesmajNav";
import AyesmajFooter from "@/components/ayesmaj/AyesmajFooter";
import "./Services.css";

const SERVICE_WORLDS = [
  {
    number: "01",
    eyebrow: "Digital products",
    title: "Cinematic Web Experiences",
    description:
      "Premium websites and landing pages with a clear story, responsive craft, and the kind of movement that makes a brand feel established.",
    items: ["Strategy and UX", "Premium development", "Interactive motion", "Conversion structure"],
    route: "/WebExperiences",
    accent: "lime",
    icon: MonitorUp,
    image: "/videos/websites/posters/rebound-skincare.jpg",
    imageAlt: "Rebound Aesthetics website designed by AYESMAJ Studios",
  },
  {
    number: "02",
    eyebrow: "Content systems",
    title: "AI Campaigns & Visual Content",
    description:
      "Art-directed images, commercials, social systems, and launch campaigns made at AI speed without losing taste, intention, or brand consistency.",
    items: ["Campaign concepts", "AI brand imagery", "Commercial content", "Scalable social systems"],
    route: "/AiMarketing",
    accent: "orange",
    icon: Sparkles,
    image: "/assets/ayesmaj/service-worlds/ai-hero-campaign.webp",
    imageAlt: "Bright cinematic campaign world with beauty, product, and lifestyle imagery",
  },
  {
    number: "03",
    eyebrow: "Objects and spaces",
    title: "3D, CGI & Immersive Worlds",
    description:
      "Photoreal products, original characters, environments, and interactive worlds built to make the impossible feel physically present.",
    items: ["Product CGI", "Environment design", "3D animation", "Interactive experiences"],
    route: "/Worlds3D",
    accent: "violet",
    icon: Cuboid,
    image: "/assets/ayesmaj/service-worlds/worlds3d-hero.webp",
    imageAlt: "Bright futuristic 3D product gallery by AYESMAJ Studios",
  },
];

const CAPABILITIES = [
  {
    number: "01",
    title: "Brand Strategy & Identity",
    copy: "Positioning, visual systems, logos, packaging, and a point of view people can recognize.",
    image: "/assets/ayesmaj/generated/capabilities/capability-01-brand-strategy.webp",
    route: "/Branding",
    icon: Compass,
  },
  {
    number: "02",
    title: "AI Content Production",
    copy: "Cinematic campaigns, product visuals, commercials, and repeatable content engines.",
    image: "/assets/ayesmaj/generated/capabilities/capability-02-ai-content.webp",
    route: "/AiMarketing",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Web Design & Development",
    copy: "Fast, responsive digital experiences with premium interaction and a clear business goal.",
    image: "/assets/ayesmaj/generated/capabilities/capability-03-web-design.webp",
    route: "/WebExperiences",
    icon: MonitorUp,
  },
  {
    number: "04",
    title: "3D & CGI Worlds",
    copy: "Product renders, materials, characters, environments, and immersive digital spaces.",
    image: "/assets/ayesmaj/generated/capabilities/capability-04-3d-cgi.webp",
    route: "/Worlds3D",
    icon: Layers3,
  },
  {
    number: "05",
    title: "Motion, Film & VFX",
    copy: "Brand films, product animation, editing, motion design, and visual effects with impact.",
    image: "/assets/ayesmaj/generated/capabilities/capability-05-motion-film.webp",
    route: "/AiVideos",
    icon: Clapperboard,
  },
  {
    number: "06",
    title: "Campaign Art Direction",
    copy: "Big ideas translated into key visuals, launch systems, social assets, and visual consistency.",
    image: "/assets/ayesmaj/generated/capabilities/capability-06-art-direction.webp",
    route: "/Storyboards",
    icon: PenTool,
  },
];

const PROCESS = [
  ["01", "Direction", "Find the strongest idea and the clearest audience signal."],
  ["02", "Design", "Build the identity, visual language, and experience system."],
  ["03", "Create", "Produce the web, AI, motion, and 3D assets as one world."],
  ["04", "Launch", "Ship, refine, and give the brand room to keep growing."],
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.68, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Services() {
  useEffect(() => {
    document.title = "Creative Studio Services | AYESMAJ Studios";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="services-page">
      <div className="service-nav-backdrop" aria-hidden="true" />
      <AyesmajNav />

      <main>
        <section className="services-hero">
          <motion.div className="services-hero__copy" {...reveal()}>
            <p className="services-kicker"><Sparkles size={15} aria-hidden="true" /> One studio. Every creative skill.</p>
            <h1>
              Build the brand.<br />
              <em>Then build the world.</em>
            </h1>
            <p className="services-hero__lead">
              Strategy, websites, AI content, film, and 3D connected under one art direction - so every touchpoint feels unmistakably yours.
            </p>
            <div className="services-actions">
              <Link className="services-button services-button--primary" to="/Contact">
                Start a project <ArrowRight aria-hidden="true" />
              </Link>
              <a className="services-button services-button--ghost" href="#service-worlds">
                Explore services <ArrowRight aria-hidden="true" />
              </a>
            </div>
            <div className="services-hero__proof" aria-label="Studio capabilities">
              <span>Brand</span><i aria-hidden="true" />
              <span>Web</span><i aria-hidden="true" />
              <span>AI</span><i aria-hidden="true" />
              <span>Film</span><i aria-hidden="true" />
              <span>3D</span>
            </div>
          </motion.div>

          <motion.div className="services-hero__art" {...reveal(0.1)}>
            <figure className="services-hero__frame services-hero__frame--main">
              <img
                src="/assets/ayesmaj/service-worlds/ai-hero-campaign.webp"
                alt="A luminous AYESMAJ campaign world combining beauty, product, and cinematic storytelling"
              />
              <figcaption><span>AI campaign world</span><strong>Art direction at scale</strong></figcaption>
            </figure>
            <figure className="services-hero__frame services-hero__frame--web">
              <img src="/videos/websites/posters/rebound-skincare.jpg" alt="Rebound Aesthetics website by AYESMAJ Studios" />
              <figcaption><span>Web experience</span><strong>Designed to convert</strong></figcaption>
            </figure>
            <figure className="services-hero__frame services-hero__frame--3d">
              <img src="/assets/ayesmaj/service-worlds/worlds3d-hero.webp" alt="Bright futuristic 3D product gallery" />
              <figcaption><span>3D world</span><strong>Built beyond the screen</strong></figcaption>
            </figure>
            <div className="services-hero__stamp" aria-label="Six connected creative disciplines">
              <strong>06</strong><span>Connected<br />disciplines</span>
            </div>
          </motion.div>
        </section>

        <section className="services-manifesto" aria-label="AYESMAJ service philosophy">
          <span>Strategy gives it meaning.</span>
          <span>Design gives it a language.</span>
          <span>Technology gives it a world.</span>
        </section>

        <section id="service-worlds" className="services-section services-worlds">
          <motion.header className="services-heading" {...reveal()}>
            <div>
              <p className="services-kicker">Three ways in</p>
              <h2>One connected<br /><em>brand system.</em></h2>
            </div>
            <p>
              Start with the service you need now. We connect it to the larger visual world so the brand can grow without starting over.
            </p>
          </motion.header>

          <div className="services-world-grid">
            {SERVICE_WORLDS.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article className={`services-world services-world--${service.accent}`} {...reveal(index * 0.08)} key={service.number}>
                  <div className="services-world__media">
                    <img src={service.image} alt={service.imageAlt} loading="lazy" />
                    <span className="services-world__veil" aria-hidden="true" />
                    <span className="services-world__number">{service.number}</span>
                    <Icon className="services-world__icon" aria-hidden="true" />
                  </div>
                  <div className="services-world__copy">
                    <p>{service.eyebrow}</p>
                    <h3>{service.title}</h3>
                    <div className="services-world__description">{service.description}</div>
                    <ul>
                      {service.items.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
                    </ul>
                    <Link to={service.route}>Enter this world <ArrowUpRight aria-hidden="true" /></Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="services-capabilities">
          <motion.header className="services-capabilities__heading" {...reveal()}>
            <div>
              <p className="services-kicker services-kicker--light">Everything connects</p>
              <h2>One visual direction.<br /><em>Six ways to build it.</em></h2>
            </div>
            <p>Bring us one part or the whole problem. Every discipline is designed to hand off cleanly to the next.</p>
          </motion.header>

          <div className="services-capabilities__grid">
            {CAPABILITIES.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <motion.article className="services-capability" {...reveal(index * 0.05)} key={capability.number}>
                  <img src={capability.image} alt="" loading="lazy" />
                  <span className="services-capability__shade" aria-hidden="true" />
                  <div className="services-capability__top"><span>{capability.number}</span><Icon aria-hidden="true" /></div>
                  <div className="services-capability__copy">
                    <h3>{capability.title}</h3>
                    <p>{capability.copy}</p>
                    <Link to={capability.route} aria-label={`Explore ${capability.title}`}><ArrowUpRight aria-hidden="true" /></Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="services-section services-process">
          <motion.header className="services-heading" {...reveal()}>
            <div>
              <p className="services-kicker">How we work</p>
              <h2>From first signal<br />to <em>full world.</em></h2>
            </div>
            <p>A focused process keeps ambitious work clear, collaborative, and ready to launch.</p>
          </motion.header>
          <div className="services-process__grid">
            {PROCESS.map(([number, title, body], index) => (
              <motion.article {...reveal(index * 0.07)} key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="services-final">
          <img src="/assets/ayesmaj/service-worlds/ai-product-launch.webp" alt="" aria-hidden="true" loading="lazy" />
          <span className="services-final__shade" aria-hidden="true" />
          <motion.div {...reveal()}>
            <p className="services-kicker services-kicker--light">Your next world starts here</p>
            <h2>One idea can become an entire brand universe.</h2>
            <p>Tell us what you are building. We will shape the strongest way to bring it to life.</p>
            <Link className="services-button services-button--light" to="/Contact">
              Start the conversation <ArrowRight aria-hidden="true" />
            </Link>
          </motion.div>
        </section>
      </main>

      <AyesmajFooter />
    </div>
  );
}
