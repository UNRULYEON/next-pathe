import { t } from "elysia";

export namespace MovieModel {
  export const movieSlug = t.Object({
    slug: t.String(),
    language: t.KeyOf(
      t.Object({
        nl: t.Const("nl"),
        fr: t.Const("fr"),
      }),
    ),
  });
  export type movieSlug = typeof movieSlug.static;

  export const movieSlugResponse = t.Object({
    slug: t.String(),
    title: t.String(),
    poster: t.Object({
      lg: t.Union([t.String(), t.Null()]),
      md: t.Union([t.String(), t.Null()]),
    }),
  });
  export type movieSlugResponse = typeof movieSlugResponse.static;

  export const movieNotFound = t.Null();
  export type movieNotFound = typeof movieNotFound.static;
}
