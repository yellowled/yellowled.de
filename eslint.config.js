import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import ts from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import globals from "globals";
import astroParser from "astro-eslint-parser";

export default defineConfig(
    js.configs.recommended,
    ...ts.configs.recommended,
    eslintConfigPrettier,
    ...eslintPluginAstro.configs.recommended,
    {
        files: ["**/*.js", "**/*.mjs", "**/*.ts"],
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
    }
);
