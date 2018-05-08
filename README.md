# React Paper.js

[![npm](https://img.shields.io/npm/v/@psychobolt/react-paperjs.svg)](https://www.npmjs.com/package/@psychobolt/react-paperjs)
[![Build Status](https://travis-ci.org/psychobolt/react-paperjs.svg?branch=master)](https://travis-ci.org/psychobolt/react-paperjs)
[![codecov](https://codecov.io/gh/psychobolt/react-paperjs/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-paperjs)

[![Dependencies Status](https://david-dm.org/psychobolt/react-paperjs.svg)](https://david-dm.org/psychobolt/react-paperjs)
[![Dev Dependencies Status](https://david-dm.org/psychobolt/react-paperjs/dev-status.svg)](https://david-dm.org/psychobolt/react-paperjs?type=dev)
[![Peer Dependencies Status](https://david-dm.org/psychobolt/react-paperjs/peer-status.svg)](https://david-dm.org/psychobolt/react-paperjs?type=peer)

React fiber renderer and component container for [Paper.js](http://paperjs.org/).

[DEMOS](https://psychobolt.github.io/react-paperjs)

## Install (Experimental release)

Recommended: Paper 0.11.x, React, React DOM 16.x.

```sh
npm install --save @psychobolt/react-paperjs
# or
yarn add @psychobolt/react-paperjs
```

## Usage

Common usage with [PaperContainer](#papercontainer) and its default [renderer](#paperrenderer).

### PaperContainer

Creates a [Paper Scope](http://paperjs.org/reference/paperscope/) and populate the child context with it. To access Paper Scope, you may use the provided [HOC](#paper-scope).

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

- [Pan And Zoom](#pan-and-zoom)

### PaperRenderer

Currently a synchronous but extensible implementation.

#### Supported Types:

See [src/Paper.types.js](src/Paper.types.js).

Props are passed into the constructor of the type instance.

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

### Higher-Order Components

#### Pan And Zoom

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
- onPanEnabled: Callback when pan is enabled.
- onPanDisabled: Callback when pan is disabled.

#### Paper Scope

Injects Paper Scope as component prop 'paper'.

Example usage:
```jsx
import React from 'react';

import { PaperScope, Circle } from '@psychobolt/react-paperjs';

@PaperScope
export default class Scene {
  render() {
    const { paper } = this.props;
    return <Circle fillColor="red" radius={35} center={paper.view.center} />;
  }
}
```

As an alternative, you can use a helper function:
```jsx
import React from 'react';

import { renderWithPaperScope, Circle } from '@psychobolt/react-paperjs';

export default class Scene {
  render() {
    return renderWithPaperScope(paper => <Circle fillColor="red" radius={35} center={paper.view.center} />);
  }
}
```