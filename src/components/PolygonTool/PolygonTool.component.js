// @flow
import React from 'react';
import typeof { Path as PathType, Group as Points, Segment, ToolEvent } from 'paper';

import { Tool } from '../../Paper.types';
import PathTool from '../shared/PathTool';
import PaperScope from '../../hoc/PaperScope';
import InstanceRef from '../../hoc/InstanceRef';

type Props = {
  pathProps: {
    strokeColor: string,
  },
  path: PathType,
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

  constructor(props: Props) {
    super(props);
    const { path } = props;
    if (path) this.setPath(path);
  }

  componentDidUpdate() {
    const { path } = this.props;
    if (path) this.setPath(path);
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
    const { pathProps, onPathInit, paper } = this.props;
    const { Path } = paper;
    const path = new Path(pathProps);
    this.path = path;
    onPathInit(path);
  }

  onSegmentAdd(toolEvent: ToolEvent) {
    const { path } = this;
    path.add(toolEvent.point);
    const segment = path.lastSegment;
    this.createBounds(segment);
    this.props.onSegmentAdd(segment);
  }

  onPathAdd() {
    const { selectedSegment, path, points } = this;
    const { onSegmentRemove, onPathAdd } = this.props;
    const { index } = selectedSegment;
    const segments = path.removeSegments(0, index);
    if (segments.length) {
      onSegmentRemove(segments);
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

  setPath(path: PathType) {
    this.path = path;
    if (this.points) {
      this.points.remove();
      this.points = null;
    }
    path.segments.forEach(segment => this.createBounds(segment));
    Object.assign(path, this.props.pathProps);
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
