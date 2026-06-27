import { memo, useCallback, useEffect } from 'react';
import { getKeyEventDetails } from '@/utils/keyboard';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';
import useSwipeGesture from '@/CommandPalette/hooks/useSwipeGesture';

const HandleWindow = memo(() => {
  const setCommandPaletteState = useCommandPaletteStore(s => s.setCommandPaletteState);
  const setShow = useCommandPaletteStore(s => s.setShow);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const { isSpecialKey, shouldOpen, key } = getKeyEventDetails(event);
    const { Show } = useCommandPaletteStore.getState();
    if (isSpecialKey || Show) return;

    // Don't open the command palette when the user is typing inside an input,
    // textarea, or contenteditable element (e.g. search bars in settings).
    const activeEl = document.activeElement;
    const isFormField =
      activeEl?.tagName === 'INPUT' ||
      activeEl?.tagName === 'TEXTAREA' ||
      (activeEl instanceof HTMLElement && activeEl.isContentEditable);
    if (isFormField) return;

    if (shouldOpen) {
      event.preventDefault();
      setCommandPaletteState({ Show: true, Key: key });
    }
  }, [setCommandPaletteState]);

  const handleSwipeDown = useCallback(() => {
    const { Show } = useCommandPaletteStore.getState();
    if (!Show) {
      setShow(true);
    }
  }, [setShow]);

  useSwipeGesture({ onSwipeDown: handleSwipeDown });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return null;
});

HandleWindow.displayName = 'HandleWindow';
export default HandleWindow;
