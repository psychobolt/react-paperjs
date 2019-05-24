import path from 'path';

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
  };
}

export default configs.map(([pathname, config]) => getConfig(pathname, config));
