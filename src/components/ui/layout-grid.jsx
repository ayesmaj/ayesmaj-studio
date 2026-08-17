import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
import './layout-grid.css';

/**
 * AYESMAJ adaptation of the supplied shared-layout gallery.
 * Cards are presented as viewport-scale art stages and open into an
 * accessible full-screen viewer without cropping the original artwork.
 */
export function LayoutGrid({ cards = [], label = 'Project gallery' }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const closeButtonRef = useRef(null);
  const triggerRefs = useRef([]);

  const selected = selectedIndex === null ? null : cards[selectedIndex];

  const close = () => {
    const trigger = triggerRefs.current[selectedIndex];
    setSelectedIndex(null);
    window.requestAnimationFrame(() => trigger?.focus());
  };

  const move = (direction) => {
    setSelectedIndex((current) => {
      if (current === null || cards.length < 2) return current;
      return (current + direction + cards.length) % cards.length;
    });
  };

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previousDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIndex]);

  if (cards.length === 0) return null;

  return (
    <>
      <div className="ayesmaj-layout-grid" aria-label={label}>
        {cards.map((card, index) => (
          <motion.figure
            className="ayesmaj-layout-grid__stage"
            key={card.id ?? card.src}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.button
              ref={(node) => { triggerRefs.current[index] = node; }}
              type="button"
              className="ayesmaj-layout-grid__trigger"
              onClick={() => setSelectedIndex(index)}
              layoutId={`gallery-card-${card.id}`}
              aria-label={`Open ${card.alt} full screen`}
            >
              <motion.img
                layoutId={`gallery-image-${card.id}`}
                src={card.src}
                alt={card.alt}
                loading="lazy"
                decoding="async"
              />
              <span className="ayesmaj-layout-grid__counter">
                {String(index + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}
              </span>
              <span className="ayesmaj-layout-grid__expand" aria-hidden="true">
                <Maximize2 size={18} />
              </span>
              <span className="ayesmaj-layout-grid__caption">
                <small>{card.eyebrow}</small>
                <strong>{card.title}</strong>
              </span>
            </motion.button>
          </motion.figure>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {selected && (
          <motion.div
            className="ayesmaj-layout-grid__dialog"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.alt} full-screen view`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="ayesmaj-layout-grid__close"
              onClick={close}
              aria-label="Close full-screen image"
            >
              <X size={22} aria-hidden="true" />
            </button>

            {cards.length > 1 && (
              <>
                <button
                  type="button"
                  className="ayesmaj-layout-grid__arrow ayesmaj-layout-grid__arrow--left"
                  onClick={() => move(-1)}
                  aria-label="Previous image"
                >
                  <ArrowLeft size={22} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="ayesmaj-layout-grid__arrow ayesmaj-layout-grid__arrow--right"
                  onClick={() => move(1)}
                  aria-label="Next image"
                >
                  <ArrowRight size={22} aria-hidden="true" />
                </button>
              </>
            )}

            <motion.figure
              className="ayesmaj-layout-grid__dialog-figure"
              layoutId={`gallery-card-${selected.id}`}
            >
              <motion.img
                layoutId={`gallery-image-${selected.id}`}
                src={selected.src}
                alt={selected.alt}
              />
              <figcaption>
                <span>{String(selectedIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}</span>
                <div>
                  <small>{selected.eyebrow}</small>
                  <strong>{selected.title}</strong>
                </div>
              </figcaption>
            </motion.figure>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}

export default LayoutGrid;
