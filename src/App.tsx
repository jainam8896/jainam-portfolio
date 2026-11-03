import { lazy, useEffect } from 'react';
import { LazyMotion, MotionConfig } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { LazySection } from '@/components/ui/LazySection';
import { flushDeferredMount } from '@/lib/deferredMount';

/* Above the fold (Navbar, Hero, About) ships in the main bundle.
 * Everything below it is split out and mounted on approach/idle. */
const Experience = lazy(() =>
  import('@/components/Experience').then((m) => ({ default: m.Experience })),
);
const Work = lazy(() =>
  import('@/components/Work').then((m) => ({ default: m.Work })),
);
const Skills = lazy(() =>
  import('@/components/Skills').then((m) => ({ default: m.Skills })),
);
const Education = lazy(() =>
  import('@/components/Education').then((m) => ({ default: m.Education })),
);
const Contact = lazy(() =>
  import('@/components/Contact').then((m) => ({ default: m.Contact })),
);
/** Framer Motion's DOM features load in their own async chunk. */
const loadMotionFeatures = () =>
  import('@/lib/motionFeatures').then((mod) => mod.default);

const Footer = lazy(() =>
  import('@/components/Footer').then((m) => ({ default: m.Footer })),
);

/**
 * Scrolls to a hash target, waiting for it if the section has not finished
 * mounting yet. Clicking a nav link is itself an interaction, which triggers
 * the deferred mount, but the lazy chunk still needs a frame or two to arrive.
 */
function scrollToHash(hash: string) {
  flushDeferredMount();

  let attempts = 0;
  const tryScroll = () => {
    const target = document.querySelector(hash);
    if (target) {
      target.scrollIntoView({ block: 'start' });
      return;
    }
    if (attempts++ < 60) window.requestAnimationFrame(tryScroll);
  };
  tryScroll();
}

export default function App() {
  useEffect(() => {
    const onHashChange = () => {
      const { hash } = window.location;
      if (hash && hash !== '#top') scrollToHash(hash);
    };

    window.addEventListener('hashchange', onHashChange);

    // A deep link such as /#contact: the browser's own scroll happens before
    // React paints, so redo it once the target actually exists.
    const timer = window.setTimeout(onHashChange, 60);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <LazyMotion features={loadMotionFeatures} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-accent-fg"
        >
          Skip to content
        </a>

        <Navbar />

        <main id="main">
          <Hero />
          <About />
          <LazySection component={Experience} minHeight={900} />
          <LazySection component={Work} minHeight={1400} />
          <LazySection component={Skills} minHeight={700} />
          <LazySection component={Education} minHeight={420} />
          <LazySection component={Contact} minHeight={700} />
        </main>

        <LazySection component={Footer} minHeight={140} />
      </MotionConfig>
    </LazyMotion>
  );
}
