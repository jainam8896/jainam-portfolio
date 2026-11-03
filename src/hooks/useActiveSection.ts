import { useEffect, useState } from 'react';

/**
 * Tracks which section is currently in view so the navbar can highlight it.
 *
 * Uses a single IntersectionObserver with a band near the top of the viewport
 * rather than a scroll listener, so it costs nothing on the main thread.
 *
 * `ids` must be referentially stable (define it at module scope or memoise it).
 */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState('');

  useEffect(() => {
    if (ids.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.add(entry.target.id);
          } else {
            visible.delete(entry.target.id);
          }
        }

        if (visible.size === 0) return;

        // Of the visible sections, highlight the earliest in document order:
        // that is the one the reader has just arrived at.
        let best = '';
        let bestIndex = Number.POSITIVE_INFINITY;
        for (const id of visible) {
          const index = ids.indexOf(id);
          if (index !== -1 && index < bestIndex) {
            bestIndex = index;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      {
        // A band across the upper part of the viewport: a section becomes
        // active once its content reaches comfortable reading position.
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0,
      },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    // Anything below the last section's band (the footer) keeps the final
    // link lit, which matches what the reader sees.
    const onScrollEnd = () => {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActive(ids[ids.length - 1]);
    };
    window.addEventListener('scroll', onScrollEnd, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScrollEnd);
      observer.disconnect();
    };
  }, [ids]);

  return active;
}
