module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh"],
    rules: {
        "indent": ["error", 4, { "SwitchCase": 1 }],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "quotes": ["error", "double"],
        "no-trailing-spaces": "error",
        "@typescript-eslint/no-explicit-any": "off",
    },
}
