import React from 'react';
import { storiesOf } from '@storybook/react';

import App from 'stories/App';
import index, { HelloWorld } from 'dist';

storiesOf('HelloWorld', module)
  .add('with App', () => (
    <App>
      <HelloWorld />
    </App>
  ))
  .add('default import', index());
