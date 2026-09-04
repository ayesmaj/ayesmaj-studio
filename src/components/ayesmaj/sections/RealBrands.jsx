import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../SectionHeader';
import { COLORS, FONTS } from '../theme';
import { REAL_BRANDS, REAL_BRAND_TAGS } from '@/data/realBrands';
import './real-brands.css';

/* Real companies, real work (owner request 2026-09-03). This replaced the
   Concept Lab, which showed ten invented brands - SOLARA, VERDANT, VOLT and so
   on - under the heading "Fictional brands and original visual experiments".
   The copy had to change with the content: it would be dishonest to leave a
   section captioned "fictional" while showing actual clients.

   Data comes from scripts/real-brands.mjs, which verifies every logo and image
   exists under public/ before writing it, and records a per-logo plate colour.
   That plate is not a style choice: measured from their own pixels, eight of
   these logos are opaque artwork on white, six are cut-outs with dark ink and
   four are cut-outs with light ink, so no single chip colour shows all twenty.
   Each one carries the plate its own ink needs. */

const FILTERS = ['All', ...REAL_BRAND_TAGS];

export default function RealBrands() {
  const [filter, setFilter] = useState('All');

  const brands = useMemo(
    () => (filter === 'All' ? REAL_BRANDS : REAL_BRANDS.filter((b) => b.tags.includes(filter))),
    [filter],
  );

  return (
    <section
      id="real-brands"
      style={{
        position: 'relative',
        padding: 'clamp(72px,9vw,132px) clamp(20px,5vw,80px)',
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Selected Clients / Brand Work"
          title="Real Brands We Have Built"
          subtitle="Identity systems, packaging, campaigns, CGI and digital experiences delivered for the companies below. Every image is production work from the project."
          accent="#FFC84B"
        />

        <div className="rb-filters">
          {FILTERS.map((item) => {
            const active = filter === item;
            const count = item === 'All' ? REAL_BRANDS.length : REAL_BRANDS.filter((b) => b.tags.includes(item)).length;
            return (
              <button
                key={item}
                type="button"
                className="rb-filter"
                data-active={active}
                aria-pressed={active}
                onClick={() => setFilter(item)}
              >
                {item} <span className="rb-filter-n">({count})</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="rb-grid">
          <AnimatePresence mode="popLayout">
            {brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.025 }}
              >
                <Link
                  to={brand.href}
                  className="rb-card"
                  style={{ '--rb-accent': brand.accent }}
                  aria-label={`${brand.name} — ${brand.category}, view case study`}
                >
                  <img
                    className="rb-shot"
                    src={brand.hero}
                    alt={`${brand.name} — ${brand.category}`}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="rb-scrim" aria-hidden="true" />

                  {/* The logo is the point of this section: a real company mark,
                      on the plate its own ink needs. */}
                  <span className="rb-logo" data-plate={brand.plate} aria-hidden="true">
                    <img src={brand.logo} alt="" loading="lazy" decoding="async" />
                  </span>

                  <span className="rb-meta">
                    <span className="rb-name">{brand.name}</span>
                    <span className="rb-cat">{brand.category}</span>
                  </span>
                  <span className="rb-go" aria-hidden="true"><ArrowUpRight size={16} /></span>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
