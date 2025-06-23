import { resolve } from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  define: {
    global: {},
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      crypto: "crypto-js",
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
    checker({
      typescript: true,
    }),
  ],
});
