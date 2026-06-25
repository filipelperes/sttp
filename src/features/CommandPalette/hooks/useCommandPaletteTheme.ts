import { useLayoutEffect, useEffect } from 'react';
import { clearTheme, setTheme } from '@/CommandPalette/utils/CommandPalette';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';
import { commandPaletteInputRef } from '@/CommandPalette/utils/commandPaletteRef';
import type { IServiceStyle } from '@/types/Service';
import type { IParsedInput } from '@/CommandPalette/types/ParsedInput';

export const useBodyColor = () => {
  const setBodyColor = useCommandPaletteStore(s => s.setBodyColor);

  useLayoutEffect(() => {
    const bodyColor = getComputedStyle(document.body).color;
    setBodyColor(bodyColor);
  }, [setBodyColor]);
};

export const useThemeSync = (
  suggestions: IParsedInput['suggestions'],
  services: IParsedInput['services'],
  selectedIdx: number,
) => {
  useEffect(() => {
    if (suggestions.matched) {
      const themeStyle = (suggestions.suggestions[selectedIdx]?.[1]?.style as IServiceStyle | undefined)
        ?? services.service?.[1]?.style;
      setTheme(themeStyle);
    } else {
      clearTheme();
    }
  }, [suggestions, selectedIdx, services]);
};

export const useInputReset = (Key: string | null) => {
  const setValue = useCommandPaletteStore(s => s.setValue);
  const setCommandPaletteState = useCommandPaletteStore(s => s.setCommandPaletteState);

  useEffect(() => {
    const inputEl = commandPaletteInputRef.current;
    setValue(Key ?? '');
    inputEl?.focus?.();
    return () => {
      clearTheme();
      inputEl?.blur?.();
      setCommandPaletteState({ Value: '', SelectedIdx: 0 });
    };
  }, [Key, setValue, setCommandPaletteState]);
};
