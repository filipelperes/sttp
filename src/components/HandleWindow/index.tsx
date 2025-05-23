import { useCallback, useEffect } from 'react';
import useAppStore from '../../stores/AppStore';

const ShouldOpenPalette = e => {
   const isEscape = e.code === "Escape";
   const hasModifier = e.ctrlKey || e.shiftKey || e.altKey || e.metaKey;
   const isPlainChar = !hasModifier && /^[\w ]$/.test(e.key);
   const isPaletteShortcut = e.ctrlKey && (
      (e.shiftKey && e.code === "KeyP") || e.code === "KeyK"
   );

   return {
      Key: isPlainChar ? e.key : null,
      shouldOpen: !isEscape && (isPlainChar || isPaletteShortcut),
      shouldIgnore: ["ScrollLock", "AltLeft", "AltRight", "ControlLeft", "ControlRight", "ShiftRight", "ShiftLeft", "CapsLock", "OsLeft", "OSRight", "Enter", "Backspace", "Meta", "MetaLeft", "F5", "R"].includes(e.code)
   };
};

const HandleWindow = () => {
   const OpenCommandPalette = useAppStore(s => s.OpenCommandPalette);

   const setAppState = useAppStore(s => s.setAppState);

   const handleKeyDown = useCallback((event) => {
      event.stopPropagation();
      const { Key, shouldOpen, shouldIgnore } = ShouldOpenPalette(event);
      if (shouldIgnore || OpenCommandPalette) return;
      if (shouldOpen) {
         event.preventDefault();
         setAppState({
            OpenCommandPalette: true,
            Key
         });
      };
   }, []);

   useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [handleKeyDown]);

   return null;
};

HandleWindow.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "HandleWindow",
};
export default HandleWindow;