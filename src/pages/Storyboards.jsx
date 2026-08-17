import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Clapperboard, Eye, Layers3, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Seo from '@/components/ayesmaj/Seo';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import { FONTS } from '@/components/ayesmaj/theme';
import './Storyboards.css';

const FEATURED_BOARDS = [
  { brand: 'Paranormal', title: 'The Peacock Awakens', src: '/storyboards-10/01-paranormal-the-peacock-awakens.webp', accent: '#56A8B6' },
  { brand: 'Ashé', title: 'From Origin to Ritual', src: '/storyboards-10/02-ashe-from-origin-to-ritual.webp', accent: '#C9922A' },
  { brand: 'VUDU Energy', title: 'Activate the Night', src: '/storyboards-10/03-vudu-activate-the-night.webp', accent: '#B066FF' },
  { brand: 'Podos AI', title: 'Infrastructure Arrives', src: '/storyboards-10/04-podos-infrastructure-arrives.webp', accent: '#3B8EA3' },
  { brand: 'Syntropic', title: 'One Computer Does the Work of Ten', src: '/storyboards-10/05-syntropic-one-computer-does-the-work-of-ten.webp', accent: '#D09B36' },
  { brand: 'Electric Fuel America', title: 'Power Across Every Domain', src: '/storyboards-10/06-electric-fuel-power-across-every-domain.webp', accent: '#5E8FD8' },
  { brand: 'Rebound', title: 'Return to Yourself', src: '/storyboards-10/07-rebound-return-to-yourself.webp', accent: '#C9828B' },
  { brand: 'Kolie', title: 'The Call You Almost Missed', src: '/storyboards-10/08-kolie-the-call-you-almost-missed.webp', accent: '#ED5E51' },
  { brand: 'Arizona Chimney Pros', title: 'From Outdated to Centerpiece', src: '/storyboards-10/09-arizona-from-outdated-to-centerpiece.webp', accent: '#EF6A17' },
  { brand: 'AYESMAJ Studios', title: 'Building a Brand World', src: '/storyboards-10/10-ayesmaj-building-a-brand-world.webp', accent: '#8959D8' },
];

const ARCHIVE_BOARDS = [
  ['Arizona Chimney Pros', '/brands/arizona chimney pros/generated/storyboard/storyboard.webp'],
  ['Ashé', '/brands/ashe/generated/storyboard/storyboard.webp'],
  ['AYESMAJ Studios', '/brands/ayesmaj studios/generated/storyboard/storyboard.webp'],
  ['Baron Herzog', '/brands/baron-herzog/generated/storyboard/storyboard.webp'],
  ['Blenday', '/brands/blenday/generated/storyboard/storyboard.webp'],
  ['Boom Chica', '/brands/boom-chica/generated/storyboard/storyboard.webp'],
  ['Butterfly', '/brands/butterfly/generated/storyboard/storyboard.webp'],
  ['Casa Ora', '/brands/casa ora/generated/storyboard/storyboard.webp'],
  ['Electric Fuel America', '/brands/electric fuel america/generated/storyboard/storyboard.webp'],
  ['General', '/brands/general/generated/storyboard/storyboard.webp'],
  ['Happy Jack Whiskey', '/brands/happy jack - whiskey/generated/storyboard/storyboard.webp'],
  ['Honey', '/brands/honey/generated/storyboard/storyboard.webp'],
  ['Interior Design', '/brands/interior-design/generated/storyboard/storyboard.webp'],
  ['Kolie', '/brands/kolie/generated/storyboard/storyboard.webp'],
  ['LaCroix', '/brands/lacroix/generated/storyboard/storyboard.webp'],
  ['Noam', '/brands/noam/generated/storyboard/storyboard.webp'],
  ['Paranormal', '/brands/paranormal/generated/storyboard/storyboard.webp'],
  ['Pita Basta', '/brands/pita-basta/generated/storyboard/storyboard.webp'],
  ['Podos AI', '/brands/podos ai/generated/storyboard/storyboard.webp'],
  ['Rebound', '/brands/rebound/generated/storyboard/storyboard.webp'],
  ['Syntropic', '/brands/syntropic/generated/storyboard/storyboard.webp'],
  ['VUDU Energy', '/brands/vudu - energy drink/generated/storyboard/storyboard.webp'],
].map(([brand, src], index) => ({ brand, src, n: String(index + 1).padStart(2, '0') }));

