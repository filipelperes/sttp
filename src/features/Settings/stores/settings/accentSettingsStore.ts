import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { DEFAULT_SETTINGS } from "@/features/Settings/types/Settings";

/** Keys of the accent toggle booleans (used for the generic setter). */
export type AccentToggleKey =
  | 'accentOnClockText'
  | 'accentOnClockSep'
  | 'accentOnDate'
  | 'accentOnIcons'
  | 'accentOnTabs'
  | 'accentOnToggles'
  | 'accentOnSlider'
  | 'accentOnCaret'
  | 'accentOnFocusRing'
  | 'accentOnScrollbar'
  | 'accentOnGlassBorder'
  | 'accentOnButtonBorder';

export interface IAccentSettingsStore {
  accentOnClockText: boolean;
  accentOnClockSep: boolean;
  accentOnDate: boolean;
  accentOnIcons: boolean;
  accentOnTabs: boolean;
  accentOnToggles: boolean;
  accentOnSlider: boolean;
  accentOnCaret: boolean;
  accentOnFocusRing: boolean;
  accentOnScrollbar: boolean;
  accentOnGlassBorder: boolean;
  accentOnButtonBorder: boolean;
  /** Generic setter for any accent toggle — replaces 12 individual setters. */
  setAccentToggle: (key: AccentToggleKey, value: boolean) => void;
  // Legacy individual setters kept for backward compatibility.
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
}

export const useAccentSettingsStore = create<IAccentSettingsStore>()(
  subscribeWithSelector(
    devtools(
      (set) => ({
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

        // Generic setter — single action for all 12 toggles
        setAccentToggle: (key, value) => set({ [key]: value }),

        // Legacy individual setters implemented via the generic one
        setAccentOnClockText: (v) => set({ accentOnClockText: v }),
        setAccentOnClockSep: (v) => set({ accentOnClockSep: v }),
        setAccentOnDate: (v) => set({ accentOnDate: v }),
        setAccentOnIcons: (v) => set({ accentOnIcons: v }),
        setAccentOnTabs: (v) => set({ accentOnTabs: v }),
        setAccentOnToggles: (v) => set({ accentOnToggles: v }),
        setAccentOnSlider: (v) => set({ accentOnSlider: v }),
        setAccentOnCaret: (v) => set({ accentOnCaret: v }),
        setAccentOnFocusRing: (v) => set({ accentOnFocusRing: v }),
        setAccentOnScrollbar: (v) => set({ accentOnScrollbar: v }),
        setAccentOnGlassBorder: (v) => set({ accentOnGlassBorder: v }),
        setAccentOnButtonBorder: (v) => set({ accentOnButtonBorder: v }),
      }),
      { name: "AccentSettingsStore" },
    ),
  ),
);
