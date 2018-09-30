# SegmentPathTool

Paper tool that allows drawing connected segmented path on the canvas. Shift click and then release shift key to complete path.

```jsx
import { PaperContainer } from '@psychobolt/react-paperjs';
import { SegmentPathTool } from '@psychobolt/react-paperjs-editor';

import { viewProps, canvasProps } from './Scene';
import { pathProps, rest } from './path';

export () => (
  <PaperContainer viewProps={viewProps} canvasProps={canvasProps}>
    <SegmentPathTool pathProps={pathProps} {...rest} />
  </PaperContainer>
);
```

## Props

### `pathProps: {}`

Props for path. See [reference](http://paperjs.org/reference/path/).

### `...rest: {}`

Props for Paper Tool. See [reference](http://paperjs.org/reference/tool/).