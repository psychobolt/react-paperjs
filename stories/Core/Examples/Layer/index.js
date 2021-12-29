import React from 'react';

import { PaperContainer, Circle, Layer } from '@psychobolt/react-paperjs';

import { ref } from '../../shared';

export default () => {
  const Shapes = () => (
    <Circle ref={ref} center={[120, 50]} radius={35} fillColor="#00FF00" />
  );
  return (
    <PaperContainer>
      <Circle ref={ref} center={[180, 50]} radius={35} fillColor="blue" />
      <Layer ref={ref}>
        <Circle ref={ref} center={[80, 50]} radius={35} fillColor="red" />
      </Layer>
      <Layer ref={ref}>
        <Shapes />
      </Layer>
      <Circle ref={ref} center={[220, 50]} radius={35} fillColor="yellow" />
    </PaperContainer>
  );
};
