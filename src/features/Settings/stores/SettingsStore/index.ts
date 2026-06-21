import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { ISettingsStore, ThemeMode, GlassIntensity, IClockSettings } from "@/features/Settings/types/Settings";
import { DEFAULT_SETTINGS } from "@/features/Settings/types/Settings";
import { loadUserSearchEngines, saveUserSearchEngines } from "@/features/Settings/utils/searchEngineStorage";
import { saveUserServices } from "@/features/Settings/utils/servicesStorage";
import { loadStartupProfileSettings } from "@/features/Settings/utils/profileStorage";

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

/** Apply startup profile on top of loaded settings if one is configured. */
const applyStartupProfile = (base: typeof DEFAULT_SETTINGS): typeof DEFAULT_SETTINGS => {
  const startup = loadStartupProfileSettings();
  if (startup) {
    const s = startup.settings;
    // Restore services from the profile if present
    if (startup.services) {
      saveUserServices(startup.services);
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

const applyAccentToDOM = (color: string) => {
  document.documentElement.style.setProperty('--color-accent', color);
  document.documentElement.style.setProperty('--color-ring', color);
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

const initial = {
  ...applyStartupProfile(loadFromStorage()),
  userSearchEngines: loadUserSearchEngines(),
};

// Apply saved settings on load
applyThemeToDOM(initial.theme);
applyAccentToDOM(initial.accentColor);
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

      setAccentColor: (accentColor) => {
        applyAccentToDOM(accentColor);
        set({ accentColor });
        saveToStorage({ ...useSettingsStore.getState(), accentColor });
      },

      setSearchEngine: (searchEngine) => {
        set({ searchEngine });
        saveToStorage({ ...useSettingsStore.getState(), searchEngine });
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

      setUserSearchEngines: (userSearchEngines) => {
        saveUserSearchEngines(userSearchEngines);
        set({ userSearchEngines });
      },

      setAccentOnClockSep: (accentOnClockSep) => {
        set({ accentOnClockSep });
        saveToStorage({ ...useSettingsStore.getState(), accentOnClockSep });
      },

      setAccentOnDate: (accentOnDate) => {
        set({ accentOnDate });
        saveToStorage({ ...useSettingsStore.getState(), accentOnDate });
      },

      setAccentOnIcons: (accentOnIcons) => {
        set({ accentOnIcons });
        saveToStorage({ ...useSettingsStore.getState(), accentOnIcons });
      },

      setAccentOnClockText: (v) => {
        set({ accentOnClockText: v });
        saveToStorage({ ...useSettingsStore.getState(), accentOnClockText: v });
      },
      setAccentOnTabs: (v) => {
        set({ accentOnTabs: v });
        saveToStorage({ ...useSettingsStore.getState(), accentOnTabs: v });
      },
      setAccentOnToggles: (v) => {
        set({ accentOnToggles: v });
        saveToStorage({ ...useSettingsStore.getState(), accentOnToggles: v });
      },
      setAccentOnSlider: (v) => {
        set({ accentOnSlider: v });
        saveToStorage({ ...useSettingsStore.getState(), accentOnSlider: v });
      },
      setAccentOnCaret: (v) => {
        set({ accentOnCaret: v });
        saveToStorage({ ...useSettingsStore.getState(), accentOnCaret: v });
      },
      setAccentOnFocusRing: (v) => {
        set({ accentOnFocusRing: v });
        saveToStorage({ ...useSettingsStore.getState(), accentOnFocusRing: v });
      },
      setAccentOnScrollbar: (v) => {
        set({ accentOnScrollbar: v });
        saveToStorage({ ...useSettingsStore.getState(), accentOnScrollbar: v });
      },
      setAccentOnGlassBorder: (v) => {
        set({ accentOnGlassBorder: v });
        saveToStorage({ ...useSettingsStore.getState(), accentOnGlassBorder: v });
      },
      setAccentOnButtonBorder: (v) => {
        set({ accentOnButtonBorder: v });
        saveToStorage({ ...useSettingsStore.getState(), accentOnButtonBorder: v });
      },

      loadProfile: (profileSettings, services) => {
        applyThemeToDOM(profileSettings.theme);
        applyAccentToDOM(profileSettings.accentColor);
        applyGlassToDOM(profileSettings.glassIntensity);
        // Restore user search engines from the profile
        const userSearchEngines = profileSettings.userSearchEngines ?? {};
        saveUserSearchEngines(userSearchEngines);
        // Restore user-defined services from the profile if present
        if (services) {
          saveUserServices(services);
        }
        const newState = { ...DEFAULT_SETTINGS, ...profileSettings, userSearchEngines };
        set(newState);
        saveToStorage(newState);
      },

      resetAll: () => {
        const { userSearchEngines } = useSettingsStore.getState();
        applyThemeToDOM(DEFAULT_SETTINGS.theme);
        applyAccentToDOM(DEFAULT_SETTINGS.accentColor);
        applyGlassToDOM(DEFAULT_SETTINGS.glassIntensity);
        const resetState = { ...DEFAULT_SETTINGS, userSearchEngines };
        set(resetState);
        saveToStorage(resetState);
      },
    }),
    { name: 'SettingsStore' },
  )
);

export default useSettingsStore;
