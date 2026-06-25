import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import type { ThemeMode, GlassIntensity, IBackgroundSettings } from "@/features/Settings/types/Settings";
import { DEFAULT_SETTINGS } from "@/features/Settings/types/Settings";
import { applyThemeToDOM, applyAccentToDOM, applyGlassToDOM } from "./shared";

export interface IAppearanceStore {
  theme: ThemeMode;
  accentColor: string;
  glassIntensity: GlassIntensity;
  background: IBackgroundSettings;
  setTheme: (theme: ThemeMode) => void;
  setAccentColor: (color: string) => void;
  setGlassIntensity: (intensity: GlassIntensity) => void;
  updateBackground: (partial: Partial<IBackgroundSettings>) => void;
}

export const useAppearanceStore = create<IAppearanceStore>()(
  subscribeWithSelector(
    devtools(
      (set) => ({
        theme: DEFAULT_SETTINGS.theme,
        accentColor: DEFAULT_SETTINGS.accentColor,
        glassIntensity: DEFAULT_SETTINGS.glassIntensity,
        background: { ...DEFAULT_SETTINGS.background },

        setTheme: (theme) => {
          applyThemeToDOM(theme);
          set({ theme });
        },
        setAccentColor: (accentColor) => {
          applyAccentToDOM(accentColor);
          set({ accentColor });
        },
        setGlassIntensity: (glassIntensity) => {
          applyGlassToDOM(glassIntensity);
          set({ glassIntensity });
        },
        updateBackground: (partial) =>
          set((state) => ({ background: { ...state.background, ...partial } })),
      }),
      { name: "AppearanceStore" },
    ),
  ),
);
