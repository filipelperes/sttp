import type { IServicesList } from "@/types/Service";

const STORAGE_KEY = 'sttp-user-services';

/**
 * Load user-created services from localStorage.
 * Returns an empty object if nothing is stored or on error.
 */
export const loadUserServices = (): IServicesList => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (typeof parsed === 'object' && parsed !== null) {
        return parsed as IServicesList;
      }
    }
  } catch {
    // ignore parse errors
  }
  return {};
};

/**
 * Save the full user services map to localStorage.
 */
export const saveUserServices = (services: IServicesList): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  } catch {
    // ignore storage errors
  }
};

/**
 * Add or update a single service in localStorage.
 * Returns the updated full services map.
 */
export const upsertUserService = (key: string, service: IServicesList[string], current: IServicesList): IServicesList => {
  const updated = { ...current, [key]: service };
  saveUserServices(updated);
  return updated;
};

/**
 * Remove a service from localStorage by key.
 * Returns the updated full services map.
 */
export const removeUserService = (key: string, current: IServicesList): IServicesList => {
  const updated = { ...current };
  delete updated[key];
  saveUserServices(updated);
  return updated;
};
