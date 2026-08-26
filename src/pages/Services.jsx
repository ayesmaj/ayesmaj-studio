import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Box,
  Check,
  ChevronDown,
  Clapperboard,
  Code2,
  Compass,
  Film,
  Layers3,
  Package,
  Palette,
  PenTool,
  Play,
  Sparkles,
} from "lucide-react";
import AyesmajNav from "@/components/ayesmaj/AyesmajNav";
import AyesmajFooter from "@/components/ayesmaj/AyesmajFooter";
import Seo from "@/components/ayesmaj/Seo";
import { AI_VIDEOS, ANIMATIONS, SHOWREEL_FILMS, SITE_DEMOS } from "@/data/media";
import "./Services.css";

const VERSION = "services-20260809-v5";
const local = (path) => `${path}?v=${VERSION}`;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] },
});

const CORE_WORLDS = [
  {
    number: "01",
    title: "Web Experiences",
    subtitle: "Digital experiences built to sell, explain, and impress.",
    route: "/WebExperiences",
    accent: "lime",
    icon: Code2,
    media: SITE_DEMOS[4],
  },
  {
    number: "02",
    title: "AI Content & Marketing",
    subtitle: "Cinematic images, videos, campaigns, and scalable content.",
    route: "/AiMarketing",
    accent: "amber",
    icon: Sparkles,
    media: { src: "/brands/blenday/7.webm", poster: "/assets/ayesmaj/generated/capabilities/capability-02-ai-content.webp" },
  },
  {
    number: "03",
    title: "3D Worlds & CGI",
    subtitle: "Products, environments, animation, and immersive visual experiences.",
    route: "/Worlds3D",
    accent: "violet",
    icon: Box,
    media: { src: ANIMATIONS[2].src, poster: "/assets/ayesmaj/service-worlds/worlds3d-hero.webp" },
  },
];

const CAPABILITIES = [
  { number: "01", title: "Brand Strategy & Identity", text: "Positioning, identity, logo systems, typography, and brand language.", tags: ["Strategy", "Identity", "Guidelines"], route: "/ServiceBranding", icon: Compass, media: "/assets/ayesmaj/generated/capabilities/capability-01-brand-strategy.webp" },
  { number: "02", title: "Packaging & Label Design", text: "Packaging, labels, boxes, product systems, and retail presentation.", tags: ["Packaging", "Labels", "Retail"], route: "/ServiceBranding", icon: Package, media: "/generated/projects/ashe/cover.webp" },
  { number: "03", title: "Web Design & Development", text: "Premium websites, landing pages, responsive systems, and interaction.", tags: ["UX / UI", "Development", "Web"], route: "/WebExperiences", icon: Code2, media: "/assets/ayesmaj/generated/capabilities/capability-03-web-design.webp" },
  { number: "04", title: "AI Image Production", text: "Campaign images, social content, advertising visuals, and product worlds.", tags: ["Campaigns", "Social", "AI Images"], route: "/AiMarketing", icon: Sparkles, media: "/assets/ayesmaj/service-worlds/ai-fashion-campaign.webp" },
  { number: "05", title: "AI Video Production", text: "Commercials, social videos, cinematic campaigns, and brand films.", tags: ["AI Film", "Commercials", "Content"], route: "/AiMarketing", icon: Film, media: "/assets/ayesmaj/generated/capabilities/capability-02-ai-content.webp", video: AI_VIDEOS[1] },
  { number: "06", title: "3D Modeling & CGI", text: "Products, characters, environments, architecture, and branded worlds.", tags: ["Modeling", "CGI", "Environments"], route: "/Worlds3D", icon: Box, media: "/assets/ayesmaj/generated/capabilities/capability-04-3d-cgi.webp", video: { src: ANIMATIONS[6].src } },
  { number: "07", title: "Motion, Film & VFX", text: "Animation, editing, compositing, visual effects, and product films.", tags: ["Motion", "Film", "VFX"], route: "/AiVideos", icon: Clapperboard, media: "/assets/ayesmaj/generated/capabilities/capability-05-motion-film.webp", video: SHOWREEL_FILMS[0] },
  { number: "08", title: "Storyboards & Direction", text: "Concept development, shot planning, campaign direction, and visual storytelling.", tags: ["Concept", "Shots", "Direction"], route: "/Storyboards", icon: PenTool, media: "/storyboards-10/05-syntropic-one-computer-does-the-work-of-ten.webp" },
  { number: "09", title: "Campaign Art Direction", text: "Launch campaigns, advertising systems, key visuals, and social rollouts.", tags: ["Concept", "Launch", "Campaign"], route: "/AiMarketing", icon: Palette, media: "/assets/ayesmaj/generated/capabilities/capability-06-art-direction.webp" },
  { number: "10", title: "Brand Applications", text: "Vehicles, signage, print, merchandise, uniforms, and physical touchpoints.", tags: ["Applications", "Print", "Physical"], route: "/ServiceBranding", icon: Layers3, media: "/brands/arizona%20chimney%20pros/generated/master/brand-world-master.webp" },
];

