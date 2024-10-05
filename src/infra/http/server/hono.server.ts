import { logger } from "@/infra/libs/logs";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

export const app = new Hono();


export function runServer() {
  serve(app).listen({ port: 3000 });

  logger.info("Server running on http://localhost:3000");
}
