import { t } from "elysia";

export namespace Movie {
  export const query = t.Object({
    query: t.String(),
    language: t.KeyOf(
      t.Object({
        nl: t.Const("nl"),
        fr: t.Const("fr"),
      }),
    ),
  });
  export type query = typeof query.static;

  export const movieResponse = t.Array(
    t.Object({
      id: t.String(),
      title: t.String(),
      url: t.String(),
      poster: t.Union([
        t.Object({
          lg: t.Union([t.String(), t.Undefined()]),
          md: t.Union([t.String(), t.Undefined()]),
        }),
        t.Null(),
      ]),
    }),
  );
  export type movieResponse = typeof movieResponse.static;
}
