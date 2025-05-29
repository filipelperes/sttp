import { create } from "zustand";
import type { RefObject } from "react";
import { devtools, subscribeWithSelector } from "zustand/middleware";

type ICommandPaletteStoreState = {
   CommandPaletteInputRef: RefObject<HTMLTextAreaElement | null>;
   Value: string;
   BodyColor: string;
   SelectedIdx: number;
   IsScroll: boolean;
   Show: boolean;
   Key: string | null;
};

type ICommandPaletteStoreActions = {
   setValue: (Value: string) => void;
   setSelectedIdx: (SelectedIdx: number) => void;
   setBodyColor: (BodyColor: string) => void;
   setIsScroll: (IsScroll: boolean) => void;
   setShow: (Show: boolean) => void;
   setKey: (Key: string) => void;
   setCommandPaletteState: (state: Partial<ICommandPaletteStoreState>) => void;
};

type ICommandPaletteStore = ICommandPaletteStoreState & ICommandPaletteStoreActions;

const useCommandPaletteStore = create<ICommandPaletteStore>()(
   devtools(
      subscribeWithSelector(
         set => ({
            Value: "",
            SelectedIdx: 0,
            CommandPaletteInputRef: { current: null },
            BodyColor: "#d4d4d4",
            IsScroll: false,
            Show: false,
            Key: null,

            setValue: (Value) => set({ Value }),
            setSelectedIdx: (SelectedIdx) => set({ SelectedIdx }),
            setBodyColor: (BodyColor) => set({ BodyColor }),
            setIsScroll: (IsScroll) => set({ IsScroll }),
            setShow: (Show) => set({ Show }),
            setKey: (Key) => set({ Key }),
            setCommandPaletteState: (state) => set(state),
         })
      )
   )
);

const CommandPaletteStoreSelector = (s: ReturnType<typeof useCommandPaletteStore.getState>) => ({
   CommandPaletteInputRef: s.CommandPaletteInputRef,
   Value: s.Value,
   SelectedIdx: s.SelectedIdx,
   BodyColor: s.BodyColor,
   IsScroll: s.IsScroll,
   Show: s.Show,
   Key: s.Key,
   setValue: s.setValue,
   setSelectedIdx: s.setSelectedIdx,
   setBodyColor: s.setBodyColor,
   setIsScroll: s.setIsScroll,
   setShow: s.setShow,
   setKey: s.setKey,
   setCommandPaletteState: s.setCommandPaletteState,
});

export default useCommandPaletteStore;
export { CommandPaletteStoreSelector, type ICommandPaletteStore };
