import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { Button, Welcome } from '@storybook/react/demo';
import { doc } from 'storybook-readme';

import Flexbox from './Layout/Flexbox';
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
    </Button>));

storiesOf('Layout', module)
  .add('Flexbox', () => <Flexbox />, {
    notes: 'This is a example based on the flexbox example from the "HTML & CSS Is Hard" online book. - https://internetingishard.com/html-and-css/flexbox/',
  });
