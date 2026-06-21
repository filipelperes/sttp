import { memo } from 'react';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';

const AccentToggles = memo(() => {
  const accentOnClockSep = useSettingsStore((s) => s.accentOnClockSep);
  const accentOnDate = useSettingsStore((s) => s.accentOnDate);
  const accentOnIcons = useSettingsStore((s) => s.accentOnIcons);
  const setAccentOnClockSep = useSettingsStore((s) => s.setAccentOnClockSep);
  const setAccentOnDate = useSettingsStore((s) => s.setAccentOnDate);
  const setAccentOnIcons = useSettingsStore((s) => s.setAccentOnIcons);

  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm text-foreground/80">Accent color on UI elements</p>
        <p className="text-xs text-foreground/40 mt-0.5">
          Choose which interface elements use the accent color
        </p>
      </div>

      <div className="space-y-2">
        <label className="flex items-center justify-between px-3 py-2 rounded-lg glass cursor-pointer transition-colors hover:bg-surface-hover">
          <span className="text-sm text-foreground/80">Clock separator (:)</span>
          <button
            role="switch"
            aria-checked={accentOnClockSep}
            onClick={() => setAccentOnClockSep(!accentOnClockSep)}
            className={`relative w-10 h-5 rounded-full transition-colors focus-ring ${
              accentOnClockSep ? 'bg-accent' : 'bg-muted'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                accentOnClockSep ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </label>

        <label className="flex items-center justify-between px-3 py-2 rounded-lg glass cursor-pointer transition-colors hover:bg-surface-hover">
          <span className="text-sm text-foreground/80">Date text</span>
          <button
            role="switch"
            aria-checked={accentOnDate}
            onClick={() => setAccentOnDate(!accentOnDate)}
            className={`relative w-10 h-5 rounded-full transition-colors focus-ring ${
              accentOnDate ? 'bg-accent' : 'bg-muted'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                accentOnDate ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </label>

        <label className="flex items-center justify-between px-3 py-2 rounded-lg glass cursor-pointer transition-colors hover:bg-surface-hover">
          <span className="text-sm text-foreground/80">Interface icons (gear, theme)</span>
          <button
            role="switch"
            aria-checked={accentOnIcons}
            onClick={() => setAccentOnIcons(!accentOnIcons)}
            className={`relative w-10 h-5 rounded-full transition-colors focus-ring ${
              accentOnIcons ? 'bg-accent' : 'bg-muted'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                accentOnIcons ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </label>
      </div>
    </div>
  );
});

AccentToggles.displayName = 'AccentToggles';
export default AccentToggles;