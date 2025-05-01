import { createContext, useContext, type Dispatch } from "react";
import type { IRootAction, IRootState } from ".";

type ISearchContext = {
   searchState: IRootState;
   setSearchState: Dispatch<IRootAction>;
};

export const SearchContext = createContext<ISearchContext | undefined>(undefined);
export const useSearchContext = () => useContext(SearchContext);