const airbnb = require("@neutrinojs/airbnb");
const react = require("@neutrinojs/react");
const jest = require("@neutrinojs/jest");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

module.exports = {
  options: {
    root: __dirname,
    tests: "src",
  },
  use: [
    airbnb({
      eslint: {
        baseConfig: {
          extends: ["plugin:jest/recommended"],
          plugins: ["import", "jest"],
          env: {
            "jest/globals": true,
          },
          rules: {
            "react/require-default-props": ["off"],
            "react/forbid-prop-types": ["off"],
            "react/button-has-type": ["off"],
            "react/jsx-props-no-spreading": ["off"],
          },
        },
      },
    }),
    react({
      html: {
        title: "MchView 2.0 Proto2",
        template: "src/index.html",
      },
      babel: {
        plugins: ["lodash"],
      },
    }),
    jest({
      setupFilesAfterEnv: ["jest-extended"],
    }),
    (neutrino) => {
      neutrino.config
        .when(process.env.NODE_ENV === "production", (config) =>
          config
            .plugin("analyzer")
            .use(BundleAnalyzerPlugin, [{ analyzerMode: "static" }])
        )
        .devServer.port(1234);
    },
  ],
};
