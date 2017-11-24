// @flow
import React from 'react';

import { PaperContainer, Circle } from 'src';

import { ref } from '../../shared';

export default () => (
  <PaperContainer
    canvasProps={{
      resize: 'true',
      style: {
        width: '100vw',
        height: 'calc(100vh - 22px)',
      },
    }}
    viewProps={container => ({
      onResize: () => container.forceUpdate(),
    })}
  >
    <Circle
      ref={ref}
      radius={30}
      scopedProps={paper => {
        const { x, y } = paper.view.center;
        return {
          center: [x, y],
        };
      }}
      strokeColor="black"
    />
  </PaperContainer>
);
