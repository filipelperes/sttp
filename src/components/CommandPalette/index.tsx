import { useEffect } from 'react';
import CommandPaletteAutoComplete from '../CommandPaletteAutoComplete';
import './style.css';
import CommandPaletteInput from '../CommandPaletteInput';
import { useStoreContext } from '../../providers/StoreProvider/Context';
import { useCommandPaletteContext } from '../../providers/CommandPaletteProvider/Context';
import { ParsedInputActions, SelectedIdxActions } from '../../providers/CommandPaletteProvider/Actions';
import { setTheme } from './utils';

const CommandPalette = () => {
   const { storeState } = useStoreContext();
   const { CommandPaletteState, setCommandPaletteState, CommandPaletteInputRef } = useCommandPaletteContext();
   const { parsedInput, selectedIdx } = CommandPaletteState;
   const { suggestions, services } = parsedInput;

   setTheme(suggestions.suggestions[selectedIdx]?.[1]?.style || services.service?.[1]?.style);

   useEffect(() => {
      document.body.classList.toggle("focused", storeState.focusSearchInput);
      if (storeState.focusSearchInput) CommandPaletteInputRef.current?.focus();
      else {
         CommandPaletteInputRef.current?.blur();
         setCommandPaletteState({ type: ParsedInputActions.RESET_PARSED });
         setCommandPaletteState({ type: SelectedIdxActions.RESET });
      }
      return () => {
         document.body.style.removeProperty("background-image");
         document.body.style.removeProperty("background-color");
         document.body.style.removeProperty("color");
      };
   }, [storeState.focusSearchInput, setCommandPaletteState, CommandPaletteInputRef]);

   return (
      <div id="CommandPalette" className="d-flex column">
         <CommandPaletteInput />
         <CommandPaletteAutoComplete />
      </div>
   );

};

export default CommandPalette;
