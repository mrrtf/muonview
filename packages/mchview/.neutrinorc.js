const airbnb = require("@neutrinojs/airbnb");
const react = require("@neutrinojs/react");
const jest = require("@neutrinojs/jest");

module.exports = {
  options: {
    root: __dirname,
    tests: "src",
  },
  use: [
    airbnb({
      eslint: {
        baseConfig: {
          rules: {
              'react/require-default-props': 'off'
          },
        },
      },
    }),
    react({
      html: {
        title: "MchView 2.0 Proto2",
        template: "src/index.html",
      },
    }),
    jest({
      setupFilesAfterEnv: ["jest-extended"],
    }),
  ],
};
