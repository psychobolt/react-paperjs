// @flow
import typeof { Path, Segment } from 'paper';

import { ScopedComponent } from '../../../hoc/ScopedProps';
import type { ToolEventHandler } from '../../../Paper.container';

type Props = {
  onMouseDown: ToolEventHandler,
  onMouseDrag: ToolEventHandler,
  onMouseUp: ToolEventHandler,
  onPathAdd: (path: Path) => any,
  onSegmentAdd: (segment: Segment | Segment[]) => any,
  onSegmentRemove: (segment: Segment | Segment[]) => any
};

export default class PathTool<P> extends ScopedComponent<P & Props> {
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
