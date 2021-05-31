// @flow
import * as React from 'react';
import type { ToolEventHandler } from '@psychobolt/react-paperjs';
import Paper from 'paper';

type Path = typeof Paper.Path;
type KeyEventHandler = typeof Paper.KeyEvent => any
type PathEventHandler = Path => any
type SegmentEventHandler = typeof Paper.Segment => any;

type Props = {
  paper: typeof Paper.PaperScope,
  onKeyDown: KeyEventHandler,
  onKeyUp: KeyEventHandler,
  onMouseDown: ToolEventHandler,
  onMouseDrag: ToolEventHandler,
  onMouseUp: ToolEventHandler,
  onPathInit: PathEventHandler,
  onPathAdd: PathEventHandler,
  onSegmentAdd: SegmentEventHandler,
  onSegmentRemove: SegmentEventHandler
};

export default class PathTool<P> extends React.Component<P & Props> {
  static defaultProps: Props = {
    paper: null,
    onKeyDown: () => {},
    onKeyUp: () => {},
    onMouseDown: () => {},
    onMouseDrag: () => {},
    onMouseUp: () => {},
    onPathInit: () => {},
    onPathAdd: () => {},
    onSegmentAdd: () => {},
    onSegmentRemove: () => {},
  }

  path: Path
}
