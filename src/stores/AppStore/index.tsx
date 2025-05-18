import { create } from "zustand";

type State = {
   focusSearchInput: boolean;
};

type Actions = {
   setFocusSearchInput: (focusSearchInput: boolean) => void;
};

export const useAppStore = create<State & Actions>((set) => ({
   focusSearchInput: false,

   setFocusSearchInput: (focusSearchInput) => set({ focusSearchInput }),
}));
