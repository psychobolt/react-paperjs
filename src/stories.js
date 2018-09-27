import React from 'react';
import { storiesOf } from '@storybook/react';

import App from 'stories/App';
import { HelloWorld } from '.';

storiesOf('Core', module)
  .add('HelloWorld', () => (
    <App>
      <HelloWorld />
    </App>
  ));
