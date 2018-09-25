import React from 'react';
import { storiesOf } from '@storybook/react';

import index from './index';

storiesOf('default-export', module)
  .add('default import', () => {
    index();
    return <div />;
  }, {
    notes: 'Default import that only logs into console',
  });
