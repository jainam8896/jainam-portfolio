import { caseStudies } from '@/data/portfolio';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { TagList } from '@/components/ui/Tag';
import { FlowDiagram } from '@/components/ui/FlowDiagram';
import { Reveal } from '@/components/ui/Reveal';
import { Tilt } from '@/components/ui/Tilt';

export function Work() {
  return (
    <Section id="work">
      <SectionHeading
        id="work"
        eyebrow="/work"
        title="Four systems, four problems"
        description="The work I would actually walk you through in an interview: what was broken, what I built, and what changed as a result."
      />

      <ul className="grid gap-5 lg:grid-cols-2 lg:gap-6">
        {caseStudies.map((study, i) => (
          <Reveal
            as="li"
            key={study.id}
            delay={(i % 2) * 0.07}
            variant="depth"
            className="h-full"
          >
            <Tilt max={5}>
              <Card
                interactive
                as="article"
                className="flex h-full flex-col gap-5 p-5 sm:p-6"
              >
                {/* Header */}
                <header>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xs text-fg-subtle">
                      {study.index}
                    </span>
                    <code className="truncate rounded border border-line bg-bg-elevated px-2 py-1 font-mono text-[10.5px] text-fg-subtle">
                      {study.endpoint}
                    </code>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-fg sm:text-xl">
                    {study.title}
                  </h3>
                </header>

                {/* Problem / build */}
                <div className="space-y-4">
                  <div>
                    <p className="mb-1.5 font-mono text-[10.5px] tracking-widest text-fg-subtle uppercase">
                      Problem
                    </p>
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {study.problem}
                    </p>
                  </div>
                  <div>
                    <p className="mb-1.5 font-mono text-[10.5px] tracking-widest text-fg-subtle uppercase">
                      What I built
                    </p>
                    <p className="text-sm leading-relaxed text-fg-muted">
                      {study.built}
                    </p>
                  </div>
                </div>

                {/* Architecture */}
                <FlowDiagram nodes={study.flow} title={study.title} />

                {/* Impact — pinned to the bottom so cards line up */}
                <div className="mt-auto space-y-5">
                  <dl className="grid grid-cols-3 gap-3 border-t border-line pt-4">
                    {study.impact.map((metric) => (
                      <div key={metric.label}>
                        <dt className="sr-only">{metric.label}</dt>
                        <dd>
                          <span className="block font-mono text-base font-bold text-accent sm:text-lg">
                            {metric.value}
                          </span>
                          <span className="mt-0.5 block text-[11px] leading-snug text-fg-subtle">
                            {metric.label}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <TagList
                    items={study.tech}
                    label={`Tech stack for ${study.title}`}
                  />
                </div>
              </Card>
            </Tilt>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
