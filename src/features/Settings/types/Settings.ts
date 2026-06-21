import type { IServicesList } from "@/types/Service";

export type ThemeMode = 'dark' | 'light';

export type HourCycle = 'h23' | 'h12';

export type DateFormatStyle = 'full' | 'long' | 'medium' | 'short';

export type GlassIntensity = 'light' | 'medium' | 'strong';

export type SearchEngineId = 'google' | 'duckduckgo' | 'bing' | 'brave' | 'yahoo' | 'ecosia' | 'startpage';

export interface ISearchEngine {
  id: SearchEngineId;
  label: string;
  url: string; // search query template, %s will be replaced with the query
  icon: string;
}

export type IUserSearchEngineIcon = {
  type: 'emoji' | 'img';
  value: string;
};

export interface IUserSearchEngine {
  id: string;
  label: string;
  url: string; // search query template with %s
  icon: IUserSearchEngineIcon; // emoji or image
}

export const SEARCH_ENGINES: ISearchEngine[] = [
  { id: 'google', label: 'Google', url: 'https://google.com/search?q=%s', icon: '🔍' },
  { id: 'duckduckgo', label: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=%s', icon: '🦆' },
  { id: 'bing', label: 'Bing', url: 'https://bing.com/search?q=%s', icon: '📘' },
  { id: 'brave', label: 'Brave', url: 'https://search.brave.com/search?q=%s', icon: '🦁' },
  { id: 'yahoo', label: 'Yahoo', url: 'https://search.yahoo.com/search?p=%s', icon: '📰' },
  { id: 'ecosia', label: 'Ecosia', url: 'https://ecosia.org/search?q=%s', icon: '🌳' },
  { id: 'startpage', label: 'Startpage', url: 'https://startpage.com/do/dsearch?query=%s', icon: '🔒' },
] as const;

export interface IClockSettings {
  hourCycle: HourCycle;
  showSeconds: boolean;
  hideWhenTyping: boolean;
  fontSize: number; // 3.0 - 8.0 rem
}

export interface IDateSettings {
  locale: string;
  formatStyle: DateFormatStyle;
  showDayOfWeek: boolean;
  showYear: boolean;
  capitalize: boolean;
  fontSize: number; // 0.5 - 3.0 rem
}

export interface IBackgroundSettings {
  dim: number; // 0-100, dim level when palette is open
}

export const ACCENT_COLORS = [
  { value: '#7c3aed', label: 'Purple' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#06b6d4', label: 'Cyan' },
  { value: '#10b981', label: 'Emerald' },
  { value: '#84cc16', label: 'Lime' },
  { value: '#eab308', label: 'Yellow' },
  { value: '#f97316', label: 'Orange' },
  { value: '#ef4444', label: 'Red' },
  { value: '#ec4899', label: 'Pink' },
  { value: '#a855f7', label: 'Violet' },
] as const;

export const DEFAULT_ACCENT = '#7c3aed';

export interface ISettingsState {
  theme: ThemeMode;
  accentColor: string;
  searchEngine: string;
  glassIntensity: GlassIntensity;
  clock: IClockSettings;
  date: IDateSettings;
  background: IBackgroundSettings;
  userSearchEngines: Record<string, IUserSearchEngine>;

  // ── Accent toggles (12 targets) ──
  accentOnClockText: boolean;    // entire clock digits
  accentOnClockSep: boolean;     // colon separator (:)
  accentOnDate: boolean;         // date text
  accentOnIcons: boolean;        // gear, theme toggle icons
  accentOnTabs: boolean;         // settings active tab underline
  accentOnToggles: boolean;      // toggle switch ON state
  accentOnSlider: boolean;       // range slider fill
  accentOnCaret: boolean;        // textarea cursor
  accentOnFocusRing: boolean;    // keyboard focus ring
  accentOnScrollbar: boolean;    // scrollbar thumb
  accentOnGlassBorder: boolean;  // glass panel border
  accentOnButtonBorder: boolean; // button border on hover
}

export interface ISettingsActions {
  setTheme: (theme: ThemeMode) => void;
  setAccentColor: (color: string) => void;
  setSearchEngine: (engine: string) => void;
  setGlassIntensity: (intensity: GlassIntensity) => void;
  updateClock: (settings: Partial<IClockSettings>) => void;
  updateDate: (settings: Partial<IDateSettings>) => void;
  updateBackground: (settings: Partial<IBackgroundSettings>) => void;
  setUserSearchEngines: (engines: Record<string, IUserSearchEngine>) => void;
  setAccentOnClockText: (v: boolean) => void;
  setAccentOnClockSep: (v: boolean) => void;
  setAccentOnDate: (v: boolean) => void;
  setAccentOnIcons: (v: boolean) => void;
  setAccentOnTabs: (v: boolean) => void;
  setAccentOnToggles: (v: boolean) => void;
  setAccentOnSlider: (v: boolean) => void;
  setAccentOnCaret: (v: boolean) => void;
  setAccentOnFocusRing: (v: boolean) => void;
  setAccentOnScrollbar: (v: boolean) => void;
  setAccentOnGlassBorder: (v: boolean) => void;
  setAccentOnButtonBorder: (v: boolean) => void;
  resetAll: () => void;
  // ── Profile actions ──
  loadProfile: (settings: typeof DEFAULT_SETTINGS, services?: IServicesList) => void;
}

export interface IProfile {
  id: string;
  name: string;
  settings: typeof DEFAULT_SETTINGS;
  services?: IServicesList; // user-defined services captured at save time
  createdAt: string;
}

export type ISettingsStore = ISettingsState & ISettingsActions;

export const DEFAULT_SETTINGS: ISettingsState = {
  theme: 'dark',
  accentColor: DEFAULT_ACCENT,
  searchEngine: 'google',
  glassIntensity: 'medium',
  clock: {
    hourCycle: 'h23',
    showSeconds: true,
    hideWhenTyping: true,
    fontSize: 5.5,
  },
  date: {
    locale: 'pt-BR',
    formatStyle: 'long',
    showDayOfWeek: true,
    showYear: true,
    capitalize: true,
    fontSize: 1.0,
  },
  background: {
    dim: 40,
  },
  userSearchEngines: {},
  accentOnClockText: false,
  accentOnClockSep: false,
  accentOnDate: false,
  accentOnIcons: false,
  accentOnTabs: true,
  accentOnToggles: true,
  accentOnSlider: true,
  accentOnCaret: false,
  accentOnFocusRing: true,
  accentOnScrollbar: true,
  accentOnGlassBorder: false,
  accentOnButtonBorder: false,
};
