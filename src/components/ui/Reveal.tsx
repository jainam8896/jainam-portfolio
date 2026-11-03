import { m } from 'framer-motion';
import type { ReactNode } from 'react';

type Variant = 'fade' | 'depth';

interface RevealProps {
  children: ReactNode;
  /** Stagger offset in seconds. */
  delay?: number;
  className?: string;
  as?: 'div' | 'li' | 'article';
  /**
   * `fade` — a plain rise, for prose and timeline entries.
   * `depth` — the same rise with a 3D tilt, for cards. Use it on grids of
   * cards, not on body copy: rotating a paragraph while it fades in makes the
   * text hard to read on the way past.
   */
  variant?: Variant;
}

const EASE = [0.22, 0.61, 0.36, 1] as const;

const VARIANTS = {
  fade: {
    hidden: { opacity: 0, y: 16 },
    shown: { opacity: 1, y: 0 },
  },
  depth: {
    hidden: {
      opacity: 0,
      y: 44,
      rotateX: 14,
      scale: 0.97,
      transformPerspective: 1200,
    },
    shown: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transformPerspective: 1200,
    },
  },
} as const;

/**
 * Reveals its children as they first scroll into view.
 *
 * Framer Motion's `MotionConfig reducedMotion="user"` (set in App) strips the
 * transforms for visitors who ask for reduced motion, so the 3D variant
 * degrades to a plain fade without needing a separate code path.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
  variant = 'fade',
}: RevealProps) {
  const Component = as === 'li' ? m.li : as === 'article' ? m.article : m.div;

  const states = VARIANTS[variant];

  return (
    <Component
      initial={states.hidden}
      whileInView={states.shown}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: variant === 'depth' ? 0.7 : 0.5,
        delay,
        ease: EASE,
      }}
      className={className}
      // The tilt pivots on the card's lower edge, so it reads as the card
      // swinging up into place rather than spinning about its middle.
      style={variant === 'depth' ? { transformOrigin: '50% 100%' } : undefined}
    >
      {children}
    </Component>
  );
}
