import type { IServicesList } from "@/types/Service";
import type { ISettingsState } from "@/features/Settings/types/Settings";
import { DEFAULT_SETTINGS } from "@/features/Settings/types/Settings";
import { loadUserSearchEngines, saveUserSearchEngines } from "@/features/Settings/utils/searchEngineStorage";
import { invalidateServicesCache } from '@/CommandPalette/utils/ServicesList/servicesStore';
import { saveUserServices } from "@/features/Settings/utils/servicesStorage";
import { useAppearanceStore } from "./appearanceStore";
import { useClockSettingsStore } from "./clockSettingsStore";
import { useDateSettingsStore } from "./dateSettingsStore";
import { useSearchSettingsStore } from "./searchSettingsStore";
import { useAccentSettingsStore } from "./accentSettingsStore";
import { loadFromStorage, saveToStorage, applyStartupProfile, applyThemeToDOM, applyAccentToDOM, applyGlassToDOM } from "./shared";

/**
 * Batch-update flag to prevent redundant persistence during multi-store operations.
 * When > 0, subscribe callbacks skip `saveToStorage` — the caller is responsible
 * for persisting once after the batch completes.
 */
let _batchDepth = 0;

export const getFullSettings = (): ISettingsState => {
  const a = useAppearanceStore.getState();
  const c = useClockSettingsStore.getState();
  const d = useDateSettingsStore.getState();
  const s = useSearchSettingsStore.getState();
  const ac = useAccentSettingsStore.getState();
  return {
    theme: a.theme,
    accentColor: a.accentColor,
    glassIntensity: a.glassIntensity,
    background: a.background,
    clock: c.clock,
    date: d.date,
    searchEngine: s.searchEngine,
    userSearchEngines: s.userSearchEngines,
    accentOnClockText: ac.accentOnClockText,
    accentOnClockSep: ac.accentOnClockSep,
    accentOnDate: ac.accentOnDate,
    accentOnIcons: ac.accentOnIcons,
    accentOnTabs: ac.accentOnTabs,
    accentOnToggles: ac.accentOnToggles,
    accentOnSlider: ac.accentOnSlider,
    accentOnCaret: ac.accentOnCaret,
    accentOnFocusRing: ac.accentOnFocusRing,
    accentOnScrollbar: ac.accentOnScrollbar,
    accentOnGlassBorder: ac.accentOnGlassBorder,
    accentOnButtonBorder: ac.accentOnButtonBorder,
  };
};

/** Restore all sub-stores from a full settings snapshot — used by Profile load. */
export const loadProfile = (settings: typeof DEFAULT_SETTINGS, services?: IServicesList) => {
  _batchDepth++;

  applyThemeToDOM(settings.theme);
  applyAccentToDOM(settings.accentColor);
  applyGlassToDOM(settings.glassIntensity);

  /**
   * Only persist search engines / services if the profile actually has them.
   * This prevents loading a profile that was saved without custom search engines
   * or services from wiping out user data — consistent behavior for both.
   */
  const userSearchEngines = settings.userSearchEngines ?? {};
  if (Object.keys(userSearchEngines).length > 0) {
    saveUserSearchEngines(userSearchEngines);
  }

  if (services && Object.keys(services).length > 0) {
    saveUserServices(services);
    invalidateServicesCache();
  }

  useAppearanceStore.setState({
    theme: settings.theme,
    accentColor: settings.accentColor,
    glassIntensity: settings.glassIntensity,
    background: settings.background,
  });
  useClockSettingsStore.setState({ clock: settings.clock });
  useDateSettingsStore.setState({ date: settings.date });
  useSearchSettingsStore.setState({ searchEngine: settings.searchEngine, userSearchEngines });
  useAccentSettingsStore.setState({
    accentOnClockText: settings.accentOnClockText,
    accentOnClockSep: settings.accentOnClockSep,
    accentOnDate: settings.accentOnDate,
    accentOnIcons: settings.accentOnIcons,
    accentOnTabs: settings.accentOnTabs,
    accentOnToggles: settings.accentOnToggles,
    accentOnSlider: settings.accentOnSlider,
    accentOnCaret: settings.accentOnCaret,
    accentOnFocusRing: settings.accentOnFocusRing,
    accentOnScrollbar: settings.accentOnScrollbar,
    accentOnGlassBorder: settings.accentOnGlassBorder,
    accentOnButtonBorder: settings.accentOnButtonBorder,
  });

  _batchDepth--;
  if (_batchDepth === 0) saveToStorage(getFullSettings());
};

