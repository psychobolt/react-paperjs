# React Paper.js

[![Build Status](https://travis-ci.org/psychobolt/react-paperjs.svg?branch=master)](https://travis-ci.org/psychobolt/react-paperjs)
[![Dependencies Status](https://david-dm.org/psychobolt/react-paperjs.svg)](https://david-dm.org/psychobolt/react-paperjs)
[![codecov](https://codecov.io/gh/psychobolt/react-paperjs/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-paperjs)

React fiber renderer and component container for Paper.js.

## Install (Coming soon)

```sh
npm install --save @psychobolt/react-paperjs
# or
yarn add @psychobolt/react-paperjs
```

## Usage

Common usage with [PaperContainer](#PaperContainer) and its default [renderer](#PaperRenderer).

### PaperContainer

Its instance is a [Paper Scope](http://paperjs.org/reference/paperscope/).

All children are rendered into its canvas with [PaperRenderer](#PaperRenderer) by default.

```jsx
import React from 'react';
import PaperContainer, { Circle, Layer } from '@psychobolt/react-paperjs'

const Shapes = () => <Circle center={[120, 50]} radius={35} fillColor="#00FF00" />;

const App = (props) => (
  <div>
    <PaperContainer {...props}>
      <Circle center={[80, 50]} radius={35} fillColor="red" />
      <Layer>
        <Shapes />
      </Layer>
    </PaperContainer>
  </div>
);

export default App;
```

#### Props

- renderer: [PaperRenderer](#PaperRenderer) (default)
- canvasProps: Props to be passed to ```<canvas>```. Can be a function or a litral object - ```(container) => ({}) | {}```.
- viewProps: Props to be passed to the [View](http://paperjs.org/reference/view/). Can be a function or a literal object - ```(container) => ({}) | {}```.
- onMount: Callback on container mount - ```(container) => myCallback(container)```

#### Container Add-ons

A work in progress beneficial library, high order components (HOC) for enhancing [PaperContainer](#PaperContainer).

##### with Pan And Zoom

Add pan and zoom controls to Paper's view. By default, space + mouse drag to pan and mouse scroll to zoom.

Example usage:
```jsx
import { withPanAndZoom, PaperContainer } from '@psychobolt/react-paperjs'

import Scene, { options } from './Scene';

const App = ({ containerRef }) => (
  <PaperContainer ref={containerRef}>
    <Scene />
  </PaperContainer>
);

export default withPanAndZoom(App, options);
```

Options (optional):
- (Coming soon)

Inherited props:
- containerRef: Ref callback that should be passed to the ref prop of [PaperContainer](#PaperContainer)
- draggable: true if drag is enabled
- dragStart: Point where drag begins on mouse down
- viewZoom: Zoom value

### PaperRenderer

Currently a synchronous but extensible implementation.

#### Supported Types:

See [src/Paper.types.js](src/Paper.types.js).

##### Common Type Props

- scopedProps: This is useful for accessing variables and object pointers from outside PaperJS events: ```scopedProps={(container) => ({ onMouseUp: () => myScope.onMouseUp(), prop: container.defaultProp })}```. This is called after every container update.
- ...rest: Remaining props are passed into the constructor of the type instance.

#### API

##### defaultHostConfig

The host config that is passed into React Reconciler by default. __This should not be mutated.__ Instead, extend PaperRenderer with a ```getHostConfig``` function.

##### defaultTypes

A mapping of types with their instance factory method. __This should not be mutated.__ Instead, extend PaperRenderer with a ```getInstanceFactory``` function.

##### reconciler

Access to React Fiber reconciler API.

#### Extension Example

```js
import React from 'React';
import { PaperContainer, PaperRenderer } from '@psychobolt/react-paperjs'

import MyCustomStencil from './MyCustomStencil';

class MyPaperRenderer extends PaperRenderer {
  getInstanceFactory() {
    return { 
      ...this.defaultTypes,
      [MyCustomStencil.TYPE_NAME]: (props, paper) => new MyCustomStencil(props),
    };
  }
}

const App = (props) => (
   <PaperContainer renderer={MyPaperRenderer}>
     <MyCustomStencil>
   </PaperContainer>
);

export default App;
```

#### PanAndScroll

### ReactPaperjs

#### render (Coming Soon)

```js
import React from 'react';
import ReactPaperjs from '@psychobolt/react-paperjs'

ReactPaperjs.render(<App />, document.getElementById('canvas'));
```