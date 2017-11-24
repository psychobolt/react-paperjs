// @flow
import React from 'react';
import typeof { Path, Point } from 'paper';

import { Tool } from '../../Paper.types';
import ScopedProps, { ScopedComponent } from '../../HOC/ScopedProps';
import type { ToolEventHandler } from '../../Paper.container';

type Props = {
  pathProps: {
    fillColor: string,
  },
  onMouseDown: ToolEventHandler,
  onMouseDrag: ToolEventHandler,
  onMouseUp: ToolEventHandler,
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@ScopedProps
export default class RectangleTool extends ScopedComponent<Props> {
  static defaultProps = {
    pathProps: {
      fillColor: 'white',
      strokeColor: 'black',
    },
    onMouseDown: () => {},
    onMouseDrag: () => {},
    onMouseUp: () => {},
  }

  path: Path;
  start: Point;

  render() {
    const { pathProps, onMouseDown, onMouseUp, onMouseDrag, ...rest } = this.props;
    const ref = this;
    return (
      <Tool
        ref={this.ref}
        onMouseDown={toolEvent => {
          if (toolEvent.event.button === MOUSE_LEFT_CODE) {
            const start = toolEvent.point;
            const path = new this.context.paper.Path.Rectangle({
              point: start,
              size: [1, 1],
              fillColor: '#e9e9ff',
              selected: true,
            });
            this.path = path;
            this.start = start;
          }
          onMouseDown(toolEvent);
        }}
        onMouseDrag={toolEvent => {
          if (toolEvent.event.buttons === 1) {
            const { path, start } = ref;
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
        }}
        onMouseUp={event => {
          if (ref.path) {
            Object.assign(ref.path, {
              selected: false,
              ...pathProps,
            });
          }
          onMouseUp(event);
        }}
        {...rest}
      />
    );
  }
}
