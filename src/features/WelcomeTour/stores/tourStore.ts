import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

interface ITourStore {
  /** Incremented to signal WelcomeTour to show itself. */
  showSignal: number;
  triggerShow: () => void;
}

/**
 * Minimal store used to trigger the WelcomeTour from outside (e.g. SettingsPanel).
 * When `triggerShow` is called, WelcomeTour re-evaluates and shows if not permanently dismissed.
 */
const useTourStore = create<ITourStore>()(
  subscribeWithSelector(
    devtools(
      (set) => ({
        showSignal: 0,
        triggerShow: () => set((s) => ({ showSignal: s.showSignal + 1 })),
      }),
      { name: 'TourStore' },
    ),
  ),
);

export default useTourStore;
