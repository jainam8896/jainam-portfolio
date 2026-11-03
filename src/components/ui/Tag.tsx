import { cn } from '@/lib/utils';

interface TagProps {
  children: string;
  className?: string;
}

/** Monospace tech-stack chip. */
export function Tag({ children, className }: TagProps) {
  return (
    <li
      className={cn(
        'rounded-md border border-line bg-bg-elevated px-2 py-1 font-mono text-[11px] leading-none text-fg-muted',
        'transition-colors duration-200 hover:border-accent/50 hover:text-fg',
        className,
      )}
    >
      {children}
    </li>
  );
}

interface TagListProps {
  items: readonly string[];
  className?: string;
  /** Accessible label, e.g. "Tech stack for Flash-Sale Reservation System". */
  label: string;
}

export function TagList({ items, className, label }: TagListProps) {
  return (
    <ul
      aria-label={label}
      className={cn('flex flex-wrap items-center gap-1.5', className)}
    >
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </ul>
  );
}
