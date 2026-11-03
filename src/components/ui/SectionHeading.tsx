import { m } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  id: string;
  /** Monospace route-style eyebrow, e.g. `/experience`. */
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <m.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
      className={cn('mb-12 max-w-2xl sm:mb-14', className)}
    >
      <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">
        <span aria-hidden="true" className="text-fg-subtle">
          {'// '}
        </span>
        {eyebrow}
      </p>
      <h2
        id={`${id}-heading`}
        className="text-3xl font-bold text-fg sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-fg-muted sm:text-lg">
          {description}
        </p>
      ) : null}
    </m.div>
  );
}
