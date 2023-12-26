 module.exports = {
    testEnvironment: "node",
    testPathIgnorePatterns: ['/node_modules/'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.ts(x)', 'src/**/*spec.ts(x)'],
    testMatch: ['src/**/*spec.ts(x)'],
    setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
    bail: true,
    clearMocks: true
 }