const SELECTOR = [
  { label: "I need a new brand", services: ["Brand strategy", "Visual identity", "Packaging", "Website", "Launch content"], cta: "Build my brand", route: "/Contact" },
  { label: "I need a website", services: ["UX direction", "Responsive design", "Development", "Motion", "Conversion system"], cta: "Build my website", route: "/Contact" },
  { label: "I need more content", services: ["AI images", "AI video", "Social system", "Campaign direction", "Motion"], cta: "Build my content system", route: "/Contact" },
  { label: "I need a product launch", services: ["Campaign concept", "Packaging", "Product CGI", "Launch film", "Social rollout"], cta: "Plan my launch", route: "/Contact" },
  { label: "I need 3D / CGI", services: ["3D modeling", "Materials", "Environments", "Animation", "Final render"], cta: "Build it in 3D", route: "/Contact" },
  { label: "I need a full brand world", services: ["Strategy", "Identity", "Website", "Content", "AI video", "3D", "Campaign"], cta: "Start a brand world", route: "/Contact" },
];

const STORYBOARD_FRAMES = [
  ["01", "Idea", "/generated/storyboards/sb-01-idea.webp"],
  ["02", "Visual direction", "/generated/storyboards/sb-02-direction.webp"],
  ["03", "Shot design", "/storyboards-10/04-podos-infrastructure-arrives.webp"],
  ["04", "Hero frame", "/generated/storyboards/sb-03-hero.webp"],
  ["05", "Motion", "/generated/storyboards/sb-04-expand.webp"],
  ["06", "Final campaign", "/generated/storyboards/sb-05-launch.webp"],
];

const PROJECTS = [
  { name: "ASHÉ", category: "Branding", slug: "ashe", image: "/generated/projects/ashe/cover.webp" },
  { name: "Blenday", category: "AI", slug: "blenday", image: "/generated/projects/blenday/cover.webp" },
  { name: "PODOS AI", category: "Web", slug: "podos-ai", image: "/brands/podos%20ai/generated/master/brand-world-master.webp" },
  { name: "Noam", category: "3D", slug: "noam", image: "/generated/projects/noam/cover.webp" },
  { name: "Paranormal", category: "Motion", slug: "paranormal", image: "/generated/projects/paranormal/cover.webp" },
  { name: "Syntropic", category: "Storyboard", slug: "syntropic", image: "/brands/syntropic/generated/master/brand-world-master.webp" },
  { name: "Arizona Chimney Pros", category: "Branding", slug: "arizona-chimney-pros", image: "/brands/arizona%20chimney%20pros/generated/master/brand-world-master.webp" },
  { name: "Kolie", category: "Web", slug: "kolie", image: "/brands/kolie/generated/master/brand-world-master.webp" },
];

const FAQS = [
  ["What services does AYESMAJ Studios offer?", "We connect brand strategy, identity, packaging, web design and development, AI image and video production, 3D and CGI, motion, VFX, storyboards, and campaign art direction."],
  ["Can AYESMAJ build a complete brand from scratch?", "Yes. We can start with positioning and identity, then extend the system into packaging, websites, content, motion, CGI, and launch campaigns."],
  ["Do you design and develop websites?", "Yes. We create premium responsive websites, landing pages, interactive experiences, and connected digital systems."],
  ["Do you create AI videos and advertising content?", "Yes. We produce AI-assisted campaign imagery, commercials, social videos, product content, and scalable branded content systems."],
  ["Do you offer 3D animation and CGI?", "Yes. Our 3D work includes product visualization, environments, characters, architectural imagery, animation, and CGI campaign assets."],
  ["Can you work with an existing brand identity?", "Yes. We can strengthen an existing system, extend it into new channels, or build only the missing visual layers."],
  ["Do you work with companies outside Arizona?", "Yes. AYESMAJ Studios is based in Phoenix and collaborates with clients in other locations through a remote-friendly production process."],
  ["How does a project start?", "Start with the project form. We review the goal, scope, existing assets, and required deliverables, then recommend the right combination of services."],
  ["How long does a typical project take?", "Timing depends on scope, review cycles, and the number of connected deliverables. We define the schedule after the project brief is reviewed."],
  ["Can services be combined?", "Yes. The strongest work often connects strategy, identity, web, content, motion, and 3D into one coherent brand world."],
];

