/**
 * Interior Design component kit — the shared primitives every /interior-design
 * page composes. One file on purpose: pages import { InteriorShell, ... }
 * from '@/components/interior/kit' and nothing else, which keeps twelve
 * parallel-built pages visually identical.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useScroll, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { METHODS, METHOD_ORDER, STAGES, METHOD_FLOW } from '@/data/interiorDesign';
import Seo from '@/components/ayesmaj/Seo';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import { SEO_ROUTES } from '@/data/seoMeta';
import '@/pages/interior/interior.css';
import '@/pages/interior/interior2.css';

/**
 * Page wrapper: head tags (from the same seoMeta the prerender uses, so
 * client head always matches crawler head), nav scrim, footer, scroll reset.
 */
/**
 * Floating project tab — replaces the site's yellow CALL NOW pill inside the
 * Interior Design world (owner brief §6: black tab, gold border, purple hover
 * line on desktop; compact sticky bar on mobile). Appears after the hero.
 */
function FloatingProjectTab() {
  const [visible, setVisible] = useState(false);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    const mq = window.matchMedia('(max-width: 860px)');
    const onMq = () => setMobile(mq.matches);
    onMq();
    mq.addEventListener('change', onMq);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); mq.removeEventListener('change', onMq); };
  }, []);
  if (!visible) return null;
  if (mobile) {
    return (
      <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 60, display: 'flex', background: 'rgba(8,9,8,0.96)', backdropFilter: 'blur(14px)', borderTop: '1px solid rgba(216,183,90,0.4)' }}>
        <Link to="/Contact" style={{ flex: 2, textAlign: 'center', padding: '15px 0', color: '#F5F5F0', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.1em', textDecoration: 'none' }}>START PROJECT</Link>
        <a href="tel:5093197999" style={{ flex: 1, textAlign: 'center', padding: '15px 0', color: '#D8B75A', fontWeight: 700, fontSize: 12.5, letterSpacing: '0.1em', textDecoration: 'none', borderLeft: '1px solid rgba(255,255,255,0.14)' }}>CALL</a>
      </div>
    );
  }
  return (
    <Link
      to="/Contact"
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = 'inset 0 -2px 0 #A35BDA'; }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
      style={{ position: 'fixed', right: 26, bottom: 26, zIndex: 60, display: 'inline-flex', alignItems: 'center', gap: 10, padding: '13px 22px', borderRadius: 999, background: 'rgba(8,9,8,0.95)', border: '1px solid rgba(216,183,90,0.65)', color: '#F5F5F0', fontWeight: 700, fontSize: 12, letterSpacing: '0.1em', textDecoration: 'none', transition: 'box-shadow 0.25s ease' }}
    >
      START A PROJECT <ArrowRight size={14} aria-hidden="true" />
    </Link>
  );
}

export function InteriorShell({ path, jsonLd = null, children }) {
  const meta = SEO_ROUTES[path] || {};
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="idv-page" style={{ position: 'relative' }}>
      {/* Owner brief §6: the yellow contractor-style CALL NOW pill is off-brand
          in this world; the FloatingProjectTab below replaces it. */}
      <style>{'body:has(.idv-page) .ayes-floating-call { display: none !important; }'}</style>
      <Seo title={meta.title} description={meta.description} path={path} image={meta.image} jsonLd={jsonLd} />
      <AyesmajNav />
      <main>{children}</main>
      <FloatingProjectTab />
      <AyesmajFooter />
    </div>
  );
}

export function Eyebrow({ children }) {
  return <div className="idv-eyebrow">{children}</div>;
}

export function SectionHead({ eyebrow, title, lede, children }) {
  return (
    <header className="idv-reveal" style={{ display: 'grid', gap: 18, marginBottom: 'clamp(36px, 5vw, 64px)' }}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="idv-h2">{title}</h2>
      {lede ? <p className="idv-lede">{lede}</p> : null}
      {children}
    </header>
  );
}

