// @flow
import React from 'react';

import { Tool } from '../../Paper.types';
import PathTool from '../shared/PathTool';
import ScopedProps from '../../hoc/ScopedProps';

type Props = {
  pathProps: {
    strokeColor: string,
  },
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@ScopedProps
export default class FreeformPathTool extends PathTool<Props> {
  static defaultProps = {
    ...PathTool.defaultProps,
    pathProps: {
      strokeColor: 'black',
    },
  }

  render() {
    const { pathProps, onMouseDown, onMouseDrag, onMouseUp, onPathAdd, ...rest } = this.props;
    const ref = this;
    return (
      <Tool
        ref={this.ref}
        minDistance={10}
        onMouseDown={toolEvent => {
          if (toolEvent.event.button === MOUSE_LEFT_CODE) {
            const path = new this.context.paper.Path(pathProps);
            ref.path = path;
            onMouseDown(toolEvent);
          }
        }}
        onMouseDrag={toolEvent => {
          if (toolEvent.event.buttons === 1) {
            ref.path.add(toolEvent.point);
            onMouseDrag(toolEvent);
          }
        }}
        onMouseUp={toolEvent => {
          if (ref.path) {
            onPathAdd(ref.path);
          }
          onMouseUp(toolEvent);
        }}
        {...rest}
      />
    );
  }
}
