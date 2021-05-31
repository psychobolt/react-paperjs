import config from 'shared/jest.config';

import pkg from './package.json';

module.exports = {
  ...config,
  displayName: pkg.name,
};
