import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import type { IClockSettings } from "@/features/Settings/types/Settings";
import { DEFAULT_SETTINGS } from "@/features/Settings/types/Settings";

export interface IClockSettingsStore {
  clock: IClockSettings;
  updateClock: (partial: Partial<IClockSettings>) => void;
}

export const useClockSettingsStore = create<IClockSettingsStore>()(
  subscribeWithSelector(
    devtools(
      (set) => ({
        clock: { ...DEFAULT_SETTINGS.clock },

        updateClock: (partial) =>
          set((state) => ({ clock: { ...state.clock, ...partial } })),
      }),
      { name: "ClockSettingsStore" },
    ),
  ),
);
