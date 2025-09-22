import { merge } from "lodash";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { recursiveKeyFilter } from "@/utils";

type State = {
  subscribedMovies: { slug: string; theaterSlugs: string[] }[];

  selectedMovieSlug: string | undefined;
  setSelectedMovieSlug: (slug: string | undefined) => void;

  _hasHydrated: boolean;
};

type Actions = {
  addSubscribedMovie: ({
    slug,
    theaterSlugs,
  }: {
    slug: string;
    theaterSlugs: string[];
  }) => void;
  updateSubscribedMovie: ({
    slug,
    theaterSlugs,
  }: {
    slug: string;
    theaterSlugs: string[];
  }) => void;
  removeSubscribedMovie: ({ slug }: { slug: string }) => void;

  _setHasHydrated: (value: boolean) => void;
};

export const useStore = create<State & Actions>()(
  devtools(
    persist(
      immer((set) => ({
        subscribedMovies: [],
        addSubscribedMovie: ({
          slug,
          theaterSlugs,
        }: {
          slug: string;
          theaterSlugs: string[];
        }) =>
          set(
            (state) => ({
              subscribedMovies: [
                ...state.subscribedMovies,
                { slug, theaterSlugs },
              ],
            }),
            undefined,
            "store/addSubscribedMovie",
          ),
        updateSubscribedMovie: ({
          slug,
          theaterSlugs,
        }: {
          slug: string;
          theaterSlugs: string[];
        }) =>
          set(
            (state) => ({
              subscribedMovies: state.subscribedMovies.map((movie) =>
                movie.slug === slug ? { ...movie, theaterSlugs } : movie,
              ),
            }),
            undefined,
            "store/updateSubscribedMovie",
          ),
        removeSubscribedMovie: ({ slug }: { slug: string }) =>
          set(
            (state) => ({
              subscribedMovies: state.subscribedMovies.filter(
                (movie) => movie.slug !== slug,
              ),
            }),
            undefined,
            "store/removeSubscribedMovie",
          ),

        selectedMovieSlug: undefined,
        setSelectedMovieSlug: (slug: string | undefined) =>
          set(
            { selectedMovieSlug: slug },
            undefined,
            "store/setSelectedMovieSlug",
          ),

        _hasHydrated: false,
        _setHasHydrated: (value: boolean) =>
          set({ _hasHydrated: value }, undefined, "store/_setHasHydrated"),
      })),
      {
        name: "next-pathe",
        partialize: (state) =>
          recursiveKeyFilter(state, ["_hasHydrated", "selectedMovieSlug"]),
        merge: (persistedState, currentState) =>
          merge({}, currentState, persistedState),
        onRehydrateStorage: (state) => {
          return () => state._setHasHydrated(true);
        },
      },
    ),
  ),
);
