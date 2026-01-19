import typescript from 'typescript-eslint';

export default [
  ...typescript.configs.recommended,
  {
    rules: {
      'no-console': 'warn'
    }
  }
];
