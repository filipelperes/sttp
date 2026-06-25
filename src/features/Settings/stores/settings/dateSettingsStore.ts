import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import type { IDateSettings } from "@/features/Settings/types/Settings";
import { DEFAULT_SETTINGS } from "@/features/Settings/types/Settings";

export interface IDateSettingsStore {
  date: IDateSettings;
  updateDate: (partial: Partial<IDateSettings>) => void;
}

export const useDateSettingsStore = create<IDateSettingsStore>()(
  subscribeWithSelector(
    devtools(
      (set) => ({
        date: { ...DEFAULT_SETTINGS.date },

        updateDate: (partial) =>
          set((state) => ({ date: { ...state.date, ...partial } })),
      }),
      { name: "DateSettingsStore" },
    ),
  ),
);
