import { about } from '@/data/portfolio';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Tilt } from '@/components/ui/Tilt';

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        id="about"
        eyebrow="/about"
        title="Close to production, by choice"
      />

      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="space-y-5">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <p className="text-[15px] leading-[1.75] text-fg-muted sm:text-base">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Quick stats — each card gets its own staggered 3D reveal. */}
        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {about.stats.map((stat, i) => (
            <Reveal
              as="li"
              key={stat.label}
              delay={0.08 + i * 0.07}
              variant="depth"
              className="h-full"
            >
              <Tilt max={8}>
                <Card interactive className="flex h-full flex-col p-4 sm:p-5">
                  <p className="font-mono text-2xl font-bold tracking-tight text-accent sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-fg">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-fg-subtle">
                    {stat.detail}
                  </p>
                </Card>
              </Tilt>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
