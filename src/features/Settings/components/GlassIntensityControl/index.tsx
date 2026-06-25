import { memo } from 'react';
import { useAppearanceStore } from '@/features/Settings/stores/settings';
import type { GlassIntensity } from '@/features/Settings/types/Settings';

const OPTIONS: { value: GlassIntensity; label: string; desc: string }[] = [
  { value: 'light', label: 'Light', desc: 'Subtle frosted effect' },
  { value: 'medium', label: 'Medium', desc: 'Balanced glass look' },
  { value: 'strong', label: 'Strong', desc: 'Pronounced frosted glass' },
];

const GlassIntensityControl = memo(() => {
  const intensity = useAppearanceStore((s) => s.glassIntensity);
  const setIntensity = useAppearanceStore((s) => s.setGlassIntensity);

  return (
    <div className="space-y-3">
      <span className="text-sm text-foreground/80">Glass effect intensity</span>
      <div className="flex gap-2">
        {OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setIntensity(opt.value)}
            className={`flex-1 px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer focus-ring ${
              intensity === opt.value
                ? 'bg-accent text-accent-foreground font-medium'
                : 'glass text-foreground/60 hover:text-foreground'
            }`}
          >
            <div className="text-center">
              <div className="font-medium">{opt.label}</div>
              <div className="text-[10px] opacity-60 mt-0.5">{opt.desc}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
});

GlassIntensityControl.displayName = 'GlassIntensityControl';
export default GlassIntensityControl;
