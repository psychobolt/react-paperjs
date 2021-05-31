import React from 'react';
import { isValidElementType } from 'react-is';

const reqExample = require.context('./', true, /^\.\/[\w-]+\/index\.js$/);
const reqSource = require.context('!!raw-loader!./', true, /^\.\/[\w-]+\/index\.js$/);
const reqReadme = require.context('./', true, /^\.\/[\w-]+\/README\.mdx?$/);

export default {
  title: 'Core/Examples',
};

reqExample.keys().forEach(folder => {
  const name = folder.match(/^\.\/([\w-]+)\/index\.js$/)[1];
  const { default: Component } = reqExample(folder);
  if (isValidElementType(Component)) {
    const readmePath = reqReadme.keys().find(path => path.indexOf(name) > -1);
    const sourcePath = reqSource.keys().find(path => path.indexOf(name) > -1);
    module.exports[name] = () => <Component />;
    module.exports[name].parameters = {
      docs: {
        ...(readmePath ? { page: reqReadme(readmePath).default } : undefined),
        ...(sourcePath ? { source: { code: reqSource(sourcePath).default } } : undefined),
      },
    };
  }
});
