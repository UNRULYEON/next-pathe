import { merge } from "lodash";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { recursiveKeyFilter } from "@/utils";

type State = {
  _hasHydrated: boolean;
  _setHasHydrated: (value: boolean) => void;
};

export const useStore = create<State>()(
  devtools(
    persist(
      immer((set) => ({
        _hasHydrated: false,
        _setHasHydrated: (value: boolean) =>
          set({ _hasHydrated: value }, undefined, "store/_setHasHydrated"),
      })),
      {
        name: "next-pathe",
        partialize: (state) => recursiveKeyFilter(state, ["_hasHydrated"]),
        merge: (persistedState, currentState) =>
          merge({}, currentState, persistedState),
        onRehydrateStorage: (state) => {
          return () => state._setHasHydrated(true);
        },
      },
    ),
  ),
);
