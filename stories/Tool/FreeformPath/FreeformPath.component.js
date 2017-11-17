import React from 'react';

import { PaperContainer, Tool } from 'src';

import styles from '../Tool.styles';

export default () => (
  <PaperContainer canvasProps={{ style: styles.container }}>
    <Tool
      minDistance={10}
      scopedProps={container => ({
        onMouseDown: () => {
          const path = new container.paper.Path();
          path.strokeColor = 'black';
          Object.assign(container, { path });
        },
        onMouseDrag: (event) => {
          container.path.add(event.point);
        },
      })}
    />
  </PaperContainer>
);
