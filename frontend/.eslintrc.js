module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "plugin:vue/vue3-essential",
        'eslint:recommended',
        "@vue/typescript/recommended",
    ],
    parserOptions: {
        ecmaVersion: "latest", 
        sourceType: "module",
        parser: '@typescript-eslint/parser',
        project: ['./tsconfig.json'], 
    },
    plugins: [
        "vue",
        "@typescript-eslint"
    ],
    rules: {
        // custom rules
    },
};
