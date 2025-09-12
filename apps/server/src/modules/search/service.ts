import { $fetch } from "@/utils";
import type { SearchModel } from "./model";
import type { SearchResults } from "./types";

export const searchMovie = async ({ query, language }: SearchModel.query) => {
  const { data } = await $fetch<SearchResults>("/search/full", {
    query: {
      q: query,
      language,
    },
  });

  if (data === null) return [];

  return data
    .filter((show) => show.id)
    .map((show) => {
      return {
        id: show.id,
        slug: show.slug,
        title: show.title,
        url: show.url,
        poster: {
          lg: show?.poster?.lg ?? null,
          md: show?.poster?.md ?? null,
          sm: show?.poster?.sm ?? null,
        },
      } satisfies SearchModel.searchResponse[number];
    });
};
