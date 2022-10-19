module.exports = {
  extends: [
    '@antfu',
  ],
  rules: {
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'no-console': 'off',
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['error', '1tbs'],
  },
};
