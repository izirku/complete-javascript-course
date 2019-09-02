module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  //extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
}
