import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import image from "@astrojs/image";
import sitemap from "@astrojs/sitemap";

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
    ],
});
