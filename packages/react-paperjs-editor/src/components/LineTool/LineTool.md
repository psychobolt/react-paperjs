# LineTool

Paper tool that allows drawing of lines on the canvas by mouse click and drag.

```jsx
import { PaperContainer } from '@psychobolt/react-paperjs';
import { LineTool } from '@psychobolt/react-paperjs-editor';

import { viewProps, canvasProps } from './Scene';
import { pathProps, rest } from './path';

export () => (
  <PaperContainer viewProps={viewProps} canvasProps={canvasProps}>
    <LineTool pathProps={pathProps} {...rest} />
  </PaperContainer>
);
```

## Props

### `pathProps: {}`

Props for path. See [reference](http://paperjs.org/reference/path/).

### `...rest: {}`

Props for Paper Tool. See [reference](http://paperjs.org/reference/tool/).