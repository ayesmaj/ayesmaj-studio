import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MoveRight } from 'lucide-react';
import { FEATURED_WORK } from '@/data/featuredWork';
import './featured-work.css';

/* Asymmetric spotlight: one lead piece at double width, the rest descending.
   Card contract from 21st "casestudy-5" (2201), layout span map from 21st
   "Condition Grid" (25300) - see docs/component-sources.md.

   2201 was chosen because it is the only candidate that is keyboard-correct as
   shipped: the whole tile is one anchor and the call to action is always
   visible rather than appearing on hover. Its one real flaw - every animation
   keyed to :hover only, so a keyboard user sees nothing - is fixed in the CSS,
   where every hover rule has a :focus-visible twin. */

const reveal = (i) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, delay: Math.min(i, 4) * 0.06, ease: [0.22, 1, 0.36, 1] },
});

export default function FeaturedWork() {
  return (
    <section className="wf" aria-labelledby="wf-title">
      <div className="wf-inner">
        <header className="wf-head">
          <div>
            <p className="wk-eyebrow">Featured Projects</p>
            <h2 className="wf-title" id="wf-title">A curated selection</h2>
          </div>
          <Link className="wf-all" to="/Branding">
            All brand worlds <MoveRight size={15} aria-hidden="true" />
          </Link>
        </header>

        <div className="wf-grid">
          {FEATURED_WORK.map((item, i) => (
            <motion.div key={item.id} {...reveal(i)} data-size={item.span} className="wf-cell">
              <Link
                className="wf-card"
                to={`/BrandDetail?slug=${item.id}`}
                style={{ '--wf-accent': item.accent || '#D8B75A' }}
              >
                <span className="wf-shot-wrap">
                  <img className="wf-shot" src={item.image} alt={`${item.title} — ${item.tagline}`} loading="lazy" decoding="async" />
                </span>
                <span className="wf-body">
                  <span className="wf-cat">{item.cat}</span>
                  <span className="wf-name">{item.title}</span>
                  <span className="wf-tag">{item.tagline}</span>
                  {/* Always visible, never hover-revealed: the affordance is the
                      reason this source was chosen over the alternatives. */}
                  <span className="wf-go">View case study <MoveRight size={14} aria-hidden="true" /></span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
