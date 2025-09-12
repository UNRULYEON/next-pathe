import { t } from "elysia";

export namespace TheatersModel {
  export const getAllParams = t.Object({
    language: t.KeyOf(
      t.Object({
        nl: t.Const("nl"),
        fr: t.Const("fr"),
      }),
    ),
  });
  export type getAllParams = typeof getAllParams.static;

  export const allTheatersResponse = t.Array(
    t.Object({
      slug: t.String(),
      name: t.String(),
      city: t.String(),
    }),
  );
  export type allTheatersResponse = typeof allTheatersResponse.static;
}
