export default {
  '*.astro': [
    //
    'stylelint --fix --color --cache --cache-location "./node_modules/.cache/stylelint/"',
    'eslint --fix --color --cache --cache-location "./node_modules/.cache/eslint/"',
    'prettier --write --cache',
  ],
  '*.{ts?(x),js,json}': [
    //
    'eslint --fix --color --cache --cache-location "./node_modules/.cache/eslint/"',
    'prettier --write --cache',
  ],
  '*.css': [
    //
    'stylelint --fix --color --cache --cache-location "./node_modules/.cache/stylelint/"',
    'prettier --write --cache',
  ],
};
