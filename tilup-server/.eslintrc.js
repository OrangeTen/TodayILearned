module.exports = {
  extends: "airbnb-base",
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': ["error", {
      "argsIgnorePattern": "^_",
    }],
    "no-use-before-define": ["error", {
      "functions": false,
      "classes": true
    }]
  },
};
