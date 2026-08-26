import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Eyebrow, IdvButton, MethodSwitcher, PinSeq } from '@/components/interior/kit';
import DarkSectionBackground from '@/components/interior/DarkSectionBackground';
import BeforeAfterSlider from '@/components/ayesmaj/BeforeAfterSlider';
import Seo from '@/components/ayesmaj/Seo';
import { media, imgProps, smallFile } from '@/content/interior-design-generated-media';
import { VILLA } from '@/data/interiorMedia';
import { FilmScrub } from './xp.jsx';
import { T } from './bathrooms-he-strings.js';
import '@/pages/interior/interior.css';
import '@/pages/interior/interior2.css';
import '@/pages/interior/interior-bg.css';
import './spaces.css';
import './bathrooms-x.css';
import './bathrooms-he.css';

/* Hebrew (RTL) duplicate of /interior-design/bathrooms — owner brief 2026-08-24:
   a demo link for Israeli clients showing the studio ships right-to-left sites.

   Deliberately a separate component rather than i18n inside the English page:
   the brief was "don't change anything", and the English file stays untouched.
   Same media, same section order, same shared components — only the strings,
   the direction and the type are different.

   Not in SEO_ROUTES, so it is neither prerendered nor in the sitemap, and it
   is marked noindex: a Hebrew copy of a live English page must not compete
   with it in search. It resolves on direct load via the catch-all rewrite in
   vercel.json. */

const M = (id) => media('bathrooms', id);
const SW_FIG = '(max-width: 1023px) 100vw, 1280px';

/** Latin inside Hebrew needs bidi isolation or the punctuation flips sides. */
const Ltr = ({ children }) => <span className="ltr">{children}</span>;

/* Header adapted from the 21st catalogue's "Header 3" (scroll-blur, body-scroll
   lock, portal-style drawer under the bar, title+description dropdown rows).
   That component is shadcn/Radix/Tailwind, none of which this project uses, so
   the patterns are re-implemented in the AYESMAJ plain-CSS system and made
   RTL-aware. Thumbnails are the site's real navigation previews, not icons. */

const HERE = '/he/interior-design/bathrooms';

const INTERIOR_GROUPS = [
  {
    title: T.navGroupSpaces,
    items: [
      { label: T.navKitchens, line: T.navKitchensLine, to: '/interior-design/kitchens', img: 'kitchens' },
      { label: T.navBathrooms, line: T.navBathroomsLine, to: HERE, img: 'bathrooms' },
      { label: T.navFurniture, line: T.navFurnitureLine, to: '/interior-design/furniture-decor', img: 'furniture-decor' },
    ],
  },
  {
    title: T.navGroupTypes,
    items: [
      { label: T.navApartments, line: T.navApartmentsLine, to: '/interior-design/apartments', img: 'apartments' },
      { label: T.navHomes, line: T.navHomesLine, to: '/interior-design/homes', img: 'homes' },
      { label: T.navBuildings, line: T.navBuildingsLine, to: '/interior-design/buildings', img: 'buildings' },
    ],
  },
];

const NAV_ITEMS = [
  { label: T.navProjects, to: '/Work' },
  { label: T.navServices, to: '/Services' },
  { label: T.navInterior, to: '/interior-design', mega: true },
  { label: T.navStudio, to: '/Studio' },
  { label: T.navAbout, to: '/About' },
  { label: T.navContact, to: '/Contact' },
];

function MenuCard({ item, onNavigate }) {
  const here = item.to === HERE;
  return (
    <Link to={item.to} className="he-menu-card" aria-current={here ? 'page' : undefined} onClick={onNavigate}>
      <img src={'/interior-design/generated/navigation/' + item.img + '.webp'} alt="" loading="lazy" decoding="async" />
      <span className="he-menu-card-body">
        <span className="he-menu-card-title">
          {item.label}
          {here ? <em className="he-menu-here">{T.navHereNote}</em> : null}
        </span>
        <span className="he-menu-card-line">{item.line}</span>
      </span>
    </Link>
  );
}

function HeNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mega, setMega] = useState(false);
  const [drawer, setDrawer] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Escape closes whatever is open. */
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') { setMega(false); setDrawer(false); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* The drawer covers the page, so the page behind it must not scroll. */
  useEffect(() => {
    document.body.style.overflow = drawer ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawer]);

  const closeAll = () => { setMega(false); setDrawer(false); };

  return (
    <header className="he-nav" data-scrolled={scrolled}>
      <div className="he-nav-bar">
        <Link to="/" className="he-nav-brand" onClick={closeAll}>
          <img src="/assets/ayesmaj/logo-transparent.webp" alt="" width="34" height="34" />
          <span className="ltr">AYESMAJ STUDIOS</span>
        </Link>

        <nav className="he-nav-links" aria-label={T.navAria}>
          {NAV_ITEMS.map((item) => (
            item.mega ? (
              <div
                key={item.label}
                className="he-nav-mega-wrap"
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
              >
                <button
                  type="button"
                  className="he-nav-link he-nav-trigger"
                  aria-expanded={mega}
                  aria-haspopup="true"
                  onClick={() => setMega((v) => !v)}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    aria-hidden="true"
                    style={{ transform: mega ? 'rotate(180deg)' : 'none', transition: 'transform .25s ease' }}
                  />
                </button>
                <AnimatePresence>
                  {mega && (
                    <motion.div
                      className="he-mega"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link to="/interior-design" className="he-mega-overview" onClick={closeAll}>
                        {T.navOverview}
                      </Link>
                      <div className="he-mega-groups">
                        {INTERIOR_GROUPS.map((g) => (
                          <div key={g.title} className="he-mega-group">
                            <div className="he-mega-group-title">{g.title}</div>
                            {g.items.map((it) => <MenuCard key={it.label} item={it} onNavigate={closeAll} />)}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link key={item.label} to={item.to} className="he-nav-link">{item.label}</Link>
            )
          ))}
        </nav>

        <div className="he-nav-right">
          <Link to="/Contact" className="he-nav-cta">{T.navCta}</Link>
          <Link to="/interior-design/bathrooms" className="he-nav-lang">
            <span className="ltr">{T.langNote}</span>
          </Link>
          <button
            type="button"
            className="he-burger"
            aria-label={drawer ? T.navCloseMenu : T.navOpenMenu}
            aria-expanded={drawer}
            onClick={() => setDrawer((v) => !v)}
          >
            {drawer ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Portalled to <body>: the app wraps every route in an animated
          motion.div, and a transformed ancestor becomes the containing block
          for position:fixed descendants. Rendered in place, this panel resolved
          against the whole 7000px page instead of the viewport, so it opened
          off-screen once the visitor had scrolled. */}
      {createPortal(
      <AnimatePresence>
        {drawer && (
          <motion.div
            className="he-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav aria-label={T.navAria}>
              {NAV_ITEMS.map((item) => (
                <Link key={item.label} to={item.to} className="he-drawer-link" onClick={closeAll}>
                  {item.label}
                </Link>
              ))}
            </nav>
            {INTERIOR_GROUPS.map((g) => (
              <div key={g.title} className="he-drawer-group">
                <div className="he-mega-group-title">{g.title}</div>
                {g.items.map((it) => <MenuCard key={it.label} item={it} onNavigate={closeAll} />)}
              </div>
            ))}
            <Link to="/Contact" className="he-nav-cta he-drawer-cta" onClick={closeAll}>{T.navCta}</Link>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body)}
    </header>
  );
}

function HeFooter() {
  return (
    <footer className="he-foot">
      <div className="he-foot-brand"><Ltr>AYESMAJ STUDIOS</Ltr></div>
      <p style={{ margin: 0, maxWidth: 520 }}>{T.footTagline}</p>
      <div className="he-foot-row">
        <div className="idv-mono-label">© {new Date().getFullYear()} <Ltr>AYESMAJ STUDIOS</Ltr> · {T.footRights}</div>
        <Link to="/interior-design/bathrooms">{T.langNote}</Link>
      </div>
    </footer>
  );
}

function HeroBath() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduced ? '0%' : '12%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, reduced ? 1.06 : 1.18]);
  const hero = M('20_bh_hero');
  const SAMPLES = [
    ['30_bh_mat_travertine', T.sampleTravertine],
    ['31_bh_mat_emerald', T.sampleEmerald],
    ['32_bh_mat_brass', T.sampleBrass],
    ['35_bh_mat_velvet', T.sampleBlush],
    ['34_bh_mat_fluted_glass', T.sampleGlass],
  ].map(([id, label]) => ({ m: M(id), label })).filter((s) => s.m);
  return (
    <section ref={ref} className="bx-hero" aria-label={T.heroAria}>
      {hero ? <motion.img {...imgProps(hero, '100vw')} alt={hero.alt} className="bx-hero-bg" style={{ y, scale }} fetchpriority="high" /> : null}
      <div className="idv2-inner bx-hero-copy">
        <Eyebrow><Ltr>AYESMAJ STUDIOS</Ltr> / {T.heroEyebrow}</Eyebrow>
        <h1 className="idv2-display bx-h1">
          {T.heroH1a}<br />{T.heroH1b}<br /><span className="idv2-grad">{T.heroH1c}</span>
        </h1>
        <div className="bx-hero-actions">
          <IdvButton to="/Contact">{T.heroCtaPrimary}</IdvButton>
          <IdvButton to="#directions" ghost>{T.heroCtaGhost}</IdvButton>
        </div>
        <div className="idv-mono-label bx-hero-credit">{T.heroCredit}</div>
      </div>
      <div className="bx-samples" aria-label={T.samplesAria}>
        {SAMPLES.map((s, i) => (
          <figure key={s.label} className="bx-sample" style={{ '--i': i }}>
            <img src={s.m.file} alt={s.m.alt} loading="lazy" decoding="async" />
            <figcaption>{s.label}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function TransformBath() {
  const stages = [
    { label: T.t1Label, id: '22_bh_sketch', head: T.t1Head, line: T.t1Line },
    { label: T.t2Label, id: '21_bh_plan', head: T.t2Head, line: T.t2Line },
    { label: T.t3Label, id: '23_bh_clay', head: T.t3Head, line: T.t3Line },
    { label: T.t4Label, id: '24_bh_material3d', head: T.t4Head, line: T.t4Line },
    { label: T.t5Label, id: '20_bh_hero', head: T.t5Head, line: T.t5Line },
  ].map((s) => ({ ...s, m: M(s.id) })).filter((s) => s.m)
    .map((s) => ({ label: s.label, src: s.m.file, alt: s.m.alt, head: s.head, line: s.line }));
  if (!stages.length) return null;
  return (
    <section className="bx-transform" aria-label={T.transformAria}>
      <PinSeq stages={stages} height="380vh" ariaLabel={T.transformAria} />
    </section>
  );
}

/* Percentages locate features inside the image — they must NOT mirror in RTL. */
const HOTSPOTS = [
  { key: 'vanity', label: T.hsVanity, plan: [27, 52], room: [27, 60] },
  { key: 'shower', label: T.hsShower, plan: [55, 22], room: [48, 35] },
  { key: 'tub', label: T.hsTub, plan: [72, 55], room: [72, 62] },
  { key: 'storage', label: T.hsStorage, plan: [33, 66], room: [24, 76] },
  { key: 'lighting', label: T.hsLighting, plan: [15, 46], room: [30, 25] },
  { key: 'material', label: T.hsMaterial, plan: [60, 72], room: [66, 85] },
  { key: 'circulation', label: T.hsCirculation, plan: [45, 80], room: [50, 88] },
];

function DecisionsBath() {
  const [active, setActive] = useState(null);
  const plan = M('26_bh_plan3d'); const room = M('27_bh_doorway');
  if (!plan || !room) return null;
  const Spot = ({ h, at }) => (
    <span className="bx-spot" data-active={active === h.key} style={{ left: `${at[0]}%`, top: `${at[1]}%` }} aria-hidden="true" />
  );
  return (
    <section className="idv2-section idv2-spatial idv2-bgc idv2-bgc-02 bx-decisions">
      <DarkSectionBackground asset="architectural-grid" position="center" overlay={0.72} parallax="none" />
      <div className="idv2-inner" style={{ position: 'relative', display: 'grid', gap: 'clamp(26px, 3.4vw, 44px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>{T.decEyebrow}</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">{T.decH2a}<br /><span className="idv2-grad">{T.decH2b}</span></h2>
        </div>
        <div className="bx-dec-grid idv2-reveal">
          <figure className="bx-dec-fig">
            <img src={plan.file} alt={plan.alt} loading="lazy" decoding="async" />
            {HOTSPOTS.map((h) => <Spot key={h.key} h={h} at={h.plan} />)}
            <figcaption className="idsp-cap"><span>{T.decCapPlanA}</span><span>{T.decCapPlanB}</span></figcaption>
          </figure>
          <figure className="bx-dec-fig">
            <img src={room.file} alt={room.alt} loading="lazy" decoding="async" />
            {HOTSPOTS.map((h) => <Spot key={h.key} h={h} at={h.room} />)}
            <figcaption className="idsp-cap"><span>{T.decCapRoomA}</span><span>{T.decCapRoomB}</span></figcaption>
          </figure>
        </div>
        <div className="bx-dec-legend" role="group" aria-label={T.decEyebrow}>
          {HOTSPOTS.map((h) => (
            <button
              key={h.key}
              type="button"
              className="idv2-chip"
              aria-pressed={active === h.key}
              onMouseEnter={() => setActive(h.key)}
              onFocus={() => setActive(h.key)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === h.key ? null : h.key)}
            >
              {h.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

const MATERIALS = [
  { key: 'travertine', label: T.matTravertine, macro: '30_bh_mat_travertine', room: '50_bh_room_travertine' },
  { key: 'emerald', label: T.matEmerald, macro: '31_bh_mat_emerald', room: '51_bh_room_emerald' },
  { key: 'brass', label: T.matBrass, macro: '32_bh_mat_brass', room: '52_bh_room_brass' },
  { key: 'calacatta', label: T.matCalacatta, macro: '33_bh_mat_calacatta', room: '53_bh_room_calacatta' },
  { key: 'fluted', label: T.matFluted, macro: '34_bh_mat_fluted_glass', room: '54_bh_room_fluted' },
  { key: 'velvet', label: T.matVelvet, macro: '35_bh_mat_velvet', room: '55_bh_room_velvet' },
];

function MaterialRoom() {
  const items = MATERIALS.map((mt) => ({ ...mt, macroM: M(mt.macro), roomM: M(mt.room) })).filter((mt) => mt.macroM && mt.roomM);
  const [active, setActive] = useState(items[0]?.key);
  const current = items.find((mt) => mt.key === active) || items[0];
  if (!current) return null;
  return (
    <section className="idv2-section idv2-gradient-soft bx-materials">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(26px, 3.4vw, 44px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>{T.matEyebrow}</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">{T.matH2a}<br /><span className="idv2-grad">{T.matH2b}</span></h2>
        </div>
        <div className="bx-mat-grid">
          <figure className="bx-mat-room idv2-reveal">
            {items.map((mt) => (
              <img key={mt.key} {...imgProps(mt.roomM, '(max-width: 1023px) 100vw, 62vw')} alt={active === mt.key ? mt.roomM.alt : ''} loading="lazy" decoding="async" data-active={active === mt.key} />
            ))}
            <figcaption className="idsp-cap">
              <span>{T.matCapSuffix.replace('{m}', current.label)}</span>
              <span>{T.matCapTag}</span>
            </figcaption>
          </figure>
          <div className="bx-mat-list" role="group" aria-label={T.matEyebrow}>
            {items.map((mt) => (
              <button
                key={mt.key}
                type="button"
                className="bx-mat-tile"
                aria-pressed={active === mt.key}
                onMouseEnter={() => setActive(mt.key)}
                onFocus={() => setActive(mt.key)}
                onClick={() => setActive(mt.key)}
              >
                <img src={smallFile(mt.macroM)} alt={mt.macroM.alt} loading="lazy" decoding="async" />
                <span>{mt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const TYPES = [
  { id: '03_primary_bathroom', label: T.typPrimaryLabel, line: T.typPrimaryLine },
  { id: '05_powder_room', label: T.typPowderLabel, line: T.typPowderLine },
  { id: '04_compact_bathroom', label: T.typGuestLabel, line: T.typGuestLine },
  { id: '25_bh_wet_room', label: T.typWetLabel, line: T.typWetLine },
];

function TypesBath() {
  const items = TYPES.map((t) => ({ ...t, m: M(t.id) })).filter((t) => t.m);
  return (
    <section className="bx-types idv2-spatial idv2-bgc idv2-bgc-04" aria-label={T.typEyebrow}>
      <div className="idv2-inner idsp-head idv2-reveal" style={{ paddingBottom: 'clamp(18px, 2.4vw, 34px)' }}>
        <Eyebrow>{T.typEyebrow}</Eyebrow>
        <h2 className="idv2-h2 idsp-h2">{T.typH2a}<br /><span className="idv2-grad">{T.typH2b}</span></h2>
      </div>
      <div className="bx-types-track" tabIndex={0} role="group" aria-label={T.typScrollHint}>
        {items.map((t, i) => (
          <figure key={t.id} className="bx-type">
            <img {...imgProps(t.m, '(max-width: 767px) 86vw, 76vw')} alt={t.m.alt} loading="lazy" decoding="async" />
            <figcaption>
              <span className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}><Ltr>{`0${i + 1}`}</Ltr></span>
              <span className="bx-type-title">{t.label}</span>
              <span className="bx-type-line">{t.line}</span>
              <span className="idv-mono-label bx-type-tag">{t.m.project === 'VILLA' ? T.typTagClient : T.typTagStudio}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="idv2-inner"><div className="idv-mono-label" style={{ color: 'rgba(245,245,240,.55)' }}>{T.typScrollHint}</div></div>
    </section>
  );
}

function CompareBath() {
  const before = M('07_bathroom_before'); const after = M('08_bathroom_after');
  if (!before || !after) return null;
  return (
    <section className="idv2-section idv2-spatial idv2-bgc idv2-bgc-06 bx-compare-sec">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(20px, 2.6vw, 32px)' }}>
        <div className="bx-compare idv2-reveal">
          <BeforeAfterSlider beforeImg={before.file} afterImg={after.file} beforeLabel={T.cmpBefore} afterLabel={T.cmpAfter} accent="#D8B75A" accentRGB="216,183,90" />
          {/* The shared slider hardcodes an English "Drag to compare" pill. It is
              used by the English page too, so it is hidden in CSS rather than
              edited, and the Hebrew hint is rendered here instead. */}
          <span className="he-cmp-hint" aria-hidden="true">{T.cmpDragHint}</span>
        </div>
        <p className="idv-lede" style={{ maxWidth: 640 }}>{T.cmpLedeA} <span className="idv2-grad" style={{ fontWeight: 600 }}>{T.cmpLedeB}</span></p>
        <div className="idv-mono-label">{T.cmpTag}</div>
      </div>
    </section>
  );
}

const FILM = {
  desktop: '/interior-design/generated/bathrooms/film/bathroom-film.mp4',
  mobile: '/interior-design/generated/bathrooms/film/bathroom-film-mobile.mp4',
  poster: '/interior-design/generated/bathrooms/film/bathroom-film-poster.webp',
};

function FilmBath() {
  return (
    <FilmScrub
      film={FILM}
      credit={T.filmCredit}
      stages={[
        { at: 0, node: T.filmStage1 },
        { at: 0.28, node: <>{T.filmStage2a} <span className="idv2-grad">{T.filmStage2b}</span></> },
      ]}
    />
  );
}

const DIRECTIONS = [
  { key: 'artdeco', label: T.dirArtDecoLabel, id: '43_bh_dir_artdeco', line: T.dirArtDecoLine },
  { key: 'organic', label: T.dirOrganicLabel, id: '40_bh_dir_organic', line: T.dirOrganicLine },
  { key: 'minimal', label: T.dirMinimalLabel, id: '41_bh_dir_minimal', line: T.dirMinimalLine },
  { key: 'mediterranean', label: T.dirMediterraneanLabel, id: '42_bh_dir_mediterranean', line: T.dirMediterraneanLine },
];

function DirectionsBath() {
  const items = DIRECTIONS.map((d) => ({ ...d, m: M(d.id) })).filter((d) => d.m);
  const [key, setKey] = useState(items[0]?.key);
  const active = items.find((d) => d.key === key) || items[0];
  if (!active) return null;
  return (
    <section className="idv2-section idv2-bright" id="directions">
      <div className="idv2-inner" style={{ display: 'grid', gap: 'clamp(24px, 3vw, 40px)' }}>
        <div className="idv2-reveal idsp-head">
          <Eyebrow>{T.dirEyebrow}</Eyebrow>
          <h2 className="idv2-h2 idsp-h2">{T.dirH2a}<br /><span className="idv2-grad">{T.dirH2b}</span></h2>
        </div>
        <div style={{ display: 'grid', gap: 16 }}>
          <MethodSwitcher ariaLabel={T.dirEyebrow} value={key} onChange={setKey} options={items.map((d) => ({ key: d.key, label: d.label }))} />
          <figure className="bx-dir idv2-reveal">
            <img key={active.key} {...imgProps(active.m, SW_FIG)} alt={active.m.alt} loading="lazy" decoding="async" />
            <figcaption className="idsp-cap"><span>{active.line}</span><span>{T.dirTag}</span></figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

/* The whole-house villa film, mirrored from the English /interior-design/homes
   page. Owner request 2026-08-26: it OPENS the page - the visitor lands
   straight in the scroll-scrubbed film and the bathroom story begins beneath
   it. Being first, its poster paints immediately and the film starts loading
   on arrival; phones receive the lighter -mobile encode. It self-hides if the
   file is ever missing. */
function FilmVilla() {
  return (
    <FilmScrub
      film={{ desktop: VILLA.film.desktop, mobile: VILLA.film.mobile, poster: VILLA.film.poster }}
      credit={T.villaFilmCredit}
      height="360vh"
      stages={[
        { at: 0, node: T.villaStage1 },
        { at: 0.25, node: T.villaStage2 },
        { at: 0.55, node: T.villaStage3 },
        { at: 0.8, node: <>{T.villaStage4a} <span className="idv2-grad">{T.villaStage4b}</span></> },
      ]}
    />
  );
}

export default function InteriorBathroomsHe() {
  /* dir/lang live on the wrapper below, never on <html>. Mutating the document
     element would leak RTL onto an English page whenever this component's
     cleanup is delayed or skipped (interrupted route-exit animation, StrictMode
     double-invoke). Scoping it to the subtree is both safer and enough: bidi
     resolution and assistive-tech language both inherit from the wrapper. */
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="he-page idv-page" dir="rtl" lang="he" style={{ position: 'relative' }}>
      <style>{'body:has(.he-page) .ayes-floating-call { display: none !important; }'}</style>
      <Seo
        title={T.seoTitle}
        description={T.seoDescription}
        path="/he/interior-design/bathrooms"
        image="/interior-design/generated/og/bathrooms.jpg"
        noindex
      />
      <HeNav />
      <main className="he-scope idsp-scope">
        <FilmVilla />
        <HeroBath />
        <TransformBath />
        <DecisionsBath />
        <MaterialRoom />
        <TypesBath />
        <CompareBath />
        <FilmBath />
        <DirectionsBath />
      </main>
      <HeFooter />
    </div>
  );
}
