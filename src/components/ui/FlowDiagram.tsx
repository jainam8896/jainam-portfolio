import { Fragment } from 'react';
import { ArrowRight } from 'lucide-react';
import type { FlowNode } from '@/types';
import { cn } from '@/lib/utils';

const KIND_STYLES: Record<NonNullable<FlowNode['kind']>, string> = {
  source: 'border-line-strong bg-bg-elevated text-fg',
  process: 'border-line bg-surface text-fg-muted',
  store: 'border-accent/40 bg-accent-soft text-accent',
  output: 'border-line-strong bg-bg-elevated text-fg',
};

interface FlowDiagramProps {
  nodes: readonly FlowNode[];
  /** Used to build the diagram's accessible description. */
  title: string;
  className?: string;
}

/**
 * Small architecture flow, e.g. Shopify → HMAC verify → Queue → MongoDB.
 *
 * Built from styled divs so it reflows naturally: a horizontal chain on wider
 * screens, a vertical one on phones. The whole diagram is announced to
 * assistive tech as one sentence rather than a pile of loose labels.
 */
export function FlowDiagram({ nodes, title, className }: FlowDiagramProps) {
  const spoken = nodes.map((node) => node.label).join(' then ');

  return (
    <figure
      className={cn(
        'rounded-lg border border-line bg-bg-elevated/60 px-3 py-3.5',
        className,
      )}
    >
      <figcaption className="sr-only">
        {`Architecture flow for ${title}: ${spoken}.`}
      </figcaption>

      <div
        aria-hidden="true"
        className="flex flex-col items-stretch gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-y-2"
      >
        {nodes.map((node, i) => (
          <Fragment key={node.label}>
            <span
              className={cn(
                'rounded-md border px-2 py-1.5 text-center font-mono text-[10.5px] leading-tight whitespace-nowrap',
                KIND_STYLES[node.kind ?? 'process'],
              )}
            >
              {node.label}
            </span>

            {i < nodes.length - 1 ? (
              <span className="flex shrink-0 justify-center py-0.5 sm:px-1.5 sm:py-0">
                <ArrowRight className="h-3 w-3 rotate-90 text-fg-subtle sm:rotate-0" />
              </span>
            ) : null}
          </Fragment>
        ))}
      </div>
    </figure>
  );
}
