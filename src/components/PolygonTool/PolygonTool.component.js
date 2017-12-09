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
    if (toolEvent.event.button === MOUSE_LEFT_CODE) {
      if (!this.path) {
        this.onPathInit();
      }
      if (this.selectedSegment == null) {
        this.onSegmentAdd(toolEvent);
      } else {
        this.onPathAdd();
      }
    }
    this.props.onMouseDown(toolEvent);
  }

  onPathInit() {
    const { pathProps, onPathInit, paper } = this.props;
    const { Path, Group, project } = paper;
    const path = new Path(pathProps);
    const points = new Group();
    project.layers[0].addChild(points);
    this.path = path;
    this.points = points;
    onPathInit(path);
  }

  onSegmentAdd(toolEvent: ToolEvent) {
    const { onSegmentAdd, paper } = this.props;
    const { path, points } = this;
    path.add(toolEvent.point);
    const segment = path.lastSegment;
    const bounds = new paper.Path.Circle({
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
  }

  onPathAdd() {
    const { selectedSegment, path, points } = this;
    const { onSegmentRemove, onPathAdd } = this.props;
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
