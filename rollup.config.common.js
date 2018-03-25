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
      'node_modules/react-is/index.js': [
        'typeOf',
        'AsyncMode',
        'ContextConsumer',
        'ContextProvider',
        'Element',
        'ForwardRef',
        'Fragment',
        'Portal',
        'StrictMode',
        'isAsyncMode',
        'isContextConsumer',
        'isContextProvider',
        'isElement',
        'isFowardRef',
        'isFragment',
        'isPortal',
        'isStrictMode',
      ],
    },
  }),
  babel({
    exclude: 'node_modules/**',
    plugins: ['external-helpers'],
  }),
];

export default {
  input: 'src/index.js',
  external: [
    'react',
    'react-dom',
    'styled-components',
  ],
};
