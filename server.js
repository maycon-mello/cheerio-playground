const path = require('path');
const express = require('express');
const port = (process.env.PORT || 8080);

const app = express();
const indexFile = path.join(__dirname, './index.html');
const publicPath = express.static(path.join(__dirname, './public'));

app.use('/public', publicPath);
app.get('/', function (_, res) { res.sendFile(indexFile) });

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.dev.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: false,
    publicPath: config.output.publicPath
  }));
}

app.listen(port);

console.log(`Listening at http://localhost:${port}`);
