import eslintPluginJs from '@eslint/js';
import stylisticEslintPlugin from '@stylistic/eslint-plugin';
import eslintPluginAstro from 'eslint-plugin-astro';
import eslintPluginReact from 'eslint-plugin-react';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

const projectName = process.env.PWD?.split('/').at(-1);

/**
 * @see https://eslint.org/docs/latest/use/configure
 * @type {import("eslint").Linter.Config[]}
 */
export default [
  // JavaScript 代码的检查
  eslintPluginJs.configs.recommended,
  // TypeScript 代码的检查
  ...typescriptEslint.configs.recommended,
  // tsx 代码的检查
  {
    files: ['src/**/*.tsx'],
    ...eslintPluginReact.configs.flat.recommended,
    rules: {
      ...eslintPluginReact.configs.flat.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
  // astro 规则检查
  ...eslintPluginAstro.configs.recommended,
  {
    name: `${projectName}/`,
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    name: `${projectName}/src`,
    files: ['src/**/*.astro', 'src/**/*.ts', 'src/**/*.tsx', 'public/**/*.js'],
    languageOptions: { globals: globals.browser },
    plugins: { '@stylistic': stylisticEslintPlugin },
  },
];
