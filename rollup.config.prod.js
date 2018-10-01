import path from 'path';
import { minify } from 'uglify-es';
import { uglify } from 'rollup-plugin-uglify';

import { configs } from './rollup.config.common';

function getConfig(pathname, base) {
  const dist = path.resolve(pathname, 'dist');
  return {
    ...base,
    output: {
      file: path.resolve(dist, 'index.prod.js'),
      format: 'cjs',
      exports: 'named',
    },
    plugins: [
      ...base.plugins,
      uglify({}, minify),
    ],
  };
}

export default configs.map(([pathname, config]) => getConfig(pathname, config));