const PROCESS = [
  ["01", "Understand", "Define the brand, audience, challenge, and opportunity."],
  ["02", "Direct", "Build the creative direction and visual world."],
  ["03", "Create", "Produce identity, content, website, CGI, or film."],
  ["04", "Refine", "Test, polish, and unify every detail."],
  ["05", "Launch", "Activate the system across the right touchpoints."],
];

function Video({ media, label, className = "" }) {
  return (
    <video className={className} autoPlay muted loop playsInline preload="metadata" poster={media.poster ? local(media.poster) : undefined} aria-label={label}>
      <source src={media.src} type={media.src.includes(".webm") ? "video/webm" : "video/mp4"} />
    </video>
  );
}

function ServiceCard({ service, index }) {
  const Icon = service.icon;
  return (
    <motion.article className="svc-capability" {...reveal(index * 0.025)}>
      <Link to={service.route} className="svc-capability__link" aria-label={`Explore ${service.title}`}>
        <div className="svc-capability__media">
          {service.video ? <Video media={{ ...service.video, poster: service.video.poster || service.media }} label={service.title} /> : <img src={local(service.media)} alt="" width="1200" height="760" loading="lazy" />}
          <span className="svc-capability__shade" aria-hidden="true" />
          <span className="svc-capability__number">{service.number}</span>
          <span className="svc-capability__icon"><Icon aria-hidden="true" /></span>
        </div>
        <div className="svc-capability__copy">
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          <div><span>{service.tags.join(" · ")}</span><ArrowUpRight aria-hidden="true" /></div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function Services() {
  const [need, setNeed] = useState(0);
  const [filter, setFilter] = useState("All");
  const activeNeed = SELECTOR[need];
  const filteredProjects = useMemo(() => filter === "All" ? PROJECTS : PROJECTS.filter((project) => project.category === filter), [filter]);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://ayesmajstudios.com/" }, { "@type": "ListItem", position: 2, name: "Services", item: "https://ayesmajstudios.com/services" }] },
      { "@type": "ItemList", name: "AYESMAJ Studios creative services", itemListElement: CAPABILITIES.map((item, index) => ({ "@type": "Service", position: index + 1, name: item.title, description: item.text, provider: { "@type": "Organization", name: "AYESMAJ Studios" } })) },
      { "@type": "FAQPage", mainEntity: FAQS.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) },
    ],
  };

  const parallax = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width - 0.5) * 6}px`);
    event.currentTarget.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height - 0.5) * 6}px`);
  };

  return (
    <div className="services-shell">
      <Seo title="Creative Services | Branding, Web Design, AI Content & 3D | AYESMAJ Studios" description="Explore AYESMAJ Studios services including brand identity, premium web design, AI content and video, 3D CGI, motion, storyboards, packaging, and campaign art direction." path="/services" image="/assets/ayesmaj/generated/capabilities/capability-01-brand-strategy.webp" jsonLd={jsonLd} />
      <div className="services-nav-surface" aria-hidden="true" />
      <AyesmajNav />

      <main className="services-page">
        <section className="svc-hero" onPointerMove={parallax}>
          <div className="svc-hero__light" aria-hidden="true" />
          <motion.div className="svc-hero__copy" {...reveal()}>
            <p className="svc-kicker">AYESMAJ Services</p>
            <h1>One studio.<br /><span>Every visual layer.</span></h1>
            <p>Strategy, identity, websites, AI content, film, and 3D—directed as one connected creative system.</p>
            <div className="svc-actions">
              <a className="svc-button svc-button--gold" href="#core-worlds">Explore services <ArrowDown aria-hidden="true" /></a>
              <Link className="svc-button svc-button--glass" to="/Contact">Start a project <ArrowRight aria-hidden="true" /></Link>
            </div>
          </motion.div>
          <motion.div className="svc-hero__collage" {...reveal(0.1)} aria-label="AYESMAJ work across branding, web, AI, film, storyboards, and 3D">
            <img className="svc-hero__tile svc-hero__tile--identity" src={local("/assets/ayesmaj/generated/capabilities/capability-01-brand-strategy.webp")} alt="AYESMAJ brand identity system" />
            <Video className="svc-hero__tile svc-hero__tile--film" media={AI_VIDEOS[0]} label="AYESMAJ AI campaign film" />
            <img className="svc-hero__tile svc-hero__tile--web" src={local("/assets/ayesmaj/generated/capabilities/capability-03-web-design.webp")} alt="AYESMAJ responsive website experience" />
            <img className="svc-hero__tile svc-hero__tile--cgi" src={local("/assets/ayesmaj/service-worlds/worlds3d-product.webp")} alt="AYESMAJ 3D product visualization" />
            <img className="svc-hero__tile svc-hero__tile--story" src={local("/storyboards-10/10-ayesmaj-building-a-brand-world.webp")} alt="AYESMAJ storyboard" />
            <span className="svc-hero__hub"><strong>AYESMAJ</strong><small>One visual system</small></span>
          </motion.div>
        </section>

        <section id="core-worlds" className="svc-core section-dark idv2-bgc idv2-bgc-04">
          <motion.header className="svc-section-head svc-section-head--center" {...reveal()}>
            <p className="svc-kicker">The connected system</p>
            <h2>Three worlds.<br /><span>One brand system.</span></h2>
          </motion.header>
          <div className="svc-core__grid">
            {CORE_WORLDS.map((world, index) => {
              const Icon = world.icon;
              return (
                <motion.article key={world.number} className={`svc-world svc-world--${world.accent}`} {...reveal(index * 0.07)}>
                  <Link to={world.route}>
                    <Video media={world.media} label={`${world.title} showreel`} />
                    <span className="svc-world__shade" aria-hidden="true" />
                    <span className="svc-world__number">{world.number}</span>
                    <span className="svc-world__icon"><Icon aria-hidden="true" /></span>
                    <div><h3>{world.title}</h3><p>{world.subtitle}</p><span>Explore <ArrowRight aria-hidden="true" /></span></div>
                  </Link>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="svc-capabilities section-paper">
          <motion.header className="svc-section-head" {...reveal()}>
            <p className="svc-kicker">Full creative stack</p>
            <h2>Everything your brand<br /><span>needs to look complete.</span></h2>
            <p>Ten connected capabilities. Every visual comes from AYESMAJ work.</p>
          </motion.header>
          <div className="svc-capabilities__grid">{CAPABILITIES.map((service, index) => <ServiceCard service={service} index={index} key={service.number} />)}</div>
        </section>

        <section className="svc-selector section-warm">
          <motion.header className="svc-section-head" {...reveal()}><p className="svc-kicker">Service selector</p><h2>What are you<br /><span>building?</span></h2></motion.header>
          <div className="svc-selector__layout">
            <div className="svc-selector__options" role="tablist" aria-label="Choose what you are building">
              {SELECTOR.map((item, index) => <button type="button" role="tab" aria-selected={need === index} key={item.label} onClick={() => setNeed(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}<ArrowRight aria-hidden="true" /></button>)}
            </div>
            <motion.div key={need} className="svc-selector__result" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}>
              <p>Recommended creative system</p><h3>{activeNeed.label}</h3>
              <ul>{activeNeed.services.map((service) => <li key={service}><Check aria-hidden="true" />{service}</li>)}</ul>
              <Link className="svc-button svc-button--ink" to={activeNeed.route}>{activeNeed.cta}<ArrowRight aria-hidden="true" /></Link>
            </motion.div>
          </div>
        </section>

        <section className="svc-feature svc-feature--branding section-paper">
          <motion.div className="svc-feature__copy" {...reveal()}><p className="svc-kicker">Branding & identity</p><h2>Build the language<br />before you build the noise.</h2><p>We create the visual system that everything else grows from.</p><div className="svc-tags">Strategy · Visual identity · Logo systems · Typography · Packaging · Guidelines</div><Link className="svc-button svc-button--ink" to="/ServiceBranding">Explore branding <ArrowRight /></Link></motion.div>
          <motion.div className="svc-feature__brand-board" {...reveal(0.08)}><img src={local("/brands/ashe/generated/master/brand-world-master.webp")} alt="ASHÉ identity system with logo, palette, typography, packaging, and applications" loading="lazy" /><img src={local("/brands/blenday/generated/packaging/packaging-lineup.webp")} alt="Blenday packaging system" loading="lazy" /><img src={local("/generated/projects/paranormal/cover.webp")} alt="Paranormal campaign poster" loading="lazy" /></motion.div>
        </section>

        <section className="svc-feature svc-feature--web section-glass">
          <motion.div className="svc-feature__copy" {...reveal()}><p className="svc-kicker">Web experiences</p><h2>Websites that feel<br />like premium products.</h2><p>Responsive digital showrooms built to explain, impress, and convert.</p><div className="svc-tags">UX / UI · Landing pages · Interactive websites · AI integration · Development</div><Link className="svc-button svc-button--ink" to="/WebExperiences">Explore web experiences <ArrowRight /></Link></motion.div>
          <motion.div className="svc-feature__web-stack" {...reveal(0.08)}><Video media={SITE_DEMOS[1]} label="PODOS AI website" /><Video media={SITE_DEMOS[2]} label="Rebound premium website" /><Video media={SITE_DEMOS[5]} label="Electric Fuel America website" /></motion.div>
        </section>

        <section className="svc-feature svc-feature--ai section-campaign">
          <motion.div className="svc-feature__copy" {...reveal()}><p className="svc-kicker">AI content & marketing</p><h2>Content built<br />at the speed of culture.</h2><p>Campaign frames, product content, social systems, and films made to stay visible.</p><div className="svc-tags">AI images · AI video · Social content · Campaign visuals · Product content</div><Link className="svc-button svc-button--gold" to="/AiMarketing">Explore AI content <ArrowRight /></Link></motion.div>
          <div className="svc-media-wall">{AI_VIDEOS.map((video) => <Video key={video.id} media={video} label={video.title} />)}<img src={local("/assets/ayesmaj/service-worlds/ai-hero-campaign.webp")} alt="AYESMAJ AI hero campaign" loading="lazy" /><img src={local("/assets/ayesmaj/service-worlds/ai-product-launch.webp")} alt="AYESMAJ AI product launch" loading="lazy" /></div>
        </section>

        <section className="svc-cgi section-cgi">
          <motion.header className="svc-section-head svc-section-head--center" {...reveal()}><p className="svc-kicker">3D & CGI</p><h2>If it doesn’t exist,<br /><span>we can build it.</span></h2></motion.header>
          <div className="svc-cgi__stages">{[["Sketch", "/generated/before-after/product-before.webp"], ["Wireframe", "/assets/ayesmaj/generated/capabilities/capability-04-3d-cgi.webp"], ["Material", "/assets/ayesmaj/service-worlds/worlds3d-product.webp"], ["Final CGI", "/assets/ayesmaj/service-worlds/worlds3d-hero.webp"]].map(([label, image], index) => <motion.figure key={label} {...reveal(index * .05)}><img src={local(image)} alt={`${label} stage of AYESMAJ 3D production`} loading="lazy" /><figcaption><span>{String(index + 1).padStart(2, "0")}</span>{label}</figcaption></motion.figure>)}</div>
          <div className="svc-cgi__reel"><Video media={{ src: ANIMATIONS[10].src, poster: "/assets/ayesmaj/service-worlds/worlds3d-environment.webp" }} label="AYESMAJ 3D environment animation" /><div><p>Modeling · Product visualization · Environments · Characters · Animation · Simulation</p><Link className="svc-button svc-button--glass" to="/Worlds3D">Explore 3D & CGI <ArrowRight /></Link></div></div>
        </section>

        <section className="svc-motion section-film idv2-bgc idv2-bgc-01">
          <motion.header className="svc-section-head" {...reveal()}><p className="svc-kicker">Motion, film & VFX</p><h2>Make it move.<br /><span>Make it stay with them.</span></h2></motion.header>
          <div className="svc-motion__strip">{SHOWREEL_FILMS.map((film, index) => <motion.article key={film.id} {...reveal(index * .06)}><Video media={film} label={film.title} /><div><Play aria-hidden="true" /><span>{film.title}</span><small>{film.category}</small></div></motion.article>)}</div>
          <Link className="svc-button svc-button--gold" to="/AiVideos">Explore motion <ArrowRight /></Link>
        </section>

        <section className="svc-story section-story">
          <motion.header className="svc-section-head" {...reveal()}><p className="svc-kicker">Storyboards & creative direction</p><h2>Every strong frame<br /><span>starts with a plan.</span></h2></motion.header>
          <div className="svc-story__grid">{STORYBOARD_FRAMES.map(([number, title, image], index) => <motion.figure key={number} {...reveal(index * .03)}><img src={local(image)} alt={`${number} ${title} storyboard frame`} loading="lazy" /><figcaption><span>{number}</span>{title}</figcaption></motion.figure>)}</div>
          <Link className="svc-button svc-button--ink" to="/Storyboards">Explore storyboards <ArrowRight /></Link>
        </section>

        <section className="svc-applications section-paper">
          <motion.header className="svc-section-head" {...reveal()}><p className="svc-kicker">Packaging & campaign applications</p><h2>A brand should work<br /><span>everywhere it appears.</span></h2></motion.header>
          <div className="svc-applications__grid">{[
            ["/generated/projects/ashe/cover.webp", "ASHÉ packaging"], ["/generated/projects/blenday/cover.webp", "Blenday product campaign"], ["/brands/arizona%20chimney%20pros/generated/master/brand-world-master.webp", "Arizona Chimney Pros vehicle and service branding"], ["/generated/projects/lacroix/cover.webp", "LaCroix product campaign"], ["/generated/projects/paranormal/cover.webp", "Paranormal packaging and poster"], ["/generated/projects/pita-basta/cover.webp", "Pita Basta retail brand application"]
          ].map(([image, alt], index) => <motion.img key={image} src={local(image)} alt={alt} loading="lazy" {...reveal(index * .03)} />)}</div>
        </section>

        <section className="svc-work section-dark idv2-bgc idv2-bgc-08">
          <motion.header className="svc-section-head" {...reveal()}><p className="svc-kicker">Selected service work</p><h2>Selected <span>work.</span></h2></motion.header>
          <div className="svc-work__filters" role="group" aria-label="Filter selected work">{["All", "Branding", "Web", "AI", "3D", "Motion", "Storyboard"].map((item) => <button type="button" aria-pressed={filter === item} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div>
          <motion.div className="svc-work__grid" layout>{filteredProjects.map((project) => <motion.article layout key={project.slug}><Link to={`/BrandDetail?slug=${project.slug}`}><img src={local(project.image)} alt={`${project.name} project`} loading="lazy" /><div><span>{project.category}</span><h3>{project.name}</h3><p>View project <ArrowUpRight /></p></div></Link></motion.article>)}</motion.div>
          <Link className="svc-button svc-button--glass" to="/Work">View all work <ArrowRight /></Link>
        </section>

        <section className="svc-process section-paper">
          <motion.header className="svc-section-head svc-section-head--center" {...reveal()}><p className="svc-kicker">Our process</p><h2>From idea<br /><span>to impact.</span></h2></motion.header>
          <div className="svc-process__grid">{PROCESS.map(([number, title, text], index) => <motion.article key={number} {...reveal(index * .05)}><span>{number}</span><h3>{title}</h3><p>{text}</p>{index < PROCESS.length - 1 && <ArrowRight aria-hidden="true" />}</motion.article>)}</div>
        </section>

        <section className="svc-faq section-warm">
          <motion.header className="svc-section-head" {...reveal()}><p className="svc-kicker">Questions, answered</p><h2>Before we<br /><span>start building.</span></h2></motion.header>
          <div className="svc-faq__list">{FAQS.map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
        </section>

        <section className="svc-final">
          <div className="svc-final__media" aria-hidden="true"><img src={local("/generated/projects/ashe/cover.webp")} alt="" /><img src={local("/assets/ayesmaj/generated/capabilities/capability-03-web-design.webp")} alt="" /><img src={local("/assets/ayesmaj/service-worlds/worlds3d-hero.webp")} alt="" /><img src={local("/generated/projects/blenday/cover.webp")} alt="" /></div>
          <motion.div {...reveal()}><p className="svc-kicker">Build the complete system</p><h2>Don’t buy a service.<br /><span>Build a brand world.</span></h2><p>Tell us what you’re building. We’ll help define the right combination of strategy, design, content, web, and 3D.</p><div className="svc-actions"><Link className="svc-button svc-button--gold" to="/Contact">Start a project <ArrowRight /></Link><Link className="svc-button svc-button--glass" to="/Work">View our work <ArrowRight /></Link></div></motion.div>
        </section>
      </main>

      <AyesmajFooter />
    </div>
  );
}
