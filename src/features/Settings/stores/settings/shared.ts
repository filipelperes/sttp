import type { ThemeMode, GlassIntensity } from "@/features/Settings/types/Settings";
import { DEFAULT_SETTINGS } from "@/features/Settings/types/Settings";
import { loadStartupProfileSettings } from "@/features/Settings/utils/profileStorage";
import { saveUserSearchEngines } from "@/features/Settings/utils/searchEngineStorage";
import { invalidateServicesCache } from '@/CommandPalette/utils/ServicesList/servicesStore';
import { saveUserServices } from "@/features/Settings/utils/servicesStorage";

export const STORAGE_KEY = "sttp-settings";

export const loadFromStorage = (): typeof DEFAULT_SETTINGS => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...DEFAULT_SETTINGS,
        ...parsed,
        clock: { ...DEFAULT_SETTINGS.clock, ...(parsed.clock || {}) },
        date: { ...DEFAULT_SETTINGS.date, ...(parsed.date || {}) },
        background: { ...DEFAULT_SETTINGS.background, ...(parsed.background || {}) },
      };
    }
  } catch {
    // ignore parse errors
  }
  return DEFAULT_SETTINGS;
};

export const saveToStorage = (state: typeof DEFAULT_SETTINGS) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
};

export const applyStartupProfile = (base: typeof DEFAULT_SETTINGS): typeof DEFAULT_SETTINGS => {
  const startup = loadStartupProfileSettings();
  if (startup) {
    const s = startup.settings;
    if (startup.services) {
      saveUserServices(startup.services);
      invalidateServicesCache();
    }
    const startupSearchEngines = s.userSearchEngines ?? {};
    if (Object.keys(startupSearchEngines).length > 0) {
      saveUserSearchEngines(startupSearchEngines);
    }
    return {
      ...base,
      ...s,
      clock: { ...base.clock, ...(s.clock ?? {}) },
      date: { ...base.date, ...(s.date ?? {}) },
      background: { ...base.background, ...(s.background ?? {}) },
    };
  }
  return base;
};

export const applyThemeToDOM = (theme: ThemeMode) => {
  document.documentElement.classList.toggle("light", theme === "light");
};

export const applyAccentToDOM = (color: string) => {
  document.documentElement.style.setProperty("--color-accent", color);
  document.documentElement.style.setProperty("--color-ring", color);
};

export const applyGlassToDOM = (intensity: GlassIntensity) => {
  const vars: Record<GlassIntensity, { bg: string; blur: string }> = {
    light: { bg: "rgba(255, 255, 255, 0.02)", blur: "12px" },
    medium: { bg: "rgba(255, 255, 255, 0.04)", blur: "24px" },
    strong: { bg: "rgba(255, 255, 255, 0.08)", blur: "32px" },
  };
  const { bg, blur } = vars[intensity];
  document.documentElement.style.setProperty("--glass-bg", bg);
  document.documentElement.style.setProperty("--glass-blur", blur);
};
