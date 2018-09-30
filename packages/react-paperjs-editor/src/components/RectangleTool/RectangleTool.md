# RectangleTool

Paper tool that allows drawing of rectangle shapes on the canvas.

```jsx
import { PaperContainer } from '@psychobolt/react-paperjs';
import { RectangleTool } from '@psychobolt/react-paperjs-editor';

import { viewProps, canvasProps } from './Scene';
import { pathProps, rest } from './path';

export () => (
  <PaperContainer viewProps={viewProps} canvasProps={canvasProps}>
    <RectangleTool pathProps={pathProps} {...rest} />
  </PaperContainer>
);
```

## Props

### `pathProps: {}`

Props for path. See [reference](http://paperjs.org/reference/path/).

### `...rest: {}`

Props for Paper Tool. See [reference](http://paperjs.org/reference/tool/).