import eslintPluginJs from '@eslint/js';
import stylisticEslintPlugin from '@stylistic/eslint-plugin';
import eslintPluginAstro from 'eslint-plugin-astro';
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
  // astro 规则检查
  ...eslintPluginAstro.configs.recommended,
  {
    name: `${projectName}/`,
    files: ['*.config.js'],
    languageOptions: { globals: globals.node },
  },
  {
    name: `${projectName}/src`,
    files: ['src/**/*.ts', 'public/**/*.js'],
    languageOptions: { globals: globals.browser },
    plugins: { '@stylistic': stylisticEslintPlugin },
  },
];
