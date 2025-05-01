import { useReducer, type ReactNode } from "react";
import { ParsedInputReducer, SelectedIdxReducer } from "./Reducer";
import { initialParsedInputState, initialSelectedIdx } from "./State";
import { SearchContext } from "./Context";
import type { IParsedInput } from "../types/ParsedInput";
import { ParsedInputActions, SelectedIdxActions, type IParsedInputActions, type ISelectedIdxActions } from "./Actions";

export type IRootState = {
   parsedInput: IParsedInput;
   selectedIdx: number;
};

const initialState: IRootState = {
   parsedInput: initialParsedInputState,
   selectedIdx: initialSelectedIdx.selectedIdx
};

export type IRootAction = {
   type: IParsedInputActions | ISelectedIdxActions;
   payload?: IParsedInput | number;
};

const isParsedInputAction = (action: IRootAction): action is { type: IParsedInputActions; payload?: IParsedInput; } => Object.values(ParsedInputActions).includes(action.type as IParsedInputActions);
const isSelectedIdxAction = (action: IRootAction): action is { type: ISelectedIdxActions; payload?: number; } => Object.values(SelectedIdxActions).includes(action.type as ISelectedIdxActions);


const RootReducer = (state: IRootState, action: IRootAction): IRootState => {
   return {
      parsedInput: isParsedInputAction(action) ? ParsedInputReducer(state.parsedInput, action as { type: IParsedInputActions; payload?: IParsedInput; }) : state.parsedInput,
      selectedIdx: isSelectedIdxAction(action) ? SelectedIdxReducer(state.selectedIdx, action as { type: ISelectedIdxActions; payload?: number; }) : state.selectedIdx
   };
};

export const SearchProvider = ({ children }: { children: ReactNode; }) => {
   const [searchState, setSearchState] = useReducer(RootReducer, initialState);

   return (
      <SearchContext.Provider value={{ searchState, setSearchState }}>
         {children}
      </SearchContext.Provider>
   );
};
