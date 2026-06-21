import type { IUserSearchEngine } from "@/features/Settings/types/Settings";

const STORAGE_KEY = 'sttp-user-search-engines';

/**
 * Load user-created search engines from localStorage.
 * Returns an empty object if nothing is stored or on error.
 */
export const loadUserSearchEngines = (): Record<string, IUserSearchEngine> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed as Record<string, IUserSearchEngine>;
      }
    }
  } catch {
    // ignore parse errors
  }
  return {};
};

/**
 * Save the full user search engines map to localStorage.
 */
export const saveUserSearchEngines = (engines: Record<string, IUserSearchEngine>): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(engines));
  } catch {
    // ignore storage errors
  }
};

/**
 * Add or update a single search engine in localStorage.
 * Returns the updated full engines map.
 */
export const upsertUserSearchEngine = (
  key: string,
  engine: IUserSearchEngine,
  current: Record<string, IUserSearchEngine>,
): Record<string, IUserSearchEngine> => {
  const updated = { ...current, [key]: engine };
  saveUserSearchEngines(updated);
  return updated;
};

/**
 * Remove a search engine from localStorage by key.
 * Returns the updated full engines map.
 */
export const removeUserSearchEngine = (
  key: string,
  current: Record<string, IUserSearchEngine>,
): Record<string, IUserSearchEngine> => {
  const updated = { ...current };
  delete updated[key];
  saveUserSearchEngines(updated);
  return updated;
};
