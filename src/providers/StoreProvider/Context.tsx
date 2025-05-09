import { createContext, useContext, type Dispatch } from "react";
import type { IRootAction, IRootState } from ".";

type IStoreContextType = {
   storeState: IRootState;
   setStoreState: Dispatch<IRootAction>;
};

export const StoreContext = createContext<IStoreContextType | undefined>(undefined);
export const useStoreContext = () => useContext(StoreContext);