import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  // Global context state
  globalCompanyId: string;
  globalDate: string;

  // Actions to update the state
  setGlobalCompanyId: (id: string) => void;
  setGlobalDate: (date: string) => void;
}

// Create a persisted store (saves to localStorage so it survives page refreshes)
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      globalCompanyId: "ALL", // 'ALL' represents a consolidated view
      globalDate: new Date().toISOString().split("T")[0], // Defaults to today

      setGlobalCompanyId: (id) => set({ globalCompanyId: id }),
      setGlobalDate: (date) => set({ globalDate: date }),
    }),
    {
      name: "cashbook-global-state", // localStorage key
    },
  ),
);
