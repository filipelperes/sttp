import { memo } from 'react';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';

interface IToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
  id?: string;
}

const ToggleSwitch = memo(({ checked, onChange, id }: IToggleSwitchProps) => {
  const accentOnToggles = useSettingsStore((s) => s.accentOnToggles);
  return (
    <button
      id={id}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
      className={`relative w-11 h-6 rounded-full transition-all duration-200 cursor-pointer focus-ring ${
        checked
          ? accentOnToggles
            ? 'bg-accent'
            : 'bg-foreground/20'
          : 'bg-muted hover:bg-muted-foreground/20'
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-200 ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';
export default ToggleSwitch;
