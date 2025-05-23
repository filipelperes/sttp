import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";

type IAppStoreState = {
   OpenCommandPalette: boolean;
   Key: string | null;
};

type IAppStoreActions = {
   setOpenCommandPalette: (OpenCommandPalette: boolean) => void;
   setKey: (Key: string) => void;
   setAppState: (state: Partial<IAppStoreState>) => void;
};

export type IAppStore = IAppStoreState & IAppStoreActions;

const useAppStore = create<IAppStore>()(
   devtools(
      subscribeWithSelector(
         set => ({
            OpenCommandPalette: false,
            Key: null,

            setOpenCommandPalette: (OpenCommandPalette) => set({ OpenCommandPalette }),
            setKey: (Key) => set({ Key }),
            setAppState: (state) => set(state),
         })
      )
   )
);

export default useAppStore;

export const AppStoreSelector = (s: ReturnType<typeof useAppStore.getState>) => ({
   OpenCommandPalette: s.OpenCommandPalette,
   Key: s.Key,
   setOpenCommandPalette: s.setOpenCommandPalette,
   setKey: s.setKey,
   setAppState: s.setAppState,
});

useAppStore.subscribe(
   (state) => state.OpenCommandPalette,
   (OpenCommandPalette) => { document.body.classList.toggle("opened", OpenCommandPalette); }
);