import { createFetch } from "@better-fetch/fetch";
import { logger } from "@better-fetch/logger";

export const $fetch = createFetch({
  baseURL: "https://www.pathe.nl/api",
  plugins: [
    logger({
      enabled: process.env.NODE_ENV === "development",
    }),
  ],
});
