import { memo, useCallback } from 'react';
import { IoSunnyOutline, IoMoonOutline } from 'react-icons/io5';
import useSettingsStore from '@/features/Settings/stores/SettingsStore';

const ThemeToggle = memo(() => {
  const theme = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);

  const toggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  return (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="flex items-center gap-2 px-3 py-2 rounded-lg glass text-sm text-foreground/80 hover:text-foreground cursor-pointer transition-all duration-200 focus-ring"
    >
      {theme === 'dark' ? <IoSunnyOutline size={18} /> : <IoMoonOutline size={18} />}
      <span className="capitalize">{theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
    </button>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
export default ThemeToggle;
