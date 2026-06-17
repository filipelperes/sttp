// @ts-check
import tseslint from '@typescript-eslint/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    ignores: ['dist/**', '.agents/**', '.opencode/**'],
  },
  // TypeScript + ESLint recommended rules (flat config)
  ...tseslint.configs['flat/recommended'],
  // React Hooks plugin
  {
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: reactHooks.configs.recommended.rules,
  },
  // React Refresh plugin
  {
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];

export default config;
