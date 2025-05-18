import { useCallback, useEffect } from 'react';
import { useAppStore } from '../../stores/AppStore';

const HandleWindow = () => {
   const focusSearchInput = useAppStore(s => s.focusSearchInput);

   const setFocusSearchInput = useAppStore(s => s.setFocusSearchInput);

   const handleKeyDown = useCallback((event) => {
      event.stopPropagation();
      const ignore = ["ScrollLock", "AltLeft", "AltRight", "ControlLeft", "ControlRight", "ShiftRight", "ShiftLeft", "CapsLock", "OsLeft", "OSRight", "Enter", "Backspace", "Meta", "MetaLeft", "F5", "R"];
      if (ignore.includes(event.code)) return;
      if (
         (!(["Escape"].includes(event.code) || (event.ctrlKey && event.shiftKey && event.code === "KeyR"))) ||
         (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab"].includes(event.code) && !focusSearchInput)
      ) setFocusSearchInput(true);
   }, []);

   useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [handleKeyDown]);

   return null;
};

export default HandleWindow;