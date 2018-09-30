# Grid

Renders a grid onto the canvas. 

```jsx
import { PaperContainer } from '@psychobolt/react-paperjs';
import { Grid } from '@psychobolt/react-paperjs-editor';

import { viewProps, canvasProps } from './Scene';
import { gridProps } from './grid';

export () => (
  <PaperContainer viewProps={viewProps} canvasProps={canvasProps}>
    <Grid {...gridProps} />
  </PaperContainer>
);
```

## Props

### `top?: number`

Starting top position of the grid relative to the canvas. Default is 0 pixels (top-most).

### `left?: number`

Starting left position of the grid relative to the canvas. Default is 0 pixels (left-most).

### `right?: number`

Ending right position of the grid relative to the canvas. Default value is left + width.

### `bottom?: number`

Ending bottom position of the grid relative to the canvas. Default value is top + height.

### `width?: number`

Width of the grid.

### `height?: number`

Height of the grid.

### `cellSize?: number`

Size of each cell in the grid. The default value is 50 pixels.

### `strokeColor?: string`

Color of each grid line.

### `strokeWidth?: number`

Width of each grid line.
