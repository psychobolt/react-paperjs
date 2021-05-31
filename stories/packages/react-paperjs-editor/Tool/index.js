import React from 'react';
import { PaperContainer } from '@psychobolt/react-paperjs';

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

export default {
  title: 'packages/react-paperjs-editor/Tool',
};

export const Line = () => (
  <div>
    <div>Click and drag to draw a line</div>
    <PaperContainer canvasProps={{ style: styles.container }}>
      <LineTool ref={ref} onPathAdd={onPathAdd} />
    </PaperContainer>
  </div>
);

Line.parameters = {
  docs: {
    page: LineToolReadme,
  },
};

export const FreeformPath = () => (
  <div>
    <div>Click and drag to freeform lines.</div>
    <PaperContainer canvasProps={{ style: styles.container }}>
      <FreeformPathTool ref={ref} onPathAdd={onPathAdd} />
    </PaperContainer>
  </div>
);

FreeformPath.parameters = {
  docs: {
    page: FreeformPathToolReadme,
  },
};

export const SegmentPath = () => (
  <div>
    <div>
      <p>Click start to begin.</p>
      <button type="button">Start</button>
      <p>Hold down shift, then left click to plot points to form a segment.</p>
      <p>Release shift to complete segment path.</p>
    </div>
    <PaperContainer canvasProps={{ style: styles.container }}>
      <SegmentPathTool ref={ref} onPathAdd={onPathAdd} />
    </PaperContainer>
  </div>
);

SegmentPath.parameters = {
  docs: {
    page: SegmentPathToolReadme,
  },
};

export const Rectangle = () => (
  <div>
    <div>Click and drag to create rectangle shapes.</div>
    <PaperContainer canvasProps={{ style: styles.container }}>
      <RectangleTool ref={ref} onPathAdd={onPathAdd} />
    </PaperContainer>
  </div>
);

Rectangle.parameters = {
  docs: {
    page: RectangleToolReadme,
  },
};

export const Circle = () => (
  <div>
    <div>Click and drag to create circle shapes.</div>
    <PaperContainer canvasProps={{ style: styles.container }}>
      <CircleTool ref={ref} onPathAdd={onPathAdd} />
    </PaperContainer>
  </div>
);

Circle.parameters = {
  docs: {
    page: CircleToolReadme,
  },
};

export const Ellipse = () => (
  <div>
    <div>Click and drag to create ellipse shapes.</div>
    <PaperContainer canvasProps={{ style: styles.container }}>
      <EllipseTool ref={ref} onPathAdd={onPathAdd} />
    </PaperContainer>
  </div>
);

Ellipse.parameters = {
  docs: {
    page: EllipseToolReadme,
  },
};

export const Polygon = () => (
  <div>
    <div>
      <p>
        {'Click anywhere to plot points and to create a shape. '}
      </p>
      <p>Click near points to close the path and prune dangling points.</p>
    </div>
    <PaperContainer canvasProps={{ style: styles.container }}>
      <PolygonTool ref={ref} onPathAdd={onPathAdd} />
    </PaperContainer>
  </div>
);

Polygon.parameters = {
  docs: {
    page: PolygonToolReadme,
  },
};
