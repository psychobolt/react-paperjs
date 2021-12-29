import fs from 'fs';

import config from 'shared/jest.config';

import { projectList } from './project-list';
import pkg from './package.json';

module.exports = {
  ...config,
  projects: projectList.reduce((paths, { location }) => {
    const configPath = `${location}/jest.config.js`;
    return fs.existsSync(configPath) ? [...paths, configPath] : paths;
  }, []),

  // root config
  displayName: pkg.name,
  testPathIgnorePatterns: [
    '/node_modules/',
    '/packages/',
  ],
};
