import React from 'react';

import Resizable from './Resizable';

export default {
  title: 'Core/Setup',
};

export const DynamicContainer = () => (
  <>
    <div>Drag borders to resize the canvas.</div>
    <Resizable />
  </>
);

DynamicContainer.parameters = {
  docs: {
    source: {
      code: require('!!raw-loader!./Resizable/Resizable.component').default, // eslint-disable-line global-require
    },
  },
};
