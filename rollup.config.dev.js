import path from 'path';

import { configs } from './rollup.config.common';

function getConfig(pathname, base) {
  const dist = path.resolve(pathname, 'dist');
  return {
    ...base,
    output: {
      file: path.resolve(dist, 'index.dev.js'),
      format: 'cjs',
      exports: 'named',
      sourcemap: 'inline',
    },
    plugins: [
      ...base.plugins,
    ],
  };
}

export default configs.map(([pathname, config]) => getConfig(pathname, config));
