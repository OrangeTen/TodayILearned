module.exports = {
  extends: "airbnb-base",
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': [
      "error", {
        "allow": ["_id", ],
      },
    ],
    'no-unused-vars': ["error", {
      "argsIgnorePattern": "^_",
    }],
    "no-use-before-define": ["error", {
      "functions": false,
      "classes": true
    }]
  },
};
