import { useCallback, useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';
const THEME_COLOR: Record<Theme, string> = {
  dark: '#080b0e',
  light: '#fbfbfa',
};

function readInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  // The inline script in index.html has already resolved this before paint,
  // so trust the DOM rather than re-deriving it (avoids a flash/mismatch).
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/**
 * Dark/light theme with `localStorage` persistence.
 * Dark is the default when the visitor has no stored preference.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;

    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute('content', THEME_COLOR[theme]);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* Private browsing / storage disabled — the theme still applies. */
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggleTheme } as const;
}
