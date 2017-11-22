import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';

export const plugins = [
  scss({
    output: 'dist/styles.css',
  }),
  resolve({
    browser: true,
    preferBuiltins: true,
  }),
  commonjs({
    include: 'node_modules/**',
    namedExports: {
      'node_modules/paper/dist/paper-core.js': ['PaperScope', 'Group', 'Item', 'TextItem'],
    },
  }),
  babel({
    exclude: 'node_modules/**',
    plugins: ['external-helpers'],
  }),
];

export default {
  input: 'src/index.js',
};
