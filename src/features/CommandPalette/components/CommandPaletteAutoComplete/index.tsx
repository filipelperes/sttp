import { useCallback, useEffect, useRef } from 'react';
import useCommandPaletteStore, { CommandPaletteStoreSelector } from '@/CommandPalette/stores/CommandPaletteStore';
import { useShallow } from 'zustand/shallow';
import type { IService } from '@/types/Service';
import './style.css';
import useParsedInput from '@/CommandPalette/hooks/useParsedInput';
import SuggestionsListItem from '../SuggestionListItem';

const CommandPaletteAutoComplete = () => {
   const suggestionsRef = useRef<(HTMLLIElement | null)[]>([]);

   const { SelectedIdx, Value, CommandPaletteInputRef, setCommandPaletteState } = useCommandPaletteStore(useShallow(CommandPaletteStoreSelector));

   const { suggestions: s } = useParsedInput(Value);
   const { suggestions } = s;

   useEffect(() => {
      suggestionsRef.current?.[SelectedIdx]?.scrollIntoView({
         behavior: "smooth",
         block: "nearest",
         inline: "center"
      });
   }, [SelectedIdx]);

   const setRef = useCallback((el: HTMLLIElement | null, i: number) => (suggestionsRef.current[i] = el), []);

   return (
      <ul id="CommandPaletteAutoComplete" className='glass'>
         {suggestions.map(([, { name, icon, style }]: [string, IService], i: number) => (
            <SuggestionsListItem
               key={name}
               i={i}
               isSelected={i === SelectedIdx}
               name={name}
               icon={icon}
               style={style}
               setRef={setRef}
               CommandPaletteInputRef={CommandPaletteInputRef}
               setCommandPaletteState={setCommandPaletteState}
               SelectedIdx={SelectedIdx}
               value={Value}
            />
         ))}
      </ul>
   );
};

CommandPaletteAutoComplete.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "CommandPaletteAutoComplete",
};
export default CommandPaletteAutoComplete;