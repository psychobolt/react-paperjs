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
  innerRef: React.Ref<ToolType>
};

const MOUSE_LEFT_CODE = 0;

// $FlowFixMe
@PaperScope
class FreeformPathTool extends PathTool<Props> {
  static defaultProps = {
    ...PathTool.defaultProps,
    pathProps: {
      strokeColor: 'black',
    },
  }

  onMouseDown = (toolEvent: ToolEvent) => {
    const { pathProps, onMouseDown, onPathInit, paper } = this.props;
    if (toolEvent.event.button === MOUSE_LEFT_CODE) {
      const path = new paper.Path(pathProps);
      this.path = path;
      onPathInit(path);
    }
    onMouseDown(toolEvent);
  }

  onMouseDrag = (toolEvent: ToolEvent) => {
    const { onMouseDrag } = this.props;
    if (toolEvent.event.buttons === 1) {
      this.path.add(toolEvent.point);
    }
    onMouseDrag(toolEvent);
  }

  onMouseUp = (toolEvent: ToolEvent) => {
    const { path } = this;
    const { onMouseUp, onPathAdd } = this.props;
    if (path) {
      onPathAdd(path);
      this.path = null;
    }
    onMouseUp(toolEvent);
  }

  render() {
    const {
      pathProps, onMouseDown, onMouseDrag, onMouseUp, onPathAdd, paper, innerRef, ...rest
    } = this.props;
    return (
      <Tool
        ref={innerRef}
        minDistance={10}
        onMouseDown={this.onMouseDown}
        onMouseDrag={this.onMouseDrag}
        onMouseUp={this.onMouseUp}
        {...rest}
      />
    );
  }
}

export default React
  .forwardRef<Props, ToolType>((props, ref) => <FreeformPathTool innerRef={ref} {...props} />);
