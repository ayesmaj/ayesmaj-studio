/**
 * SpacePage — shared renderer for the six Interior Design space / property
 * pages (owner brief 2026-08-22: kitchens, bathrooms, furniture-decor,
 * apartments, homes, buildings). One config per page (see ./configs), one
 * visual world (the existing AYESMAJ shell, kit components, tokens and the
 * dark-background library — nothing re-invented here).
 *
 * Rhythm per page: HERO → bright → full-screen media → dark → bright → dark
 * film → existing pre-footer/footer (InteriorShell). Media is resolved from
 * src/content/interior-design-generated-media.ts by (page, slot) — never by
 * hardcoded paths.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { InteriorShell, Eyebrow, MediaFigure, IdvButton, CtaBand, MethodSwitcher } from '@/components/interior/kit';
import DarkSectionBackground from '@/components/interior/DarkSectionBackground';
import BeforeAfterSlider from '@/components/ayesmaj/BeforeAfterSlider';
import ModelViewer from '@/components/interior/ModelViewer';
import InteriorDesignHero from '@/features/interior-design/hero/InteriorDesignHero.jsx';
import { INTERIOR_MENU } from '@/data/siteConfig';
import { media as getMedia } from '@/content/interior-design-generated-media';
import './spaces.css';

const EASE = [0.22, 1, 0.36, 1];
const rise = (d = 0) => ({ initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.8, delay: d, ease: EASE } });

/** Headline lines; `gradient` marks the one strategic phrase (brief §4). */
function Headline({ lines, gradient, as: Tag = 'h2', className = '' }) {
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <React.Fragment key={i}>
          {gradient.includes(i) ? <span className="idv2-grad">{l}</span> : l}
          {i < lines.length - 1 ? <br /> : null}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/** <picture> for a manifest asset with its dedicated mobile crop. */
function Pic({ m, className = '', style, eager = false, cover = true }) {
  if (!m) return null;
  return (
    <picture className={className} style={style}>
      {m.mobileFile ? <source media="(max-width: 767px)" srcSet={m.mobileFile} /> : null}
      <img src={m.file} alt={m.alt} width={m.width} height={m.height} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchpriority={eager ? 'high' : undefined} style={cover ? { width: '100%', height: '100%', objectFit: 'cover', display: 'block' } : { width: '100%', height: 'auto', display: 'block' }} />
    </picture>
  );
}

function Caption({ m, tag }) {
  if (!m) return null;
  return <figcaption className="idsp-cap"><span>{m.alt}</span>{tag || m.project ? <span>{tag || m.project}</span> : null}</figcaption>;
}

/* ── Spaces rail: Overview · Spaces · Property types ─────────────────────── */
export function SpacesRail({ path }) {
  const items = [INTERIOR_MENU.overview, ...INTERIOR_MENU.groups.flatMap((g) => g.items)];
  return (
    <nav className="idv2-rail" aria-label="Interior design spaces and property types">
      <span className="idv2-rail-group">INTERIOR DESIGN</span>
      {items.map((i) => (
        <Link key={i.to} to={i.to} aria-current={path === i.to ? 'page' : undefined}>{i.label.replace(' & Developments', '')}</Link>
      ))}
    </nav>
  );
}

/* ── Heroes ───────────────────────────────────────────────────────────────── */
function HeroBright({ cfg, M }) {
  const main = M(cfg.hero.media[0]);
  return (
    <section className="idv2-section idv2-gradient-soft idsp-hero idsp-hero--bright">
      <div className="idv2-inner idsp-hero-grid">
        <div className="idsp-hero-copy">
          <motion.div {...rise(0)}><Eyebrow>{cfg.hero.eyebrow}</Eyebrow></motion.div>
          <motion.div {...rise(0.08)}><Headline as="h1" className="idv2-display idv2-display--hero idsp-h1" lines={cfg.hero.lines} gradient={cfg.hero.gradient} /></motion.div>
          <motion.p {...rise(0.18)} className="idv-lede">{cfg.hero.lede}</motion.p>
          <motion.div {...rise(0.26)} className="idsp-ctas">
            <IdvButton to={cfg.hero.primary.to}>{cfg.hero.primary.label}</IdvButton>
            <IdvButton to={cfg.hero.secondary.to} ghost>{cfg.hero.secondary.label}</IdvButton>
          </motion.div>
          <motion.div {...rise(0.34)} className="idv-mono-label">{cfg.hero.strip}</motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40, scale: 1.03 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: EASE }} className="idsp-hero-media">
          <figure className="idsp-hero-main"><Pic m={main} eager /><Caption m={main} /></figure>
          <div className="idsp-hero-layers" aria-hidden="true">
            {cfg.hero.layers.map((id, i) => { const m = M(id); return m ? <div key={id} className={`idsp-hero-layer idsp-hero-layer--${i + 1}`}><Pic m={m} /></div> : null; })}
          </div>
        </motion.div>
      </div>
      <SpacesRail path={cfg.path} />
    </section>
  );
}

