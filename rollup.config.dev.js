import config, { plugins } from './rollup.config.common';

export default {
  ...config,
  output: {
    file: 'dist/index.dev.js',
    format: 'cjs',
    exports: 'named',
    sourcemap: 'inline',
  },
  plugins: plugins.concat([
    // add additional plugins here
  ]),
};
