// jest.config.js at your project root
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'], // points jest to the tests folder
  setupFiles: ['<rootDir>/jest.setup.ts'],
  globalSetup: '<rootDir>/tests/globalSetup.ts',
  testMatch: ['**/tests/**/*.test.ts'], // adjust as needed
  transform: {
    '^.+\\.{ts|tsx}?$': ['ts-jest', {
      babel: true,
      tsConfig: 'tsconfig.json',
    }
    ]
  },
  moduleFileExtensions: ['js', 'ts'],
  transformIgnorePatterns: ['<rootDir>/node_modules/']
};
