import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Maximize2, X } from 'lucide-react';
import SectionHeader from '../SectionHeader';
import { COLORS, FONTS } from '../theme';
import { CONCEPTS, CONCEPT_FILTERS } from '@/data/concepts';

export default function ConceptLab() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);

  const concepts = useMemo(
    () => (filter === 'All' ? CONCEPTS : CONCEPTS.filter((concept) => concept.category === filter)),
    [filter],
  );

  const closeModal = () => {
    setSelected(null);
    window.setTimeout(() => lastTriggerRef.current?.focus(), 0);
  };

  useEffect(() => {
    if (!selected) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selected]);

  return (
    <section
      id="concept-lab"
      style={{
        position: 'relative',
        padding: 'clamp(72px,9vw,132px) clamp(20px,5vw,80px)',
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <SectionHeader
          eyebrow="Self-Initiated / Concept Lab"
          title="Ideas Without Client Limits"
          subtitle="Fictional brands and original visual experiments created to explore new directions in CGI, identity, digital products, fashion, and spatial design."
          accent="#FFC84B"
        />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 9, margin: '38px 0 44px' }}>
          {CONCEPT_FILTERS.map((item) => {
            const active = filter === item;
            const count = item === 'All' ? CONCEPTS.length : CONCEPTS.filter((concept) => concept.category === item).length;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                aria-pressed={active}
                style={{
                  minHeight: 44,
                  padding: '0 17px',
                  borderRadius: 999,
                  cursor: 'pointer',
                  fontFamily: FONTS.ui,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: active ? '#07100C' : COLORS.gray,
                  background: active ? '#FFC84B' : 'rgba(255,255,255,0.035)',
                  border: `1px solid ${active ? '#FFC84B' : COLORS.border}`,
                  transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                }}
              >
                {item} <span style={{ opacity: 0.6 }}>({count})</span>
              </button>
            );
          })}
        </div>

        <motion.div layout className="ayes-concept-grid">
          <AnimatePresence mode="popLayout">
            {concepts.map((concept, index) => (
              <motion.button
                key={concept.id}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, delay: index * 0.025 }}
                type="button"
                onClick={(event) => {
                  lastTriggerRef.current = event.currentTarget;
                  setSelected(concept);
                }}
                aria-label={`Open ${concept.title} concept artwork`}
                className="ayes-concept-card"
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 5',
                  padding: 0,
                  borderRadius: 18,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  textAlign: 'left',
                  background: COLORS.black2,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <img
                  src={concept.image}
                  alt={`${concept.title} — ${concept.subtitle}, self-initiated concept work`}
                  width="1122"
                  height="1402"
                  loading="lazy"
                  className="ayes-concept-image"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.35s ease' }}
                />
                <div aria-hidden style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,10,7,0.94) 0%, rgba(5,10,7,0.04) 58%, transparent 100%)' }} />
                <span
                  aria-hidden="true"
                  className="ayes-concept-open"
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    width: 46,
                    height: 46,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#07100C',
                    background: concept.accent,
                    opacity: 0,
                    transform: 'translateY(5px)',
                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                  }}
                >
                  <Maximize2 size={17} />
                </span>
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 2, padding: 18 }}>
                  <p style={{ fontFamily: FONTS.ui, fontSize: 9.5, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: concept.accent, margin: '0 0 7px' }}>
                    {concept.category} · Concept Work
                  </p>
                  <h3 style={{ fontFamily: FONTS.display, fontSize: 23, lineHeight: 1, textTransform: 'uppercase', color: COLORS.white, margin: '0 0 6px' }}>
                    {concept.title}
                  </h3>
                  <p style={{ fontFamily: FONTS.ui, fontSize: 12, color: COLORS.gray, margin: 0 }}>{concept.subtitle}</p>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.title} concept artwork`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(16px,4vw,48px)',
              background: 'rgba(3,8,5,0.88)',
              backdropFilter: 'blur(18px)',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              style={{ position: 'relative', width: 'min(92vw, 780px)', maxHeight: '90dvh', overflow: 'auto', borderRadius: 22, background: COLORS.black2, border: `1px solid ${COLORS.border}`, boxShadow: '0 36px 120px rgba(0,0,0,0.55)' }}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeModal}
                aria-label="Close concept artwork"
                style={{ position: 'absolute', top: 14, right: 14, zIndex: 3, width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: COLORS.white, background: 'rgba(7,16,12,0.78)', border: `1px solid ${COLORS.border}`, backdropFilter: 'blur(12px)' }}
              >
                <X size={19} />
              </button>
              <img src={selected.image} alt={`${selected.title} — ${selected.subtitle}`} width="1122" height="1402" style={{ width: '100%', height: 'auto', display: 'block' }} />
              <div style={{ padding: '22px 24px 26px' }}>
                <p style={{ fontFamily: FONTS.ui, fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: selected.accent, margin: '0 0 8px' }}>
                  {selected.category} · Self-Initiated Concept
                </p>
                <h3 style={{ fontFamily: FONTS.display, fontSize: 30, textTransform: 'uppercase', color: COLORS.white, margin: '0 0 6px' }}>{selected.title}</h3>
                <p style={{ fontFamily: FONTS.ui, fontSize: 14, color: COLORS.gray, margin: 0 }}>{selected.subtitle}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .ayes-concept-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 14px;
        }
        .ayes-concept-card:hover .ayes-concept-image,
        .ayes-concept-card:focus-visible .ayes-concept-image { transform: scale(1.035); }
        .ayes-concept-card:hover .ayes-concept-open,
        .ayes-concept-card:focus-visible .ayes-concept-open { opacity: 1 !important; transform: translateY(0) !important; }
        .ayes-concept-card:focus-visible { outline: 3px solid #FFC84B; outline-offset: 3px; }
        @media (max-width: 1080px) {
          .ayes-concept-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        @media (max-width: 680px) {
          .ayes-concept-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ayes-concept-card, .ayes-concept-image, .ayes-concept-open { transition: none !important; transform: none !important; }
        }
      `}</style>
    </section>
  );
}
