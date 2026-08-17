import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
import './image-gallery.css';

const FALLBACK_RATIOS = [1.7, 0.78, 0.95, 1.78, 1.32, 0.74];

const getCardKey = (card, index) => String(card.id ?? card.src ?? index);

const getShape = (ratio) => {
  if (ratio >= 1.55) return 'wide';
  if (ratio >= 1.15) return 'landscape';
  if (ratio > 0.88) return 'square';
  return 'portrait';
};

function buildEditorialLayout(cards, ratios) {
  const placements = [];

  for (let index = 0; index < cards.length; index += 2) {
    if (cards.length - index === 3) {
      for (let offset = 0; offset < 3; offset += 1) {
        const card = cards[index + offset];
        const ratio = ratios[getCardKey(card, index + offset)] ?? card.aspectRatio ?? FALLBACK_RATIOS[(index + offset) % FALLBACK_RATIOS.length];
        placements.push({ ratio, shape: getShape(ratio), span: 4 });
      }
      break;
    }

    const first = cards[index];
    const second = cards[index + 1];
    const firstRatio = ratios[getCardKey(first, index)] ?? first.aspectRatio ?? FALLBACK_RATIOS[index % FALLBACK_RATIOS.length];
    const firstShape = getShape(firstRatio);

    if (!second) {
      placements.push({ ratio: firstRatio, shape: firstShape, span: firstShape === 'portrait' ? 6 : 12 });
      break;
    }

    const secondRatio = ratios[getCardKey(second, index + 1)] ?? second.aspectRatio ?? FALLBACK_RATIOS[(index + 1) % FALLBACK_RATIOS.length];
    const secondShape = getShape(secondRatio);
    const difference = firstRatio - secondRatio;

    let firstSpan = 6;
    let secondSpan = 6;

    if (difference >= 0.3 || (firstShape === 'wide' && secondShape !== 'wide')) {
      firstSpan = 8;
      secondSpan = 4;
    } else if (difference <= -0.3 || (secondShape === 'wide' && firstShape !== 'wide')) {
      firstSpan = 4;
      secondSpan = 8;
    }

    placements.push(
      { ratio: firstRatio, shape: firstShape, span: firstSpan },
      { ratio: secondRatio, shape: secondShape, span: secondSpan },
    );
  }

  return placements;
}

function GalleryImage({ alt, eager = false, fallbackRatio, onDimensions, src }) {
  const imageRef = useRef(null);
  const isInView = useInView(imageRef, { once: true, amount: 0.08 });
  const [status, setStatus] = useState('loading');

  const handleLoad = (event) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    if (naturalWidth && naturalHeight) onDimensions(naturalWidth / naturalHeight);
    setStatus('loaded');
  };

  const handleError = () => {
    setStatus('error');
    if (import.meta.env.DEV) console.warn(`[AYESMAJ gallery] Could not load ${src}`);
  };

  return (
    <span
      ref={imageRef}
      className={`ayesmaj-image-gallery__image-shell is-${status}`}
      style={{ '--gallery-image-ratio': fallbackRatio }}
    >
      {status !== 'error' ? (
        <img
          alt={alt}
          src={src}
          className={`ayesmaj-image-gallery__image${isInView && status === 'loaded' ? ' is-visible' : ''}`}
          onLoad={handleLoad}
          onError={handleError}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
        />
      ) : (
        <span className="ayesmaj-image-gallery__placeholder" role="img" aria-label={`${alt} unavailable`}>
          <span>AYESMAJ</span>
          <small>Artwork unavailable</small>
        </span>
      )}
    </span>
  );
}

/**
 * Universal AYESMAJ brand-world gallery. It reads each artwork's intrinsic
 * ratio, pairs complementary orientations into a 12-column editorial rhythm,
 * and never crops the source image.
 */
