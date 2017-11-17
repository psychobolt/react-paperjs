import React from 'react';

import { PaperContainer, Tool } from 'src';

import styles from '../Tool.styles';

export default () => (
  <PaperContainer canvasProps={{ style: styles.container }}>
    <Tool
      scopedProps={container => ({
        onMouseDown: event => {
          const { paper } = container;
          const start = event.point;
          const path = new paper.Path.Rectangle({
            point: start,
            size: [1, 1],
          });
          path.fillColor = '#e9e9ff';
          path.selected = true;
          Object.assign(container, { path, start });
        },
        onMouseDrag: event => {
          const { path, start } = container;
          const { bounds } = path;
          const offset = event.point.subtract(start);
          const width = Math.abs(offset.x);
          const height = Math.abs(offset.y);
          if (offset.x < 0) {
            bounds.left = event.point.x;
            bounds.right = start.x;
          } else {
            bounds.left = start.x;
          }
          if (offset.y > 0) {
            bounds.top = start.y;
            bounds.bottom = event.point.y;
          } else {
            bounds.top = event.point.y;
          }
          if (width > 0) {
            bounds.width = width;
          }
          if (height > 0) {
            bounds.height = height;
          }
        },
      })}
    />
  </PaperContainer>
);
