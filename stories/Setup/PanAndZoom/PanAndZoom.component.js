// @flow
import React from 'react';

import { withPanAndScroll, PaperContainer, Circle, Grid } from 'src';

type Props = {
  containerRef: (container: PaperContainer) => {},
  viewZoom: number,
  draggable: boolean,
  dragStart: {},
};

const width = 500;
const height = 500;

const App = ({ containerRef, draggable, dragStart, viewZoom }: Props) => {
  let cursor = 'default';
  if (dragStart) {
    cursor = '-webkit-grabbing';
  } else if (draggable) {
    cursor = '-webkit-grab';
  }
  return (
    <PaperContainer
      ref={containerRef}
      canvasProps={{
        width,
        height,
        tabIndex: 0,
        style: {
          cursor,
        },
      }}
      onMount={container => container.canvas.focus()}
    >
      <Grid
        width={width}
        height={height}
        scopedProps={container => {
          const { top, left, right, bottom } = container.paper.view.bounds;
          return {
            top,
            left,
            right,
            bottom,
            strokeWidth: 1 / viewZoom,
          };
        }}
      />
      <Circle
        radius={35}
        strokeColor="black"
        fillColor="white"
        center={[width / 2, height / 2]}
      />
    </PaperContainer>
  );
};

export default withPanAndScroll(App);
