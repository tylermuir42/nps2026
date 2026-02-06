import { resolve } from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        conditions: resolve(__dirname, "src/conditions.html")
      }
    }
  }
});
