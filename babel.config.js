const { projectList } = require('./project-list');

const aliases = process.env.BABEL_ENV === 'rollup'
  ? {}
  : projectList.reduce((projectAliases, { name, location }) => ({
    ...projectAliases,
    [name]: `${location}/${process.env.BABEL_ENV === 'test' ? 'src' : 'dist'}`,
  }), {});

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-flow',
  ],
  plugins: [
    // Stage 1
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-do-expressions',
    // Stage 2
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',
    // Stage 3
    '@babel/plugin-syntax-dynamic-import',
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-json-strings',
    // Custom
    [
      'lodash',
      {
        id: ['lodash'],
      },
    ],
    [
      'module-resolver',
      {
        root: ['./'],
        cwd: './',
        alias: {
          ...aliases,
          'react-cache': './packages/react-cache', // See: https://github.com/facebook/react/issues/14780#issuecomment-461861948
        },
      },
    ],
    'babel-plugin-styled-components',
  ],
  env: {
    commonjs: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
      ],
    },
    test: {
      plugins: [
        '@babel/plugin-transform-modules-commonjs',
        'dynamic-import-node',
      ],
    },
  },
};