/** Reset all sub-stores to DEFAULT_SETTINGS — preserves userSearchEngines. */
export const resetAllSettings = () => {
  _batchDepth++;

  const { userSearchEngines } = useSearchSettingsStore.getState();

  applyThemeToDOM(DEFAULT_SETTINGS.theme);
  applyAccentToDOM(DEFAULT_SETTINGS.accentColor);
  applyGlassToDOM(DEFAULT_SETTINGS.glassIntensity);

  useAppearanceStore.setState({
    theme: DEFAULT_SETTINGS.theme,
    accentColor: DEFAULT_SETTINGS.accentColor,
    glassIntensity: DEFAULT_SETTINGS.glassIntensity,
    background: DEFAULT_SETTINGS.background,
  });
  useClockSettingsStore.setState({ clock: DEFAULT_SETTINGS.clock });
  useDateSettingsStore.setState({ date: DEFAULT_SETTINGS.date });
  useSearchSettingsStore.setState({
    searchEngine: DEFAULT_SETTINGS.searchEngine,
    userSearchEngines,
  });
  useAccentSettingsStore.setState({
    accentOnClockText: DEFAULT_SETTINGS.accentOnClockText,
    accentOnClockSep: DEFAULT_SETTINGS.accentOnClockSep,
    accentOnDate: DEFAULT_SETTINGS.accentOnDate,
    accentOnIcons: DEFAULT_SETTINGS.accentOnIcons,
    accentOnTabs: DEFAULT_SETTINGS.accentOnTabs,
    accentOnToggles: DEFAULT_SETTINGS.accentOnToggles,
    accentOnSlider: DEFAULT_SETTINGS.accentOnSlider,
    accentOnCaret: DEFAULT_SETTINGS.accentOnCaret,
    accentOnFocusRing: DEFAULT_SETTINGS.accentOnFocusRing,
    accentOnScrollbar: DEFAULT_SETTINGS.accentOnScrollbar,
    accentOnGlassBorder: DEFAULT_SETTINGS.accentOnGlassBorder,
    accentOnButtonBorder: DEFAULT_SETTINGS.accentOnButtonBorder,
  });

  _batchDepth--;
  if (_batchDepth === 0) saveToStorage(getFullSettings());
};

// ── Bootstrap: load saved state → apply startup profile → init all sub-stores ──

const saved = applyStartupProfile(loadFromStorage());
const userSearchEngines = loadUserSearchEngines();

const bootState = { ...saved, userSearchEngines };

useAppearanceStore.setState({
  theme: bootState.theme,
  accentColor: bootState.accentColor,
  glassIntensity: bootState.glassIntensity,
  background: bootState.background,
});
useClockSettingsStore.setState({ clock: bootState.clock });
useDateSettingsStore.setState({ date: bootState.date });
useSearchSettingsStore.setState({
  searchEngine: bootState.searchEngine,
  userSearchEngines: bootState.userSearchEngines,
});
useAccentSettingsStore.setState({
  accentOnClockText: bootState.accentOnClockText,
  accentOnClockSep: bootState.accentOnClockSep,
  accentOnDate: bootState.accentOnDate,
  accentOnIcons: bootState.accentOnIcons,
  accentOnTabs: bootState.accentOnTabs,
  accentOnToggles: bootState.accentOnToggles,
  accentOnSlider: bootState.accentOnSlider,
  accentOnCaret: bootState.accentOnCaret,
  accentOnFocusRing: bootState.accentOnFocusRing,
  accentOnScrollbar: bootState.accentOnScrollbar,
  accentOnGlassBorder: bootState.accentOnGlassBorder,
  accentOnButtonBorder: bootState.accentOnButtonBorder,
});

applyThemeToDOM(bootState.theme);
applyAccentToDOM(bootState.accentColor);
applyGlassToDOM(bootState.glassIntensity);

// ── Auto-persist: subscribe each sub-store → save combined state ──
// During batch updates (loadProfile / resetAllSettings), persistence is
// deferred and handled once at the end by the caller.

const persist = () => {
  if (_batchDepth > 0) return; // defer — caller saves once
  saveToStorage(getFullSettings());
};

useAppearanceStore.subscribe(persist);
useClockSettingsStore.subscribe(persist);
useDateSettingsStore.subscribe(persist);
useSearchSettingsStore.subscribe(persist);
useAccentSettingsStore.subscribe(persist);
