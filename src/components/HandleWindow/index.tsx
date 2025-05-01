import { useCallback, useContext, useEffect } from 'react';
import { StoreContext } from '../../StoreProvider/Context';
import { SearchInputActions } from '../../StoreProvider/Actions';

const HandleWindow = () => {
   const { storeState, setStoreState } = useContext(StoreContext);
   const { focusSearchInput } = storeState;

   const handleKeyDown = useCallback((event) => {
      event.stopPropagation();
      const ignore = ["ScrollLock", "AltLeft", "AltRight", "ControlLeft", "ControlRight", "ShiftRight", "ShiftLeft", "CapsLock", "OsLeft", "OSRight", "Enter", "Backspace", "Meta", "MetaLeft", "F5", "R"];
      if (ignore.includes(event.code)) return;
      if (
         (!(["Escape"].includes(event.code) || (event.ctrlKey && event.shiftKey && event.code === "KeyR"))) ||
         (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab"].includes(event.code) && !focusSearchInput)
      ) setStoreState({ type: SearchInputActions.SHOW });
   }, [focusSearchInput, setStoreState]);

   useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
   }, [handleKeyDown]);

   return null;
};

export default HandleWindow;