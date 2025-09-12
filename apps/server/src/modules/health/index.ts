import { Elysia } from "elysia";
import { HealthModel } from "./model";

export const health = new Elysia({ prefix: "/health" }).get(
  "/",
  async () => "OK",
  {
    response: {
      200: HealthModel.response,
    },
  },
);
