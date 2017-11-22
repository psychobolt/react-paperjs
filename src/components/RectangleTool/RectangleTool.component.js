// @flow
import React from 'react';
import { typeof Path, typeof Point, PaperScope } from 'paper';
import PropTypes from 'prop-types';

import { Tool } from '../../Paper.types';
import ScopedProps from '../../HOC/ScopedProps';
import type { MouseEventHandler } from '../../Paper.container';

type Props = {
  pathProps: {
    fillColor: string,
  },
  onMouseDown: MouseEventHandler,
  onMouseDrag: MouseEventHandler,
  onMouseUp: MouseEventHandler,
};

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
        onMouseDown={event => {
          const start = event.point;
          const path = new this.context.paper.Path.Rectangle({
            point: start,
            size: [1, 1],
            fillColor: '#e9e9ff',
            selected: true,
          });
          this.path = path;
          this.start = start;
          onMouseDown(event);
        }}
        onMouseDrag={event => {
          const { path, start } = ref;
          const { bounds } = path;
          const offset = event.point.subtract(start);
          const width = Math.abs(offset.x);
          const height = Math.abs(offset.y);
          if (offset.x < 0) {
            bounds.left = event.point.x;
            bounds.right = start.x;
          } else {
            bounds.left = start.x;
          }
          if (offset.y > 0) {
            bounds.top = start.y;
            bounds.bottom = event.point.y;
          } else {
            bounds.top = event.point.y;
          }
          if (width > 0) {
            bounds.width = width;
          }
          if (height > 0) {
            bounds.height = height;
          }
          onMouseDrag(event);
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
