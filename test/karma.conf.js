const webpack = require('webpack');
const webpackConfig = require('../webpack/test.config');

module.exports = function (config) {
  config.set({
    browsers: ['PhantomJS'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'karma.tests.js',
    ],
    preprocessors: {
      'karma.tests.js': ['webpack', 'sourcemap'],
    },
    reporters: ['dots'],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: false,
    }
  });
};
