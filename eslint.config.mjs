// @ts-nocheck

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    
  ],
  ignores: ['dist', 'node_modules', '.prettierrc', 'jest.config.js', 'coverage'],
  files: ['**/*.ts'],
  languageOptions: {
    parserOptions: {
      project: './tsconfig.json',
      tsconfigRootDir: import.meta.dirname,
    },
  },
   rules: {
      'no-unreachable': 'error', 
    },
});
