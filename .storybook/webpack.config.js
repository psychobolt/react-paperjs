module.exports = (baseConfig, env, defaultConfig) => ({
  ...defaultConfig,
  module: {
    ...defaultConfig.module,
    rules: [
      // Temp fix for issue: https://github.com/storybooks/storybook/issues/4066
      ...defaultConfig.module.rules.filter(rule => !(rule.loader && rule.loader.includes(require.resolve('svg-url-loader')))),
      {
        test: /\.svg/,
        loader: require.resolve('file-loader'),
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
});
