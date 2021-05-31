import React from 'react';

import PanAndZoomReadme from 'packages/react-paperjs-editor/src/components/PanAndZoom/PanAndZoom.md';
import PanAndZoomApp from './PanAndZoom';

export default {
  title: 'packages/react-paperjs-editor/Setup',
};

export const PanAndZoom = () => (
  <>
    <div>Drag + Space bar to pan the view. Mouse wheel scroll to zoom.</div>
    <PanAndZoomApp />
  </>
);

PanAndZoom.storyName = 'with Pan and Zoom';
PanAndZoom.parameters = {
  docs: {
    page: PanAndZoomReadme,
  },
};
