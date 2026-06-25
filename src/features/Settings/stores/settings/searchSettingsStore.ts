import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import type { IUserSearchEngine } from "@/features/Settings/types/Settings";
import { DEFAULT_SETTINGS } from "@/features/Settings/types/Settings";
import { saveUserSearchEngines } from "@/features/Settings/utils/searchEngineStorage";

export interface ISearchSettingsStore {
  searchEngine: string;
  userSearchEngines: Record<string, IUserSearchEngine>;
  setSearchEngine: (engine: string) => void;
  setUserSearchEngines: (engines: Record<string, IUserSearchEngine>) => void;
}

export const useSearchSettingsStore = create<ISearchSettingsStore>()(
  subscribeWithSelector(
    devtools(
      (set) => ({
        searchEngine: DEFAULT_SETTINGS.searchEngine,
        userSearchEngines: {},

        setSearchEngine: (searchEngine) => set({ searchEngine }),
        setUserSearchEngines: (userSearchEngines) => {
          saveUserSearchEngines(userSearchEngines);
          set({ userSearchEngines });
        },
      }),
      { name: "SearchSettingsStore" },
    ),
  ),
);
