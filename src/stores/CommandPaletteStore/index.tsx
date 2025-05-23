import { create } from "zustand";
import type { RefObject } from "react";
import type { IParsedInput } from "../../utils/types/ParsedInput";
import { devtools, subscribeWithSelector } from "zustand/middleware";

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

type ICommandPaletteStoreState = {
   ParsedInput: IParsedInput;
   SelectedIdx: number;
   CommandPaletteInputRef: RefObject<HTMLTextAreaElement>;
   BodyColor: string;
};

type ICommandPaletteStoreActions = {
   setParsedInput: (ParsedInput: IParsedInput) => void;
   setSelectedIdx: (SelectedIdx: number) => void;
   setCommandPaletteState: (state: Partial<ICommandPaletteStoreState>) => void;
   setBodyColor: (BodyColor: string) => void;
};

export type ICommandPaletteStore = ICommandPaletteStoreState & ICommandPaletteStoreActions;

const useCommandPaletteStore = create<ICommandPaletteStore>()(
   devtools(
      subscribeWithSelector(
         set => ({
            ParsedInput: initialParsedInputState,
            SelectedIdx: 0,
            CommandPaletteInputRef: { current: null },
            BodyColor: "#d4d4d4",

            setParsedInput: (ParsedInput) => set({ ParsedInput }),
            setSelectedIdx: (SelectedIdx) => set({ SelectedIdx }),
            setBodyColor: (BodyColor) => set({ BodyColor }),
            setCommandPaletteState: (state) => set(state),
         })
      )
   )
);

export default useCommandPaletteStore;

export const CommandPaletteStoreSelector = (s: ReturnType<typeof useCommandPaletteStore.getState>) => ({
   CommandPaletteInputRef: s.CommandPaletteInputRef,
   ParsedInput: s.ParsedInput,
   SelectedIdx: s.SelectedIdx,
   BodyColor: s.BodyColor,
   setParsedInput: s.setParsedInput,
   setSelectedIdx: s.setSelectedIdx,
   setBodyColor: s.setBodyColor,
   setCommandPaletteState: s.setCommandPaletteState,
});

useCommandPaletteStore.subscribe(
   (s) => s.ParsedInput.suggestions.matched,
   (matched) => { document.body.classList.toggle("opened", matched); }
);
