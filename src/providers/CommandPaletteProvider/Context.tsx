import { createContext, useContext, type Dispatch } from "react";
import type { IRootAction, IRootState } from ".";

type ICommandPaletteContext = {
   CommandPaletteState: IRootState;
   setCommandPaletteState: Dispatch<IRootAction>;
};

export const CommandPaletteContext = createContext<ICommandPaletteContext | undefined>(undefined);
export const useCommandPaletteContext = () => useContext(CommandPaletteContext);