import { create } from 'zustand';

interface ITourStore {
  /** Incremented to signal WelcomeTour to show itself. */
  showSignal: number;
  triggerShow: () => void;
}

/**
 * Minimal store used to trigger the WelcomeTour from outside (e.g. SettingsPanel).
 * When `triggerShow` is called, WelcomeTour re-evaluates and shows if not permanently dismissed.
 */
const useTourStore = create<ITourStore>((set) => ({
  showSignal: 0,
  triggerShow: () => set((s) => ({ showSignal: s.showSignal + 1 })),
}));

export default useTourStore;
