import { useRef, type CSSProperties, type ReactNode } from 'react';
import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

interface ScrollDepthProps {
  children: ReactNode;
  className?: string;
  /** Passed through to the outer element (the hero uses it for its CSS delay). */
  style?: CSSProperties;
  /** Degrees of X rotation applied across the scroll range. */
  rotate?: number;
  /** Pixels of upward drift across the scroll range. */
  lift?: number;
}

const SPRING = { stiffness: 120, damping: 26, mass: 0.6 } as const;

/**
 * Scroll-linked 3D depth: the element tips back and drifts as it leaves the
 * viewport, so the page reads as layered rather than flat.
 *
 * Only `transform` and `opacity` are animated — both are composited, so this
 * costs no layout or paint while scrolling. Progress is measured against the
 * element's own position (`useScroll` with a target), not the raw window
 * offset, so it behaves the same at any viewport height.
 *
 * Returns a plain wrapper when reduced motion is requested.
 */
export function ScrollDepth({
  children,
  className,
  style,
  rotate = 9,
  lift = 60,
}: ScrollDepthProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.2', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, SPRING);
  const rotateX = useTransform(smooth, [0, 1], [0, rotate]);
  const y = useTransform(smooth, [0, 1], [0, -lift]);
  const opacity = useTransform(smooth, [0, 0.75, 1], [1, 1, 0.45]);

  // The ref stays attached in both branches, otherwise `useScroll` warns that
  // its target never mounted.
  if (reduceMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={style}>
      <m.div
        style={{
          rotateX,
          y,
          opacity,
          transformPerspective: 1100,
          transformOrigin: '50% 0%',
        }}
      >
        {children}
      </m.div>
    </div>
  );
}
