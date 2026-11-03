import { useState } from 'react';
import { Check, Copy, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { contact, site } from '@/data/portfolio';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card } from '@/components/ui/Card';
import { ButtonLink } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { copyToClipboard } from '@/lib/utils';

/* -------------------------------------------------------------------------- */

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    const ok = await copyToClipboard(value);
    if (!ok) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? `${label} copied` : `Copy ${label.toLowerCase()}`}
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-bg-elevated sm:h-9 sm:w-9 text-fg-subtle transition-colors duration-200 hover:border-accent/50 hover:text-accent"
    >
      {copied ? (
        <Check className="h-4 w-4 text-accent" aria-hidden="true" />
      ) : (
        <Copy className="h-4 w-4" aria-hidden="true" />
      )}
      <span aria-live="polite" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  );
}

/* -------------------------------------------------------------------------- */

const channels = [
  {
    label: 'Email',
    value: contact.email,
    href: `mailto:${contact.email}`,
    icon: Mail,
    copyable: true,
    external: false,
  },
  {
    label: 'Phone',
    value: contact.phone,
    href: `tel:${contact.phoneHref}`,
    icon: Phone,
    copyable: true,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/jainam-shah',
    href: contact.linkedin,
    icon: Linkedin,
    copyable: false,
    external: true,
  },
  // Shown only once a GitHub URL is filled in in portfolio.ts.
  ...(contact.github
    ? [
        {
          label: 'GitHub',
          value: contact.github.replace(/^https?:\/\/(www\.)?/, ''),
          href: contact.github,
          icon: Github,
          copyable: false,
          external: true,
        },
      ]
    : []),
];

/* -------------------------------------------------------------------------- */

export function Contact() {
  return (
    <Section id="contact">
      <SectionHeading
        id="contact"
        eyebrow="/contact"
        title="Let's talk"
        description={`${site.availability}. The fastest way to reach me is email — I reply to everything.`}
        className="mx-auto text-center"
      />

      <Reveal variant="depth" className="mx-auto w-full max-w-2xl">
        <Card className="px-4 py-6 sm:p-9">
          <h3 className="text-center font-mono text-xs tracking-widest text-fg-subtle uppercase">
            Direct
          </h3>

          <ul className="mt-7 divide-y divide-line border-y border-line">
            {channels.map(
              ({ label, value, href, icon: Icon, copyable, external }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 py-4 sm:gap-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 border border-line bg-bg-elevated text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10.5px] tracking-widest text-fg-subtle uppercase">
                      {label}
                    </span>
                    <a
                      href={href}
                      {...(external
                        ? { target: '_blank', rel: 'noreferrer noopener' }
                        : {})}
                      // Wraps rather than truncates: hiding half of a contact
                      // detail is worse than letting it run onto a second line.
                      className="block break-all text-sm text-fg transition-colors duration-200 hover:text-accent sm:text-base"
                    >
                      {value}
                    </a>
                  </span>

                  {copyable ? <CopyButton value={value} label={label} /> : null}
                </li>
              ),
            )}
          </ul>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <ButtonLink href={`mailto:${contact.email}`} variant="primary">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Email me
            </ButtonLink>
            <ButtonLink
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              variant="secondary"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
              Connect on LinkedIn
            </ButtonLink>
          </div>

          <p className="mt-7 text-center font-mono text-[11px] leading-relaxed text-fg-subtle">
            {`// based in ${site.location}`}
            <br />
            {'// open to remote and hybrid'}
          </p>
        </Card>
      </Reveal>
    </Section>
  );
}
