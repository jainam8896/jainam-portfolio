import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Load/reveal this far before the element reaches the viewport. */
  rootMargin?: string;
  /** Stop observing after the first intersection. Defaults to true. */
  once?: boolean;
}

/**
 * Minimal "is this near the viewport yet?" hook.
 * Drives both the lazy mounting of below-the-fold sections and reveal effects.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = '300px 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No IntersectionObserver (very old browsers, some test envs): show it all.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, once]);

  return { ref, inView } as const;
}
