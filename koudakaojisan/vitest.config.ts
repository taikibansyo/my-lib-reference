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
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ これを追加
    },
  },
});
