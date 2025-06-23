import { resolve } from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
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
    nodePolyfills({
      // @ts-expect-error crypto property not in official types but works?
      globals: { crypto: true },
      protocolImports: true,
    }),
    checker({
      typescript: true,
    }),
  ],
});
