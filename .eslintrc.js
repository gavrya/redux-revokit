module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript',
    'plugin:jest/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json',
    warnOnUnsupportedTypeScriptVersion: true,
  },
  plugins: ['@typescript-eslint', 'jest', 'prettier', 'import'],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // eslint
    semi: ['error', 'always'],
    'no-console': 'error',
    'no-debugger': 'error',
    'no-plusplus': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-prototype-builtins': 'off',
    'no-restricted-exports': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'consistent-return': 'off',
    // plugin: import
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'off',
    'import/no-import-module-exports': 'off',
    'import/no-named-default': 'off',
    'import/order': [
      'error',
      {
        groups: [
          [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
        ],
        warnOnUnassignedImports: false,
      },
    ],
    // plugin: prettier
    'prettier/prettier': [
      'error',
      {
        usePrettierrc: true,
      },
    ],
    // plugin: @typescript-eslint/eslint-plugin
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/consistent-type-exports': [
      'error',
      { fixMixedExportsWithInlineTypeSpecifier: true },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports' },
    ],
    '@typescript-eslint/prefer-regexp-exec': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/return-await': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    // plugin: react
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/default-props-match-prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: ['arrow-function'],
        unnamedComponents: 'arrow-function',
      },
    ],
    // plugin: react-hooks
    'react-hooks/exhaustive-deps': 'off',
    // plugin: jsx-a11y
    'jsx-a11y/media-has-caption': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
  },
};
