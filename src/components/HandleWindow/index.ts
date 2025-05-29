import { useCallback, useEffect } from 'react';
import getKeyEventDetails from '@/utils/Keyboard';
import useCommandPaletteStore from '@/CommandPalette/stores/CommandPaletteStore';

const HandleWindow = () => {
   const Show = useCommandPaletteStore(s => s.Show);
   const setCommandPaletteState = useCommandPaletteStore(s => s.setCommandPaletteState);

   const handleKeyDown = useCallback((event: KeyboardEvent) => {
      event.stopPropagation();
      const { isSpecialKey, shouldOpen, key: Key } = getKeyEventDetails(event);
      if (isSpecialKey || Show) return;
      if (shouldOpen) {
         event.preventDefault();
         setCommandPaletteState({
            Show: true,
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