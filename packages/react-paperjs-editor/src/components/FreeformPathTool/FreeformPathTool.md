# FreeformPathTool

Paper tool that allows freeform drawing of paths on the canvas.

```jsx
import { PaperContainer } from '@psychobolt/react-paperjs';
import { FreeformPathTool } from '@psychobolt/react-paperjs-editor';

import { viewProps, canvasProps } from './Scene';
import { pathProps, rest } from './path';

export () => (
  <PaperContainer viewProps={viewProps} canvasProps={canvasProps}>
    <FreeformPathTool pathProps={pathProps} {...rest} />
  </PaperContainer>
);
```

## Props

### `pathProps: {}`

Props for path. See [reference](http://paperjs.org/reference/path/).

### `...rest: {}`

Props for Paper Tool. See [reference](http://paperjs.org/reference/tool/).