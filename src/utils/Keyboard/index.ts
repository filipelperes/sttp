type IgetKeyEventDetails = {
   key: string | null;
   isEscape: boolean;
   hasModifier: boolean;
   isPlainChar: boolean;
   isCommandPaletteShortcut: boolean;
   isSpecialKey: boolean;
   shouldOpen: boolean;
};

const getKeyEventDetails = (event: KeyboardEvent): IgetKeyEventDetails => {
   const isEscape = event.code === "Escape";
   const hasModifier = event.ctrlKey || event.shiftKey || event.altKey || event.metaKey;
   const isPlainChar = !hasModifier && /^[\w ]$/.test(event.key);
   const key = isPlainChar ? event.key : null;
   const isCommandPaletteShortcut = event.ctrlKey && (
      (event.shiftKey && event.key === "P") || event.key === "K"
   );
   const shouldOpen = !isEscape && (isPlainChar || isCommandPaletteShortcut);

   const specialKeysToIgnore = [
      "ScrollLock", "AltLeft", "AltRight", "ControlLeft", "ControlRight",
      "ShiftRight", "ShiftLeft", "CapsLock", "OsLeft", "OSRight", "Enter",
      "Backspace", "Meta", "MetaLeft", "F5", "R"
   ];
   const isSpecialKey = specialKeysToIgnore.includes(event.code);

   return {
      key,
      isEscape,
      hasModifier,
      isPlainChar,
      isCommandPaletteShortcut,
      isSpecialKey,
      shouldOpen
   };
};

export default getKeyEventDetails;