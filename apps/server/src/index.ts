import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { staticPlugin } from "@elysiajs/static";
import { Elysia, file } from "elysia";
import { health, search, theaters } from "./modules";

const v1 = new Elysia({
  prefix: "/api/v1",
})
  .use(
    openapi({
      enabled: process.env.NODE_ENV === "development",
      exclude: {
        paths: ["/", "/*", "/public/*"],
      },
      documentation: {
        info: {
          title: "next-pathe",
          version: "0.0.1",
          description: "next-pathe API documentation",
        },
        servers: [
          {
            url: "https://next-pathe.app",
            description: "Production",
          },
          {
            url: "http://localhost:3000",
            description: "Development",
          },
        ],
      },
    }),
  )
  .use(health)
  .use(search)
  .use(theaters);

const app = new Elysia()
  .use(
    cors({
      origin: "*",
      methods: ["GET"],
      allowedHeaders: [
        "Accept",
        "Accept-Language",
        "Content-Language",
        "Content-Type",
        "Range",
      ],
      exposeHeaders: [
        "Cache-Control",
        "Content-Language",
        "Content-Length",
        "Content-Type",
        "Expires",
        "Last-Modified",
        "Pragma",
      ],
      credentials: true,
    }),
  )
  .use(v1)
  .use(
    staticPlugin({
      prefix: "/",
    }),
  )
  .get("/", () => Bun.file("public/index.html"))
  .listen(3000);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
