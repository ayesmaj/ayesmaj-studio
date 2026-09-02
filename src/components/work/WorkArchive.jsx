import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { WORK_ARCHIVE, WORK_COUNTS } from '@/data/workArchive';
import './work-archive.css';

/* The complete archive: every media asset in the project, generated into
   src/data/workArchive.js by scripts/work-archive.mjs (paths verified on disk,
   grid thumbs pre-sized). public/ holds 6.4GB of media, so the grid only ever
   touches ~20KB thumbs; the full asset loads when a visitor opens it.

   Grid architecture (21st research, docs/component-sources.md): the catalog's
   gallery components all render and animate every item, which dies at 1,500.
   This build keeps their accessibility contracts and replaces the structure:
   - shortest-column masonry from known w/h - no measurement, no layout shift
   - batched rendering behind one IntersectionObserver sentinel
   - content-visibility on cards so offscreen tiles cost nothing
   - one lightbox instance with the morphing-dialog focus contract */

const BATCH = 60;

const CATS = ['All', ...Object.keys(WORK_COUNTS).sort((a, b) => WORK_COUNTS[b] - WORK_COUNTS[a])];
const TOTAL = WORK_ARCHIVE.length;

function useColumns() {
  const get = () => {
    if (typeof window === 'undefined') return 4;
    const w = window.innerWidth;
    return w >= 1280 ? 4 : w >= 900 ? 3 : 2;
  };
  const [cols, setCols] = useState(get);
  useEffect(() => {
    let t;
    const onResize = () => { clearTimeout(t); t = setTimeout(() => setCols(get()), 120); };
    window.addEventListener('resize', onResize);
    return () => { clearTimeout(t); window.removeEventListener('resize', onResize); };
  }, []);
  return cols;
}

function useReducedMotionLive() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const set = () => setReduced(mq.matches);
    mq.addEventListener('change', set);
    return () => mq.removeEventListener('change', set);
  }, []);
  return reduced;
}

const fmtDur = (s) => (s >= 60 ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` : `0:${String(s).padStart(2, '0')}`);

function Lightbox({ items, index, onClose, onStep, reduced }) {
  const item = items[index];
  const boxRef = useRef(null);

  /* Focus contract from 21st "morphing-dialog" (651): trap Tab inside, focus
     the first control on open; the opener card is restored by the parent. */
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return undefined;
    const focusables = () => box.querySelectorAll('button, [href], video, [tabindex]:not([tabindex="-1"])');
    focusables()[0]?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowRight') { onStep(1); return; }
      if (e.key === 'ArrowLeft') { onStep(-1); return; }
      if (e.key === 'Tab') {
        const f = focusables();
        const first = f[0], last = f[f.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [onClose, onStep]);

  /* Touch: swipe horizontally to step, matching the arrow keys. */
  const touch = useRef(null);
  const onTouchStart = (e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchEnd = (e) => {
    if (!touch.current) return;
    const dx = e.changedTouches[0].clientX - touch.current.x;
    const dy = e.changedTouches[0].clientY - touch.current.y;
    touch.current = null;
    if (Math.abs(dy) > 90 && Math.abs(dy) > Math.abs(dx)) { onClose(); return; }
    if (Math.abs(dx) > 60) onStep(dx < 0 ? 1 : -1);
  };

  if (!item) return null;
  return createPortal(
    <div className="wa-lightbox" onClick={onClose} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div
        ref={boxRef}
        className={`wa-lightbox-box${reduced ? '' : ' wa-lightbox-box--enter'}`}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.group} — ${item.cat}, item ${index + 1} of ${items.length}`}
        onClick={(e) => e.stopPropagation()}
      >
        {item.video ? (
          <video
            key={item.src}
            src={item.src}
            poster={item.thumb}
            controls
            autoPlay={!reduced}
            muted
            loop
            playsInline
            className="wa-lightbox-media"
            style={{ aspectRatio: `${item.w} / ${item.h}` }}
          />
        ) : (
          <img
            key={item.src}
            src={item.src}
            alt={`${item.group} — ${item.cat}`}
            className="wa-lightbox-media"
            style={{ aspectRatio: `${item.w} / ${item.h}` }}
          />
        )}
        <div className="wa-lightbox-meta">
          <span className="wa-lightbox-tag">{item.cat}</span>
          <span className="wa-lightbox-name">{item.group}</span>
          <span className="wa-lightbox-count">{index + 1} / {items.length}</span>
        </div>
        <button className="wa-lightbox-btn wa-lightbox-close" aria-label="Close" onClick={onClose}><X size={18} /></button>
        <button className="wa-lightbox-btn wa-lightbox-prev" aria-label="Previous" onClick={() => onStep(-1)}><ChevronLeft size={20} /></button>
        <button className="wa-lightbox-btn wa-lightbox-next" aria-label="Next" onClick={() => onStep(1)}><ChevronRight size={20} /></button>
      </div>
    </div>,
    document.body
  );
}

