import { t } from "elysia";

export namespace HealthModel {
  export const response = t.String();
  export type response = typeof response.static;
}
