import { minify } from 'uglify-es';
import { uglify } from 'rollup-plugin-uglify';

import config, { plugins } from './rollup.config.common';

export default {
  ...config,
  output: {
    file: 'dist/index.prod.js',
    format: 'cjs',
    exports: 'named',
  },
  plugins: plugins.concat([
    uglify({}, minify),
  ]),
};
