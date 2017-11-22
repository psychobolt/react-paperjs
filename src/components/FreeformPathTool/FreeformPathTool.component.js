// @flow
import React from 'react';
import { typeof Path, PaperScope } from 'paper';
import PropTypes from 'prop-types';

import { Tool } from '../../Paper.types';
import ScopedProps from '../../HOC/ScopedProps';
import type { KeyEventHandler } from '../../Paper.container';

type Props = {
  pathProps: {
    strokeColor: string,
  },
  onMouseDown: KeyEventHandler,
  onMouseDrag: KeyEventHandler,
};

// $FlowFixMe
@ScopedProps
export default class FreeformPathTool extends React.PureComponent<Props> {
  static defaultProps = {
    pathProps: {
      strokeColor: 'black',
    },
    onMouseDown: () => {},
    onMouseDrag: () => {},
  }

  static contextTypes = {
    paper: PropTypes.instanceOf(PaperScope).isRequired,
  };

  path: Path

  render() {
    const { pathProps, onMouseDown, onMouseDrag, ...rest } = this.props;
    const ref = this;
    return (
      <Tool
        minDistance={10}
        onMouseDown={event => {
          const path = new this.context.paper.Path(pathProps);
          ref.path = path;
          onMouseDown(event);
        }}
        onMouseDrag={event => {
          ref.path.add(event.point);
          onMouseDrag(event);
        }}
        {...rest}
      />
    );
  }
}
