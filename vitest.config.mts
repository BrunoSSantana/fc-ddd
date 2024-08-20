import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    watch: false,
    globals: true,
      alias: {
        "@": path.resolve(__dirname, "/src"),
      },
  },
});
