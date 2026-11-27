import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://yourdomain.com", // CUSTOMIZE: replace with your actual domain
  // Noindex pages (thank-you) stay out of the sitemap.
  integrations: [mdx(), sitemap({ filter: (page) => !/\/thank-you\/?$/.test(page) }), icon()],
  vite: {
    plugins: [tailwindcss()],
  },
});
