import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { pageData } from "./src/utils/pageData";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "src/index.html",
        login: "src/pages/login.html",
      },
    },
  },
  server: {
    port: 3000,
  },
  plugins: [
    handlebars({
      partialDirectory: [resolve(__dirname, "./src/components"), resolve(__dirname, "./src/layouts")],
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
  ],
});
