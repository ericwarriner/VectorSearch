import { tailwind } from "@fresh/plugin-tailwind-v3";

// Note: In Deno Fresh 2.0, defineConfig is deprecated.
// We export a raw config object compatible with AppOptions.
export default {
  plugins: [tailwind()],
};
