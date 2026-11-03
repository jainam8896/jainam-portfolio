import { MapPin } from 'lucide-react';
import { jobs } from '@/data/portfolio';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TagList } from '@/components/ui/Tag';
import { Reveal } from '@/components/ui/Reveal';

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeading
        id="experience"
        eyebrow="/experience"
        title="Where I've shipped"
        description="Two and a half years of backend work, from an eCommerce internship to owning commerce-critical systems."
      />

      <ol className="relative">
        {/* The timeline spine */}
        <span
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[5px] w-px bg-line sm:left-[7px]"
        />

        {jobs.map((job, i) => (
          <Reveal
            as="li"
            key={job.id}
            delay={i * 0.05}
            className="relative pb-12 pl-7 last:pb-0 sm:pl-10"
          >
            {/* Node */}
            <span
              aria-hidden="true"
              className={
                'absolute top-1.5 left-0 flex h-[11px] w-[11px] items-center justify-center rounded-full border-2 sm:h-[15px] sm:w-[15px] ' +
                (job.current
                  ? 'border-accent bg-accent'
                  : 'border-line-strong bg-bg')
              }
            >
              {job.current ? (
                <span className="absolute h-full w-full animate-pulse-dot rounded-full bg-accent/50" />
              ) : null}
            </span>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-lg font-semibold text-fg sm:text-xl">
                {job.role}
              </h3>
              <span aria-hidden="true" className="text-fg-subtle">
                ·
              </span>
              <p className="text-base font-medium text-accent sm:text-lg">
                {job.company}
              </p>
              {job.current ? (
                <span className="rounded-full border border-accent/30 bg-accent-soft px-2 py-0.5 font-mono text-[10px] tracking-wide text-accent uppercase">
                  current
                </span>
              ) : null}
            </div>

            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-fg-subtle">
              <span>
                {job.start} — {job.end}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3 w-3" aria-hidden="true" />
                {job.location}
              </span>
            </p>

            <p className="mt-4 text-sm leading-relaxed text-fg-muted sm:text-[15px]">
              {job.summary}
            </p>

            <ul className="mt-4 space-y-2.5">
              {job.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent/70"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <TagList
              items={job.tech}
              label={`Technologies used at ${job.company}`}
              className="mt-5"
            />
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
