import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { contact, site } from '@/data/portfolio';

const links = [
  { label: 'LinkedIn', href: contact.linkedin, icon: Linkedin, external: true },
  ...(contact.github
    ? [{ label: 'GitHub', href: contact.github, icon: Github, external: true }]
    : []),
  {
    label: 'Email',
    href: `mailto:${contact.email}`,
    icon: Mail,
    external: false,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-sm font-semibold text-fg">{site.name}</p>
          <p className="mt-1.5 text-xs text-fg-subtle">
            © {new Date().getFullYear()} · Built with React, TypeScript and
            Tailwind CSS
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ul className="flex items-center gap-2" aria-label="Social links">
            {links.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(external
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#top"
            aria-label="Back to top"
            title="Back to top"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
