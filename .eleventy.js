const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const filters = require("./src/_11ty/filters");
const shortcodes = require("./src/_11ty/asyncShortcodes");

module.exports = function (eleventyConfig) {
    // Plugins
    eleventyConfig.addPlugin(EleventyVitePlugin);
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(syntaxHighlight);

    // Filters
    Object.keys(filters).forEach((filterName) => {
        eleventyConfig.addFilter(filterName, filters[filterName]);
    });

    // async (Nunjucks) Shortcodes
    Object.keys(shortcodes).forEach((shortcodeName) => {
        eleventyConfig.addNunjucksAsyncShortcode(
            shortcodeName,
            shortcodes[shortcodeName]
        );
    });

    // Pass-through copy files
    eleventyConfig.addPassthroughCopy({ "src/archiv/uploads": "v2/uploads" });
    eleventyConfig.addPassthroughCopy("public");
    eleventyConfig.addPassthroughCopy("src/favicons");
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/scss");

    return {
        dir: {
            input: "src",
            layouts: "_layouts",
        },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        templateFormats: ["njk", "md"],
    };
};
