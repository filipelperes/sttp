import { memo, useCallback } from 'react';
import { useAppearanceStore } from '@/features/Settings/stores/settings';
import { ACCENT_COLORS, DEFAULT_ACCENT } from '@/features/Settings/types/Settings';

const AccentColorPicker = memo(() => {
  const accentColor = useAppearanceStore((s) => s.accentColor);
  const setAccentColor = useAppearanceStore((s) => s.setAccentColor);

  const handleCustomColor = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAccentColor(e.target.value);
    },
    [setAccentColor],
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/80">Accent color</p>
          <p className="text-xs text-foreground/40 mt-0.5">
            Customize the accent color used throughout the interface
          </p>
        </div>
      </div>

      {/* Preset Colors */}
      <div className="flex flex-wrap gap-2">
        {ACCENT_COLORS.map((c) => (
          <button
            key={c.value}
            onClick={() => setAccentColor(c.value)}
            title={c.label}
            className={`w-8 h-8 rounded-full transition-all cursor-pointer focus-ring ${
              accentColor === c.value
                ? 'scale-110'
                : 'hover:scale-110'
            }`}
            style={{
              backgroundColor: c.value,
              outline: accentColor === c.value ? `2px solid ${c.value}` : undefined,
              outlineOffset: '2px',
            }}
            aria-label={`Set accent to ${c.label}`}
          />
        ))}
      </div>

      {/* Custom Color + Reset */}
      <div className="flex items-center gap-3">
        <label className="relative cursor-pointer group">
          <input
            type="color"
            value={accentColor}
            onChange={handleCustomColor}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label="Custom accent color"
          />
          <div
            className="w-10 h-10 rounded-xl border-2 border-border cursor-pointer hover:scale-105 transition-transform"
            style={{ backgroundColor: accentColor }}
          />
        </label>
        <span className="text-xs text-foreground/50 font-mono">{accentColor}</span>
        {accentColor !== DEFAULT_ACCENT && (
          <button
            onClick={() => setAccentColor(DEFAULT_ACCENT)}
            className="ml-auto px-3 py-1.5 rounded-lg glass text-[11px] text-foreground/50 hover:text-foreground cursor-pointer transition-all focus-ring"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
});

AccentColorPicker.displayName = 'AccentColorPicker';
export default AccentColorPicker;
