import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://codes-by-sethu.github.io",  // YOUR GitHub Pages URL
  integrations: [
    tailwind(),
    icon(),
    sitemap(),
  ],
  output: "static",           // ✅ FIXED: GitHub Pages ready
  vite: {
    resolve: {
      alias: {
        "@styles": "/src/styles",
      },
    },
  },
});
