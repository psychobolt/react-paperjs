// @flow
import typeof { Path } from 'paper';

import type { MouseEventHandler } from '@psychobolt/react-paperjs';

type PathEventHandler = (path: Path) => any;

export type ToolDefaultProps = {
  onMouseDown: MouseEventHandler,
  onMouseDrag: MouseEventHandler,
  onMouseUp: MouseEventHandler,
  onPathAdd: PathEventHandler,
  onSegmentAdd: PathEventHandler,
  onSegmentRemove: PathEventHandler
}

export const toolDefaultProps = {
  onMouseDown: () => {},
  onMouseDrag: () => {},
  onMouseUp: () => {},
  onPathAdd: () => {},
  onSegmentAdd: () => {},
  onSegmentRemove: () => {},
};
