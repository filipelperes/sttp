export type ThemeMode = 'dark' | 'light';

export type HourCycle = 'h23' | 'h12';

export type DateFormatStyle = 'full' | 'long' | 'medium' | 'short';

export type GlassIntensity = 'light' | 'medium' | 'strong';

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
}

export interface IBackgroundSettings {
  dim: number; // 0-100, dim level when palette is open
}

export interface ISettingsState {
  theme: ThemeMode;
  glassIntensity: GlassIntensity;
  clock: IClockSettings;
  date: IDateSettings;
  background: IBackgroundSettings;
}

export interface ISettingsActions {
  setTheme: (theme: ThemeMode) => void;
  setGlassIntensity: (intensity: GlassIntensity) => void;
  updateClock: (settings: Partial<IClockSettings>) => void;
  updateDate: (settings: Partial<IDateSettings>) => void;
  updateBackground: (settings: Partial<IBackgroundSettings>) => void;
  resetAll: () => void;
}

export type ISettingsStore = ISettingsState & ISettingsActions;

export const DEFAULT_SETTINGS: ISettingsState = {
  theme: 'dark',
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
  },
  background: {
    dim: 40,
  },
};
