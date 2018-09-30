# PolygonTool

Paper tool that allows creating closed polygon shapes on the canvas by shift click. Close shape by clicking on a existing point.

```jsx
import { PaperContainer } from '@psychobolt/react-paperjs';
import { PolygonTool } from '@psychobolt/react-paperjs-editor';

import { viewProps, canvasProps } from './Scene';
import { pathProps, rest } from './path';

export () => (
  <PaperContainer viewProps={viewProps} canvasProps={canvasProps}>
    <PolygonTool pathProps={pathProps} {...rest} />
  </PaperContainer>
);
```

## Props

### `pathProps: {}`

Props for path. See [reference](http://paperjs.org/reference/path/).

### `...rest: {}`

Props for Paper Tool. See [reference](http://paperjs.org/reference/tool/).