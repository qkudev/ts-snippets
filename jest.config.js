/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/*.js$'],
  modulePathIgnorePatterns: ['<rootDir>/.*/__mocks__'],
  coverageDirectory: '<rootDir>/coverage',
  testPathIgnorePatterns: [],
  setupFiles: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,ts}',
    '<rootDir>/src/**/*.{spec,test}.{js,ts}',
    '<rootDir>/**/*.{spec,test}.{js,ts}',
  ],
  globals: {
    fetch: global.fetch,
  },
};
