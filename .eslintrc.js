module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'love',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
}
