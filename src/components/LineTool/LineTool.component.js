// @flow
import React from 'react';
import typeof { ToolEvent } from 'paper';

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
export default class LineTool extends PathTool<Props> {
  static defaultProps = {
    ...PathTool.defaultProps,
    pathProps: {
      strokeColor: 'black',
    },
  };

  onMouseDown = (toolEvent: ToolEvent) => {
    const { pathProps, onMouseDown, onPathInit, paper } = this.props;
    if (toolEvent.event.button === MOUSE_LEFT_CODE) {
      const path = new paper.Path(pathProps);
      path.add(toolEvent.point);
      this.path = path;
      onPathInit(path);
    }
    onMouseDown(toolEvent);
  }

  onMouseDrag = (toolEvent: ToolEvent) => {
    const { path } = this;
    const { onMouseDrag } = this.props;
    if (toolEvent.event.buttons === 1) {
      path.removeSegment(1);
      path.addSegment(toolEvent.point);
      path.selected = true;
    }
    onMouseDrag(toolEvent);
  }

  onMouseUp = (toolEvent: ToolEvent) => {
    const { path } = this;
    const { onMouseUp, onPathAdd } = this.props;
    if (path) {
      path.selected = false;
      onPathAdd(path);
      this.path = null;
    }
    onMouseUp(toolEvent);
  }

  render() {
    const {
      pathProps, onMouseDown, onMouseDrag, onMouseUp, onPathAdd, instanceRef, ...rest
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
