import React from 'react';
import { storiesOf } from '@storybook/react';
import { withReadme } from 'storybook-readme';

import PanAndZoomReadme from 'packages/react-paperjs-editor/src/components/PanAndZoom/PanAndZoom.md';
import PanAndZoomApp from './PanAndZoom';

storiesOf('packages/react-paperjs-editor/Setup', module)
  .add('with Pan and Zoom', withReadme(PanAndZoomReadme, () => (
    <div>
      <div>Drag + Space bar to pan the view. Mouse wheel scroll to zoom.</div>
      <PanAndZoomApp />
    </div>
  )));
