// @flow
import React from 'react';
import typeof { ToolEvent } from 'paper';

import { Tool } from '../../Paper.types';
import PathTool from '../shared/PathTool';
import PaperScope from '../../hoc/PaperScope';
import InstanceRef from '../../hoc/InstanceRef';

type Props = {
  pathProps: {
    fillColor: string,
    strokeColor: string,
  }
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@InstanceRef
@PaperScope
export default class CircleTool extends PathTool<Props> {
  static defaultProps = {
    ...PathTool.defaultProps,
    pathProps: {
      fillColor: 'white',
      strokeColor: 'black',
    },
  }

  onMouseDown = (toolEvent: ToolEvent) => {
    const { pathProps, onMouseDown, onPathInit, paper } = this.props;
    if (toolEvent.event.button === MOUSE_LEFT_CODE) {
      const { Path, Color } = paper;
      const path = new Path.Circle({
        center: toolEvent.point,
        radius: 1,
        fillColor: pathProps.selectedFillColor || new Color(0.9, 0.9, 1, 0.75),
        selected: true,
      });
      this.path = path;
      onPathInit(path);
    }
    onMouseDown(toolEvent);
  }

  onMouseDrag = (toolEvent: ToolEvent) => {
    const { onMouseDrag } = this.props;
    if (toolEvent.event.buttons === 1) {
      const { path } = this;
      path.scale(toolEvent.point.getDistance(path.position) / (path.bounds.width / 2));
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
    }
    onMouseUp(event);
  }

  render() {
    const { instanceRef, ...rest } = this.props;
    return (
      <Tool
        ref={instanceRef}
        {...rest}
        onMouseDown={this.onMouseDown}
        onMouseDrag={this.onMouseDrag}
        onMouseUp={this.onMouseUp}
      />
    );
  }
}
