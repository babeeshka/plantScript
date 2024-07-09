// jest.config.js 
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    globalSetup: '<rootDir>/tests/globalSetup.ts',
    globalTeardown: '<rootDir>/tests/globalTeardown.ts',
    testMatch: ['**/tests/**/*.test.ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'ts'],
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};