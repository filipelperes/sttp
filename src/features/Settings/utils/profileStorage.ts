import type { IProfile } from '@/features/Settings/types/Settings';
import type { IServicesList } from '@/types/Service';
import { DEFAULT_SETTINGS } from '@/features/Settings/types/Settings';

const PROFILES_KEY = 'sttp-profiles';
const STARTUP_PROFILE_KEY = 'sttp-startup-profile';

/** The built-in factory-default profile — always available, never deletable. */
export const FACTORY_PROFILE: IProfile = {
  id: '__factory__',
  name: 'Default (factory)',
  settings: DEFAULT_SETTINGS,
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

export const addProfile = (
  name: string,
  settings: typeof DEFAULT_SETTINGS,
  services?: IServicesList,
): IProfile => {
  const profiles = loadProfiles();
  const newProfile: IProfile = {
    id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    name,
    settings: { ...settings },
    services: services ? { ...services } : undefined,
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
export const loadStartupProfileSettings = (): { settings: typeof DEFAULT_SETTINGS; services?: IServicesList } | null => {
  const startupId = getStartupProfileId();
  if (!startupId) return null;
  const allProfiles = getAllProfiles();
  const profile = allProfiles.find((p) => p.id === startupId);
  if (profile) return { settings: profile.settings, services: profile.services };
  return null;
};

/**
 * Minimal validation that the provided object has the shape of a valid settings snapshot.
 */
function isValidSettings(value: unknown): value is typeof DEFAULT_SETTINGS {
  if (!value || typeof value !== 'object') return false;
  const s = value as Record<string, unknown>;
  const required = ['theme', 'accentColor', 'searchEngine', 'glassIntensity', 'clock', 'date', 'background'];
  return required.every((field) => field in s);
}

/** Wrapper format for exported profiles (v1). */
interface IExportedProfilesV1 {
  version: 1;
  startupProfileName?: string;
  profiles: IProfile[];
}

export const exportProfilesAsJSON = (): string => {
  const profiles = loadProfiles();
  const startupId = getStartupProfileId();
  const startupProfileName = startupId
    ? getAllProfiles().find((p) => p.id === startupId)?.name
    : undefined;

  const data: IExportedProfilesV1 = {
    version: 1,
    startupProfileName,
    profiles,
  };
  return JSON.stringify(data, null, 2);
};

export const importProfilesFromJSON = (json: string): IProfile[] => {
  const parsed = JSON.parse(json);

  // Support both the new wrapped format { version, profiles } and the
  // legacy plain array format for backward compatibility.
  let profilesToImport: IProfile[];
  let startupProfileName: string | undefined;
  if (Array.isArray(parsed)) {
    profilesToImport = parsed;
  } else if (parsed && typeof parsed === 'object' && Array.isArray(parsed.profiles)) {
    profilesToImport = parsed.profiles;
    startupProfileName = parsed.startupProfileName;
  } else {
    throw new Error('Invalid profiles format — expected an array or { version, profiles }');
  }

  const existing = loadProfiles();
  const merged = [...existing];
  const seenNames = new Set(existing.map((p) => p.name));
  let importedCount = 0;

  for (const item of profilesToImport) {
    if (!item || typeof item !== 'object') continue;
    if (!item.name || typeof item.name !== 'string') continue;
    if (!isValidSettings(item.settings)) continue;

    const name: string = item.name;

    // Deduplicate by name — skip if a profile with the same name already exists
    if (seenNames.has(name)) continue;
    seenNames.add(name);

    const profile: IProfile = {
      id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      name,
      settings: item.settings,
      services: item.services && typeof item.services === 'object' && Object.keys(item.services).length > 0
        ? { ...item.services }
        : undefined,
      createdAt: item.createdAt ?? new Date().toISOString(),
    };
    merged.push(profile);
    importedCount++;
  }

  saveProfiles(merged);

  // Restore startup profile association by name (IDs change on import)
  if (startupProfileName) {
    const matched = merged.find((p) => p.name === startupProfileName);
    if (matched) {
      setStartupProfileId(matched.id);
    }
  }

  return merged;
};
