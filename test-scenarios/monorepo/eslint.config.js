export default [
  {
    files: ['packages/frontend/**/*.ts'],
    rules: {
      'no-console': 'warn',
    },
  },
  {
    ignores: ['node_modules/', 'dist/', '**/*.py'],
  },
];
