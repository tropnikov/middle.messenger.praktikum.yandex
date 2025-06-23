import { resolve } from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { webcrypto } from "crypto";

if (!globalThis.crypto) {
  // @ts-expect-error crypto is not defined in the globalThis
  globalThis.crypto = webcrypto;
}

export default defineConfig({
  root: "./src",
  base: "/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, "src/index.html"),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
  },
  plugins: [
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
