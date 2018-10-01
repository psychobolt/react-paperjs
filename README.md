# React Paper.js

[![Stability](https://img.shields.io/badge/Stability-Experimental-Orange.svg)](https://nodejs.org/api/documentation.html#documentation_stability_index)
[![npm](https://img.shields.io/npm/v/@psychobolt/react-paperjs.svg)](https://www.npmjs.com/package/@psychobolt/react-paperjs)
[![Build Status](https://travis-ci.org/psychobolt/react-paperjs.svg?branch=master)](https://travis-ci.org/psychobolt/react-paperjs)
[![codecov](https://codecov.io/gh/psychobolt/react-paperjs/branch/master/graph/badge.svg)](https://codecov.io/gh/psychobolt/react-paperjs)

[![Dependencies Status](https://david-dm.org/psychobolt/react-paperjs.svg)](https://david-dm.org/psychobolt/react-paperjs)
[![Dev Dependencies Status](https://david-dm.org/psychobolt/react-paperjs/dev-status.svg)](https://david-dm.org/psychobolt/react-paperjs?type=dev)
[![Peer Dependencies Status](https://david-dm.org/psychobolt/react-paperjs/peer-status.svg)](https://david-dm.org/psychobolt/react-paperjs?type=peer)

React fiber renderer and component container for [Paper.js](http://paperjs.org/).

## Install

> Recommended: Paper 0.11.x, React, React DOM 16.x.

```sh
npm install --save @psychobolt/react-paperjs
# or
yarn add @psychobolt/react-paperjs
```

## Examples

There are several [demos](https://psychobolt.github.io/react-paperjs). Also check out their [sources](stories). Here is one to get you started:

```jsx
import React from 'react';
import { PaperContainer, Circle, Layer } from '@psychobolt/react-paperjs'

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

## Components

Common usage with [PaperContainer](#papercontainer) and its default [renderer](#paperrenderer).

### PaperContainer

Provide and creates [Paper Scope](http://paperjs.org/reference/paperscope/) context. To access Paper Scope, you may use the provided [HOC](#paper-scope). All children are rendered into its canvas with [PaperRenderer](#paperrenderer) by default.

#### Props

##### `renderer?: Renderer`

The default is [PaperRenderer](#paperrenderer). Alternatively, you can [extend](#extension-example) and pass in your own.

##### `canvasProps?: {} | (paper) => ({})`

Props to be passed to ```<canvas>```. Alternatively, you can provide a function that returns new props.

##### `viewProps?: {} | (paper) => ({})`

Props to be passed to the [View](http://paperjs.org/reference/view/). Alternatively, you can provide a function that returns new props.

##### `onMount?: (paper) => myCallback(paper)`

Callback on container mount.

##### `className?: string`

Canvas element class attribute.

### Paper

Refer supported Paper [types](src/Paper.types.js). All props are passed to the type constructor.

## API

### PaperRenderer

Currently a synchronous but extensible implementation.

#### Members

##### `defaultHostConfig: {}`

The host config that is passed into React Reconciler by default. __This should not be mutated.__ Instead, extend [PaperRenderer](#paperrenderer) with a ```getHostConfig``` function.

##### `defaultTypes: { [type: string]: (props: {}, paper: Paper) => Object}`

A mapping of types with their instance factory method. __This should not be mutated.__ Instead, extend [PaperRenderer](#paperrenderer) with a ```getInstanceFactory``` function.

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

The above code adds a custom Component Type to the renderer's instance factory. Then the component can be rendered inside the container.

## Higher-order Components

#### Paper Scope

Injects Paper Scope as component prop 'paper'.

Example usage:
```jsx
import React from 'react';

import { PaperScope, Circle } from '@psychobolt/react-paperjs';

export default @PaperScope class Scene {
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

## Extensions

If you're interested in editor components for React Paper JS, you can checkout another [library](https://www.npmjs.com/package/@psychobolt/react-paperjs-editor) that's work in progress.
