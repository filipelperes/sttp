import { useCallback, useEffect } from 'react';
import { getKeyEventDetails } from '@/utils/keyboard';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';

const HandleWindow = () => {
  const setCommandPaletteState = useCommandPaletteStore(s => s.setCommandPaletteState);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.stopPropagation();
    const { isSpecialKey, shouldOpen, key } = getKeyEventDetails(event);
    const { Show } = useCommandPaletteStore.getState();
    if (isSpecialKey || Show) return;
    if (shouldOpen) {
      event.preventDefault();
      setCommandPaletteState({ Show: true, Key: key });
    }
  }, [setCommandPaletteState]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return null;
};

export default HandleWindow;
