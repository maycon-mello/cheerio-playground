const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./dev.config.js');

const compiler = webpack(config);

module.exports = (app) => {
  app.use(webpackHotMiddleware(compiler, {
    log: console.log,
  }));

  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath,
  }));
};
