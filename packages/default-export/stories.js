import React from 'react';
import { storiesOf } from '@storybook/react';

import DefaultExport from './src';

storiesOf('packages/default-export', module)
  .add('default', () => <DefaultExport />, {
    notes: 'Default import that only logs into console',
  });
