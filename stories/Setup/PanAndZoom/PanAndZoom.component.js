import React from 'react';

import { withPanAndZoom, renderWithPaperScope, PaperContainer, Circle, Grid } from 'src';

import { ref } from '../../shared';

const width = 500;
const height = 500;

const PanAndZoom = withPanAndZoom(PaperContainer);

export default () => (
  <PanAndZoom
    canvasProps={{
      width,
      height,
      tabIndex: 0,
    }}
    prepanStyle={{
      cursor: '-webkit-grab',
    }}
    panStyle={{
      cursor: '-webkit-grabbing',
    }}
    onPanEnabled={() => {
      console.log('Pan enabled'); // eslint-disable-line no-console
    }}
    onPanDisabled={() => {
      console.log('Pan disabled'); // eslint-disable-line no-console
    }}
    onMount={container => container.canvas.focus()}
  >
    {renderWithPaperScope(paper => {
      const { top, left, right, bottom } = paper.view.bounds;
      return (
        <Grid
          ref={ref}
          width={width}
          height={height}
          top={top}
          left={left}
          right={right}
          bottom={bottom}
          strokeWidth={1 / paper.view.zoom}
        />
      );
    })}
    <Circle
      ref={ref}
      radius={35}
      strokeColor="black"
      fillColor="white"
      center={[width / 2, height / 2]}
    />
  </PanAndZoom>
);
