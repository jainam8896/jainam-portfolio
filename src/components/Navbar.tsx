import { useEffect, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { FileText, Menu, X } from 'lucide-react';
import { navLinks, site } from '@/data/portfolio';
import { useActiveSection } from '@/hooks/useActiveSection';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/** Stable reference so the IntersectionObserver is not rebuilt each render. */
const SECTION_IDS = navLinks.map((link) => link.id);

export function Navbar() {
  const active = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu on Escape, and lock background scroll while open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    const previousOverflow = document.body.style.overflow;

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || menuOpen
          ? 'border-b border-line bg-bg/85 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        {/* Wordmark */}
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2.5 rounded-md font-mono text-sm font-semibold tracking-tight text-fg"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/40 bg-accent-soft text-accent transition-colors duration-200 group-hover:border-accent/70">
            {site.shortName}
          </span>
          <span className="hidden sm:inline">
            {site.name.toLowerCase().replace(' ', '')}
            <span className="text-accent">.dev</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link, i) => {
            const isActive = active === link.id;
            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative flex items-baseline gap-1.5 rounded-md px-3 py-2 text-sm transition-colors duration-200',
                    isActive
                      ? 'text-fg'
                      : 'text-fg-muted hover:bg-surface-hover hover:text-fg',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'font-mono text-[10px] transition-colors duration-200',
                      isActive ? 'text-accent' : 'text-fg-subtle',
                    )}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                  {/* Active underline: a CSS transform rather than a layout
                      animation, so it stays cheap and needs no extra features. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-2 -bottom-px h-px origin-left bg-accent transition-transform duration-300',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle />

          <ButtonLink
            href={site.resumePath}
            download
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <FileText className="h-4 w-4" aria-hidden="true" />
            Resume
          </ButtonLink>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-fg-muted transition-colors duration-200 hover:text-fg md:hidden"
          >
            {menuOpen ? (
              <X className="h-[18px] w-[18px]" aria-hidden="true" />
            ) : (
              <Menu className="h-[18px] w-[18px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen ? (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-bg/95 backdrop-blur-md md:hidden"
          >
            <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
              {navLinks.map((link, i) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={cn(
                      'flex items-baseline gap-3 rounded-lg px-2 py-3 text-[15px] transition-colors duration-200',
                      active === link.id
                        ? 'text-accent'
                        : 'text-fg-muted hover:text-fg',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className="font-mono text-[11px] text-fg-subtle"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-line pt-3 pb-1">
                <ButtonLink
                  href={site.resumePath}
                  download
                  onClick={() => setMenuOpen(false)}
                  className="w-full"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Download Resume
                </ButtonLink>
              </li>
            </ul>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
