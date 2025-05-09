import type { IParsedInput } from "../../utils/types/ParsedInput";
import { ParsedInputActions, SelectedIdxActions, type IParsedInputActions, type ISelectedIdxActions } from "./Actions";
import { initialParsedInputState } from "./State";

export const ParsedInputReducer = (
   state: IParsedInput,
   action: { type: IParsedInputActions; payload?: IParsedInput; }
): IParsedInput => {
   switch (action.type) {
      case ParsedInputActions.SET_PARSED: return action.payload;
      case ParsedInputActions.RESET_PARSED: return initialParsedInputState;
      default: return state;
   }
};

export const SelectedIdxReducer = (
   state: number,
   action: { type: ISelectedIdxActions, payload?: number; }
): number => {
   switch (action.type) {
      case SelectedIdxActions.SET: return action.payload;
      case SelectedIdxActions.RESET: return 0;
      case SelectedIdxActions.NEXT: return state + 1;
      case SelectedIdxActions.PREV: return state - 1;
      default: return state;
   }
};