const DEVELOPMENT_FRAMES = [
  ['Find the Signal', '/assets/ayesmaj/generated/storyboard/story-01-direction.webp'],
  ['Build the Language', '/assets/ayesmaj/generated/storyboard/story-02-language.webp'],
  ['Create the Hero', '/assets/ayesmaj/generated/storyboard/story-03-hero.webp'],
  ['Expand the World', '/assets/ayesmaj/generated/storyboard/story-04-world.webp'],
  ['Put It in Motion', '/assets/ayesmaj/generated/storyboard/story-05-motion.webp'],
  ['Direction', '/assets/ayesmaj/generated/storyboard/universal-01-signal.webp'],
  ['Visual Language', '/assets/ayesmaj/generated/storyboard/universal-02-language.webp'],
  ['Hero Frame', '/assets/ayesmaj/generated/storyboard/universal-03-hero.webp'],
  ['Campaign World', '/assets/ayesmaj/generated/storyboard/universal-04-world.webp'],
  ['Launch Film', '/assets/ayesmaj/generated/storyboard/universal-05-motion.webp'],
].map(([title, src], index) => ({ title, src, n: String(index + 1).padStart(2, '0') }));

const PROCESS_FRAMES = [
  { n: '01', title: 'Find the Signal', caption: 'Position the idea, audience, and single point of view.', src: '/generated/storyboards/sb-01-idea.webp' },
  { n: '02', title: 'Build the Language', caption: 'Lock the palette, light, lens, texture, and visual grammar.', src: '/generated/storyboards/sb-02-direction.webp' },
  { n: '03', title: 'Create the Hero', caption: 'Direct the centerpiece asset frame by frame.', src: '/generated/storyboards/sb-03-hero.webp' },
  { n: '04', title: 'Expand the World', caption: 'Turn one strong frame into a complete campaign system.', src: '/generated/storyboards/sb-04-expand.webp' },
  { n: '05', title: 'Launch in Motion', caption: 'Carry the approved direction into film, web, social, and launch.', src: '/generated/storyboards/sb-05-launch.webp' },
];

const reveal = (reducedMotion, delay = 0) => reducedMotion
  ? {}
  : {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: '-48px' },
      transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
    };