function HeroDark({ cfg, M }) {
  const main = M(cfg.hero.media[0]);
  return (
    <section className="idv2-section idv2-dark idsp-hero idsp-hero--dark">
      <DarkSectionBackground asset={cfg.hero.bgAsset} position="center right" overlay={0.62} textSide="left" glow={cfg.hero.glow || 'purple'} />
      <div className="idv2-inner idsp-hero-grid">
        <div className="idsp-hero-copy">
          <motion.div {...rise(0)}><Eyebrow>{cfg.hero.eyebrow}</Eyebrow></motion.div>
          <motion.div {...rise(0.08)}><Headline as="h1" className="idv2-display idv2-display--hero idsp-h1" lines={cfg.hero.lines} gradient={cfg.hero.gradient} /></motion.div>
          <motion.p {...rise(0.18)} className="idv-lede">{cfg.hero.lede}</motion.p>
          <motion.div {...rise(0.26)} className="idsp-ctas">
            <IdvButton to={cfg.hero.primary.to}>{cfg.hero.primary.label}</IdvButton>
            <IdvButton to={cfg.hero.secondary.to} ghost>{cfg.hero.secondary.label}</IdvButton>
          </motion.div>
          <motion.div {...rise(0.34)} className="idv-mono-label">{cfg.hero.strip}</motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40, scale: 1.03 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: EASE }} className="idsp-hero-media">
          <figure className="idsp-hero-main"><Pic m={main} eager /><Caption m={main} /></figure>
          <div className="idsp-hero-layers" aria-hidden="true">
            {cfg.hero.layers.map((id, i) => { const m = M(id); return m ? <div key={id} className={`idsp-hero-layer idsp-hero-layer--${i + 1}`}><Pic m={m} /></div> : null; })}
          </div>
        </motion.div>
      </div>
      <SpacesRail path={cfg.path} />
    </section>
  );
}

function HeroFull({ cfg, M }) {
  const main = M(cfg.hero.media[0]);
  return (
    <section className="idv2-full idsp-hero idsp-hero--full">
      <Pic m={main} eager className="idsp-full-bg" />
      <div className="idv2-full-scrim idsp-hero-scrim" />
      <div className="idv2-inner idsp-hero-grid idsp-hero-grid--full">
        <div className="idsp-hero-copy">
          <motion.div {...rise(0)}><Eyebrow>{cfg.hero.eyebrow}</Eyebrow></motion.div>
          <motion.div {...rise(0.08)}><Headline as="h1" className="idv2-display idv2-display--hero idsp-h1" lines={cfg.hero.lines} gradient={cfg.hero.gradient} /></motion.div>
          <motion.p {...rise(0.18)} className="idv-lede">{cfg.hero.lede}</motion.p>
          <motion.div {...rise(0.26)} className="idsp-ctas">
            <IdvButton to={cfg.hero.primary.to}>{cfg.hero.primary.label}</IdvButton>
            <IdvButton to={cfg.hero.secondary.to} ghost>{cfg.hero.secondary.label}</IdvButton>
          </motion.div>
          <motion.div {...rise(0.34)} className="idv-mono-label">{cfg.hero.strip}</motion.div>
        </div>
        <div className="idsp-hero-layers idsp-hero-layers--full" aria-hidden="true">
          {cfg.hero.layers.map((id, i) => { const m = M(id); return m ? <div key={id} className={`idsp-hero-layer idsp-hero-layer--${i + 1}`}><Pic m={m} /></div> : null; })}
        </div>
      </div>
      <SpacesRail path={cfg.path} />
    </section>
  );
}

