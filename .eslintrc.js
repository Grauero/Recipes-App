module.exports = {
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 2017
  },
  env: {
    node: true,
    es6: true,
    jest: true
  },
  rules: {
    'comma-dangle': 0,
    'linebreak-style': 0,
    'object-curly-newline': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'global-require': 0,
    'no-shadow': 0
  }
};
