import fs from 'fs';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

const ROOT_RESOLVE = path.resolve();

const PACKAGES_RESOLVE = path.resolve('packages');

const config = {
  input: path.resolve(ROOT_RESOLVE, 'src', 'index.js'),
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
  external: [
    'react',
    'react-dom',
    'react-is',
    'styled-components',
  ],
};

export const configs = fs.readdirSync(PACKAGES_RESOLVE).reduce((collection, name) => {
  const pathname = path.resolve(PACKAGES_RESOLVE, name);
  if (fs.statSync(pathname).isDirectory()) {
    return {
      ...collection,
      [pathname]: {
        ...config,
        input: path.resolve(PACKAGES_RESOLVE, name, 'src', 'index.js'),
      },
    };
  }
  return collection;
}, {
  [ROOT_RESOLVE]: config,
});

export default config;
