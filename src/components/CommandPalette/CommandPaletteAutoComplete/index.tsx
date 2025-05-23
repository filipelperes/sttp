import { useCallback, useEffect, useRef } from 'react';
import './style.css';
import Icon from '../../Icon';
import Text from '../../Text';
import { parse, setTheme } from '../utils';
import useCommandPaletteStore, { CommandPaletteStoreSelector } from '../../../stores/CommandPaletteStore';
import { useShallow } from 'zustand/shallow';

const CommandPaletteAutoComplete = () => {
   const suggestionsRef = useRef<(HTMLLIElement | null)[]>([]);

   const { CommandPaletteInputRef, SelectedIdx, ParsedInput, setCommandPaletteState } = useCommandPaletteStore(useShallow(CommandPaletteStoreSelector));

   const { suggestions: s, services, value } = ParsedInput;
   const { suggestions } = s;

   useEffect(() => {
      suggestionsRef.current?.[SelectedIdx]?.scrollIntoView({
         behavior: "smooth",
         block: "nearest",
         inline: "center"
      });
   }, [SelectedIdx]);

   const onClick = event => {
      const value = event.currentTarget.dataset.name;
      setCommandPaletteState({
         ParsedInput: parse(value),
         SelectedIdx: Math.max(0, Math.min(suggestions.length - 1, SelectedIdx))
      });
      CommandPaletteInputRef.current.value = value;
      CommandPaletteInputRef.current.focus();
   };

   const onMouserEnter = useCallback(style => () => setTheme(style), []);

   const onMouserLeave = useCallback(() => setTheme(suggestions[SelectedIdx]?.[1]?.style || services.service?.[1]?.style), [SelectedIdx, suggestions, services]);

   const setRef = useCallback((el, i) => (suggestionsRef.current[i] = el), []);

   return (
      <ul id="CommandPaletteAutoComplete" className='glass'>
         {suggestions.map(([, { name, icon, style }], i) => {
            return (
               <li
                  ref={el => setRef(el, i)}
                  data-name={name}
                  key={name}
                  id={`suggestion-${i}`}
                  className={`${i === SelectedIdx ? "selected " : ""}d-flex justify-center align-middle`}
                  onClick={onClick}
                  onMouseEnter={onMouserEnter(style)}
                  onMouseLeave={onMouserLeave}
               >
                  <Icon icon={icon} fill={style?.backgroundColor} style={style} />
                  <Text name={name} value={value} />
               </li>
            );
         })}
      </ul>
   );
};

CommandPaletteAutoComplete.whyDidYouRender = {
   logOnDifferentValues: true,
   customName: "CommandPaletteAutoComplete",
};
export default CommandPaletteAutoComplete;