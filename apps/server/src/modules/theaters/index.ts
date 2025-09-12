import { Elysia, t } from "elysia";
import { TheatersModel } from "./model";
import { Theaters } from "./service";

export const theaters = new Elysia({ prefix: "/theaters" }).get(
  "/",
  async ({ headers }) => {
    const language = headers["accept-language"];

    const response = await Theaters.all({
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
    response: {
      200: TheatersModel.allTheatersResponse,
    },
  },
);
