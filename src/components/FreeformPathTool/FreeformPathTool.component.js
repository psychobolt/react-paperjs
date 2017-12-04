// @flow
import React from 'react';

import { Tool } from '../../Paper.types';
import PathTool from '../shared/PathTool';
import PaperScope from '../../hoc/PaperScope';
import InstanceRef from '../../hoc/InstanceRef';

type Props = {
  pathProps: {
    strokeColor: string,
  },
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@InstanceRef
@PaperScope
export default class FreeformPathTool extends PathTool<Props> {
  static defaultProps = {
    ...PathTool.defaultProps,
    pathProps: {
      strokeColor: 'black',
    },
  }

  render() {
    const {
      pathProps, onMouseDown, onMouseDrag, onMouseUp, onPathAdd, paper, instanceRef, ...rest
    } = this.props;
    const ref = this;
    return (
      <Tool
        ref={instanceRef}
        minDistance={10}
        onMouseDown={toolEvent => {
          if (toolEvent.event.button === MOUSE_LEFT_CODE) {
            const path = new paper.Path(pathProps);
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
            ref.path = null;
          }
          onMouseUp(toolEvent);
        }}
        {...rest}
      />
    );
  }
}
