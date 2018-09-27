import React from 'react';
import { storiesOf } from '@storybook/react';

import index from './src';

storiesOf('packages/default-export', module)
  .add('default', () => {
    index();
    return <div />;
  }, {
    notes: 'Default import that only logs into console',
  });
