import { useEffect } from 'react';
import { services } from '../../utils/patterns';
import { Suggestions } from '../../utils/types/Suggestion';

type HandleWindowProps = {
   setFocus: React.Dispatch<React.SetStateAction<boolean>>;
   focus: boolean;
   setSuggestions: React.Dispatch<React.SetStateAction<Suggestions>>;
};

const HandleWindow: React.FC<HandleWindowProps> = ({ setFocus, focus, setSuggestions }) => {
   const handleKeyDown = (event) => {
      event.stopPropagation();
      const ignore = ["ScrollLock", "AltLeft", "AltRight", "ControlLeft", "ControlRight", "ShiftRight", "ShiftLeft", "CapsLock", "OsLeft", "OSRight", "Enter", "Backspace", "Meta", "MetaLeft", "F5", "R"];
      if (ignore.includes(event.code)) return;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab"].includes(event.code) && !focus) {
         event.preventDefault();
         setSuggestions(Object.entries(services));
      }
      setFocus(!(["Escape"].includes(event.code) || (event.ctrlKey && event.shiftKey && event.code === "KeyR")));
   };

   useEffect(() => {
      window.addEventListener("keydown", handleKeyDown);
      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, []);

   return null;
};

export default HandleWindow;