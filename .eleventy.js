const pluginRss = require('@11ty/eleventy-plugin-rss');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');

const filters = require('./src/_11ty/filters');
const transforms = require('./src/_11ty/transforms');

module.exports = function (config) {
    // Plugins
    config.addPlugin(pluginRss);
    config.addPlugin(syntaxHighlight);

    // Filters
    Object.keys(filters).forEach((filterName) => {
        config.addFilter(filterName, filters[filterName]);
    });

    // Transforms
    Object.keys(transforms).forEach((transformName) => {
        config.addTransform(transformName, transforms[transformName]);
    });

    // Additional watch targets
    config.addWatchTarget('./src/css');
    config.addWatchTarget('./src/js');

    config.setBrowserSyncConfig({
        files: ['_site/css/main.css'],
    });

    // Pass-through copy files
    config.addPassthroughCopy('src/favicons');
    config.addPassthroughCopy({ 'src/archiv/uploads': 'v2/uploads' });

    // Deep-merge data
    config.setDataDeepMerge(true);

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
