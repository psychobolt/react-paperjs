# CircleTool

Paper tool that allows dynamic drawing of circle paths on the canvas. Mouse drag to specified size.

```jsx
import { PaperContainer } from '@psychobolt/react-paperjs';
import { CircleTool } from '@psychobolt/react-paperjs-editor';

import { viewProps, canvasProps } from './Scene';
import { pathProps, rest } from './path';

export () => (
  <PaperContainer viewProps={viewProps} canvasProps={canvasProps}>
    <CircleTool pathProps={pathProps} {...rest} />
  </PaperContainer>
);
```

## Props

### `pathProps: {}`

Props for path. See [reference](http://paperjs.org/reference/path/).

### `...rest: {}`

Props for Paper Tool. See [reference](http://paperjs.org/reference/tool/).