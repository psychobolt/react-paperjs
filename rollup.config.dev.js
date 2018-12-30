import path from 'path';
import scss from 'rollup-plugin-scss';

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
      scss({
        output: path.resolve(dist, 'styles.dev.css'),
        sourceMapEmbed: true,
      }),
      ...base.plugins,
    ],
  };
}

export default configs.map(([pathname, config]) => getConfig(pathname, config));
