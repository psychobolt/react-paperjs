import React from 'react';
import { CircleTool } from '@psychobolt/react-paperjs-editor';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import { Mountable } from '../shared';

const PaperContainer = styled(Mountable)`
  canvas {
    border: 1px solid black;
  }
`;

storiesOf('Core/Tool', module)
  .add('CircleTool', () => (
    <PaperContainer>
      <CircleTool />
    </PaperContainer>
  ));
