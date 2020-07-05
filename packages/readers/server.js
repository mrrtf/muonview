/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');

const isDevelopment = process.env.NODE_ENV !== 'production';

const app = require('./src/app');

const compiler = webpack(config);
const port = 3000;

if (isDevelopment) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    }),
  );
}

app.listen(port, () => process.stdout.write(`starting example app at http://localhost:${port}\n`));

if (module.hot) {
  module.hot.accept('./router-digits');
}
