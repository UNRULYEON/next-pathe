import { t } from "elysia";

export namespace SearchModel {
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

  export const searchResponse = t.Array(
    t.Object({
      id: t.String(),
      slug: t.String(),
      title: t.String(),
      url: t.String(),
      poster: t.Object({
        lg: t.Union([t.String(), t.Null()]),
        md: t.Union([t.String(), t.Null()]),
        sm: t.Union([t.String(), t.Null()]),
      }),
    }),
  );
  export type searchResponse = typeof searchResponse.static;
}
