import React from 'react';
import { storiesOf } from '@storybook/react';

import { PaperContainer, LineTool, FreeformPathTool, PolygonTool, RectangleTool, CircleTool, SegmentPathTool } from 'src';

import { ref } from '../shared';
import styles from './Tool.styles';

function onPathAdd(path) {
  console.log(path); // eslint-disable-line no-console
}

storiesOf('Tool', module)
  .add('Line', () => (
    <div>
      <div>Click and drag to draw a line</div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <LineTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  ))
  .add('Freeform Path', () => (
    <div>
      <div>Click and drag to freeform lines.</div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <FreeformPathTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  ))
  .add('Segment Path', () => (
    <div>
      <div>
        <p>Click start to begin.</p>
        <button>Start</button>
        <p>Hold down shift, then left click to plot points to form a segment.</p>
        <p>Release shift to complete segment path.</p>
      </div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <SegmentPathTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  ))
  .add('Rectangle', () => (
    <div>
      <div>Click and drag to create rectangle shapes.</div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <RectangleTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  ))
  .add('Circle', () => (
    <div>
      <div>Click and drag to create circle shapes.</div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <CircleTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  ))
  .add('Polygon', () => (
    <div>
      <div>
        <p>Click anywhere to plot points and to create a shape. </p>
        <p>Click near points to close the path and prune dangling points.</p>
      </div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <PolygonTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  ));
