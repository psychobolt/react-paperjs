import React from 'react';
import { storiesOf } from '@storybook/react';

import { PaperContainer, Circle, Layer } from 'src';

import { ref } from '../shared';

storiesOf('Layer', module)
  .add('Circles', () => {
    const Shapes = () => (
      <Circle ref={ref} center={[120, 50]} radius={35} fillColor="#00FF00" />
    );
    return (
      <PaperContainer>
        <Circle ref={ref} center={[80, 50]} radius={35} fillColor="red" />
        <Layer ref={ref}>
          <Shapes />
        </Layer>
      </PaperContainer>
    );
  });
