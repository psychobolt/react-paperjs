const path = require('path');

module.exports = (baseConfig, env, defaultConfig) => ({
  ...defaultConfig,
  resolve: {
    ...defaultConfig.resolve,
    alias: {
      '@psychobolt/react-paperjs': path.resolve(__dirname, '../'),
    },
  },
});
