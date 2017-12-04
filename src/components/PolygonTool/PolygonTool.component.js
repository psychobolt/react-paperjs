// @flow
import React from 'react';
import typeof { Group as Points, Segment, ToolEvent } from 'paper';

import { Tool } from '../../Paper.types';
import PathTool from '../shared/PathTool';
import PaperScope from '../../hoc/PaperScope';
import InstanceRef from '../../hoc/InstanceRef';

type Props = {
  pathProps: {
    strokeColor: string,
  },
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@InstanceRef
@PaperScope
export default class PolygonTool extends PathTool<Props> {
  static defaultProps = {
    ...PathTool.defaultProps,
    pathProps: {
      strokeColor: 'black',
      selected: true,
    },
  };

  onMouseDown = (toolEvent: ToolEvent) => {
    const { pathProps, onMouseDown, onPathAdd, onSegmentAdd, onSegmentRemove, paper } = this.props;
    if (toolEvent.event.button === MOUSE_LEFT_CODE) {
      const { Path, Group, project } = paper;
      if (!this.path) {
        const path = new Path(pathProps);
        const points = new Group();
        project.layers[0].addChild(points);
        this.path = path;
        this.points = points;
      }
      const { path, points, selectedSegment } = this;
      if (selectedSegment == null) {
        path.add(toolEvent.point);
        const segment = path.lastSegment;
        const bounds = new Path.Circle({
          center: toolEvent.point,
          radius: 7,
          fillColor: 'white',
          opacity: 0,
        });
        bounds.on('mousedown', () => {
          if (!path.closed && path.contains(bounds.position)) {
            this.selectedSegment = segment;
          }
        });
        points.addChild(bounds);
        onSegmentAdd(segment, bounds);
      } else {
        const { index } = selectedSegment;
        const segments = path.removeSegments(0, index);
        const bounds = points.removeChildren(0, index);
        if (segments.length) {
          onSegmentRemove(segments, bounds);
        }
        path.closed = true;
        path.selected = false;
        onPathAdd(path);
        this.path = null;
        this.points = null;
        this.selectedSegment = null;
      }
    }
    onMouseDown(toolEvent);
  }

  points: Points;
  selectedSegment: Segment;

  render() {
    const {
      pathProps, onMouseDown, onPathAdd, onSegmentAdd, onSegmentRemove, paper, instanceRef, ...rest
    } = this.props;
    return (
      <Tool
        ref={instanceRef}
        onMouseDown={this.onMouseDown}
        {...rest}
      />
    );
  }
}
