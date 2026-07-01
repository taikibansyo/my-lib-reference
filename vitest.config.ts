/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  esbuild: {
    jsx: "automatic",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: path.resolve(__dirname, "test/vitest.setup.ts"),
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.{idea,git,cache,output,temp}/**",
      "charanko/**",
      "koudakaojisan/**",
      "app_amidakuji/**",
      "_archive/**",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ これを追加
    },
  },
});
