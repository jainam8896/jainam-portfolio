import { Suspense, useSyncExternalStore, type ComponentType } from 'react';
import { useInView } from '@/hooks/useInView';
import {
  getDeferredMountServerSnapshot,
  getDeferredMountSnapshot,
  subscribeDeferredMount,
} from '@/lib/deferredMount';

interface LazySectionProps {
  /** A `React.lazy()` component. */
  component: ComponentType;
  /** Reserved height while the section has not mounted, keeping layout stable. */
  minHeight?: number;
}

/**
 * Keeps a below-the-fold section's JavaScript out of the critical path.
 *
 * The section mounts when either happens first:
 *   1. it approaches the viewport, or
 *   2. the visitor interacts with the page at all (see `deferredMount`).
 *
 * (2) is what keeps navbar anchors and the active-section observer honest —
 * they need the real `<section id>` in the DOM. A placeholder of roughly the
 * right height holds the space until then, so nothing jumps (CLS stays at 0).
 */
export function LazySection({
  component: Component,
  minHeight = 520,
}: LazySectionProps) {
  const { ref, inView } = useInView<HTMLDivElement>({
    rootMargin: '400px 0px',
  });

  const engaged = useSyncExternalStore(
    subscribeDeferredMount,
    getDeferredMountSnapshot,
    getDeferredMountServerSnapshot,
  );

  const show = inView || engaged;

  return (
    <div ref={ref} style={!show ? { minHeight } : undefined}>
      {show ? (
        <Suspense fallback={<div style={{ minHeight }} />}>
          <Component />
        </Suspense>
      ) : null}
    </div>
  );
}
