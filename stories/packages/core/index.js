import React from 'react';
import { HelloWorld } from 'react-rollup-boilerplate';

import App from 'stories/shared/App';

export default {
  title: 'packages/core',
  component: HelloWorld,
};

export const Example = () => <App><HelloWorld /></App>;
