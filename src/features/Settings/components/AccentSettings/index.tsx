import { memo, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { IoTimeOutline, IoCalendarOutline, IoAppsOutline, IoColorWandOutline, IoText, IoGridOutline, IoOptionsOutline, IoCodeSlash, IoScanOutline, IoResize, IoSquareOutline, IoRemove } from 'react-icons/io5';
import { useAccentSettingsStore, useAppearanceStore } from '@/features/Settings/stores/settings';
import type { AccentToggleKey } from '@/features/Settings/stores/settings/accentSettingsStore';

interface IAccentTarget {
  key: AccentToggleKey;
  label: string;
  description: string;
  icon: React.ReactNode;
}

const SECTIONS: { title: string; items: IAccentTarget[] }[] = [
  {
    title: 'Clock & Time',
    items: [
      {
        key: 'accentOnClockText',
        label: 'Clock digits',
        description: 'All clock numbers take the accent color',
        icon: <IoTimeOutline size={16} />,
      },
      {
        key: 'accentOnClockSep',
        label: 'Colon separator (:)',
        description: 'The blinking colon between hours and minutes',
        icon: <IoRemove size={16} />,
      },
      {
        key: 'accentOnCaret',
        label: 'Text cursor (caret)',
        description: 'Command palette typing cursor',
        icon: <IoText size={16} />,
      },
    ],
  },
  {
    title: 'Date',
    items: [
      {
        key: 'accentOnDate',
        label: 'Date text',
        description: 'The date displayed below the clock',
        icon: <IoCalendarOutline size={16} />,
      },
    ],
  },
  {
    title: 'Navigation',
    items: [
      {
        key: 'accentOnIcons',
        label: 'Interface icons',
        description: 'Gear icon, theme toggle icon, and similar UI icons',
        icon: <IoAppsOutline size={16} />,
      },
      {
        key: 'accentOnTabs',
        label: 'Active tab underline',
        description: 'The bottom border of the selected Settings tab',
        icon: <IoOptionsOutline size={16} />,
      },
    ],
  },
  {
    title: 'Interactive Elements',
    items: [
      {
        key: 'accentOnToggles',
        label: 'Toggle switches (ON)',
        description: 'Background color of toggles when enabled',
        icon: <IoCodeSlash size={16} />,
      },
      {
        key: 'accentOnSlider',
        label: 'Slider range fill',
        description: 'The filled portion of range sliders (font size, dim)',
        icon: <IoResize size={16} />,
      },
      {
        key: 'accentOnFocusRing',
        label: 'Keyboard focus ring',
        description: 'Outer glow when focusing elements via Tab key',
        icon: <IoScanOutline size={16} />,
      },
      {
        key: 'accentOnButtonBorder',
        label: 'Button border (hover)',
        description: 'Border accent on glass buttons when hovered',
        icon: <IoSquareOutline size={16} />,
      },
    ],
  },
  {
    title: 'Surface & Decorations',
    items: [
      {
        key: 'accentOnScrollbar',
        label: 'Scrollbar thumb',
        description: 'The draggable scrollbar handle in scrollable areas',
        icon: <IoGridOutline size={16} />,
      },
      {
        key: 'accentOnGlassBorder',
        label: 'Glass panel border',
        description: 'Border outline of frosted glass panels and cards',
        icon: <IoColorWandOutline size={16} />,
      },
    ],
  },
];

/** Generic toggle row rendered for each accent target. */
const AccentRow = memo(
  ({
    label,
    description,
    icon,
    checked,
    onChange,
  }: {
    label: string;
    description: string;
    icon: React.ReactNode;
    checked: boolean;
    onChange: (v: boolean) => void;
  }) => (
    <label className="flex items-center gap-3 px-3 py-2.5 rounded-lg glass cursor-pointer transition-colors hover:bg-surface-hover group">
      <span className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-foreground/40 group-hover:text-foreground/70 transition-colors">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground/90">{label}</p>
        <p className="text-[11px] text-foreground/40 mt-px truncate">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-5 rounded-full shrink-0 transition-colors focus-ring ${
          checked ? 'bg-accent' : 'bg-muted'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </label>
  ),
);

AccentRow.displayName = 'AccentRow';

const AccentSettings = memo(() => {
  // accentColor vem do AppearanceStore; os 12 toggles vêm do AccentSettingsStore.
  // Como são stores independentes, mudar date/clock/search não re-renderiza nada aqui.
  const accentColor = useAppearanceStore((s) => s.accentColor);
  const accentValues = useAccentSettingsStore(
    useShallow((s) => ({
      accentOnClockText: s.accentOnClockText,
      accentOnClockSep: s.accentOnClockSep,
      accentOnCaret: s.accentOnCaret,
      accentOnDate: s.accentOnDate,
      accentOnIcons: s.accentOnIcons,
      accentOnTabs: s.accentOnTabs,
      accentOnToggles: s.accentOnToggles,
      accentOnSlider: s.accentOnSlider,
      accentOnFocusRing: s.accentOnFocusRing,
      accentOnButtonBorder: s.accentOnButtonBorder,
      accentOnScrollbar: s.accentOnScrollbar,
      accentOnGlassBorder: s.accentOnGlassBorder,
    })),
  );

  // Single generic setter replaces the 12 individual setters + getSetter map + useCallback
  const setAccentToggle = useAccentSettingsStore((s) => s.setAccentToggle);

  const getValue = useCallback((key: string): boolean => {
    return accentValues[key as keyof typeof accentValues] ?? false;
  }, [accentValues]);

  const activeCount = Object.values(accentValues).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Visual preview bar */}
      <div className="glass rounded-xl px-4 py-3 flex items-center gap-3">
        <span
          className="w-4 h-4 rounded-full shrink-0"
          style={{ backgroundColor: accentColor }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-foreground/90 font-medium">Accent color</p>
          <p className="text-[11px] text-foreground/40 truncate">
            {accentColor} &middot; {SECTIONS.reduce((sum, s) => sum + s.items.length, 0)} targets
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-foreground/40">{activeCount} active</span>
        </div>
      </div>

      {SECTIONS.map((section) => (
        <div key={section.title} className="space-y-2">
          <h4 className="text-[11px] text-foreground/40 uppercase tracking-widest font-semibold px-1">
            {section.title}
          </h4>
          <div className="space-y-1.5">
            {section.items.map((item) => (
              <AccentRow
                key={item.key}
                label={item.label}
                description={item.description}
                icon={item.icon}
                checked={getValue(item.key)}
                onChange={(v) => setAccentToggle(item.key, v)}
              />
            ))}
          </div>
        </div>
      ))}

      <p className="text-[10px] text-foreground/20 leading-relaxed px-1">
        Each toggle controls whether the accent color is used for that specific UI element.
        When disabled, elements use neutral/default colors.
        Some targets are enabled by default to match the original look.
      </p>
    </div>
  );
});

AccentSettings.displayName = 'AccentSettings';
export default AccentSettings;
