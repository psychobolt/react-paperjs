'use strict';

if (process.env.NODE_ENV === 'development') {
  module.exports = require('./index.dev');
} else {
  module.exports = require('./index.prod');
}