/** Image or muted-video figure with mono caption. Ratio: '' | '45' | 'sq'. */
export function MediaFigure({ src, alt, caption, tag, ratio = '', video = false, poster, className = '', eager = false }) {
  const ratioClass = ratio === '45' ? 'idv-ratio-45' : ratio === 'sq' ? 'idv-ratio-sq' : ratio === 'wide' ? 'idv-ratio' : '';
  return (
    <figure className={`idv-figure idv-figure--frame ${className}`}>
      {video ? (
        <video className={ratioClass} src={src} poster={poster} muted loop playsInline autoPlay preload="none" aria-label={alt} />
      ) : (
        <img className={ratioClass} src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      )}
      {(caption || tag) ? (
        <figcaption>
          <span>{caption}</span>
          {tag ? <span>{tag}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** SCAN → PLAN → 3D → FILM style toggle. options: [{key, label}]. */
export function MethodSwitcher({ options, value, onChange, ariaLabel = 'View mode' }) {
  return (
    <div className="idv-switch" role="group" aria-label={ariaLabel}>
      {options.map((o) => (
        <button key={o.key} type="button" aria-pressed={value === o.key} onClick={() => onChange(o.key)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function IdvButton({ to, children, ghost = false, onClick }) {
  const cls = `idv-btn ${ghost ? 'idv-btn--ghost' : 'idv-btn--primary'}`;
  const inner = (
    <>
      {children}
      <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
    </>
  );
  if (onClick) return <button type="button" className={cls} onClick={onClick}>{inner}</button>;
  return <Link to={to} className={cls}>{inner}</Link>;
}

/** Bottom conversion band shared by every page in the world. */
export function CtaBand({ eyebrow, headline, copy, primary, secondary }) {
  return (
    <section className="idv-cta">
      <div className="idv-section" style={{ display: 'grid', gap: 24 }}>
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="idv-h2" style={{ maxWidth: 900 }}>{headline}</h2>
        {copy ? <p className="idv-lede">{copy}</p> : null}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 8 }}>
          <IdvButton to={primary.to}>{primary.label}</IdvButton>
          {secondary ? <IdvButton to={secondary.to} ghost>{secondary.label}</IdvButton> : null}
        </div>
      </div>
    </section>
  );
}

/**
 * Method-page scaffold: every dedicated method page uses this exact spine
 * (eyebrow / question / headline / needs-reveals-limits / best-for / combos),
 * so the eight pages read as one system. Pages add their own media sections
 * via children between the scaffold blocks.
 */
export function MethodIntro({ method, eyebrowPrefix }) {
  return (
    <section className="idv-section" style={{ paddingTop: 'clamp(140px, 16vw, 220px)', display: 'grid', gap: 22 }}>
      <Eyebrow>{eyebrowPrefix}</Eyebrow>
      <p className="idv-mono-label">Answers: {method.question}</p>
      <h1 className="idv-display" style={{ maxWidth: 1050 }}>{method.headline}</h1>
      <p className="idv-lede">{method.intro}</p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }} aria-label="Workflow">
        {method.workflow.map((w, i) => (
          <span key={w} className="idv-mono-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            {i > 0 ? <ArrowRight size={12} aria-hidden="true" /> : null}{w}
          </span>
        ))}
      </div>
    </section>
  );
}

export function MethodFacts({ method }) {
  const Block = ({ title, items }) => (
    <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
      <div className="idv-mono-label">{title}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
        {items.map((it) => (
          <li key={it} style={{ borderTop: '1px solid var(--idv-stone)', paddingTop: 8, fontSize: 15, lineHeight: 1.5, color: 'var(--idv-graphite)' }}>{it}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <section className="idv-section idv-section--flush">
      <div className="idv-grid-3 idv-reveal">
        <Block title="What it needs" items={method.needs} />
        <Block title="What it reveals" items={method.reveals} />
        <Block title="Honest limits" items={method.limits} />
      </div>
    </section>
  );
}

export function MethodOutro({ method, methods }) {
  return (
    <section className="idv-section idv-section--flush" style={{ display: 'grid', gap: 28 }}>
      <div className="idv-grid-2">
        <div style={{ display: 'grid', gap: 10, alignContent: 'start' }}>
          <div className="idv-mono-label">Best for</div>
          <p className="idv-lede" style={{ margin: 0 }}>{method.bestFor.join(' · ')}</p>
        </div>
        <div style={{ display: 'grid', gap: 12, alignContent: 'start' }}>
          <div className="idv-mono-label">Strongest combined with</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {method.combineWith.map((key) => (
              <Link key={key} to={methods[key].route} className="idv-btn idv-btn--ghost" style={{ padding: '10px 18px', fontSize: 13 }}>
                {methods[key].label}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <hr className="idv-rule idv-rule--ai" />
    </section>
  );
}


/**
 * MethodRail -- slim sticky method navigation (addendum s6). Groups the eight
 * methods by stage; the current route gets the gold pill.
 */
export function MethodRail() {
  const { pathname } = useLocation();
  return (
    <nav className="idv2-rail" aria-label="Visualization methods">
      {STAGES.map((s) => (
        <React.Fragment key={s.key}>
          <span className="idv2-rail-group">{s.title.toUpperCase()}</span>
          {METHOD_ORDER.filter((k) => METHODS[k].stage === s.key).map((k) => (
            <Link key={k} to={METHODS[k].route} aria-current={pathname.startsWith(METHODS[k].route) ? 'page' : undefined}>
              {METHODS[k].label.replace('AI ', '').replace('3D ', '')}
            </Link>
          ))}
        </React.Fragment>
      ))}
    </nav>
  );
}

/**
 * NextPortal -- the large "next client question" link ending every method
 * page (addendum s6/s21): explains WHY the next method follows.
 */
export function NextPortal({ methodKey, image }) {
  const flow = METHOD_FLOW[methodKey];
  if (!flow) return null;
  const to = flow.nextRoute || (flow.next ? METHODS[flow.next].route : '/Contact');
  const label = flow.nextLabel || (flow.next ? METHODS[flow.next].label : 'Start a project');
  return (
    <Link to={to} className="idv2-portal">
      {image ? <img src={image} alt="" loading="lazy" decoding="async" /> : null}
      <div className="idv2-inner">
        <span className="idv-mono-label" style={{ color: 'var(--idv-champagne)' }}>THE NEXT CLIENT QUESTION</span>
        <span className="idv2-h2" style={{ maxWidth: 900 }}>{flow.nextLine}</span>
        <span className="idv-mono-label" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#F5F5F0' }}>
          NEXT: {label.toUpperCase()} <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

/**
 * PinSeq -- reusable pinned scroll sequence (addendum s5): tall wrapper,
 * sticky viewport, crossfading stages with a chip bar. Shares the 21st.dev
 * scrubber skeleton already used on the hub. Reduced motion and mobile get
 * a flowing stack instead of the pin.
 */
export function PinSeq({ stages, height = '350vh', accentClass = '', ariaLabel = 'Transformation sequence' }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [simple, setSimple] = useState(false);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)');
    const set = () => setSimple(mq.matches);
    set();
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);

  useEffect(() => scrollYProgress.on('change', (p) => {
    setIdx(Math.min(stages.length - 1, Math.floor(p * stages.length)));
  }), [scrollYProgress, stages.length]);

  const flat = simple || reduced;
  if (flat) {
    return (
      <div className={accentClass} style={{ display: 'grid', gap: 18 }} aria-label={ariaLabel}>
        {stages.map((s, i) => (
          <figure key={s.label} className="idv-figure idv-figure--frame" style={{ margin: 0 }}>
            <img src={s.src} alt={s.alt || s.label} loading="lazy" decoding="async" style={{ borderRadius: 14 }} />
            <figcaption><span>{'0' + (i + 1) + ' - ' + s.label}</span><span>{s.line}</span></figcaption>
          </figure>
        ))}
      </div>
    );
  }
  const active = stages[idx];
  return (
    <div ref={ref} className={'idv2-pin-wrap ' + accentClass} style={{ height }} aria-label={ariaLabel}>
      <div className="idv2-pin">
        {stages.map((s, i) => (
          <img key={s.label} src={s.src} alt={i === idx ? (s.alt || s.label) : ''} loading={i === 0 ? 'eager' : 'lazy'} decoding="async"
            style={{ opacity: i === idx ? 1 : 0, transition: 'opacity 0.45s ease' }} />
        ))}
        <div className="idv2-pin-scrim" />
        <div style={{ position: 'absolute', left: 'var(--idv-pad)', right: 'var(--idv-pad)', bottom: 'clamp(50px, 8vh, 110px)', display: 'grid', gap: 14, color: '#F5F5F0' }}>
          <div className="idv2-pinseq-stagebar">
            {stages.map((s, i) => <span key={s.label} data-active={i === idx}>{'0' + (i + 1) + ' ' + s.label}</span>)}
          </div>
          <p className="idv-lede" style={{ color: 'rgba(245,245,240,0.85)', margin: 0 }} aria-live="polite">{active.line}</p>
        </div>
      </div>
    </div>
  );
}
