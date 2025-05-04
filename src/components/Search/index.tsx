import { useContext } from 'react';
import SearchAutoComplete from '../SearchAutoComplete';
import './style.css';
import SearchInput from '../SearchInput';
import { StoreContext } from '../../StoreProvider/Context';
import { SearchProvider } from '../../utils/SearchProvider';

const Search = () => {
   const { storeState } = useContext(StoreContext);
   const { focusSearchInput } = storeState;

   return (
      <>
         {focusSearchInput &&
            (
               <div id="Search-Wrapper" className="d-flex column pos-relative">
                  <SearchProvider>
                     <SearchInput />
                     <SearchAutoComplete />
                  </SearchProvider>
               </div>
            )
         }
      </>

   );

};

export default Search;
