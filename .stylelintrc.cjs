module.exports = {
    extends: ["stylelint-config-standard-scss"],
    rules: {
        "no-descending-specificity": null,
        "media-feature-range-notation": "prefix",
        "alpha-value-notation": [
            "percentage",
            {
                exceptProperties: ["opacity"],
            },
        ],
        "property-no-vendor-prefix": [
            true,
            {
                ignoreProperties: ["appearance", "text-size-adjust"],
            },
        ],
    },
    customSyntax: "postcss-html",
};
