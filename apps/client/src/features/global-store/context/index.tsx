"use client";
import { type ReactNode, createContext, useRef } from "react";
import { useStore } from "zustand";
import { type GlobalStore, createGlobalStore } from "../store";
import useContextOrError from "@/hooks/useContextOrError";

export type GlobalStoreApi = ReturnType<typeof createGlobalStore>;

export const GlobalStoreContext = createContext<GlobalStoreApi | null>(null);

export interface GlobalStoreProviderProps {
  children: ReactNode;
}

export const GlobalStoreProvider = ({ children }: GlobalStoreProviderProps) => {
  const storeRef = useRef<GlobalStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createGlobalStore();
  }

  return (
    <GlobalStoreContext.Provider value={storeRef.current}>
      {children}
    </GlobalStoreContext.Provider>
  );
};

GlobalStoreContext.displayName = "GlobalStoreContext";

export const useGlobalStore = <T,>(selector: (store: GlobalStore) => T): T => {
  const counterStoreContext = useContextOrError(GlobalStoreContext);
  return useStore(counterStoreContext, selector);
};
