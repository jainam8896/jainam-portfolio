import { GraduationCap } from 'lucide-react';
import { education } from '@/data/portfolio';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Tilt } from '@/components/ui/Tilt';

export function Education() {
  return (
    <Section id="education">
      <SectionHeading id="education" eyebrow="/education" title="Education" />

      <ul className="grid gap-4 sm:grid-cols-2">
        {education.map((degree, i) => (
          <Reveal
            as="li"
            key={degree.short}
            delay={i * 0.06}
            variant="depth"
            className="h-full"
          >
            <Tilt max={6}>
              <Card interactive className="flex h-full gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-elevated text-accent">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <h3 className="text-[15px] font-semibold text-fg">
                      {degree.degree}
                    </h3>
                    <span className="rounded border border-line bg-bg-elevated px-1.5 py-0.5 font-mono text-[10px] text-fg-subtle">
                      {degree.short}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm text-fg-muted">
                    {degree.institution}
                  </p>
                  <p className="mt-2 font-mono text-xs text-fg-subtle">
                    {degree.start} — {degree.end}
                  </p>
                </div>
              </Card>
            </Tilt>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
