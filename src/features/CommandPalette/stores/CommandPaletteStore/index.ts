import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

type ICommandPaletteStoreState = {
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
   subscribeWithSelector(
      devtools(
         set => ({
            Value: "",
            SelectedIdx: 0,
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
         }),
         { name: "CommandPaletteStore" },
      ),
   )
);

export default useCommandPaletteStore;
export { type ICommandPaletteStore };
