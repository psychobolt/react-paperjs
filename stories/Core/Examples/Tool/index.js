import React from 'react';
import { CircleTool } from '@psychobolt/react-paperjs-editor';
import styled from 'styled-components';

import code from 'raw-loader!/packages/react-paperjs-editor/src/components/CircleTool/CircleTool.component';
import { Mountable } from '../../shared';

const PaperContainer = styled(Mountable)`
  canvas {
    border: 1px solid black;
  }
`;

export default {
  title: 'Core/Examples/Tool',
};

module.exports.CircleTool = () => (
  <PaperContainer>
    <CircleTool />
  </PaperContainer>
);

module.exports.CircleTool.parameters = {
  docs: {
    source: {
      code,
    },
  },
};
