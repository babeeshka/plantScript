module.exports = {
    root: true,
    env: {
        node: true,
        es2021: true
    },
    extends: [
        'eslint:recommended',
        "@typescript-eslint/recommended",
    ],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        parser: '@typescript-eslint/parser',
        project: ['./tsconfig.json'], 
    },
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        // custom rules 
    },
};
