import { useContext, useRef } from 'react';
import SearchAutoComplete from '../SearchAutoComplete';
import './style.css';
import SearchInput from '../SearchInput';
import { StoreContext } from '../../StoreProvider/Context';
import { SearchProvider } from '../../utils/SearchProvider';

const Search = () => {
   const { storeState } = useContext(StoreContext);
   const searchInputRef = useRef<HTMLTextAreaElement | null>(null);
   const { focusSearchInput } = storeState;

   return (
      <>
         {focusSearchInput &&
            (
               <div id="Search-Wrapper" className="d-flex column">
                  <SearchProvider>
                     <SearchInput searchInputRef={searchInputRef} />
                     <SearchAutoComplete searchInputRef={searchInputRef} />
                  </SearchProvider>
               </div>
            )
         }
      </>

   );

};

export default Search;
