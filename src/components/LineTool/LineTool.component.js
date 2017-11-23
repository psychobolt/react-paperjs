// @flow
import React from 'react';
import { typeof Path, PaperScope } from 'paper';
import PropTypes from 'prop-types';

import { Tool } from '../../Paper.types';
import ScopedProps from '../../HOC/ScopedProps';
import type { ToolEventHandler } from '../../Paper.container';

type Props = {
  pathProps: {
    strokeColor: string,
  },
  onMouseDown: ToolEventHandler,
  onMouseDrag: ToolEventHandler,
  onMouseUp: ToolEventHandler,
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@ScopedProps
export default class LineTool extends React.PureComponent<Props> {
  static defaultProps = {
    pathProps: {
      strokeColor: 'black',
    },
    onMouseDown: () => {},
    onMouseDrag: () => {},
    onMouseUp: () => {},
    scopedProps: () => ({}),
  };

  static contextTypes = {
    paper: PropTypes.instanceOf(PaperScope).isRequired,
  }

  path: Path;

  render() {
    const { pathProps, onMouseDown, onMouseDrag, onMouseUp, ...rest } = this.props;
    const ref = this;
    return (
      <Tool
        onMouseDown={toolEvent => {
          if (toolEvent.event.button === MOUSE_LEFT_CODE) {
            const path = new this.context.paper.Path(pathProps);
            path.add(toolEvent.point);
            ref.path = path;
          }
          onMouseDown(toolEvent);
        }}
        onMouseDrag={toolEvent => {
          if (toolEvent.event.buttons === 1) {
            ref.path.removeSegment(1);
            ref.path.addSegment(toolEvent.point);
            ref.path.selected = true;
          }
          onMouseDrag(toolEvent);
        }}
        onMouseUp={toolEvent => {
          if (ref.path) {
            ref.path.selected = false;
          }
          onMouseUp(toolEvent);
        }}
        {...rest}
      />
    );
  }
}
