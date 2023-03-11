module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"],
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "unix"],
        semi: ["error", "always"],
        "prettier/prettier": "error",
    },
    parserOptions: {
        sourceType: "module",
        ecmaVersion: 2020,
    },
    plugins: ["prettier"],
};
