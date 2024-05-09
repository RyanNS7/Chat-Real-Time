/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
      // testEnvironment: "node",
      testPathIgnorePatterns: ['/node_modules/'],
      collectCoverage: true,
      collectCoverageFrom: ['src/**/*.ts(x)', 'src/**/*spec.ts(x)'],
      bail: true,
      clearMocks: true,
};

export default config;
