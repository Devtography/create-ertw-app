const baseConfig = {
  env: { node: true },
  plugins: ['import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json'],
  },
  extends: [
    'airbnb-base',
    'plugin:import/recommended',
  ],
  rules: {
    'max-len': [
      'warn',
      {
        code: 80,
        tabWidth: 2,
        ignoreComments: true,
      },
    ],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'import/order': [
      'error',
      { alphabetize: { order: 'asc' } },
    ],
  },
};

const tsConfig = {
  files: ['*.ts', '*.mts', '*.cts'],
  excludedFiles: ['*.spec.ts', '*.test.ts'],
  plugins: [
    ...baseConfig.plugins,
    '@typescript-eslint',
    'eslint-plugin-tsdoc',
  ],
  extends: [
    ...baseConfig.extends,
    'airbnb-typescript/base',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  rules: {
    ...baseConfig.rules,
    'tsdoc/syntax': 'warn',
    // disable rules covered by TypesScript compiler
    'import/default': 'off',
    'import/named': 'off',
    'import/namespace': 'off',
    'import/no-named-as-default-member': 'off',
    // disable rules for better local performance
    'import/no-cycle': 'off',
    'import/no-deprecated': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unused-modules': 'off',
  },
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts', '.mts', '.cts'] },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['./tsconfig.eslint.json'],
      },
    },
  },
};

const jestConfig = {
  files: ['*.spec.ts', '*.test.ts'],
  env: { node: true, 'jest/globals': true },
  plugins: [
    ...tsConfig.plugins,
    'jest',
  ],
  extends: [
    ...tsConfig.extends,
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  rules: {
    ...tsConfig.rules,
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
  settings: tsConfig.settings,
};

const specialConfig = {
  files: [
    '**/*.config.js',
    '**/*.config.cjs',
    '**/*.config.mjs',
  ],
  rules: {
    ...baseConfig.rules,
    'import/no-extraneous-dependencies': 'off',
  },
};

module.exports = {
  root: true,
  ...baseConfig,
  overrides: [
    tsConfig,
    jestConfig,
    specialConfig,
  ],
};
