import { $fetch } from "@/utils";
import type { TheatersModel } from "./model";
import type { TheaterLocation } from "./types";

const all = async ({ language }: TheatersModel.getAllParams) => {
  const { data } = await $fetch<TheaterLocation[]>("/cinemas", {
    query: {
      language,
    },
  });

  if (data === null) return [];

  return data.map((cinema) => {
    return {
      slug: cinema.slug,
      name: cinema.name,
      city: cinema.theaters[0].addressCity,
    } satisfies TheatersModel.allTheatersResponse[number];
  });
};

export const Theaters = {
  all,
};
