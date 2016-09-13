const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    bundle: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
        './src/index',
    ],
    parser: './src/parsers/index',
  },
  output: {
    path: __dirname,
    filename: '[name].js',
    publicPath: '/public/',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'src'),
    },{
      test: /\.json$/,
      loader: 'json-loader'
    },{
      test: /\.global\.scss$/,
      loaders: [
        'style-loader',
        'css-loader',
        'sass-loader?sourceMap',
      ]
    },{
      test: /^((?!\.global).)*\.scss$/,
      loaders: [
        'style',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'sass'
      ]
    }],
  },
  postcss: function () {
    return [autoprefixer];
  },
  sassLoader: {
    includePaths: [path.resolve(__dirname, "./src/style")]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
