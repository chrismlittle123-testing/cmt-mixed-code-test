import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    files: ['src/typescript/**/*.ts', 'tests/ts/**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
    ],
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // General rules
      'no-console': 'warn',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      eqeqeq: ['error', 'always'],
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '**/*.py'],
  },
);
