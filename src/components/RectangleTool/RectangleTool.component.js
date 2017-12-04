// @flow
import React from 'react';
import typeof { Point, ToolEvent } from 'paper';

import { Tool } from '../../Paper.types';
import PathTool from '../shared/PathTool';
import PaperScope from '../../hoc/PaperScope';
import InstanceRef from '../../hoc/InstanceRef';

type Props = {
  pathProps: {
    fillColor: string,
  },
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@InstanceRef
@PaperScope
export default class RectangleTool extends PathTool<Props> {
  static defaultProps = {
    ...PathTool.defaultProps,
    pathProps: {
      fillColor: 'white',
      strokeColor: 'black',
    },
  }

  onMouseDown = (toolEvent: ToolEvent) => {
    const { pathProps, onMouseDown, paper } = this.props;
    if (toolEvent.event.button === MOUSE_LEFT_CODE) {
      const { Path, Color } = paper;
      const start = toolEvent.point;
      const path = new Path.Rectangle({
        point: start,
        size: [1, 1],
        fillColor: pathProps.selectedFillColor || new Color(0.9, 0.9, 1, 0.75),
        selected: true,
      });
      this.path = path;
      this.start = start;
    }
    onMouseDown(toolEvent);
  }

  onMouseDrag = (toolEvent: ToolEvent) => {
    const { onMouseDrag } = this.props;
    if (toolEvent.event.buttons === 1) {
      const { path, start } = this;
      const { bounds } = path;
      const offset = toolEvent.point.subtract(start);
      const width = Math.abs(offset.x);
      const height = Math.abs(offset.y);
      if (offset.x < 0) {
        bounds.left = toolEvent.point.x;
        bounds.right = start.x;
      } else {
        bounds.left = start.x;
      }
      if (offset.y > 0) {
        bounds.top = start.y;
        bounds.bottom = toolEvent.point.y;
      } else {
        bounds.top = toolEvent.point.y;
      }
      if (width > 0) {
        bounds.width = width;
      }
      if (height > 0) {
        bounds.height = height;
      }
    }
    onMouseDrag(toolEvent);
  }

  onMouseUp = (event: ToolEvent) => {
    const { path } = this;
    const { pathProps, onMouseUp, onPathAdd } = this.props;
    if (path) {
      Object.assign(path, {
        selected: false,
        ...pathProps,
      });
      onPathAdd(path);
      this.path = null;
      this.start = null;
    }
    onMouseUp(event);
  }

  start: Point;

  render() {
    const {
      pathProps, onMouseDown, onMouseUp, onMouseDrag, onPathAdd, paper, instanceRef, ...rest
    } = this.props;
    return (
      <Tool
        ref={instanceRef}
        onMouseDown={this.onMouseDown}
        onMouseDrag={this.onMouseDrag}
        onMouseUp={this.onMouseUp}
        {...rest}
      />
    );
  }
}
