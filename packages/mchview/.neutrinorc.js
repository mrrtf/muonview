const eslint = require("@neutrinojs/eslint");
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
    eslint({
      eslint: {
        useEslintrc: true,
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
