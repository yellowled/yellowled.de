import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import astroParser from "astro-eslint-parser";

export default [
    js.configs.recommended,
    eslintConfigPrettier,
    ...eslintPluginAstro.configs["flat/recommended"],
    {
        files: ["**/*.js", "**/*.mjs"],
        ignores: ["dist/*", "node_modules/*", "public/*", ".vscode/*"],
        languageOptions: {
            ecmaVersion: 2020,
            sourceType: "module",
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            indent: ["error", 4],
            "linebreak-style": ["error", "unix"],
            semi: ["error", "always"],
        },
    },
    {
        files: ["*.astro"],
        parser: astroParser,
    },
];
