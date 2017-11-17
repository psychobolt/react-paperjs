import React from 'react';

import { PaperContainer, Tool } from 'src';

import styles from '../Tool.styles';

export default () => (
  <PaperContainer canvasProps={{ style: styles.container }}>
    <Tool
      scopedProps={container => ({
        onMouseDown: event => {
          const path = new container.paper.Path();
          path.strokeColor = 'black';
          path.add(event.point);
          Object.assign(container, { path });
        },
        onMouseDrag: event => {
          const { path } = container;
          path.removeSegment(1);
          path.addSegment(event.point);
          Object.assign(path, { selected: true });
        },
        onMouseUp: () => {
          Object.assign(container.path, { selected: false });
        },
      })}
    />
  </PaperContainer>
);
