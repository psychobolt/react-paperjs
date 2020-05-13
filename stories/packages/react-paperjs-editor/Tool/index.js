import React from 'react';
import { PaperContainer } from '@psychobolt/react-paperjs';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';

import { LineTool, FreeformPathTool, PolygonTool, RectangleTool, CircleTool, SegmentPathTool, EllipseTool } from '@psychobolt/react-paperjs-editor';
import LineToolReadme from 'packages/react-paperjs-editor/src/components/LineTool/LineTool.md';
import FreeformPathToolReadme from 'packages/react-paperjs-editor/src/components/FreeformPathTool/FreeformPathTool.md';
import SegmentPathToolReadme from 'packages/react-paperjs-editor/src/components/SegmentPathTool/SegmentPathTool.md';
import RectangleToolReadme from 'packages/react-paperjs-editor/src/components/RectangleTool/RectangleTool.md';
import CircleToolReadme from 'packages/react-paperjs-editor/src/components/CircleTool/CircleTool.md';
import PolygonToolReadme from 'packages/react-paperjs-editor/src/components/PolygonTool/PolygonTool.md';
import EllipseToolReadme from 'packages/react-paperjs-editor/src/components/EllipseTool/EllipseTool.md';

import { ref } from '../shared';
import styles from './Tool.styles';

function onPathAdd(path) {
  console.log(path); // eslint-disable-line no-console
}

storiesOf('packages/react-paperjs-editor/Tool', module)
  .add('Line', withReadme(LineToolReadme, () => (
    <div>
      <div>
        {'Click and drag to draw a line'}
      </div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <LineTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  )))
  .add('Freeform Path', withReadme(FreeformPathToolReadme, () => (
    <div>
      <div>
        {'Click and drag to freeform lines.'}
      </div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <FreeformPathTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  )))
  .add('Segment Path', withReadme(SegmentPathToolReadme, () => (
    <div>
      <div>
        <p>
          {'Click start to begin.'}
        </p>
        <button type="button">
          {'Start'}
        </button>
        <p>
          {'Hold down shift, then left click to plot points to form a segment.'}
        </p>
        <p>
          {'Release shift to complete segment path.'}
        </p>
      </div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <SegmentPathTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  )))
  .add('Rectangle', withReadme(RectangleToolReadme, () => (
    <div>
      <div>
        {'Click and drag to create rectangle shapes.'}
      </div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <RectangleTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  )))
  .add('Circle', withReadme(CircleToolReadme, () => (
    <div>
      <div>
        {'Click and drag to create circle shapes.'}
      </div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <CircleTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  )))
  .add('Ellipse', withReadme(EllipseToolReadme, () => (
    <div>
      <div>
        {'Click and drag to create ellipse shapes.'}
      </div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <EllipseTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  )))
  .add('Polygon', withReadme(PolygonToolReadme, () => (
    <div>
      <div>
        <p>
          {'Click anywhere to plot points and to create a shape. '}
        </p>
        <p>
          {'Click near points to close the path and prune dangling points.'}
        </p>
      </div>
      <PaperContainer canvasProps={{ style: styles.container }}>
        <PolygonTool ref={ref} onPathAdd={onPathAdd} />
      </PaperContainer>
    </div>
  )));
