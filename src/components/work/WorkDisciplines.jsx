import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { WORK_ARCHIVE, WORK_COUNTS } from '@/data/workArchive';
import './work-disciplines.css';

/* The closing band: a spotlight on four disciplines.

   Adapted from 21st "cta section with gallery" (1960) - see
   docs/component-sources.md. The one idea worth taking from that source is its
   grid placement: two columns over five alternating short/tall rows, with each
   cell spanning two rows at a staggered start. Every tile therefore gets one
   short and one tall track - identical heights, different vertical offsets - so
   the group interlocks instead of reading as a 2x2 contact sheet.

   Changed from the source: project CSS instead of Tailwind, and its motion/react,
   cn and Button dependencies all dropped - this band ships no JS animation at
   all now, for the reason below. Its text column
   was a generic "start scaling today" CTA; the footer already owns that ask on
   every page, so repeating it here gave the page two near-identical closes.
   This band sends people into the archive by discipline instead, which is the
   thing the page is actually for.

   The tile itself is the link rather than a text list wired to a gallery by
   hover state: no shared state to keep in sync, and a whole tile is a real tap
   target on a phone.

   The source's staggered blur-in is deliberately NOT kept. A whileInView reveal
   starts at opacity 0, so if its observer fires late the section is not merely
   un-animated, it is blank - and measured here, the tiles sat at opacity 0 for
   3.5s after landing on the band, because the 828-item archive above keeps the
   main thread busy decoding lazy media. An entrance flourish is not worth a
   closing section that can render empty. The motion that remains is hover and
   focus driven, which cannot fail closed. */

const SPOTLIGHT = [
  ['3D & CGI', 'Worlds, products and environments built frame by frame'],
  ['Branding', 'Identity systems carried across every surface'],
  ['Interior', 'Spaces rendered before a single wall is built'],
  ['AI Video', 'Generative film, directed rather than prompted'],
];

const slug = (c) => c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/* Cover art is pulled from the archive itself, so it can never drift out of
   sync with what the category actually contains. Prefer a landscape still: a
   square brand tile crops badly in a wide slot. */
const cover = (cat) => {
  const pool = WORK_ARCHIVE.filter((i) => i.cat === cat && i.thumb);
  return (pool.find((i) => i.w > i.h) || pool[0])?.thumb;
};

const TILES = SPOTLIGHT.filter(([cat]) => WORK_COUNTS[cat]).map(([cat, note]) => ({
  cat,
  note,
  count: WORK_COUNTS[cat],
  img: cover(cat),
  href: `/Work?a=${encodeURIComponent(cat)}#wa-${slug(cat)}`,
}));

export default function WorkDisciplines() {
  /* We are already on /Work, so let the href stay a real URL (middle-click,
     crawlers, no-JS) but handle the plain click ourselves - otherwise the
     browser reloads the whole route to reach an anchor that is already in the
     document. */
  const jump = (e, cat) => {
    const el = document.getElementById(`wa-${slug(cat)}`);
    if (!el || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    el.scrollIntoView({ block: 'start' });
    window.history.replaceState({}, '', `#wa-${slug(cat)}`);
  };

  return (
    <section className="wd" aria-labelledby="wd-title">
      <div className="wd-inner">
        <div className="wd-copy">
          <p className="wk-eyebrow">Browse By Discipline</p>
          <h2 className="wd-title" id="wd-title">
            Every craft,<br />one studio.
          </h2>
          <p className="wd-lede">
            Identity, film, CGI, interiors and digital are built by the same hands
            here — which is why a brand made with us holds together across all of
            them. Pick a discipline to jump straight into that part of the archive.
          </p>
        </div>

        <div className="wd-grid">
          {TILES.map((t) => (
            <a
              key={t.cat}
              className="wd-tile"
              href={t.href}
              onClick={(e) => jump(e, t.cat)}
              aria-label={`${t.cat} — ${t.count} pieces. ${t.note}`}
            >
              {t.img && <img src={t.img} alt="" loading="lazy" decoding="async" />}
              <span className="wd-tile-scrim" aria-hidden="true" />
              <span className="wd-tile-meta" aria-hidden="true">
                <span className="wd-tile-count">{t.count} pieces</span>
                <span className="wd-tile-name">
                  {t.cat}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </span>
                <span className="wd-tile-note">{t.note}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