/* ── Chapters ─────────────────────────────────────────────────────────────── */
function ChapterHead({ c }) {
  return (
    <div className="idv2-reveal idsp-head">
      <Eyebrow>{c.eyebrow}</Eyebrow>
      <Headline className="idv2-h2 idsp-h2" lines={c.title} gradient={c.gradient || []} />
      {c.lede ? <p className="idv-lede">{c.lede}</p> : null}
    </div>
  );
}

function ChapterSplit({ c, M, dark }) {
  const main = M(c.media[0]); const side = (c.media.slice(1) || []).map(M).filter(Boolean);
  return (
    <section className={`idv2-section ${dark ? `idv2-spatial idv2-bgc idv2-bgc-${c.bgc}` : c.bright === 'lilac' ? 'idv2-gradient-soft' : 'idv2-bright'}`}>
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 52px)' }}>
        {c.model ? (
          <div className="idsp-head-row">
            <ChapterHead c={c} />
            <div className="idsp-head-model idv2-reveal">
              <ModelViewer model={c.model} auto ratio="21 / 10" />
            </div>
          </div>
        ) : (
          <ChapterHead c={c} />
        )}
        <div className={`idsp-split${c.flip ? ' idsp-split--flip' : ''}`}>
          <figure className="idsp-split-main idv2-reveal"><Pic m={main} /><Caption m={main} /></figure>
          <div className="idsp-split-side">
            {side.map((m) => <figure key={m.id} className="idv2-reveal"><Pic m={m} /><Caption m={m} /></figure>)}
            {c.items ? (
              <ul className="idsp-list">{c.items.map(([a, b]) => <li key={a}><span className="idv-mono-label">{a}</span><span>{b}</span></li>)}</ul>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterFull({ c, M }) {
  const m = M(c.media);
  const ref = React.useRef(null);
  const onMove = (e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width * 100).toFixed(2)}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height * 100).toFixed(2)}%`);
  };
  return (
    <section ref={ref} className="idv2-full idsp-full" onPointerMove={onMove}>
      <Pic m={m} className="idsp-full-bg" />
      <div className="idsp-full-light" aria-hidden="true" />
      <div className="idv2-full-scrim idsp-full-scrim" />
      <div className="idv2-inner idsp-full-copy">
        <Eyebrow>{c.eyebrow}</Eyebrow>
        <Headline className="idv2-display idsp-full-h idsp-full-h--wide" lines={c.title} gradient={c.gradient || []} />
        {m ? <div className="idv-mono-label" style={{ color: 'rgba(245,245,240,.7)' }}>{m.alt}{m.project ? ` · ${m.project}` : ''}</div> : null}
      </div>
    </section>
  );
}

/* Elastic gallery (adapted from the owner-supplied 21st component to plain CSS): flex columns,
   the hovered/clicked panel expands, inactive panels dim with vertical labels. */
function ChapterElastic({ c, M }) {
  const items = c.options.map((o) => ({ ...o, m: M(o.media) })).filter((o) => o.m);
  const [active, setActive] = useState(items[Math.floor((items.length - 1) / 2)]?.media);
  return (
    <section className={`idv2-section ${c.dark ? `idv2-spatial idv2-bgc idv2-bgc-${c.bgc}` : 'idv2-gradient-soft'}`}>
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 48px)' }}>
        <ChapterHead c={c} />
        <div className="idsp-elastic idv2-reveal" role="group" aria-label={c.ariaLabel || 'Gallery'}>
          {items.map((o, i) => (
            <button
              key={o.media}
              type="button"
              className="idsp-el-item"
              data-active={active === o.media}
              aria-pressed={active === o.media}
              aria-label={`${o.label} — ${o.m.alt}`}
              onMouseEnter={() => setActive(o.media)}
              onFocus={() => setActive(o.media)}
              onClick={() => setActive(o.media)}
            >
              <img src={o.m.file} alt="" loading="lazy" decoding="async" />
              <span className="idsp-el-shade" aria-hidden="true" />
              <span className="idsp-el-vert" aria-hidden="true">{o.label}</span>
              <span className="idsp-el-info">
                <span className="idsp-el-num">{`0${i + 1}`}</span>
                <span className="idsp-el-title">{o.label}</span>
                {o.line ? <span className="idsp-el-line">{o.line}</span> : null}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterCompare({ c, M }) {
  const before = M(c.before), after = M(c.after);
  return (
    <section className={`idv2-section idv2-spatial idv2-bgc idv2-bgc-${c.bgc}`}>
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 48px)' }}>
        <ChapterHead c={c} />
        {before && after ? (
          <div className="idv2-reveal">
            <BeforeAfterSlider beforeImg={before.file} afterImg={after.file} beforeLabel={c.beforeLabel || 'SOURCE'} afterLabel={c.afterLabel || 'VISUALIZED'} accent="#D8B75A" accentRGB="216,183,90" />
            <div className="idv-mono-label" style={{ marginTop: 12 }}>{after.alt}{after.project ? ` · ${after.project}` : ''} · SAME ARCHITECTURE, LOCKED</div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ChapterGallery({ c, M }) {
  const items = c.media.map(M).filter(Boolean);
  return (
    <section className={`idv2-section ${c.dark ? `idv2-spatial idv2-bgc idv2-bgc-${c.bgc}` : c.bright === 'lilac' ? 'idv2-gradient-soft' : 'idv2-bright'}`}>
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 48px)' }}>
        <ChapterHead c={c} />
        <div className={`idsp-gallery idsp-gallery--${c.columns || 3}`}>
          {items.map((m, i) => <figure key={m.id} className={`idv2-reveal${i === 0 && c.featureFirst ? ' idsp-gallery-feature' : ''}`}><Pic m={m} /><Caption m={m} /></figure>)}
        </div>
      </div>
    </section>
  );
}

function ChapterSwitcher({ c, M }) {
  const [key, setKey] = useState(c.options[0].key);
  const opt = c.options.find((o) => o.key === key); const m = M(opt.media);
  return (
    <section className={`idv2-section ${c.dark ? `idv2-spatial idv2-bgc idv2-bgc-${c.bgc}` : 'idv2-bright'}`}>
      <div className="idv2-inner idsp-switcher">
        <div className="idsp-switcher-copy">
          <ChapterHead c={c} />
          <MethodSwitcher ariaLabel={c.ariaLabel} value={key} onChange={setKey} options={c.options.map(({ key: k, label }) => ({ key: k, label }))} />
          {opt.line ? <p className="idv-lede" style={{ marginTop: 14 }}>{opt.line}</p> : null}
        </div>
        <figure className="idsp-switcher-media idv2-reveal"><Pic m={m} /><Caption m={m} tag={opt.tag} /></figure>
      </div>
    </section>
  );
}

function ChapterModel({ c }) {
  const models = c.models || [c.model];
  const [i, setI] = useState(0);
  const model = models[i] || models[0];
  return (
    <section className={`idv2-section idv2-spatial idv2-bgc idv2-bgc-${c.bgc} idv2-m3d-section`}>
      <div className="idv2-m3d" aria-label="Interactive 3D model stage"><ModelViewer key={model.key} model={model} auto stage shift={c.flip ? -0.25 : 0.25} /></div>
      <div className="idv2-inner idv2-m3d-copy">
        <div className={`idv2-m3d-col${c.flip ? ' idv2-m3d-col--right' : ''}`}>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <Headline className="idv2-h2" lines={c.title} gradient={c.gradient || []} />
          {c.lede ? <p className="idv-lede">{c.lede}</p> : null}
          {models.length > 1 ? (
            <div className="idv2-chips" role="group" aria-label="Choose a model">
              {models.map((m, k) => <button key={m.key} type="button" className="idv2-chip" aria-pressed={k === i} onClick={() => setI(k)}>{m.name}</button>)}
            </div>
          ) : null}
          <div className="idv2-m3d-meta"><div className="idv-mono-label"><span style={{ color: 'var(--idv-champagne)' }}>{model.credit}</span> · {model.name.toUpperCase()} · DRAG TO TURN</div></div>
        </div>
      </div>
    </section>
  );
}

/** Film chapter: a real film where one exists; otherwise the cinematic frame, honestly labelled as a frame. */
function ChapterFilm({ c, M }) {
  const poster = M(c.poster);
  return (
    <section className={`idv2-section idv2-spatial idv2-bgc idv2-bgc-${c.bgc}`}>
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(28px, 4vw, 48px)' }}>
        <ChapterHead c={c} />
        {c.video ? (
          <MediaFigure video src={c.video.src} poster={poster ? poster.file : c.video.poster} alt={c.video.alt} caption={c.video.caption} tag={c.video.tag} className="idv2-reveal" />
        ) : poster ? (
          <figure className="idsp-film-frame idv2-reveal"><Pic m={poster} /><Caption m={poster} tag="CINEMATIC FRAME — STILL" /></figure>
        ) : null}
      </div>
    </section>
  );
}

/* ── Next portal ──────────────────────────────────────────────────────────── */
function NextSpace({ next, M }) {
  const m = M(next.media);
  return (
    <section className="idv2-section idv2-bright idsp-next">
      <div className="idv2-inner idsp-next-inner">
        <div>
          <Eyebrow>NEXT</Eyebrow>
          <Link to={next.to} className="idsp-next-link"><span className="idv2-display idsp-next-h">{next.label}</span><ArrowRight size={28} aria-hidden="true" /></Link>
          <p className="idv-lede">{next.line}</p>
        </div>
        {m ? <Link to={next.to} className="idsp-next-media" aria-label={next.label}><Pic m={m} /></Link> : null}
      </div>
    </section>
  );
}

export default function SpacePage({ cfg }) {
  const M = (id) => (id ? getMedia(cfg.page, id) : undefined);
  const Hero = cfg.hero.variant === 'bright' ? HeroBright : cfg.hero.variant === 'full' ? HeroFull : HeroDark;
  return (
    <InteriorShell path={cfg.path}>
      {cfg.hero.variant === 'breakout' ? (
        <>
          <InteriorDesignHero copy={cfg.hero.copy} />
          <SpacesRail path={cfg.path} />
        </>
      ) : <Hero cfg={cfg} M={M} />}
      {cfg.chapters.map((c, i) => {
        const key = `${c.kind}-${i}`;
        if (c.kind === 'split') return <ChapterSplit key={key} c={c} M={M} dark={c.dark} />;
        if (c.kind === 'full') return <ChapterFull key={key} c={c} M={M} />;
        if (c.kind === 'elastic') return <ChapterElastic key={key} c={c} M={M} />;
        if (c.kind === 'compare') return <ChapterCompare key={key} c={c} M={M} />;
        if (c.kind === 'gallery') return <ChapterGallery key={key} c={c} M={M} />;
        if (c.kind === 'switcher') return <ChapterSwitcher key={key} c={c} M={M} />;
        if (c.kind === 'model') return <ChapterModel key={key} c={c} />;
        if (c.kind === 'film') return <ChapterFilm key={key} c={c} M={M} />;
        return null;
      })}
      <NextSpace next={cfg.next} M={M} />
      <CtaBand eyebrow={cfg.cta.eyebrow} headline={cfg.cta.headline} copy={cfg.cta.copy} primary={cfg.cta.primary} secondary={cfg.cta.secondary} />
    </InteriorShell>
  );
}
