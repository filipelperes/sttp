import { useEffect } from 'react';
import Clock from '@/components/Clock';
import DateDisplay from '@/components/DateDisplay';
import HandleCommandPalette from '@/CommandPalette/components/HandleCommandPalette';
import HandleWindow from '@/components/HandleWindow';
import QuickThemeToggle from '@/features/Settings/components/QuickThemeToggle';
import SettingsButton from '@/features/Settings/components/SettingsButton';
import MobilePaletteTrigger from '@/CommandPalette/components/MobilePaletteTrigger';
import WelcomeTour from '@/features/WelcomeTour/components/WelcomeTour';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';

/**
 * Applies global CSS custom properties based on accent toggle state.
 * Runs whenever any accent toggle or the accent color changes.
 */
const useAccentGlobals = () => {
  const accentColor = useSettingsStore((s) => s.accentColor);
  const accentOnFocusRing = useSettingsStore((s) => s.accentOnFocusRing);
  const accentOnScrollbar = useSettingsStore((s) => s.accentOnScrollbar);
  const accentOnCaret = useSettingsStore((s) => s.accentOnCaret);
  const accentOnGlassBorder = useSettingsStore((s) => s.accentOnGlassBorder);
  const accentOnButtonBorder = useSettingsStore((s) => s.accentOnButtonBorder);
  const accentOnSlider = useSettingsStore((s) => s.accentOnSlider);

  useEffect(() => {
    const root = document.documentElement;
    const c = accentColor;

    // Focus ring: override --color-ring (initially set by applyAccentToDOM)
    root.style.setProperty('--color-ring', accentOnFocusRing ? c : 'rgba(255, 255, 255, 0.15)');

    // Scrollbar thumb
    root.style.setProperty(
      '--color-scrollbar',
      accentOnScrollbar ? `${c}66` : 'rgba(255, 255, 255, 0.2)',
    );

    // Caret color on command palette textarea
    root.style.setProperty('--caret-color', accentOnCaret ? c : 'auto');

    // Glass border
    root.style.setProperty(
      '--glass-border',
      accentOnGlassBorder ? `${c}40` : 'rgba(255, 255, 255, 0.08)',
    );

    // Button hover border (used by .glass hover styles)
    root.style.setProperty(
      '--button-hover-border',
      accentOnButtonBorder ? `${c}50` : 'rgba(255, 255, 255, 0.12)',
    );

    // Slider accent color
    root.style.setProperty(
      '--slider-accent',
      accentOnSlider ? c : 'rgba(255, 255, 255, 0.25)',
    );
  }, [accentColor, accentOnFocusRing, accentOnScrollbar, accentOnCaret, accentOnGlassBorder, accentOnButtonBorder, accentOnSlider]);
};

const App = () => {
  useAccentGlobals();

  return (
    <div id="App" className="flex items-center justify-center flex-col relative">
      <Clock />
      <DateDisplay />
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
