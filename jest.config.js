module.exports = {
  setupFiles: [
    './test-config.js',
  ],
  collectCoverageFrom: [
    '(src|packages)/**/*.js',
    '!**/(index|*.stories|stories).js',
    '!**/dist/**/*',
    '!packages/react-cache/**/*',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/file.mock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/style.mock.js',
  },
};
