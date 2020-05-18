import path from 'path';
import { terser } from 'rollup-plugin-terser';

import { configs } from './rollup.config.common';

function getConfig(pathname, base) {
  const dist = path.resolve(pathname, 'dist');
  return {
    ...base,
    output: {
      dir: dist,
      entryFileNames: '[name].prod.js',
      chunkFileNames: '[name]-[hash].prod.js',
      format: 'cjs',
      exports: 'named',
    },
    plugins: [
      ...base.plugins,
      terser(),
    ],
  };
}

export default configs.map(([pathname, config]) => getConfig(pathname, config));
