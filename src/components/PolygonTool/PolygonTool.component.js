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

  componentDidUpdate(prevProps: Props) {
    const { path, props } = this;
    const { pathProps, pathData } = props;
    if (path) {
      if (prevProps.pathData !== pathData) {
        path.pathData = pathData;
      }
      if (prevProps.pathProps !== pathProps) {
        Object.assign(path, pathProps);
      }
    }
  }

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
    const { pathProps, pathData, onPathInit, paper } = this.props;
    const { Path } = paper;
    const path = new Path(pathProps);
    path.pathData = pathData;
    path.segments.forEach(segment => this.createBounds(segment));
    this.path = path;
    onPathInit(path);
  }

  onSegmentAdd(toolEvent: ToolEvent) {
    const { path } = this;
    path.add(toolEvent.point);
    const segment = path.lastSegment;
    this.createBounds(segment);
    this.props.onSegmentAdd(segment, path);
  }

  onPathAdd() {
    const { selectedSegment, path, points } = this;
    const { onSegmentRemove, onPathAdd } = this.props;
    const { index } = selectedSegment;
    const segments = path.removeSegments(0, index);
    if (segments.length) {
      onSegmentRemove(segments, path);
    }
    points.remove();
    path.closed = true;
    path.selected = false;
    onPathAdd(path);
    this.path = null;
    this.points = null;
    this.selectedSegment = null;
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
