import { configDefaults, defineConfig, mergeConfig } from "vitest/config";
import vitestConfig from "./vitest.config.mts";

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ["./src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      exclude: [
        ...configDefaults.exclude,
        "**/*.e2e.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
        "**/infra/**",
        "**/mocks/**",
        "**/index.ts",
      ],
      coverage: {
        exclude: [
          ...configDefaults.exclude,
          "**/*.e2e.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
          "**/index.ts",
          "**/vite*"
        ],
      },
    },
  }),
);
