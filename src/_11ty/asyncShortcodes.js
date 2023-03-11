const Image = require("@11ty/eleventy-img");

module.exports = {
    image: async function (src, alt, sizes, cls = "") {
        let metadata = await Image(src, {
            widths: [320, 720, 1440],
            formats: ["avif", "jpeg"],
            outputDir: "_site/img",
        });

        let imageAttributes = {
            alt,
            sizes,
            loading: "lazy",
            decoding: "async",
        };

        if (cls !== "") {
            imageAttributes.class = cls;
        }

        return Image.generateHTML(metadata, imageAttributes, {
            whitespaceMode: "inline",
        });
    },
};
