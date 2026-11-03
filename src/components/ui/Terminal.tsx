import { useEffect, useMemo, useRef, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import { apiResponse, heroCommand } from '@/data/portfolio';

const KEY = 'text-[var(--code-key)]';
const STR = 'text-[var(--code-string)]';
const BOOL = 'text-[var(--code-bool)]';
const PUNCT = 'text-[var(--code-punct)]';

function Key({ name }: { name: string }) {
  return (
    <>
      <span className={KEY}>&quot;{name}&quot;</span>
      <span className={PUNCT}>: </span>
    </>
  );
}

function Str({ value }: { value: string }) {
  return <span className={STR}>&quot;{value}&quot;</span>;
}

/**
 * Builds the response body as discrete rows so they can be revealed one at a
 * time. Content comes from `portfolio.ts`, so editing the data edits the hero.
 */
function useResponseRows(): ReactNode[] {
  return useMemo<ReactNode[]>(
    () => [
      <span className={PUNCT}>{'{'}</span>,
      <span className="pl-4">
        <Key name="role" />
        <Str value={apiResponse.role} />
        <span className={PUNCT}>,</span>
      </span>,
      <span className="pl-4">
        <Key name="experience" />
        <Str value={apiResponse.experience} />
        <span className={PUNCT}>,</span>
      </span>,
      <span className="flex flex-wrap pl-4">
        <Key name="stack" />
        <span className={PUNCT}>[</span>
        {apiResponse.stack.map((item, i) => (
          <span key={item}>
            <Str value={item} />
            {i < apiResponse.stack.length - 1 ? (
              <span className={PUNCT}>,&nbsp;</span>
            ) : null}
          </span>
        ))}
        <span className={PUNCT}>],</span>
      </span>,
      <span className="pl-4">
        <Key name="location" />
        <Str value={apiResponse.location} />
        <span className={PUNCT}>,</span>
      </span>,
      <span className="pl-4">
        <Key name="open_to_work" />
        <span className={BOOL}>{String(apiResponse.open_to_work)}</span>
      </span>,
      <span className={PUNCT}>{'}'}</span>,
    ],
    [],
  );
}

const TYPE_MS = 26;
const START_DELAY_MS = 360;
const PAUSE_AFTER_COMMAND_MS = 300;
const ROW_MS = 80;

/**
 * The hero's animated terminal: types a curl command, then reveals a JSON
 * "API response" describing Jainam.
 *
 * Two deliberate implementation choices:
 *
 * 1. The animation is driven imperatively against refs rather than through
 *    React state. Typing ~45 characters through `useState` would mean ~45
 *    render-and-reconcile passes in the first second and a half of page life,
 *    which is exactly the window Lighthouse measures as blocking time — and
 *    exactly when a mid-range phone can least afford it.
 *
 * 2. Every row is in the DOM from the first paint and only its opacity
 *    changes, so the panel never resizes (no layout shift) and the whole
 *    response is available to assistive tech immediately.
 */
export function Terminal() {
  const rows = useResponseRows();
  const reduceMotion = useReducedMotion();

  const commandRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const command = commandRef.current;
    const caret = caretRef.current;
    const status = statusRef.current;
    const rowEls = rowRefs.current;

    // Start from a known state — the effect can re-run (StrictMode in dev,
    // or a change in the reduced-motion preference).
    if (command) command.textContent = '';
    if (caret) caret.style.display = '';
    if (status) status.style.opacity = '0';
    for (const el of rowEls) if (el) el.style.opacity = '0';

    // Reduced motion: present the finished state, animate nothing.
    if (reduceMotion) {
      if (command) command.textContent = heroCommand;
      if (caret) caret.style.display = 'none';
      if (status) status.style.opacity = '1';
      for (const el of rowEls) if (el) el.style.opacity = '1';
      return;
    }

    const timers: number[] = [];
    let chars = 0;
    let row = 0;

    const revealNext = () => {
      const el = rowEls[row];
      if (el) el.style.opacity = '1';
      row += 1;
      if (row < rowEls.length)
        timers.push(window.setTimeout(revealNext, ROW_MS));
    };

    const startResponse = () => {
      if (caret) caret.style.display = 'none';
      if (status) status.style.opacity = '1';
      revealNext();
    };

    const typeNext = () => {
      chars += 1;
      if (command) command.textContent = heroCommand.slice(0, chars);

      if (chars < heroCommand.length) {
        timers.push(window.setTimeout(typeNext, TYPE_MS));
      } else {
        timers.push(window.setTimeout(startResponse, PAUSE_AFTER_COMMAND_MS));
      }
    };

    timers.push(window.setTimeout(typeNext, START_DELAY_MS));

    return () => timers.forEach(window.clearTimeout);
  }, [reduceMotion]);

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bg-elevated shadow-xl shadow-black/5 dark:shadow-black/40">
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
        </span>
        <p className="ml-1 truncate font-mono text-xs text-fg-subtle">
          jainam@portfolio — zsh
        </p>
      </div>

      <div className="px-4 py-4 font-mono text-[12.5px] leading-[1.75] sm:px-5 sm:py-5 sm:text-[13.5px]">
        {/* The visual panel below is aria-hidden, because reading animated
            JSON punctuation aloud is miserable. This is the same information
            as a sentence, available from the first paint. */}
        <p className="sr-only">
          {`Terminal: ${heroCommand} returns 200 OK. Role: ${apiResponse.role}. ` +
            `Experience: ${apiResponse.experience}. ` +
            `Stack: ${apiResponse.stack.join(', ')}. ` +
            `Location: ${apiResponse.location}. ` +
            `Open to work: ${apiResponse.open_to_work ? 'yes' : 'no'}.`}
        </p>

        <div className="flex items-baseline" aria-hidden="true">
          <span className="mr-2 shrink-0 text-accent">$</span>
          {/* The full command reserves its final width and height invisibly
              while the visible copy types over the top of it. */}
          <span className="relative min-w-0 flex-1 break-all">
            <span className="invisible">{heroCommand}</span>
            <span className="absolute inset-0 text-fg">
              <span ref={commandRef} />
              <span
                ref={caretRef}
                className="ml-px inline-block h-[1.05em] w-[7px] translate-y-[2px] animate-caret bg-accent align-middle"
              />
            </span>
          </span>
        </div>

        <div className="mt-3" aria-hidden="true">
          <p
            ref={statusRef}
            style={{ opacity: 0 }}
            className="text-fg-subtle transition-opacity duration-500"
          >
            <span className="font-medium text-accent">200 OK</span>
            <span className="hidden text-fg-subtle sm:inline">
              {'  · content-type: application/json'}
            </span>
          </p>

          <div className="mt-1.5">
            {rows.map((row, i) => (
              <div
                key={i}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                style={{ opacity: 0 }}
                className="whitespace-pre-wrap transition-opacity duration-300"
              >
                {row}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
