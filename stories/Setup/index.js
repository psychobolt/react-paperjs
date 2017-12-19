import React from 'react';
import { storiesOf } from '@storybook/react';

import ResizableApp from './Resizable';
import PanAndZoomApp from './PanAndZoom';

storiesOf('Setup', module)
  .add('with Resize', () => (
    <div>
      <div>Drag borders to resize canvas.</div>
      <ResizableApp />
    </div>
  ))
  .add('with Pan and Zoom', () => (
    <div>
      <div>Drag + Space bar to pan the view. Mouse wheel scroll to zoom.</div>
      <PanAndZoomApp />
    </div>
  ));
