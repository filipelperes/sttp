import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ISettingsStore, ThemeMode, GlassIntensity, IClockSettings } from "@/features/Settings/types/Settings";
import { DEFAULT_SETTINGS } from "@/features/Settings/types/Settings";

const STORAGE_KEY = 'sttp-settings';

const loadFromStorage = (): typeof DEFAULT_SETTINGS => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults so new fields get default values
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

const saveToStorage = (state: typeof DEFAULT_SETTINGS) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage errors
  }
};

const applyThemeToDOM = (theme: ThemeMode) => {
  document.documentElement.classList.remove('light', 'dark');
  if (theme === 'light') {
    document.documentElement.classList.add('light');
  }
};

const applyGlassToDOM = (intensity: GlassIntensity) => {
  const vars: Record<GlassIntensity, { bg: string; blur: string }> = {
    light: { bg: 'rgba(255, 255, 255, 0.02)', blur: '12px' },
    medium: { bg: 'rgba(255, 255, 255, 0.04)', blur: '24px' },
    strong: { bg: 'rgba(255, 255, 255, 0.08)', blur: '32px' },
  };
  const { bg, blur } = vars[intensity];
  document.documentElement.style.setProperty('--glass-bg', bg);
  document.documentElement.style.setProperty('--glass-blur', blur);
};

const initial = loadFromStorage();

// Apply saved settings on load
applyThemeToDOM(initial.theme);
applyGlassToDOM(initial.glassIntensity);

const useSettingsStore = create<ISettingsStore>()(
  devtools(
    (set) => ({
      ...initial,

      setTheme: (theme) => {
        applyThemeToDOM(theme);
        set({ theme });
        saveToStorage({ ...useSettingsStore.getState(), theme });
      },

      setGlassIntensity: (glassIntensity) => {
        applyGlassToDOM(glassIntensity);
        set({ glassIntensity });
        saveToStorage({ ...useSettingsStore.getState(), glassIntensity });
      },

      updateClock: (partial) => {
        set((state) => {
          const clock = { ...state.clock, ...partial } as IClockSettings;
          const newState = { ...state, clock };
          saveToStorage(newState);
          return { clock };
        });
      },

      updateDate: (partial) => {
        set((state) => {
          const date = { ...state.date, ...partial };
          const newState = { ...state, date };
          saveToStorage(newState);
          return { date };
        });
      },

      updateBackground: (partial) => {
        set((state) => {
          const background = { ...state.background, ...partial };
          const newState = { ...state, background };
          saveToStorage(newState);
          return { background };
        });
      },

      resetAll: () => {
        applyThemeToDOM(DEFAULT_SETTINGS.theme);
        applyGlassToDOM(DEFAULT_SETTINGS.glassIntensity);
        set(DEFAULT_SETTINGS);
        saveToStorage(DEFAULT_SETTINGS);
      },
    }),
    { name: 'SettingsStore' },
  )
);

export default useSettingsStore;
