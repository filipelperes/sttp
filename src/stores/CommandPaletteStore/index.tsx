import { create } from "zustand";
import type { IParsedInput } from "../../utils/types/ParsedInput";
import type { RefObject } from "react";

const initialParsedInputState: IParsedInput = {
   value: "",
   isIP: false,
   isStrictURL: false,
   isPartialURL: false,
   slash: false,
   collon: false,
   isEmpty: true,
   all: [],
   suggestions: {
      matched: false,
      suggestions: []
   },
   services: {
      matched: false,
      filtered: []
   }
};

type State = {
   parsedInput: IParsedInput;
   selectedIdx: number;
   CommandPaletteInputRef: RefObject<HTMLTextAreaElement>;
};

type Actions = {
   setParsedInput: (parsed: IParsedInput) => void;
   setSelectedIdx: (selectedIdx: number) => void;
};

export const useCommandPaletteStore = create<State & Actions>((set) => ({
   parsedInput: initialParsedInputState,
   selectedIdx: 0,
   CommandPaletteInputRef: { current: null },

   setParsedInput: (parsedInput) => set({ parsedInput }),
   setSelectedIdx: (selectedIdx) => set({ selectedIdx }),
}));
