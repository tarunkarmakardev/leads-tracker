// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";

export type GlobalState = {
  navbarOpen: boolean;
};

export type GlobalStateActions = {
  toggleNavbarOpen: () => void;
  setNavbarOpen: (value: boolean) => void;
};

export type GlobalStore = GlobalState & GlobalStateActions;

export const defaultInitState: GlobalState = {
  navbarOpen: false,
};

export const createGlobalStore = (
  initState: GlobalState = defaultInitState
) => {
  return createStore<GlobalStore>()((set) => ({
    ...initState,
    toggleNavbarOpen: () => set((state) => ({ navbarOpen: !state.navbarOpen })),
    setNavbarOpen: (value: boolean) => set(() => ({ navbarOpen: value })),
  }));
};
