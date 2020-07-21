import path from 'path';

import pkg from './package.json';

const ROOT_RESOLVE = path.resolve();

module.exports = {
  displayName: pkg.name,
  setupFiles: [
    `${ROOT_RESOLVE}/test-config.js`,
  ],
  collectCoverageFrom: ['src/**/*.js'],
};
