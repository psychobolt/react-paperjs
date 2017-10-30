if (process.NODE_ENV === 'development') {
  module.exports = require('./index.dev');
} else {
  module.exports = require('./index.prod');
}