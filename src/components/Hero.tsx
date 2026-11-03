import { ArrowDown, Download, Github, Linkedin, Mail } from 'lucide-react';
import { contact, site } from '@/data/portfolio';
import { Terminal } from '@/components/ui/Terminal';
import { ScrollDepth } from '@/components/ui/ScrollDepth';
import { ButtonLink } from '@/components/ui/Button';

const socialLinks = [
  {
    label: 'LinkedIn',
    href: contact.linkedin,
    icon: Linkedin,
    external: true,
  },
  // The GitHub link only appears once a URL is set in portfolio.ts.
  ...(contact.github
    ? [
        {
          label: 'GitHub',
          href: contact.github,
          icon: Github,
          external: true,
        },
      ]
    : []),
  {
    label: 'Email',
    href: `mailto:${contact.email}`,
    icon: Mail,
    external: false,
  },
];

/**
 * Staggered entrance, in CSS so it runs at first paint rather than waiting for
 * the animation library.
 *
 * Note what does NOT use it: the headline, tagline and pitch. Those are the
 * page's LCP candidates, and an element fading up from opacity 0 is not
 * counted as painted until the fade starts — so animating them would delay the
 * one thing a recruiter should read immediately.
 */
function rise(step: number) {
  return { animationDelay: `${step * 70}ms` };
}

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative isolate overflow-hidden"
    >
      {/* Faint engineering grid + accent glow */}
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="hero-glow absolute inset-x-0 top-0 -z-10 h-[520px]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-28 pb-16 sm:px-8 sm:pt-32 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-36 lg:pb-24">
        <div>
          {site.openToWork ? (
            <p
              style={rise(0)}
              className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1.5 font-mono text-[11px] tracking-wide text-accent"
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-pulse-dot rounded-full bg-accent" />
              </span>
              Open to opportunities
            </p>
          ) : null}

          <h1 className="text-[2.6rem] leading-[1.05] font-bold tracking-tight text-fg sm:text-6xl lg:text-[4.1rem]">
            {site.name}
          </h1>

          <p className="mt-4 font-mono text-sm text-accent sm:text-base">
            {site.tagline}
          </p>

          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-fg-muted sm:text-lg">
            {site.pitch}
          </p>

          {/* CTAs */}
          <div
            style={rise(4)}
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="#work" variant="primary">
              View Work
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href={site.resumePath} download variant="secondary">
              <Download className="h-4 w-4" aria-hidden="true" />
              Download Resume
            </ButtonLink>
            <ButtonLink href="#contact" variant="ghost">
              Contact
            </ButtonLink>
          </div>

          {/* Socials */}
          <ul
            style={rise(5)}
            className="animate-rise mt-8 flex flex-wrap items-center gap-2"
            aria-label="Social links"
          >
            {socialLinks.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted transition-[color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </li>
            ))}
            <li className="ml-2 font-mono text-xs text-fg-subtle">
              {site.location}
            </li>
          </ul>
        </div>

        <ScrollDepth
          className="animate-rise lg:pl-4"
          style={rise(3)}
          rotate={10}
          lift={70}
        >
          <Terminal />
          <p className="mt-3 pl-1 font-mono text-[11px] text-fg-subtle">
            {'// the short version, as JSON'}
          </p>
        </ScrollDepth>
      </div>

      {/* Scroll hint */}
      <div className="mx-auto hidden max-w-6xl px-5 pb-10 sm:px-8 lg:block">
        <a
          href="#about"
          className="inline-flex items-center gap-2 font-mono text-xs text-fg-subtle transition-colors duration-200 hover:text-accent"
        >
          <ArrowDown
            className="h-3.5 w-3.5 animate-bounce"
            aria-hidden="true"
          />
          scroll
        </a>
      </div>
    </section>
  );
}
