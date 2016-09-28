if (/production|test/.test(process.env.NODE_ENV)) {
  module.exports = require('./configureStore.production');
} else {
  module.exports = require('./configureStore.development');
}
