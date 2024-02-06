module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "plugin:vue/vue3-essential", // Ensures Vue 3 specific rules are applied
        'eslint:recommended',
        "@vue/typescript/recommended", // Use this for TypeScript with Vue
    ],
    parserOptions: {
        ecmaVersion: "latest", 
        sourceType: "module",
        parser: '@typescript-eslint/parser',
        project: ['./frontend/tsconfig.json'], // Ensure this path points to your tsconfig.json
    },
    plugins: [
        "vue",
        "@typescript-eslint" // Ensure TypeScript plugin is included
    ],
    rules: {
        // Your custom rules here
        //'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        //'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
};
