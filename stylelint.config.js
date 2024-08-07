/**
 * @see https://stylelint.io/user-guide/configure
 * @type {import('stylelint').Config}
 */
export default {
  plugins: ['stylelint-order'],
  extends: [
    //
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    'stylelint-config-astro',
    'stylelint-config-tailwindcss',
  ],
};
