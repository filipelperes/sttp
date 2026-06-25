import { useEffect } from 'react';
import Clock from '@/components/Clock';
import DateDisplay from '@/components/DateDisplay';
import Tips from '@/components/Tips';
import HandleCommandPalette from '@/CommandPalette/components/HandleCommandPalette';
import HandleWindow from '@/components/HandleWindow';
import QuickThemeToggle from '@/features/Settings/components/QuickThemeToggle';
import SettingsButton from '@/features/Settings/components/SettingsButton';
import MobilePaletteTrigger from '@/CommandPalette/components/MobilePaletteTrigger';
import WelcomeTour from '@/features/WelcomeTour/components/WelcomeTour';
import { useAppearanceStore, useAccentSettingsStore } from '@/features/Settings/stores/settings';

/**
 * Applies global CSS custom properties based on accent toggle state.
 *
 * Uses `subscribe()` instead of hook selectors to avoid re-rendering
 * the entire App (and its `memo`'d children) whenever accent settings change.
 * DOM updates happen synchronously on state changes — no React re-render needed.
 */
const useAccentGlobals = () => {
  useEffect(() => {
    const update = () => {
      const ap = useAppearanceStore.getState();
      const ac = useAccentSettingsStore.getState();
      const root = document.documentElement;
      const c = ap.accentColor;

      root.style.setProperty('--color-ring', ac.accentOnFocusRing ? c : 'rgba(255, 255, 255, 0.15)');
      root.style.setProperty('--color-scrollbar', ac.accentOnScrollbar ? `${c}66` : 'rgba(255, 255, 255, 0.2)');
      root.style.setProperty('--caret-color', ac.accentOnCaret ? c : 'auto');
      root.style.setProperty('--glass-border', ac.accentOnGlassBorder ? `${c}40` : 'rgba(255, 255, 255, 0.08)');
      root.style.setProperty('--button-hover-border', ac.accentOnButtonBorder ? `${c}50` : 'rgba(255, 255, 255, 0.12)');
      root.style.setProperty('--slider-accent', ac.accentOnSlider ? c : 'rgba(255, 255, 255, 0.25)');
    };

    update(); // Apply initial values
    const unsub1 = useAppearanceStore.subscribe(update);
    const unsub2 = useAccentSettingsStore.subscribe(update);
    return () => { unsub1(); unsub2(); };
  }, []);
};

const App = () => {
  useAccentGlobals();

  return (
    <div id="App" className="flex items-center justify-center flex-col relative">
      <Clock />
      <DateDisplay />
      <Tips />
      <HandleCommandPalette />
      <HandleWindow />
      <QuickThemeToggle />
      <SettingsButton />
      <MobilePaletteTrigger />
      <WelcomeTour />
    </div>
  );
};

export default App;
