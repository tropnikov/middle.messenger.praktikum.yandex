import { resolve } from "path";
import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
import { pageData } from "./src/utils/pageData";
import checker from "vite-plugin-checker";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: "src/index.html",
        login: "src/pages/login.html",
        register: "src/pages/register.html",
        chats: "src/pages/chats.html",
        profile: "src/pages/profile.html",
        "edit-profile": "src/pages/edit-profile.html",
        "change-password": "src/pages/change-password.html",
        404: "src/pages/404.html",
        500: "src/pages/500.html",
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
    handlebars({
      partialDirectory: [resolve(__dirname, "./src/components"), resolve(__dirname, "./src/layouts")],
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
    checker({
      typescript: true,
    }),
  ],
});
