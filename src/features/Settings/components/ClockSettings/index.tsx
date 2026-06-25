import { memo, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useClockSettingsStore } from '@/features/Settings/stores/settings';
import ToggleSwitch from '@/features/Settings/components/ToggleSwitch';

/** Formats the current time based on settings for the preview */
const formatPreview = (settings: ReturnType<typeof useClockSettingsStore.getState>['clock']): string => {
  const now = new Date();
  const parts: string[] = [];
  if (settings.hourCycle === 'h12') {
    const h = now.getHours() % 12 || 12;
    parts.push(String(h));
    parts.push(now.getMinutes().toString().padStart(2, '0'));
    if (settings.showSeconds) parts.push(now.getSeconds().toString().padStart(2, '0'));
    parts.push(now.getHours() >= 12 ? 'PM' : 'AM');
  } else {
    parts.push(now.getHours().toString().padStart(2, '0'));
    parts.push(now.getMinutes().toString().padStart(2, '0'));
    if (settings.showSeconds) parts.push(now.getSeconds().toString().padStart(2, '0'));
  }
  return parts.join(' : ');
};

const ClockSettings = memo(() => {
  const clock = useClockSettingsStore(useShallow((s) => s.clock));
  const updateClock = useClockSettingsStore((s) => s.updateClock);
  const preview = formatPreview({ ...clock });

  const toggleHourCycle = useCallback(() => {
    updateClock({ hourCycle: clock.hourCycle === 'h23' ? 'h12' : 'h23' });
  }, [clock.hourCycle, updateClock]);

  const toggleSeconds = useCallback(() => {
    updateClock({ showSeconds: !clock.showSeconds });
  }, [clock.showSeconds, updateClock]);

  const toggleHideWhileTyping = useCallback(() => {
    updateClock({ hideWhenTyping: !clock.hideWhenTyping });
  }, [clock.hideWhenTyping, updateClock]);

  const handleFontSize = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateClock({ fontSize: parseFloat(e.target.value) });
    },
    [updateClock],
  );

  return (
    <div className="space-y-5">
      {/* Live Preview */}
      <div className="glass rounded-xl px-4 py-5 text-center">
        <p className="text-xs text-foreground/40 uppercase tracking-wider mb-2">Preview</p>
        <p
          className="font-bold tracking-[1.15px] transition-all duration-200"
          style={{ fontSize: `${Math.min(clock.fontSize, 4)}rem` }}
        >
          {preview}
        </p>
      </div>

      <h3 className="text-lg font-semibold text-foreground">Clock</h3>

      {/* 12/24 Hour */}
      <div className="flex items-center justify-between py-1">
        <div>
          <p className="text-sm text-foreground/90">Hour format</p>
          <p className="text-xs text-foreground/40 mt-0.5">
            {clock.hourCycle === 'h23' ? '24-hour (00:00–23:59)' : '12-hour (1:00–12:59)'}
          </p>
        </div>
        <button
          onClick={toggleHourCycle}
          className="px-3 py-1.5 rounded-lg glass text-sm text-foreground/80 hover:text-foreground cursor-pointer transition-all focus-ring min-w-[90px] text-center"
        >
          {clock.hourCycle === 'h23' ? '24h' : '12h'}
        </button>
      </div>

      {/* Show seconds */}
      <div className="flex items-center justify-between py-1">
        <div>
          <p className="text-sm text-foreground/90">Show seconds</p>
          <p className="text-xs text-foreground/40 mt-0.5">Display seconds in the clock</p>
        </div>
        <ToggleSwitch checked={clock.showSeconds} onChange={toggleSeconds} />
      </div>

      {/* Hide while typing */}
      <div className="flex items-center justify-between py-1">
        <div>
          <p className="text-sm text-foreground/90">Auto-hide while typing</p>
          <p className="text-xs text-foreground/40 mt-0.5">
            Fades clock when command palette opens
          </p>
        </div>
        <ToggleSwitch checked={clock.hideWhenTyping} onChange={toggleHideWhileTyping} />
      </div>

      {/* Font size */}
      <div className="py-1">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-foreground/90">Font size</p>
          <span className="text-xs text-foreground/50 tabular-nums">{clock.fontSize.toFixed(1)}rem</span>
        </div>
        <input
          type="range"
          min="3"
          max="8"
          step="0.1"
          value={clock.fontSize}
          onChange={handleFontSize}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-muted
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--slider-accent,var(--color-accent))] [&::-webkit-slider-thumb]:shadow-md
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-transform
            [&::-webkit-slider-thumb]:hover:scale-110
            [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-[var(--slider-accent,var(--color-accent))] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
          style={{ accentColor: 'var(--slider-accent, var(--color-accent))' } as React.CSSProperties}
        />
        <div className="flex justify-between text-[10px] text-foreground/30 mt-1">
          <span>3rem</span>
          <span>5.5rem</span>
          <span>8rem</span>
        </div>
      </div>
    </div>
  );
});

ClockSettings.displayName = 'ClockSettings';
export default ClockSettings;
