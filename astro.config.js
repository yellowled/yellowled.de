import { defineConfig } from "astro/config";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
    site: "https://www.yellowled.de",
    markdown: {
        shikiConfig: {
            theme: "dark-plus",
            wrap: true,
        },
    },
    image: {
        responsiveStyles: true,
    },
    integrations: [sitemap(), icon()],
});
