import { memo, useCallback } from 'react';
import { useAppearanceStore } from '@/features/Settings/stores/settings';

const BackgroundDimControl = memo(() => {
  const dim = useAppearanceStore((s) => s.background.dim);
  const updateBackground = useAppearanceStore((s) => s.updateBackground);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateBackground({ dim: parseInt(e.target.value, 10) });
    },
    [updateBackground],
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-foreground/80">Background dim</p>
          <p className="text-xs text-foreground/40 mt-0.5">
            Darkens the background when command palette opens
          </p>
        </div>
        <span className="text-xs text-foreground/50 tabular-nums min-w-[2.5rem] text-right">
          {dim}%
        </span>
      </div>
      <input
        type="range"
        min="0"
        max="80"
        step="5"
        value={dim}
        onChange={handleChange}
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
        <span>No dim</span>
        <span>Heavy dim</span>
      </div>
    </div>
  );
});

BackgroundDimControl.displayName = 'BackgroundDimControl';
export default BackgroundDimControl;
