module.exports = {
    preset: 'ts-jest', // Use ts-jest preset
    testEnvironment: 'node', // Specify the test environment; use 'jsdom' for browser-like environment
    // If your TypeScript files are in a specific directory, you can specify the root here:
    // roots: ['<rootDir>/src'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files using ts-jest
    },
    // If you are using module aliases in your project, you may need to add mappings here:
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1', // Adjust according to your path aliases
    },
    // Specify extensions of files to be processed
    moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
    // Add more configuration as needed
  };
  