# React Paper.js

[![Build Status](https://travis-ci.org/psychobolt/react-paperjs.svg?branch=master)](https://travis-ci.org/psychobolt/react-paperjs)
[![Dependencies Status](https://david-dm.org/psychobolt/react-paperjs.svg)](https://david-dm.org/psychobolt/react-paperjs)
[![codecov](https://codecov.io/gh/psychobolt/react-paperjs/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-paperjs)

React fiber renderer and component container for Paper.js.

[DEMOS](https://psychobolt.github.io/react-paperjs)

## Install (Coming soon)

```sh
npm install --save @psychobolt/react-paperjs
# or
yarn add @psychobolt/react-paperjs
```

## Usage

Common usage with [PaperContainer](#papercontainer) and its default [renderer](#paperrenderer).

### PaperContainer

Its instance is a [Paper Scope](http://paperjs.org/reference/paperscope/).

All children are rendered into its canvas with [PaperRenderer](#paperrenderer) by default.

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

- renderer: [PaperRenderer](#paperrenderer) (default)
- canvasProps: Props to be passed to ```<canvas>```. Can be a function or a object literal - ```(container) => ({}) | {}```.
- viewProps: Props to be passed to the [View](http://paperjs.org/reference/view/). Can be a function or a object literal - ```(container) => ({}) | {}```.
- onMount: Callback on container mount - ```(container) => myCallback(container)```

#### Container Add-ons

A work in progress beneficial library, high order components (HOC) for enhancing [PaperContainer](#papercontainer).

##### with Pan And Zoom

Add pan and zoom controls to Paper's view. By default, space + mouse drag to pan and mouse scroll to zoom.

Example usage:
```jsx
import { withPanAndZoom, PaperContainer } from '@psychobolt/react-paperjs'

import Scene, { options } from './Scene';

const PanAndZoom = withPanAndZoom(PaperContainer);

export default () => (
  <PanAndZoom><Scene /></PanAndZoom>
);
```

Props:
- prepanStyle: Applied styles when view is draggable.
- panStyle: Applied styles when view is being dragged.

### PaperRenderer

Currently a synchronous but extensible implementation.

#### Supported Types:

See [src/Paper.types.js](src/Paper.types.js).

##### Common Type Props

- scopedProps: This is useful for accessing variables and object pointers from outside PaperJS events: ```scopedProps={(container) => ({ onMouseUp: () => myScope.onMouseUp(), prop: container.defaultProp })}```. This is called after every container update.
- ...rest: Remaining props are passed into the constructor of the type instance.

#### API

##### defaultHostConfig

The host config that is passed into React Reconciler by default. __This should not be mutated.__ Instead, extend [PaperRenderer](#paperrenderer) with a ```getHostConfig``` function.

##### defaultTypes

A mapping of types with their instance factory method. __This should not be mutated.__ Instead, extend [PaperRenderer](#paperrenderer) with a ```getInstanceFactory``` function.

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

### ReactPaperjs

#### render (Coming Soon)

```js
import React from 'react';
import ReactPaperjs from '@psychobolt/react-paperjs'

ReactPaperjs.render(<App />, document.getElementById('canvas'));
```