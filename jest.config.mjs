import { createRequire } from 'module';
import { pathsToModuleNameMapper } from 'ts-jest';

const require = createRequire(import.meta.url);
const { compilerOptions } = require('./tsconfig.json');

export default {
  testEnvironment: 'node',
  globals: {
    'ts-jest': { tsconfig: 'tsconfig.json' },
  },
  moduleFileExtensions: ['ts', 'js', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    { prefix: '<rootDir>/' },
  ),
  modulePathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/node_modules',
  ],
  transform: { '^.+\\.ts$': 'ts-jest' },
  testMatch: ['**/tests/**/*.(spec|test).ts'],
  collectCoverage: true,
  verbose: true,
};