export default function WorkArchive() {
  const [cat, setCat] = useState(() => {
    const a = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('a');
    return a && CATS.includes(a) ? a : 'All';
  });
  const [visible, setVisible] = useState(BATCH * 2);
  const [open, setOpen] = useState(null); // index into `filtered`
  const cols = useColumns();
  const reduced = useReducedMotionLive();
  const sentinelRef = useRef(null);
  const openerRef = useRef(null); // the card button that opened the lightbox

  const filtered = useMemo(
    () => (cat === 'All' ? WORK_ARCHIVE : WORK_ARCHIVE.filter((i) => i.cat === cat)),
    [cat]
  );

  const pick = (c) => {
    setCat(c); setVisible(BATCH * 2);
    const url = new URL(window.location.href);
    if (c === 'All') url.searchParams.delete('a'); else url.searchParams.set('a', c);
    window.history.replaceState({}, '', url);
  };

  /* Shortest-column distribution over only the visible slice. Known w/h means
     no measurement and no shift: each card carries its exact aspect-ratio. */
  const columns = useMemo(() => {
    const buckets = Array.from({ length: cols }, () => ({ h: 0, items: [] }));
    for (const it of filtered.slice(0, visible)) {
      const b = buckets.reduce((a, x) => (x.h < a.h ? x : a));
      b.items.push(it);
      b.h += it.h / it.w;
    }
    return buckets.map((b) => b.items);
  }, [filtered, visible, cols]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || visible >= filtered.length) return undefined;
    const grow = () => setVisible((v) => Math.min(v + BATCH, filtered.length));
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) grow(); },
      { rootMargin: '1200px 0px' }
    );
    io.observe(el);
    /* Belt and braces: IntersectionObserver only reports on rendering frames,
       which a background/occluded tab may not produce. A passive scroll probe
       costs nothing and cannot be starved. */
    const probe = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight + 1200) grow();
    };
    window.addEventListener('scroll', probe, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', probe); };
  }, [visible, filtered.length]);

  const step = useCallback((d) => {
    setOpen((i) => (i === null ? i : (i + d + filtered.length) % filtered.length));
  }, [filtered.length]);
  const close = useCallback(() => {
    setOpen(null);
    openerRef.current?.focus(); // morphing-dialog contract: restore focus
  }, []);

  return (
    <div className="wa">
      <div className="wa-chips" role="group" aria-label="Archive categories">
        {CATS.map((c) => {
          const n = c === 'All' ? TOTAL : WORK_COUNTS[c];
          const active = c === cat;
          return (
            <button key={c} type="button" className="wa-chip" data-active={active} aria-pressed={active} onClick={() => pick(c)}>
              {c} <span className="wa-chip-n">{n}</span>
            </button>
          );
        })}
      </div>

      <div className="wa-grid" style={{ '--wa-cols': cols }}>
        {columns.map((col, ci) => (
          <div className="wa-col" key={ci}>
            {col.map((it) => {
              const fi = filtered.indexOf(it);
              return (
                <button
                  key={it.thumb}
                  type="button"
                  className="wa-card"
                  aria-label={`${it.video ? 'Play' : 'View'} ${it.group} — ${it.cat}`}
                  style={{ aspectRatio: `${it.w} / ${it.h}` }}
                  onClick={(e) => { openerRef.current = e.currentTarget; setOpen(fi); }}
                >
                  <img src={it.thumb} alt="" loading="lazy" decoding="async" draggable={false} />
                  {it.video && (
                    <span className="wa-card-play" aria-hidden="true">
                      <Play size={13} fill="currentColor" />
                      {it.dur ? <em>{fmtDur(it.dur)}</em> : null}
                    </span>
                  )}
                  <span className="wa-card-cap" aria-hidden="true">{it.group}</span>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {visible < filtered.length && (
        /* A real button, auto-pressed by the IntersectionObserver when scroll
           reaches it. The observer is an enhancement; the button is the
           mechanism - deterministic, testable, and honest about how much of a
           1,000-item archive is left. */
        <div ref={sentinelRef} className="wa-sentinel">
          <button
            type="button"
            className="wa-more"
            onClick={() => setVisible((v) => Math.min(v + BATCH, filtered.length))}
          >
            Load more <span className="wa-chip-n">{visible} / {filtered.length}</span>
          </button>
        </div>
      )}

      {open !== null && (
        <Lightbox items={filtered} index={open} onClose={close} onStep={step} reduced={reduced} />
      )}
    </div>
  );
}
