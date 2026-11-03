import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  /** Accessible name for the landmark, used when there is no visible heading. */
  label?: string;
}

/** Semantic section landmark with the site's shared horizontal rhythm. */
export function Section({ id, children, className, label }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={label ? undefined : `${id}-heading`}
      aria-label={label}
      className={cn(
        'mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:py-28',
        className,
      )}
    >
      {children}
    </section>
  );
}
