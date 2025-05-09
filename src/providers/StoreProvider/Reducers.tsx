import { SearchInputActions, type ISearchInputActions } from "./Actions";

export const SearchInputReducer = (
   state: boolean,
   action: { type: ISearchInputActions; }
): boolean => {
   switch (action.type) {
      case SearchInputActions.SHOW: return true;
      case SearchInputActions.HIDE: return false;
      case SearchInputActions.TOGGLE: return !state;
      default: return state;
   }
};