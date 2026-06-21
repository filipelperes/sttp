import { memo, useCallback } from 'react';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';

const QuickThemeToggle = memo(() => {
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const accentOnIcons = useSettingsStore((s) => s.accentOnIcons);

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const iconColor = accentOnIcons ? 'text-accent/70 hover:text-accent' : 'text-foreground/60 hover:text-foreground';

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`fixed top-5 right-5 z-50 flex items-center justify-center w-11 h-11 rounded-full glass cursor-pointer transition-all duration-200 hover:scale-110 focus-ring ${iconColor}`}
    >
      {theme === 'dark' ? <IoSunnyOutline size={20} /> : <IoMoonOutline size={20} />}
    </button>
  );
});

QuickThemeToggle.displayName = 'QuickThemeToggle';
export default QuickThemeToggle;
