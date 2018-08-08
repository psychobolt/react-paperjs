import React from 'react';
import { storiesOf } from '@storybook/react';
import { withNotes } from '@storybook/addon-notes';

import App from 'stories/App';
import index, { HelloWorld } from 'dist';

storiesOf('HelloWorld', module)
  .add('with App', () => (
    <App>
      <HelloWorld />
    </App>
  ))
  .add('default import', withNotes('Default import that only logs into console')(() => {
    index();
    return <div />;
  }));
