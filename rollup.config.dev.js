import path from 'path';
import postcss from 'rollup-plugin-postcss';

import { configs } from './rollup.config.common';

function getConfig(pathname, base) {
  const dist = path.resolve(pathname, 'dist');
  return {
    ...base,
    output: {
      dir: dist,
      entryFileNames: '[name].dev.js',
      chunkFileNames: '[name]-[hash].dev.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: 'inline',
    },
    plugins: [
      ...base.plugins,
      postcss({
        extract: path.resolve(dist, 'styles.dev.css'),
        sourceMap: true,
      }),
    ],
  };
}

export default configs.map(([pathname, config]) => getConfig(pathname, config));
