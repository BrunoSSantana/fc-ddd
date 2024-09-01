import { configDefaults, defineConfig, mergeConfig } from "vitest/config";
import vitestConfig from "./vitest.config.mts";

export default mergeConfig(
  vitestConfig,
  defineConfig({
    test: {
      include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      exclude: [...configDefaults.exclude, "**/infra/**"],
      coverage: {
        exclude: [...configDefaults.exclude, "**/vite*"],
      },
    },
  }),
);
