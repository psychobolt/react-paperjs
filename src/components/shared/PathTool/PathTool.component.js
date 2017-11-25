// @flow
import typeof { Path } from 'paper';

import withScopedProps, { ScopedComponent } from '../../../HOC/ScopedProps';
import type { ToolEventHandler } from '../../../Paper.container';

type Props = {
  onMouseDown: ToolEventHandler,
  onMouseDrag: ToolEventHandler,
  onMouseUp: ToolEventHandler,
  onPathAdd: (path: Path) => any
};

export class PathTool<P> extends ScopedComponent<P & Props> {
  static defaultProps = {
    onMouseDown: () => {},
    onMouseDrag: () => {},
    onMouseUp: () => {},
    onPathAdd: () => {},
  }

  path: Path
}

export default withScopedProps(PathTool);
