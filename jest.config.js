import projectList from './project-list';

module.exports = {
  projects: projectList.map(({ name, location }) => ({
    displayName: name,
    testMatch: [`${location}/**/__tests__/**/*.js`],
    setupFiles: [
      '<rootDir>/test-config.js',
    ],
  })),
  collectCoverageFrom: [
    '**/src/**/*.js',
    '!**/dist/**/*',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file.mock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/style.mock.js',
  },
};
