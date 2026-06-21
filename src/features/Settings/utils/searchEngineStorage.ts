import type { IUserSearchEngine, IUserSearchEngineIcon } from "@/features/Settings/types/Settings";

const STORAGE_KEY = 'sttp-user-search-engines';

/**
 * Migrate a single icon value from the old format (plain string emoji)
 * to the new format ({ type, value }).
 */
function migrateIcon(icon: unknown): IUserSearchEngineIcon {
  if (typeof icon === 'string') {
    return { type: 'emoji', value: icon || '🔍' };
  }
  if (icon && typeof icon === 'object') {
    const obj = icon as Record<string, unknown>;
    if (obj.type === 'emoji' || obj.type === 'img') {
      return { type: obj.type, value: String(obj.value || '') };
    }
  }
  return { type: 'emoji', value: '🔍' };
}

/**
 * Migrate an entire search engines map from old format to new.
 */
function migrateSearchEngines(
  data: Record<string, unknown>,
): Record<string, IUserSearchEngine> {
  const result: Record<string, IUserSearchEngine> = {};
  for (const [key, val] of Object.entries(data)) {
    if (val && typeof val === 'object') {
      const raw = val as Record<string, unknown>;
      result[key] = {
        id: String(raw.id ?? key),
        label: String(raw.label ?? ''),
        url: String(raw.url ?? ''),
        icon: migrateIcon(raw.icon),
      };
    }
  }
  return result;
}

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
        return migrateSearchEngines(parsed as Record<string, unknown>);
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
