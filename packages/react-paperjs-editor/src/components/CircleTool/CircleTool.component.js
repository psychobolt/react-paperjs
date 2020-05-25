// @flow
import * as React from 'react';
import * as ReactPaperJS from '@psychobolt/react-paperjs';
import typeof { ToolEvent, Tool as ToolType } from 'paper';

import PathTool from '../shared/PathTool';

const { Tool, PaperScope } = ReactPaperJS;

type Props = {
  pathProps: {
    fillColor: string,
    strokeColor: string,
  },
  innerRef: React.Ref<ToolType>
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@PaperScope
class CircleTool extends PathTool<Props> {
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
      const scale = Math.abs(toolEvent.point.getDistance(path.position) / (path.bounds.width / 2));
      if (scale > 0.1) {
        path.scale(scale);
      }
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
    const { innerRef, ...rest } = this.props;
    return (
      <Tool
        ref={innerRef}
        {...rest}
        onMouseDown={this.onMouseDown}
        onMouseDrag={this.onMouseDrag}
        onMouseUp={this.onMouseUp}
      />
    );
  }
}

export default React
  .forwardRef<Props, ToolType>((props, ref) => <CircleTool innerRef={ref} {...props} />);
