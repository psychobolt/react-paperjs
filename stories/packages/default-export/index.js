import React from 'react';

import DefaultExport from 'default-export';

export default {
  title: 'packages/default-export',
  parameters: {
    docs: {
      description: {
        component: 'Default import that only logs into console',
      },
    },
  },
};

export const Default = () => <DefaultExport />;
