import React from 'react';
import { storiesOf } from '@storybook/react';

import { PaperContainer, Path, Rectangle } from 'src';

storiesOf('Path', module)
  .add('with PathData', () => (
    <PaperContainer>
      <Path
        fillColor="red"
        pathData="M100,50c0,27.614-22.386,50-50,50S0,77.614,0,50S22.386,0,50,0S100,22.386,100,50"
      />
    </PaperContainer>
  ))
  .add('Rectangle', () => (
    <PaperContainer>
      <Rectangle
        width={90}
        height={60}
        fillColor="green"
        scopedProps={paper => ({
          position: paper.view.center,
        })}
      />
    </PaperContainer>
  ));
