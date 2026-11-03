import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';

/**
 * True only for devices with a real hovering pointer (mouse/trackpad).
 *
 * Pointer tilt on a touchscreen is worse than nothing: the card would lurch
 * on tap and stay tilted, because there is no "leave" event to reset it.
 */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    setFine(query.matches);

    const onChange = (event: MediaQueryListEvent) => setFine(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return fine;
}

interface TiltOptions {
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** CSS perspective, in px. Lower = more dramatic. */
  perspective?: number;
}

const SPRING = { stiffness: 190, damping: 22, mass: 0.45 } as const;

/**
 * Pointer-driven 3D tilt for a card.
 *
 * Returns props to spread onto a `m.*` element. Disabled automatically when the
 * visitor asks for reduced motion or has no fine pointer, in which case the
 * returned handlers are undefined and the motion values stay at rest.
 *
 * The element's rect is measured once on pointer enter rather than on every
 * move — reading `getBoundingClientRect()` inside a move handler forces a
 * layout on each event, which is how tilt effects end up janky.
 */
export function useTilt({ max = 7, perspective = 900 }: TiltOptions = {}) {
  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduceMotion;

  // Normalised pointer position within the element, -0.5 … 0.5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), SPRING);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), SPRING);

  const rect = useRef<DOMRect | null>(null);

  const onPointerEnter = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      rect.current = event.currentTarget.getBoundingClientRect();
    },
    [],
  );

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      const box = rect.current;
      if (!box) return;
      px.set((event.clientX - box.left) / box.width - 0.5);
      py.set((event.clientY - box.top) / box.height - 0.5);
    },
    [px, py],
  );

  const onPointerLeave = useCallback(() => {
    rect.current = null;
    px.set(0);
    py.set(0);
  }, [px, py]);

  if (!enabled) {
    return { enabled: false, style: undefined, handlers: {} } as const;
  }

  return {
    enabled: true,
    style: { rotateX, rotateY, transformPerspective: perspective },
    handlers: { onPointerEnter, onPointerMove, onPointerLeave },
  } as const;
}
