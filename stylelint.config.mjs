export default {
  extends: ['stylelint-config-standard', 'stylelint-config-html', 'stylelint-config-recess-order'],
  ignoreFiles: ['dist/**', 'coverage/**'],
  rules: {
    'custom-property-empty-line-before': null,
    'font-family-name-quotes': null,
    'import-notation': null,
    'media-feature-range-notation': null,
    'order/properties-order': null,
  },
}
