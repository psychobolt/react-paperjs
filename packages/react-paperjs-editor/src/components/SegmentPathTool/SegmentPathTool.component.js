// @flow
import * as React from 'react';
import * as ReactPaperJS from '@psychobolt/react-paperjs';
import typeof { ToolEvent, Tool as ToolType } from 'paper';

import PathTool from '../shared/PathTool';

const { Tool, PaperScope } = ReactPaperJS;

type Props = {
  pathProps: {
    strokeColor: string,
  },
  pathData: string,
  innerRef: React.Ref<ToolType>
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@PaperScope
class SegmentPathTool extends PathTool<Props> {
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
      innerRef,
      ...rest
    } = this.props;
    return (
      <Tool
        ref={innerRef}
        onKeyUp={this.onKeyUp}
        onMouseDown={this.onMouseDown}
        {...rest}
      />
    );
  }
}

export default React
  .forwardRef<Props, ToolType>((props, ref) => <SegmentPathTool innerRef={ref} {...props} />);
