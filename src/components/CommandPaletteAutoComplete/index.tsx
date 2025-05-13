import { useEffect, useRef } from 'react';
import { useCommandPaletteContext } from '../../providers/CommandPaletteProvider/Context';
import './style.css';
import { ParsedInputActions, SelectedIdxActions } from '../../providers/CommandPaletteProvider/Actions';
import { Icon } from '../Icon';
import Text from '../Text';
import { parse, setTheme } from '../CommandPalette/utils';

const CommandPaletteAutoComplete = () => {
   const suggestionsRef = useRef<(HTMLLIElement | null)[]>([]);
   const { CommandPaletteState, setCommandPaletteState, CommandPaletteInputRef } = useCommandPaletteContext();
   const { parsedInput, selectedIdx } = CommandPaletteState;
   const { suggestions: s, services } = parsedInput;
   const { suggestions, matched } = s;

   useEffect(() => { document.body.classList.toggle("show-suggestions", matched); }, [matched]);
   useEffect(() => {
      suggestionsRef.current?.[selectedIdx]?.scrollIntoView({
         behavior: "smooth",
         block: "nearest",
         inline: "center"
      });
   }, [selectedIdx]);


   const onClick = event => {
      const value = event.currentTarget.dataset.name;
      CommandPaletteInputRef.current.value = value;

      setCommandPaletteState({ type: ParsedInputActions.SET_PARSED, payload: parse(value) });
      setCommandPaletteState({ type: SelectedIdxActions.RESET });

      CommandPaletteInputRef.current.focus();
   };

   return (
      <ul id="CommandPaletteAutoComplete">
         {suggestions.map(([, { name, icon, style }], i) => {
            return (
               <li
                  ref={el => { suggestionsRef.current[i] = el; }}
                  data-name={name}
                  key={name}
                  id={`suggestion-${i}`}
                  className={`${i === selectedIdx && "selected"} d-flex justify-center align-middle`}
                  onClick={onClick}
                  onMouseEnter={() => setTheme(style)}
                  onMouseLeave={() => setTheme(suggestions[selectedIdx]?.[1]?.style || services.service?.[1]?.style)}
               >
                  <Icon icon={icon} fill={style?.backgroundColor} style={style} />
                  <Text name={name} value={parsedInput.value} />
               </li>
            );
         })}
      </ul>
   );
};

export default CommandPaletteAutoComplete;