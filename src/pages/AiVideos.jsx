import React, { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Clapperboard,
  Film,
  Play,
  ScanLine,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";
import Seo from "@/components/ayesmaj/Seo";
import AyesmajNav from "@/components/ayesmaj/AyesmajNav";
import AyesmajFooter from "@/components/ayesmaj/AyesmajFooter";
import { AI_VIDEOS, SHOWREEL_FILMS } from "@/data/media";
import "./AiVideos.css";

const FILMS = [...AI_VIDEOS, ...SHOWREEL_FILMS];
const FEATURED = FILMS.find((film) => film.id === "syntropic-3d") || FILMS[0];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.68, delay, ease: [0.16, 1, 0.3, 1] },
});

const process = [
  ["01", "Direct", "Define the message, emotional beat, and visual language before the first frame."],
  ["02", "Build", "Create the worlds, products, characters, and shots the story needs."],
  ["03", "Move", "Animate, edit, score, and shape every transition around rhythm and attention."],
  ["04", "Finish", "Polish the final cut, VFX, sound, format, and campaign-ready delivery."],
];

function FilmCard({ film, index, onOpen }) {
  const videoRef = useRef(null);

  const playPreview = () => {
    if (!window.matchMedia("(hover: hover)").matches) return;
    videoRef.current?.play().catch(() => {});
  };

  const pausePreview = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
  };

  return (
    <motion.button
      {...reveal(index * 0.055)}
      type="button"
      className={`motion-film-card motion-film-card--${(index % 4) + 1}`}
      onClick={() => onOpen(film)}
      onMouseEnter={playPreview}
      onMouseLeave={pausePreview}
      onFocus={playPreview}
      onBlur={pausePreview}
      aria-label={`Play ${film.title}, ${film.category}`}
    >
      <video
        ref={videoRef}
        src={film.src}
        poster={film.poster}
        muted
        loop
        playsInline
        preload="metadata"
        tabIndex="-1"
        aria-hidden="true"
      />
      <span className="motion-film-card__shade" aria-hidden="true" />
      <span className="motion-film-card__index">{String(index + 1).padStart(2, "0")}</span>
      <span className="motion-film-card__play" aria-hidden="true"><Play /></span>
      <span className="motion-film-card__copy">
        <span>{film.category}</span>
        <strong>{film.title}</strong>
      </span>
    </motion.button>
  );
}

