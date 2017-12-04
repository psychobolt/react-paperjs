import React from 'react';

import { renderWithPaperScope, PaperContainer, Circle } from 'src';

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
    {renderWithPaperScope(paper => {
      const { x, y } = paper.view.center;
      return (
        <Circle
          ref={ref}
          radius={30}
          center={[x, y]}
          strokeColor="black"
        />
      );
    })}
  </PaperContainer>
);
