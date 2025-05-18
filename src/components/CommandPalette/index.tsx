import { useEffect } from 'react';
import CommandPaletteAutoComplete from '../CommandPaletteAutoComplete';
import './style.css';
import CommandPaletteInput from '../CommandPaletteInput';
import { parse, setTheme } from './utils';
import { useCommandPaletteStore } from '../../stores/CommandPaletteStore';
import { useAppStore } from '../../stores/AppStore';

const CommandPalette = () => {
   const focusSearchInput = useAppStore(s => s.focusSearchInput);

   const CommandPaletteInputRef = useCommandPaletteStore(s => s.CommandPaletteInputRef);
   const parsedInput = useCommandPaletteStore(s => s.parsedInput);
   const selectedIdx = useCommandPaletteStore(s => s.selectedIdx);

   const setParsedInput = useCommandPaletteStore(s => s.setParsedInput);
   const setSelectedIdx = useCommandPaletteStore(s => s.setSelectedIdx);

   const { suggestions, services, isEmpty } = parsedInput;

   !isEmpty && setTheme(suggestions.suggestions[selectedIdx]?.[1]?.style || services.service?.[1]?.style);

   useEffect(() => {
      document.body.classList.toggle("focused", focusSearchInput);
      if (focusSearchInput) CommandPaletteInputRef.current?.focus();
      else {
         CommandPaletteInputRef.current?.blur();
         setParsedInput(parse(""));
         setSelectedIdx(0);
      }
      return () => {
         document.body.style.removeProperty("background-image");
         document.body.style.removeProperty("background-color");
         document.body.style.removeProperty("color");
      };
   }, [focusSearchInput, CommandPaletteInputRef]);

   return (
      <div id="CommandPalette" className="d-flex column">
         <CommandPaletteInput />
         <CommandPaletteAutoComplete />
      </div>
   );

};

export default CommandPalette;
