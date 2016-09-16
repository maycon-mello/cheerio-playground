const path = require('path');

module.exports = {
  js: {
    test: /\.js$/,
    loaders: ['babel'],
    include: path.join(__dirname, '../src'),
  },
  jsHot: {
    test: /\.js$/,
    loaders: ['react-hot', 'babel'],
    include: path.join(__dirname, '../src'),
  },
  json: {
    test: /\.json$/,
    loader: 'json-loader',
  },
  globalStyle: {
    test: /\.global\.scss$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader?sourceMap']
  },
  css: {
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader', 'sass-loader?sourceMap']
  },
  sass: {
    test: /^((?!\.global).)*\.scss$/,
    loaders: [
      'style',
      'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
      'sass'
    ]
  },
  woff: {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff',
  },
  ttf: {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream'
  },
  file: {
    test: /\.(eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file'
  },
};
