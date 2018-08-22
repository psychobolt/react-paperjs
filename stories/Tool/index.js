import React from 'react';
import { CircleTool } from '@psychobolt/react-paperjs-editor';
import { storiesOf } from '@storybook/react';
import { Mountable } from '../shared';

const PaperContainer = Mountable.extend`
  canvas {
    border: 1px solid black;
  }
`;

storiesOf('Tool', module)
  .add('CircleTool', () => (
    <PaperContainer>
      <CircleTool />
    </PaperContainer>
  ));
