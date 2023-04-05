import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
    site: "https://www.yellowled.de",
    markdown: {
        shikiConfig: {
            theme: "dark-plus",
            wrap: true,
        },
    },
    integrations: [
        image({
            serviceEntryPoint: "@astrojs/image/sharp",
        }),
        sitemap(),
        svelte(),
        pagefind(),
    ],
});
