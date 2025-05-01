export type ISearchInputActions = keyof typeof SearchInputActions;

export const SearchInputActions = {
   SHOW: "SHOW",
   HIDE: "HIDE",
   TOGGLE: "TOGGLE"
} as const;
