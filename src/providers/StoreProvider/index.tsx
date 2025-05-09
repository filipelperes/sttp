import { useReducer, type ReactNode } from "react";
import type { ISearchInputActions } from "./Actions";
import { SearchInputReducer } from "./Reducers";
import { initialSearchInputState, type ISearchInputState } from "./States";
import { StoreContext } from "./Context";

export type IRootState = {
   focusSearchInput: ISearchInputState["focusSearchInput"];
};

const initialState: IRootState = {
   focusSearchInput: initialSearchInputState.focusSearchInput,
   //others
};

export type IRootAction = {
   type: ISearchInputActions; // | OTHERACTION
};

const RootReducer = (state: IRootState, action: IRootAction): IRootState => {
   return {
      focusSearchInput: SearchInputReducer(state.focusSearchInput, action),
      //toggle: toggleReducer(state.toggle, action as any),
   };
};

const StoreProvider = ({ children }: { children: ReactNode; }) => {
   const [storeState, setStoreState] = useReducer(RootReducer, initialState);

   return (
      <StoreContext.Provider value={{ storeState, setStoreState }}>
         {children}
      </StoreContext.Provider>
   );
};

export default StoreProvider;
