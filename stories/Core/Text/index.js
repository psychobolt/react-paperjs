import React from 'react';
import { storiesOf } from '@storybook/react';

import { PointText } from '@psychobolt/react-paperjs';

import { Mountable as PaperContainer, ref } from '../shared';

storiesOf('Core/Text', module)
  .add('PointText', () => (
    <PaperContainer canvasProps={{ width: 516, height: 100 }}>
      <PointText
        ref={ref}
        point={[50, 50]}
        fillColor="black"
        fontFamily="Courier New"
        fontWeight="bold"
        fontSize={25}
      >
        The contents of the point text
      </PointText>
    </PaperContainer>
  ));
