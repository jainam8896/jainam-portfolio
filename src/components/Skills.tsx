import { skillGroups } from '@/data/portfolio';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { Tilt } from '@/components/ui/Tilt';

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        eyebrow="/skills"
        title="The toolbox"
        description="What I reach for day to day, grouped by the job it does."
      />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => {
          const Icon = group.icon;
          return (
            <Reveal
              as="li"
              key={group.id}
              delay={(i % 3) * 0.06}
              variant="depth"
              className="h-full"
            >
              <Tilt max={7}>
                <Card interactive className="h-full p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-elevated text-accent">
                      <Icon className="h-[17px] w-[17px]" aria-hidden="true" />
                    </span>
                    <h3 className="text-[15px] font-semibold text-fg">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-line bg-bg-elevated px-2 py-1 font-mono text-[11px] leading-none text-fg-muted transition-colors duration-200 hover:border-accent/50 hover:text-fg"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Tilt>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
