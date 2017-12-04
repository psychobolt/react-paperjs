// @flow
import React from 'react';
import typeof { PaperScope as Paper, Path, Segment } from 'paper';

import type { ToolEventHandler } from '../../../Paper.container';

type Props = {
  paper: Paper,
  onMouseDown: ToolEventHandler,
  onMouseDrag: ToolEventHandler,
  onMouseUp: ToolEventHandler,
  onPathAdd: (path: Path) => any,
  onSegmentAdd: (segment: Segment | Segment[]) => any,
  onSegmentRemove: (segment: Segment | Segment[]) => any
};

export default class PathTool<P> extends React.Component<P & Props> {
  static defaultProps = {
    onMouseDown: () => {},
    onMouseDrag: () => {},
    onMouseUp: () => {},
    onPathAdd: () => {},
    onSegmentAdd: () => {},
    onSegmentRemove: () => {},
  }

  path: Path
}
