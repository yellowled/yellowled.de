const Image = require('@11ty/eleventy-img');

module.exports = {
    image: async function (src, alt, sizes) {
        let metadata = await Image(src, {
            widths: [320, 750, 1500],
            formats: ['avif', 'jpeg'],
            outputDir: '_site/img',
        });

        let imageAttributes = {
            alt,
            sizes,
            loading: 'lazy',
            decoding: 'async',
        };

        return Image.generateHTML(metadata, imageAttributes, {
            whitespaceMode: 'inline',
        });
    },
};
