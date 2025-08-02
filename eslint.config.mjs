// @ts-nocheck

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    tseslint.configs.recommendedTypeChecked,
    
  ],
  ignores: ['dist', 'node_modules', '.prettierrc', 'jest.config.js',  'tests/',
            'coverage/',  'github',],
  files: ['**/*.ts'],
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname,
    },
  },
   rules: {
      'no-unreachable': 'error', 
    },
});
