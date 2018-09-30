# Pan And Zoom

Add pan and zoom controls to Paper's view. By default, space + mouse drag to pan and mouse scroll to zoom. The component will also append attribute 'drag-state' to the canvas element.

Example usage:
```jsx
import { PaperContainer, PanAndZoom } from '@psychobolt/react-paperjs'

import Scene, { options } from './Scene';

export default () => (
  <PaperContainer {...options}>
    <PanAndZoom>
      <Scene />
    </PanAndZoom>
  </PaperContainer>
);
```

## Props

### `onPanEnabled?: () => any`

Callback when pan is enabled.

### `onPanDisabled?: () => any`

Callback when pan is disabled.

### `onZoom?: (level: number) => any`

Callback when zoom leveling the canvas

### `zoomLevel?: number`

Starting zoom level. Default is 1. See [reference](http://paperjs.org/reference/view/#zoom).

### `center?: object | array`

The center of the view. See [reference](http://paperjs.org/reference/view/#center).