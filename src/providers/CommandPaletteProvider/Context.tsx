import { createContext, useContext, type Dispatch } from "react";
import type { IRootAction, IRootState } from ".";
import { type RefObject } from "react";

type ICommandPaletteContext = {
   CommandPaletteState: IRootState;
   setCommandPaletteState: Dispatch<IRootAction>;
   CommandPaletteInputRef: RefObject<HTMLTextAreaElement | null>;
};

export const CommandPaletteContext = createContext<ICommandPaletteContext | undefined>(undefined);
export const useCommandPaletteContext = () => useContext(CommandPaletteContext);