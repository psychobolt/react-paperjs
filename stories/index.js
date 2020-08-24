const examples = require('./Examples');
const packages = require('./packages');

module.exports = [
  './Documentation/*.mdx',
  ...examples.map(path => `./Examples/${path}`),
  ...packages.map(path => `./packages/${path}`),
];
