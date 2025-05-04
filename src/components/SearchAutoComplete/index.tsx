import { useContext, useEffect } from 'react';
import { SearchContext } from '../../utils/SearchProvider/Context';
import './style.css';
import { SelectedIdxActions } from '../../utils/SearchProvider/Actions';
import { Icon } from '../Icon';
import Text from '../Text';

const SearchAutoComplete = () => {
   const { searchState, setSearchState } = useContext(SearchContext);
   const { parsedInput, selectedIdx } = searchState;
   const { suggestions: s } = parsedInput;
   const { suggestions, matched } = s;

   useEffect(() => {
      setSearchState({
         type: SelectedIdxActions.SET,
         payload: Math.min(suggestions.length - 1, selectedIdx)
      });

      document.getElementById(`suggestion-${selectedIdx}`)?.scrollIntoView({
         behavior: "smooth",
         block: "nearest",
         inline: "center"
      });
   }, [suggestions, selectedIdx, setSearchState]);

   return (
      <>
         {matched &&
            <ul id="SearchAutoComplete-Wrapper">
               {suggestions.map(([, { name, icon }], i) => (
                  <li
                     key={name}
                     id={`suggestion-${i}`}
                     className={`${i === selectedIdx ? "selected" : ""} d-flex justify-center align-middle`}
                  >
                     <Icon name={name} icon={icon} />
                     <p><Text name={name} value={parsedInput.value} /></p>
                  </li>
               ))}
            </ul>
         }
      </>
   );
};

export default SearchAutoComplete;