export default function AiVideos() {
  const [active, setActive] = useState(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    document.title = "Motion, Film & VFX | AYESMAJ Studios";
    window.scrollTo({ top: 0, behavior: "instant" });
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  const close = useCallback(() => setActive(null), []);

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => event.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close]);

  return (
    <div className="motion-page">
      <Seo
        title="Motion, Film & VFX | AYESMAJ Studios"
        description="Cinematic brand films, commercials, product animation, visual effects, and AI-powered motion production by AYESMAJ Studios."
        path="/AiVideos"
      />
      <div className="motion-nav-backdrop" aria-hidden="true" />
      <AyesmajNav />

      <main>
        <section className="motion-hero">
          <motion.div {...reveal()} className="motion-hero__copy">
            <p className="motion-kicker"><Clapperboard aria-hidden="true" /> Motion, film & VFX</p>
            <h1>Stories.<br />Products.<br /><em>Worlds in motion.</em></h1>
            <p className="motion-hero__lede">
              Brand films, product reveals, commercials, and cinematic visual effects—directed
              with intention and produced at the speed of modern creative technology.
            </p>
            <div className="motion-actions">
              <a href="#motion-work" className="motion-button motion-button--primary">
                Watch the work <Play aria-hidden="true" />
              </a>
              <Link to="/Contact" className="motion-button motion-button--ghost">
                Start your film <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <div className="motion-hero__services" aria-label="Motion production capabilities">
              <span>Creative direction</span>
              <span>AI production</span>
              <span>CGI & VFX</span>
              <span>Final cut</span>
            </div>
          </motion.div>

          <motion.div {...reveal(0.12)} className="motion-hero__stage">
            <button
              type="button"
              className="motion-feature"
              onClick={() => setActive(FEATURED)}
              aria-label={`Play featured film: ${FEATURED.title}`}
            >
              <video
                src={FEATURED.src}
                poster={FEATURED.poster}
                autoPlay={!reduceMotion}
                muted
                loop={!reduceMotion}
                playsInline
                preload="metadata"
                aria-label={`${FEATURED.title} cinematic preview`}
              />
              <span className="motion-feature__shade" aria-hidden="true" />
              <span className="motion-feature__chrome" aria-hidden="true"><i /><i /><i /><strong>AYESMAJ / DIRECTOR'S CUT</strong></span>
              <span className="motion-feature__play" aria-hidden="true"><Play /></span>
              <span className="motion-feature__caption"><small>Featured film</small><strong>{FEATURED.title}</strong></span>
            </button>
            <figure className="motion-stage-card motion-stage-card--one">
              <img src="/assets/ayesmaj/motion-posters/optimus.webp" alt="Optimus 3D animation campaign frame" />
              <figcaption>3D / Animation</figcaption>
            </figure>
            <figure className="motion-stage-card motion-stage-card--two">
              <img src="/assets/ayesmaj/motion-posters/yafora.webp" alt="Yafora product film with cinematic liquid effects" />
              <figcaption>Product / VFX</figcaption>
            </figure>
            <div className="motion-stage-note"><ScanLine aria-hidden="true" /><span>Film · AI · CGI · VFX</span><strong>One visual system. Every frame.</strong></div>
          </motion.div>
        </section>

        <section className="motion-signal" aria-label="AYESMAJ film production process">
          <span>Concept</span><i aria-hidden="true" /><span>Direct</span><i aria-hidden="true" />
          <span>Generate</span><i aria-hidden="true" /><span>Animate</span><i aria-hidden="true" /><span>Finish</span>
        </section>

        <section className="motion-statement">
          <motion.div {...reveal()}>
            <p className="motion-kicker"><Sparkles aria-hidden="true" /> The AYESMAJ difference</p>
            <h2>We do not make things move.<br /><em>We direct why they move.</em></h2>
          </motion.div>
          <motion.p {...reveal(0.08)}>
            Every shot earns its place. Film language, brand strategy, design, AI, 3D, sound,
            and editing work together so the result feels complete—not generated.
          </motion.p>
        </section>

        <section id="motion-work" className="motion-archive idv2-bgc idv2-bgc-01">
          <motion.div {...reveal()} className="motion-archive__heading">
            <div><p className="motion-kicker motion-kicker--light"><Film aria-hidden="true" /> Selected films</p><h2>Six films.<br /><em>Six different worlds.</em></h2></div>
            <p>Hover for a moving preview. Select any film to watch it full screen with sound and controls.</p>
          </motion.div>
          <div className="motion-film-grid">
            {FILMS.map((film, index) => <FilmCard key={film.id} film={film} index={index} onOpen={setActive} />)}
          </div>
        </section>

        <section className="motion-process">
          <motion.div {...reveal()} className="motion-process__heading">
            <p className="motion-kicker"><WandSparkles aria-hidden="true" /> From idea to final cut</p>
            <h2>A production system<br />built for <em>impact.</em></h2>
          </motion.div>
          <div className="motion-process__grid">
            {process.map(([number, title, body], index) => (
              <motion.article {...reveal(index * 0.065)} key={number}>
                <span>{number}</span><h3>{title}</h3><p>{body}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="motion-final">
          <img src="/assets/ayesmaj/motion-posters/syntropic-53.webp" alt="Syntropic cinematic technology film frame" loading="lazy" />
          <span aria-hidden="true" />
          <motion.div {...reveal()}>
            <p className="motion-kicker motion-kicker--light">Your story, in motion</p>
            <h2>Give the brand a film people remember.</h2>
            <Link to="/Contact" className="motion-button motion-button--light">Start a motion project <ArrowRight aria-hidden="true" /></Link>
          </motion.div>
        </section>
      </main>

      <AyesmajFooter />

      <AnimatePresence>
        {active && (
          <motion.div
            className="motion-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} film player`}
          >
            <button type="button" onClick={close} className="motion-modal__close" aria-label="Close film player"><X /></button>
            <motion.div
              initial={{ scale: 0.95, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, y: 8 }}
              transition={{ duration: 0.34, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="motion-modal__content"
            >
              <video key={active.id} src={active.src} poster={active.poster} autoPlay controls playsInline />
              <div><p>{active.category}</p><h3>{active.title}</h3></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
