import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';
import { doc } from 'storybook-readme';

import App from 'stories/App';
import { HelloWorld } from 'src';

import Flexbox from './Layout/Flexbox';
import UserPage from './UserPage';
import Readme from '../README.md';

storiesOf('Documentation', module)
  .add('Readme', doc(Readme))
  .add('Welcome to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>
      {'Hello Button'}
    </Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="emojis">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('Core', module)
  .add('HelloWorld', () => (
    <App>
      <HelloWorld />
    </App>
  ));

storiesOf('Layout', module)
  .add('Flexbox', () => <Flexbox />, {
    notes: 'This is a example based on the flexbox example from the "HTML & CSS Is Hard" online book. - https://internetingishard.com/html-and-css/flexbox/',
  });

storiesOf('React Suspense', module)
  .add('User Page', () => <UserPage />, {
    notes: 'This is a example utilizes React\'s Suspense and Cache. Similar to example from https://github.com/facebook/react/blob/master/fixtures/unstable-async/suspense/src/components/UserPage.js',
  });

require('./packages');
