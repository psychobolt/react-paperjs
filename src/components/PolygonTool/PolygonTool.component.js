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
  pathData: string,
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

  componentDidUpdate() {
    const { path, points, props } = this;
    const { pathProps, pathData } = props;
    if (path) {
      this.setPathData(pathData);
      Object.assign(path, pathProps);
    } else if (points) {
      this.pathInit();
    }
  }

  onMouseDown = (toolEvent: ToolEvent) => {
    if (toolEvent.event.button === MOUSE_LEFT_CODE) {
      const { path } = this;
      if (!path) {
        this.pathInit();
        this.props.onPathInit(path);
      }
      if (this.selectedSegment == null) {
        this.onSegmentAdd(toolEvent);
      } else {
        this.onPathAdd();
      }
    }
    this.props.onMouseDown(toolEvent);
  }

  pathInit() {
    const { pathProps, pathData, paper } = this.props;
    const { Path } = paper;
    const path = new Path(pathProps);
    this.path = path;
    this.setPathData(pathData);
  }

  setPathData(pathData: string) {
    const { path } = this;
    this.removeBounds();
    path.pathData = pathData;
    path.segments.forEach(segment => this.createBounds(segment));
  }

  onSegmentAdd(toolEvent: ToolEvent) {
    const { path } = this;
    path.add(toolEvent.point);
    const segment = path.lastSegment;
    this.createBounds(segment);
    this.props.onSegmentAdd(segment, path);
  }

  onPathAdd() {
    const { selectedSegment, path } = this;
    const { onSegmentRemove, onPathAdd } = this.props;
    const { index } = selectedSegment;
    const segments = path.removeSegments(0, index);
    if (segments.length) {
      onSegmentRemove(segments, path);
    }
    path.closed = true;
    path.selected = false;
    onPathAdd(path);
    this.path = null;
    this.selectedSegment = null;
    this.points.remove();
  }

  createBounds(segment: Segment) {
    const { paper } = this.props;
    const { Path, Group, project } = paper;
    const { path, points } = this;
    if (!points) {
      this.points = new Group();
      project.layers[0].addChild(this.points);
    }
    const bounds = new Path.Circle({
      center: segment.point,
      radius: 7,
      fillColor: 'white',
      opacity: 0,
    });
    bounds.on('mousedown', () => {
      if (!path.closed
          && !path.lastSegment.point.equals(bounds.position)
          && path.contains(bounds.position)) {
        this.selectedSegment = segment;
      }
    });
    this.points.addChild(bounds);
  }

  removeBounds() {
    if (this.points) {
      this.points.remove();
      this.points = null;
    }
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
