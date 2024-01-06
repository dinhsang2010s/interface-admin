module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        sourceType: "module",
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.eslint.json"]
    },
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    plugins: ["react-refresh", "@typescript-eslint"],
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            {allowConstantExport: true},
        ],
    },
};