import { Builder } from "fresh/dev";
import { tailwind } from "@fresh/plugin-tailwind-v3";
import { app } from "./main.ts";

const builder = new Builder();
tailwind(builder);

if (Deno.args.includes("build")) {
  await builder.build(app);
} else {
  await builder.listen(() => app);
}
