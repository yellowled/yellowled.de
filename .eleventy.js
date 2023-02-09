const eleventyNavigationPlugin = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const filters = require('./src/_11ty/filters');
const transforms = require('./src/_11ty/transforms');
const shortcodes = require('./src/_11ty/asyncShortcodes');

module.exports = function (eleventyConfig) {
    // Plugins
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(pluginRss);
    eleventyConfig.addPlugin(syntaxHighlight);

    // Filters
    Object.keys(filters).forEach((filterName) => {
        eleventyConfig.addFilter(filterName, filters[filterName]);
    });

    // Transforms
    Object.keys(transforms).forEach((transformName) => {
        eleventyConfig.addTransform(transformName, transforms[transformName]);
    });

    // async (Nunjucks) Shortcodes
    Object.keys(shortcodes).forEach((shortcodeName) => {
        eleventyConfig.addNunjucksAsyncShortcode(
            shortcodeName,
            shortcodes[shortcodeName]
        );
    });

    // Reload dev server if CSS/JS changes
    eleventyConfig.setBrowserSyncConfig({
        files: ['_site/css/main.css', '_site/js/main.js'],
    });

    // Pass-through copy files
    eleventyConfig.addPassthroughCopy('src/favicons');
    eleventyConfig.addPassthroughCopy('src/img');
    eleventyConfig.addPassthroughCopy({ 'src/archiv/uploads': 'v2/uploads' });

    // Deep-merge data
    eleventyConfig.setDataDeepMerge(true);

    return {
        dir: {
            input: 'src',
            layouts: '_layouts',
        },
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        templateFormats: ['njk', 'md', '11ty.js'],
    };
};
