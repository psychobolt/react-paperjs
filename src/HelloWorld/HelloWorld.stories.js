import React from 'react';
import { storiesOf } from '@storybook/react';

import App from 'stories/App';
import { HelloWorld } from 'react-rollup-boilerplate';

storiesOf('HelloWorld', module)
  .add('with App', () => (
    <App>
      <HelloWorld />
    </App>
  ));
