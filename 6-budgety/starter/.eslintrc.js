module.exports = {
  root: true,
  env: {
    node: true,
  },
  //extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    ecmaVersion: 2017,
    parser: 'babel-eslint',
  },
}
