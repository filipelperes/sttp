import { type ICommandPaletteStore } from "../stores/CommandPaletteStore";
import { handleSubmit } from "@/CommandPalette/utils/CommandPalette";
import { type KeyboardEvent, type RefObject } from "react";
import type { IParsedInput } from "@/CommandPalette/types/ParsedInput";

const useKeyboardActions = (event: KeyboardEvent<HTMLTextAreaElement>, CommandPaletteInputRef: RefObject<(HTMLTextAreaElement | null)>, value: string, SelectedIdx: number, setSelectedIdx: (SelectedIdx: number) => void, setCommandPaletteState: (state: Partial<ICommandPaletteStore>) => void, setShow: (Show: boolean) => void, suggestions: IParsedInput["suggestions"]) => {

   const submit = () => {
      event.preventDefault();
      handleSubmit(event, value);
   };

   return ({
      Enter: submit,
      NumpadEnter: submit,
      Tab: () => {
         event.preventDefault();
         const value = suggestions.suggestions[SelectedIdx]?.[1]?.name ?? event.currentTarget.value;
         event.currentTarget.value = value;
         setCommandPaletteState({ Value: value, SelectedIdx: 0 });
      },
      Escape: () => {
         event.currentTarget.value = "";
         setShow(false);
      },
      ArrowDown: () => {
         event.preventDefault();
         setSelectedIdx(SelectedIdx === suggestions.suggestions.length - 1 ? 0 : SelectedIdx + 1);
      },
      ArrowUp: () => {
         event.preventDefault();
         setSelectedIdx(SelectedIdx === 0 ? suggestions.suggestions.length - 1 : SelectedIdx - 1);
      },
      Home: () => {
         event.preventDefault();
         if (suggestions.matched) setSelectedIdx(0);
         else {
            CommandPaletteInputRef.current?.setSelectionRange(0, 0);
            CommandPaletteInputRef.current?.scroll({ behavior: "smooth", left: 0 });
         }
      },
      End: () => {
         event.preventDefault();
         if (suggestions.matched) setSelectedIdx(suggestions.suggestions.length - 1);
         else {
            CommandPaletteInputRef.current?.setSelectionRange(event.currentTarget.value.length, event.currentTarget.value.length);
            CommandPaletteInputRef.current?.scroll({ behavior: "smooth", left: 999999 });
         }
      }
   });
};

export default useKeyboardActions;