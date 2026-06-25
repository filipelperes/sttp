import { memo } from 'react';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import { useAccentSettingsStore } from '@/features/Settings/stores/settings';
import { useTheme } from '@/features/Settings/hooks/useTheme';

const QuickThemeToggle = memo(() => {
  const { theme, toggleTheme } = useTheme();
  const accentOnIcons = useAccentSettingsStore((s) => s.accentOnIcons);

  const iconColor = accentOnIcons ? 'text-accent/70 hover:text-accent' : 'text-foreground/60 hover:text-foreground';

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`fixed top-5 right-5 z-50 flex items-center justify-center w-11 h-11 rounded-full glass cursor-pointer transition-all duration-200 hover:scale-110 focus-ring ${iconColor}`}
    >
      {theme === 'dark' ? <IoSunnyOutline size={20} /> : <IoMoonOutline size={20} />}
    </button>
  );
});

QuickThemeToggle.displayName = 'QuickThemeToggle';
export default QuickThemeToggle;
