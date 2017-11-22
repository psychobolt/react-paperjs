// @flow
import React from 'react';
import { typeof Path, PaperScope } from 'paper';
import PropTypes from 'prop-types';

import { Tool } from '../../Paper.types';
import ScopedProps from '../../HOC/ScopedProps';
import type { MouseEventHandler } from '../../Paper.container';

type Props = {
  pathProps: {
    strokeColor: string,
  },
  onMouseDown: MouseEventHandler,
  onMouseDrag: MouseEventHandler,
  onMouseUp: MouseEventHandler,
};

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
        onMouseDown={event => {
          const path = new this.context.paper.Path(pathProps);
          path.add(event.point);
          ref.path = path;
          onMouseDown(event);
        }}
        onMouseDrag={event => {
          ref.path.removeSegment(1);
          ref.path.addSegment(event.point);
          ref.path.selected = true;
          onMouseDrag(event);
        }}
        onMouseUp={event => {
          ref.path.selected = false;
          onMouseUp(event);
        }}
        {...rest}
      />
    );
  }
}
