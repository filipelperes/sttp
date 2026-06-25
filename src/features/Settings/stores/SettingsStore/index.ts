// Re-exports from the split settings stores for backward compatibility.
// New code should import directly from the individual sub-store barrels.
export {
  useAppearanceStore,
  useClockSettingsStore,
  useDateSettingsStore,
  useSearchSettingsStore,
  useAccentSettingsStore,
  getFullSettings,
  loadProfile,
  resetAllSettings,
} from '../settings';
