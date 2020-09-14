const { getStories } = require('./utils');

module.exports = {
  stories: getStories(['../stories']),
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  // See https://github.com/storybookjs/storybook/blob/master/addons/docs/src/frameworks/common/preset.ts, to configure
  webpackFinal: async config => ({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules.map(rule => {
          if (rule.test.test('.md')) {
            return {};
          }
          if (rule.exclude && rule.exclude.test('.stories.mdx')) {
            return { ...rule, test: /\.md$/ };
          }
          if (rule.test.test('.stories.mdx')) {
            return { ...rule, test: /\.mdx$/ };
          }
          if (rule.test.test('.stories.js')) {
            return {
              ...rule,
              test: /\.jsx?$/,
              include: /stories/,
            };
          }
          return rule;
        }),
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'source-map-loader',
          enforce: 'pre',
        },
      ],
    },
  }),
};
