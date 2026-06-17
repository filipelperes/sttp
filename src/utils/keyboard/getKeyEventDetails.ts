type IgetKeyEventDetails = {
  key: string | null;
  isEscape: boolean;
  hasModifier: boolean;
  isPlainChar: boolean;
  isCommandPaletteShortcut: boolean;
  isSpecialKey: boolean;
  shouldOpen: boolean;
};

const specialKeysToIgnore = [
  'ScrollLock', 'AltLeft', 'AltRight', 'ControlLeft', 'ControlRight',
  'ShiftRight', 'ShiftLeft', 'CapsLock', 'OsLeft', 'OSRight', 'Enter',
  'Backspace', 'Meta', 'MetaLeft', 'F5', 'R',
] as const;

const getKeyEventDetails = (event: KeyboardEvent): IgetKeyEventDetails => {
  const isEscape = event.code === 'Escape';
  const hasModifier = event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
  const isPlainChar = !hasModifier && /^[\w ]$/.test(event.key);
  const key = isPlainChar ? event.key : null;
  const isCommandPaletteShortcut = event.ctrlKey && (
    (event.shiftKey && event.key.toLowerCase() === 'p') || event.key.toLowerCase() === 'k'
  );
  const shouldOpen = !isEscape && (isPlainChar || isCommandPaletteShortcut);
  const isSpecialKey = specialKeysToIgnore.includes(event.code as typeof specialKeysToIgnore[number]);

  return {
    key, isEscape, hasModifier, isPlainChar,
    isCommandPaletteShortcut, isSpecialKey, shouldOpen,
  };
};

export default getKeyEventDetails;
