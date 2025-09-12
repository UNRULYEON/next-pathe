import { Elysia, t } from "elysia";
import { SearchModel } from "./model";
import { searchMovie } from "./service";

export const search = new Elysia({ prefix: "/search" }).get(
  "/",
  async ({ headers, query }) => {
    const language = headers["accept-language"];

    const response = await searchMovie({
      query: query.q,
      language,
    });

    return response;
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
    query: t.Object({
      q: t.String(),
    }),
    response: {
      200: SearchModel.searchResponse,
    },
  },
);
