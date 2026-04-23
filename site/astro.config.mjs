import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import remarkRefine from "./src/lib/remark-refine.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://policy.safer-ai.org",
  base: process.env.BASE_URL || "/",
  output: "static",
  integrations: [sitemap()],
  markdown: {
    gfm: true,
    smartypants: true,
    remarkPlugins: [remarkRefine],
    shikiConfig: {
      theme: "github-light",
      wrap: true,
    },
  },
  trailingSlash: "ignore",
});
