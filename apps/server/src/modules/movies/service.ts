import { $fetch } from "@/utils";
import type { MovieModel } from "./model";
import type { Movie as MovieType } from "./types";

const details = async ({ slug, language }: MovieModel.movieSlug) => {
  const { data } = await $fetch<MovieType>("/show/:slug", {
    query: {
      language,
    },
    params: {
      slug,
    },
  });

  if (!data) return null;

  return {
    slug: data.slug,
    title: data.title,
    poster: {
      lg: data?.posterPath?.lg ?? null,
      md: data?.posterPath?.md ?? null,
    },
  } satisfies MovieModel.movieSlugResponse;
};

export const Movie = {
  details,
};