function StoryboardLightbox({ index, onClose, onChange }) {
  const board = index == null ? null : FEATURED_BOARDS[index];

  useEffect(() => {
    if (!board) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onChange((index + 1) % FEATURED_BOARDS.length);
      if (event.key === 'ArrowLeft') onChange((index - 1 + FEATURED_BOARDS.length) % FEATURED_BOARDS.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [board, index, onChange, onClose]);

  return (
    <AnimatePresence>
      {board && (
        <motion.div
          className="story-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${board.brand}: ${board.title}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
        >
          <div className="story-lightbox__bar">
            <div>
              <span>{String(index + 1).padStart(2, '0')} / {FEATURED_BOARDS.length}</span>
              <strong>{board.brand} — {board.title}</strong>
            </div>
            <button type="button" onClick={onClose} aria-label="Close storyboard viewer"><X size={22} /></button>
          </div>
          <motion.img
            key={board.src}
            src={board.src}
            alt={`${board.brand} storyboard titled ${board.title}`}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.24 }}
          />
          <button className="story-lightbox__nav story-lightbox__nav--previous" type="button" aria-label="Previous storyboard" onClick={() => onChange((index - 1 + FEATURED_BOARDS.length) % FEATURED_BOARDS.length)}><ArrowLeft size={22} /></button>
          <button className="story-lightbox__nav story-lightbox__nav--next" type="button" aria-label="Next storyboard" onClick={() => onChange((index + 1) % FEATURED_BOARDS.length)}><ArrowRight size={22} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Storyboards() {
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="story-page" style={{ fontFamily: FONTS.ui }}>
      <Seo
        title="Storyboards & Visual Direction | AYESMAJ Studios"
        description="Explore cinematic storyboards, production boards, visual treatments, and campaign direction created by AYESMAJ Studios."
        path="/Storyboards"
        image="/storyboards-10/10-ayesmaj-building-a-brand-world.webp"
      />
      <AyesmajNav />

      <main>
        <section className="story-hero">
          <div className="story-hero__aurora" aria-hidden="true" />
          <div className="story-shell story-hero__grid">
            <motion.div className="story-hero__copy" {...reveal(reducedMotion)}>
              <p className="story-kicker"><Clapperboard size={17} aria-hidden="true" /> Storyboards / Visual Direction</p>
              <h1>See the Film<br /><span>Before It Exists.</span></h1>
              <p className="story-hero__lede">Every world is directed on paper first. Narrative, camera, light, pace, and key frames become visible before production begins.</p>
              <div className="story-hero__actions">
                <a href="#storyboard-gallery" className="story-primary-action">Explore the Boards <ArrowRight size={17} /></a>
                <button type="button" className="story-text-action" onClick={() => navigate('/Contact')}>Start a Story <ArrowUpRight size={16} /></button>
              </div>
              <div className="story-hero__proof" aria-label="Storyboard library summary">
                <span><strong>10</strong> Finished Films</span>
                <span><strong>22</strong> Brand Boards</span>
                <span><strong>01</strong> Visual Language</span>
              </div>
            </motion.div>

            <motion.div className="story-hero__visual" {...reveal(reducedMotion, 0.08)} aria-label="Featured storyboard preview">
              {[FEATURED_BOARDS[4], FEATURED_BOARDS[0], FEATURED_BOARDS[8]].map((board, index) => (
                <div className={`story-hero__frame story-hero__frame--${index + 1}`} key={board.src}>
                  <img src={board.src} alt={`${board.brand} storyboard preview`} fetchPriority={index === 0 ? 'high' : 'auto'} />
                  <span>{String(index + 1).padStart(2, '0')} / {board.brand}</span>
                </div>
              ))}
              <div className="story-hero__lens" aria-hidden="true"><Eye size={22} /></div>
            </motion.div>
          </div>
          <div className="story-filmstrip" aria-hidden="true">
            <span>Narrative</span><i /> <span>Direction</span><i /> <span>Camera</span><i /> <span>Light</span><i /> <span>Motion</span><i /> <span>Launch</span>
          </div>
        </section>

        <section className="story-featured" id="storyboard-gallery">
          <div className="story-shell">
            <div className="story-section-heading">
              <div><p className="story-kicker"><Eye size={16} aria-hidden="true" /> Director's Boards</p><h2>Ten Stories.<br />Ten Visual Worlds.</h2></div>
              <p>Open any board to inspect the complete film direction. Every image is shown in full—never cropped—so the sequence, notes, and cinematic decisions stay readable.</p>
            </div>

            <div className="story-featured-grid">
              {FEATURED_BOARDS.map((board, index) => (
                <motion.button
                  type="button"
                  className={`story-featured-card ${index === 0 || index === 5 || index === 9 ? 'story-featured-card--wide' : ''}`}
                  key={board.src}
                  onClick={() => setSelectedBoard(index)}
                  aria-label={`Open ${board.brand} storyboard: ${board.title}`}
                  {...reveal(reducedMotion, Math.min(index * 0.035, 0.18))}
                >
                  <div className="story-featured-card__image">
                    <img src={board.src} alt={`${board.brand} — ${board.title} storyboard`} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                    <span className="story-featured-card__count">{String(index + 1).padStart(2, '0')} / 10</span>
                    <span className="story-featured-card__open"><ArrowUpRight size={18} /></span>
                  </div>
                  <div className="story-featured-card__copy" style={{ color: board.accent, borderTopColor: board.accent }}>
                    <span>{board.brand}</span>
                    <strong>{board.title}</strong>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section className="story-treatment">
          <div className="story-shell">
            <div className="story-treatment__heading">
              <p className="story-kicker"><Layers3 size={16} aria-hidden="true" /> Creative Treatment</p>
              <h2>From Signal<br />to Screen.</h2>
              <p>Ten visual-development frames show how an idea grows into a controlled, repeatable world.</p>
            </div>
            <div className="story-treatment__grid">
              {DEVELOPMENT_FRAMES.map((frame, index) => (
                <motion.figure key={frame.src} className={index === 0 || index === 7 ? 'story-treatment__frame story-treatment__frame--large' : 'story-treatment__frame'} {...reveal(reducedMotion, Math.min(index * 0.025, 0.16))}>
                  <img src={frame.src} alt={`${frame.title} visual development frame`} loading="lazy" decoding="async" />
                  <figcaption><span>{frame.n}</span>{frame.title}</figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <section className="story-production-board">
          <div className="story-shell">
            <motion.div className="story-production-board__card" {...reveal(reducedMotion)}>
              <div className="story-production-board__top"><span>Scene — Production Board</span><span>AYESMAJ / Director's Cut</span></div>
              <img src="/assets/ayesmaj/storyboard-ref.webp" alt="Syntropic explainer production storyboard with seven directed scenes" loading="lazy" decoding="async" />
            </motion.div>
          </div>
        </section>

        <section className="story-archive">
          <div className="story-shell">
            <div className="story-section-heading story-section-heading--light">
              <div><p className="story-kicker"><Layers3 size={16} aria-hidden="true" /> Brand Board Archive</p><h2>Every Brand<br />Gets a World.</h2></div>
              <p>Identity, product, website, and campaign frames are organized together so every production decision speaks the same visual language.</p>
            </div>
            <div className="story-archive__grid">
              {ARCHIVE_BOARDS.map((board, index) => (
                <motion.figure key={board.src} className={index % 7 === 0 ? 'story-archive__card story-archive__card--wide' : 'story-archive__card'} {...reveal(reducedMotion, Math.min((index % 6) * 0.025, 0.12))}>
                  <img src={board.src} alt={`${board.brand} brand storyboard and production board`} loading="lazy" decoding="async" />
                  <figcaption><span>{board.n}</span><strong>{board.brand}</strong><small>Brand World / Storyboard</small></figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </section>

        <section className="story-process">
          <div className="story-shell">
            <div className="story-section-heading">
              <div><p className="story-kicker"><Clapperboard size={16} aria-hidden="true" /> Our Direction System</p><h2>Five Scenes<br />to Launch.</h2></div>
              <p>Approval happens before expensive production. Each stage makes the next one clearer, faster, and more consistent.</p>
            </div>
            <div className="story-process__grid">
              {PROCESS_FRAMES.map((frame, index) => (
                <motion.article key={frame.n} className="story-process__card" {...reveal(reducedMotion, index * 0.04)}>
                  <div className="story-process__image"><img src={frame.src} alt={`${frame.title} storyboard stage`} loading="lazy" decoding="async" /><span>Scene {frame.n}</span></div>
                  <div><p>{frame.n}</p><h3>{frame.title}</h3><span>{frame.caption}</span></div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="story-cta">
          <div className="story-shell story-cta__inner">
            <div><p className="story-kicker">Your Story / Directed First</p><h2>Let's See Your Film<br />Before We Shoot It.</h2></div>
            <div className="story-cta__action"><p>Bring us the idea. We will turn it into a visual system your team can see, approve, and build.</p><CinematicButton label="Start the Storyboard" accent="#D8B75A" size="lg" onClick={() => navigate('/Contact')} /></div>
          </div>
        </section>
      </main>

      <AyesmajFooter />
      <StoryboardLightbox index={selectedBoard} onClose={() => setSelectedBoard(null)} onChange={setSelectedBoard} />
    </div>
  );
}
