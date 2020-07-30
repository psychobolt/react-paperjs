import fs from 'fs';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const { projectList, INCLUDES } = require('./project-list');

const ROOT_RESOLVE = path.resolve();

const config = {
  input: path.resolve(ROOT_RESOLVE, 'src', 'index.js'),
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/,
    }),
    babel({
      include: /node_modules/,
      babelHelpers: 'bundled',
    }),
  ],
  external: [
    ...projectList.map(({ name }) => name),
    'react',
    'react-dom',
    'react-is',
    'styled-components',
  ],
};

export const configs = INCLUDES.length === 0 && fs.statSync(config.input).isFile()
  ? [ROOT_RESOLVE, config]
  : Object.entries(projectList.reduce((cfg, { location }) => ({
    ...cfg,
    [location]: {
      ...config,
      input: `${location}/src/index.js`,
    },
  }), {}));

export default config;
