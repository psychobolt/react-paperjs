import React from 'react';
import { storiesOf } from '@storybook/react';

import DefaultExport from 'default-export';

storiesOf('packages/default-export', module)
  .add('default', () => <DefaultExport />, {
    notes: 'Default import that only logs into console',
  });
