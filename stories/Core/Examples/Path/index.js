import React from 'react';

import { renderWithPaperScope, PaperContainer, Path, Rectangle } from '@psychobolt/react-paperjs';

export default {
  title: 'Core/Examples/Path',
};

export const PathData = () => (
  <PaperContainer>
    <Path
      fillColor="red"
      pathData="M100,50c0,27.614-22.386,50-50,50S0,77.614,0,50S22.386,0,50,0S100,22.386,100,50"
    />
  </PaperContainer>
);

PathData.storyName = 'with pathData';

export const RectangleExample = () => {
  const [size, toggleSize] = React.useState([90, 60]);
  return (
    <>
      <div>
        <button type="button" onClick={() => toggleSize([size[1], size[0]])}>Switch Size</button>
      </div>
      <PaperContainer>
        {renderWithPaperScope(paper => (
          <Rectangle
            size={size}
            fillColor="green"
            position={paper.view.center}
          />
        ))}
      </PaperContainer>
    </>
  );
};

RectangleExample.storyName = 'Rectangle';
