import React from 'react';
import { storiesOf } from '@storybook/react';

import Resizable from './Resizable';

storiesOf('Core/Setup', module)
  .add('with Resize', () => (
    <div>
      <div>Drag borders to resize canvas.</div>
      <Resizable />
    </div>
  ));
