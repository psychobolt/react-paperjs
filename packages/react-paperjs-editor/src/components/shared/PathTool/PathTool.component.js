// @flow
import * as React from 'react';
import type { ToolEventHandler } from '@psychobolt/react-paperjs';
import typeof { PaperScope as Paper, Path, Segment, KeyEvent } from 'paper';

type KeyEventHandler = (event: KeyEvent) => any
type PathEventHandler = (path: Path) => any
type SegmentEventHandler = (segment: Segment | Segment[]) => any;

type Props = {
  paper: Paper,
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
  static defaultProps = {
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
