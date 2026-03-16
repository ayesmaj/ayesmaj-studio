import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref to attach to a container and a `y` pixel offset for parallax.
 * speed: 0 = no movement, 1 = full viewport scroll
 */
export function useParallax(speed = 0.3) {
  const ref = useRef(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh / 2 - (rect.top + rect.height / 2)) / vh;
      setY(progress * speed * 120);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [speed]);

  return { ref, y };
}