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
  pathData: string,
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@InstanceRef
@PaperScope
export default class SegmentPathTool extends PathTool<Props> {
  static defaultProps = {
    ...PathTool.defaultProps,
    pathProps: {
      strokeColor: 'black',
      selected: true,
    },
  };

  onKeyUp = () => {
    const { path, onPathAdd } = this;
    if (path) {
      if (path.segments.length > 1) {
        onPathAdd();
      } else {
        path.remove();
        this.path = null;
      }
    }
  }

  onMouseDown = (toolEvent: ToolEvent) => {
    const { path } = this;
    if (toolEvent.event.button === MOUSE_LEFT_CODE && toolEvent.modifiers.shift) {
      if (!path) {
        this.pathInit();
        this.props.onPathInit(path);
      }
      this.onSegmentAdd(toolEvent);
    }
    this.props.onMouseDown(toolEvent);
  }

  pathInit() {
    const { pathProps, pathData, paper } = this.props;
    const { Path } = paper;
    const path = new Path(pathProps);
    this.path = path;
    this.setPathData(pathData);
  }

  setPathData(pathData: string) {
    this.path.pathData = pathData;
  }

  onSegmentAdd(toolEvent: ToolEvent) {
    const { path } = this;
    path.add(toolEvent.point);
    this.props.onSegmentAdd(path.lastSegment, path);
  }

  onPathAdd = () => {
    const { path } = this;
    const { onPathAdd } = this.props;
    path.selected = false;
    onPathAdd(path);
    this.path = null;
  }

  render() {
    const {
      pathProps,
      onKeyUp,
      onMouseDown,
      onPathAdd,
      onSegmentAdd,
      onSegmentRemove,
      paper,
      instanceRef,
      ...rest
    } = this.props;
    return (
      <Tool
        ref={instanceRef}
        onKeyUp={this.onKeyUp}
        onMouseDown={this.onMouseDown}
        {...rest}
      />
    );
  }
}
