/**
 * Framer Motion's DOM animation feature bundle, in its own module so that
 * `LazyMotion` can code-split it into an async chunk. Keeping it out of the
 * entry bundle is what lets the page paint before the animation code arrives.
 */
export { domAnimation as default } from 'framer-motion';
