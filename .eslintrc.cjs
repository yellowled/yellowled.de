module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:astro/recommended",
        "plugin:svelte/recommended",
        "prettier",
    ],
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        semi: ["error", "always"],
    },
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
    },
    overrides: [
        {
            files: ["*.astro"],
            parser: "astro-eslint-parser",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".astro"],
            },
        },
    ],
};
