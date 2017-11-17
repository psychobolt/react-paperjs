import React from 'react';
import { storiesOf } from '@storybook/react';

import LineApp from './Line';
import ClosedShapeApp from './ClosedShape';
import FreeformPathApp from './FreeformPath';
import RectangleShapedPathApp from './RectangleShapedPath';

storiesOf('Tool', module)
  .add('Line', () => (
    <div>
      <div>Click and drag to draw a line</div>
      <LineApp />
    </div>
  ))
  .add('Closed Shape', () => (
    <div>
      <div>
        <p>Click anywhere to plot points and to create a shape. </p>
        <p>Click near points to close the shape and prune dangling points.</p>
      </div>
      <ClosedShapeApp />
    </div>
  ))
  .add('Freeform Path', () => (
    <div>
      <div>Click and drag to freeform lines.</div>
      <FreeformPathApp />
    </div>
  ))
  .add('Rectangle Shaped Paths', () => (
    <div>
      <div>Click and drag to create rectangle shapes.</div>
      <RectangleShapedPathApp />
    </div>
  ));