export function ImageGallery({ cards = [], label = 'Project gallery' }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [ratios, setRatios] = useState({});
  const closeButtonRef = useRef(null);
  const triggerRefs = useRef([]);
  const selected = selectedIndex === null ? null : cards[selectedIndex];
  const placements = useMemo(() => buildEditorialLayout(cards, ratios), [cards, ratios]);

  const close = useCallback(() => {
    const trigger = triggerRefs.current[selectedIndex];
    setSelectedIndex(null);
    window.requestAnimationFrame(() => trigger?.focus());
  }, [selectedIndex]);

  const move = useCallback((direction) => {
    setSelectedIndex((current) => {
      if (current === null || cards.length < 2) return current;
      return (current + direction + cards.length) % cards.length;
    });
  }, [cards.length]);

  useEffect(() => {
    if (selectedIndex === null) return undefined;

    const previousBodyOverflow = document.body.style.overflow;
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
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousDocumentOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [close, move, selectedIndex]);

  if (cards.length === 0) return null;

  return (
    <>
      <div className="ayesmaj-image-gallery" aria-label={label}>
        <div className={`ayesmaj-image-gallery__editorial-grid ayesmaj-image-gallery__editorial-grid--${Math.min(cards.length, 3)}`}>
          {cards.map((card, index) => {
            const cardKey = getCardKey(card, index);
            const placement = placements[index];
            const layoutId = `brand-image-${cardKey}`;

            return (
              <motion.figure
                className={`ayesmaj-image-gallery__tile ayesmaj-image-gallery__tile--${placement.shape}`}
                key={cardKey}
                style={{ '--gallery-span': placement.span }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.08 }}
                transition={{ duration: 0.68, delay: (index % 3) * 0.045, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  ref={(node) => { triggerRefs.current[index] = node; }}
                  type="button"
                  className="ayesmaj-image-gallery__media"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Open ${card.alt} full screen`}
                >
                  <motion.span className="ayesmaj-image-gallery__shared-frame" layoutId={layoutId}>
                    <GalleryImage
                      src={card.src}
                      alt={card.alt}
                      eager={index < 3}
                      fallbackRatio={placement.ratio}
                      onDimensions={(ratio) => {
                        setRatios((current) => current[cardKey] === ratio ? current : { ...current, [cardKey]: ratio });
                      }}
                    />
                  </motion.span>
                  <span className="ayesmaj-image-gallery__counter" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="ayesmaj-image-gallery__expand" aria-hidden="true">
                    <Maximize2 size={16} />
                    <span>View</span>
                  </span>
                </button>
                <figcaption className="ayesmaj-image-gallery__visually-hidden">
                  {card.eyebrow ? `${card.eyebrow}: ` : ''}{card.title}
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </div>

      {selected && createPortal(
        <motion.div
              className="ayesmaj-image-gallery__dialog"
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.alt} full-screen view`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.24 }}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) close();
              }}
            >
              <button
                ref={closeButtonRef}
                type="button"
                className="ayesmaj-image-gallery__close"
                onClick={close}
                aria-label="Close full-screen image"
              >
                <X size={22} aria-hidden="true" />
              </button>

              {cards.length > 1 && (
                <>
                  <button
                    type="button"
                    className="ayesmaj-image-gallery__arrow ayesmaj-image-gallery__arrow--left"
                    onClick={() => move(-1)}
                    aria-label="Previous image"
                  >
                    <ArrowLeft size={22} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="ayesmaj-image-gallery__arrow ayesmaj-image-gallery__arrow--right"
                    onClick={() => move(1)}
                    aria-label="Next image"
                  >
                    <ArrowRight size={22} aria-hidden="true" />
                  </button>
                </>
              )}

              <motion.figure
                key={getCardKey(selected, selectedIndex)}
                layoutId={`brand-image-${getCardKey(selected, selectedIndex)}`}
                className={`ayesmaj-image-gallery__dialog-figure ayesmaj-image-gallery__dialog-figure--${getShape(ratios[getCardKey(selected, selectedIndex)] ?? selected.aspectRatio ?? 1.5)}`}
                transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
              >
                <img src={selected.src} alt={selected.alt} decoding="async" />
                <figcaption>
                  <span>{String(selectedIndex + 1).padStart(2, '0')} / {String(cards.length).padStart(2, '0')}</span>
                  {selected.eyebrow && <small>{selected.eyebrow}</small>}
                  {selected.title && <strong>{selected.title}</strong>}
                </figcaption>
              </motion.figure>
        </motion.div>,
        document.body,
      )}
    </>
  );
}

export default ImageGallery;
