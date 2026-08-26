/* Shared interactive sections for the Furniture / Apartments / Homes experience pages.
   StickyStory + ZoomFinale are rewrites of 21st catalog patterns ("Scroll 01",
   "Immersive Scroll Gallery") into the AYESMAJ plain-CSS + framer-motion system. */
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion';
import './xp.css';
import './bathrooms-x.css'; // shared bx-* patterns (material room, dark strip) reused by the experience pages

export function useSimple(maxWidth = 860) {
  const [simple, setSimple] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidth}px)`);
    const set = () => setSimple(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, [maxWidth]);
  return simple;
}

function StoryStep({ step, index, setActive }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 20%'] });
  const isActive = useTransform(scrollYProgress, (v) => v > 0.35 && v < 0.75);
  useMotionValueEvent(isActive, 'change', (v) => { if (v) setActive((prev) => (prev === index ? prev : index)); });
  return (
    <div ref={ref} className="xp-story-step idv2-reveal">
      <span className="idv-mono-label">{`0${index + 1} — ${step.tag}`}</span>
      <h3>{step.title}</h3>
      {step.line ? <p>{step.line}</p> : null}
    </div>
  );
}

/** Sticky media panel + scrolling steps; the visible image follows the step in view. */
export function StickyStory({ steps, ariaLabel = 'Story' }) {
  const [active, setActive] = useState(0);
  return (
    <div className="xp-story" role="group" aria-label={ariaLabel}>
      <div className="xp-story-media" aria-hidden="true">
        {steps.map((s, i) => (
          <img key={s.tag} src={s.src} alt="" data-active={active === i} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
        ))}
      </div>
      <div className="xp-story-steps">
        {steps.map((s, i) => <StoryStep key={s.tag} step={s} index={i} setActive={setActive} />)}
      </div>
    </div>
  );
}

/** Figure with % hotspots activated by an external legend. */
export function SpotFigure({ src, alt, spots, active, caption }) {
  return (
    <figure className="xp-spot-fig">
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {spots.map((s) => <span key={s.key} className="xp-spot" data-active={active === s.key} style={{ left: `${s.at[0]}%`, top: `${s.at[1]}%` }} aria-hidden="true" />)}
      {caption ? <figcaption className="idsp-cap"><span>{caption[0]}</span><span>{caption[1]}</span></figcaption> : null}
    </figure>
  );
}

export function Legend({ items, active, setActive, ariaLabel }) {
  return (
    <div className="xp-legend" role="group" aria-label={ariaLabel}>
      {items.map((h) => (
        <button key={h.key} type="button" className="idv2-chip" aria-pressed={active === h.key}
          onMouseEnter={() => setActive(h.key)} onFocus={() => setActive(h.key)}
          onMouseLeave={() => setActive(null)} onClick={() => setActive(active === h.key ? null : h.key)}>
          {h.label}
        </button>
      ))}
    </div>
  );
}

/** Scroll-scrubbed full-screen film with staged headlines.
    Scrubs on every viewport (owner request 2026-08-26) - phones get the
    lighter -mobile encode, re-encoded to the same 0.25 s keyframe grid so
    seeks stay instant. Plain playback remains only for reduced motion. */
export function FilmScrub({ film, stages, credit, height = '320vh' }) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();
  const simple = useSimple();
  const [progress, setProgress] = useState(0);
  const [dead, setDead] = useState(false); // the film may not be rendered yet - collapse instead of a broken player
  const [near, setNear] = useState(false); // keep the network idle until the section approaches
  const [painted, setPainted] = useState(false); // has the decoder produced ANY frame yet
  /* Two rounds of Safari-specific fixes did not stop an iPhone rendering these
     sections black (owner, 2026-08-26). Rather than keep guessing at a browser
     I cannot test here, the component now PROVES it is painting: if no real
     video frame reaches the compositor shortly after the first seek, scrubbing
     is declared broken on this device and the section falls back to the plain
     playing film - the presentation phones had before scrubbing was enabled,
     which the owner confirmed worked. Wrong-but-watchable beats black. */
  const [scrubBroken, setScrubBroken] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current; if (!el) return undefined;
    const io = new IntersectionObserver((entries) => { if (entries.some((e) => e.isIntersecting)) { setNear(true); io.disconnect(); } }, { rootMargin: '150% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !near) return undefined;
    const wrap = wrapRef.current; const video = videoRef.current;
    if (!wrap || !video) return undefined;
    let raf = 0;
    /* iOS Safari will not paint frames for a muted inline video that has never
       entered playback: currentTime seeks "succeed" while the element stays
       black (owner report from an iPhone, 2026-08-26). One play() immediately
       paused once data exists unlocks the decoder - legal without a gesture
       because the video is muted+playsInline. Low Power Mode can still reject
       play(), which is why the poster also backs the element as a CSS
       background: an unpaintable frame shows the poster, never black. */
    const prime = () => {
      const p = video.play();
      if (p && typeof p.then === 'function') p.then(() => video.pause()).catch(() => {});
    };
    if (video.readyState >= 2) prime();
    else video.addEventListener('loadeddata', prime, { once: true });

    /* requestVideoFrameCallback fires only when a frame is actually handed to
       the compositor, which is the one signal that means "this element is
       really showing video". readyState and seeked both lie here: on iOS they
       report success while nothing is painted, which is why the previous fix
       hid the poster and revealed black underneath. */
    const hasRVFC = typeof video.requestVideoFrameCallback === 'function';
    let framePresented = false;
    let watchdog = 0;
    const onFrame = () => { framePresented = true; setPainted(true); };
    if (hasRVFC) video.requestVideoFrameCallback(onFrame);
    const markPainted = () => { if (video.readyState >= 2) { framePresented = true; setPainted(true); } };
    if (!hasRVFC) {
      // No frame-level signal available: fall back to the older heuristic.
      video.addEventListener('loadeddata', markPainted);
      video.addEventListener('seeked', markPainted);
      markPainted();
    }
    /* Armed on the first seek attempt. If nothing has painted by then the
       device cannot scrub - hand the section to the plain player instead. */
    const armWatchdog = () => {
      if (watchdog || framePresented) return;
      watchdog = setTimeout(() => {
        if (!framePresented) setScrubBroken(true);
      }, 3500);
    };

    const update = () => {
      raf = 0;
      if (!Number.isFinite(video.duration) || video.duration === 0) return;
      const rect = wrap.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      if (range <= 0) return;
      const p = Math.max(0, Math.min(1, -rect.top / range));
      setProgress(p);
      /* THE mobile bug (owner report 2026-08-26, black film while scrolling):
         a scroll fires this every frame, and issuing a new seek while the last
         one is still in flight cancels it. Under a finger-flick the decoder is
         restarted continuously and never completes ANY seek, so the element sits
         in HAVE_METADATA - no frame - which paints black. Measured on the live
         page: readyState 1, seeking true, for as long as the scroll continued.
         Desktop hid this because the file was already fully buffered.
         One seek at a time: skip while seeking and the next rAF picks up the
         then-current scroll position, which is the one that matters anyway. */
      if (video.seeking) return;
      // seeks snap to the 0.25s keyframe grid so the decoder never walks a GOP
      const target = Math.min(Math.round(p * video.duration * 4) / 4, video.duration - 1 / 30);
      if (Math.abs(target - video.currentTime) >= 0.2) {
        armWatchdog();
        // fastSeek lands on the nearest keyframe without decoding forward -
        // with a keyframe every 0.25s that IS the target, and Safari treats it
        // far more reliably than assigning currentTime mid-scroll.
        if (typeof video.fastSeek === 'function') video.fastSeek(target);
        else video.currentTime = target;
        if (hasRVFC && !framePresented) video.requestVideoFrameCallback(onFrame);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    video.addEventListener('loadedmetadata', update);
    // A finished seek may have landed on a stale target; re-run once it lands.
    video.addEventListener('seeked', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      video.removeEventListener('loadedmetadata', update);
      video.removeEventListener('seeked', onScroll);
      video.removeEventListener('loadeddata', prime);
      video.removeEventListener('loadeddata', markPainted);
      video.removeEventListener('seeked', markPainted);
      if (raf) cancelAnimationFrame(raf);
      if (watchdog) clearTimeout(watchdog);
    };
  }, [simple, reduced, near]);

  if (dead) return null;
  const flat = reduced || scrubBroken;
  const stage = stages.reduce((acc, s) => (progress >= s.at ? s : acc), stages[0]);
  return (
    <section ref={sectionRef} className="xp-film" aria-label={credit}>
      {flat ? (
        <div className="xp-film-flat">
          {near ? (
            <video autoPlay muted loop playsInline preload="metadata" poster={film.poster} style={{ backgroundImage: `url(${film.poster})`, backgroundSize: 'cover', backgroundPosition: 'center' }} aria-label={credit} onError={() => setDead(true)}>
              {film.mobile ? <source src={film.mobile} media="(max-width: 767px)" type="video/mp4" /> : null}
              <source src={film.desktop} type="video/mp4" />
            </video>
          ) : (
            <img src={film.poster} alt="" aria-hidden="true" style={{ width: '100%', height: '72svh', objectFit: 'cover', display: 'block' }} onError={() => setDead(true)} />
          )}
          <div className="xp-film-copy"><h2 className="idv2-pinseq-head">{stages[stages.length - 1].node}</h2></div>
        </div>
      ) : (
        <div ref={wrapRef} className="idv2-pin-wrap" style={{ height }}>
          <div className="idv2-pin">
            <video ref={videoRef} data-scrub muted playsInline preload={near ? 'auto' : 'none'} poster={film.poster} src={near ? (simple && film.mobile ? film.mobile : film.desktop) : undefined} aria-label={credit} onError={() => setDead(true)} />
            {/* A <video> with no decoded frame paints opaque black, so a CSS
                background behind it is useless - the cover has to sit ON TOP.
                It fades out on the first decoded frame and is not brought back:
                from then on the element always holds the last frame. */}
            <img className="xp-film-poster" src={film.poster} alt="" aria-hidden="true" data-painted={painted} />
            <div className="idv2-pin-scrim" />
            <div className="xp-film-copy">
              <h2 className="idv2-pinseq-head" aria-live="polite">{stage.node}</h2>
              <div className="idv-mono-label" style={{ color: 'rgba(245,245,240,.65)' }}>{credit}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/** Pinned multi-rate zoom of layered deliverables ending on a statement. */
export function ZoomFinale({ items, children, height = '220vh' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const simple = useSimple();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const rates = [3.2, 4.2, 5.2, 4.6, 5.8, 6.6, 7.4, 8.2];
  const scales = rates.map((r) => useTransform(scrollYProgress, [0, 1], [1, r])); // eslint-disable-line react-hooks/rules-of-hooks
  const fade = useTransform(scrollYProgress, [0.55, 0.85], [1, 0]);
  const copyIn = useTransform(scrollYProgress, [0.6, 0.85], [0, 1]);
  if (simple || reduced) {
    return (
      <div style={{ display: 'grid', gap: 14 }}>
        <div className="idsp-gallery idsp-gallery--3" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {items.slice(0, 6).map((it) => <img key={it.src} src={it.src} alt={it.alt} loading="lazy" decoding="async" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 14 }} />)}
        </div>
        <div style={{ display: 'grid', gap: 12, justifyItems: 'start' }}>{children}</div>
      </div>
    );
  }
  return (
    <div ref={ref} className="xp-zoom-wrap" style={{ height }}>
      <div className="xp-zoom-pin">
        {items.map((it, i) => (
          <motion.div key={it.src} className="xp-zoom-item" style={{ scale: scales[i % rates.length], opacity: fade }} aria-hidden="true">
            <div style={{ position: 'relative', width: it.w, height: it.h, top: it.top, left: it.left }}>
              <img src={it.src} alt="" style={{ width: '100%', height: '100%' }} loading="lazy" decoding="async" />
            </div>
          </motion.div>
        ))}
        <motion.div className="xp-zoom-copy" style={{ opacity: copyIn }}>{children}</motion.div>
      </div>
    </div>
  );
}
