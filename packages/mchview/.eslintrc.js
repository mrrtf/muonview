module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
  ],
  plugins: ["import", "jest", "prettier", "react", "jsx-a11y"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  env: {
    "jest/globals": true,
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    "prettier/prettier": "error",
    "react/require-default-props": ["off"],
    "react/forbid-prop-types": ["off"],
    "react/button-has-type": ["off"],
    "react/jsx-props-no-spreading": ["off"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
