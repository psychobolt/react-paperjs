import fs from 'fs';

import projectList from './project-list';
import pkg from './package.json';

module.exports = {
  projects: projectList.reduce((paths, { location }) => {
    const configPath = `${location}/jest.config.js`;
    return fs.existsSync(configPath) ? [...paths, configPath] : paths;
  }, []),

  // root config
  displayName: pkg.name,
  setupFiles: [
    '<rootDir>/test-config.js',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/packages/',
  ],
  collectCoverageFrom: ['src/**/*.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file.mock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/style.mock.js',
  },
};
