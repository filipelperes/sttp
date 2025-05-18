import { useEffect, useRef } from 'react';
import './style.css';
import { Icon } from '../Icon';
import Text from '../Text';
import { parse, setTheme } from '../CommandPalette/utils';
import { useCommandPaletteStore } from '../../providers/CommandPaletteProvider';

const CommandPaletteAutoComplete = () => {
   const suggestionsRef = useRef<(HTMLLIElement | null)[]>([]);
   const parsedInput = useCommandPaletteStore(s => s.parsedInput);
   const selectedIdx = useCommandPaletteStore(s => s.selectedIdx);
   const CommandPaletteInputRef = useCommandPaletteStore(s => s.CommandPaletteInputRef);
   const setParsedInput = useCommandPaletteStore(s => s.setParsedInput);
   const setSelectedIdx = useCommandPaletteStore(s => s.setSelectedIdx);
   const { suggestions: s, services, isEmpty } = parsedInput;
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
      setParsedInput(parse(value));
      setSelectedIdx(Math.max(0, Math.min(suggestions.length - 1, selectedIdx)));
      CommandPaletteInputRef.current.focus();
   };

   return (
      <>
         {(!isEmpty || matched) && <ul id="CommandPaletteAutoComplete">
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
         }
      </>
   );
};

export default CommandPaletteAutoComplete;