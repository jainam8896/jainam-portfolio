import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Adds a subtle lift + accent border on hover. */
  interactive?: boolean;
  as?: 'div' | 'article' | 'li';
}

export function Card({
  children,
  className,
  interactive = false,
  as: Tag = 'div',
}: CardProps) {
  return (
    <Tag
      className={cn(
        'rounded-xl border border-line bg-surface',
        interactive &&
          'transition-[border-color,background-color,transform,box-shadow] duration-300 ' +
            'hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
