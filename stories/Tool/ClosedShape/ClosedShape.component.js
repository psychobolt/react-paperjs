import React from 'react';

import { PaperContainer, Tool } from 'src';
import styles from '../Tool.styles';

export default () => {
  const createPath = container => {
    const { paper } = container;
    const path = new paper.Path();
    const points = new paper.Group();
    path.strokeColor = 'black';
    path.selected = 'true';
    Object.assign(container, {
      path,
      points,
      selectedSegment: null,
    });
  };
  return (
    <PaperContainer
      canvasProps={{ style: styles.container }}
      onMount={createPath}
    >
      <Tool
        scopedProps={container => ({
          onMouseDown: (event) => {
            const { path, points, paper, selectedSegment } = container;
            if (selectedSegment == null) {
              path.add(event.point);
              const segment = path.lastSegment;
              const point = new paper.Path.Circle({
                center: event.point,
                radius: 7,
                fillColor: 'white',
                opacity: 0,
              });
              point.on('mousedown', () => {
                if (!path.closed && path.contains(point.position)) {
                  Object.assign(container, { selectedSegment: segment });
                }
              });
              points.addChild(point);
            } else {
              const { index } = selectedSegment;
              path.removeSegments(0, index);
              points.remove();
              Object.assign(path, {
                closed: true,
                selected: false,
              });
              Object.assign(container, { pathSelected: null });
              createPath(container);
            }
          },
        })}
      />
    </PaperContainer>
  );
};
