import { useContext, useEffect, useRef, type RefObject } from 'react';
import { CommandPaletteContext } from '../../providers/CommandPaletteProvider/Context';
import './style.css';
import { ParsedInputActions, SelectedIdxActions } from '../../providers/CommandPaletteProvider/Actions';
import { Icon } from '../Icon';
import Text from '../Text';
import { parse, setTheme } from '../CommandPalette/utils';

const CommandPaletteAutoComplete = ({ CommandPaletteInputRef }: { CommandPaletteInputRef: RefObject<HTMLTextAreaElement | null>; }) => {
   const suggestionsRef = useRef<(HTMLLIElement | null)[]>([]);
   const { CommandPaletteState, setCommandPaletteState } = useContext(CommandPaletteContext);
   const { parsedInput, selectedIdx } = CommandPaletteState;
   const { suggestions: s, all } = parsedInput;
   const { suggestions } = s;

   useEffect(() => {
      setCommandPaletteState({
         type: SelectedIdxActions.SET,
         payload: Math.max(0, Math.min(suggestions.length - 1, selectedIdx))
      });

      suggestionsRef.current?.[selectedIdx]?.scrollIntoView({
         behavior: "smooth",
         block: "nearest",
         inline: "center"
      });
   }, [suggestions, selectedIdx, setCommandPaletteState]);

   const onClick = event => {
      const value = event.currentTarget.dataset.name;
      CommandPaletteInputRef.current.value = value;

      setCommandPaletteState({ type: ParsedInputActions.SET_PARSED, payload: parse(value) });
      setCommandPaletteState({ type: SelectedIdxActions.RESET });

      CommandPaletteInputRef.current && all.some(([, { name }]) =>
         value.toLowerCase().includes(name.toLowerCase()) && value.length > name.length
      )
         ? CommandPaletteInputRef.current.style.setProperty("margin-left", "5rem")
         : CommandPaletteInputRef.current.style.removeProperty("margin-left");

      CommandPaletteInputRef.current.focus();
   };

   return (
      <>
         <ul
            id="CommandPaletteAutoComplete"
            style={{ top: CommandPaletteInputRef.current?.getBoundingClientRect().height + 45 }}
         >
            {suggestions.map(([, { name, icon, style }], i) => {
               const fill = style?.backgroundColor || null;
               return (
                  <li
                     ref={el => { suggestionsRef.current[i] = el; }}
                     data-name={name}
                     id={`suggestion-${i}`}
                     className={`${i === selectedIdx && "selected"} d-flex justify-center align-middle`}
                     onClick={onClick}
                     onMouseEnter={() => setTheme(style)}
                     onMouseLeave={() => setTheme(suggestions?.[selectedIdx]?.[1]?.style)}
                  >
                     <Icon name={name} icon={icon} fill={fill} style={style} />
                     <Text name={name} value={parsedInput.value} />
                  </li>
               );
            })}
         </ul>
      </>
   );
};

export default CommandPaletteAutoComplete;