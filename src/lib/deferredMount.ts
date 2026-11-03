/**
 * A single shared "the visitor is engaging with the page" signal.
 *
 * Below-the-fold sections mount when they approach the viewport, but navbar
 * anchors and the active-section observer need those `<section id>` elements to
 * exist even before the reader scrolls to them. Rather than mounting everything
 * eagerly (which costs main-thread time during the critical first seconds),
 * this flips on the first real interaction — scroll, pointer, key or touch —
 * with a long idle-time fallback for visitors who never touch anything.
 *
 * One listener set is shared by every section instead of one set each.
 */

let ready = false;
const listeners = new Set<() => void>();

const EVENTS = [
  'pointerdown',
  'keydown',
  'wheel',
  'touchstart',
  'scroll',
] as const;

let idleHandle: number | undefined;
let timeoutHandle: number | undefined;

function stopListening() {
  for (const event of EVENTS) {
    window.removeEventListener(event, activate);
  }
  if (idleHandle !== undefined) {
    window.cancelIdleCallback?.(idleHandle);
    idleHandle = undefined;
  }
  if (timeoutHandle !== undefined) {
    window.clearTimeout(timeoutHandle);
    timeoutHandle = undefined;
  }
}

function activate() {
  if (ready) return;
  ready = true;
  stopListening();
  for (const listener of listeners) listener();
}

let started = false;

function start() {
  if (started || ready || typeof window === 'undefined') return;
  started = true;

  for (const event of EVENTS) {
    window.addEventListener(event, activate, { passive: true, once: true });
  }

  // Fallback for a visitor (or a crawler) that never interacts. Deliberately
  // late so it lands well after the page is interactive.
  if (typeof window.requestIdleCallback === 'function') {
    idleHandle = window.requestIdleCallback(activate, { timeout: 10_000 });
  } else {
    timeoutHandle = window.setTimeout(activate, 6_000);
  }
}

/** Subscribe to the signal. Returns an unsubscribe function. */
export function subscribeDeferredMount(listener: () => void): () => void {
  start();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDeferredMountSnapshot(): boolean {
  return ready;
}

/** Server snapshot — this site is static, so nothing is "ready" at build time. */
export function getDeferredMountServerSnapshot(): boolean {
  return false;
}

/** Forces every deferred section to mount right now (used by anchor clicks). */
export function flushDeferredMount(): void {
  activate();
}
