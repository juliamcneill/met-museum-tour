module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "react/jsx-key": "error",
        "react/jsx-no-bind": "warn",
        "@typescript-eslint/explicit-function-return-type": 0,
        "@typescript-eslint/no-use-before-define": 0,
        "@typescript-eslint/ban-types": 0,
        "@typescript-eslint/prefer-interface": 0,
        "@typescript-eslint/no-unused-vars": [
            "error",
            { args: "after-used", argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/no-non-null-assertion": 0,
        "@typescript-eslint/camelcase": 0,
        "@typescript-eslint/explicit-member-accessibility": [
            "warn",
            {
                accessibility: "no-public",
            },
        ],
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/no-empty-interface": 0,
        "no-console": [
            "warn",
            {
                allow: ["groupCollapsed", "groupEnd"],
            },
        ],
        "no-restricted-syntax": [
            "error",
            {
                selector: "ImportDeclaration[source.value='lodash'] ImportDefaultSpecifier[local.name='_']",
                message: "Using default lodash export is disallowed. Use named imports, preferably from 'lodash-es'.",
            },
        ],
        "react/prop-types": 0,
        "curly": ["error", "multi-line"],
        "@typescript-eslint/explicit-module-boundary-types": 0,
    },
};
