import { useContext, useEffect, useRef, type RefObject } from 'react';
import { SearchContext } from '../../utils/SearchProvider/Context';
import './style.css';
import { ParsedInputActions, SelectedIdxActions } from '../../utils/SearchProvider/Actions';
import { Icon } from '../Icon';
import Text from '../Text';
import { parse } from '../../utils/utils';

const SearchAutoComplete = ({ searchInputRef }: { searchInputRef: RefObject<HTMLTextAreaElement | null>; }) => {
   const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
   const { searchState, setSearchState } = useContext(SearchContext);
   const { parsedInput, selectedIdx } = searchState;
   const { suggestions: s } = parsedInput;
   const { suggestions, matched } = s;

   useEffect(() => {
      setSearchState({
         type: SelectedIdxActions.SET,
         payload: Math.min(suggestions.length - 1, selectedIdx)
      });

      itemRefs.current?.[selectedIdx]?.scrollIntoView({
         behavior: "smooth",
         block: "nearest",
         inline: "center"
      });
   }, [suggestions, selectedIdx, setSearchState]);

   const onClick = (name) => {
      searchInputRef.current.value = name;
      setSearchState({ type: ParsedInputActions.SET_PARSED, payload: parse(name) });
      setSearchState({ type: SelectedIdxActions.RESET });
      parsedInput.all.some(([, { name }]) => new RegExp(`^${name}([:/]*)?`, 'i').test(searchInputRef.current.value) && searchInputRef.current.value.length >= name.length)
         ? searchInputRef.current?.style.setProperty("margin-left", "6.0625rem")
         : searchInputRef.current?.style.removeProperty("margin-left");
      searchInputRef.current.focus();
   };

   const onMouseEnter = (i) => itemRefs.current?.[i]?.style.setProperty("background-color", i === selectedIdx ? "transparent" : "rgba(255, 255, 255, 0.26)");

   const onMouseLeave = (i) => itemRefs.current?.[i]?.style.removeProperty("background-color");

   return (
      <>
         {matched &&
            <ul id="SearchAutoComplete-Wrapper">
               {suggestions.map(([, { name, icon }], i) => (
                  <li
                     ref={(el) => itemRefs.current[i] = el}
                     key={name}
                     id={`suggestion-${i}`}
                     className={`${i === selectedIdx && "selected"} d-flex justify-center align-middle`}
                     onClick={() => onClick(name)}
                     onMouseEnter={() => onMouseEnter(i)}
                     onMouseLeave={() => onMouseLeave(i)}
                  >
                     <Icon name={name} icon={icon} />
                     <Text name={name} value={parsedInput.value} />
                  </li>
               ))}
            </ul>
         }
      </>
   );
};

export default SearchAutoComplete;