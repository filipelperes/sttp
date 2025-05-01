export type IParsedInputActions = keyof typeof ParsedInputActions;

export const ParsedInputActions = {
   SET_PARSED: "SET_PARSED",
   RESET_PARSED: "RESET_PARSED",
} as const;

export type ISelectedIdxActions = keyof typeof SelectedIdxActions;

export const SelectedIdxActions = {
   SET: "SET",
   RESET: "RESET",
   NEXT: "NEXT",
   PREV: "PREV"
} as const;