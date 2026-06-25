import { useCallback, useEffect } from 'react';
import { useAppearanceStore } from '@/features/Settings/stores/settings';
import type { ThemeMode } from '@/features/Settings/types/Settings';

/**
 * Applies the current theme to the DOM by toggling the `.light` class on <html>.
 *
 * Dark mode is the default — no class is added.
 * Light mode adds the `.light` class, which Tailwind's `@custom-variant light`
 * uses to activate `light:*` utility variants.
 */
function applyTheme(theme: ThemeMode): void {
  document.documentElement.classList.toggle('light', theme === 'light');
}

/**
 * Self-contained hook for theme state and DOM sync.
 *
 * Reading: gets `theme` from Zustand SettingsStore (single source of truth).
 * Writing: calls `setTheme` on the store, which persists to localStorage.
 * DOM sync: applies the `.light` class to <html> whenever the theme changes.
 *
 * Exposes `toggleTheme` for simple toggle buttons.
 *
 * @example
 * ```tsx
 * const { theme, toggleTheme, setTheme } = useTheme();
 * ```
 */
export function useTheme() {
  const theme = useAppearanceStore((s) => s.theme);
  const setTheme = useAppearanceStore((s) => s.setTheme);

  // Sync DOM whenever theme changes (on mount and on every change)
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    // Read current theme from store directly to avoid stale closure dependency
    const currentTheme = useAppearanceStore.getState().theme;
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return { theme, toggleTheme, setTheme } as const;
}

export type { ThemeMode as Theme } from '@/features/Settings/types/Settings';
