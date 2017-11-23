// @flow
import React from 'react';
import { typeof Path, typeof Point, PaperScope } from 'paper';
import PropTypes from 'prop-types';

import { Tool } from '../../Paper.types';
import ScopedProps from '../../HOC/ScopedProps';
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
export default class RectangleTool extends React.PureComponent<Props> {
  static defaultProps = {
    pathProps: {
      fillColor: 'white',
      strokeColor: 'black',
    },
    onMouseDown: () => {},
    onMouseDrag: () => {},
    onMouseUp: () => {},
  }

  static contextTypes = {
    paper: PropTypes.instanceOf(PaperScope),
  };

  path: Path;
  start: Point;

  render() {
    const { pathProps, onMouseDown, onMouseUp, onMouseDrag, ...rest } = this.props;
    const ref = this;
    return (
      <Tool
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
          Object.assign(ref.path, {
            selected: false,
            ...pathProps,
          });
          onMouseUp(event);
        }}
        {...rest}
      />
    );
  }
}
