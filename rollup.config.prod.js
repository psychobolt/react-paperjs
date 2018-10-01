import path from 'path';
import { minify } from 'uglify-es';
import scss from 'rollup-plugin-scss';
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
      scss({
        output: path.resolve(dist, 'styles.prod.css'),
      }),
      ...base.plugins,
      uglify({}, minify),
    ],
  };
}

export default configs.map(([pathname, config]) => getConfig(pathname, config));
