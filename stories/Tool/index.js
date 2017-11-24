import React from 'react';
import { storiesOf } from '@storybook/react';

import { PaperContainer, LineTool, FreeformPathTool, PolygonTool, RectangleTool } from 'src';

import { ref } from '../shared';
import styles from './Tool.styles';

storiesOf('Tool', module)
  .add('Line', () => (
    <div>
      <div>Click and drag to draw a line</div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <LineTool ref={ref} />
      </PaperContainer>
    </div>
  ))
  .add('Polygon', () => (
    <div>
      <div>
        <p>Click anywhere to plot points and to create a path. </p>
        <p>Click near points to close the path and prune dangling points.</p>
      </div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <PolygonTool ref={ref} />
      </PaperContainer>
    </div>
  ))
  .add('Freeform Path', () => (
    <div>
      <div>Click and drag to freeform lines.</div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <FreeformPathTool ref={ref} />
      </PaperContainer>
    </div>
  ))
  .add('Rectangle', () => (
    <div>
      <div>Click and drag to create rectangle shapes.</div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <RectangleTool ref={ref} />
      </PaperContainer>
    </div>
  ));
