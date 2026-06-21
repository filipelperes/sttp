import type { IProfile } from '@/features/Settings/types/Settings';
import { DEFAULT_SETTINGS } from '@/features/Settings/types/Settings';

const PROFILES_KEY = 'sttp-profiles';
const STARTUP_PROFILE_KEY = 'sttp-startup-profile';

/** The built-in factory-default profile — always available, never deletable. */
export const FACTORY_PROFILE: IProfile = {
  id: '__factory__',
  name: 'Default (factory)',
  settings: (() => {
    const { userSearchEngines: _, ...rest } = DEFAULT_SETTINGS;
    return rest;
  })(),
  createdAt: '2024-01-01T00:00:00.000Z',
};

export const loadProfiles = (): IProfile[] => {
  try {
    const stored = localStorage.getItem(PROFILES_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore
  }
  return [];
};

export const saveProfiles = (profiles: IProfile[]) => {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch {
    // ignore
  }
};

/** Returns all profiles including the factory default. */
export const getAllProfiles = (): IProfile[] => {
  const userProfiles = loadProfiles();
  return [FACTORY_PROFILE, ...userProfiles];
};

export const addProfile = (name: string, settings: typeof DEFAULT_SETTINGS): IProfile => {
  const profiles = loadProfiles();
  const { userSearchEngines: _, ...settingsClone } = settings;
  const newProfile: IProfile = {
    id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    settings: settingsClone,
    createdAt: new Date().toISOString(),
  };
  saveProfiles([...profiles, newProfile]);
  return newProfile;
};

export const deleteProfile = (id: string) => {
  if (id === FACTORY_PROFILE.id) return; // cannot delete factory default
  const profiles = loadProfiles();
  saveProfiles(profiles.filter((p) => p.id !== id));
  // Also clear startup profile if it was deleted
  if (getStartupProfileId() === id) {
    clearStartupProfile();
  }
};

/** Get the ID of the profile that should load on startup, or null. */
export const getStartupProfileId = (): string | null => {
  try {
    return localStorage.getItem(STARTUP_PROFILE_KEY);
  } catch {
    return null;
  }
};

/** Set which profile loads on startup. Pass null to clear. */
export const setStartupProfileId = (id: string | null) => {
  try {
    if (id) localStorage.setItem(STARTUP_PROFILE_KEY, id);
    else localStorage.removeItem(STARTUP_PROFILE_KEY);
  } catch {
    // ignore
  }
};

export const clearStartupProfile = () => setStartupProfileId(null);

/** Load the startup profile settings if one is set, or return null. */
export const loadStartupProfileSettings = (): Omit<typeof DEFAULT_SETTINGS, 'userSearchEngines'> | null => {
  const startupId = getStartupProfileId();
  if (!startupId) return null;
  const allProfiles = getAllProfiles();
  const profile = allProfiles.find((p) => p.id === startupId);
  if (profile) return profile.settings;
  return null;
};

export const exportProfilesAsJSON = (): string => {
  const profiles = loadProfiles();
  return JSON.stringify(profiles, null, 2);
};

export const importProfilesFromJSON = (json: string): IProfile[] => {
  const parsed = JSON.parse(json);
  if (!Array.isArray(parsed)) throw new Error('Invalid profiles format');
  const existing = loadProfiles();
  const merged = [...existing];
  for (const item of parsed) {
    if (item && typeof item === 'object' && item.name && item.settings) {
      const profile: IProfile = {
        id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        name: item.name,
        settings: item.settings,
        createdAt: item.createdAt ?? new Date().toISOString(),
      };
      merged.push(profile);
    }
  }
  saveProfiles(merged);
  return merged;
};
