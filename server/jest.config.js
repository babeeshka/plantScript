// jest.config.js 
module.exports = {
    preset: 'ts-jest', // Preset to use TypeScript through ts-jest
    testEnvironment: 'node', // Node environment is suitable for backend tests
    roots: ['<rootDir>/tests'], // Direct Jest to where your tests are located
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Setup file to run before each test
    globalSetup: '<rootDir>/tests/globalSetup.ts', // Global setup file
    globalTeardown: '<rootDir>/tests/globalTeardown.ts', // Global teardown file
    testMatch: ['**/tests/**/*.test.ts'], // Only include .test.ts files in the tests directory
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Use ts-jest for transforming TypeScript files
    },
    moduleFileExtensions: ['js', 'ts'], // File extensions to process
    transformIgnorePatterns: ['<rootDir>/node_modules/'], // Do not transform files in node_modules
};