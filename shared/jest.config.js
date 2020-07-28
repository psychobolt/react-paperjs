import path from 'path';

const ROOT_RESOLVE = path.resolve();

module.exports = {
  setupFiles: [
    `${ROOT_RESOLVE}/test-config.js`,
  ],
  collectCoverageFrom: ['src/**/*.js'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `${ROOT_RESOLVE}/__mocks__/file.mock.js`,
    '\\.(css|less)$': `${ROOT_RESOLVE}/__mocks__/style.mock.js`,
  },
};
