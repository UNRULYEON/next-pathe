import { Elysia, t } from "elysia";
import { MovieModel } from "./model";
import { Movie } from "./service";

export const movies = new Elysia({ prefix: "/movie/:slug" }).get(
  "/",
  async ({ headers, params: { slug } }) => {
    const language = headers["accept-language"];

    const movie = await Movie.details({
      language,
      slug,
    });

    if (!movie) return null;

    return movie;
  },
  {
    headers: t.Object({
      "accept-language": t.KeyOf(
        t.Object({
          nl: t.Const("nl"),
          fr: t.Const("fr"),
        }),
      ),
    }),
    response: {
      200: MovieModel.movieSlugResponse,
      404: MovieModel.movieNotFound,
    },
  },
);
