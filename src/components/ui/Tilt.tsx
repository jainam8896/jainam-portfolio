import { m } from 'framer-motion';
import type { ReactNode } from 'react';
import { useTilt } from '@/hooks/useTilt';
import { cn } from '@/lib/utils';

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. Keep it small — 5 to 8. */
  max?: number;
  /** Lower values exaggerate the perspective. */
  perspective?: number;
}

/**
 * Tilts its children in 3D towards the pointer.
 *
 * Falls back to a plain wrapper — no listeners attached at all — on touch
 * devices and for visitors who ask for reduced motion. The children are never
 * hidden or moved in that case, so nothing depends on this working.
 */
export function Tilt({
  children,
  className,
  max = 6,
  perspective = 900,
}: TiltProps) {
  const { enabled, style, handlers } = useTilt({ max, perspective });

  if (!enabled) {
    return <div className={cn('h-full', className)}>{children}</div>;
  }

  return (
    <m.div className={cn('h-full', className)} style={style} {...handlers}>
      {children}
    </m.div>
  );
}
