import { treaty } from "@elysiajs/eden";
import type { App } from "../../../server/src/index";

const URL =
  process.env.NODE_ENV === "production" ? "next-pathe.app" : "localhost:3000";

export const { api } = treaty<App>(URL);
