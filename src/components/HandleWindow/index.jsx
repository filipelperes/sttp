import { useEffect } from 'react';
import { services } from '../../utils/patterns';

const HandleWindow = ({ setFocus, focus, setSuggestions }) => {
   const handleKeyDown = (event) => {
      event.stopPropagation();
      const ignore = ["ScrollLock", "AltLeft", "AltRight", "ControlLeft", "ControlRight", "ShiftRight", "ShiftLeft", "CapsLock", "OsLeft", "OSRight", "Enter", "Backspace", "Meta", "MetaLeft", "F5", "R"];
      if (ignore.includes(event.code)) return;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Tab"].includes(event.code) && !focus) {
         event.preventDefault();
         setSuggestions(Object.entries(services).filter(([name]) => !["check_if_url_with_http", "check_if_url_without_http", "check_if_ip"].includes(name)));
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