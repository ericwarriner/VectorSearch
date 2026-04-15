import { App, staticFiles } from "fresh";

export const app = new App();

app.use(staticFiles());
await app.fsRoutes();

if (import.meta.main) {
  const port = Number(Deno.env.get("PORT") || 8000);
  console.log(`🚀 Server starting on port ${port}...`);
  await app.listen({ port, hostname: "0.0.0.0" });
}
