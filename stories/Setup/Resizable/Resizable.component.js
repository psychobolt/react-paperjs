// @flow
import React from 'react';

import { PaperContainer, Circle } from 'src';

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
      radius={30}
      scopedProps={container => {
        const { x, y } = container.paper.view.center;
        return {
          center: [x, y],
        };
      }}
      strokeColor="black"
    />
  </PaperContainer>
);
