import React from 'react';
import { storiesOf } from '@storybook/react';

import { PaperContainer, Circle, Layer } from 'src';

storiesOf('Layer', module)
  .add('Circles', () => {
    const Shapes = () => <Circle center={[120, 50]} radius={35} fillColor="#00FF00" />;
    return (
      <PaperContainer>
        <Circle center={[80, 50]} radius={35} fillColor="red" />
        <Layer>
          <Shapes />
        </Layer>
      </PaperContainer>
    );
  });
