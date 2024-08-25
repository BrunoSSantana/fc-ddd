import path from "node:path";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    dir: "./src",
    watch: false,
    exclude: ["**/index.ts"],
    globals: true,
    alias: {
      "@": path.resolve(__dirname, "/src"),
    },
  },
});
